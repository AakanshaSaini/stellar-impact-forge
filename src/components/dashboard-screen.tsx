import { useState } from "react";
import { TrendingUp, Award, DollarSign, Users, Calendar, Star, Trophy } from "lucide-react";
import { CryptoCard } from "@/components/crypto-card";
import { EnhancedButton } from "@/components/ui/enhanced-button";

const mockUser = {
  name: "Alex Johnson",
  avatar: "👨‍💻",
  totalDonated: 2450.50,
  nftCount: 8,
  impactScore: 94,
  level: "Gold Donor"
};

const nftCollection = [
  { id: 1, name: "Education Hero", ngo: "Education First", amount: 100, date: "2024-01-15", rarity: "Epic", color: "from-neon-purple to-neon-blue" },
  { id: 2, name: "Water Guardian", ngo: "Clean Water Initiative", amount: 250, date: "2024-01-10", rarity: "Rare", color: "from-neon-blue to-neon-green" },
  { id: 3, name: "Forest Protector", ngo: "Forest Guardian", amount: 75, date: "2024-01-08", rarity: "Common", color: "from-neon-green to-neon-yellow" },
  { id: 4, name: "Hunger Fighter", ngo: "Hunger Relief", amount: 200, date: "2024-01-05", rarity: "Rare", color: "from-neon-yellow to-neon-purple" }
];

const donationHistory = [
  { month: "Jan", amount: 800 },
  { month: "Feb", amount: 650 },
  { month: "Mar", amount: 1000 },
  { month: "Apr", amount: 0 }
];

export function DashboardScreen() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background p-4 pt-16 md:pt-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Header */}
        <CryptoCard variant="glow" className="text-center">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="text-6xl">{mockUser.avatar}</div>
            <div>
              <h2 className="text-2xl font-bold">{mockUser.name}</h2>
              <div className="flex items-center space-x-2">
                <Trophy className="h-4 w-4 text-neon-yellow" />
                <span className="text-neon-yellow font-medium">{mockUser.level}</span>
              </div>
            </div>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-neon-green">${mockUser.totalDonated.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Total Donated</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-neon-purple">{mockUser.nftCount}</div>
              <div className="text-xs text-muted-foreground">NFTs Earned</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-neon-yellow">{mockUser.impactScore}</div>
              <div className="text-xs text-muted-foreground">Impact Score</div>
            </div>
          </div>
        </CryptoCard>

        {/* Tab Navigation */}
        <div className="flex rounded-2xl bg-muted p-1">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all ${
              activeTab === "overview" 
                ? "bg-background shadow-sm text-foreground" 
                : "text-muted-foreground"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("nfts")}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all ${
              activeTab === "nfts" 
                ? "bg-background shadow-sm text-foreground" 
                : "text-muted-foreground"
            }`}
          >
            NFT Collection
          </button>
        </div>

        {activeTab === "overview" && (
          <>
            {/* Donation Chart */}
            <CryptoCard className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Donation History</h3>
                <TrendingUp className="h-5 w-5 text-neon-green" />
              </div>
              <div className="h-40 flex items-end justify-between space-x-2">
                {donationHistory.map((data, index) => (
                  <div key={data.month} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-gradient-primary rounded-t-lg transition-all duration-500"
                      style={{ height: `${(data.amount / 1000) * 100}%` }}
                    />
                    <div className="mt-2 text-xs text-muted-foreground">{data.month}</div>
                  </div>
                ))}
              </div>
            </CryptoCard>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <CryptoCard className="text-center space-y-3">
                <DollarSign className="h-8 w-8 mx-auto text-neon-green" />
                <h4 className="font-semibold">Quick Donate</h4>
                <EnhancedButton variant="neon" size="sm" className="w-full">
                  Donate Now
                </EnhancedButton>
              </CryptoCard>
              
              <CryptoCard className="text-center space-y-3">
                <Users className="h-8 w-8 mx-auto text-neon-purple" />
                <h4 className="font-semibold">Invite Friends</h4>
                <EnhancedButton variant="gradient" size="sm" className="w-full">
                  Share App
                </EnhancedButton>
              </CryptoCard>
            </div>
          </>
        )}

        {activeTab === "nfts" && (
          <>
            {/* NFT Collection */}
            <div className="grid gap-4 md:grid-cols-2">
              {nftCollection.map((nft) => (
                <CryptoCard key={nft.id} variant="glow" className="space-y-3">
                  {/* NFT Visual */}
                  <div className={`h-32 rounded-xl bg-gradient-to-br ${nft.color} flex items-center justify-center relative overflow-hidden`}>
                    <div className="text-4xl opacity-80">🏆</div>
                    <div className="absolute top-2 right-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        nft.rarity === "Epic" ? "bg-neon-purple/20 text-neon-purple" :
                        nft.rarity === "Rare" ? "bg-neon-blue/20 text-neon-blue" :
                        "bg-neon-green/20 text-neon-green"
                      }`}>
                        {nft.rarity}
                      </span>
                    </div>
                  </div>
                  
                  {/* NFT Info */}
                  <div>
                    <h4 className="font-semibold">{nft.name}</h4>
                    <p className="text-sm text-muted-foreground">{nft.ngo}</p>
                  </div>
                  
                  {/* NFT Stats */}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Donated</span>
                    <span className="font-medium text-neon-green">${nft.amount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Date</span>
                    <span className="font-medium">{nft.date}</span>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex space-x-2">
                    <EnhancedButton variant="glass" size="sm" className="flex-1">
                      <Star className="h-4 w-4 mr-1" />
                      Share
                    </EnhancedButton>
                    <EnhancedButton variant="ghost" size="sm">
                      <Award className="h-4 w-4" />
                    </EnhancedButton>
                  </div>
                </CryptoCard>
              ))}
            </div>
          </>
        )}

        {/* Achievement Banner */}
        <CryptoCard variant="neon" className="text-center">
          <Calendar className="h-8 w-8 mx-auto mb-2 text-neon-yellow animate-pulse" />
          <h4 className="font-semibold mb-1">30-Day Challenge</h4>
          <p className="text-sm text-muted-foreground mb-3">
            Donate to 5 different causes this month
          </p>
          <div className="w-full bg-muted rounded-full h-2 mb-2">
            <div className="bg-gradient-primary h-2 rounded-full w-3/5 transition-all duration-500"></div>
          </div>
          <p className="text-xs text-muted-foreground">3 of 5 completed</p>
        </CryptoCard>
      </div>
    </div>
  );
}