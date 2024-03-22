import React from 'react';
import ReactDOM from 'react-dom/client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Flowbite } from 'flowbite-react';
import { RouterProvider } from 'react-router-dom';
import AuthProvider from './Context/AuthContext';
import Router from './Router/Router';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Flowbite>
        <QueryClientProvider client={new QueryClient()}>
            <AuthProvider>
                <RouterProvider router={Router}></RouterProvider>
            </AuthProvider>
        </QueryClientProvider>
        </Flowbite>
    </React.StrictMode>,
);
