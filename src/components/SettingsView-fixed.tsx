import React, { useState } from 'react';
import { Settings, Bell, Bot, Clock, Volume2, Palette } from 'lucide-react';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

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
    toast.success('Settings saved successfully!', { icon: '✅' });
  };
  
  return (
    <div className="min-h-screen pb-24 px-6 pt-8">
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold mb-2 gradient-text">Settings</h1>
        <p className="text-slate-600">Customize your experience</p>
      </motion.div>
      
      <motion.div 
        className="glass-card p-6 mb-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Bell size={20} className="text-purple-600" />
          Reminder Settings
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Default Reminder Time</label>
            <select
              value={settings.defaultReminderMinutes}
              onChange={(e) => setSettings({ ...settings, defaultReminderMinutes: Number(e.target.value) })}
              className="input-modern"
            >
              <option value={5}>5 minutes before</option>
              <option value={10}>10 minutes before</option>
              <option value={15}>15 minutes before</option>
              <option value={30}>30 minutes before</option>
              <option value={60}>1 hour before</option>
            </select>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="glass-card p-6 mb-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Bot size={20} className="text-purple-600" />
          AI Coach Personality
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Default Coach</label>
            <select
              value={settings.coachPersonality}
              onChange={(e) => setSettings({ ...settings, coachPersonality: e.target.value as any })}
              className="input-modern"
            >
              <option value="motivational">Motivator Max</option>
              <option value="empathetic">Empathy Emma</option>
              <option value="analytical">Analyst Alex</option>
              <option value="creative">Creative Casey</option>
              <option value="stoic">Stoic Sam</option>
            </select>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="glass-card p-6 mb-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Volume2 size={20} className="text-purple-600" />
          Sound & Notifications
        </h2>
        
        <div className="space-y-3">
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-sm">Sound Effects</span>
            <button
              type="button"
              onClick={() => setSettings({ ...settings, soundEnabled: !settings.soundEnabled })}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.soundEnabled ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-slate-300'
              }`}
            >
              <motion.div
                className="w-5 h-5 bg-white rounded-full shadow-md"
                animate={{ x: settings.soundEnabled ? 26 : 2 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
          </label>
          
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-sm">Vibration</span>
            <button
              type="button"
              onClick={() => setSettings({ ...settings, vibrationEnabled: !settings.vibrationEnabled })}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.vibrationEnabled ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-slate-300'
              }`}
            >
              <motion.div
                className="w-5 h-5 bg-white rounded-full shadow-md"
                animate={{ x: settings.vibrationEnabled ? 26 : 2 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
          </label>
        </div>
      </motion.div>

      <motion.div 
        className="glass-card p-6 mb-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Palette size={20} className="text-purple-600" />
          Appearance
        </h2>
        
        <div className="grid grid-cols-3 gap-3">
          <button className="p-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-medium">
            Default
          </button>
          <button className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-medium opacity-50">
            Ocean
          </button>
          <button className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-medium opacity-50">
            Forest
          </button>
        </div>
        <p className="text-xs text-slate-500 mt-3">Unlock more themes in the shop!</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <button onClick={handleSave} className="w-full btn-primary">
          Save Settings
        </button>
      </motion.div>
    </div>
  );
};
