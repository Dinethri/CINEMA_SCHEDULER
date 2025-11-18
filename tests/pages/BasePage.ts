import { Page } from '@playwright/test';

export default class BasePage {
  constructor(protected page: Page) {}

  async goto(path = '/') {
    await this.page.goto(path);
  }

  async fill(selector: string, value: string) {
    await this.page.fill(selector, value);
  }

  async click(selector: string) {
    await this.page.click(selector);
  }

  async getText(selector: string) {
    return (await this.page.textContent(selector))?.trim();
  }

  async waitForSelector(selector: string) {
    await this.page.waitForSelector(selector);
  }
}
