// export_migration_package.cjs — Package full software data for instant migration
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'server', 'db.json');
const MIGRATION_FILE = path.join(__dirname, 'Stavya_IT_System_Full_Migration_Package.json');
const DOWNLOADS_MIGRATION_FILE = path.join(process.env.USERPROFILE || 'C:\\Users\\Admin', 'Downloads', 'Stavya_IT_System_Full_Migration_Package.json');

console.log('=====================================================');
console.log('🏥 STAVYA IT SYSTEM — FULL SOFTWARE DATA MIGRATION PACKAGE');
console.log('=====================================================\n');

if (!fs.existsSync(DB_PATH)) {
  console.error(`❌ Error: Database file not found at ${DB_PATH}`);
  process.exit(1);
}

try {
  const raw = fs.readFileSync(DB_PATH, 'utf8');
  const data = JSON.parse(raw);

  const migrationData = {
    ...data,
    packageVersion: '2.0.0',
    packagedAt: new Date().toISOString(),
    system: 'Stavya Spine Hospital IT System'
  };

  const jsonStr = JSON.stringify(migrationData, null, 2);

  // Write to project directory
  fs.writeFileSync(MIGRATION_FILE, jsonStr, 'utf8');
  console.log(`✅ Package created in project folder: ${MIGRATION_FILE}`);

  // Write copy to Downloads folder for convenient access
  try {
    fs.writeFileSync(DOWNLOADS_MIGRATION_FILE, jsonStr, 'utf8');
    console.log(`✅ Package saved to Downloads folder: ${DOWNLOADS_MIGRATION_FILE}`);
  } catch (err) {
    console.log(`ℹ️ Could not write copy to Downloads folder: ${err.message}`);
  }

  console.log('\n📊 Migration Package Contents Summary:');
  console.log(`  - Inventory Assets: ${(data.inventory || []).length}`);
  console.log(`  - System Users:     ${(data.users || []).length}`);
  console.log(`  - Complaints/Tickets: ${(data.complaints || []).length}`);
  console.log(`  - Tasks:             ${(data.tasks || []).length}`);
  console.log(`  - Vendors:           ${(data.vendors || []).length}`);
  console.log(`  - Movements:         ${(data.movements || []).length}`);
  console.log(`  - Checklists:        ${(data.checklists || []).length}`);
  console.log(`  - Maintenance PMs:   ${(data.maintenance || []).length}`);
  console.log(`  - Purchase Requests: ${(data.purchases || []).length}`);
  console.log(`  - IPD Beds:          ${(data.ipdBeds || []).length}`);
  console.log(`  - IPD Patients:      ${(data.ipdPatients || []).length}`);
  console.log('\n🚀 HOW TO MIGRATE TO ANOTHER PC:');
  console.log('  1. Copy the project folder to your new PC.');
  console.log('  2. Copy "Stavya_IT_System_Full_Migration_Package.json" into the new PC\'s "server/db.json".');
  console.log('  3. Run "npm run start" on the new PC.\n');

} catch (err) {
  console.error('❌ Failed to package software data:', err.message);
  process.exit(1);
}
