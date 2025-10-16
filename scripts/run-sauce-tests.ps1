# Script para ejecutar pruebas con Sauce Labs usando túnel manual

Write-Host "🚀 Iniciando Sauce Connect..." -ForegroundColor Cyan

# Iniciar Sauce Connect en background
$sauceConnectPath = "$env:LOCALAPPDATA\Microsoft\WinGet\Packages\SauceLabs.SauceConnect_Microsoft.Winget.Source_8wekyb3d8bbwe\sauce-connect.exe"

Start-Process -FilePath $sauceConnectPath -ArgumentList @(
    "run", 
    "-u", "oauth-javierh867-c29cf",
    "-k", "57570bd7-fb6d-4f2e-ab9d-27fcd26baceb",
    "--region", "eu-central",
    "--tunnel-name", "oauth-javierh867-c29cf_tunnel_name"
) -NoNewWindow

Write-Host "⏱️  Esperando a que se establezca la conexión..." -ForegroundColor Yellow
Start-Sleep -Seconds 20

Write-Host "🧪 Ejecutando pruebas..." -ForegroundColor Green
npm run wdio:saucelabs

Write-Host "🔌 Cerrando Sauce Connect..." -ForegroundColor Cyan
Get-Process -Name "sauce-connect" -ErrorAction SilentlyContinue | Stop-Process -Force