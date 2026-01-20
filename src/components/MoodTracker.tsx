import { useState } from "react";
import { cn } from "@/lib/utils";

type Mood = "great" | "good" | "okay" | "tired" | "stressed";

interface MoodOption {
  id: Mood;
  emoji: string;
  label: string;
}

const moods: MoodOption[] = [
  { id: "great", emoji: "😊", label: "Great" },
  { id: "good", emoji: "🙂", label: "Good" },
  { id: "okay", emoji: "😐", label: "Okay" },
  { id: "tired", emoji: "😴", label: "Tired" },
  { id: "stressed", emoji: "😰", label: "Stressed" },
];

interface MoodTrackerProps {
  onMoodSelect: (mood: Mood) => void;
  selectedMood?: Mood;
}

export function MoodTracker({ onMoodSelect, selectedMood }: MoodTrackerProps) {
  return (
    <div className="card-calm">
      <h3 className="font-display text-lg font-semibold text-foreground mb-4">
        How are you feeling?
      </h3>
      <div className="flex justify-between gap-2">
        {moods.map((mood, index) => (
          <button
            key={mood.id}
            onClick={() => onMoodSelect(mood.id)}
            className={cn(
              "flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-300",
              "hover:scale-105 hover:shadow-soft",
              selectedMood === mood.id
                ? "bg-primary/10 ring-2 ring-primary scale-105"
                : "bg-secondary/50 hover:bg-secondary"
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <span className="text-3xl">{mood.emoji}</span>
            <span className={cn(
              "text-xs font-medium",
              selectedMood === mood.id ? "text-primary" : "text-muted-foreground"
            )}>
              {mood.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
