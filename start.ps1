# Mexma Dashboard Startup Script
Write-Host "Starting Mexma Dashboard..." -ForegroundColor Green
Set-Location -Path "$PSScriptRoot\app"
Start-Process "http://localhost:3000"
npm run dev
