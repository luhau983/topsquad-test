import React, { Suspense, memo, useContext } from 'react';

import Layout from '@components/layouts/Main';
import { AuthContext } from '@context/AuthContext';
import LoginPage from '@pages/Auth/Login';
import RegisterPage from '@pages/Auth/Register';
import { Navigate, Outlet, Route, Routes as Router } from 'react-router-dom';

const Dashboard = React.lazy(() => import('@/pages/Dashboard'));

const PrivateRoutes = () => {
  const { authenticated, userMe } = useContext(AuthContext);
  if (!authenticated && !userMe) return <Navigate to="/login" replace />;
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

const SuspenseRoute = () => {
  return (
    <Suspense>
      <Outlet />
    </Suspense>
  );
};

const AppRoute = () => {
  return (
    <Router>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route element={<PrivateRoutes />}>
        <Route element={<SuspenseRoute />}>
        </Route>
      </Route>
    </Router>
  );
};

export default memo(AppRoute);
