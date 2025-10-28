using Microsoft.Playwright;
using BankingWebsite.Tests.Constants;

namespace BankingWebsite.Tests.PageObjects
{
    public class LoginPage
    {
        private readonly IPage _page;

        // Selectors
        private readonly string _internetBankingLoginHeading = "h1:has-text('Internet banking login')";
        private readonly string _chooseTypeHeading = "h4:has-text('Choose type of Internet Banking')";
        private readonly string _personalOrBusinessHeading = "h2";
        private readonly string _personalLoginLink = "[ref=e42]";
        private readonly string _businessLoginLink = "[ref=e43]";
        private readonly string _clientFundServiceLink = "[ref=e47]";
        private readonly string _wealthNetLink = "[ref=e49]";
        private readonly string _bnzLogo = "[ref=e10]";
        private readonly string _supportLink = "[ref=e22]";
        private readonly string _contactLink = "[ref=e24]";

        public LoginPage(IPage page)
        {
            _page = page;
        }

        public async Task NavigateToLoginPage()
        {
            await _page.GotoAsync(TestConstants.LOGIN_CHOICES_URL);
        }

        public async Task ClickPersonalLoginLink()
        {
            await _page.Locator(_personalLoginLink).ClickAsync();
        }

        public async Task ClickBusinessLoginLink()
        {
            await _page.Locator(_businessLoginLink).ClickAsync();
        }

        public async Task ClickClientFundServiceLink()
        {
            await _page.Locator(_clientFundServiceLink).ClickAsync();
        }

        public async Task ClickWealthNetLink()
        {
            await _page.Locator(_wealthNetLink).ClickAsync();
        }

        public async Task ClickBnzLogo()
        {
            await _page.Locator(_bnzLogo).ClickAsync();
        }

        public async Task ClickSupportLink()
        {
            await _page.Locator(_supportLink).ClickAsync();
        }

        public async Task ClickContactLink()
        {
            await _page.Locator(_contactLink).ClickAsync();
        }

        public async Task<bool> IsLoginPageLoaded()
        {
            return await _page.TitleAsync() == TestConstants.LOGIN_PAGE_TITLE;
        }

        public async Task<bool> IsInternetBankingLoginHeadingVisible()
        {
            return await _page.Locator(_internetBankingLoginHeading).IsVisibleAsync();
        }

        public async Task<bool> IsChooseTypeHeadingVisible()
        {
            return await _page.Locator(_chooseTypeHeading).IsVisibleAsync();
        }

        public async Task<bool> IsPersonalLoginLinkVisible()
        {
            return await _page.Locator(_personalLoginLink).IsVisibleAsync();
        }

        public async Task<bool> IsBusinessLoginLinkVisible()
        {
            return await _page.Locator(_businessLoginLink).IsVisibleAsync();
        }

        public async Task<string> GetPageTitle()
        {
            return await _page.TitleAsync();
        }

        public async Task<string> GetCurrentUrl()
        {
            return _page.Url;
        }

        public async Task<string> GetInternetBankingLoginHeadingText()
        {
            return await _page.Locator(_internetBankingLoginHeading).TextContentAsync() ?? string.Empty;
        }

        public async Task<string> GetPersonalLoginLinkHref()
        {
            return await _page.Locator(_personalLoginLink).GetAttributeAsync("href") ?? string.Empty;
        }

        public async Task<string> GetBusinessLoginLinkHref()
        {
            return await _page.Locator(_businessLoginLink).GetAttributeAsync("href") ?? string.Empty;
        }
    }
}