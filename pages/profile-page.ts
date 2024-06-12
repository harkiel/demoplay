import { expect, type Locator, type Page } from '@playwright/test';

type tabs = 'About' | 'Talk' | 'Blog' | 'Contributions' | 'Activity;'

export class ProfilePage {
  readonly page: Page;
  readonly userAlias: Locator;
  tabs: (tab: tabs) => Locator;

  constructor(page: Page) {
    this.page = page;
    this.userAlias = page.locator('h1[itemprop=name]');
    // pass a tab name to get its locator
    this.tabs = (tab: tabs) => page.locator('ul.user-profile-navigation a', {hasText: `${tab}`});
  }
}