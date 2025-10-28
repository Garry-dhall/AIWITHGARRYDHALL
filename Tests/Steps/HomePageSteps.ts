import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { HomePage } from '../PageObjects/HomePage';
import { TestConstants } from '../Constants/TestConstants';
import { page } from '../Utilities/BrowserContext';

let homePage: HomePage;

// Background steps
Given('I navigate to the BNZ website', async function () {
    homePage = new HomePage(page);
    await homePage.navigateToHomePage();
    await homePage.waitForPageLoad();
});

Given('I am on the BNZ homepage', async function () {
    homePage = new HomePage(page);
    await homePage.navigateToHomePage();
    await homePage.waitForPageLoad();
    
    // Verify we are on the correct page
    const isOnHomepage = await homePage.verifyPageTitle(TestConstants.HOMEPAGE_TITLE);
    expect(isOnHomepage).toBeTruthy();
});

// When steps - Actions
When('I click on the {string} button in the header', async function (buttonName: string) {
    homePage = homePage || new HomePage(page);
    
    switch (buttonName.toLowerCase()) {
        case 'login':
            await homePage.clickLoginButton();
            break;
        case 'apply':
            await homePage.clickNavigationLink('Apply');
            break;
        case 'search':
            await homePage.clickNavigationLink('Search');
            break;
        case 'register':
            await homePage.clickNavigationLink('Register');
            break;
        default:
            throw new Error(`Unknown button: ${buttonName}`);
    }
});

When('I click on the BNZ logo', async function () {
    homePage = homePage || new HomePage(page);
    await homePage.clickBNZLogo();
});

When('I click on the {string} navigation link', async function (linkName: string) {
    homePage = homePage || new HomePage(page);
    await homePage.clickNavigationLink(linkName);
});

When('I navigate to the {string} section', async function (sectionName: string) {
    homePage = homePage || new HomePage(page);
    await homePage.clickNavigationLink(sectionName);
});

// Then steps - Assertions
Then('I should be redirected back to the homepage', async function () {
    await page.waitForLoadState('networkidle');
    
    const currentURL = await homePage.getCurrentURL();
    const isOnHomepage = currentURL === TestConstants.BASE_URL || 
                        currentURL.includes('bnz.co.nz') && !currentURL.includes('login');
    
    expect(isOnHomepage).toBeTruthy();
});

Then('I should see the homepage title {string}', async function (expectedTitle: string) {
    await page.waitForLoadState('domcontentloaded');
    
    const actualTitle = await homePage.getCurrentTitle();
    expect(actualTitle).toBe(expectedTitle);
});

Then('I should be on the BNZ homepage', async function () {
    const isOnHomepage = await homePage.verifyPageTitle(TestConstants.HOMEPAGE_TITLE);
    const hasCorrectURL = await homePage.verifyPageURL(TestConstants.BASE_URL);
    
    expect(isOnHomepage).toBeTruthy();
    expect(hasCorrectURL).toBeTruthy();
});

Then('I should see the BNZ logo', async function () {
    const logoExists = await homePage.verifyBNZLogoExists();
    expect(logoExists).toBeTruthy();
});

Then('I should see the login button', async function () {
    const loginButtonExists = await homePage.verifyLoginButtonExists();
    expect(loginButtonExists).toBeTruthy();
});

Then('I should see the main navigation menu', async function () {
    const navExists = await homePage.verifyHeaderNavigationExists();
    expect(navExists).toBeTruthy();
});

Then('I should see the main content area', async function () {
    const contentExists = await homePage.verifyMainContentExists();
    expect(contentExists).toBeTruthy();
});

Then('the page should have proper accessibility elements', async function () {
    // Check for main content
    const hasMainContent = await homePage.verifyMainContentExists();
    expect(hasMainContent).toBeTruthy();
    
    // Check for navigation
    const hasNavigation = await homePage.verifyHeaderNavigationExists();
    expect(hasNavigation).toBeTruthy();
    
    // Check for logo (important for navigation)
    const hasLogo = await homePage.verifyBNZLogoExists();
    expect(hasLogo).toBeTruthy();
});

Then('I should see the current URL is {string}', async function (expectedURL: string) {
    const currentURL = await homePage.getCurrentURL();
    expect(currentURL).toBe(expectedURL);
});

Then('the URL should contain {string}', async function (urlPart: string) {
    const currentURL = await homePage.getCurrentURL();
    expect(currentURL).toContain(urlPart);
});

// Utility step definitions that can be reused
Then('I should see element with selector {string}', async function (selector: string) {
    const elementExists = await homePage.verifyElementVisible(selector);
    expect(elementExists).toBeTruthy();
});

Then('I should not see element with selector {string}', async function (selector: string) {
    const elementExists = await homePage.verifyElementVisible(selector);
    expect(elementExists).toBeFalsy();
});

Then('I wait for {int} seconds', async function (seconds: number) {
    await page.waitForTimeout(seconds * 1000);
});

Then('I wait for page to load', async function () {
    await homePage.waitForPageLoad();
});

// Parameterized step definitions for reusability
Then('I should see the page title contains {string}', async function (titlePart: string) {
    const actualTitle = await homePage.getCurrentTitle();
    expect(actualTitle).toContain(titlePart);
});

Then('I should be redirected to URL containing {string}', async function (urlPart: string) {
    await page.waitForLoadState('networkidle');
    const currentURL = await homePage.getCurrentURL();
    expect(currentURL).toContain(urlPart);
});