// PrivateRoutes.tsx
import React from 'react';
import { lazy } from 'react';

const Homepage = lazy(() => import('@/pages/Homepage'));

const routes = [
  {
    path: '/',
    element: <Homepage />,
    titlePage: 'Homepage',
  },
];

export { routes };
