# Swiss Airlines APK Testing Setup

## 📱 How to get Swiss Airlines APK

### Option 1: Download from APK sites (for testing)
```bash
# Download Swiss Airlines APK from reliable source
wget https://apkpure.com/swiss-international-air-lines/com.swiss.androidapp -O swiss-airlines.apk
```

### Option 2: Extract from Google Play Store
```bash
# Using ADB to extract from device (if you have it installed)
adb shell pm list packages | grep swiss
adb shell pm path com.swiss.androidapp
adb pull /data/app/com.swiss.androidapp-*/base.apk swiss-airlines.apk
```

### Option 3: Use APK Download tools
- **APKPure**: https://apkpure.com/swiss-international-air-lines/com.swiss.androidapp
- **APKMirror**: https://www.apkmirror.com/apk/swiss-international-air-lines/

## 🔧 Configuration Steps

### 1. Place APK in project
```bash
mkdir -p ./apks
# Copy your swiss-airlines.apk to ./apks/swiss-airlines.apk
```

### 2. Update GitHub Actions workflow
Edit `.github/workflows/android-tests.yml` to download APK:

```yaml
- name: Download Swiss Airlines APK
  run: |
    mkdir -p ./apks
    # Option A: Download from URL
    wget https://example.com/swiss-airlines.apk -O ./apks/swiss-airlines.apk
    
    # Option B: Use APK from repository
    # cp ./apks/swiss-airlines.apk ./swiss-airlines.apk
```

### 3. Update configuration
Edit `wdio.github-actions.conf.ts`:

```typescript
// Comment this line:
// browserName: 'Chrome',

// Uncomment these lines:
'appium:app': './apks/swiss-airlines.apk',
'appium:appPackage': 'com.swiss.androidapp',
'appium:appActivity': 'com.swiss.androidapp.ui.SplashActivity',
'appium:appWaitActivity': 'com.swiss.androidapp.ui.MainActivity',
```

## 🎯 Swiss Airlines App Details

- **Package Name**: `com.swiss.androidapp`
- **Main Activity**: `com.swiss.androidapp.ui.SplashActivity`
- **Wait Activity**: `com.swiss.androidapp.ui.MainActivity`
- **Size**: ~50MB
- **Permissions**: Location, Notifications, Camera (for boarding pass scan)

## 🧪 Test Scenarios Included

### ✅ App Launch & Basic Navigation
- Verify app launches successfully
- Handle splash screen and loading
- Navigate main sections (Search, Check-in, Flight status)

### ✅ Search Functionality
- Test flight search form
- Fill departure/arrival cities
- Interact with date pickers
- Verify search results

### ✅ Permissions Handling
- Location access for nearby airports
- Notification permissions for flight updates
- Camera access for document scanning

### ✅ User Journey Testing
- Complete booking flow simulation
- Check-in process testing
- Flight status verification

## 🚨 Important Notes

### Legal Considerations
- ⚖️ **Only use for testing purposes**
- ⚖️ **Don't distribute the APK**
- ⚖️ **Respect Swiss Airlines terms of service**
- ⚖️ **Use test data only, no real bookings**

### Performance Tips
- Swiss Airlines app is ~50MB, allow extra time for download
- App has complex initialization, increase timeout values
- Use `appium:noReset: false` for fresh app state each test

## 🔄 Running Tests

```bash
# Run Swiss Airlines specific tests
npm run test:android-app

# Run with specific spec file
npm run test:android-emulator -- --spec=./test/specs/android-app.ts
```

## 🐛 Common Issues

### Issue: App doesn't launch
- Check APK file path is correct
- Verify package name matches exactly
- Increase `appium:newCommandTimeout`

### Issue: Elements not found
- Swiss Airlines uses dynamic loading
- Increase wait times between actions
- Use explicit waits: `element.waitForDisplayed()`

### Issue: Permissions not handled
- Some permissions appear only on first launch
- Use `appium:fullReset: true` for complete reset
- Handle multiple permission dialogs sequentially

Perfect for testing real-world airline app scenarios! ✈️