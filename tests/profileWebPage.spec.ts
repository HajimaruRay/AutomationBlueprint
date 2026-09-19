import { test } from '../pages/fixtures.ts';
const ENV = process.env.ENV as string;
let transactionId!: string;

test.describe('Demo Test', () => {
    test.beforeEach(async ({ testData, endpoints , demoApi}) => {
        // const healthCheckResult = await demoApi.healthCheck();
    });

    test('Get Booking Transaction Details',
        { tag: '@e2e' },
        async (
            { 
                testData, 
                demoApi, 
                demoDatabase,
                landingPage,
            }
        ) => {
            await landingPage.goToProfileWebsite();
            await landingPage.verifyLandingPageLoaded();
            await landingPage.clickLoginButton();
        });
});