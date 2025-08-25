# Freighter Wallet Integration Guide

This guide will help you set up and test the Freighter wallet integration in the Stellar Impact Forge application.

## 🚀 What's New

The application now uses the **official @stellar/freighter-api package** for reliable wallet detection and connection. This provides:

- ✅ **Official Stellar SDK integration**
- ✅ **Reliable wallet detection**
- ✅ **Proper error handling**
- ✅ **TypeScript support**
- ✅ **Simplified connection flow**

## 📋 Prerequisites

1. **Freighter Wallet Extension**
   - Install from: https://www.freighter.app/
   - Available for Chrome, Firefox, and Edge

2. **Testnet XLM**
   - Get free testnet XLM from: https://laboratory.stellar.org/#account-creator
   - This is required for testing transactions

## 🔧 Setup Instructions

### Step 1: Install Freighter Extension

1. Go to https://www.freighter.app/
2. Click "Install Extension" for your browser
3. Follow the installation prompts
4. Pin the extension to your toolbar for easy access

### Step 2: Create/Import Wallet

1. Open Freighter extension
2. Choose "Create New Wallet" or "Import Existing Wallet"
3. **Important**: Switch to **Testnet** network
   - Click the network dropdown (usually shows "Public")
   - Select "Testnet"
4. Save your recovery phrase securely

### Step 3: Get Testnet XLM

1. Go to https://laboratory.stellar.org/#account-creator
2. Enter your public key from Freighter
3. Click "Get testnet XLM"
4. Wait for the XLM to appear in your wallet

### Step 4: Test the Application

1. Open the application: http://localhost:8080
2. Click "Connect Wallet" → "Freighter"
3. Approve the connection in the Freighter popup
4. You should see your wallet connected with public key and network

## 🧪 Testing the Integration

### Manual Console Test

Open your browser console and run the test script:

```javascript
// Copy and paste the contents of freighter-test.js
// This will test Freighter detection and connection
```

### Application Testing

1. **Connection Test**
   - Click "Connect Wallet" → "Freighter"
   - Should open Freighter popup
   - Should connect and show wallet info

2. **Donation Test**
   - Navigate to donation screen
   - Enter a small amount (e.g., 1 XLM)
   - Click "Donate Securely"
   - Should open Freighter for transaction signing
   - Should complete the donation

3. **Transaction Verification**
   - Check your wallet balance decreased
   - Transaction should appear in Freighter history
   - Can verify on Stellar Explorer (testnet)

## 🔍 Troubleshooting

### Freighter Not Detected

**Symptoms**: "Freighter wallet is not installed" error

**Solutions**:
1. ✅ **Check Installation**
   - Verify Freighter is installed from freighter.app
   - Check browser extensions are enabled
   - Try clicking the Freighter icon in toolbar

2. ✅ **Refresh and Retry**
   - Refresh the page completely
   - Try connecting again
   - Check browser console for errors

3. ✅ **Browser Compatibility**
   - Ensure you're using Chrome, Firefox, or Edge
   - Try disabling other extensions temporarily
   - Check if HTTPS/localhost is required

### Connection Fails

**Symptoms**: Connection popup appears but fails

**Solutions**:
1. ✅ **Check Network**
   - Ensure Freighter is set to "Testnet"
   - Verify you have testnet XLM balance
   - Try switching networks and back

2. ✅ **Clear Cache**
   - Clear browser cache and cookies
   - Restart browser
   - Try incognito/private mode

3. ✅ **Extension Issues**
   - Disable and re-enable Freighter
   - Uninstall and reinstall extension
   - Check for extension updates

### Transaction Errors

**Symptoms**: Transaction signing fails

**Solutions**:
1. ✅ **Insufficient Balance**
   - Ensure you have enough XLM for transaction + fees
   - Get more testnet XLM if needed

2. ✅ **Network Issues**
   - Verify you're on Testnet network
   - Check Stellar network status
   - Try again after a few minutes

3. ✅ **Transaction Parameters**
   - Ensure destination address is valid
   - Check transaction amount is reasonable
   - Verify memo is within limits

## 📱 Development Notes

### Technical Implementation

The application uses:
- **@stellar/freighter-api**: Official Freighter integration
- **@stellar/stellar-sdk**: Stellar blockchain operations
- **React Context**: Global wallet state management
- **TypeScript**: Type safety and better development experience

### Key Files

- `src/hooks/use-freighter-wallet.ts`: Main wallet integration
- `src/contexts/WalletContext.tsx`: Global wallet state
- `src/components/onboarding-screen.tsx`: Connection UI
- `src/components/donation-screen.tsx`: Transaction handling
- `src/lib/stellar-transactions.ts`: Transaction utilities

### API Methods Used

```typescript
import { 
  isConnected, 
  requestAccess, 
  getPublicKey, 
  getNetwork, 
  signTransaction, 
  signMessage 
} from '@stellar/freighter-api';
```

## 🎯 Success Criteria

✅ **Wallet Detection**: Freighter is detected when installed
✅ **Connection Flow**: User can connect wallet with popup
✅ **State Management**: Wallet state persists across app
✅ **Transaction Signing**: Can sign and submit transactions
✅ **Error Handling**: Clear error messages for issues
✅ **Network Support**: Works with Testnet and Mainnet

## 🆘 Support

If you encounter issues:

1. **Check Console**: Look for error messages in browser console
2. **Test Script**: Run the `freighter-test.js` script
3. **Documentation**: Refer to https://developers.stellar.org/docs/build
4. **Community**: Check Stellar Discord or GitHub issues

## 🔄 Updates

This integration follows the latest Stellar development best practices and uses the official Freighter API for maximum reliability and compatibility.
