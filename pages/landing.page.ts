import { Locator, Page, expect } from "@playwright/test";
import { baseurl } from "../config/env.ts";
import { endpoints } from "../config/endpoint.ts";
import { step } from "../utils/common_function";
const ENV = process.env.ENV as string;

export class LandingPage {
    page: Page;
    pageHeader: Locator;
    homeButton: Locator;
    loginButton: Locator;
    constructor(page: Page) {
        this.page = page;
        this.pageHeader = page.getByTestId('home-heading');
        this.homeButton = page.getByTestId('');
        this.loginButton = page.getByTestId('navbar-link-login');
    }

    @step("Go to landing page")
    async goToLandingPage() {
        // await this.page.goto(`${baseurl.projectBaseUrl[ENV]}${endpoints.landingPage}`);
        // await this.page.waitForURL(`${baseurl.projectBaseUrl[ENV]}${endpoints.landingPage}`);
    }

    @step("Go to profile website")
    async goToProfileWebsite() {
        await this.page.goto(`${baseurl.webBaseUrl[ENV]}`);
        await this.page.waitForURL(`${baseurl.webBaseUrl[ENV]}`);
    }

    @step('Click home button')
    async clickHomeButton() {
        await expect(this.homeButton).toBeVisible();
        await this.homeButton.click();
    }

    @step('Click login menu button')
    async clickLoginMenuButton() {
        await expect(this.loginButton).toBeVisible();
        await this.loginButton.click();
    }
}