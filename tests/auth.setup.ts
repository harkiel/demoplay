import { expect, test as setup } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { Sidebar } from '../pages/sidebar-page';
import { ProfilePage } from '../pages/profile-page';

// save session in this file for admin users
const adminFile = './.auth/admin.json';

setup('authenticate as admin', async ({ page }) => {
  setup.setTimeout(60000);
  const loginPage = new LoginPage(page);
  const sidebar = new Sidebar(page);
  const profile = new ProfilePage(page);
  // login
  await loginPage.loginAsAdmin();
  await sidebar.profile.hover();
  // validate user can visit profile page
  await sidebar.accountMenuItem('profile').click();
  await expect(profile.userAlias).toHaveText('Adminionis');

  await page.context().storageState({ path: adminFile });
});

// save session to this file for agent user
const userFile = './.auth/user.json';

setup('authenticate as user', async ({ page }) => {
  setup.setTimeout(60000);
  const loginPage = new LoginPage(page);
  const sidebar = new Sidebar(page);
  const profile = new ProfilePage(page);
  // login
  await loginPage.loginAsAgent();
  await sidebar.profile.hover();
  // validate user can visit profile page
  await sidebar.accountMenuItem('profile').click();
  await expect(profile.userAlias).toHaveText('Douser');

  await page.context().storageState({ path: userFile });
});