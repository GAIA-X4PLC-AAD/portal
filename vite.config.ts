import { defineConfig } from 'vite';
import * as dns from 'dns';
import path from 'path';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

dns.setDefaultResultOrder('verbatim');

// Define the environment-specific alias
const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  plugins: [
    react(
      {
        babel: {
          // You can specify a Babel config to make Vite treat .js files as if they may contain JSX
          plugins: [
            ['@babel/plugin-transform-react-jsx', { 'runtime': 'automatic' }]
          ]
        }
      }
    ),
    tsconfigPaths(), // Plugin to automatically respect tsconfig paths
    {
      name: 'singleHMR',
      handleHotUpdate({ modules }) {
        modules.forEach((module) => {
          module.importers = new Set();
        });
        return modules;
      }
    }
  ],
  esbuild: {
    loader: 'jsx', // Tell esbuild to treat JS files as JSX
    include: [
      // Add folders you want to include with JSX support in .js files
      'src/**/*.js'
    ],
  },
  base: '/gaia-x/',
  server: {
    host: 'localhost',
    port: 3000,
    open: true,
    fs: {
      strict: false
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3000',
    //     changeOrigin: true,
    //     configure: (proxy) => {
    //       proxy.on('proxyReq', (proxyReq) => {
    //         proxyReq.setHeader('X-Custom-Header', 'value');
    //       });
    //     },
    //   },
    // },
  },
  build: {
    outDir: 'build',
    assetsDir: 'static',
    rollupOptions: {
      output: {
        assetFileNames: 'static/[name][extname]'
      }
    },
    cssMinify: false
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx'
      }
    },
  },
  resolve: {
    alias: {
      // Add alias for Keycloak configuration
      'keycloak-config': path.resolve(
        __dirname,
        isProduction
          ? 'src/keycloak-config.prod.json' // Production environment
          : 'src/keycloak-config.json'      // Development environment
      ),
    },
  },
});
