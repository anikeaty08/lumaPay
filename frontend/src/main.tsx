import { createRoot } from 'react-dom/client'
import { Buffer } from 'buffer'
import './index.css'
import App from './App.tsx'

Object.assign(globalThis, { Buffer })

createRoot(document.getElementById('root')!).render(<App />)
