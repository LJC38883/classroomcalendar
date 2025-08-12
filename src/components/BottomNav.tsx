import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, ShoppingBag, User, Settings, Calendar } from 'lucide-react';

interface BottomNavProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeView, setActiveView }) => {
  const navItems = [
    { 
      id: 'calendar', 
      icon: Calendar, 
      label: 'Calendar',
      color: 'from-amber-500 to-orange-600',
      shadowColor: 'rgba(251, 146, 60, 0.5)'
    },
    { 
      id: 'chat', 
      icon: MessageCircle, 
      label: 'Chat',
      color: 'from-slate-600 to-slate-700',
      shadowColor: 'rgba(71, 85, 105, 0.5)'
    },
    { 
      id: 'shop', 
      icon: ShoppingBag, 
      label: 'Shop',
      color: 'from-purple-500 to-purple-600',
      shadowColor: 'rgba(168, 85, 247, 0.5)'
    },
    { 
      id: 'profile', 
      icon: User, 
      label: 'Profile',
      color: 'from-pink-500 to-pink-600',
      shadowColor: 'rgba(236, 72, 153, 0.5)'
    },
    { 
      id: 'settings', 
      icon: Settings, 
      label: 'Settings',
      color: 'from-green-500 to-green-600',
      shadowColor: 'rgba(34, 197, 94, 0.5)'
    },
  ];

  return (
    <nav className="bottom-nav" role="navigation" aria-label="Main navigation">
      <div className="nav-container">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`nav-button ${isActive ? 'active' : ''}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Navigate to ${item.label}`}
              aria-current={isActive ? 'page' : undefined}
            >
              <motion.div
                className={`nav-button-bg bg-gradient-to-br ${item.color}`}
                initial={false}
                animate={{
                  scale: isActive ? 1 : 0.8,
                  opacity: isActive ? 1 : 0.6,
                }}
                transition={{ duration: 0.3 }}
                style={{
                  boxShadow: isActive ? `0 8px 25px ${item.shadowColor}` : 'none'
                }}
              />
              
              <motion.div
                className="nav-icon-wrapper"
                animate={{
                  y: isActive ? -2 : 0,
                }}
              >
                <Icon 
                  size={24} 
                  className="nav-icon"
                  strokeWidth={isActive ? 2.5 : 2}
                />
              </motion.div>
              
              <motion.span 
                className="nav-label"
                animate={{
                  opacity: isActive ? 1 : 0.7,
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                {item.label}
              </motion.span>
              
              {isActive && (
                <motion.div
                  className="active-indicator"
                  layoutId="activeIndicator"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
};
