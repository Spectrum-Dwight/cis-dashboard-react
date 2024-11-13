import { StrictMode } from 'react'
import { createRoot, Root } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Toaster } from "@/components/ui/sonner"
import { QueryClient, QueryClientProvider } from 'react-query'

let appRoot: Root | null = null

export function mountApp(element: HTMLElement) {
  console.log(`Mounting dashboard app in <div> with id: "${element.id}"`)
  appRoot = createRoot(element)
  
  appRoot.render(
    <StrictMode>
      <QueryClientProvider client={new QueryClient}>
        <App />
        <Toaster closeButton />
      </QueryClientProvider>
    </StrictMode>
  )
}

export function unmountApp() {
  if (appRoot) {
    console.log("Unmounting dashboard app")
    appRoot.unmount()
  }
}


