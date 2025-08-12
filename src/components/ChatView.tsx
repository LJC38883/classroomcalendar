import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

export const ChatView: React.FC = () => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { chatMessages, addChatMessage } = useStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      content: message,
      sender: 'user' as const,
      timestamp: new Date()
    };

    addChatMessage(userMessage);
    setMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Great question! Let me help you with that. 📚",
        "You're doing amazing! Keep up the great work! 🌟",
        "That's a smart approach! Have you considered trying this...? 🤔",
        "I love your enthusiasm! Here's what I suggest... 💡",
        "Excellent progress! Remember to take breaks too! 😊"
      ];

      const aiMessage = {
        id: (Date.now() + 1).toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        sender: 'ai' as const,
        timestamp: new Date()
      };

      addChatMessage(aiMessage);
      setIsTyping(false);
      toast.success('New message from your study buddy!', { icon: '💬' });
    }, 1500);
  };

  return (
    <div className="min-h-screen pb-24 px-4 pt-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="chalkboard p-6 mb-6" data-aos="fade-down">
          <h1 className="text-3xl font-bold text-white font-display flex items-center gap-3">
            <Bot className="text-yellow-400" size={36} />
            Study Buddy Chat
          </h1>
          <p className="text-gray-300 mt-2">Your AI assistant is here to help! 🎓</p>
        </div>

        {/* Chat Messages */}
        <div className="glass-card p-4 mb-4 h-[calc(100vh-320px)] overflow-y-auto">
          {chatMessages.length === 0 ? (
            <div className="text-center py-12">
              <Sparkles className="mx-auto text-purple-400 mb-4 floating" size={48} />
              <h3 className="text-xl font-bold text-gray-700 mb-2">Start a conversation!</h3>
              <p className="text-gray-500">Ask me anything about your studies, schedule, or just chat!</p>
            </div>
          ) : (
            <AnimatePresence>
              {chatMessages.map((msg, index) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex gap-3 mb-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'ai' && (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center flex-shrink-0">
                      <Bot size={20} className="text-white" />
                    </div>
                  )}
                  
                  <div className={`max-w-[70%] ${msg.sender === 'user' ? 'order-1' : 'order-2'}`}>
                    <div className={`p-4 rounded-2xl ${
                      msg.sender === 'user' 
                        ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white' 
                        : 'notebook-paper'
                    }`}>
                      <p className={msg.sender === 'user' ? 'text-white' : 'text-gray-800'}>
                        {msg.content}
                      </p>
                      <p className={`text-xs mt-2 ${msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                  
                  {msg.sender === 'user' && (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-400 flex items-center justify-center flex-shrink-0 order-2">
                      <User size={20} className="text-white" />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          )}
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3 mb-4"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                <Bot size={20} className="text-white" />
              </div>
              <div className="bg-gray-100 rounded-2xl p-4">
                <div className="flex gap-2">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="glass-card p-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-400 focus:outline-none transition-colors"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSendMessage}
              className="btn-primary px-6 flex items-center gap-2"
            >
              <Send size={20} />
              Send
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};
