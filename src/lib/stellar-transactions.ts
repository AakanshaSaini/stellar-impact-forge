import { 
  Transaction, 
  Operation, 
  Asset, 
  Keypair, 
  Server, 
  Networks,
  Memo,
  MemoType 
} from '@stellar/stellar-sdk';
import { getStellarConfig } from './stellar-config';

export interface DonationTransactionParams {
  amount: string;
  destinationAddress: string;
  sourcePublicKey: string;
  memo?: string;
  network?: string;
}

export async function createDonationTransaction({
  amount,
  destinationAddress,
  sourcePublicKey,
  memo,
  network = 'testnet'
}: DonationTransactionParams): Promise<Transaction> {
  const config = getStellarConfig(network);
  const server = new Server(config.horizonUrl);
  
  // Get the source account to get the current sequence number
  const sourceAccount = await server.loadAccount(sourcePublicKey);
  
  // Create the transaction
  const transaction = new Transaction(sourceAccount, {
    fee: '100',
    networkPassphrase: config.networkPassphrase,
  });

  // Add payment operation
  const paymentOp = Operation.payment({
    destination: destinationAddress,
    asset: Asset.native(), // XLM
    amount: amount,
  });

  transaction.addOperation(paymentOp);

  // Add memo if provided
  if (memo) {
    transaction.addMemo(Memo.text(memo));
  }

  // Set timeout
  transaction.setTimeout(30);

  return transaction;
}

export async function submitTransaction(signedTransactionXDR: string, network = 'testnet'): Promise<any> {
  const config = getStellarConfig(network);
  const server = new Server(config.horizonUrl);
  
  try {
    const transaction = Transaction.fromXDR(signedTransactionXDR, config.networkPassphrase);
    const result = await server.submitTransaction(transaction);
    return result;
  } catch (error) {
    console.error('Transaction submission failed:', error);
    throw error;
  }
}

export function validateStellarAddress(address: string): boolean {
  try {
    Keypair.fromPublicKey(address);
    return true;
  } catch {
    return false;
  }
}

export function formatXLMAmount(amount: string): string {
  // Convert from stroops to XLM (1 XLM = 10^7 stroops)
  const stroops = parseFloat(amount);
  const xlm = stroops / 10000000;
  return xlm.toFixed(7);
}

export function parseXLMAmount(xlmAmount: string): string {
  // Convert from XLM to stroops
  const xlm = parseFloat(xlmAmount);
  const stroops = Math.floor(xlm * 10000000);
  return stroops.toString();
}
