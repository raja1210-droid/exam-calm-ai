import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle, AlertTriangle } from "lucide-react";

interface StressIndicatorProps {
  level: "low" | "medium" | "high";
  percentage: number;
}

export function StressIndicator({ level, percentage }: StressIndicatorProps) {
  const config = {
    low: {
      label: "Low Stress",
      description: "You're doing great! Keep up the good work.",
      icon: CheckCircle,
      colorClass: "text-stress-low",
      bgClass: "bg-stress-low/10",
      barClass: "bg-stress-low",
    },
    medium: {
      label: "Moderate Stress",
      description: "Consider taking a short break to recharge.",
      icon: AlertTriangle,
      colorClass: "text-stress-medium",
      bgClass: "bg-stress-medium/10",
      barClass: "bg-stress-medium",
    },
    high: {
      label: "High Stress",
      description: "It's important to prioritize self-care right now.",
      icon: AlertCircle,
      colorClass: "text-stress-high",
      bgClass: "bg-stress-high/10",
      barClass: "bg-stress-high",
    },
  };

  const { label, description, icon: Icon, colorClass, bgClass, barClass } = config[level];

  return (
    <div className="card-calm">
      <div className="flex items-start gap-4">
        <div className={cn("p-3 rounded-xl", bgClass)}>
          <Icon className={cn("w-6 h-6", colorClass)} />
        </div>
        <div className="flex-1 space-y-3">
          <div>
            <h3 className={cn("font-display text-lg font-semibold", colorClass)}>
              {label}
            </h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          
          {/* Stress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Stress Level</span>
              <span className={cn("font-semibold", colorClass)}>{percentage}%</span>
            </div>
            <div className="h-3 bg-secondary rounded-full overflow-hidden">
              <div
                className={cn("h-full rounded-full transition-all duration-700 ease-out", barClass)}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
