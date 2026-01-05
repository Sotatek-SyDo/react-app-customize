import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import path from 'path';
import fs from 'fs';

function resolveClient() {
  const client = process.env.VITE_CLIENT || 'default';
  const base = path.resolve(__dirname, 'customize');

  const clientEntry = path.join(base, client, 'index.ts');
  const defaultEntry = path.join(base, 'default', 'index.ts');

  if (!fs.existsSync(clientEntry)) {
    console.warn(`⚠️ Client "${client}" not found. Fallback to default`);
    return { name: 'default', entry: defaultEntry };
  }

  return { name: client, entry: clientEntry };
}

export default defineConfig(() => {
  const { name, entry } = resolveClient();

  console.log(`🔧 Build client: ${name}`);

  return {
    root: path.resolve(__dirname, 'app'),

    plugins: [
      react(),
      svgr({
        svgrOptions: { icon: true },
      }),
    ],

    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'app/src'),
        '@assets': path.resolve(__dirname, 'app/src/assets'),
        '@components': path.resolve(__dirname, 'app/src/components'),
        '@constants': path.resolve(__dirname, 'app/src/constants'),
        '@hooks': path.resolve(__dirname, 'app/src/hooks'),
        '@pages': path.resolve(__dirname, 'app/src/pages'),
        '@router': path.resolve(__dirname, 'app/src/router'),
        '@runtime': path.resolve(__dirname, 'app/src/runtime'),
        '@scss': path.resolve(__dirname, 'app/src/scss'),
        '@services': path.resolve(__dirname, 'app/src/services'),
        '@shared': path.resolve(__dirname, 'app/src/shared'),
        '@store': path.resolve(__dirname, 'app/src/store'),
        '@types': path.resolve(__dirname, 'app/src/types'),
        '@utils': path.resolve(__dirname, 'app/src/utils'),
        '@customize': path.resolve(__dirname, 'customize'),
        '@current-client': entry,
      },
    },

    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'antd',
        'clsx',
        'lodash',
        'dayjs',
        'react-router-dom',
        'react-redux',
        '@reduxjs/toolkit',
      ],
    },

    server: {
      fs: {
        allow: [path.resolve(__dirname, 'app'), path.resolve(__dirname, 'customize')],
      },
    },

    build: {
      outDir: path.resolve(__dirname, `dist/${name}`),
      emptyOutDir: true,

      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom'],
            antd: ['antd'],
            vendor: ['lodash', 'dayjs'],
          },
        },
      },
    },
  };
});
