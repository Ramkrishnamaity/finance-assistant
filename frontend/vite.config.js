import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import commonValidation from './src/utils/schemas/common.validate.js';

// Validate environment variables at startup
let validatedEnv;
try {
  validatedEnv = commonValidation.envSchema.validateSync(process.env, {
    abortEarly: false,
    stripUnknown: true,
  });
  console.log('✔️ Environment file validated successfully.');
} catch (error) {
  console.error('❌ Environment file validation error:');
  if (error.errors) {
    error.errors.forEach(err => console.error(`  - ${err}`));
  } else {
    console.error(`  - ${error.message}`);
  }
  process.exit(1);
}

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Finance Assistant',
        short_name: 'Finance',
        description: 'AI-assisted personal finance application',
        theme_color: '#6366f1',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\./,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 // 24 hours
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ],
  server: {
    port: validatedEnv.PORT,
    open: true
  }
});
