using Microsoft.Playwright;
using TechTalk.SpecFlow;

namespace BankingWebsite.Tests.Config
{
    public class TestConfig
    {
        public static readonly string BrowserType = Environment.GetEnvironmentVariable("BROWSER") ?? "chromium";
        public static readonly bool Headless = bool.Parse(Environment.GetEnvironmentVariable("HEADLESS") ?? "false");
        public static readonly int DefaultTimeout = int.Parse(Environment.GetEnvironmentVariable("TIMEOUT") ?? "30000");
        public static readonly string BaseUrl = Environment.GetEnvironmentVariable("BASE_URL") ?? "https://www.bnz.co.nz/";
        public static readonly string VideoPath = Environment.GetEnvironmentVariable("VIDEO_PATH") ?? "Reports/videos/";
        public static readonly string ScreenshotPath = Environment.GetEnvironmentVariable("SCREENSHOT_PATH") ?? "Reports/screenshots/";
    }
}