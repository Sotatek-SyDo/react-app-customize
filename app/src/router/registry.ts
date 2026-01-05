import { HomePage, LoginPage, MyAccountPage } from '@/router/lazy';

/**
 * Registry of default system pages
 * Each page is required to have a unique key
 */
export const PageRegistry = {
  home: HomePage,
  login: LoginPage,
  myAccount: MyAccountPage,
};

export type PageKey = keyof typeof PageRegistry;
