// PrivateRoutes.tsx
import React from 'react';
import { lazy } from 'react';

const Login = lazy(() => import('@/pages/Login'));
const routes = [
  {
    path: '/login',
    element: <Login />,
    titlePage: 'Login',
  },
];

export { routes };
