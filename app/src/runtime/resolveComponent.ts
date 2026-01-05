import { ComponentRegistry, ComponentKey } from '@/components/registry';
import type { ClientConfig, CustomizableComponent } from './types';

/**
 * Resolve component: prioritize client custom override, fallback to default
 * Similar to resolvePage but for components
 */
export function resolveComponent(key: ComponentKey, client?: ClientConfig): CustomizableComponent {
  if (client?.components?.[key]) {
    return client.components[key];
  }

  return ComponentRegistry[key];
}
