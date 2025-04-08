import { lazy } from 'react';

export const HomePageLazy = lazy(() =>
  import('./index').then((mod) => ({ default: mod.HomePage })),
);
