import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../PageObjects/LoginPage';
import { TestConstants } from '../Constants/TestConstants';
import { page } from '../Utilities/BrowserContext';

let loginPage: LoginPage;

// Given steps - Preconditions
Given('I am on the login choices page', async function () {
    loginPage = new LoginPage(page);
    await page.goto(TestConstants.LOGIN_CHOICES_URL);
    await loginPage.waitForLoginChoicesPageLoad();
});

// When steps - Actions
When('I click on the {string} login option', async function (loginType: string) {
    loginPage = loginPage || new LoginPage(page);
    await loginPage.clickLoginOption(loginType);
});

When('I click on the Personal login option', async function () {
    loginPage = loginPage || new LoginPage(page);
    await loginPage.clickPersonalLogin();
});

When('I click on the Business login option', async function () {
    loginPage = loginPage || new LoginPage(page);
    await loginPage.clickBusinessLogin();
});

When('I click on the Client Fund Service option', async function () {
    loginPage = loginPage || new LoginPage(page);
    await loginPage.clickClientFundService();
});

When('I click on the WealthNet option', async function () {
    loginPage = loginPage || new LoginPage(page);
    await loginPage.clickWealthNet();
});

When('I select the {string} login type from the options', async function (loginType: string) {
    loginPage = loginPage || new LoginPage(page);
    
    switch (loginType.toLowerCase()) {
        case 'personal':
            await loginPage.clickPersonalLogin();
            break;
        case 'business':
            await loginPage.clickBusinessLogin();
            break;
        default:
            throw new Error(`Unsupported login type: ${loginType}`);
    }
});

// Then steps - Assertions
Then('I should be redirected to the login choices page', async function () {
    await page.waitForLoadState('networkidle');
    loginPage = loginPage || new LoginPage(page);
    
    const currentURL = await loginPage.getCurrentURL();
    expect(currentURL).toContain('login-choices');
});

Then('I should see the page title {string}', async function (expectedTitle: string) {
    await page.waitForLoadState('domcontentloaded');
    loginPage = loginPage || new LoginPage(page);
    
    const actualTitle = await loginPage.getCurrentTitle();
    expect(actualTitle).toBe(expectedTitle);
});

Then('I should see the heading {string}', async function (expectedHeading: string) {
    loginPage = loginPage || new LoginPage(page);
    
    const headingText = await loginPage.getHeadingText();
    expect(headingText).toContain(expectedHeading);
});

Then('I should see login options for {string} and {string}', async function (option1: string, option2: string) {
    loginPage = loginPage || new LoginPage(page);
    
    const loginOptionsVisible = await loginPage.verifyLoginOptions(option1, option2);
    expect(loginOptionsVisible).toBeTruthy();
    
    // Additional specific checks
    const personalVisible = await loginPage.verifyPersonalLoginOption();
    const businessVisible = await loginPage.verifyBusinessLoginOption();
    
    expect(personalVisible).toBeTruthy();
    expect(businessVisible).toBeTruthy();
});

Then('I should be redirected to the {string} login page', async function (loginType: string) {
    await page.waitForLoadState('networkidle');
    
    const currentURL = page.url();
    
    switch (loginType.toLowerCase()) {
        case 'personal':
            expect(currentURL).toContain('secure.bnz.co.nz/foyer/target/ib');
            break;
        case 'business':
            expect(currentURL).toContain('secure.bnz.co.nz/foyer/target/ib4b');
            break;
        default:
            throw new Error(`Unknown login type: ${loginType}`);
    }
});

Then('the URL should contain {string}', async function (expectedUrlPart: string) {
    const currentURL = page.url();
    expect(currentURL).toContain(expectedUrlPart);
});

Then('I should see alternative login options', async function () {
    loginPage = loginPage || new LoginPage(page);
    
    const alternativeOptionsVisible = await loginPage.verifyAlternativeLoginOptions();
    expect(alternativeOptionsVisible).toBeTruthy();
});

Then('I should see {string} option', async function (optionName: string) {
    loginPage = loginPage || new LoginPage(page);
    
    const optionVisible = await loginPage.verifySpecificAlternativeOption(optionName);
    expect(optionVisible).toBeTruthy();
});

Then('the login page should have proper accessibility elements', async function () {
    loginPage = loginPage || new LoginPage(page);
    
    const hasAccessibilityElements = await loginPage.verifyAccessibilityElements();
    expect(hasAccessibilityElements).toBeTruthy();
});

Then('the page should have a main heading', async function () {
    loginPage = loginPage || new LoginPage(page);
    
    const hasMainHeading = await loginPage.verifyLoginPageHeading();
    expect(hasMainHeading).toBeTruthy();
});

Then('navigation elements should be accessible', async function () {
    loginPage = loginPage || new LoginPage(page);
    
    const hasNavigation = await loginPage.verifyElementVisible('nav[role="navigation"], header nav');
    expect(hasNavigation).toBeTruthy();
});

// Parameterized and reusable step definitions
Then('I should see the login page element {string}', async function (elementSelector: string) {
    loginPage = loginPage || new LoginPage(page);
    
    const elementVisible = await loginPage.verifyElementVisible(elementSelector);
    expect(elementVisible).toBeTruthy();
});

Then('I should see text {string} on the login page', async function (expectedText: string) {
    const textLocator = page.locator(`text=${expectedText}`);
    await expect(textLocator).toBeVisible();
});

Then('I should not see text {string} on the login page', async function (unexpectedText: string) {
    const textLocator = page.locator(`text=${unexpectedText}`);
    await expect(textLocator).not.toBeVisible();
});

Then('I should see the login page URL is {string}', async function (expectedURL: string) {
    const currentURL = page.url();
    expect(currentURL).toBe(expectedURL);
});

Then('I should see the login page URL contains {string}', async function (urlPart: string) {
    const currentURL = page.url();
    expect(currentURL).toContain(urlPart);
});

Then('I wait for the login page to load completely', async function () {
    loginPage = loginPage || new LoginPage(page);
    await loginPage.waitForLoginChoicesPageLoad();
});

// Verification steps for specific login types
Then('I should see Personal login option is clickable', async function () {
    loginPage = loginPage || new LoginPage(page);
    
    const personalLogin = loginPage.getPersonalLoginLink();
    await expect(personalLogin).toBeVisible();
    await expect(personalLogin).toBeEnabled();
});

Then('I should see Business login option is clickable', async function () {
    loginPage = loginPage || new LoginPage(page);
    
    const businessLogin = loginPage.getBusinessLoginLink();
    await expect(businessLogin).toBeVisible();
    await expect(businessLogin).toBeEnabled();
});

// Steps for verifying multiple elements at once
Then('I should see all primary login options', async function () {
    loginPage = loginPage || new LoginPage(page);
    
    const personalVisible = await loginPage.verifyPersonalLoginOption();
    const businessVisible = await loginPage.verifyBusinessLoginOption();
    
    expect(personalVisible).toBeTruthy();
    expect(businessVisible).toBeTruthy();
});

Then('I should see all alternative login services', async function () {
    loginPage = loginPage || new LoginPage(page);
    
    const clientFundVisible = await loginPage.verifySpecificAlternativeOption('Client Fund Service');
    const wealthNetVisible = await loginPage.verifySpecificAlternativeOption('WealthNet');
    
    expect(clientFundVisible).toBeTruthy();
    expect(wealthNetVisible).toBeTruthy();
});