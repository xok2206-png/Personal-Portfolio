import process from 'node:process';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { pageWorktreeSync } from './scripts/page-worktree-sync.mjs';
// Optional local authoring bridge only. Never inject server secrets into define/envPrefix.
export default defineConfig({
  plugins: [pageWorktreeSync(), react()],
  build: {assetsInlineLimit: 0},
  server: {
    port: 5173,
    strictPort: true,
    host: '0.0.0.0',
    watch: {ignored: ['**/public/assets/source/**', '**/output/**', '**/.page-sync/**']},
    fs: {deny: ['.env', '.env.*', '**/.env*', '**/*.{crt,pem}', '**/.git/**', '**/server/**', '**/.asset-jobs/**', '**/.page-sync/**', '**/.page-worktrees.local.json']},
    proxy: process.env.HF_ASSET_DEV_PROXY === 'true' ? {
      '/api/higgsfield': {target: 'http://127.0.0.1:8787', changeOrigin: true},
    } : undefined,
  },
});
