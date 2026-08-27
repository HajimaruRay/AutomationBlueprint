import { APIRequestContext, Page, expect, test } from '@playwright/test';
import mysql from 'mysql2/promise';
import { databaseConfig } from '../config/database.ts';
import { endpoints } from '../config/endpoint.ts';
import { baseurl } from '../config/env.ts';

const ENV = process.env.ENV as string;
const testData = require(`../data/${ENV}/data.json`);

export class CommonPage {
    page: Page;
    request: APIRequestContext;
    constructor(request: APIRequestContext, page: Page) {
        this.request = request;
        this.page = page;
    }
}

export function step(stepName?: string) {
    return function decorator(target: Function, context: ClassMethodDecoratorContext) {
        return function replacementMethod(...args: any) {
            const name = stepName || `${this.constructor.name}.${context.name as string}`;
            return test.step(name, async () => {
                return await target.call(this, ...args);
            });
        }
    }
}

export async function query<T = any>(sqlQuery: string): Promise<T[]> {
    const configDB = databaseConfig[ENV as keyof typeof databaseConfig];
    if (!configDB) {
        throw new Error(`Unsupported database environment: ${ENV}`);
    }

    const connection = await mysql.createConnection(configDB);
    try {
        const [rows] = await connection.query(sqlQuery);
        return rows as T[];
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    } finally {
        await connection.end();
    }
}