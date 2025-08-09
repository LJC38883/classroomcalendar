import React, { useState } from 'react';
import { Settings, User, Bell, Moon, Volume2, Shield, LogOut, Save } from 'lucide-react';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export const UserSettings: React.FC = () => {
  const { userProfile, updateUserProfile } = useStore();
  const [editedProfile, setEditedProfile] = useState(userProfile);
  const [notifications, setNotifications] = useState({
    classReminders: true,
    dailyCheckIn: true,
    motivationalQuotes: false,
    achievements: true,
  });

  const handleSave = () => {
    updateUserProfile(editedProfile);
    toast.success('Settings saved successfully!', { icon: '✅' });
  };

  return (
    <div className="min-h-screen pb-24 px-6 pt-8">
      {/* Header */}
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold mb-2 gradient-text">Settings</h1>
        <p className="text-slate-600">Customize your experience</p>
      </motion.div>

      {/* Profile Section */}
      <motion.div 
        className="glass-card p-6 mb-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <User className="text-purple-600" size={20} />
          <h2 className="text-lg font-bold">Profile</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={editedProfile.name}
              onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
              className="input-modern"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={editedProfile.email}
              onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
              className="input-modern"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Student ID</label>
            <input
              type="text"
              value={editedProfile.studentId}
              onChange={(e) => setEditedProfile({ ...editedProfile, studentId: e.target.value })}
              className="input-modern"
            />
          </div>
        </div>
      </motion.div>

      {/* Notifications */}
      <motion.div 
        className="glass-card p-6 mb-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Bell className="text-purple-600" size={20} />
          <h2 className="text-lg font-bold">Notifications</h2>
        </div>
        
        <div className="space-y-3">
          {Object.entries(notifications).map(([key, value]) => (
            <label key={key} className="flex items-center justify-between cursor-pointer">
              <span className="text-sm capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </span>
              <button
                onClick={() => setNotifications({ ...notifications, [key]: !value })}
                className={`w-12 h-6 rounded-full transition-colors ${
                  value ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-slate-300'
                }`}
              >
                <motion.div
                  className="w-5 h-5 bg-white rounded-full shadow-md"
                  animate={{ x: value ? 26 : 2 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </button>
            </label>
          ))}
        </div>
      </motion.div>

      {/* Reminder Settings */}
      <motion.div 
        className="glass-card p-6 mb-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Bell className="text-purple-600" size={20} />
          <h2 className="text-lg font-bold">Default Reminder</h2>
        </div>
        
        <select
          value={editedProfile.defaultReminderMinutes}
          onChange={(e) => setEditedProfile({ ...editedProfile, defaultReminderMinutes: Number(e.target.value) })}
          className="input-modern"
        >
          <option value={5}>5 minutes before</option>
          <option value={10}>10 minutes before</option>
          <option value={15}>15 minutes before</option>
          <option value={30}>30 minutes before</option>
          <option value={60}>1 hour before</option>
        </select>
      </motion.div>

      {/* Action Buttons */}
      <motion.div 
        className="space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <button onClick={handleSave} className="w-full btn-primary">
          <Save size={20} />
          Save Changes
        </button>
        
        <button className="w-full btn-secondary">
          <LogOut size={20} />
          Sign Out
        </button>
      </motion.div>
    </div>
  );
};
