export const config = {
    runner: 'local',
    tsConfigPath: './tsconfig.json',
    
    // Configuration for GitHub Actions - Swiss Airlines APK testing
    specs: ['./test/specs/android-app.ts'], // Swiss Airlines native app test
    exclude: [],
    maxInstances: 1, // Only 1 instance for emulator
    
    capabilities: [{
        platformName: 'Android',
        'appium:platformVersion': '10', // Android 10 (API 29)
        'appium:deviceName': 'test_emulator', // AVD name
        'appium:automationName': 'UiAutomator2',
        'appium:noReset': false,
        'appium:fullReset': false,
        'appium:newCommandTimeout': 240000, // 4 minutes timeout
        
        // For Swiss Airlines APK testing (official Play Store version)
        // Download from: https://play.google.com/store/apps/details?id=com.yoc.swiss.swiss
        'appium:app': './apks/swiss-airlines.apk',
        'appium:appPackage': 'com.yoc.swiss.swiss',
        'appium:appActivity': 'com.yoc.swiss.swiss.MainActivity',
        'appium:appWaitActivity': 'com.yoc.swiss.swiss.*',
        
        // For web browser testing (comment for native app testing)
        // browserName: 'Chrome',
        
        // Additional configurations for CI
        'appium:skipServerInstallation': false,
        'appium:skipDeviceInitialization': false,
        'appium:disableWindowAnimation': true, // Improve performance
    }],
    
    // Local Appium server configuration
    hostname: 'localhost',
    port: 4723,
    path: '/',
    
    logLevel: 'info',
    bail: 0,
    baseUrl: 'https://www.google.com',
    waitforTimeout: 30000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    
    services: [
        ['appium', {
            args: {
                // Appium server configuration
                port: 4723,
                hostname: 'localhost',
                relaxedSecurity: true,
                allowInsecure: ['chromedriver_autodownload'],
                logLevel: 'info'
            },
            logPath: './appium.log'
        }]
    ],
    
    framework: 'mocha',
    reporters: [
        'spec',
        ['junit', {
            outputDir: './test-results',
            outputFileFormat: function(options) {
                return `test-results-${options.cid}.xml`
            }
        }],
        ['html-nice', {
            outputDir: './test-results',
            filename: 'report.html',
            reportTitle: 'Android Test Results'
        }]
    ],
    
    mochaOpts: {
        ui: 'bdd',
        timeout: 120000
    },

    // Hooks for better debugging
    beforeSession: function (config: any, capabilities: any, specs: any) {
        console.log('🚀 Starting Android test session...')
        console.log('Device:', capabilities['appium:deviceName'])
        console.log('Platform:', capabilities.platformName, capabilities['appium:platformVersion'])
    },

    before: function (capabilities: any, specs: any) {
        console.log('📱 Connected to device successfully')
    },

    afterTest: function(test: any, context: any, { error, result, duration, passed, retries }: any) {
        if (!passed) {
            // Take screenshot on failure
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
            const filename = `error-${test.title.replace(/\s+/g, '-')}-${timestamp}.png`
            // @ts-ignore
            browser.saveScreenshot(`./screenshots/${filename}`)
        }
    },

    after: function (result: any, capabilities: any, specs: any) {
        console.log('🏁 Test session completed')
    }
};