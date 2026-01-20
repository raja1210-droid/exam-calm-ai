import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

interface SleepLoggerProps {
  onSleepChange: (hours: number, quality: number) => void;
  sleepHours?: number;
  sleepQuality?: number;
}

export function SleepLogger({ 
  onSleepChange, 
  sleepHours = 7, 
  sleepQuality = 3 
}: SleepLoggerProps) {
  const [hours, setHours] = useState(sleepHours);
  const [quality, setQuality] = useState(sleepQuality);

  const handleHoursChange = (value: number[]) => {
    setHours(value[0]);
    onSleepChange(value[0], quality);
  };

  const handleQualityChange = (value: number[]) => {
    setQuality(value[0]);
    onSleepChange(hours, value[0]);
  };

  const getQualityLabel = (q: number) => {
    if (q <= 1) return "Poor";
    if (q <= 2) return "Fair";
    if (q <= 3) return "Good";
    if (q <= 4) return "Great";
    return "Excellent";
  };

  const getQualityColor = (q: number) => {
    if (q <= 1) return "text-mood-stressed";
    if (q <= 2) return "text-mood-tired";
    if (q <= 3) return "text-mood-okay";
    if (q <= 4) return "text-mood-good";
    return "text-mood-great";
  };

  return (
    <div className="card-calm space-y-6">
      <h3 className="font-display text-lg font-semibold text-foreground">
        Sleep Tracker
      </h3>

      {/* Hours of Sleep */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Moon className="w-4 h-4" />
            <span className="text-sm font-medium">Hours of Sleep</span>
          </div>
          <span className="text-2xl font-display font-bold text-primary">
            {hours}h
          </span>
        </div>
        <Slider
          value={[hours]}
          onValueChange={handleHoursChange}
          max={12}
          min={0}
          step={0.5}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0h</span>
          <span>12h</span>
        </div>
      </div>

      {/* Sleep Quality */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Sun className="w-4 h-4" />
            <span className="text-sm font-medium">Sleep Quality</span>
          </div>
          <span className={cn("text-lg font-semibold", getQualityColor(quality))}>
            {getQualityLabel(quality)}
          </span>
        </div>
        <Slider
          value={[quality]}
          onValueChange={handleQualityChange}
          max={5}
          min={1}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Poor</span>
          <span>Excellent</span>
        </div>
      </div>
    </div>
  );
}
