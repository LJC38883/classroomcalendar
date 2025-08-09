import React from 'react';
import { Sparkles, Heart, Brain, Zap, Shield } from 'lucide-react';

const coachPersonalities = [
  { id: 'motivational', name: 'Motivator Max', icon: Zap, color: 'from-yellow-500 to-orange-500' },
  { id: 'empathetic', name: 'Empathy Emma', icon: Heart, color: 'from-pink-500 to-rose-500' },
  { id: 'analytical', name: 'Analyst Alex', icon: Brain, color: 'from-blue-500 to-indigo-500' },
  { id: 'creative', name: 'Creative Casey', icon: Sparkles, color: 'from-purple-500 to-pink-500' },
  { id: 'stoic', name: 'Stoic Sam', icon: Shield, color: 'from-gray-500 to-slate-600' },
];

interface CoachSelectorProps {
  selectedCoach: any;
  onSelectCoach: (coach: any) => void;
}

export const CoachSelector: React.FC<CoachSelectorProps> = ({ selectedCoach, onSelectCoach }) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {coachPersonalities.map((coach) => {
        const Icon = coach.icon;
        return (
          <button
            key={coach.id}
            onClick={() => onSelectCoach(coach)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
              selectedCoach.id === coach.id
                ? 'bg-white/20 backdrop-blur-sm scale-105'
                : 'bg-white/10 hover:bg-white/15'
            }`}
          >
            <Icon size={20} />
            <span className="whitespace-nowrap text-sm font-medium">{coach.name}</span>
          </button>
        );
      })}
    </div>
  );
};
