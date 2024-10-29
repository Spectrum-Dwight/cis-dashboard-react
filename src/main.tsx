import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Toaster } from "@/components/ui/sonner"
import { QueryClient, QueryClientProvider } from 'react-query'

createRoot(document.getElementById('cis-dashboard')!).render(
  <StrictMode>
    <QueryClientProvider client={new QueryClient}>
      <App />
      <Toaster closeButton />
    </QueryClientProvider>
  </StrictMode>,
)
