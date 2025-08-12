import React from 'react';
import { User, Bot, Brain, Heart, Target, Sparkles, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChatMessageProps {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  personality?: string;
}

export default function ChatMessage({ id, text, sender, timestamp, personality }: ChatMessageProps) {
  const getPersonalityIcon = () => {
    switch (personality) {
      case 'strategic': return Brain;
      case 'empathetic': return Heart;
      case 'challenging': return Target;
      case 'zen': return Sparkles;
      default: return Zap;
    }
  };

  const getPersonalityColor = () => {
    switch (personality) {
      case 'strategic': return 'text-blue-400';
      case 'empathetic': return 'text-pink-400';
      case 'challenging': return 'text-red-400';
      case 'zen': return 'text-purple-400';
      default: return 'text-yellow-400';
    }
  };

  const PersonalityIcon = getPersonalityIcon();
  const colorClass = getPersonalityColor();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`flex gap-3 ${sender === 'user' ? 'flex-row-reverse' : ''}`}
    >
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        sender === 'user' ? 'bg-purple-500' : 'bg-gradient-to-br from-purple-500 to-pink-500'
      }`}>
        {sender === 'user' ? (
          <User className="w-5 h-5 text-white" />
        ) : (
          <PersonalityIcon className={`w-5 h-5 ${colorClass}`} />
        )}
      </div>
      <div className={`flex-1 ${sender === 'user' ? 'text-right' : ''}`}>
        <div className={`inline-block p-4 rounded-2xl ${
          sender === 'user' 
            ? 'bg-purple-500/20 text-white' 
            : 'bg-white/10 text-gray-100'
        } max-w-[80%]`}>
          <p className="text-sm leading-relaxed">{text}</p>
          <p className="text-xs text-gray-400 mt-2">
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
