# Swiss Airlines APK Testing with GitHub Actions

Este proyecto configura pruebas automatizadas para la aplicación Swiss Airlines usando Appium y WebDriverIO en GitHub Actions.

## ✈️ Características

- 🤖 **GitHub Actions**: Ejecución automatizada en la nube (gratis)
- 📱 **Android Emulator**: API 29 con Google APIs
- 📦 **Descarga automática**: La APK de Swiss Airlines se descarga automáticamente
- 📸 **Screenshots**: Capturas automáticas para debugging
- 🚀 **Test simple**: Verifica que la app se lance correctamente

## 🛠️ Configuración

### 1. Activar GitHub Actions

1. Haz commit de todos los archivos:
```bash
git add .
git commit -m "Add Swiss Airlines testing with GitHub Actions"
git push
```

2. Ve a tu repositorio en GitHub
3. Click en la pestaña "Actions"
4. Autoriza GitHub Actions si es necesario

### 2. Ejecutar Tests

Los tests se ejecutan automáticamente cuando:
- Haces push al branch `main`
- Abres un Pull Request
- O manualmente desde GitHub Actions

Para ejecutar manualmente:
1. Ve a Actions → "Android Tests"
2. Click "Run workflow"
3. Selecciona el branch y click "Run workflow"

## 📱 APK de Swiss Airlines

La APK se descarga automáticamente de:
- **Source**: APKPure
- **Package**: `com.yoc.swiss.swiss` (versión oficial de Play Store)
- **Play Store**: https://play.google.com/store/apps/details?id=com.yoc.swiss.swiss
- **Ubicación**: `./apks/swiss-airlines.apk`

## 🧪 Test Simple

El test verificará:
- ✅ App se lanza correctamente
- ✅ Tiene contenido (página no vacía)
- ✅ Contiene elementos de texto
- 📸 Toma screenshot del estado inicial

## 📁 Estructura del Proyecto

```
├── .github/workflows/
│   └── android-tests.yml          # GitHub Actions workflow
├── test/specs/
│   └── android-app.ts             # Test simple para Swiss Airlines
├── wdio.github-actions.conf.ts    # Configuración WebDriverIO para GHA
├── wdio.swiss-app.conf.ts         # Configuración específica Swiss
└── package.json                   # Scripts y dependencias
```

## 🚀 Scripts Disponibles

```bash
# Ejecutar tests localmente (requiere emulator)
npm run test:android

# Ejecutar configuración específica Swiss
npm run test:swiss
```

## 📊 Resultados

Los resultados incluyen:
- 📄 **JUnit reports**: `test-results/`
- 📸 **Screenshots**: `screenshots/`
- 🎯 **HTML report**: `test-results/swiss-airlines-report.html`

## 🔧 Configuración Avanzada

### Modificar el test

Edita `test/specs/android-app.ts` para agregar más verificaciones.

### Cambiar la APK

Modifica el URL en `.github/workflows/android-tests.yml`:
```yaml
- name: Download Swiss Airlines APK
  run: |
    curl -L "https://d.apkpure.com/b/APK/com.yoc.swiss.swiss?version=latest" -o ./apks/swiss-airlines.apk
```

### Personalizar configuración

Modifica `wdio.github-actions.conf.ts` para ajustar timeouts, capabilities, etc.

## 🎯 Próximos Pasos

1. **Commit y Push**: Sube todos los cambios a GitHub
2. **Activa Actions**: Autoriza GitHub Actions en tu repo
3. **Run Tests**: Ejecuta el workflow manualmente
4. **Revisa Resultados**: Ve logs y artifacts en GitHub

¡Listo para probar Swiss Airlines en la nube! 🚀✈️