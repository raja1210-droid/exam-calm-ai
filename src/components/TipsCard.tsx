import { cn } from "@/lib/utils";
import { Lightbulb, BookOpen, Heart, Coffee, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Tip {
  id: string;
  category: "relaxation" | "study" | "wellness";
  title: string;
  description: string;
}

interface TipsCardProps {
  tips: Tip[];
  isLoading?: boolean;
  onRefresh: () => void;
}

const categoryConfig = {
  relaxation: {
    icon: Heart,
    bgClass: "bg-accent/10",
    iconClass: "text-accent",
  },
  study: {
    icon: BookOpen,
    bgClass: "bg-primary/10",
    iconClass: "text-primary",
  },
  wellness: {
    icon: Coffee,
    bgClass: "bg-mood-okay/10",
    iconClass: "text-mood-okay",
  },
};

export function TipsCard({ tips, isLoading, onRefresh }: TipsCardProps) {
  return (
    <div className="card-calm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg gradient-calm">
            <Lightbulb className="w-4 h-4 text-primary-foreground" />
          </div>
          <h3 className="font-display text-lg font-semibold text-foreground">
            AI Tips for You
          </h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onRefresh}
          disabled={isLoading}
          className="text-primary hover:text-primary hover:bg-primary/10"
        >
          <Sparkles className={cn("w-4 h-4 mr-1", isLoading && "animate-spin")} />
          Refresh
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-20 bg-secondary/50 rounded-xl" />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {tips.map((tip, index) => {
            const config = categoryConfig[tip.category];
            const Icon = config.icon;
            
            return (
              <div
                key={tip.id}
                className={cn(
                  "p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50",
                  "transition-all duration-300 hover:scale-[1.02]",
                  "opacity-0 animate-fade-in"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex gap-3">
                  <div className={cn("p-2 rounded-lg h-fit", config.bgClass)}>
                    <Icon className={cn("w-4 h-4", config.iconClass)} />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground text-sm">
                      {tip.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {tip.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
