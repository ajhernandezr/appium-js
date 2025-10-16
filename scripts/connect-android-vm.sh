#!/bin/bash
# Script para conectar ADB a Android-x86 en VirtualBox

echo "🔄 Conectando ADB a Android-x86..."

# Matar servidor ADB si está corriendo
adb kill-server

# Iniciar servidor ADB
adb start-server

# Conectar a la VM (ajustar IP y puerto según tu configuración)
adb connect 127.0.0.1:5555

# Verificar dispositivos conectados
echo "📱 Dispositivos conectados:"
adb devices

echo "✅ Listo para usar con Appium!"