const ENV = process.env.ENV as string;
import {test as base } from '@playwright/test';
import { endpoints } from '../config/endpoint.ts';
import { DemoApi } from '../utils/api/demoApi.ts';
import { demoDatabase } from '../utils/database/demoDatabase.ts';

const testData = require(`../data/${ENV}/data.json`);
const userInfo = require(`../data/${ENV}/userInfo.json`);

type testData = typeof testData;
type userInfo = typeof userInfo;

export const test = base.extend<{
    testData: testData;
    endpoints: typeof endpoints;
    userInfo: userInfo;
    demoApi: DemoApi;
    demoDatabase: demoDatabase;
}>({
    testData: async ({}, use) => {
        await use(testData);
    },
    userInfo: async ({}, use) => {
        await use(userInfo);
    },
    endpoints: async ({}, use) => {
        await use(endpoints);
    },
    demoApi: async ({request, page}, use) => {
        await use(new DemoApi(request, page));
    },
    demoDatabase: async ({request, page}, use) => {
        await use(new demoDatabase(request, page));
    }
})