using Microsoft.Playwright;
using BankingWebsite.Tests.Constants;

namespace BankingWebsite.Tests.PageObjects
{
    public class HomePage
    {
        private readonly IPage _page;

        // Selectors
        private readonly string _bnzLogo = "[ref=e10]";
        private readonly string _loginLink = "[ref=e37]";
        private readonly string _registerLink = "[ref=e33]";
        private readonly string _personalBankingLink = "[ref=e18]";
        private readonly string _businessBankingLink = "[ref=e21]";
        private readonly string _searchLink = "[ref=e30]";
        private readonly string _applyLink = "[ref=e28]";
        private readonly string _scammerHeading = "h1:has-text('Scammers want you to rush, we help you take your time')";
        private readonly string _everydayBankingLink = "[ref=e54]";
        private readonly string _homeLoansLink = "[ref=e56]";
        private readonly string _creditCardsLink = "[ref=e58]";

        public HomePage(IPage page)
        {
            _page = page;
        }

        public async Task NavigateToHomePage()
        {
            await _page.GotoAsync(TestConstants.BNZ_BASE_URL);
        }

        public async Task ClickLoginLink()
        {
            await _page.Locator(_loginLink).ClickAsync();
        }

        public async Task ClickRegisterLink()
        {
            await _page.Locator(_registerLink).ClickAsync();
        }

        public async Task ClickBnzLogo()
        {
            await _page.Locator(_bnzLogo).ClickAsync();
        }

        public async Task ClickPersonalBankingLink()
        {
            await _page.Locator(_personalBankingLink).ClickAsync();
        }

        public async Task ClickBusinessBankingLink()
        {
            await _page.Locator(_businessBankingLink).ClickAsync();
        }

        public async Task ClickEverydayBankingLink()
        {
            await _page.Locator(_everydayBankingLink).ClickAsync();
        }

        public async Task<bool> IsHomePageLoaded()
        {
            return await _page.TitleAsync() == TestConstants.HOME_PAGE_TITLE;
        }

        public async Task<bool> IsLoginLinkVisible()
        {
            return await _page.Locator(_loginLink).IsVisibleAsync();
        }

        public async Task<bool> IsScammerHeadingVisible()
        {
            return await _page.Locator(_scammerHeading).IsVisibleAsync();
        }

        public async Task<string> GetPageTitle()
        {
            return await _page.TitleAsync();
        }

        public async Task<string> GetCurrentUrl()
        {
            return _page.Url;
        }
    }
}