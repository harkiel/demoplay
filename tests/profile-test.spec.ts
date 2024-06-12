import { test, expect } from '@playwright/test';
import { ProfilePage } from '../pages/profile-page';
import { Sidebar } from '../pages/sidebar-page';
import { LoginPage } from '../pages/login-page';


test.describe('Test admin user can login', () => {
    // load admin user session
    test.use({ storageState: './.auth/admin.json' });

    test('Username for admin user is displayed on profile page', async ({ page }) => {
    test.setTimeout(60000);
    const login = new LoginPage(page);
    const profile = new ProfilePage(page);
    const sidebar = new Sidebar(page);

    await login.gotoBaseUrl();
    await sidebar.profile.hover();
    // validate user can visit profile page
    await sidebar.accountMenuItem('profile').click();
    await expect(profile.userAlias).toHaveText('Adminionis');
    });
});

test.describe('Test agent user can login', () => {
    // load agent user session
    test.use({ storageState: './.auth/user.json' });

    test('Username for agent user is displayed on profile page', async ({ page }) => {
    test.setTimeout(60000);
    const login = new LoginPage(page);
    const profile = new ProfilePage(page);
    const sidebar = new Sidebar(page);

    await login.gotoBaseUrl();
    await sidebar.profile.hover();
    // validate user can visit profile page
    await sidebar.accountMenuItem('profile').click();
    await expect(profile.userAlias).toHaveText('Douser');
    });
});
