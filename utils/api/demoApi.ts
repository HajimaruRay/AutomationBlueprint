import { APIRequestContext, Page, expect } from '@playwright/test';
import { CommonPage, step } from '../common_function';
import { baseurl } from '../../config/env';
import { endpoints } from '../../config/endpoint';

const ENV = process.env.ENV as string;

export class DemoApi {
    request: APIRequestContext;
    page: Page;
    CommonPage: CommonPage;


    constructor(request: APIRequestContext, page: Page) {
        this.request = request;
        this.page = page;
        this.CommonPage = new CommonPage(request, page);
    }

    @step('Get Transaction Details')
    async getTransactionDetails(clickAction: () => Promise<void>) {
        const [response] = await Promise.all([
            this.page.waitForResponse(
                (res) =>
                    res.request().url().includes('testapi') &&
                    res.request().method() === 'GET' &&
                    res.status() === 200
            ),
            clickAction()
        ]);
        return response.json();
    }

    @step('Health Check')
    async healthCheck() {
        const response = await this.request.get(`${baseurl.apiBaseUrl[ENV]}${endpoints.api.healthCheck}`);

        await expect(response).toBeOK();
        const data = await response.json();
        console.log('Health Check Data:', JSON.stringify(data));
    }   

    @step('Get login response')
    async getLoginResponse(clickAction: () => Promise<void>) {
        const [response] = await Promise.all([
            this.page.waitForResponse(
                (res) =>
                    res.request().url().includes('/api/login') &&
                    res.request().method() === 'POST'
            ),
            clickAction()
        ]);

        if (response.status() === 200) {
            return await response.json();
        }

        console.log('Login Failed');
        throw new Error(`Login request failed with status: ${response.status()}`);
    }
}