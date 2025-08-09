import React from 'react';
import { Trophy, Star, Target, Zap, Award, TrendingUp, Calendar, Heart } from 'lucide-react';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

const achievements = [
  { id: 'streak7', name: '7-Day Streak', description: 'Check in for 7 days straight', icon: Calendar, progress: 3, total: 7, reward: 10 },
  { id: 'tasks50', name: 'Task Master', description: 'Complete 50 tasks', icon: Target, progress: 12, total: 50, reward: 15 },
  { id: 'reflect30', name: 'Self-Aware', description: '30 daily reflections', icon: Heart, progress: 8, total: 30, reward: 20 },
  { id: 'perfect', name: 'Perfect Week', description: 'Complete all tasks in a week', icon: Star, progress: 4, total: 7, reward: 25 },
];

export const RewardsView: React.FC = () => {
  const { userProfile } = useStore();

  const dailyReward = Math.floor(Math.random() * 7) + 1; // 1-7 coins

  return (
    <div className="min-h-screen pb-24 px-6 pt-8">
      {/* Header */}
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold mb-2 gradient-text">Rewards & Achievements</h1>
        <p className="text-slate-600">Track your progress and earn coins</p>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <motion.div 
          className="glass-card p-4 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Trophy className="text-yellow-500 mx-auto mb-2" size={24} />
          <p className="text-2xl font-bold">{userProfile.coins}</p>
          <p className="text-xs text-slate-600">Total Coins</p>
        </motion.div>

        <motion.div 
          className="glass-card p-4 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Zap className="text-orange-500 mx-auto mb-2" size={24} />
          <p className="text-2xl font-bold">{userProfile.currentStreak}</p>
          <p className="text-xs text-slate-600">Day Streak</p>
        </motion.div>

        <motion.div 
          className="glass-card p-4 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Award className="text-purple-500 mx-auto mb-2" size={24} />
          <p className="text-2xl font-bold">4</p>
          <p className="text-xs text-slate-600">Achievements</p>
        </motion.div>
      </div>

      {/* Daily Reward */}
      <motion.div 
        className="glass-card p-6 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Star className="text-yellow-500" size={20} />
              Daily Reward
            </h2>
            <p className="text-sm text-slate-600 mt-1">Check in daily for coins!</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-yellow-500">+{dailyReward}</p>
            <p className="text-xs text-slate-600">coins</p>
          </div>
        </div>
        <button className="w-full btn-primary">
          Claim Daily Reward
        </button>
      </motion.div>

      {/* Achievements */}
      <motion.div 
        className="glass-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="text-purple-600" size={20} />
          Achievements
        </h2>
        
        <div className="space-y-4">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            const percentage = (achievement.progress / achievement.total) * 100;
            
            return (
              <motion.div
                key={achievement.id}
                className="flex items-center gap-4 p-3 bg-white rounded-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <div className="w-12 h-12">
                  <CircularProgressbar
                    value={percentage}
                    text={`${achievement.progress}/${achievement.total}`}
                    styles={buildStyles({
                      textSize: '28px',
                      pathColor: percentage === 100 ? '#10b981' : '#8b5cf6',
                      textColor: '#1e293b',
                      trailColor: '#e2e8f0',
                    })}
                  />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-bold text-sm">{achievement.name}</h3>
                  <p className="text-xs text-slate-600">{achievement.description}</p>
                </div>
                
                <div className="text-center">
                  <p className="text-sm font-bold text-yellow-500">+{achievement.reward}</p>
                  <p className="text-xs text-slate-600">coins</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};
