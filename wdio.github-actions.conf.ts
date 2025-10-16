export const config = {
    runner: 'local',
    tsConfigPath: './tsconfig.json',
    
    // Configuration for GitHub Actions - Swiss Airlines APK testing
    specs: ['./test/specs/android-app.ts'], // Swiss Airlines native app test
    exclude: [],
    maxInstances: 1, // Only 1 instance for emulator
    
    capabilities: [{
        platformName: 'Android',
        'appium:platformVersion': '10', // Android 10 (API 29) - matches workflow
        'appium:deviceName': 'test_emulator', // Matches AVD name in workflow
        'appium:automationName': 'UiAutomator2',
        'appium:noReset': false,
        'appium:fullReset': false,
        'appium:newCommandTimeout': 300000, // 5 minutes timeout (increased for CI)
        
        // Swiss Airlines APK configuration (matches workflow download)
        // APK downloaded in GitHub Actions from APKPure
        'appium:app': './apks/swiss-airlines.apk', // Path matches workflow
        'appium:appPackage': 'com.yoc.swiss.swiss', // Swiss Airlines package
        'appium:appActivity': 'com.yoc.swiss.swiss.MainActivity', // Main activity
        'appium:appWaitActivity': 'com.yoc.swiss.swiss.*', // Wait for any Swiss activity
        
        // For web browser testing (comment for native app testing)
        // browserName: 'Chrome',
        
        // GitHub Actions optimizations
        'appium:skipServerInstallation': false,
        'appium:skipDeviceInitialization': false,
        'appium:disableWindowAnimation': true, // Performance optimization
        'appium:autoGrantPermissions': true, // Auto-grant app permissions
        'appium:dontStopAppOnReset': false, // Allow clean app restart
    }],
    
    // Local Appium server configuration
    hostname: 'localhost',
    port: 4723,
    path: '/',
    
    logLevel: 'info',
    bail: 0,
    baseUrl: 'https://www.google.com',
    waitforTimeout: 60000, // Increased for GitHub Actions (slower environment)
    connectionRetryTimeout: 180000, // 3 minutes for connection retry
    connectionRetryCount: 5, // More retries for CI stability
    
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