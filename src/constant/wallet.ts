import { UniPassPopupSDK } from '@unipasswallet/popup-sdk';
import { UniPassTheme } from '@unipasswallet/popup-types';

export const upWallet = new UniPassPopupSDK({
  env: import.meta.env.VITE_APP_TYPE,
  // for polygon mumbai
  chainType: 'polygon',
  // choose localStorage if you want to cache user account permanent
  storageType: 'sessionStorage',
  appSettings: {
    theme: UniPassTheme.LIGHT,
    appName: 'UniPass Wallet Demo',
    appIcon: '',
  },
});
