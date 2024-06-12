import { expect, type Locator, type Page } from '@playwright/test';

type contentOptions = 'fancentral' | 'games' | 'anime' | 'movies' | 'tv' | 'video';
type accountMenu = 'preferences' | 'contributions' | 'talk' | 'profile';

export class Sidebar {
  
  readonly page: Page;
  readonly logo: Locator;
  readonly search: Locator;
  contentMenu: (option: contentOptions) => Locator;
  readonly profile: Locator;
  accountMenuItem: (option: accountMenu) => Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.locator('data-tracking-label="link.fancentral"');
    this.search = page.getByTitle('Search');
    this.contentMenu = (option: contentOptions) => page.locator(`div.global-navigation a[data-tracking-label="link.${option}"]`);
    this.profile = page.locator('div[data-testid="global-navigation-user-icon"]');
    this.accountMenuItem = (option: accountMenu) => page.locator(`a[data-tracking-label="account.${option}"]`)
  }


}