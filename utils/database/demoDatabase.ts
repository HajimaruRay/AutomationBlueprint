import { APIRequestContext, Page, expect } from "@playwright/test";
import { CommonPage, query, step } from "../common_function";

const ENV = process.env.ENV as string;

export class demoDatabase {
    Page: Page;
    request: APIRequestContext
    CommonPage: CommonPage;

    constructor(request: APIRequestContext, page: Page) {
        this.request = request;
        this.Page = page;
        this.CommonPage = new CommonPage(request, page);
    }

    @step('Get data from database')
    async getDataFromDatabase() {
        const result = await query(
            'SELECT * FROM booking'
        );
        await expect(result).not.toBeNull();
        return result
    }
}