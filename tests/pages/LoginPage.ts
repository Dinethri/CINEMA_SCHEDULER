import BasePage from './BasePage';
import { Page } from '@playwright/test';

export default class LoginPage extends BasePage {
  private usernameInput = 'input[name="username"]';
  private passwordInput = 'input[name="password"]';
  private loginButton = 'button[type="submit"]';
  private errorBanner = '.error';

  constructor(page: Page) {
    super(page);
  }

  async navigate() {
    await this.goto('/');
  }

  async login(username: string, password: string) {
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
  }

  async getErrorMessage() {
    return this.getText(this.errorBanner);
  }

  async getUnsuccessfullLoginMessage(){
    return this.getText(this.errorBanner);
  }
}
