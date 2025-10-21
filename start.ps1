# Mexma Dashboard Startup Script
Write-Host "Starting Mexma Dashboard..." -ForegroundColor Green

# Navigate to app directory
Set-Location -Path "$PSScriptRoot\app"

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
}

# Start the dev server and open browser
Write-Host "Starting Next.js server..." -ForegroundColor Cyan
Start-Job -ScriptBlock {
    Set-Location -Path $using:PWD
    npm run dev
} | Out-Null

Write-Host "Waiting for server to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

Write-Host "Opening browser..." -ForegroundColor Green
Start-Process "http://localhost:3000"

Write-Host "`nServer should be running at http://localhost:3000" -ForegroundColor Green
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow

# Keep the script running
npm run dev
