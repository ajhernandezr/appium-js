export const config = {
    runner: 'local',
    tsConfigPath: './tsconfig.json',
    
    // Configuration for Swiss Airlines APK testing in GitHub Actions
    specs: ['./test/specs/android-app.ts'],
    exclude: [],
    maxInstances: 1, // Only 1 instance for emulator
    
    capabilities: [{
        platformName: 'Android',
        'appium:platformVersion': '10', // Android 10 (API 29)
        'appium:deviceName': 'test_emulator', // AVD name
        'appium:automationName': 'UiAutomator2',
        'appium:noReset': false,
        'appium:fullReset': false,
        'appium:newCommandTimeout': 300000, // 5 minutes timeout for app download
        
        // Swiss Airlines APK configuration (official Play Store version)
        'appium:app': './apks/swiss-airlines.apk',
        'appium:appPackage': 'com.yoc.swiss.swiss',
        'appium:appActivity': 'com.yoc.swiss.swiss.MainActivity',
        'appium:appWaitActivity': 'com.yoc.swiss.swiss.*',
        
        // Additional configurations for CI
        'appium:skipServerInstallation': false,
        'appium:skipDeviceInitialization': false,
        'appium:disableWindowAnimation': true, // Improve performance
        'appium:autoGrantPermissions': true, // Auto-grant permissions
        'appium:ignoreUnimportantViews': true, // Faster element finding
    }],
    
    // Local Appium server configuration
    hostname: 'localhost',
    port: 4723,
    path: '/',
    
    logLevel: 'info',
    bail: 0,
    baseUrl: 'https://www.swiss.com', // Swiss Airlines website as fallback
    waitforTimeout: 45000, // Longer timeout for app loading
    connectionRetryTimeout: 180000,
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
            outputFileFormat: function(options: any) {
                return `swiss-airlines-test-results-${options.cid}.xml`
            }
        }],
        ['html-nice', {
            outputDir: './test-results',
            filename: 'swiss-airlines-report.html',
            reportTitle: 'Swiss Airlines App Test Results'
        }]
    ],
    
    mochaOpts: {
        ui: 'bdd',
        timeout: 180000 // 3 minutes per test for complex app interactions
    },

    // Hooks for better debugging
    beforeSession: function (config: any, capabilities: any, specs: any) {
        console.log('🚀 Starting Swiss Airlines app test session...')
        console.log('Device:', capabilities['appium:deviceName'])
        console.log('Platform:', capabilities.platformName, capabilities['appium:platformVersion'])
        console.log('APK:', capabilities['appium:app'])
    },

    before: function (capabilities: any, specs: any) {
        console.log('📱 Connected to device successfully')
        console.log('✈️ Preparing to launch Swiss Airlines app...')
    },

    afterTest: function(test: any, context: any, { error, result, duration, passed, retries }: any) {
        if (!passed) {
            // Take screenshot on failure
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
            const filename = `swiss-error-${test.title.replace(/\s+/g, '-')}-${timestamp}.png`
            // @ts-ignore
            browser.saveScreenshot(`./screenshots/${filename}`)
        }
    },

    after: function (result: any, capabilities: any, specs: any) {
        console.log('🏁 Swiss Airlines app test session completed')
    }
};