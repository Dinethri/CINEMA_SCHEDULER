import {defineConfig, devices} from '@playwright/test'

export default defineConfig({
    testDir: './tests',
    timeout: 30_000,
    use:{
        baseURL: 'http://localhost:3000',
        headless: true,
        viewport: {width:1200, height: 720},
        actionTimeout:8000,
        trace: 'on-first-retry', //Record trace on first retry of a failed test
        screenshot: "only-on-failure",//screenshot in failure point
    },
    reporter: [['list'], ['html', {outputFolder: 'playwright-report'}]],
    retries: 1,//take another run after one failure
});