import type { ClientConfig } from '@/runtime/types';
import CustomMedix from './src/components/CustomMedix';
import manifest from './manifest';

const medixConfig: ClientConfig = {
  branding: manifest.branding,
  pages: {},
  components: {
    AppButton: CustomMedix,
  },
};

export default medixConfig;
