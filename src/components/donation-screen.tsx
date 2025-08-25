import { useState } from "react";
import { ArrowUpDown, DollarSign, Star, Zap, Gift } from "lucide-react";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { CryptoCard } from "@/components/crypto-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function DonationScreen() {
  const [donationAmount, setDonationAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [selectedNgo] = useState({
    name: "Education First",
    logo: "🎓",
    cause: "Education"
  });

  const quickAmounts = [10, 25, 50, 100];
  const conversionRate = 0.12; // USD to XLM rate (example)

  return (
    <div className="min-h-screen bg-background p-4 pt-16 md:pt-8">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gradient">Make a Donation</h1>
          <p className="text-muted-foreground">Support verified causes with crypto</p>
        </div>

        {/* Selected NGO */}
        <CryptoCard variant="glow" className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-2">
            <div className="text-4xl">{selectedNgo.logo}</div>
            <div>
              <h3 className="font-semibold">{selectedNgo.name}</h3>
              <p className="text-sm text-muted-foreground">{selectedNgo.cause}</p>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-1 text-neon-green">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm">Verified Organization</span>
          </div>
        </CryptoCard>

        {/* Donation Amount */}
        <CryptoCard className="space-y-4">
          <Label className="text-sm font-medium">Donation Amount</Label>
          
          {/* Currency Toggle */}
          <div className="flex rounded-2xl bg-muted p-1">
            <button
              onClick={() => setCurrency("USD")}
              className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all ${
                currency === "USD" 
                  ? "bg-background shadow-sm text-foreground" 
                  : "text-muted-foreground"
              }`}
            >
              USD
            </button>
            <button
              onClick={() => setCurrency("XLM")}
              className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all ${
                currency === "XLM" 
                  ? "bg-background shadow-sm text-foreground" 
                  : "text-muted-foreground"
              }`}
            >
              XLM
            </button>
          </div>

          {/* Amount Input */}
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="number"
              placeholder="Enter amount"
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
              className="pl-10 text-2xl font-bold h-16 text-center bg-input/50 border-none rounded-2xl"
            />
          </div>

          {/* Quick Amounts */}
          <div className="grid grid-cols-4 gap-2">
            {quickAmounts.map((amount) => (
              <EnhancedButton
                key={amount}
                variant="ghost"
                size="sm"
                onClick={() => setDonationAmount(amount.toString())}
                className="rounded-xl"
              >
                ${amount}
              </EnhancedButton>
            ))}
          </div>

          {/* Conversion */}
          {donationAmount && (
            <div className="flex items-center justify-center space-x-2 p-3 bg-muted/30 rounded-xl">
              <ArrowUpDown className="h-4 w-4 text-neon-blue" />
              <span className="text-sm">
                {currency === "USD" 
                  ? `≈ ${(parseFloat(donationAmount) * conversionRate).toFixed(2)} XLM`
                  : `≈ $${(parseFloat(donationAmount) / conversionRate).toFixed(2)} USD`
                }
              </span>
            </div>
          )}
        </CryptoCard>

        {/* NFT Reward Preview */}
        <CryptoCard variant="neon" className="text-center space-y-3">
          <Gift className="h-12 w-12 mx-auto text-neon-purple animate-pulse" />
          <div>
            <h4 className="font-semibold">NFT Certificate Included</h4>
            <p className="text-sm text-muted-foreground">
              Get a unique digital proof of your donation impact
            </p>
          </div>
          <div className="flex items-center justify-center space-x-4 text-xs">
            <span className="flex items-center space-x-1">
              <Zap className="h-3 w-3 text-neon-yellow" />
              <span>Instant Mint</span>
            </span>
            <span className="flex items-center space-x-1">
              <Star className="h-3 w-3 text-neon-purple" />
              <span>Collectible</span>
            </span>
          </div>
        </CryptoCard>

        {/* Donation Summary */}
        <CryptoCard className="space-y-2">
          <h4 className="font-semibold mb-3">Transaction Summary</h4>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Donation Amount</span>
            <span className="font-medium">
              {donationAmount ? `$${donationAmount}` : "$0.00"}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Network Fee</span>
            <span className="font-medium">~$0.01</span>
          </div>
          <div className="border-t border-border pt-2">
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span className="text-neon-green">
                {donationAmount ? `$${(parseFloat(donationAmount) + 0.01).toFixed(2)}` : "$0.01"}
              </span>
            </div>
          </div>
        </CryptoCard>

        {/* Donate Button */}
        <EnhancedButton
          variant="neon"
          size="xl"
          className="w-full"
          disabled={!donationAmount}
        >
          Donate Securely
        </EnhancedButton>

        {/* Security Info */}
        <div className="text-center text-xs text-muted-foreground">
          Powered by Stellar blockchain • Fully transparent • Instant confirmation
        </div>
      </div>
    </div>
  );
}