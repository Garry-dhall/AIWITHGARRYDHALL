export class TestConstants {
    // URLs
    static readonly BASE_URL = 'https://www.bnz.co.nz/';
    static readonly LOGIN_CHOICES_URL = 'https://www.bnz.co.nz/login-choices';
    static readonly PERSONAL_LOGIN_URL = 'https://secure.bnz.co.nz/foyer/target/ib';
    static readonly BUSINESS_LOGIN_URL = 'https://secure.bnz.co.nz/foyer/target/ib4b';
    static readonly CLIENT_FUND_SERVICE_URL = 'https://www.bnz.co.nz/cfs/app/login.html';
    static readonly WEALTHNET_URL = 'https://wealthnet.bnz.co.nz/';

    // Page Titles
    static readonly HOMEPAGE_TITLE = 'BNZ - Personal & Business Banking';
    static readonly LOGIN_CHOICES_TITLE = 'Internet Banking Login - BNZ';

    // Page Headings
    static readonly LOGIN_MAIN_HEADING = 'Internet banking login';
    static readonly LOGIN_SUBHEADING = 'Choose type of Internet Banking';

    // Login Types
    static readonly PERSONAL_LOGIN = 'Personal';
    static readonly BUSINESS_LOGIN = 'Business';
    static readonly CLIENT_FUND_SERVICE = 'Client Fund Service';
    static readonly WEALTHNET = 'WealthNet';

    // Test Timeouts
    static readonly DEFAULT_TIMEOUT = 30000;
    static readonly SHORT_TIMEOUT = 5000;
    static readonly LONG_TIMEOUT = 60000;

    // Element Wait Times
    static readonly ELEMENT_WAIT_TIME = 10000;
    static readonly PAGE_LOAD_TIMEOUT = 30000;

    // Test Data
    static readonly TEST_LOGIN_TYPES = [
        { type: 'Personal', url: 'secure.bnz.co.nz/foyer/target/ib' },
        { type: 'Business', url: 'secure.bnz.co.nz/foyer/target/ib4b' }
    ];

    // Alternative Login Services
    static readonly ALTERNATIVE_LOGIN_SERVICES = [
        'Client Fund Service',
        'WealthNet'
    ];

    // Error Messages
    static readonly ERROR_MESSAGES = {
        ELEMENT_NOT_FOUND: 'Element not found on the page',
        PAGE_NOT_LOADED: 'Page did not load within expected time',
        INCORRECT_URL: 'Navigation to incorrect URL',
        MISSING_ELEMENT: 'Expected element is missing from the page'
    };
}