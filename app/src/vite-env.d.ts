/// <reference types="vite/client" />

declare module '@current-client' {
  import { ClientConfig } from './runtime/types';
  const config: ClientConfig;
  export default config;
}

/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_KEY_RE_CAPTCHA: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
