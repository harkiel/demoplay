import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { Sidebar } from '../pages/sidebar-page';
import { ProfilePage } from '../pages/profile-page';

test('Login with valid agent credentials', async ({ page }) => {
  test.setTimeout(60000);
  const loginPage = new LoginPage(page);
  const sidebar = new Sidebar(page);
  const profile = new ProfilePage(page);
  // login
  await loginPage.loginAsAgent();
  await sidebar.profile.hover();
  // validate user can visit profile page and see the username
  await sidebar.accountMenuItem('profile').click();
  await expect(profile.userAlias).toHaveText('Douser');
});
