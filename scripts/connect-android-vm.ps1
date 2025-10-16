# Script mejorado para conectar ADB a Android-x86

Write-Host "� Configurando conexión con Android-x86..." -ForegroundColor Cyan

# Variables
$ADB_PATH = "C:\Users\javie\AppData\Local\Android\sdk\platform-tools\adb.exe"
$VM_IP = "127.0.0.1:5555"

Write-Host "🔄 Reiniciando ADB..." -ForegroundColor Yellow
& $ADB_PATH kill-server
Start-Sleep -Seconds 2
& $ADB_PATH start-server

Write-Host "🔌 Conectando a $VM_IP..." -ForegroundColor Yellow
$result = & $ADB_PATH connect $VM_IP

Write-Host "📱 Dispositivos conectados:" -ForegroundColor Green
& $ADB_PATH devices

Write-Host "🧪 Verificando Appium Server..." -ForegroundColor Cyan
$appiumRunning = Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object {$_.CommandLine -like "*appium*"}

if (-not $appiumRunning) {
    Write-Host "⚠️  Appium Server no está corriendo. Iniciando..." -ForegroundColor Yellow
    Write-Host "💡 Ejecuta: appium server --port 4723" -ForegroundColor Magenta
} else {
    Write-Host "✅ Appium Server está corriendo!" -ForegroundColor Green
}

Write-Host "`n🎯 Listo para ejecutar pruebas con: npm run wdio:virtualbox" -ForegroundColor Green