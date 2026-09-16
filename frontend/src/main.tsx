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

// Every deploy content-hashes chunk filenames, so a tab left open from
// before a redeploy can try to lazily load a route chunk under its old
// (now-superseded) filename and fail with "Failed to fetch dynamically
// imported module". Vite fires this event for exactly that case — reload
// once to pick up the current build instead of leaving the user stuck.
// Guarded by sessionStorage so a genuinely broken chunk doesn't loop forever.
const chunkReloadKey = 'lumapay:chunk-reload'
window.addEventListener('vite:preloadError', () => {
    if (sessionStorage.getItem(chunkReloadKey)) return
    sessionStorage.setItem(chunkReloadKey, '1')
    window.location.reload()
})
// This script itself loaded successfully, so clear any guard left over from
// a previous recovery — a later stale-chunk hit in this same tab should be
// able to trigger the auto-reload again, not just once per tab session.
sessionStorage.removeItem(chunkReloadKey)

createRoot(document.getElementById('root')!).render(<App />)
