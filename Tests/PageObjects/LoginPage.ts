import { Page, Locator } from '@playwright/test';
import { TestConstants } from '../Constants/TestConstants';

export class LoginPage {
    private page: Page;

    // Element selectors based on unique identifiers from the login choices page
    private readonly selectors = {
        bnzLogo: 'a[href="/"] img[alt="BNZ Logo"]',
        pageHeading: 'h1:has-text("Internet banking login")',
        subHeading: 'h4:has-text("Choose type of Internet Banking")',
        personalLoginLink: 'a[href="https://secure.bnz.co.nz/foyer/target/ib"]',
        businessLoginLink: 'a[href="https://secure.bnz.co.nz/foyer/target/ib4b"]',
        clientFundServiceLink: 'a[href="https://www.bnz.co.nz/cfs/app/login.html"]',
        wealthNetLink: 'a[href="https://wealthnet.bnz.co.nz/"]',
        mainContent: 'main',
        headerNavigation: 'nav[role="navigation"], header nav',
        supportLink: 'a[href="/support"]',
        contactLink: 'a[href="/contact"]',
        searchLink: 'a[href="/search"]',
        loginLink: 'a[href="/login-choices"]',
        footer: 'footer, [role="contentinfo"]',
        personalOrBusinessHeading: 'h2:has-text("Personal or Business")',
        orHeading: 'h4:has-text("Or")',
        alternativeServicesList: 'ul li'
    };

    constructor(page: Page) {
        this.page = page;
    }

    // Navigation methods
    async clickPersonalLogin(): Promise<void> {
        const personalLink = this.getPersonalLoginLink();
        await personalLink.waitFor({ state: 'visible', timeout: TestConstants.ELEMENT_WAIT_TIME });
        await personalLink.click();
    }

    async clickBusinessLogin(): Promise<void> {
        const businessLink = this.getBusinessLoginLink();
        await businessLink.waitFor({ state: 'visible', timeout: TestConstants.ELEMENT_WAIT_TIME });
        await businessLink.click();
    }

    async clickLoginOption(loginType: string): Promise<void> {
        switch (loginType.toLowerCase()) {
            case 'personal':
                await this.clickPersonalLogin();
                break;
            case 'business':
                await this.clickBusinessLogin();
                break;
            case 'client fund service':
                await this.clickClientFundService();
                break;
            case 'wealthnet':
                await this.clickWealthNet();
                break;
            default:
                throw new Error(`Unknown login type: ${loginType}`);
        }
    }

    async clickClientFundService(): Promise<void> {
        const clientFundLink = this.getClientFundServiceLink();
        await clientFundLink.waitFor({ state: 'visible', timeout: TestConstants.ELEMENT_WAIT_TIME });
        await clientFundLink.click();
    }

    async clickWealthNet(): Promise<void> {
        const wealthNetLink = this.getWealthNetLink();
        await wealthNetLink.waitFor({ state: 'visible', timeout: TestConstants.ELEMENT_WAIT_TIME });
        await wealthNetLink.click();
    }

    async clickBNZLogo(): Promise<void> {
        const logo = this.getBNZLogo();
        await logo.waitFor({ state: 'visible', timeout: TestConstants.ELEMENT_WAIT_TIME });
        await logo.click();
        await this.page.waitForLoadState('networkidle');
    }

    // Element getters
    getBNZLogo(): Locator {
        return this.page.locator(this.selectors.bnzLogo);
    }

    getPageHeading(): Locator {
        return this.page.locator(this.selectors.pageHeading);
    }

    getSubHeading(): Locator {
        return this.page.locator(this.selectors.subHeading);
    }

    getPersonalLoginLink(): Locator {
        return this.page.locator(this.selectors.personalLoginLink);
    }

    getBusinessLoginLink(): Locator {
        return this.page.locator(this.selectors.businessLoginLink);
    }

    getClientFundServiceLink(): Locator {
        return this.page.locator(this.selectors.clientFundServiceLink);
    }

    getWealthNetLink(): Locator {
        return this.page.locator(this.selectors.wealthNetLink);
    }

    getMainContent(): Locator {
        return this.page.locator(this.selectors.mainContent);
    }

    getHeaderNavigation(): Locator {
        return this.page.locator(this.selectors.headerNavigation);
    }

    getPersonalOrBusinessHeading(): Locator {
        return this.page.locator(this.selectors.personalOrBusinessHeading);
    }

    getAlternativeServicesList(): Locator {
        return this.page.locator(this.selectors.alternativeServicesList);
    }

    // Verification methods
    async verifyPageTitle(expectedTitle: string): Promise<boolean> {
        const title = await this.page.title();
        return title === expectedTitle;
    }

    async verifyPageURL(expectedURL: string): Promise<boolean> {
        const currentURL = this.page.url();
        return currentURL.includes(expectedURL) || currentURL === expectedURL;
    }

    async verifyElementVisible(selector: string): Promise<boolean> {
        try {
            const element = this.page.locator(selector);
            await element.waitFor({ state: 'visible', timeout: TestConstants.SHORT_TIMEOUT });
            return await element.isVisible();
        } catch {
            return false;
        }
    }

    async verifyElementText(selector: string, expectedText: string): Promise<boolean> {
        try {
            const element = this.page.locator(selector);
            const actualText = await element.textContent();
            return actualText?.includes(expectedText) ?? false;
        } catch {
            return false;
        }
    }

    async verifyLoginPageHeading(): Promise<boolean> {
        return await this.verifyElementVisible(this.selectors.pageHeading);
    }

    async verifyLoginPageSubHeading(): Promise<boolean> {
        return await this.verifyElementVisible(this.selectors.subHeading);
    }

    async verifyPersonalLoginOption(): Promise<boolean> {
        return await this.verifyElementVisible(this.selectors.personalLoginLink);
    }

    async verifyBusinessLoginOption(): Promise<boolean> {
        return await this.verifyElementVisible(this.selectors.businessLoginLink);
    }

    async verifyLoginOptions(option1: string, option2: string): Promise<boolean> {
        const personalVisible = await this.verifyPersonalLoginOption();
        const businessVisible = await this.verifyBusinessLoginOption();
        
        return personalVisible && businessVisible;
    }

    async verifyAlternativeLoginOptions(): Promise<boolean> {
        const clientFundVisible = await this.verifyElementVisible(this.selectors.clientFundServiceLink);
        const wealthNetVisible = await this.verifyElementVisible(this.selectors.wealthNetLink);
        
        return clientFundVisible && wealthNetVisible;
    }

    async verifySpecificAlternativeOption(optionName: string): Promise<boolean> {
        const optionLocator = this.page.locator(`text=${optionName}`);
        return await optionLocator.isVisible();
    }

    async verifyAccessibilityElements(): Promise<boolean> {
        // Check for main heading
        const hasMainHeading = await this.verifyElementVisible(this.selectors.pageHeading);
        
        // Check for navigation elements
        const hasNavigation = await this.verifyElementVisible(this.selectors.headerNavigation);
        
        // Check for main content area
        const hasMainContent = await this.verifyElementVisible(this.selectors.mainContent);
        
        return hasMainHeading && hasNavigation && hasMainContent;
    }

    async getCurrentURL(): Promise<string> {
        return this.page.url();
    }

    async getCurrentTitle(): Promise<string> {
        return await this.page.title();
    }

    async getHeadingText(): Promise<string | null> {
        const heading = this.getPageHeading();
        return await heading.textContent();
    }

    // Wait methods
    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(1000);
    }

    async waitForElement(selector: string, timeout: number = TestConstants.ELEMENT_WAIT_TIME): Promise<void> {
        await this.page.locator(selector).waitFor({ state: 'visible', timeout });
    }

    async waitForLoginChoicesPageLoad(): Promise<void> {
        await this.waitForElement(this.selectors.pageHeading);
        await this.waitForElement(this.selectors.personalLoginLink);
        await this.waitForElement(this.selectors.businessLoginLink);
    }
}