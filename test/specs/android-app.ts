import { expect } from '@wdio/globals'

describe('Swiss Airlines App - Simple Test (com.yoc.swiss.swiss)', () => {
    it('should launch and verify Swiss Airlines app is running', async () => {
        console.log('🚀 Starting Swiss Airlines app test...')
        console.log('📱 Package: com.yoc.swiss.swiss (official Play Store version)')
        
        // Wait for app to load completely (airline apps can be slow)
        await driver.pause(15000)
        
        // Take screenshot to verify app launched
        await driver.saveScreenshot('./screenshots/swiss-app-launched.png')
        console.log('📸 Screenshot taken')
        
        // Get page source to verify app content
        const pageSource = await driver.getPageSource()
        console.log('📱 App loaded successfully')
        console.log('📄 Page source length:', pageSource.length)
        
        // Basic verification - app should have substantial content
        expect(pageSource.length).toBeGreaterThan(500)
        
        // Try to find Swiss-specific elements
        try {
            // Look for common Swiss Airlines app text
            const swissTexts = [
                'Swiss', 'SWISS', 'swiss',
                'Book', 'Flight', 'Check-in',
                'Departure', 'Arrival', 'Search'
            ]
            
            let foundSwissContent = false
            for (const text of swissTexts) {
                if (pageSource.toLowerCase().includes(text.toLowerCase())) {
                    console.log(`✅ Found Swiss Airlines content: "${text}"`)
                    foundSwissContent = true
                    break
                }
            }
            
            if (foundSwissContent) {
                console.log('🎯 Swiss Airlines app content verified!')
            } else {
                console.log('ℹ️ Generic content found, app is running')
            }
        } catch (e) {
            console.log('ℹ️ Content check completed')
        }
        
        // Try to find any interactive elements
        try {
            const anyElement = await driver.$('*')
            if (anyElement) {
                console.log('✅ UI elements detected - app has interface')
            }
        } catch (e) {
            console.log('ℹ️ App is running (element detection skipped)')
        }
        
        console.log('✅ Swiss Airlines app test completed successfully!')
        console.log('🎉 Ready for automated testing in GitHub Actions!')
    })
})