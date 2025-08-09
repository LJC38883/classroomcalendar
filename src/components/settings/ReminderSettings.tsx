import React from 'react';
import { Bell } from 'lucide-react';

interface ReminderSettingsProps {
  value: number;
  onChange: (value: number) => void;
}

export const ReminderSettings: React.FC<ReminderSettingsProps> = ({ value, onChange }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
        <Bell size={24} />
        Reminder Settings
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="font-semibold block mb-2 text-gray-700">Default Reminder Time</label>
          <select
            value={value}
            onChange={(e) => onChange(parseInt(e.target.value))}
            className="w-full px-4 py-3 bg-white/50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value={5}>5 minutes before</option>
            <option value={10}>10 minutes before</option>
            <option value={15}>15 minutes before</option>
            <option value={30}>30 minutes before</option>
            <option value={60}>1 hour before</option>
          </select>
        </div>
      </div>
    </div>
  );
};
