import { useState } from "react";
import { Calendar, Clock, Edit2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ExamCountdownProps {
  daysUntilExam: number;
  examName: string;
  onExamUpdate: (name: string, days: number) => void;
}

export function ExamCountdown({ 
  daysUntilExam, 
  examName, 
  onExamUpdate 
}: ExamCountdownProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(examName);
  const [editDays, setEditDays] = useState(daysUntilExam.toString());

  const handleSave = () => {
    onExamUpdate(editName, parseInt(editDays) || 0);
    setIsEditing(false);
  };

  const getUrgencyStyle = () => {
    if (daysUntilExam <= 3) return "bg-stress-high/10 border-stress-high/30";
    if (daysUntilExam <= 7) return "bg-stress-medium/10 border-stress-medium/30";
    return "bg-primary/5 border-primary/20";
  };

  const getUrgencyText = () => {
    if (daysUntilExam <= 3) return "text-stress-high";
    if (daysUntilExam <= 7) return "text-stress-medium";
    return "text-primary";
  };

  return (
    <div className={cn(
      "card-calm border-2 transition-colors duration-300",
      getUrgencyStyle()
    )}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className={cn("w-5 h-5", getUrgencyText())} />
          <span className="text-sm font-medium text-muted-foreground">
            Exam Countdown
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="h-8 w-8"
        >
          {isEditing ? (
            <Check className="w-4 h-4 text-accent" />
          ) : (
            <Edit2 className="w-4 h-4 text-muted-foreground" />
          )}
        </Button>
      </div>

      {isEditing ? (
        <div className="space-y-3">
          <Input
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            placeholder="Exam name"
            className="bg-secondary/50"
          />
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={editDays}
              onChange={(e) => setEditDays(e.target.value)}
              className="w-20 bg-secondary/50"
              min={0}
            />
            <span className="text-sm text-muted-foreground">days until exam</span>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <div className={cn("text-5xl font-display font-bold mb-2", getUrgencyText())}>
            {daysUntilExam}
          </div>
          <div className="text-sm text-muted-foreground mb-1">
            days until
          </div>
          <div className="font-display font-semibold text-foreground">
            {examName}
          </div>
        </div>
      )}
    </div>
  );
}
