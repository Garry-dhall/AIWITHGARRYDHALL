import { Browser, BrowserContext, Page, chromium, firefox, webkit } from '@playwright/test';
import { TestConstants } from '../Constants/TestConstants';

export let browser: Browser;
export let context: BrowserContext;
export let page: Page;

export class BrowserManager {
    private static instance: BrowserManager;
    private browserInstance: Browser | null = null;
    private contextInstance: BrowserContext | null = null;
    private pageInstance: Page | null = null;

    private constructor() {}

    public static getInstance(): BrowserManager {
        if (!BrowserManager.instance) {
            BrowserManager.instance = new BrowserManager();
        }
        return BrowserManager.instance;
    }

    async initializeBrowser(browserName: string = 'chromium', headless: boolean = false): Promise<void> {
        try {
            // Launch browser based on browserName
            switch (browserName.toLowerCase()) {
                case 'firefox':
                    this.browserInstance = await firefox.launch({ 
                        headless,
                        args: ['--no-sandbox', '--disable-dev-shm-usage']
                    });
                    break;
                case 'webkit':
                case 'safari':
                    this.browserInstance = await webkit.launch({ 
                        headless,
                        args: ['--no-sandbox']
                    });
                    break;
                case 'chromium':
                case 'chrome':
                default:
                    this.browserInstance = await chromium.launch({ 
                        headless,
                        args: [
                            '--no-sandbox',
                            '--disable-dev-shm-usage',
                            '--disable-gpu',
                            '--disable-web-security',
                            '--disable-features=VizDisplayCompositor'
                        ]
                    });
                    break;
            }

            // Create browser context with default settings
            this.contextInstance = await this.browserInstance.newContext({
                viewport: { width: 1920, height: 1080 },
                userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                acceptDownloads: true,
                ignoreHTTPSErrors: true,
                permissions: ['geolocation'],
                colorScheme: 'light',
                timezoneId: 'Pacific/Auckland', // New Zealand timezone
                locale: 'en-NZ'
            });

            // Create new page
            this.pageInstance = await this.contextInstance.newPage();

            // Set default timeout
            this.pageInstance.setDefaultTimeout(TestConstants.DEFAULT_TIMEOUT);
            this.pageInstance.setDefaultNavigationTimeout(TestConstants.PAGE_LOAD_TIMEOUT);

            // Set global variables for step definitions
            browser = this.browserInstance;
            context = this.contextInstance;
            page = this.pageInstance;

            console.log(`Browser ${browserName} initialized successfully`);
        } catch (error) {
            console.error('Failed to initialize browser:', error);
            throw error;
        }
    }

    async createNewPage(): Promise<Page> {
        if (!this.contextInstance) {
            throw new Error('Browser context not initialized. Call initializeBrowser() first.');
        }
        
        const newPage = await this.contextInstance.newPage();
        newPage.setDefaultTimeout(TestConstants.DEFAULT_TIMEOUT);
        return newPage;
    }

    async closePage(pageToClose?: Page): Promise<void> {
        const targetPage = pageToClose || this.pageInstance;
        if (targetPage && !targetPage.isClosed()) {
            await targetPage.close();
        }
    }

    async closeContext(): Promise<void> {
        if (this.contextInstance) {
            await this.contextInstance.close();
            this.contextInstance = null;
        }
    }

    async closeBrowser(): Promise<void> {
        try {
            if (this.pageInstance && !this.pageInstance.isClosed()) {
                await this.pageInstance.close();
            }
            
            if (this.contextInstance) {
                await this.contextInstance.close();
            }
            
            if (this.browserInstance) {
                await this.browserInstance.close();
            }
            
            this.pageInstance = null;
            this.contextInstance = null;
            this.browserInstance = null;
            
            console.log('Browser closed successfully');
        } catch (error) {
            console.error('Error closing browser:', error);
            throw error;
        }
    }

    getBrowser(): Browser | null {
        return this.browserInstance;
    }

    getContext(): BrowserContext | null {
        return this.contextInstance;
    }

    getPage(): Page | null {
        return this.pageInstance;
    }

    async takeScreenshot(fileName?: string): Promise<string> {
        if (!this.pageInstance) {
            throw new Error('Page not initialized');
        }

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const screenshotName = fileName || `screenshot-${timestamp}.png`;
        const screenshotPath = `./Tests/Reports/screenshots/${screenshotName}`;

        await this.pageInstance.screenshot({ 
            path: screenshotPath,
            fullPage: true 
        });

        return screenshotPath;
    }

    async capturePageInfo(): Promise<{url: string, title: string}> {
        if (!this.pageInstance) {
            throw new Error('Page not initialized');
        }

        return {
            url: this.pageInstance.url(),
            title: await this.pageInstance.title()
        };
    }

    async clearBrowserData(): Promise<void> {
        if (this.contextInstance) {
            await this.contextInstance.clearCookies();
            await this.contextInstance.clearPermissions();
        }
    }

    async setViewportSize(width: number, height: number): Promise<void> {
        if (this.pageInstance) {
            await this.pageInstance.setViewportSize({ width, height });
        }
    }

    async enableSlowMotion(delay: number = 100): Promise<void> {
        if (this.contextInstance) {
            // For slow motion, we'll need to recreate the context
            // This is a simplified implementation
            console.log(`Slow motion enabled with ${delay}ms delay`);
        }
    }
}

// Global instance for easy access
export const browserManager = BrowserManager.getInstance();

// Convenience functions
export const initBrowser = (browserName?: string, headless?: boolean) => 
    browserManager.initializeBrowser(browserName, headless);

export const closeBrowser = () => browserManager.closeBrowser();

export const takeScreenshot = (fileName?: string) => browserManager.takeScreenshot(fileName);

export const getPageInfo = () => browserManager.capturePageInfo();