import { createRouter } from '@/router/routes';
import { ClientProvider } from '@/runtime/ClientContext';
import clientConfig from '@current-client';
import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import AppLoading from './components/atoms/AppLoading';
import { useClientBranding } from './hooks/useClientBranding';

// Configure router synchronously
const router = createRouter(clientConfig);

export default function App() {
  useClientBranding(clientConfig);

  return (
    <ClientProvider config={clientConfig}>
      <Suspense fallback={<AppLoading />}>
        <RouterProvider router={router} />
      </Suspense>
    </ClientProvider>
  );
}
