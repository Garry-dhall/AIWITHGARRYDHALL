module.exports = {
  default: {
    // Feature files location
    features: ['Tests/Features/**/*.feature'],
    
    // Step definitions location
    require: [
      'Tests/Steps/**/*.ts',
      'Tests/Utilities/Hooks.ts'
    ],
    
    // TypeScript configuration
    requireModule: ['ts-node/register'],
    
    // Format options
    format: [
      'progress',
      'html:Tests/Reports/cucumber-report.html',
      'json:Tests/Reports/cucumber-report.json',
      'junit:Tests/Reports/cucumber-junit.xml'
    ],
    
    // Publish report to cucumber cloud (optional)
    // publish: true,
    
    // Tag expressions
    tags: 'not @skip',
    
    // Parallel execution
    parallel: 1,
    
    // Retry failed scenarios
    retry: 1,
    
    // Timeout for each step
    timeout: 30000,
    
    // World parameters
    worldParameters: {
      browser: process.env.BROWSER || 'chromium',
      headless: process.env.HEADLESS !== 'false',
      baseUrl: 'https://www.bnz.co.nz',
      defaultTimeout: 30000
    },
    
    // Dry run (validate scenarios without executing)
    dryRun: false,
    
    // Fail fast (stop on first failure)
    failFast: false,
    
    // Strict mode (fail if there are undefined steps)
    strict: true
  },
  
  // Smoke test profile
  smoke: {
    features: ['Tests/Features/**/*.feature'],
    require: [
      'Tests/Steps/**/*.ts',
      'Tests/Utilities/Hooks.ts'
    ],
    requireModule: ['ts-node/register'],
    format: [
      'progress',
      'html:Tests/Reports/smoke-test-report.html'
    ],
    tags: '@smoke',
    parallel: 1,
    timeout: 30000
  },
  
  // Critical test profile
  critical: {
    features: ['Tests/Features/**/*.feature'],
    require: [
      'Tests/Steps/**/*.ts',
      'Tests/Utilities/Hooks.ts'
    ],
    requireModule: ['ts-node/register'],
    format: [
      'progress',
      'html:Tests/Reports/critical-test-report.html'
    ],
    tags: '@critical',
    parallel: 1,
    timeout: 30000
  },
  
  // Regression test profile
  regression: {
    features: ['Tests/Features/**/*.feature'],
    require: [
      'Tests/Steps/**/*.ts',
      'Tests/Utilities/Hooks.ts'
    ],
    requireModule: ['ts-node/register'],
    format: [
      'progress',
      'html:Tests/Reports/regression-test-report.html',
      'json:Tests/Reports/regression-test-report.json'
    ],
    tags: 'not @skip and not @wip',
    parallel: 2,
    timeout: 45000
  },
  
  // Development test profile
  development: {
    features: ['Tests/Features/**/*.feature'],
    require: [
      'Tests/Steps/**/*.ts',
      'Tests/Utilities/Hooks.ts'
    ],
    requireModule: ['ts-node/register'],
    format: [
      'progress-bar',
      'html:Tests/Reports/dev-test-report.html'
    ],
    tags: '@wip or @dev',
    parallel: 1,
    timeout: 60000,
    dryRun: false
  }
};