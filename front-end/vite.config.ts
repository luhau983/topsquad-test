import { resolve } from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

const pathSrc = resolve(__dirname, './src').replace(/\\/g, '/');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      // A minimatch pattern, or array of patterns, which specifies the files in the build the plugin should include.
      include: '**/*.svg',
      exclude: '',
    }),
  ],
  base: '/',
  resolve: {
    alias: {
      '@': '/src',
      '@assets': '/src/assets',
      '@components': '/src/components',
      '@domain': '/src/core/domain',
      '@constant': '/src/core/utils/constant',
      '@models': '/src/core/domain/models',
      '@infrastructure': '/src/core/infrastructure',
      '@utils': '/src/core/utils',
      '@controller': '/src/core/controller',
      '@layouts': '/src/layouts',
      '@routes': '/src/routes',
      '@hooks': '/src/hooks',
      '@context': '/src/context',
      '@stores': '/src/stores',
      '@pages': '/src/pages',
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: ['assets/scss/_variables', 'assets/scss/_reset']
          .map(stylePathFile => `@import "${pathSrc}/${stylePathFile}";`)
          .join('\n'),
      },
    },
  },
});
