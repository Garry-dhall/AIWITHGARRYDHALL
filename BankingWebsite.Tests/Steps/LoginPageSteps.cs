using Microsoft.Playwright;
using BankingWebsite.Tests.PageObjects;
using BankingWebsite.Tests.Constants;
using TechTalk.SpecFlow;
using FluentAssertions;

namespace BankingWebsite.Tests.Steps
{
    [Binding]
    public class LoginPageSteps
    {
        private readonly IPage _page;
        private readonly LoginPage _loginPage;

        public LoginPageSteps(IPage page)
        {
            _page = page;
            _loginPage = new LoginPage(_page);
        }

        [Given(@"I am on the login choices page")]
        public async Task GivenIAmOnTheLoginChoicesPage()
        {
            await _loginPage.NavigateToLoginPage();
            var isLoaded = await _loginPage.IsLoginPageLoaded();
            isLoaded.Should().BeTrue("Login page should be loaded successfully");
        }

        [When(@"I click on the ""([^""]*)"" link")]
        [When(@"I click on the ""([^""]*)"" login option")]
        public async Task WhenIClickOnTheLink(string linkText)
        {
            switch (linkText.ToLower())
            {
                case "login":
                    var homePage = new HomePage(_page);
                    await homePage.ClickLoginLink();
                    break;
                case "personal":
                    await _loginPage.ClickPersonalLoginLink();
                    break;
                case "business":
                    await _loginPage.ClickBusinessLoginLink();
                    break;
                case "client fund service":
                    await _loginPage.ClickClientFundServiceLink();
                    break;
                case "wealthnet":
                    await _loginPage.ClickWealthNetLink();
                    break;
                case "support":
                    await _loginPage.ClickSupportLink();
                    break;
                case "contact":
                    await _loginPage.ClickContactLink();
                    break;
                default:
                    throw new ArgumentException($"Link '{linkText}' is not implemented in step definitions");
            }
        }

        [When(@"I navigate to the login choices page")]
        public async Task WhenINavigateToTheLoginChoicesPage()
        {
            await _loginPage.NavigateToLoginPage();
        }

        [Then(@"I should be redirected to the login choices page")]
        public async Task ThenIShouldBeRedirectedToTheLoginChoicesPage()
        {
            var currentUrl = await _loginPage.GetCurrentUrl();
            currentUrl.Should().Be(TestConstants.LOGIN_CHOICES_URL, "Should be on the login choices page");
        }

        [Then(@"I should see the ""([^""]*)"" heading")]
        public async Task ThenIShouldSeeTheHeading(string headingText)
        {
            switch (headingText.ToLower())
            {
                case "internet banking login":
                    var isHeadingVisible = await _loginPage.IsInternetBankingLoginHeadingVisible();
                    isHeadingVisible.Should().BeTrue($"'{headingText}' heading should be visible");
                    break;
                case "choose type of internet banking":
                    var isChooseTypeVisible = await _loginPage.IsChooseTypeHeadingVisible();
                    isChooseTypeVisible.Should().BeTrue($"'{headingText}' heading should be visible");
                    break;
                default:
                    throw new ArgumentException($"Heading '{headingText}' verification is not implemented");
            }
        }

        [Then(@"I should see the ""([^""]*)"" text")]
        public async Task ThenIShouldSeeTheText(string expectedText)
        {
            switch (expectedText.ToLower())
            {
                case "choose type of internet banking":
                    var isVisible = await _loginPage.IsChooseTypeHeadingVisible();
                    isVisible.Should().BeTrue($"Text '{expectedText}' should be visible");
                    break;
                default:
                    // For other text verification, we can add more specific locators
                    throw new ArgumentException($"Text '{expectedText}' verification is not implemented");
            }
        }

        [Then(@"I should see ""([^""]*)"" and ""([^""]*)"" login options")]
        public async Task ThenIShouldSeeAndLoginOptions(string option1, string option2)
        {
            var isPersonalVisible = await _loginPage.IsPersonalLoginLinkVisible();
            var isBusinessVisible = await _loginPage.IsBusinessLoginLinkVisible();
            
            isPersonalVisible.Should().BeTrue($"'{option1}' login option should be visible");
            isBusinessVisible.Should().BeTrue($"'{option2}' login option should be visible");
        }

        [Then(@"I should see the login page title ""([^""]*)""")]
        public async Task ThenIShouldSeeTheLoginPageTitle(string expectedTitle)
        {
            var actualTitle = await _loginPage.GetPageTitle();
            actualTitle.Should().Be(expectedTitle, $"Login page title should be '{expectedTitle}'");
        }

        [Then(@"I should see the ""([^""]*)"" section")]
        public async Task ThenIShouldSeeTheSection(string sectionName)
        {
            switch (sectionName.ToLower())
            {
                case "personal or business":
                    var isPersonalVisible = await _loginPage.IsPersonalLoginLinkVisible();
                    var isBusinessVisible = await _loginPage.IsBusinessLoginLinkVisible();
                    isPersonalVisible.Should().BeTrue("Personal login link should be visible");
                    isBusinessVisible.Should().BeTrue("Business login link should be visible");
                    break;
                default:
                    throw new ArgumentException($"Section '{sectionName}' verification is not implemented");
            }
        }

        [Then(@"I should see the ""([^""]*)"" login link")]
        public async Task ThenIShouldSeeTheLoginLink(string linkType)
        {
            switch (linkType.ToLower())
            {
                case "personal":
                    var isPersonalVisible = await _loginPage.IsPersonalLoginLinkVisible();
                    isPersonalVisible.Should().BeTrue("Personal login link should be visible");
                    break;
                case "business":
                    var isBusinessVisible = await _loginPage.IsBusinessLoginLinkVisible();
                    isBusinessVisible.Should().BeTrue("Business login link should be visible");
                    break;
                default:
                    throw new ArgumentException($"Login link type '{linkType}' verification is not implemented");
            }
        }

        [Then(@"I should be redirected to the personal internet banking login page")]
        public async Task ThenIShouldBeRedirectedToThePersonalInternetBankingLoginPage()
        {
            await Task.Delay(2000); // Wait for navigation
            var currentUrl = await _loginPage.GetCurrentUrl();
            currentUrl.Should().Contain("secure.bnz.co.nz/foyer/target/ib", "Should be on personal internet banking login page");
        }

        [Then(@"I should be redirected to the business internet banking login page")]
        public async Task ThenIShouldBeRedirectedToTheBusinessInternetBankingLoginPage()
        {
            await Task.Delay(2000); // Wait for navigation
            var currentUrl = await _loginPage.GetCurrentUrl();
            currentUrl.Should().Contain("secure.bnz.co.nz/foyer/target/ib4b", "Should be on business internet banking login page");
        }

        [Then(@"the URL should contain ""([^""]*)""")]
        [Then(@"I should be redirected to a page with URL containing ""([^""]*)""")]
        public async Task ThenTheURLShouldContain(string expectedUrlPart)
        {
            await Task.Delay(2000); // Wait for navigation
            var currentUrl = await _loginPage.GetCurrentUrl();
            currentUrl.Should().Contain(expectedUrlPart, $"URL should contain '{expectedUrlPart}'");
        }
    }
}