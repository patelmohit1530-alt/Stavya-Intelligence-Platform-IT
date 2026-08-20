@echo off
title Stavya Spine Hospital - IT Department System Launcher
color 0A
cls

echo ======================================================================
echo          STAVYA SPINE HOSPITAL - IT DEPARTMENT SYSTEM
echo ======================================================================
echo.

:: Check Node.js installation
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed on this computer!
    echo Please download and install Node.js from https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo [OK] Node.js detected.
echo.

:: Check if node_modules folder exists, if not run npm install
if not exist node_modules (
    echo [INFO] Installing required dependencies (first-time setup)...
    echo.
    call npm install
    if %errorlevel% neq 0 (
        echo [ERROR] Dependency installation failed!
        pause
        exit /b 1
    )
    echo [OK] Dependencies installed successfully.
    echo.
)

echo [INFO] Starting local offline server...
echo 🌐 Local URL:   http://localhost:5173/
echo 💻 LAN Access:  http://YOUR_LOCAL_IP:5173/
echo.

:: Automatically open default web browser after 2 seconds
start "" "http://localhost:5173/"

:: Launch Vite Dev Server on all network interfaces
npm run dev -- --host 0.0.0.0

pause
