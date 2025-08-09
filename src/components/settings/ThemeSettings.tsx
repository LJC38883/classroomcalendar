import React from 'react';
import { Palette, Check } from 'lucide-react';

interface ThemeSettingsProps {
  value: string;
  onChange: (value: string) => void;
}

const themes = [
  { id: 'gradient', name: 'Gradient', colors: 'from-purple-600 to-pink-600' },
  { id: 'ocean', name: 'Ocean', colors: 'from-blue-600 to-teal-600' },
  { id: 'sunset', name: 'Sunset', colors: 'from-orange-600 to-red-600' },
  { id: 'forest', name: 'Forest', colors: 'from-green-600 to-emerald-600' },
];

export const ThemeSettings: React.FC<ThemeSettingsProps> = ({ value, onChange }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
        <Palette size={24} />
        Theme
      </h2>
      
      <div className="grid grid-cols-2 gap-3">
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => onChange(theme.id)}
            className={`relative p-4 rounded-xl border-2 transition-all ${
              value === theme.id
                ? 'border-purple-500 shadow-lg scale-105'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <div className={`h-8 w-full rounded-lg bg-gradient-to-r ${theme.colors} mb-2`} />
            <span className="text-sm font-medium text-gray-700">{theme.name}</span>
            {value === theme.id && (
              <Check size={16} className="absolute top-2 right-2 text-purple-600" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
