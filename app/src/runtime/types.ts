import type { ComponentType, LazyExoticComponent } from 'react';
import type { RouteObject } from 'react-router-dom';
import type { PageKey } from '../router/registry';
import type { ComponentKey } from '../components/registry';

export type CustomizableComponent = ComponentType<any> | LazyExoticComponent<any>;

export interface ClientConfig {
  /**
   * Branding: logo, favicon, title, colors
   */
  branding?: {
    appName?: string;
    logo?: string;
    favicon?: string;
    primaryColor?: string;
  };

  /**
   * Custom page by key
   */
  pages?: Partial<Record<PageKey, CustomizableComponent>>;

  /**
   * Custom component by key
   */
  components?: Partial<Record<ComponentKey, CustomizableComponent>>;

  /**
   * Add new route
   */
  routes?: RouteObject[];
}

/**
 * Metadata for client identification and features
 */
export interface ClientManifest {
  key: string;
  name: string;
  enabled: boolean;
  branding?: ClientConfig['branding'];
}
