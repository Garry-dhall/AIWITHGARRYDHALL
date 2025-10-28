using Microsoft.Playwright;
using BankingWebsite.Tests.PageObjects;
using BankingWebsite.Tests.Constants;
using TechTalk.SpecFlow;
using FluentAssertions;

namespace BankingWebsite.Tests.Steps
{
    [Binding]
    public class HomePageSteps
    {
        private readonly IPage _page;
        private readonly HomePage _homePage;

        public HomePageSteps(IPage page)
        {
            _page = page;
            _homePage = new HomePage(_page);
        }

        [Given(@"I am on the BNZ homepage")]
        public async Task GivenIAmOnTheBNZHomepage()
        {
            await _homePage.NavigateToHomePage();
            var isLoaded = await _homePage.IsHomePageLoaded();
            isLoaded.Should().BeTrue("Homepage should be loaded successfully");
        }

        [When(@"I click on the BNZ logo")]
        public async Task WhenIClickOnTheBNZLogo()
        {
            await _homePage.ClickBnzLogo();
        }

        [When(@"I click on the ""([^""]*)"" link from homepage")]
        public async Task WhenIClickOnTheLinkFromHomepage(string linkText)
        {
            switch (linkText.ToLower())
            {
                case "login":
                    await _homePage.ClickLoginLink();
                    break;
                case "register":
                    await _homePage.ClickRegisterLink();
                    break;
                case "personal banking":
                    await _homePage.ClickPersonalBankingLink();
                    break;
                case "business":
                    await _homePage.ClickBusinessBankingLink();
                    break;
                case "everyday banking":
                    await _homePage.ClickEverydayBankingLink();
                    break;
                default:
                    throw new ArgumentException($"Link '{linkText}' is not implemented in step definitions");
            }
        }

        [Then(@"I should see the homepage title ""([^""]*)""")]
        public async Task ThenIShouldSeeTheHomepageTitle(string expectedTitle)
        {
            var actualTitle = await _homePage.GetPageTitle();
            actualTitle.Should().Be(expectedTitle, $"Homepage title should be '{expectedTitle}'");
        }

        [Then(@"I should be redirected to the homepage")]
        public async Task ThenIShouldBeRedirectedToTheHomepage()
        {
            var currentUrl = await _homePage.GetCurrentUrl();
            currentUrl.Should().Be(TestConstants.BNZ_BASE_URL, "Should be on the homepage");
        }

        [Then(@"I should see the login link is visible")]
        public async Task ThenIShouldSeeTheLoginLinkIsVisible()
        {
            var isVisible = await _homePage.IsLoginLinkVisible();
            isVisible.Should().BeTrue("Login link should be visible on homepage");
        }

        [Then(@"I should see the scammer warning heading")]
        public async Task ThenIShouldSeeTheScammerWarningHeading()
        {
            var isVisible = await _homePage.IsScammerHeadingVisible();
            isVisible.Should().BeTrue("Scammer warning heading should be visible");
        }
    }
}