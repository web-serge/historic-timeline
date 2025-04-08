import { createBrowserRouter, Outlet } from 'react-router';
import { Suspense } from 'react';

import { HomePage } from '@/pages/home';
import { Loader } from '@/shared/ui/loader';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    ),
    children: [{ path: '/', element: <HomePage /> }],
  },
]);
