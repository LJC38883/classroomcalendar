import React, { useState, useRef, useEffect } from 'react';
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
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                  selectedCoach.id === coach.id
                    ? 'bg-white/20 backdrop-blur-sm scale-105'
                    : 'bg-white/10 hover:bg-white/15'
                }`}
              >
                <Icon size={20} />
                <span className="whitespace-nowrap text-sm font-medium">{coach.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 p-4 space-y-4 max-h-[60vh] overflow-y-auto">
        <AnimatePresence>
          {chatMessages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start gap-3 max-w-[80%] ${
                message.sender === 'user' ? 'flex-row-reverse' : ''
              }`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  message.sender === 'user' 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                    : `bg-gradient-to-r ${selectedCoach.color}`
                }`}>
                  {message.sender === 'user' ? (
                    <User size={20} className="text-white" />
                  ) : (
                    <Bot size={20} className="text-white" />
                  )}
                </div>
                <div className={`rounded-2xl px-4 py-3 ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'bg-white/80 backdrop-blur-sm border border-purple-100'
                }`}>
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                  }`}>
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-gray-500"
          >
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
            </div>
            <span className="text-sm">{selectedCoach.name} is typing...</span>
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
            placeholder={`Ask ${selectedCoach.name} anything...`}
            className="flex-1 px-4 py-3 rounded-full bg-white/90 backdrop-blur-sm border border-purple-200 focus:outline-none focus:border-purple-400 transition-colors"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-50 disabled:scale-100"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
