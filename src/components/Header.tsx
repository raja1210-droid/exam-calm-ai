import { Brain, Calendar } from "lucide-react";

export function Header() {
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <header className="px-6 py-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl gradient-calm shadow-glow animate-breathe">
            <Brain className="w-7 h-7 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Stress Monitor
            </h1>
            <p className="text-sm text-muted-foreground">
              Your wellness companion
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground bg-secondary/50 px-4 py-2 rounded-xl">
          <Calendar className="w-4 h-4" />
          <span className="text-sm font-medium">{today}</span>
        </div>
      </div>
    </header>
  );
}
