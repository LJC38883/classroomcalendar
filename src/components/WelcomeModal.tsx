import React from 'react';
import { X, Heart, Brain, Trophy, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface WelcomeModalProps {
  onComplete: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ onComplete }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="glass-card p-8 max-w-md w-full relative"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <button
          onClick={onComplete}
          className="absolute top-4 right-4 p-2 hover:bg-white/50 rounded-lg transition-colors"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart size={40} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-2 gradient-text">Welcome to EQ Calendar!</h2>
          <p className="text-slate-600">Your emotional intelligence companion for academic success</p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Brain className="text-purple-600" size={20} />
            </div>
            <div>
              <h3 className="font-bold mb-1">Build Your EQ</h3>
              <p className="text-sm text-slate-600">Track your emotional journey and develop self-awareness</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Trophy className="text-pink-600" size={20} />
            </div>
            <div>
              <h3 className="font-bold mb-1">Earn Rewards</h3>
              <p className="text-sm text-slate-600">Complete daily check-ins and earn coins for the shop</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Sparkles className="text-yellow-600" size={20} />
            </div>
            <div>
              <h3 className="font-bold mb-1">AI Life Coach</h3>
              <p className="text-sm text-slate-600">Get personalized guidance from 5 unique AI personalities</p>
            </div>
          </div>
        </div>

        <button
          onClick={onComplete}
          className="w-full btn-primary"
        >
          Get Started
        </button>
      </motion.div>
    </motion.div>
  );
};
