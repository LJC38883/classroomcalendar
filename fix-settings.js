const fs = require('fs');

// Read the current SettingsView.tsx  
let settingsContent = fs.readFileSync('src/components/SettingsView.tsx', 'utf8');

// Check if file is truncated
const lines = settingsContent.split('\n');
console.log('Total lines:', lines.length);
console.log('Last line:', lines[lines.length - 1]);

// Check for the specific truncation issue
if (lines.length < 100) {
  console.log('File is truncated, needs complete rewrite');
  
  // Write a minimal working version
  const minimalSettings = `import React, { useState } from 'react';
import { Settings, Bell, Bot, Clock, Volume2, Palette } from 'lucide-react';
import { useStore } from '../store/useStore';

export const SettingsView: React.FC = () => {
  const { userProfile, updateUserProfile } = useStore();
  const [settings, setSettings] = useState({
    defaultReminderMinutes: userProfile.defaultReminderMinutes,
    coachPersonality: userProfile.coachPersonality,
    soundEnabled: true,
    vibrationEnabled: true,
  });
  
  const handleSave = () => {
    updateUserProfile({
      defaultReminderMinutes: settings.defaultReminderMinutes,
      coachPersonality: settings.coachPersonality as any,
    });
  };
  
  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="bg-black text-white border-b-4 border-black p-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Settings size={32} strokeWidth={3} />
          SETTINGS
        </h1>
      </div>
      
      <div className="p-6 space-y-6">
        <div className="card-brutal">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Bell size={24} strokeWidth={3} />
            REMINDER SETTINGS
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="font-bold block mb-2">DEFAULT REMINDER TIME</label>
              <select
                value={settings.defaultReminderMinutes}
                onChange={(e) => setSettings({ ...settings, defaultReminderMinutes: Number(e.target.value) })}
                className="w-full p-3 border-4 border-black rounded-lg font-bold"
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

        <div className="card-brutal">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Bot size={24} strokeWidth={3} />
            AI COACH PERSONALITY
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="font-bold block mb-2">DEFAULT COACH</label>
              <select
                value={settings.coachPersonality}
                onChange={(e) => setSettings({ ...settings, coachPersonality: e.target.value as any })}
                className="w-full p-3 border-4 border-black rounded-lg font-bold"
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

        <button onClick={handleSave} className="w-full btn-brutal">
          SAVE SETTINGS
        </button>
      </div>
    </div>
  );
};`;

  fs.writeFileSync('src/components/SettingsView.tsx', minimalSettings);
  console.log('Wrote minimal working SettingsView.tsx');
}
