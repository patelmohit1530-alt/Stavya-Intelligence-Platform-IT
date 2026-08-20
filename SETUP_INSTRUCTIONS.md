# 🏥 Stavya Spine Hospital — IT Department Management System
## Local Offline Deployment & System Transfer Guide

This document contains complete, step-by-step instructions to transfer, set up, and run the **Stavya Spine Hospital IT Department System** on any local Windows, Mac, or Linux computer (100% offline private execution).

---

## 📋 Prerequisites

Before setting up on a new computer:
1. Download & Install **Node.js (LTS version)**:
   - Official Download: [https://nodejs.org/](https://nodejs.org/)
   - Verify installation in terminal / command prompt:
     ```cmd
     node -v
     npm -v
     ```

---

## 🚀 How to Transfer & Run on Another Computer

### Step 1: Copy Project Folder
1. Copy the entire `stavya-it-system` folder onto a USB drive or local network drive.
2. Paste the folder onto the target server or computer (e.g. `C:\Stavya_IT_System`).

### Step 2: Open Command Prompt / Terminal
1. Open Command Prompt (`cmd`) or PowerShell on the target system.
2. Navigate to the project folder:
   ```cmd
   cd C:\Stavya_IT_System
   ```

### Step 3: Start Local Server (Automated 1-Click Launchers)

You can launch the system using any of the following 1-click scripts:

- **Windows Users**: Simply double-click **`run.bat`** (or **`start.cmd`**).
  - Automatically checks Node.js
  - Automatically installs dependencies if missing (`npm install`)
  - Automatically opens the web browser to `http://localhost:5173/`
  - Starts the local server with LAN network sharing

- **Linux / Mac Users**: Run **`./run.sh`** in terminal.

#### Manual Command Line Alternative:
```cmd
npm install
npm run dev -- --host
```

---

## 🌐 Accessing the Application

### On the Local Host Computer:
Open any web browser (Chrome / Edge / Firefox / Safari) and go to:
- **`http://localhost:5173/`**

### Accessing from Other PCs on Hospital Local Network (LAN):
1. Find the Server IP address by running `ipconfig` in Command Prompt on the main PC (e.g. `192.168.1.100`).
2. On any other hospital computer connected to the same Wi-Fi / LAN ethernet network, open browser and navigate to:
   - **`http://192.168.1.100:5173/`**

---

## 🔑 Default Login Credentials

| Role | Username | Password | Access Rights |
| :--- | :--- | :--- | :--- |
| **Superadmin (Director)** | `STA-DR-15` | `123456` | Full Control, User Creation, Department CRUD, Data Reset, AI Reports |
| **Superadmin (IT Admin)** | `admin` | `Admin@123` | Full System Management & Settings |
| **IT Executive** | `executive` | `Exec@123` | Assigned Complaints, Inventory, Item Movements |
| **Department User** | `reception` | `Recep@123` | Raise Ticket, View Assigned Assets |

---

## 💾 Offline Backup & Server Migration Features

### 1. Auto-Backup Engine
- Background auto-backup runs automatically.
- Accessible via the **Offline Auto-Backup** button in the header.
- Custom manual backup directory path (e.g. `D:\Stavya_IT_Backups`).

### 2. Clearing Test Data for Production Use
- Go to **Superadmin Control Center** (`/users`).
- Click the **`⚠️ System Migration & Clear Data`** tab.
- Click **Clear All System Data**, type `STAVYA-RESET` in the confirmation modal, and click **Wipe Data**.
- An automatic JSON backup file will be generated before clearing test records.

---

## 📦 Production Build (Optional)

If you wish to serve the optimized production static build:
```cmd
npm run build
npm run preview -- --host
```
Static files will be compiled into the `dist/` directory.
