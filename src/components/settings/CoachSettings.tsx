import React from 'react';
import { Bot } from 'lucide-react';

interface CoachSettingsProps {
  value: string;
  onChange: (value: string) => void;
}

export const CoachSettings: React.FC<CoachSettingsProps> = ({ value, onChange }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
        <Bot size={24} />
        AI Coach Personality
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="font-semibold block mb-2 text-gray-700">Default Coach</label>
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-4 py-3 bg-white/50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="motivational">Motivator Max</option>
            <option value="empathetic">Empathy Emma</option>
            <option value="analytical">Analyst Alex</option>
            <option value="creative">Creative Casey</option>
            <option value="stoic">Stoic Sam</option>
          </select>
        </div>
      </div>
    </div>
  );
};
