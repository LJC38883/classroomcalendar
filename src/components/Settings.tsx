import React, { useState } from 'react';
import { Settings as SettingsIcon, Bell, Volume2, Palette } from 'lucide-react';
import { useStore } from '../store/useStore';

export const Settings: React.FC = () => {
  const { userProfile, updateUserProfile } = useStore();
  const [reminderTime, setReminderTime] = useState(userProfile.defaultReminderMinutes);
  
  const handleSave = () => {
    updateUserProfile({
      defaultReminderMinutes: reminderTime,
    });
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white pb-24">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <SettingsIcon size={32} />
          Settings
        </h1>
      </div>
      
      <div className="p-6 space-y-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-200">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Bell size={24} />
            Reminder Settings
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="font-semibold block mb-2">Default Reminder Time</label>
              <select
                value={reminderTime}
                onChange={(e) => setReminderTime(Number(e.target.value))}
                className="w-full p-3 rounded-lg border border-purple-200 focus:outline-none focus:border-purple-500"
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
        
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-200">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Volume2 size={24} />
            Notifications
          </h2>
          
          <div className="space-y-3">
            <label className="flex items-center justify-between">
              <span className="font-medium">Sound</span>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </label>
            <label className="flex items-center justify-between">
              <span className="font-medium">Vibration</span>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </label>
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-200">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Palette size={24} />
            Theme
          </h2>
          
          <div className="grid grid-cols-3 gap-3">
            <button className="h-20 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-purple-600"></button>
            <button className="h-20 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 border-2 border-transparent"></button>
            <button className="h-20 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 border-2 border-transparent"></button>
          </div>
        </div>
        
        <button
          onClick={handleSave}
          className="w-full py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg hover:shadow-lg transition-shadow"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};
