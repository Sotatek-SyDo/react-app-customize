import type { ClientConfig } from './types';

/**
 * Helper to define client config with type inference
 */
export function defineClientConfig(config: ClientConfig): ClientConfig {
    return config;
}
