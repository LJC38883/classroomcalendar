import React from 'react';
import { Calendar, MessageSquare, ShoppingBag, Trophy, Settings, Home, Sparkles } from 'lucide-react';

interface NavigationProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeView, setActiveView }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'chat', label: 'AI Coach', icon: MessageSquare },
    { id: 'shop', label: 'Shop', icon: ShoppingBag },
    { id: 'rewards', label: 'Rewards', icon: Trophy },
    { id: 'reflection', label: 'Reflection', icon: Sparkles },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#FF005C] border-t-4 border-black z-50">
      <div className="flex justify-around items-center h-20">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`
                flex flex-col items-center justify-center p-2 transition-all
                ${isActive 
                  ? 'bg-white text-black shadow-[inset_4px_4px_0_0_#000] scale-95' 
                  : 'text-white hover:bg-black/20'
                }
              `}
            >
              <Icon size={24} strokeWidth={3} />
              <span className="text-xs font-bold mt-1">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
