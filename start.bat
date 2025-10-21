@echo off
echo Starting Mexma Dashboard...
cd app
timeout /t 3 /nobreak >nul
start http://localhost:3000
npm run dev



