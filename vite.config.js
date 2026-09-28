import process from 'node:process';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// Optional local authoring bridge only. Never inject server secrets into define/envPrefix.
export default defineConfig({
  plugins: [react()],
  build: {assetsInlineLimit: 0},
  server: {
    host: '0.0.0.0',
    fs: {deny: ['.env', '.env.*', '**/.env*', '**/*.{crt,pem}', '**/.git/**', '**/server/**', '**/.asset-jobs/**']},
    proxy: process.env.HF_ASSET_DEV_PROXY === 'true' ? {
      '/api/higgsfield': {target: 'http://127.0.0.1:8787', changeOrigin: true},
    } : undefined,
  },
});
