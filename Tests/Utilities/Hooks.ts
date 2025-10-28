import { Before, After, BeforeAll, AfterAll, setDefaultTimeout } from '@cucumber/cucumber';
import { browserManager, initBrowser, closeBrowser, takeScreenshot } from '../Utilities/BrowserContext';
import { TestConstants } from '../Constants/TestConstants';

// Set default timeout for all steps
setDefaultTimeout(TestConstants.DEFAULT_TIMEOUT);

// Global setup - runs once before all scenarios
BeforeAll(async function () {
    console.log('🚀 Starting BNZ Banking Tests...');
    console.log('🔧 Initializing browser environment...');
    
    try {
        // Initialize browser with configuration
        const browserName = process.env.BROWSER || 'chromium';
        const headless = process.env.HEADLESS !== 'false';
        
        await initBrowser(browserName, headless);
        console.log(`✅ Browser ${browserName} initialized successfully`);
        
    } catch (error) {
        console.error('❌ Failed to initialize browser:', error);
        throw error;
    }
});

// Global teardown - runs once after all scenarios
AfterAll(async function () {
    console.log('🧹 Cleaning up test environment...');
    
    try {
        await closeBrowser();
        console.log('✅ Browser closed successfully');
        console.log('🏁 BNZ Banking Tests completed');
        
    } catch (error) {
        console.error('❌ Error during cleanup:', error);
    }
});

// Scenario setup - runs before each scenario
Before(async function (scenario) {
    console.log(`\n🧪 Starting scenario: ${scenario.pickle.name}`);
    console.log(`📋 Tags: ${scenario.pickle.tags.map(tag => tag.name).join(', ')}`);
    
    try {
        // Clear browser data for fresh start
        await browserManager.clearBrowserData();
        
        // Set viewport to standard desktop size
        await browserManager.setViewportSize(1920, 1080);
        
        // Store scenario info for potential debugging
        this.scenarioName = scenario.pickle.name;
        this.scenarioTags = scenario.pickle.tags.map(tag => tag.name);
        
    } catch (error) {
        console.error('❌ Error in Before hook:', error);
        throw error;
    }
});

// Scenario teardown - runs after each scenario
After(async function (scenario) {
    const scenarioName = scenario.pickle.name;
    const result = scenario.result?.status || 'unknown';
    
    console.log(`📊 Scenario '${scenarioName}' result: ${result.toUpperCase()}`);
    
    try {
        // Take screenshot if scenario failed
        if (scenario.result?.status === 'FAILED') {
            console.log('📸 Taking screenshot for failed scenario...');
            
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const screenshotName = `failed-${scenarioName.replace(/[^a-zA-Z0-9]/g, '_')}-${timestamp}.png`;
            
            const screenshotPath = await takeScreenshot(screenshotName);
            console.log(`💾 Screenshot saved: ${screenshotPath}`);
            
            // Attach screenshot to test report (if supported)
            if (this.attach) {
                const screenshot = await browserManager.getPage()?.screenshot();
                if (screenshot) {
                    this.attach(screenshot, 'image/png');
                }
            }
            
            // Capture page information for debugging
            const pageInfo = await browserManager.capturePageInfo();
            console.log(`🔍 Page URL: ${pageInfo.url}`);
            console.log(`📄 Page Title: ${pageInfo.title}`);
            
            // Log browser console errors
            const page = browserManager.getPage();
            if (page) {
                const consoleErrors = await page.evaluate(() => {
                    return window.console.error.toString();
                });
                if (consoleErrors) {
                    console.log('🚨 Browser console errors:', consoleErrors);
                }
            }
        }
        
        // Take screenshot for critical scenarios (even if passed)
        if (this.scenarioTags?.includes('@critical') && scenario.result?.status === 'PASSED') {
            console.log('📸 Taking screenshot for critical scenario...');
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const screenshotName = `critical-${scenarioName.replace(/[^a-zA-Z0-9]/g, '_')}-${timestamp}.png`;
            await takeScreenshot(screenshotName);
        }
        
    } catch (error) {
        console.error('❌ Error in After hook:', error);
    }
    
    console.log(`✅ Scenario cleanup completed\n`);
});

// Tagged hooks for specific scenarios
Before('@slow', async function () {
    // Enable slow motion for scenarios tagged with @slow
    console.log('🐌 Enabling slow motion for @slow tagged scenario');
    await browserManager.enableSlowMotion(500);
});

Before('@mobile', async function () {
    // Set mobile viewport for scenarios tagged with @mobile
    console.log('📱 Setting mobile viewport for @mobile tagged scenario');
    await browserManager.setViewportSize(375, 667);
});

Before('@tablet', async function () {
    // Set tablet viewport for scenarios tagged with @tablet
    console.log('📱 Setting tablet viewport for @tablet tagged scenario');
    await browserManager.setViewportSize(768, 1024);
});

Before('@desktop', async function () {
    // Ensure desktop viewport for scenarios tagged with @desktop
    console.log('🖥️ Setting desktop viewport for @desktop tagged scenario');
    await browserManager.setViewportSize(1920, 1080);
});

// Hook for scenarios that need clean slate
Before('@clean', async function () {
    console.log('🧹 Performing deep cleanup for @clean tagged scenario');
    
    const page = browserManager.getPage();
    if (page) {
        // Clear all storage
        await page.evaluate(() => {
            localStorage.clear();
            sessionStorage.clear();
        });
        
        // Clear cookies
        await browserManager.clearBrowserData();
    }
});

// Hook for performance testing scenarios
Before('@performance', async function () {
    console.log('⚡ Setting up performance monitoring for @performance tagged scenario');
    
    const page = browserManager.getPage();
    if (page) {
        // Start performance monitoring
        await page.addInitScript(() => {
            window.performance.mark('test-start');
        });
    }
});

After('@performance', async function () {
    const page = browserManager.getPage();
    if (page) {
        // Measure performance
        const performanceData = await page.evaluate(() => {
            window.performance.mark('test-end');
            window.performance.measure('test-duration', 'test-start', 'test-end');
            
            const measure = window.performance.getEntriesByName('test-duration')[0];
            return {
                duration: measure?.duration || 0,
                startTime: measure?.startTime || 0
            };
        });
        
        console.log(`⏱️ Performance - Duration: ${performanceData.duration}ms`);
        
        // Log if test took longer than expected
        if (performanceData.duration > 10000) { // 10 seconds
            console.warn(`⚠️ Slow performance detected: ${performanceData.duration}ms`);
        }
    }
});

// Error handling for uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('💥 Uncaught Exception:', error);
    // Don't exit process, let test framework handle it
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('💥 Unhandled Rejection at:', promise, 'reason:', reason);
    // Don't exit process, let test framework handle it
});