import { test } from '../pages/fixtures.ts';
import { LoginPage } from '../pages/login.Page.ts';
const ENV = process.env.ENV as string;
let transactionId!: string;

test.describe('Demo Test', () => {
    test.beforeEach(async ({ testData, endpoints , demoApi}) => {
        // const healthCheckResult = await demoApi.healthCheck();
    });

    test('Go to Profile Website and Click Login Button',
        { tag: '@e2e' },
        async (
            { 
                testData, 
                demoApi, 
                demoDatabase,
                landingPage,
                loginPage
            }
        ) => {
            await demoApi.healthCheck();
            await landingPage.goToProfileWebsite();
            await landingPage.clickLoginMenuButton();
            await loginPage.enterUsername(testData.login.username);
            await loginPage.enterPassword(testData.login.password);
            const loginResponse = await demoApi.getLoginResponse(async () => {
                await loginPage.clickLoginButton();
            });

            console.log('Login Response:', loginResponse);
        });
});