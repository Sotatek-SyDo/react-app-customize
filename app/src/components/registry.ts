import { AppButton } from './atoms/AppButton';
import Header from './organisms/header';

/**
 * Registry of components that are customizable per client
 * Only includes components that are commonly overridden by clients
 */
export const ComponentRegistry = {
  // Organisms
  Header: Header,

  // Atoms components
  AppButton: AppButton,
} as const;

export type ComponentKey = keyof typeof ComponentRegistry;
