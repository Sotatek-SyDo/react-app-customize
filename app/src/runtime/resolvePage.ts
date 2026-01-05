import { PageRegistry, PageKey } from '../router/registry';
import type { ClientConfig } from './types';

export function resolvePage(key: PageKey, client?: ClientConfig) {
  if (client?.pages?.[key]) {
    return client.pages[key];
  }

  return PageRegistry[key];
}
