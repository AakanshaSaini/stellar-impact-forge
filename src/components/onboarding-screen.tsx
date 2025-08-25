import { useState } from "react";
import { Wallet, Shield, Award, Star, ExternalLink, CheckCircle, RefreshCw } from "lucide-react";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { CryptoCard } from "@/components/crypto-card";
import { useWallet } from "@/contexts/WalletContext";

const walletOptions = [
  {
    name: "MetaMask",
    description: "Connect with MetaMask wallet",
    icon: "🦊",
    popular: true
  },
  {
    name: "Freighter",
    description: "Stellar network wallet",
    icon: "⭐",
    popular: true
  },
  {
    name: "Stellar Wallet",
    description: "Official Stellar wallet",
    icon: "🚀",
    popular: false
  }
];

export function OnboardingScreen() {
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const { 
    isConnected, 
    publicKey, 
    network, 
    isLoading, 
    error, 
    connect, 
    disconnect 
  } = useWallet();
  
  const handleFreighterConnect = async () => {
    // Try to trigger Freighter by dispatching events
    if (typeof window !== 'undefined') {
      // Dispatch focus events to trigger extension
      window.dispatchEvent(new Event('focus'));
      window.dispatchEvent(new Event('blur'));
      window.dispatchEvent(new Event('focus'));
      
      // Try postMessage to trigger extension
      try {
        window.postMessage({ type: 'FREIGHTER_DETECT' }, '*');
      } catch (e) {
        console.log('PostMessage failed');
      }
    }
    
    // Wait a moment then try to connect
    setTimeout(() => {
      connect();
    }, 500);
  };
  
  return (
    <div className="min-h-screen bg-background p-4 pt-16 md:pt-8">
      <div className="max-w-md mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 animate-slide-up">
          <div className="relative">
            <h1 className="text-4xl font-bold text-gradient mb-2">
              DonateChain
            </h1>
            <div className="absolute -inset-1 bg-gradient-primary rounded-lg blur opacity-30 animate-pulse"></div>
          </div>
          <p className="text-xl text-primary font-semibold">
            Donate with Trust. Earn NFT Proofs.
          </p>
          <p className="text-muted-foreground">
            Transparent donations on Stellar blockchain with verifiable impact certificates
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4">
          <CryptoCard className="p-4 text-center">
            <Shield className="h-8 w-8 mx-auto mb-2 text-neon-green" />
            <p className="text-xs text-muted-foreground">Verified NGOs</p>
          </CryptoCard>
          <CryptoCard className="p-4 text-center">
            <Award className="h-8 w-8 mx-auto mb-2 text-neon-purple" />
            <p className="text-xs text-muted-foreground">NFT Certificates</p>
          </CryptoCard>
          <CryptoCard className="p-4 text-center">
            <Star className="h-8 w-8 mx-auto mb-2 text-neon-yellow" />
            <p className="text-xs text-muted-foreground">Impact Tracking</p>
          </CryptoCard>
        </div>

        {/* Wallet Selection */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-center">Connect Your Wallet</h3>
          
          {/* Connected Wallet Info */}
          {isConnected && (
            <CryptoCard variant="glow" className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">⭐</div>
                  <div>
                    <h4 className="font-semibold">Freighter Connected</h4>
                    <p className="text-sm text-muted-foreground">
                      {publicKey?.slice(0, 8)}...{publicKey?.slice(-8)} • {network}
                    </p>
                  </div>
                </div>
                <CheckCircle className="h-5 w-5 text-neon-green" />
              </div>
            </CryptoCard>
          )}

          {/* Error Message */}
          {error && (
            <CryptoCard className="p-4 border-red-500/20 bg-red-500/5">
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-red-400">
                  <span className="text-sm">{error}</span>
                </div>
                {error.includes('not installed') && (
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">
                      If you have Freighter installed, try these steps:
                    </p>
                    <div className="space-y-2">
                      <EnhancedButton
                        variant="outline"
                        size="sm"
                        onClick={handleFreighterConnect}
                        className="w-full"
                        disabled={isLoading}
                      >
                        <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                        {isLoading ? "Connecting..." : "Trigger Freighter & Connect"}
                      </EnhancedButton>
                      <EnhancedButton
                        variant="outline"
                        size="sm"
                        onClick={() => window.open('https://www.freighter.app/', '_blank')}
                        className="w-full"
                      >
                        Install Freighter
                      </EnhancedButton>
                      <EnhancedButton
                        variant="outline"
                        size="sm"
                        onClick={() => window.location.reload()}
                        className="w-full"
                      >
                        Refresh Page
                      </EnhancedButton>
                    </div>
                    <div className="text-xs text-muted-foreground mt-2 p-2 bg-muted/30 rounded">
                      <p className="font-medium mb-1">Setup Steps:</p>
                      <ul className="space-y-1 text-xs">
                        <li>• Install Freighter from freighter.app</li>
                        <li>• Create or import a wallet</li>
                        <li>• Switch to Testnet network</li>
                        <li>• Click "Trigger Freighter & Connect" above</li>
                        <li>• Or refresh the page and try again</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </CryptoCard>
          )}

          <div className="space-y-3">
            {walletOptions.map((wallet) => (
              <CryptoCard
                key={wallet.name}
                className={`cursor-pointer transition-all duration-300 ${
                  selectedWallet === wallet.name 
                    ? "border-primary shadow-neon" 
                    : "hover:border-primary/50"
                } ${isConnected && wallet.name === "Freighter" ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => {
                  if (isConnected && wallet.name === "Freighter") return;
                  setSelectedWallet(wallet.name);
                }}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">{wallet.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold">{wallet.name}</h4>
                      {wallet.popular && (
                        <span className="px-2 py-1 text-xs bg-primary/20 text-primary rounded-full">
                          Popular
                        </span>
                      )}
                      {isConnected && wallet.name === "Freighter" && (
                        <span className="px-2 py-1 text-xs bg-neon-green/20 text-neon-green rounded-full">
                          Connected
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {wallet.description}
                    </p>
                  </div>
                  {wallet.name === "Freighter" && !isConnected && (
                    <ExternalLink className="h-5 w-5 text-muted-foreground" />
                  )}
                  {wallet.name === "Freighter" && isConnected && (
                    <CheckCircle className="h-5 w-5 text-neon-green" />
                  )}
                  {wallet.name !== "Freighter" && (
                    <Wallet className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
              </CryptoCard>
            ))}
          </div>
        </div>

        {/* Connect/Disconnect Button */}
        {!isConnected ? (
          <EnhancedButton
            variant="neon"
            size="lg"
            className="w-full"
            disabled={!selectedWallet || isLoading}
            onClick={() => {
              if (selectedWallet === "Freighter") {
                handleFreighterConnect();
              }
            }}
          >
            {isLoading ? "Connecting..." : `Connect ${selectedWallet || "Wallet"}`}
          </EnhancedButton>
        ) : (
          <div className="space-y-3">
            <EnhancedButton
              variant="neon"
              size="lg"
              className="w-full"
              onClick={() => {
                // Navigate to marketplace or dashboard
                window.location.href = "#marketplace";
              }}
            >
              Continue to App
            </EnhancedButton>
            <EnhancedButton
              variant="glass"
              size="lg"
              className="w-full"
              onClick={disconnect}
            >
              Disconnect Wallet
            </EnhancedButton>
          </div>
        )}

        {/* Security Notice */}
        <CryptoCard variant="glow" className="p-4">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-neon-green flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-sm">Secure & Private</h4>
              <p className="text-xs text-muted-foreground">
                Your wallet keys remain secure. We never store private information.
              </p>
            </div>
          </div>
        </CryptoCard>

      </div>
    </div>
  );
}