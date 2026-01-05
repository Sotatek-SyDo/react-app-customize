import type { ClientManifest } from '@/runtime/types';

const manifest: ClientManifest = {
  key: 'medix',
  name: 'Medix Health',
  enabled: true,

  branding: {
    logo: '/vite.svg',
    favicon: '/vite.svg',
    appName: 'Medix Health',
    primaryColor: '#1883aa',
  },
};

export default manifest;
