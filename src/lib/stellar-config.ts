import { Networks } from '@stellar/stellar-sdk';

export const STELLAR_CONFIG = {
  testnet: {
    network: Networks.TESTNET,
    horizonUrl: 'https://horizon-testnet.stellar.org',
    networkPassphrase: Networks.TESTNET,
  },
  mainnet: {
    network: Networks.PUBLIC,
    horizonUrl: 'https://horizon.stellar.org',
    networkPassphrase: Networks.PUBLIC,
  },
};

export const getStellarConfig = (network: string) => {
  return STELLAR_CONFIG[network as keyof typeof STELLAR_CONFIG] || STELLAR_CONFIG.testnet;
};

export const formatPublicKey = (publicKey: string) => {
  if (!publicKey) return '';
  return `${publicKey.slice(0, 8)}...${publicKey.slice(-8)}`;
};

export const validatePublicKey = (publicKey: string) => {
  // Basic Stellar public key validation (G followed by 55 characters)
  const stellarPublicKeyRegex = /^G[A-Z2-7]{55}$/;
  return stellarPublicKeyRegex.test(publicKey);
};
