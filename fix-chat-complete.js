const fs = require('fs');

// Write a complete minimal working ChatView
const minimalChat = `import React, { useState, useRef, useEffect } from 'react';
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
  const { chatMessages, addChatMessage, userProfile } = useStore();
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
      toast.success(\`\${selectedCoach.name} responded!\`, { icon: '💬' });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="bg-black text-white border-b-4 border-black p-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Bot size={32} strokeWidth={3} />
          AI COACH
        </h1>
      </div>
      
      <div className="p-6">
        <div className="card-brutal mb-6">
          <div className="flex gap-2 overflow-x-auto">
            {coachPersonalities.map((personality) => {
              const Icon = personality.icon;
              const isSelected = selectedCoach.id === personality.id;
              
              return (
                <button
                  key={personality.id}
                  onClick={() => setSelectedCoach(personality)}
                  className={\`flex-shrink-0 p-3 rounded-lg transition-all \${
                    isSelected ? 'bg-black text-white' : 'bg-white border-2 border-black'
                  }\`}
                >
                  <Icon size={20} className="mb-1 mx-auto" />
                  <p className="text-xs font-bold">{personality.name.split(' ')[1]}</p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="card-brutal h-96 overflow-y-auto mb-4 p-4">
          <div className="space-y-4">
            {chatMessages.length === 0 ? (
              <div className="text-center py-12">
                <Bot className="mx-auto text-gray-300 mb-3" size={48} />
                <p className="font-bold">START A CONVERSATION</p>
              </div>
            ) : (
              chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={\`flex \${message.sender === 'user' ? 'justify-end' : 'justify-start'}\`}
                >
                  <div className={\`max-w-[80%] p-3 rounded-lg border-2 border-black \${
                    message.sender === 'user' 
                      ? 'bg-yellow-300' 
                      : 'bg-white'
                  }\`}>
                    <p className="text-sm font-medium">{message.text}</p>
                  </div>
                </div>
              ))
            )}
            {isTyping && (
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-black rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-sm font-bold">TYPING...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="TYPE YOUR MESSAGE..."
            className="flex-1 p-3 border-4 border-black rounded-lg font-bold"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="btn-brutal px-6"
          >
            <Send size={20} strokeWidth={3} />
          </button>
        </div>
      </div>
    </div>
  );
};`;

fs.writeFileSync('src/components/ChatView.tsx', minimalChat);
console.log('Wrote complete minimal ChatView.tsx');
