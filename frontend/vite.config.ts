import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import wasm from 'vite-plugin-wasm'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
    plugins: [wasm(), react()],
    build: { target: 'esnext' },
    define: {
        process: { env: {} },
        global: 'globalThis',
    },
    optimizeDeps: {
        esbuildOptions: {
            define: {
                process: JSON.stringify({ env: {} }),
                global: 'globalThis',
            },
        },
    },
    resolve: {
        dedupe: [
            '@midnight-ntwrk/compact-runtime',
            '@midnight-ntwrk/onchain-runtime-v3',
        ],
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            events: 'events/',
            assert: 'assert/',
            'isomorphic-ws': fileURLToPath(new URL('./src/shims/isomorphic-ws.ts', import.meta.url)),
            'libsodium-wrappers': fileURLToPath(new URL('./node_modules/libsodium-wrappers/dist/modules/libsodium-wrappers.js', import.meta.url)),
        },
    },
    server: {
        allowedHosts: [
            'localhost',
            '127.0.0.1',
            '.ngrok-free.dev',
            '.ngrok.app',
            '.trycloudflare.com'
        ],
        headers: {
            'Cross-Origin-Opener-Policy': 'same-origin',
            'Cross-Origin-Embedder-Policy': 'require-corp',
        },
    },
})
