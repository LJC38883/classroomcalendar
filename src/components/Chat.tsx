import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Heart, Brain, Target, Zap } from 'lucide-react';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { coachResponses } from '../constants/coachResponses';
import ChatMessage from './ChatMessage';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  personality?: string;
}

export default function Chat() {
  const { userProfile, updateUserProfile } = useStore();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hi ${userProfile.name || 'there'}! I am your AI study coach. How can I help you today?`,
      sender: 'bot',
      timestamp: new Date(),
      personality: 'motivational'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [currentPersonality, setCurrentPersonality] = useState<keyof typeof coachResponses>('motivational');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getRandomResponse = (personality: keyof typeof coachResponses) => {
    const responses = coachResponses[personality];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const analyzeMessage = (text: string): keyof typeof coachResponses => {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('stress') || lowerText.includes('overwhelm') || lowerText.includes('tired')) {
      return 'empathetic';
    }
    if (lowerText.includes('plan') || lowerText.includes('strategy') || lowerText.includes('how')) {
      return 'strategic';
    }
    if (lowerText.includes('lazy') || lowerText.includes('procrastinat') || lowerText.includes('cant')) {
      return 'challenging';
    }
    if (lowerText.includes('calm') || lowerText.includes('peace') || lowerText.includes('relax')) {
      return 'zen';
    }
    return 'motivational';
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const personality = analyzeMessage(input);
    setCurrentPersonality(personality);

    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getRandomResponse(personality),
        sender: 'bot',
        timestamp: new Date(),
        personality
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);

      if (input.length > 20) {
        const newCoins = userProfile.coins + 1;
        updateUserProfile({ coins: newCoins });
        toast.success('+1 coin for engaging with your coach!');
      }
    }, 1500);
  };

  const quickTips = [
    { icon: Brain, text: 'Study Tips', personality: 'strategic' as const },
    { icon: Heart, text: 'Need Support', personality: 'empathetic' as const },
    { icon: Zap, text: 'Motivate Me', personality: 'motivational' as const },
    { icon: Target, text: 'Challenge Me', personality: 'challenging' as const }
  ];

  const sendQuickTip = (personality: keyof typeof coachResponses, text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getRandomResponse(personality),
        sender: 'bot',
        timestamp: new Date(),
        personality
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <ChatMessage key={message.id} {...message} />
          ))}
        </AnimatePresence>
        
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="bg-white/10 rounded-2xl p-4">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 space-y-3">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {quickTips.map((tip) => (
            <button
              key={tip.text}
              onClick={() => sendQuickTip(tip.personality, tip.text)}
              className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full text-sm whitespace-nowrap hover:bg-white/20 transition-colors"
            >
              <tip.icon className="w-4 h-4" />
              {tip.text}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message..."
            className="flex-1 bg-white/10 rounded-full px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={sendMessage}
            className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center hover:scale-105 transition-transform"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
