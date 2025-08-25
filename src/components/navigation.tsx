import { useState } from "react";
import { Home, Users, DollarSign, Trophy, Activity, Menu, Wallet } from "lucide-react";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { cn } from "@/lib/utils";
import { useWallet } from "@/contexts/WalletContext";
import { formatPublicKey } from "@/lib/stellar-config";

interface NavigationProps {
  activeScreen: string;
  onScreenChange: (screen: string) => void;
}

const navItems = [
  { id: "onboarding", label: "Connect", icon: Home },
  { id: "marketplace", label: "NGOs", icon: Users },
  { id: "donation", label: "Donate", icon: DollarSign },
  { id: "dashboard", label: "Profile", icon: Trophy },
  { id: "transactions", label: "History", icon: Activity }
];

export function Navigation({ activeScreen, onScreenChange }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { isConnected, publicKey, network } = useWallet();

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <EnhancedButton
          variant="glass"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu className="h-5 w-5" />
        </EnhancedButton>
      </div>

      {/* Wallet Status Indicator */}
      {isConnected && (
        <div className="fixed top-4 right-4 z-50">
          <div className="flex items-center space-x-2 bg-card/80 backdrop-blur-lg border border-white/10 rounded-2xl px-3 py-2">
            <Wallet className="h-4 w-4 text-neon-green" />
            <span className="text-sm text-muted-foreground">
              {formatPublicKey(publicKey || '')} • {network}
            </span>
          </div>
        </div>
      )}

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-lg md:hidden">
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <EnhancedButton
                  key={item.id}
                  variant={activeScreen === item.id ? "neon" : "glass"}
                  size="lg"
                  onClick={() => {
                    onScreenChange(item.id);
                    setIsOpen(false);
                  }}
                  className="w-48"
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {item.label}
                </EnhancedButton>
              );
            })}
          </div>
        </div>
      )}

      {/* Desktop Navigation */}
      <nav className="hidden md:flex fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex items-center space-x-2 bg-card/80 backdrop-blur-lg border border-white/10 rounded-3xl p-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <EnhancedButton
                key={item.id}
                variant={activeScreen === item.id ? "neon" : "ghost"}
                size="sm"
                onClick={() => onScreenChange(item.id)}
                className={cn(
                  "rounded-2xl",
                  activeScreen === item.id 
                    ? "text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4 mr-2" />
                {item.label}
              </EnhancedButton>
            );
          })}
        </div>
      </nav>
    </>
  );
}