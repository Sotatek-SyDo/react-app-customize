import { Navigate, Outlet } from 'react-router-dom';
import { LOCAL_STORAGE_KEY, ROUTE_PATH } from '@/constants/app';

export default function PublicRoute() {
  const isAuthenticated = Boolean(localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN));

  if (isAuthenticated) {
    return <Navigate to={ROUTE_PATH.HOME} replace />;
  }

  return <Outlet />;
}
