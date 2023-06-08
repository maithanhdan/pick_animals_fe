import { StorageType } from '@unipasswallet/popup-sdk';

export type Environment = 'test' | 'prod';
export declare type ChainType =
  | 'polygon'
  | 'bsc'
  | 'rangers'
  | 'eth'
  | 'scroll'
  | 'arbitrum';

// UniPass Wallet entry URL
export interface WalletURL {
  domain?: string;
  protocol?: 'https' | 'http';
}

// Basic Theme
export declare enum UniPassTheme {
  LIGHT = 'light',
  DARK = 'dark',
}

// Config before open the popup window
export declare type AppSettings = {
  chain?: ChainType;
  appName?: string;
  appIcon?: string;
  theme?: UniPassTheme;
};

// UniPass Wallet init config
export declare type PopupSDKOption = {
  readonly nodeRPC?: string;
  readonly chainType?: ChainType;
  readonly env?: Environment;
  readonly storageType?: StorageType;
  readonly walletUrl?: WalletURL;
  readonly appSettings?: AppSettings;
  readonly [key: string]: any;
};
