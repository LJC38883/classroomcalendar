import React, { useState } from 'react';
import { Settings, Bell, Bot, Clock, Volume2, Palette, Save } from 'lucide-react';
import { useStore } from '../store/useStore';

export const SettingsView: React.FC = () => {
  const { userProfile, updateUserProfile } = useStore();
  const [defaultReminderMinutes, setDefaultReminderMinutes] = useState(userProfile.defaultReminderMinutes);
  const [coachPersonality, setCoachPersonality] = useState(userProfile.coachPersonality);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [theme, setTheme] = useState(userProfile.selectedTheme || 'default');
  const [saved, setSaved] = useState(false);
  
  const handleSave = () => {
    updateUserProfile({
      defaultReminderMinutes: defaultReminderMinutes,
      coachPersonality: coachPersonality as any,
      selectedTheme: theme,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };
  
  const personalities = [
    { value: 'fun', label: 'FUN & ENERGETIC', emoji: '🎉' },
    { value: 'cool', label: 'COOL & CASUAL', emoji: '😎' },
    { value: 'motivational', label: 'MOTIVATIONAL', emoji: '💪' },
    { value: 'serious', label: 'SERIOUS & FOCUSED', emoji: '📚' },
    { value: 'humble', label: 'HUMBLE & KIND', emoji: '🤗' },
  ];
  
  const reminderTimes = [
    { value: 5, label: '5 minutes' },
    { value: 10, label: '10 minutes' },
    { value: 15, label: '15 minutes' },
    { value: 30, label: '30 minutes' },
    { value: 45, label: '45 minutes' },
    { value: 60, label: '1 hour' },
  ];
  
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
                value={defaultReminderMinutes}
                onChange={(e) => setDefaultReminderMinutes(parseInt(e.target.value))}
                className="input-brutal"
              >
                {reminderTimes.map(time => (
                  <option key={time.value} value={time.value}>
                    {time.label} before class
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="flex items-center gap-3 font-bold">
                <input
                  type="checkbox"
                  checked={soundEnabled}
                  onChange={(e) => setSoundEnabled(e.target.checked)}
                  className="w-6 h-6 border-2 border-black"
                />
                <Volume2 size={20} strokeWidth={3} />
                NOTIFICATION SOUNDS
              </label>
            </div>
            
            <div>
              <label className="flex items-center gap-3 font-bold">
                <input
                  type="checkbox"
                  checked={vibrationEnabled}
                  onChange={(e) => setVibrationEnabled(e.target.checked)}
                  className="w-6 h-6 border-2 border-black"
                />
                VIBRATION ALERTS
              </label>
            </div>
          </div>
        </div>
        
        <div className="card-brutal">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Bot size={24} strokeWidth={3} />
            AI COACH PERSONALITY
          </h2>
          
          <div className="space-y-3">
            {personalities.map(personality => (
              <button
                key={personality.value}
                onClick={() => setCoachPersonality(personality.value as any)}
                className={`
                  w-full p-4 border-4 border-black text-left font-bold transition-all
                  ${coachPersonality === personality.value 
                    ? 'bg-[#00F0FF] shadow-[6px_6px_0_0_#000]' 
                    : 'bg-white hover:shadow-[3px_3px_0_0_#000]'
                  }
                `}
              >
                <span className="text-2xl mr-3">{personality.emoji}</span>
                {personality.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="card-brutal">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Palette size={24} strokeWidth={3} />
            APP THEME
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setTheme('default')}
              className={`
                p-4 border-4 border-black font-bold
                ${theme === 'default' 
                  ? 'bg-[#FF005C] text-white shadow-[4px_4px_0_0_#000]' 
                  : 'bg-white hover:shadow-[2px_2px_0_0_#000]'
                }
              `}
            >
              NEO-BRUTAL
            </button>
            
            {userProfile.purchasedItems.includes('theme-dark') && (
              <button
                onClick={() => setTheme('dark')}
                className={`
                  p-4 border-4 border-black font-bold
                  ${theme === 'dark' 
                    ? 'bg-black text-white shadow-[4px_4px_0_0_#666]' 
                    : 'bg-gray-800 text-white hover:shadow-[2px_2px_0_0_#666]'
                  }
                `}
              >
                DARK MODE
              </button>
            )}
            
            {userProfile.purchasedItems.includes('theme-pastel') && (
              <button
                onClick={() => setTheme('pastel')}
                className={`
                  p-4 border-4 border-black font-bold
                  ${theme === 'pastel' 
                    ? 'bg-pink-200 shadow-[4px_4px_0_0_#000]' 
                    : 'bg-pink-100 hover:shadow-[2px_2px_0_0_#000]'
                  }
                `}
              >
                PASTEL
              </button>
            )}
          </div>
        </div>
        
        <button
          onClick={handleSave}
          className="w-full btn-brutal-primary flex items-center justify-center gap-2"
        >
          <Save size={24} strokeWidth={3} />
          SAVE SETTINGS
        </button>
        
        {saved && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 card-brutal bg-[#00FF00] text-center p-6 z-50 shake">
            <p className="text-xl font-bold">SETTINGS SAVED! ✅</p>
          </div>
        )}
        
        <div className="card-brutal bg-gray-100">
          <h3 className="font-bold mb-2">ABOUT</h3>
          <p className="text-sm">
            Classroom Calendar v1.0.0<br />
            Your smart study partner that cares about your success and wellbeing.<br />
            Built with ❤️ for students everywhere.
          </p>
        </div>
      </div>
    </div>
  );
};
