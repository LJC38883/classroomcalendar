import React, { useState } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { useStore } from '../store/useStore';

export const Chat: React.FC = () => {
  const { chatMessages, addChatMessage } = useStore();
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    const message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user' as const,
      timestamp: new Date(),
      personality: 'motivational' as any,
    };
    
    addChatMessage(message);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        text: "I'm here to help you stay motivated and focused!",
        sender: 'ai' as const,
        timestamp: new Date(),
        personality: 'motivational' as any,
      };
      addChatMessage(aiMessage);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white pb-24">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
        <h1 className="text-3xl font-bold">AI Coach</h1>
      </div>
      
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-4 rounded-2xl ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'bg-white/80 backdrop-blur-sm border border-purple-200'
              }`}
            >
              <div className="flex items-start gap-3">
                {msg.sender === 'ai' ? (
                  <Bot className="w-6 h-6 text-purple-600 flex-shrink-0" />
                ) : (
                  <User className="w-6 h-6 flex-shrink-0" />
                )}
                <p className="text-sm">{msg.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="fixed bottom-24 left-0 right-0 p-4 bg-white/80 backdrop-blur-lg border-t border-purple-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask your AI coach..."
            className="flex-1 px-4 py-3 rounded-full bg-white border border-purple-200 focus:outline-none focus:border-purple-500"
          />
          <button
            onClick={handleSend}
            className="p-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg transition-shadow"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
