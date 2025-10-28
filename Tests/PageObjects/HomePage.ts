import { Page, Locator } from '@playwright/test';
import { TestConstants } from '../Constants/TestConstants';

export class HomePage {
    private page: Page;

    // Element selectors based on unique identifiers
    private readonly selectors = {
        bnzLogo: '[data-testid="bnz-logo"], a[href="/"] img[alt="BNZ Logo"]',
        loginButton: 'a[href="/login-choices"]',
        loginButtonText: 'text=Login',
        headerNavigation: 'nav[role="navigation"], header nav',
        personalBankingLink: 'text=Personal Banking',
        businessLink: 'a[href="/business-banking"]',
        institutionalLink: 'a[href="/institutional-banking"]',
        privateLink: 'a[href="/private-banking"]',
        applyButton: 'a[href="/apply"]',
        searchButton: 'a[href="/search"]',
        registerButton: 'a[href="/register"]',
        mainContent: 'main',
        pageTitle: 'title',
        scammerHeading: 'h1:has-text("Scammers want you to rush")',
        productNavigation: 'nav ul, main nav ul',
        everydayBankingLink: 'a[href="/personal-banking/everyday-banking"]',
        homeLoanLink: 'a[href="/personal-banking/home-loans"]',
        creditCardsLink: 'a[href="/personal-banking/credit-cards"]',
        kiwiSaverLink: 'a[href="/personal-banking/kiwisaver"]',
        investmentsLink: 'a[href="/personal-banking/investments"]',
        footer: 'footer, [role="contentinfo"]'
    };

    constructor(page: Page) {
        this.page = page;
    }

    // Navigation methods
    async navigateToHomePage(): Promise<void> {
        await this.page.goto(TestConstants.BASE_URL, { 
            waitUntil: 'networkidle',
            timeout: TestConstants.PAGE_LOAD_TIMEOUT 
        });
        await this.page.waitForLoadState('domcontentloaded');
    }

    async clickLoginButton(): Promise<void> {
        const loginButton = this.getLoginButton();
        await loginButton.waitFor({ state: 'visible', timeout: TestConstants.ELEMENT_WAIT_TIME });
        await loginButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    async clickBNZLogo(): Promise<void> {
        const logo = this.getBNZLogo();
        await logo.waitFor({ state: 'visible', timeout: TestConstants.ELEMENT_WAIT_TIME });
        await logo.click();
        await this.page.waitForLoadState('networkidle');
    }

    async clickNavigationLink(linkName: string): Promise<void> {
        const link = this.page.locator(`text=${linkName}`).first();
        await link.waitFor({ state: 'visible', timeout: TestConstants.ELEMENT_WAIT_TIME });
        await link.click();
        await this.page.waitForLoadState('networkidle');
    }

    // Element getters
    getBNZLogo(): Locator {
        return this.page.locator(this.selectors.bnzLogo).first();
    }

    getLoginButton(): Locator {
        return this.page.locator(this.selectors.loginButton);
    }

    getHeaderNavigation(): Locator {
        return this.page.locator(this.selectors.headerNavigation).first();
    }

    getMainContent(): Locator {
        return this.page.locator(this.selectors.mainContent);
    }

    getScammerHeading(): Locator {
        return this.page.locator(this.selectors.scammerHeading);
    }

    getApplyButton(): Locator {
        return this.page.locator(this.selectors.applyButton);
    }

    getSearchButton(): Locator {
        return this.page.locator(this.selectors.searchButton);
    }

    getRegisterButton(): Locator {
        return this.page.locator(this.selectors.registerButton);
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

    async verifyLoginButtonExists(): Promise<boolean> {
        return await this.verifyElementVisible(this.selectors.loginButton);
    }

    async verifyBNZLogoExists(): Promise<boolean> {
        return await this.verifyElementVisible(this.selectors.bnzLogo);
    }

    async verifyHeaderNavigationExists(): Promise<boolean> {
        return await this.verifyElementVisible(this.selectors.headerNavigation);
    }

    async verifyMainContentExists(): Promise<boolean> {
        return await this.verifyElementVisible(this.selectors.mainContent);
    }

    async getCurrentURL(): Promise<string> {
        return this.page.url();
    }

    async getCurrentTitle(): Promise<string> {
        return await this.page.title();
    }

    // Wait methods
    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(1000); // Additional small wait for any animations
    }

    async waitForElement(selector: string, timeout: number = TestConstants.ELEMENT_WAIT_TIME): Promise<void> {
        await this.page.locator(selector).waitFor({ state: 'visible', timeout });
    }
}