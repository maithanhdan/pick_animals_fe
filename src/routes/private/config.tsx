// PrivateRoutes.tsx
import React from 'react';
import { lazy } from 'react';

const Homepage = lazy(() => import('@/pages/Homepage'));
const Contact = lazy(() => import('@/pages/Contact'));
const About = lazy(() => import('@/pages/About'));

const routes = [
  {
    path: '/',
    element: <Homepage />,
    titlePage: 'Homepage',
  },
  {
    path: '/contact',
    element: <Contact />,
    titlePage: 'Contact',
  },
  {
    path: '/about',
    element: <About />,
    titlePage: 'About',
  },
];

export { routes };
