import { lazy } from 'react';
import type { ClientConfig } from '@/runtime/types';
import CustomHeader from './src/components/CustomHeader';
import CustomButton from './src/components/CustomButton';
import manifest from './manifest';

const HitowaMyAccount = lazy(() => import('./src/pages/MyAccount'));

const hitowaConfig: ClientConfig = {
  branding: manifest.branding,
  pages: {
    myAccount: HitowaMyAccount,
  },
  components: {
    Header: CustomHeader,
    AppButton: CustomButton,
  },
};

export default hitowaConfig;
