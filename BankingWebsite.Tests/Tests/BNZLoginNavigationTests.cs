using Microsoft.Playwright;
using TechTalk.SpecFlow;
using NUnit.Framework;

namespace BankingWebsite.Tests.Tests
{
    [TestFixture]
    [Parallelizable(ParallelScope.Self)]
    public class BNZLoginNavigationTests
    {
        [Test]
        [Category("Smoke")]
        public void NavigateToLoginPageFromHomepage()
        {
            // This test will be executed via SpecFlow feature files
        }

        [Test]
        [Category("Regression")]
        public void VerifyLoginPageElements()
        {
            // This test will be executed via SpecFlow feature files
        }

        [Test]
        [Category("Navigation")]
        public void NavigateToPersonalInternetBanking()
        {
            // This test will be executed via SpecFlow feature files
        }

        [Test]
        [Category("Navigation")]
        public void NavigateToBusinessInternetBanking()
        {
            // This test will be executed via SpecFlow feature files
        }

        [Test]
        [Category("Navigation")]
        public void ReturnToHomepageFromLoginPage()
        {
            // This test will be executed via SpecFlow feature files
        }
    }
}