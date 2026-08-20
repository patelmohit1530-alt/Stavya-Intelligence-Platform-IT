// restore.cjs — reads a Stavya backup JSON and pushes it to the API server
const fs = require('fs');
const path = require('path');
const http = require('http');

const BACKUP_FILE = process.argv[2];
if (!BACKUP_FILE) {
  console.error('Usage: node restore.cjs <path-to-backup.json>');
  process.exit(1);
}

const API_PORT = 3001;

function postJSON(endpoint, data) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(data);
    const options = {
      hostname: 'localhost',
      port: API_PORT,
      path: endpoint,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body)
      }
    };
    const req = http.request(options, res => {
      let raw = '';
      res.on('data', chunk => raw += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(raw)); }
        catch { resolve(raw); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function restore() {
  console.log(`\n📂 Reading: ${BACKUP_FILE}`);
  const raw = fs.readFileSync(BACKUP_FILE, 'utf8');
  const data = JSON.parse(raw);

  // Map old key names to new server collection names
  const mapped = {
    departments:        data.departments        || null,
    tagFormat:          data.tagFormat          || null,
    users:              data.users              || null,
    inventory:          data.inventory          || null,
    complaints:         data.complaints         || null,
    tasks:              data.tasks              || null,
    maintenance:        data.maintenance        || null,
    purchases:          data.purchaseRequests   || data.purchases || null,
    vendors:            data.vendors            || null,
    movements:          data.itemMovements      || data.movements || null,
    checklists:         data.checklists         || null,
    checklistTemplates: data.checklistTemplates || null,
    scrappedAssets:     data.scrappedAssets     || null,
    ipdBeds:            data.ipdBeds            || null,
    ipdPatients:        data.ipdPatients        || null,
    autoBackupSettings: data.autoBackupSettings || null,
  };

  // Show what was found
  Object.entries(mapped).forEach(([k, v]) => {
    if (v !== null) {
      const count = Array.isArray(v) ? `${v.length} records` : 'object';
      console.log(`  ✅ ${k}: ${count}`);
    } else {
      console.log(`  ⚪ ${k}: not in backup (skipped)`);
    }
  });

  console.log('\n🚀 Sending to API server...');
  const result = await postJSON('/api/migrate', mapped);
  
  if (result.ok) {
    console.log('\n✅ Restore complete! Refresh your browser to see the data.\n');
  } else {
    console.error('\n❌ Restore failed:', result);
    process.exit(1);
  }
}

restore().catch(err => {
  console.error('\n❌ Error:', err.message);
  console.error('Make sure the API server is running on port 3001.');
  process.exit(1);
});
