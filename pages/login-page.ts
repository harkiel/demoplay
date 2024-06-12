import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  // load variables from .env file, use "not found" if no variable exists
  readonly baseUrl = process.env.URL ?? 'not found';
  readonly agentUser = process.env.USER_A ?? 'not found';
  readonly agentPass = process.env.PASS_A ?? 'not found';
  readonly adminUser = process.env.USER_B ?? 'not found';
  readonly adminPass = process.env.PASS_B ?? 'not found';

  // declare variables
  readonly page: Page;
  readonly signInLink: Locator;
  readonly signInHeader: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;

  constructor(page: Page) {
    // initialize variables
    this.page = page;
    this.signInLink = page.locator('a#global-sign-in-link');
    this.signInHeader = page.locator('h1', { hasText: 'Welcome Back!' });
    this.usernameInput = page.locator('#identifier');
    this.passwordInput = page.locator('#password');
    this.signInButton = page.locator('button#method');
  }

  /**
   * Go to home page
   */
  async gotoBaseUrl() {
    await this.page.goto(this.baseUrl);
  }

  /**
   * @param user Username
   * @param pass Password
   */
  async login(user: string, pass: string) {
    await this.page.goto(this.baseUrl);
    await this.signInLink.click();
    await expect(this.usernameInput).toBeEditable();
    // this wait is not ideal, but needed since playwright starts writting 
    await this.page.waitForTimeout(1000);
    // enter username and passord
    await this.usernameInput.pressSequentially(user, {delay: 100});
    await this.passwordInput.pressSequentially(pass,  {delay: 100});
    await expect(this.signInButton).toBeEnabled({timeout: 10000});
    await this.signInButton.click();
  }

  async loginAsAgent(){
    this.login(this.agentUser, this.agentPass);
  }

  async loginAsAdmin(){
    this.login(this.adminUser, this.adminPass);
  }
  
}