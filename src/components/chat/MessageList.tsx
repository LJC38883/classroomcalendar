import React from 'react';
import { User, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MessageListProps {
  messages: any[];
  selectedCoach: any;
  isTyping: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export const MessageList: React.FC<MessageListProps> = ({ 
  messages, 
  selectedCoach, 
  isTyping, 
  messagesEndRef 
}) => {
  const CoachIcon = Zap;

  return (
    <div className="flex-1 p-4 space-y-4 max-h-[calc(100vh-280px)] overflow-y-auto">
      {messages.length === 0 ? (
        <div className="text-center py-12">
          <div className={`w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r ${selectedCoach.color} flex items-center justify-center`}>
            <CoachIcon size={48} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Hi! I'm {selectedCoach.name}
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            I'm here to help you stay motivated and achieve your academic goals. 
            Ask me anything about studying, time management, or dealing with stress!
          </p>
        </div>
      ) : (
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-3 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.sender === 'user' 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                    : `bg-gradient-to-r ${selectedCoach.color}`
                }`}>
                  {message.sender === 'user' ? (
                    <User size={20} className="text-white" />
                  ) : (
                    <CoachIcon size={20} className="text-white" />
                  )}
                </div>
                <div className={`rounded-2xl px-4 py-3 ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'bg-white/80 backdrop-blur-sm border border-gray-200'
                }`}>
                  <p className={message.sender === 'user' ? 'text-white' : 'text-gray-800'}>
                    {message.text}
                  </p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      )}
      
      {isTyping && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-start"
        >
          <div className="flex gap-3 max-w-[80%]">
            <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${selectedCoach.color} flex items-center justify-center`}>
              <CoachIcon size={20} className="text-white" />
            </div>
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        </motion.div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};
