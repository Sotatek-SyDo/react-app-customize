import { createContext, ReactNode, useContext } from 'react';
import type { ClientConfig } from './types';

const ClientContext = createContext<ClientConfig | undefined>(undefined);

interface ClientProviderProps {
  config?: ClientConfig;
  children: ReactNode;
}

export function ClientProvider({ config, children }: ClientProviderProps) {
  return <ClientContext.Provider value={config}>{children}</ClientContext.Provider>;
}

/**
 * Hook to retrieve client configuration in any component
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useClientConfig(): ClientConfig | undefined {
  return useContext(ClientContext);
}
