import { useState, useEffect, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';

interface FreighterWalletState {
  isConnected: boolean;
  publicKey: string | null;
  network: string;
  isLoading: boolean;
  error: string | null;
}

interface FreighterWalletActions {
  connect: () => Promise<void>;
  disconnect: () => void;
  signTransaction: (transactionXDR: string) => Promise<string>;
  signMessage: (message: string) => Promise<string>;
}

// Freighter detection and connection utility
class FreighterConnector {
  private static instance: FreighterConnector;
  private freighter: any = null;
  private isInitialized = false;

  static getInstance(): FreighterConnector {
    if (!FreighterConnector.instance) {
      FreighterConnector.instance = new FreighterConnector();
    }
    return FreighterConnector.instance;
  }

  async initialize(): Promise<boolean> {
    if (this.isInitialized) return true;

    try {
      console.log('Starting Freighter initialization...');
      
      // Try immediate detection first
      let freighter = this.getFreighterInstance();
      if (freighter) {
        this.freighter = freighter;
        this.isInitialized = true;
        console.log('Freighter found immediately');
        return true;
      }

      // Try to trigger Freighter injection
      this.triggerFreighterInjection();
      
      // Wait for Freighter to be available with longer timeout
      await this.waitForFreighter();
      
      // Get the Freighter instance
      this.freighter = this.getFreighterInstance();
      
      if (this.freighter) {
        this.isInitialized = true;
        console.log('Freighter initialized successfully after waiting');
        return true;
      }
      
      console.log('Freighter not found after all attempts');
      return false;
    } catch (error) {
      console.error('Failed to initialize Freighter:', error);
      return false;
    }
  }

  private triggerFreighterInjection(): void {
    if (typeof window === 'undefined') return;

    console.log('Triggering Freighter injection...');
    
    // Dispatch focus events to trigger extension
    window.dispatchEvent(new Event('focus'));
    window.dispatchEvent(new Event('blur'));
    window.dispatchEvent(new Event('focus'));
    
    // Try postMessage to trigger extension
    try {
      window.postMessage({ type: 'FREIGHTER_DETECT' }, '*');
    } catch (e) {
      console.log('PostMessage failed:', e);
    }
    
    // Try to access Freighter directly to trigger injection
    try {
      if ((window as any).stellar) {
        console.log('Found stellar via any access');
      }
      if ((window as any).freighter) {
        console.log('Found freighter via any access');
      }
    } catch (e) {
      console.log('Direct access failed:', e);
    }
  }

  private async waitForFreighter(): Promise<void> {
    return new Promise((resolve, reject) => {
      let attempts = 0;
      const maxAttempts = 100; // 10 seconds with 100ms intervals
      
      const checkFreighter = () => {
        attempts++;
        
        if (this.getFreighterInstance()) {
          console.log(`Freighter found after ${attempts} attempts`);
          resolve();
          return;
        }
        
        if (attempts >= maxAttempts) {
          console.log('Freighter not found after timeout');
          reject(new Error('Freighter not available after timeout'));
          return;
        }
        
        // Try to trigger injection periodically
        if (attempts % 10 === 0) {
          this.triggerFreighterInjection();
        }
        
        setTimeout(checkFreighter, 100);
      };
      
      checkFreighter();
    });
  }

  private getFreighterInstance(): any {
    // Check for window.stellar (most common)
    if (typeof window !== 'undefined' && window.stellar) {
      const stellar = window.stellar;
      if (this.isValidFreighter(stellar)) {
        console.log('Found Freighter at window.stellar');
        return stellar;
      }
    }
    
    // Check for window.freighter (alternative)
    if (typeof window !== 'undefined' && (window as any).freighter) {
      const freighter = (window as any).freighter;
      if (this.isValidFreighter(freighter)) {
        console.log('Found Freighter at window.freighter');
        return freighter;
      }
    }
    
    // Try to access via any property
    if (typeof window !== 'undefined') {
      const anyWindow = window as any;
      if (anyWindow.stellar && this.isValidFreighter(anyWindow.stellar)) {
        console.log('Found Freighter via any.stellar');
        return anyWindow.stellar;
      }
      if (anyWindow.freighter && this.isValidFreighter(anyWindow.freighter)) {
        console.log('Found Freighter via any.freighter');
        return anyWindow.freighter;
      }
    }
    
    return null;
  }

  private isValidFreighter(instance: any): boolean {
    if (!instance) return false;
    
    const requiredMethods = ['isConnected', 'requestAccess', 'getPublicKey', 'getNetwork', 'signTransaction'];
    const hasAllMethods = requiredMethods.every(method => typeof instance[method] === 'function');
    
    if (hasAllMethods) {
      console.log('Valid Freighter instance found with methods:', requiredMethods);
    }
    
    return hasAllMethods;
  }

  async isConnected(): Promise<boolean> {
    if (!this.freighter) return false;
    try {
      return await this.freighter.isConnected();
    } catch (error) {
      console.error('Error checking connection:', error);
      return false;
    }
  }

  async requestAccess(): Promise<void> {
    if (!this.freighter) {
      throw new Error('Freighter not available');
    }
    return await this.freighter.requestAccess();
  }

  async getPublicKey(): Promise<string> {
    if (!this.freighter) {
      throw new Error('Freighter not available');
    }
    return await this.freighter.getPublicKey();
  }

  async getNetwork(): Promise<string> {
    if (!this.freighter) {
      throw new Error('Freighter not available');
    }
    return await this.freighter.getNetwork();
  }

  async signTransaction(transactionXDR: string, network: string): Promise<string> {
    if (!this.freighter) {
      throw new Error('Freighter not available');
    }
    return await this.freighter.signTransaction(transactionXDR, network);
  }

  async signMessage(message: string, network: string): Promise<string> {
    if (!this.freighter) {
      throw new Error('Freighter not available');
    }
    return await this.freighter.signMessage(message, network);
  }

  // Force re-initialization
  reset(): void {
    this.freighter = null;
    this.isInitialized = false;
  }
}

export function useFreighterWallet(): FreighterWalletState & FreighterWalletActions {
  const [state, setState] = useState<FreighterWalletState>({
    isConnected: false,
    publicKey: null,
    network: 'testnet',
    isLoading: false,
    error: null,
  });

  const [connector] = useState(() => FreighterConnector.getInstance());

  // Check connection status on mount
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const initialized = await connector.initialize();
        if (!initialized) {
          console.log('Freighter not initialized, will retry on connect');
          return;
        }

        const connected = await connector.isConnected();
        if (connected) {
          const publicKey = await connector.getPublicKey();
          const network = await connector.getNetwork();
          setState(prev => ({
            ...prev,
            isConnected: true,
            publicKey,
            network,
            error: null,
          }));
        }
      } catch (error) {
        console.error('Error checking Freighter connection:', error);
      }
    };

    // Check connection after a short delay to allow Freighter to load
    const timer = setTimeout(checkConnection, 1000);
    return () => clearTimeout(timer);
  }, [connector]);

  // Connect to Freighter
  const connect = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      console.log('Attempting to connect to Freighter...');
      
      // Try to initialize Freighter
      const initialized = await connector.initialize();
      if (!initialized) {
        // If initialization fails, try a different approach
        console.log('Initialization failed, trying alternative detection...');
        
        // Try to trigger Freighter manually
        if (typeof window !== 'undefined') {
          // Dispatch events to trigger extension
          window.dispatchEvent(new Event('focus'));
          window.dispatchEvent(new Event('blur'));
          window.dispatchEvent(new Event('focus'));
          
          // Try postMessage
          try {
            window.postMessage({ type: 'FREIGHTER_DETECT' }, '*');
          } catch (e) {
            console.log('PostMessage failed:', e);
          }
        }
        
        // Wait a bit and try again
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const retryInitialized = await connector.initialize();
        if (!retryInitialized) {
          throw new Error('Freighter wallet is not installed or not accessible. Please ensure it is installed from https://www.freighter.app/, enable it in your browser extensions, and refresh the page.');
        }
      }

      console.log('Freighter detected, requesting access...');

      // Request access to the wallet
      await connector.requestAccess();
      
      // Get wallet details
      const publicKey = await connector.getPublicKey();
      const network = await connector.getNetwork();

      console.log('Successfully connected to Freighter:', { 
        publicKey: publicKey?.slice(0, 8) + '...', 
        network
      });

      setState(prev => ({
        ...prev,
        isConnected: true,
        publicKey,
        network,
        isLoading: false,
        error: null,
      }));

      toast({
        title: "Wallet Connected!",
        description: `Connected to Freighter wallet (${network})`,
      });

    } catch (error) {
      console.error('Freighter connection error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to connect to Freighter wallet';
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));

      toast({
        title: "Connection Failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  }, [connector]);

  // Disconnect from Freighter
  const disconnect = useCallback(() => {
    setState({
      isConnected: false,
      publicKey: null,
      network: 'testnet',
      isLoading: false,
      error: null,
    });

    toast({
      title: "Wallet Disconnected",
      description: "Successfully disconnected from Freighter wallet",
    });
  }, []);

  // Sign transaction
  const signTransactionWithFreighter = useCallback(async (transactionXDR: string): Promise<string> => {
    if (!state.isConnected) {
      throw new Error('Wallet not connected');
    }

    try {
      return await connector.signTransaction(transactionXDR, state.network);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to sign transaction';
      toast({
        title: "Transaction Signing Failed",
        description: errorMessage,
        variant: "destructive",
      });
      throw error;
    }
  }, [state.isConnected, state.network, connector]);

  // Sign message
  const signMessageWithFreighter = useCallback(async (message: string): Promise<string> => {
    if (!state.isConnected) {
      throw new Error('Wallet not connected');
    }

    try {
      return await connector.signMessage(message, state.network);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to sign message';
      toast({
        title: "Message Signing Failed",
        description: errorMessage,
        variant: "destructive",
      });
      throw error;
    }
  }, [state.isConnected, state.network, connector]);

  return {
    ...state,
    connect,
    disconnect,
    signTransaction: signTransactionWithFreighter,
    signMessage: signMessageWithFreighter,
  };
}
