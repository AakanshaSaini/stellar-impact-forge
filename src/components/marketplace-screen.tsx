import { useState } from "react";
import { Search, Filter, Shield, TrendingUp, MapPin, Users } from "lucide-react";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { CryptoCard } from "@/components/crypto-card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const categories = ["All", "Education", "Health", "Food", "Relief", "Environment"];

const ngos = [
  {
    id: 1,
    name: "Education First",
    cause: "Education",
    description: "Providing quality education to underserved communities",
    trustRating: 4.8,
    totalDonations: "$2.4M",
    verified: true,
    impact: "50,000 students helped",
    location: "Global",
    logo: "🎓"
  },
  {
    id: 2,
    name: "Clean Water Initiative",
    cause: "Health",
    description: "Building wells and water systems in rural areas",
    trustRating: 4.9,
    totalDonations: "$1.8M",
    verified: true,
    impact: "200 wells built",
    location: "Africa",
    logo: "💧"
  },
  {
    id: 3,
    name: "Forest Guardian",
    cause: "Environment",
    description: "Protecting forests and combating climate change",
    trustRating: 4.7,
    totalDonations: "$900K",
    verified: true,
    impact: "100K trees planted",
    location: "Amazon",
    logo: "🌳"
  },
  {
    id: 4,
    name: "Hunger Relief Network",
    cause: "Food",
    description: "Feeding families in crisis worldwide",
    trustRating: 4.6,
    totalDonations: "$3.1M",
    verified: true,
    impact: "1M meals served",
    location: "Global",
    logo: "🍽️"
  }
];

export function MarketplaceScreen() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNgos = ngos.filter(ngo => {
    const matchesCategory = selectedCategory === "All" || ngo.cause === selectedCategory;
    const matchesSearch = ngo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ngo.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background p-4 pt-16 md:pt-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gradient">Verified NGO Marketplace</h1>
          <p className="text-muted-foreground">Support trusted organizations making real impact</p>
        </div>

        {/* Search and Filter */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search NGOs by name or cause..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-input/50 border-border/50 rounded-2xl"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <EnhancedButton
                key={category}
                variant={selectedCategory === category ? "neon" : "ghost"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category}
              </EnhancedButton>
            ))}
          </div>
        </div>

        {/* NGO Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {filteredNgos.map((ngo) => (
            <CryptoCard key={ngo.id} className="space-y-4">
              {/* NGO Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{ngo.logo}</div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{ngo.name}</h3>
                      {ngo.verified && (
                        <Shield className="h-4 w-4 text-neon-green" />
                      )}
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {ngo.cause}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="h-4 w-4 text-neon-yellow" />
                    <span className="text-sm font-semibold">{ngo.trustRating}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Trust Score</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground">{ngo.description}</p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 rounded-xl bg-muted/30">
                  <div className="font-semibold text-neon-green">{ngo.totalDonations}</div>
                  <div className="text-xs text-muted-foreground">Total Raised</div>
                </div>
                <div className="text-center p-3 rounded-xl bg-muted/30">
                  <div className="font-semibold text-neon-purple">{ngo.impact}</div>
                  <div className="text-xs text-muted-foreground">Impact</div>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{ngo.location}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <EnhancedButton variant="neon" size="sm" className="flex-1">
                  Donate Now
                </EnhancedButton>
                <EnhancedButton variant="glass" size="sm">
                  <Users className="h-4 w-4" />
                </EnhancedButton>
              </div>
            </CryptoCard>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <EnhancedButton variant="ghost" size="lg">
            Load More NGOs
          </EnhancedButton>
        </div>
      </div>
    </div>
  );
}