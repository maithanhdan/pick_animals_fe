import { defineConfig, loadEnv, UserConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import dotenv from 'dotenv';

export default defineConfig(({ mode }): UserConfig => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [react(), eslint()],
    define: {
      'process.env': {},
      'import.meta.env': JSON.stringify(dotenv.config().parsed),
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json', '.ts', '.tsx', '.mjs'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      host: true,
      port: Number(env.VITE_APP_PORT),
    },
    build: {
      sourcemap: true,
      outDir: 'build',
    },
  };
});
