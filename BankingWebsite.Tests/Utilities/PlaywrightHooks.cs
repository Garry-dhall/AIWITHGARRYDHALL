using Microsoft.Playwright;
using TechTalk.SpecFlow;
using BankingWebsite.Tests.Config;

namespace BankingWebsite.Tests.Utilities
{
    [Binding]
    public class PlaywrightHooks
    {
        private static IPlaywright? _playwright;
        private static IBrowser? _browser;
        private IPage? _page;
        private IBrowserContext? _context;

        [BeforeTestRun]
        public static async Task BeforeTestRun()
        {
            _playwright = await Playwright.CreateAsync();
            
            var browserOptions = new BrowserTypeLaunchOptions
            {
                Headless = TestConfig.Headless,
                SlowMo = 1000 // Add delay for better visibility during debugging
            };

            _browser = TestConfig.BrowserType.ToLower() switch
            {
                "firefox" => await _playwright.Firefox.LaunchAsync(browserOptions),
                "webkit" => await _playwright.Webkit.LaunchAsync(browserOptions),
                _ => await _playwright.Chromium.LaunchAsync(browserOptions)
            };
        }

        [BeforeScenario]
        public async Task BeforeScenario()
        {
            var contextOptions = new BrowserNewContextOptions
            {
                ViewportSize = new ViewportSize { Width = 1920, Height = 1080 },
                RecordVideoDir = TestConfig.VideoPath
            };

            _context = await _browser!.NewContextAsync(contextOptions);
            _page = await _context.NewPageAsync();
            
            // Set default timeout
            _page.SetDefaultTimeout(TestConfig.DefaultTimeout);
            _page.SetDefaultNavigationTimeout(TestConfig.DefaultTimeout);

            // Register page in DI container for step definitions
            ScenarioContext.Current.Set(_page);
        }

        [AfterScenario]
        public async Task AfterScenario()
        {
            if (ScenarioContext.Current.TestError != null)
            {
                var screenshotPath = Path.Combine(TestConfig.ScreenshotPath, 
                    $"{ScenarioContext.Current.ScenarioInfo.Title}_{DateTime.Now:yyyyMMdd_HHmmss}.png");
                
                Directory.CreateDirectory(Path.GetDirectoryName(screenshotPath)!);
                await _page!.ScreenshotAsync(new PageScreenshotOptions { Path = screenshotPath });
            }

            await _page?.CloseAsync()!;
            await _context?.CloseAsync()!;
        }

        [AfterTestRun]
        public static async Task AfterTestRun()
        {
            await _browser?.CloseAsync()!;
            _playwright?.Dispose();
        }
    }
}