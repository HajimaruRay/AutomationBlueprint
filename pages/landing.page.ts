import { Locator, Page, expect } from "@playwright/test";
import { baseurl } from "../config/env.ts";
import { endpoints } from "../config/endpoint.ts";
import { step } from "../utils/common_function";
const ENV = process.env.ENV as string;

export class LandingPage {
    page: Page;
    pageHeader: Locator;
    button: Locator;
    homeButton: Locator;
    loginButton: Locator;
    constructor(page: Page) {
        this.page = page;
        this.pageHeader = page.locator('h1').getByText("I'm Chonlatree ");
        this.button = page.locator('div.button');
        this.homeButton = page.getByTestId('home-button-nav-bar');
        this.loginButton = page.getByTestId('login-button');
    }

    @step("Go to landing page")
    async goToLandingPage() {
        // await this.page.goto(`${baseurl.projectBaseUrl[ENV]}${endpoints.landingPage}`);
        // await this.page.waitForURL(`${baseurl.projectBaseUrl[ENV]}${endpoints.landingPage}`);
    }

    @step("Go to profile website")
    async goToProfileWebsite() {
        await this.page.goto(`${baseurl.profileWebsiteBaseUrl[ENV]}`);
        await this.page.waitForURL(`${baseurl.profileWebsiteBaseUrl[ENV]}`);
    }

    @step('Verify landing page is loaded')
    async verifyLandingPageLoaded() {
        await expect(this.pageHeader).toBeVisible();
    }

    @step('Click button')
    async clickButton() {
        await this.button.click();
    }

    @step('Click home button')
    async clickHomeButton() {
        await expect(this.homeButton).toBeVisible();
        await this.homeButton.click();
    }

    @step('Click login button')
    async clickLoginButton() {
        await expect(this.loginButton).toBeVisible();
        await this.loginButton.click();
    }
}