import { Locator, Page, expect } from "@playwright/test";
import { baseurl } from "../config/env.ts";
import { endpoints } from "../config/endpoint.ts";
import { step } from "../utils/common_function";
const ENV = process.env.ENV as string;

export class LoginPage {
    page: Page
    userNameInputField: Locator;
    passwordInputField: Locator
    loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userNameInputField = page.getByTestId('login-username-input');
        this.passwordInputField = page.getByTestId('login-password-input');
        this.loginButton = page.getByTestId('login-submit-button');
    }

    @step('Enter username')
    async enterUsername(username: string) {
        await expect(this.userNameInputField).toBeVisible();
        await this.userNameInputField.fill(username);
    }

    @step('Enter password')
    async enterPassword(password: string) {
        await expect(this.passwordInputField).toBeVisible();
        await this.passwordInputField.fill(password);
    }

    @step('Click login button')
    async clickLoginButton() {
        await expect(this.loginButton).toBeVisible();
        await this.loginButton.click();
    }

}