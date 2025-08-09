const fs = require('fs');

// Complete ChatView.tsx content
const chatViewContent = `import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Heart, Brain, Zap, Shield } from 'lucide-react';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { getAIResponse } from '../utils/aiCoach';
import toast from 'react-hot-toast';

const coachPersonalities = [
  { id: 'motivational', name: 'Motivator Max', icon: Zap, color: 'from-yellow-500 to-orange-500' },
  { id: 'empathetic', name: 'Empathy Emma', icon: Heart, color: 'from-pink-500 to-rose-500' },
  { id: 'analytical', name: 'Analyst Alex', icon: Brain, color: 'from-blue-500 to-indigo-500' },
  { id: 'creative', name: 'Creative Casey', icon: Sparkles, color: 'from-purple-500 to-pink-500' },
  { id: 'stoic', name: 'Stoic Sam', icon: Shield, color: 'from-gray-500 to-slate-600' },
];

export const ChatView: React.FC = () => {
  const { chatMessages, addChatMessage, userProfile, updateUserProfile } = useStore();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [selectedCoach, setSelectedCoach] = useState(coachPersonalities[0]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: input,
      sender: 'user' as const,
      timestamp: new Date(),
      personality: selectedCoach.id as any,
    };

    addChatMessage(userMessage);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = getAIResponse(input, selectedCoach.id as any, userProfile);
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'ai' as const,
        timestamp: new Date(),
        personality: selectedCoach.id as any,
      };
      addChatMessage(aiMessage);
      setIsTyping(false);
      
      updateUserProfile({ coins: userProfile.coins + 1 });
      toast.success('+1 coin for engaging with your coach!');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white pb-24">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
        <h1 className="text-3xl font-bold mb-4">AI Coach</h1>
        
        <div className="flex gap-2 overflow-x-auto pb-2">
          {coachPersonalities.map((coach) => {
            const Icon = coach.icon;
            return (
              <button
                key={coach.id}
                onClick={() => setSelectedCoach(coach)}
                className={\`flex items-center gap-2 px-4 py-2 rounded-full transition-all \${
                  selectedCoach.id === coach.id
                    ? 'bg-white/20 backdrop-blur-sm scale-105'
                    : 'bg-white/10 hover:bg-white/15'
                }\`}
              >
                <Icon size={20} />
                <span className="whitespace-nowrap text-sm font-medium">{coach.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        <AnimatePresence>
          {chatMessages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={\`flex \${message.sender === 'user' ? 'justify-end' : 'justify-start'}\`}
            >
              <div
                className={\`max-w-[80%] p-4 rounded-2xl \${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'bg-white/80 backdrop-blur-sm border border-purple-200'
                }\`}
              >
                <div className="flex items-start gap-3">
                  {message.sender === 'ai' && (
                    <div className={\`p-2 rounded-full bg-gradient-to-r \${selectedCoach.color}\`}>
                      <Bot size={20} className="text-white" />
                    </div>
                  )}
                  <div>
                    <p className={\`text-sm \${message.sender === 'user' ? 'text-white' : 'text-gray-900'}\`}>
                      {message.text}
                    </p>
                    <p className={\`text-xs mt-2 \${message.sender === 'user' ? 'text-white/70' : 'text-gray-500'}\`}>
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                  {message.sender === 'user' && (
                    <User size={20} className="text-white" />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-white/80 backdrop-blur-sm border border-purple-200 p-4 rounded-2xl">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="fixed bottom-20 left-0 right-0 p-4 bg-gradient-to-t from-white to-transparent">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={\`Ask \${selectedCoach.name} anything...\`}
            className="flex-1 px-4 py-3 rounded-full bg-white/90 backdrop-blur-sm border-2 border-purple-300 focus:border-purple-500 focus:outline-none"
          />
          <button
            onClick={handleSend}
            className="p-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:scale-105 transition-transform"
          >
            <Send size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};`;

// Complete SettingsView.tsx content
const settingsViewContent = `import React, { useState } from 'react';
import { Settings, Bell, Bot, Clock, Volume2, Palette } from 'lucide-react';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';

export const SettingsView: React.FC = () => {
  const { userProfile, updateUserProfile } = useStore();
  const [settings, setSettings] = useState({
    defaultReminderMinutes: userProfile.defaultReminderMinutes,
    coachPersonality: userProfile.coachPersonality,
    soundEnabled: true,
    vibrationEnabled: true,
    theme: 'gradient',
  });
  
  const handleSave = () => {
    updateUserProfile({
      defaultReminderMinutes: settings.defaultReminderMinutes,
      coachPersonality: settings.coachPersonality as any,
    });
    toast.success('Settings saved successfully!');
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white pb-24">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Settings size={32} />
          Settings
        </h1>
      </div>
      
      <div className="p-6 space-y-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-200">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-purple-800">
            <Bell size={24} />
            Reminder Settings
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="font-semibold block mb-2 text-gray-700">Default Reminder Time</label>
              <select
                value={settings.defaultReminderMinutes}
                onChange={(e) => setSettings({ ...settings, defaultReminderMinutes: parseInt(e.target.value) })}
                className="w-full px-4 py-2 rounded-lg border-2 border-purple-300 focus:border-purple-500 focus:outline-none bg-white/90"
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
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-purple-800">
            <Bot size={24} />
            AI Coach Personality
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="font-semibold block mb-2 text-gray-700">Default Coach</label>
              <select
                value={settings.coachPersonality}
                onChange={(e) => setSettings({ ...settings, coachPersonality: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border-2 border-purple-300 focus:border-purple-500 focus:outline-none bg-white/90"
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

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-200">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-purple-800">
            <Volume2 size={24} />
            Sound & Notifications
          </h2>
          
          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <span className="font-semibold text-gray-700">Sound Effects</span>
              <input
                type="checkbox"
                checked={settings.soundEnabled}
                onChange={(e) => setSettings({ ...settings, soundEnabled: e.target.checked })}
                className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
              />
            </label>
            
            <label className="flex items-center justify-between">
              <span className="font-semibold text-gray-700">Vibration</span>
              <input
                type="checkbox"
                checked={settings.vibrationEnabled}
                onChange={(e) => setSettings({ ...settings, vibrationEnabled: e.target.checked })}
                className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
              />
            </label>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-200">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-purple-800">
            <Palette size={24} />
            Theme
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="font-semibold block mb-2 text-gray-700">App Theme</label>
              <select
                value={settings.theme}
                onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border-2 border-purple-300 focus:border-purple-500 focus:outline-none bg-white/90"
              >
                <option value="gradient">Gradient (Default)</option>
                <option value="dark">Dark Mode</option>
                <option value="light">Light Mode</option>
                <option value="ocean">Ocean Blue</option>
                <option value="sunset">Sunset Orange</option>
              </select>
            </div>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl hover:scale-105 transition-transform shadow-lg"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};`;

// Write the files
fs.writeFileSync('src/components/ChatView.tsx', chatViewContent);
console.log('✅ Fixed ChatView.tsx');

fs.writeFileSync('src/components/SettingsView.tsx', settingsViewContent);
console.log('✅ Fixed SettingsView.tsx');

console.log('All files fixed successfully!');
