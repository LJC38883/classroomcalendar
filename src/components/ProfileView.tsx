import React from 'react';
import { motion } from 'framer-motion';
import { User, Trophy, Coins, Calendar, Target, TrendingUp, Award, Star } from 'lucide-react';
import { useStore } from '../store/useStore';

export const ProfileView: React.FC = () => {
  const { userProfile, moodHistory } = useStore();

  const achievements = [
    { id: '1', name: '7-Day Streak', icon: Calendar, unlocked: userProfile.currentStreak >= 7, description: 'Check in for 7 days straight' },
    { id: '2', name: 'Mood Master', icon: Star, unlocked: moodHistory.length >= 10, description: 'Track your mood 10 times' },
    { id: '3', name: 'Coin Collector', icon: Coins, unlocked: userProfile.coins >= 50, description: 'Collect 50 coins' },
    { id: '4', name: 'Shop Explorer', icon: Trophy, unlocked: userProfile.purchasedItems.length >= 3, description: 'Purchase 3 items' },
  ];

  const stats = [
    { label: 'Current Streak', value: userProfile.currentStreak, icon: TrendingUp },
    { label: 'Total Check-ins', value: userProfile.totalCheckIns, icon: Calendar },
    { label: 'Coins Earned', value: userProfile.coins, icon: Coins },
    { label: 'Items Purchased', value: userProfile.purchasedItems.length, icon: Award },
  ];

  return (
    <div className="min-h-screen pb-20 p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-24 h-24 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <User size={48} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold gradient-text mb-2">
            {userProfile.name || 'Student'}
          </h1>
          <p className="text-slate-600">Level {Math.floor(userProfile.totalCheckIns / 7) + 1} Scholar</p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-4 text-center"
              >
                <Icon size={24} className="text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-slate-600">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="glass-card p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Trophy className="text-yellow-500" />
            Achievements
          </h2>
          <div className="space-y-3">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <div
                  key={achievement.id}
                  className={`flex items-center gap-4 p-3 rounded-lg transition-all ${
                    achievement.unlocked
                      ? 'bg-gradient-to-r from-purple-100 to-pink-100'
                      : 'bg-slate-100 opacity-50'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    achievement.unlocked
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                      : 'bg-slate-300'
                  }`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold">{achievement.name}</h3>
                    <p className="text-sm text-slate-600">{achievement.description}</p>
                  </div>
                  {achievement.unlocked && (
                    <Star className="text-yellow-500" fill="currentColor" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-6 mt-6"
        >
          <h2 className="text-xl font-bold mb-4">Motivation Level</h2>
          <div className="relative h-4 bg-slate-200 rounded-full overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-600 to-pink-600"
              initial={{ width: 0 }}
              animate={{ width: `${userProfile.motivationLevel}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
          <p className="text-center mt-2 text-sm text-slate-600">
            {userProfile.motivationLevel}% Motivated
          </p>
        </motion.div>
      </div>
    </div>
  );
};
