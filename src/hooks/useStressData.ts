import { useState, useCallback, useMemo } from "react";

type Mood = "great" | "good" | "okay" | "tired" | "stressed";

interface StressData {
  mood?: Mood;
  sleepHours: number;
  sleepQuality: number;
  daysUntilExam: number;
  examName: string;
}

interface Tip {
  id: string;
  category: "relaxation" | "study" | "wellness";
  title: string;
  description: string;
}

const defaultTips: Tip[] = [
  {
    id: "1",
    category: "relaxation",
    title: "Try the 4-7-8 Breathing Technique",
    description: "Breathe in for 4 seconds, hold for 7, exhale for 8. This activates your body's relaxation response.",
  },
  {
    id: "2",
    category: "study",
    title: "Use the Pomodoro Technique",
    description: "Study for 25 minutes, then take a 5-minute break. This improves focus and retention.",
  },
  {
    id: "3",
    category: "wellness",
    title: "Stay Hydrated",
    description: "Drink water regularly. Dehydration can increase cortisol levels and worsen stress.",
  },
];

export function useStressData() {
  const [data, setData] = useState<StressData>({
    sleepHours: 7,
    sleepQuality: 3,
    daysUntilExam: 14,
    examName: "Final Exams",
  });
  
  const [tips, setTips] = useState<Tip[]>(defaultTips);
  const [isLoadingTips, setIsLoadingTips] = useState(false);

  const setMood = useCallback((mood: Mood) => {
    setData((prev) => ({ ...prev, mood }));
  }, []);

  const setSleep = useCallback((hours: number, quality: number) => {
    setData((prev) => ({ ...prev, sleepHours: hours, sleepQuality: quality }));
  }, []);

  const setExam = useCallback((name: string, days: number) => {
    setData((prev) => ({ ...prev, examName: name, daysUntilExam: days }));
  }, []);

  // Calculate stress level based on inputs
  const stressAnalysis = useMemo(() => {
    let score = 0;
    
    // Mood contribution (0-30 points)
    const moodScores: Record<Mood, number> = {
      great: 0,
      good: 5,
      okay: 15,
      tired: 20,
      stressed: 30,
    };
    score += moodScores[data.mood || "okay"];

    // Sleep contribution (0-40 points)
    // Less sleep = more stress
    if (data.sleepHours < 5) score += 30;
    else if (data.sleepHours < 6) score += 20;
    else if (data.sleepHours < 7) score += 10;
    
    // Poor quality adds stress
    score += (5 - data.sleepQuality) * 5;

    // Exam proximity contribution (0-30 points)
    if (data.daysUntilExam <= 2) score += 30;
    else if (data.daysUntilExam <= 5) score += 20;
    else if (data.daysUntilExam <= 10) score += 10;

    // Determine level
    let level: "low" | "medium" | "high";
    if (score < 30) level = "low";
    else if (score < 60) level = "medium";
    else level = "high";

    return {
      level,
      percentage: Math.min(score, 100),
    };
  }, [data]);

  const refreshTips = useCallback(async () => {
    setIsLoadingTips(true);
    
    // Simulate AI generating tips based on stress level
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    const stressLevel = stressAnalysis.level;
    
    const tipsByStress: Record<typeof stressLevel, Tip[]> = {
      low: [
        {
          id: "l1",
          category: "study",
          title: "Maintain Your Momentum",
          description: "You're doing well! Keep your study schedule consistent to stay ahead.",
        },
        {
          id: "l2",
          category: "wellness",
          title: "Enjoy a Reward",
          description: "Take time for something you enjoy. Balance is key to sustained success.",
        },
        {
          id: "l3",
          category: "relaxation",
          title: "Practice Gratitude",
          description: "Write down 3 things you're grateful for. This reinforces positive mental states.",
        },
      ],
      medium: [
        {
          id: "m1",
          category: "relaxation",
          title: "Take a 10-Minute Walk",
          description: "A short walk can reduce cortisol levels by up to 14% and clear your mind.",
        },
        {
          id: "m2",
          category: "study",
          title: "Prioritize Key Topics",
          description: "Focus on high-impact material first. Use the 80/20 rule for studying.",
        },
        {
          id: "m3",
          category: "wellness",
          title: "Limit Caffeine Intake",
          description: "Too much caffeine can increase anxiety. Switch to water or herbal tea.",
        },
      ],
      high: [
        {
          id: "h1",
          category: "relaxation",
          title: "Try Box Breathing Now",
          description: "Inhale 4s, hold 4s, exhale 4s, hold 4s. Repeat 4 times to calm your nervous system.",
        },
        {
          id: "h2",
          category: "wellness",
          title: "Prioritize Sleep Tonight",
          description: "Getting 7-8 hours can improve memory consolidation by up to 40%.",
        },
        {
          id: "h3",
          category: "study",
          title: "Break Tasks into Small Chunks",
          description: "Large tasks feel overwhelming. Break them into 15-minute focused sessions.",
        },
      ],
    };

    setTips(tipsByStress[stressLevel]);
    setIsLoadingTips(false);
  }, [stressAnalysis.level]);

  return {
    data,
    setMood,
    setSleep,
    setExam,
    stressAnalysis,
    tips,
    isLoadingTips,
    refreshTips,
  };
}
