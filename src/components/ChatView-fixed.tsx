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
      content: input,
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
        content: aiResponse,
        sender: 'ai' as const,
        timestamp: new Date(),
        personality: selectedCoach.id as any,
      };
      addChatMessage(aiMessage);
      setIsTyping(false);
      toast.success(`${selectedCoach.name} responded!`, { icon: '💬' });
    }, 1500);
  };

  return (
    <div className="min-h-screen pb-24 px-6 pt-8 flex flex-col">
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold mb-2 gradient-text">AI Life Coach</h1>
        <p className="text-slate-600">Choose your coach personality and start chatting</p>
      </motion.div>

      <motion.div 
        className="glass-card p-4 mb-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {coachPersonalities.map((personality) => {
            const Icon = personality.icon;
            const isSelected = selectedCoach.id === personality.id;
            
            return (
              <button
                key={personality.id}
                onClick={() => setSelectedCoach(personality)}
                className={`flex-shrink-0 p-3 rounded-xl transition-all ${
                  isSelected ? 'bg-gradient-to-r text-white shadow-lg scale-105' : 'bg-white hover:bg-slate-50'
                } ${isSelected ? personality.color : ''}`}
              >
                <Icon size={20} className="mb-1 mx-auto" />
                <p className="text-xs font-medium">{personality.name.split(' ')[1]}</p>
              </button>
            );
          })}
        </div>
        <p className="text-sm text-slate-600 mt-3 text-center">
          Currently chatting with <span className="font-bold">{selectedCoach.name}</span>
        </p>
      </motion.div>

      <motion.div 
        className="glass-card p-4 flex-1 mb-4 overflow-y-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="space-y-4">
          {chatMessages.length === 0 ? (
            <div className="text-center py-12">
              <Bot className="mx-auto text-slate-300 mb-3" size={48} />
              <p className="text-slate-600">Start a conversation with your AI coach</p>
              <p className="text-sm text-slate-500 mt-1">They are here to help you grow!</p>
            </div>
          ) : (
            <AnimatePresence>
              {chatMessages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, x: message.sender === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                    <div className={`p-3 rounded-2xl ${
                      message.sender === 'user' 
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                        : 'bg-white'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 px-2">
                      {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.sender === 'user' ? 'order-1 mr-2' : 'order-2 ml-2'
                  } ${message.sender === 'user' ? 'bg-purple-100' : `bg-gradient-to-r ${selectedCoach.color}`}`}>
                    {message.sender === 'user' ? (
                      <User size={16} className="text-purple-600" />
                    ) : (
                      <Bot size={16} className="text-white" />
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-slate-500"
            >
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span className="text-sm">{selectedCoach.name} is typing...</span>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </motion.div>

      <motion.div 
        className="glass-card p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={`Ask ${selectedCoach.name} anything...`}
            className="input-modern flex-1"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="btn-primary px-4"
          >
            <Send size={20} />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
