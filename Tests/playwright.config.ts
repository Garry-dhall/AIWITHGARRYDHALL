import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './Tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { outputFolder: 'Tests/Reports/playwright-report' }],
    ['json', { outputFile: 'Tests/Reports/test-results.json' }],
    ['junit', { outputFile: 'Tests/Reports/junit-results.xml' }],
    ['list']
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://www.bnz.co.nz',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    
    /* Take screenshot on failure */
    screenshot: 'only-on-failure',
    
    /* Record video on failure */
    video: 'retain-on-failure',
    
    /* Capture browser context options */
    contextOptions: {
      /* Ignore HTTPS errors */
      ignoreHTTPSErrors: true,
      /* Set viewport */
      viewport: { width: 1920, height: 1080 },
      /* Set locale to New Zealand */
      locale: 'en-NZ',
      /* Set timezone */
      timezoneId: 'Pacific/Auckland',
      /* Set permissions */
      permissions: ['geolocation'],
      /* Color scheme */
      colorScheme: 'light'
    },

    /* Action timeout */
    actionTimeout: 30000,
    
    /* Navigation timeout */
    navigationTimeout: 30000,
    
    /* Expect timeout */
    expect: {
      timeout: 10000
    }
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        channel: 'chrome'
      },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },

    /* Test against branded browsers. */
    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
  ],

  /* Global Setup */
  globalSetup: './Tests/Utilities/GlobalSetup.ts',
  
  /* Global Teardown */
  globalTeardown: './Tests/Utilities/GlobalTeardown.ts',

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },

  /* Test output directory */
  outputDir: 'Tests/Reports/test-results/',
  
  /* Artifacts */
  artifacts: {
    /* Keep artifacts for failed tests */
    mode: 'retain-on-failure',
    /* Artifacts output directory */
    outputDir: 'Tests/Reports/artifacts/'
  },

  /* Timeout for each test */
  timeout: 60000,
  
  /* Timeout for expect assertions */
  expectTimeout: 10000,
  
  /* Maximum time for the whole test run */
  globalTimeout: 600000,

  /* Test metadata */
  metadata: {
    'test-environment': process.env.NODE_ENV || 'development',
    'test-url': 'https://www.bnz.co.nz',
    'test-type': 'e2e-automation',
    'framework': 'playwright',
    'language': 'typescript'
  }
});