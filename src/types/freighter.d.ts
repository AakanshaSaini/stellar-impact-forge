// TypeScript declarations for Freighter API
// The official @stellar/freighter-api package provides its own types

declare global {
  interface Window {
    stellar?: {
      isConnected(): Promise<boolean>;
      requestAccess(): Promise<void>;
      getPublicKey(): Promise<string>;
      getNetwork(): Promise<string>;
      signTransaction(transactionXDR: string, network: string): Promise<string>;
      signMessage(message: string, network: string): Promise<string>;
    };
  }
}

export {};
