import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
 import { ClerkProvider } from '@clerk/clerk-react'
import {
  Routes,
  Route,
  BrowserRouter,
  useLocation,
  useNavigationType,
  createRoutesFromChildren,
  matchRoutes,
} from "react-router";
 import {Toaster} from "react-hot-toast"
import * as Sentry from "@sentry/react";
import {
 
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import AuthProvider from './provider/AuthProvider.jsx'
const queryClient = new QueryClient()
// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

Sentry.init({
  dsn: "https://b54b7a9d34f1fb72292bc02636d7d13b@o4510246038339585.ingest.de.sentry.io/4510254196392016",
  integrations: [
    Sentry.reactRouterV7BrowserTracingIntegration({
      useEffect: React.useEffect,
      useLocation,
      useNavigationType,
      createRoutesFromChildren,
      matchRoutes,
    }),
  ],
  tracesSampleRate: 1.0,
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
<BrowserRouter >
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
    <App />
    </AuthProvider>
    <Toaster/>
    </QueryClientProvider>
    </BrowserRouter>
    
     </ClerkProvider>
  </StrictMode>,
)
