import { Header } from "@/components/Header";
import { MoodTracker } from "@/components/MoodTracker";
import { SleepLogger } from "@/components/SleepLogger";
import { StressIndicator } from "@/components/StressIndicator";
import { TipsCard } from "@/components/TipsCard";
import { ExamCountdown } from "@/components/ExamCountdown";
import { useStressData } from "@/hooks/useStressData";

const Index = () => {
  const {
    data,
    setMood,
    setSleep,
    setExam,
    stressAnalysis,
    tips,
    isLoadingTips,
    refreshTips,
  } = useStressData();

  return (
    <div className="min-h-screen gradient-hero">
      <div className="max-w-lg mx-auto pb-8">
        <Header />
        
        <main className="px-6 space-y-6">
          {/* Stress Level Overview */}
          <div className="opacity-0 animate-fade-in" style={{ animationDelay: "0ms" }}>
            <StressIndicator 
              level={stressAnalysis.level} 
              percentage={stressAnalysis.percentage} 
            />
          </div>

          {/* Exam Countdown */}
          <div className="opacity-0 animate-fade-in" style={{ animationDelay: "100ms" }}>
            <ExamCountdown
              daysUntilExam={data.daysUntilExam}
              examName={data.examName}
              onExamUpdate={setExam}
            />
          </div>

          {/* Mood Tracker */}
          <div className="opacity-0 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <MoodTracker 
              onMoodSelect={setMood} 
              selectedMood={data.mood} 
            />
          </div>

          {/* Sleep Logger */}
          <div className="opacity-0 animate-fade-in" style={{ animationDelay: "300ms" }}>
            <SleepLogger
              onSleepChange={setSleep}
              sleepHours={data.sleepHours}
              sleepQuality={data.sleepQuality}
            />
          </div>

          {/* AI Tips */}
          <div className="opacity-0 animate-fade-in" style={{ animationDelay: "400ms" }}>
            <TipsCard 
              tips={tips} 
              isLoading={isLoadingTips}
              onRefresh={refreshTips}
            />
          </div>

          {/* Footer */}
          <footer className="text-center py-6">
            <p className="text-xs text-muted-foreground">
              Take care of yourself. You've got this! 💪
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Index;
