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
        const response = await this.request.get(baseurl.projectBaseUrl[ENV] + endpoints.healthCheck);

        await expect(response).toBeOK();
        return response.json();
    }
}