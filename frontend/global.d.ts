// Global type declarations for GhostLance

declare global {
  interface Window {
    aleo?: {
      puzzleWalletClient?: any;
      [key: string]: any;
    };
  }
}

export {};
