import { expect } from '@wdio/globals'

describe('Android Emulator Tests', () => {
    
    it('should open Google.com and verify title', async () => {
        // Navigate to Google
        await browser.url('https://www.google.com')
        
        // Wait for page to load
        await browser.pause(3000)
        
        // Verify title
        const title = await browser.getTitle()
        console.log('Page title:', title)
        expect(title).toContain('Google')
        
        // Take screenshot
        await browser.saveScreenshot('./screenshots/google-homepage.png')
    })

    it('should perform a search on Google', async () => {
        // Navigate to Google if not already there
        await browser.url('https://www.google.com')
        await browser.pause(2000)
        
        // Find search box
        const searchBox = await $('input[name="q"]')
        await searchBox.waitForDisplayed({ timeout: 10000 })
        
        // Type in search box
        await searchBox.setValue('WebDriverIO Android testing')
        
        // Press Enter or click search
        await browser.keys('Enter')
        
        // Wait for results to appear
        await browser.pause(3000)
        
        // Verify there are results
        const results = await $$('[data-sokoban-container] h3')
        expect(results.length).toBeGreaterThan(0)
        
        // Take screenshot of results
        await browser.saveScreenshot('./screenshots/google-search-results.png')
        
        console.log(`Found ${results.length} search results`)
    })

    it('should test device capabilities', async () => {
        // Get device information
        const capabilities = browser.capabilities
        console.log('Device capabilities:', {
            platform: capabilities.platformName,
            version: capabilities['appium:platformVersion'],
            device: capabilities['appium:deviceName']
        })
        
        // Verify we're on Android
        expect(capabilities.platformName).toBe('Android')
        
        // Get screen size
        const windowSize = await browser.getWindowSize()
        console.log('Screen size:', windowSize)
        expect(windowSize.width).toBeGreaterThan(0)
        expect(windowSize.height).toBeGreaterThan(0)
        
        // Take device screenshot
        await browser.saveScreenshot('./screenshots/device-info.png')
    })

    it('should test touch interactions', async () => {
        await browser.url('https://www.google.com')
        await browser.pause(2000)
        
        // Test scroll
        console.log('Testing scroll down...')
        await browser.execute(() => {
            window.scrollBy(0, 200)
        })
        await browser.pause(1000)
        
        console.log('Testing scroll up...')
        await browser.execute(() => {
            window.scrollBy(0, -200)
        })
        await browser.pause(1000)
        
        // Verify we can click on elements
        const searchBox = await $('input[name="q"]')
        if (await searchBox.isDisplayed()) {
            await searchBox.click()
            console.log('Successfully clicked search box')
        }
        
        await browser.saveScreenshot('./screenshots/touch-interactions.png')
    })

    afterEach(async () => {
        // Log information after each test
        console.log('Test completed successfully')
    })
})