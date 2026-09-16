import { createRoot } from 'react-dom/client'
import { Buffer } from 'buffer'
import './index.css'
import App from './App.tsx'
import { API_URL } from './midnight/config'

Object.assign(globalThis, { Buffer })

// A free-tier backend host spins down after idling and takes a few seconds
// to cold-start on the next request. Ping it the moment the frontend loads
// so it's waking up in parallel with the page render instead of waiting for
// the visitor's first real API call. Fire-and-forget: never blocks the app,
// never surfaces an error if the backend is unreachable.
void fetch(`${API_URL}/health`).catch(() => undefined)

createRoot(document.getElementById('root')!).render(<App />)
