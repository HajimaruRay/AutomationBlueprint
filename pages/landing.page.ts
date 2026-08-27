import { Locator, Page } from "@playwright/test";
import { baseurl } from "../config/env.ts";
import { endpoints } from "../config/endpoint.ts";
import { step } from "../utils/common_function";
const ENV = process.env.ENV as string;

export class LandingPage {
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    @step("Go to landing page")
    async goToLandingPage() {
        await this.page.goto(`${baseurl.projectBaseUrl[ENV]}${endpoints.landingPage}`);
        await this.page.waitForURL(`${baseurl.projectBaseUrl[ENV]}${endpoints.landingPage}`);
    }
}