import React from 'react';
import { Settings, Bell, Moon, Volume2, User, Shield, HelpCircle, LogOut } from 'lucide-react';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export const SettingsView: React.FC = () => {
  const { userProfile, updateUserProfile } = useStore();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);
  const [soundEnabled, setSoundEnabled] = React.useState(true);

  const personalities = [
    { value: 'fun', label: 'Fun & Playful', emoji: '🎉' },
    { value: 'cool', label: 'Cool & Chill', emoji: '😎' },
    { value: 'motivational', label: 'Motivational', emoji: '💪' },
    { value: 'serious', label: 'Professional', emoji: '📚' },
    { value: 'humble', label: 'Humble & Kind', emoji: '🤗' },
  ];

  const handlePersonalityChange = (value: string) => {
    const personality = value as 'fun' | 'cool' | 'motivational' | 'serious' | 'humble';
    updateUserProfile({ coachPersonality: personality });
    toast.success(`AI Coach personality changed to ${personalities.find(p => p.value === value)?.label}!`);
  };

  const settingsSections = [
    {
      title: 'Preferences',
      items: [
        {
          icon: Bell,
          label: 'Notifications',
          description: 'Class reminders and updates',
          action: (
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={(e) => setNotificationsEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-600 peer-checked:to-pink-600"></div>
            </label>
          )
        },
        {
          icon: Moon,
          label: 'Dark Mode',
          description: 'Easier on the eyes at night',
          action: (
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={(e) => setDarkMode(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-600 peer-checked:to-pink-600"></div>
            </label>
          )
        },
        {
          icon: Volume2,
          label: 'Sound Effects',
          description: 'UI sounds and notifications',
          action: (
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={soundEnabled}
                onChange={(e) => setSoundEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-600 peer-checked:to-pink-600"></div>
            </label>
          )
        }
      ]
    }
  ];

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

      {/* AI Coach Personality */}
      <motion.div 
        className="glass-card p-6 mb-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-lg font-bold mb-4">AI Coach Personality</h2>
        <div className="space-y-2">
          {personalities.map((personality) => (
            <button
              key={personality.value}
              onClick={() => handlePersonalityChange(personality.value)}
              className={`w-full p-3 rounded-lg text-left transition-all flex items-center gap-3 ${
                userProfile.coachPersonality === personality.value
                  ? 'bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-300'
                  : 'bg-white hover:bg-slate-50'
              }`}
            >
              <span className="text-2xl">{personality.emoji}</span>
              <span className="font-medium">{personality.label}</span>
              {userProfile.coachPersonality === personality.value && (
                <span className="ml-auto text-purple-600 text-sm font-medium">Active</span>
              )}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Settings Sections */}
      {settingsSections.map((section, sectionIndex) => (
        <motion.div 
          key={section.title}
          className="glass-card p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + sectionIndex * 0.1 }}
        >
          <h2 className="text-lg font-bold mb-4">{section.title}</h2>
          <div className="space-y-4">
            {section.items.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Icon className="text-purple-600" size={20} />
                    </div>
                    <div>
                      <p className="font-medium">{item.label}</p>
                      <p className="text-sm text-slate-600">{item.description}</p>
                    </div>
                  </div>
                  {item.action}
                </div>
              );
            })}
          </div>
        </motion.div>
      ))}

      {/* Support Section */}
      <motion.div 
        className="glass-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-lg font-bold mb-4">Support</h2>
        <div className="space-y-3">
          <button className="w-full p-3 bg-white rounded-lg text-left flex items-center gap-3 hover:bg-slate-50 transition-colors">
            <HelpCircle className="text-slate-600" size={20} />
            <span>Help & FAQ</span>
          </button>
          <button className="w-full p-3 bg-white rounded-lg text-left flex items-center gap-3 hover:bg-slate-50 transition-colors">
            <Shield className="text-slate-600" size={20} />
            <span>Privacy Policy</span>
          </button>
          <button className="w-full p-3 bg-white rounded-lg text-left flex items-center gap-3 hover:bg-slate-50 transition-colors">
            <User className="text-slate-600" size={20} />
            <span>Account Settings</span>
          </button>
          <button className="w-full p-3 bg-red-50 rounded-lg text-left flex items-center gap-3 hover:bg-red-100 transition-colors text-red-600">
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
