import { Navigate, Outlet } from 'react-router-dom';
import { LOCAL_STORAGE_KEY, ROUTE_PATH } from '@/constants/app';

export default function PrivateRoute() {
  // const isAuthenticated = Boolean(localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN));

  // if (!isAuthenticated) {
  //   return <Navigate to={ROUTE_PATH.LOGIN} replace />;
  // }

  return <Outlet />;
}
