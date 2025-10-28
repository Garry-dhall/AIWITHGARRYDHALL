import { test, expect } from '@playwright/test';
import { HomePage } from '../PageObjects/HomePage';
import { LoginPage } from '../PageObjects/LoginPage';
import { TestConstants } from '../Constants/TestConstants';

test.describe('BNZ Login Navigation Tests', () => {
    let homePage: HomePage;
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        
        // Navigate to BNZ homepage before each test
        await homePage.navigateToHomePage();
        await homePage.waitForPageLoad();
    });

    test('should successfully navigate to login choices page @critical @smoke', async ({ page }) => {
        // When: Click on the Login button in the header
        await homePage.clickLoginButton();

        // Then: Verify redirection to login choices page
        await expect(page).toHaveURL(/.*login-choices/);
        await expect(page).toHaveTitle(TestConstants.LOGIN_CHOICES_TITLE);
        
        // And: Verify page elements
        const heading = loginPage.getPageHeading();
        await expect(heading).toBeVisible();
        await expect(heading).toContainText('Internet banking login');
        
        // And: Verify login options
        const personalLogin = loginPage.getPersonalLoginLink();
        const businessLogin = loginPage.getBusinessLoginLink();
        await expect(personalLogin).toBeVisible();
        await expect(businessLogin).toBeVisible();
    });

    test.describe('Navigate to specific login types', () => {
        test.beforeEach(async () => {
            // Navigate to login choices page before each specific login test
            await homePage.clickLoginButton();
            await loginPage.waitForLoginChoicesPageLoad();
        });

        test('should navigate to Personal login page @positive', async ({ page }) => {
            // When: Click on Personal login option
            await loginPage.clickPersonalLogin();

            // Then: Verify redirection to Personal login page
            await expect(page).toHaveURL(/.*secure\.bnz\.co\.nz\/foyer\/target\/ib$/);
        });

        test('should navigate to Business login page @positive', async ({ page }) => {
            // When: Click on Business login option
            await loginPage.clickBusinessLogin();

            // Then: Verify redirection to Business login page
            await expect(page).toHaveURL(/.*secure\.bnz\.co\.nz\/foyer\/target\/ib4b$/);
        });
    });

    test('should display alternative login services @alternative', async ({ page }) => {
        // When: Navigate to login choices page
        await homePage.clickLoginButton();

        // Then: Verify alternative login options are visible
        const clientFundService = loginPage.getClientFundServiceLink();
        const wealthNet = loginPage.getWealthNetLink();
        
        await expect(clientFundService).toBeVisible();
        await expect(wealthNet).toBeVisible();
        
        // And: Verify text content
        await expect(page.locator('text=Client Fund Service')).toBeVisible();
        await expect(page.locator('text=WealthNet')).toBeVisible();
    });

    test('should have proper accessibility elements @accessibility', async ({ page }) => {
        // When: Navigate to login choices page
        await homePage.clickLoginButton();

        // Then: Verify accessibility elements
        const mainContent = loginPage.getMainContent();
        const headerNav = loginPage.getHeaderNavigation();
        const pageHeading = loginPage.getPageHeading();

        await expect(mainContent).toBeVisible();
        await expect(headerNav).toBeVisible();
        await expect(pageHeading).toBeVisible();
        
        // And: Verify heading hierarchy
        const h1Elements = page.locator('h1');
        await expect(h1Elements).toHaveCount(1);
        
        // And: Verify navigation landmarks
        const navElements = page.locator('nav');
        await expect(navElements.first()).toBeVisible();
    });

    test('should navigate back to homepage from login page @navigation', async ({ page }) => {
        // Given: User is on login choices page
        await homePage.clickLoginButton();
        await expect(page).toHaveURL(/.*login-choices/);

        // When: Click on BNZ logo
        await loginPage.clickBNZLogo();

        // Then: Verify redirection back to homepage
        await expect(page).toHaveURL(TestConstants.BASE_URL);
        await expect(page).toHaveTitle(TestConstants.HOMEPAGE_TITLE);
        
        // And: Verify homepage elements are visible
        const logo = homePage.getBNZLogo();
        const loginButton = homePage.getLoginButton();
        await expect(logo).toBeVisible();
        await expect(loginButton).toBeVisible();
    });

    test('should handle page load timeouts gracefully @reliability', async ({ page }) => {
        // Set shorter timeout for this test
        page.setDefaultTimeout(5000);
        
        try {
            await homePage.clickLoginButton();
            await loginPage.waitForLoginChoicesPageLoad();
            
            // Verify page loaded successfully
            await expect(page).toHaveURL(/.*login-choices/);
        } catch (error) {
            // If timeout occurs, take screenshot for debugging
            await page.screenshot({ path: './Tests/Reports/screenshots/timeout-error.png' });
            throw error;
        }
    });

    test('should maintain session state during navigation @session', async ({ page }) => {
        // When: Navigate through different pages
        await homePage.clickLoginButton();
        await expect(page).toHaveURL(/.*login-choices/);
        
        // Navigate back to homepage
        await loginPage.clickBNZLogo();
        await expect(page).toHaveURL(TestConstants.BASE_URL);
        
        // Navigate to login again
        await homePage.clickLoginButton();
        
        // Then: Verify page loads correctly again
        await expect(page).toHaveURL(/.*login-choices/);
        await expect(loginPage.getPageHeading()).toBeVisible();
    });

    test('should display correct page elements after navigation @ui', async ({ page }) => {
        // When: Navigate to login page
        await homePage.clickLoginButton();
        
        // Then: Verify all expected elements are present
        await expect(loginPage.getPageHeading()).toBeVisible();
        await expect(loginPage.getSubHeading()).toBeVisible();
        await expect(loginPage.getPersonalLoginLink()).toBeVisible();
        await expect(loginPage.getBusinessLoginLink()).toBeVisible();
        await expect(loginPage.getClientFundServiceLink()).toBeVisible();
        await expect(loginPage.getWealthNetLink()).toBeVisible();
        
        // And: Verify page structure
        await expect(page.locator('main')).toBeVisible();
        await expect(page.locator('header, nav')).toBeVisible();
        await expect(page.locator('footer')).toBeVisible();
    });

    test('should work across different viewport sizes @responsive', async ({ page }) => {
        const viewports = [
            { width: 1920, height: 1080 }, // Desktop
            { width: 768, height: 1024 },  // Tablet
            { width: 375, height: 667 }    // Mobile
        ];

        for (const viewport of viewports) {
            await page.setViewportSize(viewport);
            
            // Navigate to login page
            await homePage.clickLoginButton();
            
            // Verify elements are still visible and functional
            await expect(loginPage.getPageHeading()).toBeVisible();
            await expect(loginPage.getPersonalLoginLink()).toBeVisible();
            await expect(loginPage.getBusinessLoginLink()).toBeVisible();
            
            // Navigate back to homepage
            await loginPage.clickBNZLogo();
            await expect(page).toHaveURL(TestConstants.BASE_URL);
        }
    });
});