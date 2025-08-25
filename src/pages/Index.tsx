import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { OnboardingScreen } from "@/components/onboarding-screen";
import { MarketplaceScreen } from "@/components/marketplace-screen";
import { DonationScreen } from "@/components/donation-screen";
import { DashboardScreen } from "@/components/dashboard-screen";
import { TransactionsScreen } from "@/components/transactions-screen";

const Index = () => {
  const [activeScreen, setActiveScreen] = useState("onboarding");

  const renderScreen = () => {
    switch (activeScreen) {
      case "onboarding":
        return <OnboardingScreen />;
      case "marketplace":
        return <MarketplaceScreen />;
      case "donation":
        return <DonationScreen />;
      case "dashboard":
        return <DashboardScreen />;
      case "transactions":
        return <TransactionsScreen />;
      default:
        return <OnboardingScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderScreen()}
      <Navigation activeScreen={activeScreen} onScreenChange={setActiveScreen} />
    </div>
  );
};

export default Index;
