import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MessageCircle, ShoppingBag, User, Settings } from 'lucide-react';

interface BottomNavProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeView, setActiveView }) => {
  const navItems = [
    { id: 'calendar', icon: Calendar, label: 'Calendar' },
    { id: 'chat', icon: MessageCircle, label: 'Chat' },
    { id: 'shop', icon: ShoppingBag, label: 'Shop' },
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-slate-200">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className="flex flex-col items-center justify-center p-2 relative"
            >
              {isActive && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl"
                  layoutId="nav-indicator"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <Icon 
                size={24} 
                className={`relative z-10 ${isActive ? 'text-purple-600' : 'text-slate-400'}`} 
              />
              <span className={`text-xs mt-1 relative z-10 ${isActive ? 'text-purple-600 font-medium' : 'text-slate-400'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
