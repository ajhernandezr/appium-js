# Swiss Airlines APK Testing with GitHub Actions

This project sets up automated testing for the Swiss Airlines application using Appium and WebDriverIO on GitHub Actions.

## ✈️ Features

- 🤖 **GitHub Actions**: Automated cloud execution (free)
- 📱 **Android Emulator**: API 29 with Google APIs
- 📦 **Automatic Download**: Swiss Airlines APK downloaded automatically
- 📸 **Screenshots**: Automatic captures for debugging
- 🚀 **Simple Test**: Verifies the app launches correctly

## 🛠️ Setup

### 1. Activate GitHub Actions

1. Commit all files:
```bash
git add .
git commit -m "Add Swiss Airlines testing with GitHub Actions"
git push
```

2. Go to your repository on GitHub
3. Click on the "Actions" tab
4. Authorize GitHub Actions if needed

### 2. Run Tests

Tests run automatically when:
- You push to the `main` branch
- You open a Pull Request
- Or manually from GitHub Actions

To run manually:
1. Go to Actions → "Android Tests"
2. Click "Run workflow"
3. Select branch and click "Run workflow"

## 📱 Swiss Airlines APK

The APK is automatically downloaded from:
- **Source**: APKPure
- **Package**: `com.yoc.swiss.swiss` (official Play Store version)
- **Play Store**: https://play.google.com/store/apps/details?id=com.yoc.swiss.swiss
- **Location**: `./apks/swiss-airlines.apk`

## 🧪 Simple Test

The test will verify:
- ✅ App launches correctly
- ✅ Has content (page not empty)
- ✅ Contains text elements
- 📸 Takes screenshot of initial state

## 📁 Project Structure

```
├── .github/workflows/
│   └── android-tests.yml          # GitHub Actions workflow
├── test/specs/
│   └── android-app.ts             # Simple test for Swiss Airlines
├── wdio.github-actions.conf.ts    # WebDriverIO config for GHA
├── wdio.swiss-app.conf.ts         # Swiss-specific configuration
└── package.json                   # Scripts and dependencies
```

## 🚀 Available Scripts

```bash
# Run tests locally (requires emulator)
npm run test:android

# Run Swiss-specific configuration
npm run test:swiss
```

## 📊 Results

Results include:
- 📄 **JUnit reports**: `test-results/`
- 📸 **Screenshots**: `screenshots/`
- 🎯 **HTML report**: `test-results/swiss-airlines-report.html`

## 🔧 Advanced Configuration

### Modify the test

Edit `test/specs/android-app.ts` to add more verifications.

### Change the APK

Modify the URL in `.github/workflows/android-tests.yml`:
```yaml
- name: Download Swiss Airlines APK
  run: |
    curl -L "https://d.apkpure.com/b/APK/com.yoc.swiss.swiss?version=latest" -o ./apks/swiss-airlines.apk
```

### Customize configuration

Modify `wdio.github-actions.conf.ts` to adjust timeouts, capabilities, etc.

## 🎯 Next Steps

1. **Commit and Push**: Upload all changes to GitHub
2. **Activate Actions**: Authorize GitHub Actions in your repo
3. **Run Tests**: Execute the workflow manually
4. **Review Results**: Check logs and artifacts on GitHub

Ready to test Swiss Airlines in the cloud! 🚀✈️