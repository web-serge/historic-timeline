/* eslint-disable @conarti/feature-sliced/public-api */

import './css/normalize.css';
import './css/globals.scss';

import { createRoot } from 'react-dom/client';

import { App } from './app';

const root = document.getElementById('root');

createRoot(root).render(<App />);
