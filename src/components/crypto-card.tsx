import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CryptoCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "glow" | "neon";
  hover?: boolean;
  onClick?: () => void;
}

export function CryptoCard({ 
  children, 
  className, 
  variant = "default",
  hover = true,
  onClick 
}: CryptoCardProps) {
  return (
    <Card
      className={cn(
        "glow-card p-6 transition-all duration-300",
        variant === "glow" && "shadow-glow animate-pulse-glow",
        variant === "neon" && "border-primary/30 shadow-neon",
        hover && "hover:scale-[1.02] hover:shadow-xl",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {children}
    </Card>
  );
}