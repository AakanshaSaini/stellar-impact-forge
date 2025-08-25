import { useState } from "react";
import { Wallet, Shield, Award, Star } from "lucide-react";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { CryptoCard } from "@/components/crypto-card";

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
          <div className="space-y-3">
            {walletOptions.map((wallet) => (
              <CryptoCard
                key={wallet.name}
                className={`cursor-pointer transition-all duration-300 ${
                  selectedWallet === wallet.name 
                    ? "border-primary shadow-neon" 
                    : "hover:border-primary/50"
                }`}
                onClick={() => setSelectedWallet(wallet.name)}
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
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {wallet.description}
                    </p>
                  </div>
                  <Wallet className="h-5 w-5 text-muted-foreground" />
                </div>
              </CryptoCard>
            ))}
          </div>
        </div>

        {/* Connect Button */}
        <EnhancedButton
          variant="neon"
          size="lg"
          className="w-full"
          disabled={!selectedWallet}
        >
          Connect {selectedWallet || "Wallet"}
        </EnhancedButton>

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