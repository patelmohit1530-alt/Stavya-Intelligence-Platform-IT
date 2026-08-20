#!/usr/bin/env bash
# Stavya Spine Hospital - IT System Linux / Mac Launcher

echo "======================================================================"
echo "          STAVYA SPINE HOSPITAL - IT DEPARTMENT SYSTEM"
echo "======================================================================"
echo ""

if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js is not installed! Please install Node.js from https://nodejs.org/"
    exit 1
fi

if [ ! -d "node_modules" ]; then
    echo "[INFO] First time setup: Installing dependencies..."
    npm install
fi

echo "[INFO] Starting local server..."
echo "🌐 Local URL: http://localhost:5173/"
echo ""

# Try opening browser on macOS or Linux
if command -v open &> /dev/null; then
    open "http://localhost:5173/" &
elif command -v xdg-open &> /dev/null; then
    xdg-open "http://localhost:5173/" &
fi

npm run dev -- --host 0.0.0.0
