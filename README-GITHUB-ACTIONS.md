# Android Testing with GitHub Actions

This project is configured to run automated Android tests using GitHub Actions with emulators.

## 🚀 Features

- ✅ **Automated Android Emulator** in GitHub Actions
- ✅ **Tests with WebDriverIO + Appium**
- ✅ **Automatic screenshots** on test failures
- ✅ **HTML and JUnit reports**
- ✅ **AVD caching** for fast builds
- ✅ **Free execution** on GitHub

## 📁 File Structure

```
├── .github/workflows/android-tests.yml  # GitHub Actions workflow
├── wdio.github-actions.conf.ts          # Configuration for emulator
├── test/specs/android-web.ts             # Web testing on Android emulator
├── test/specs/android-app.ts             # Native app testing (APK)
├── screenshots/                         # Test screenshots
└── test-results/                        # Test reports
```

## 🔧 Configuration

### Configured Emulator:
- **Android API 29** (Android 10)
- **Target:** Google APIs
- **Architecture:** x86_64
- **Profile:** Nexus 6
- **RAM:** 4GB
- **Hardware accelerated** with KVM

### Included Tests:
1. **Web navigation test** - Open Google.com in Chrome browser
2. **Web search test** - Perform Google search in mobile browser
3. **Device capabilities test** - Verify Android emulator info
4. **Touch interactions test** - Test mobile web touch gestures

## 🏃‍♂️ Execution

### On GitHub Actions (automatic):
- Tests run automatically on every push/PR
- Can also be triggered manually from the "Actions" tab

### Local (for development):
```bash
# Install dependencies
npm install

# Run local tests (requires local emulator)
npm run test:android-emulator
```

## 📊 Results

Results are automatically saved:
- **Screenshots:** `screenshots/` 
- **HTML Reports:** `test-results/report.html`
- **JUnit Reports:** `test-results/test-results-*.xml`

## 🛠️ Customization

### To use your own APK:

1. Edit `wdio.github-actions.conf.ts`:
```typescript
// Comment this line:
// browserName: 'Chrome',

// Uncomment and configure:
'appium:app': '/path/to/your/app.apk',
'appium:appPackage': 'com.yourapp.package',
'appium:appActivity': '.MainActivity',
```

2. Add your APK to the workflow:
```yaml
- name: Download APK
  run: |
    # Download or build your APK
    wget https://example.com/your-app.apk -O ./app.apk
```

### To change the device:

Edit `.github/workflows/android-tests.yml`:
```yaml
api-level: 30        # Change Android version
profile: Pixel_4     # Change device model
arch: arm64-v8a      # Change architecture if needed
```

## 🐛 Debugging

If tests fail:

1. **Check logs** in GitHub's Actions tab
2. **Download artifacts** which include:
   - Error screenshots
   - Android logs
   - Detailed reports

## 💡 Advantages vs Sauce Labs

- ✅ **100% Free** (up to 2000 minutes/month)
- ✅ **No device limits**
- ✅ **Full environment control**
- ✅ **Faster builds** with caching
- ✅ **No tunnels or external connections needed**
- ✅ **Perfect GitHub integration**

## 🔄 CI/CD Pipeline

The workflow is configured for:
1. **Automatic triggers** on push/PR
2. **Complete Android environment setup**
3. **Smart AVD caching**
4. **Parallel execution** when possible
5. **Debug artifacts** on failure

Perfect for agile development and continuous testing! 🎉