import { useState } from "react";
import { Search, Filter, ExternalLink, CheckCircle, Clock, Calendar } from "lucide-react";
import { CryptoCard } from "@/components/crypto-card";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const transactions = [
  {
    id: "0x1a2b3c4d",
    ngo: "Education First",
    ngoLogo: "🎓",
    amount: 100,
    currency: "XLM",
    usdValue: 1200,
    status: "confirmed",
    timestamp: "2024-01-15T10:30:00Z",
    blockchainId: "stellar:1234567890abcdef",
    nftMinted: true,
    impact: "Funded 2 students for 1 month"
  },
  {
    id: "0x2b3c4d5e",
    ngo: "Clean Water Initiative", 
    ngoLogo: "💧",
    amount: 25,
    currency: "XLM",
    usdValue: 300,
    status: "confirmed",
    timestamp: "2024-01-14T15:45:00Z",
    blockchainId: "stellar:abcdef1234567890",
    nftMinted: true,
    impact: "Contributed to 1 well construction"
  },
  {
    id: "0x3c4d5e6f",
    ngo: "Forest Guardian",
    ngoLogo: "🌳",
    amount: 75,
    currency: "XLM", 
    usdValue: 900,
    status: "pending",
    timestamp: "2024-01-14T09:20:00Z",
    blockchainId: "stellar:1234567890fedcba",
    nftMinted: false,
    impact: "Will plant 50 trees"
  },
  {
    id: "0x4d5e6f7g",
    ngo: "Hunger Relief Network",
    ngoLogo: "🍽️",
    amount: 50,
    currency: "XLM",
    usdValue: 600,
    status: "confirmed",
    timestamp: "2024-01-13T12:15:00Z",
    blockchainId: "stellar:fedcba0987654321",
    nftMinted: true,
    impact: "Provided 100 meals"
  }
];

const filterOptions = ["All", "Confirmed", "Pending", "Recent", "Largest"];

export function TransactionsScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.ngo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tx.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === "All" || 
                         (selectedFilter === "Confirmed" && tx.status === "confirmed") ||
                         (selectedFilter === "Pending" && tx.status === "pending") ||
                         (selectedFilter === "Recent" && true) ||
                         (selectedFilter === "Largest" && tx.usdValue >= 900);
    return matchesSearch && matchesFilter;
  });

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-4 w-4 text-neon-green" />;
      case "pending":
        return <Clock className="h-4 w-4 text-neon-yellow animate-pulse" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 pt-16 md:pt-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gradient">Transaction History</h1>
          <p className="text-muted-foreground">Complete transparency on the blockchain</p>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by NGO or transaction ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-input/50 border-border/50 rounded-2xl"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {filterOptions.map((filter) => (
              <EnhancedButton
                key={filter}
                variant={selectedFilter === filter ? "neon" : "ghost"}
                size="sm"
                onClick={() => setSelectedFilter(filter)}
                className="rounded-full"
              >
                {filter}
              </EnhancedButton>
            ))}
          </div>
        </div>

        {/* Transaction Summary */}
        <div className="grid grid-cols-3 gap-4">
          <CryptoCard className="text-center">
            <div className="text-2xl font-bold text-neon-green">
              ${transactions.reduce((sum, tx) => sum + tx.usdValue, 0).toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">Total Donated</div>
          </CryptoCard>
          <CryptoCard className="text-center">
            <div className="text-2xl font-bold text-neon-purple">{transactions.length}</div>
            <div className="text-xs text-muted-foreground">Transactions</div>
          </CryptoCard>
          <CryptoCard className="text-center">
            <div className="text-2xl font-bold text-neon-yellow">
              {transactions.filter(tx => tx.nftMinted).length}
            </div>
            <div className="text-xs text-muted-foreground">NFTs Minted</div>
          </CryptoCard>
        </div>

        {/* Transactions List */}
        <div className="space-y-4">
          {filteredTransactions.map((tx) => (
            <CryptoCard key={tx.id} className="space-y-4">
              {/* Transaction Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{tx.ngoLogo}</div>
                  <div>
                    <h3 className="font-semibold">{tx.ngo}</h3>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(tx.status)}
                      <span className="text-sm capitalize">{tx.status}</span>
                      {tx.nftMinted && (
                        <Badge variant="secondary" className="text-xs">
                          NFT Minted
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-neon-green">
                    ${tx.usdValue.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {tx.amount} {tx.currency}
                  </div>
                </div>
              </div>

              {/* Impact Statement */}
              <div className="p-3 bg-muted/30 rounded-xl">
                <h4 className="text-sm font-medium mb-1">Impact Generated</h4>
                <p className="text-sm text-muted-foreground">{tx.impact}</p>
              </div>

              {/* Transaction Details */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Transaction ID</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono">{tx.id}</span>
                    <EnhancedButton variant="ghost" size="sm" className="p-1">
                      <ExternalLink className="h-3 w-3" />
                    </EnhancedButton>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Blockchain ID</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs">{tx.blockchainId.slice(0, 20)}...</span>
                    <EnhancedButton variant="ghost" size="sm" className="p-1">
                      <ExternalLink className="h-3 w-3" />
                    </EnhancedButton>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Date & Time</span>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(tx.timestamp)}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <EnhancedButton variant="glass" size="sm" className="flex-1">
                  View on Explorer
                </EnhancedButton>
                {tx.nftMinted && (
                  <EnhancedButton variant="gradient" size="sm" className="flex-1">
                    View NFT
                  </EnhancedButton>
                )}
              </div>
            </CryptoCard>
          ))}
        </div>

        {/* Load More */}
        {filteredTransactions.length > 0 && (
          <div className="text-center">
            <EnhancedButton variant="ghost" size="lg">
              Load More Transactions
            </EnhancedButton>
          </div>
        )}

        {/* Empty State */}
        {filteredTransactions.length === 0 && (
          <CryptoCard className="text-center py-8">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="font-semibold mb-2">No Transactions Found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </CryptoCard>
        )}
      </div>
    </div>
  );
}