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
        name: 'Finance Assistance',
        short_name: 'Finance App',
        description: 'AI-assisted personal finance application for tracking expenses and income',
        theme_color: '#6366f1',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait-primary',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any'
          },
          {
            src: 'icon.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'maskable'
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
