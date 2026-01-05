import AppLoading from '@/components/atoms/AppLoading';
import { NotificationProvider } from '@/components/templates/notification';
import { ROUTE_PATH } from '@/constants/app';
import PrivateRoute from '@/router/PrivateRoute';
import PublicRoute from '@/router/PublicRoute';
import type { PageKey } from '@/router/registry';
import { resolvePage } from '@/runtime/resolvePage';
import type { ClientConfig } from '@/runtime/types';
import React, { Suspense } from 'react';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
// eslint-disable-next-line react-refresh/only-export-components
const PageWrapper = ({ pageKey, client }: { pageKey: PageKey; client?: ClientConfig }) => (
  <Suspense fallback={<AppLoading />}>{React.createElement(resolvePage(pageKey, client))}</Suspense>
);

export function createRouter(client?: ClientConfig) {
  return createBrowserRouter([
    {
      element: (
        <NotificationProvider>
          <Outlet />
        </NotificationProvider>
      ),
      children: [
        {
          element: <PublicRoute />,
          children: [
            {
              path: ROUTE_PATH.LOGIN,
              element: <PageWrapper pageKey="login" client={client} />,
            },
          ],
        },
        {
          element: <PrivateRoute />,
          children: [
            {
              path: ROUTE_PATH.HOME,
              element: <PageWrapper pageKey="home" client={client} />,
            },
            {
              path: ROUTE_PATH.MY_PROFILE,
              element: <PageWrapper pageKey="myAccount" client={client} />,
            },
            ...(client?.routes || []),
          ],
        },
        {
          path: '*',
          element: <Navigate to={ROUTE_PATH.HOME} replace />,
        },
      ],
    },
  ]);
}
