import { Outlet } from 'react-router-dom';

export default function PrivateRoute() {
  // const isAuthenticated = Boolean(localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN));

  // if (!isAuthenticated) {
  //   return <Navigate to={ROUTE_PATH.LOGIN} replace />;
  // }

  return <Outlet />;
}
