import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, createBrowserRouter } from 'react-router-dom';

import store from '../redux/store';

import '../scss/app.scss';
import {Cart, Home} from './pages';
import App from './App';

const router = createBrowserRouter([
    {
        path: '/',
        element: Home,
    },
    {
        path: '/cart',
        element: Cart,
    }
]);

const container = document.getElementById('root');
const root = createRoot(container);

// <Route exact path="/" element={Home} />
// <Route path="/cart" element={Cart} />

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);
