import React from 'react';
import { User, Award, Target, TrendingUp, Calendar, Coins, Star, Trophy } from 'lucide-react';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export const ProfileView: React.FC = () => {
  const { userProfile, tasks, dailyCheckIns } = useStore();
  
  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const achievements = [
    { id: 1, name: 'First Steps', description: 'Complete your first task', icon: '🎯', unlocked: completedTasks > 0 },
    { id: 2, name: 'Week Warrior', description: '7-day check-in streak', icon: '🔥', unlocked: userProfile.currentStreak >= 7 },
    { id: 3, name: 'Task Master', description: 'Complete 10 tasks', icon: '⭐', unlocked: completedTasks >= 10 },
    { id: 4, name: 'Coin Collector', description: 'Earn 50 coins', icon: '💰', unlocked: userProfile.coins >= 50 },
  ];

  return (
    <div className="min-h-screen pb-24 px-6 pt-8">
      {/* Header */}
      <div className="text-center mb-8" data-aos="fade-down">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
          My Profile
        </h1>
        <p className="text-gray-600">Track your amazing progress! 🌟</p>
      </div>

      {/* Profile Card */}
      <motion.div 
        className="glass-card p-6 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        data-aos="zoom-in"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
            <User size={40} className="text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {userProfile.name || 'Student'}
            </h2>
            <p className="text-gray-600">{userProfile.email || 'student@classroom.com'}</p>
            <div className="flex items-center gap-2 mt-2">
              <Coins className="text-yellow-500" size={16} />
              <span className="font-bold text-gray-700">{userProfile.coins} Coins</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="sticky-note">
            <div className="flex items-center gap-2">
              <Trophy className="text-yellow-500" size={20} />
              <div>
                <p className="text-xs text-gray-600">Current Streak</p>
                <p className="text-2xl font-bold text-gray-800">{userProfile.currentStreak} days</p>
              </div>
            </div>
          </div>
          
          <div className="sticky-note" style={{ transform: 'rotate(2deg)' }}>
            <div className="flex items-center gap-2">
              <Star className="text-purple-500" size={20} />
              <div>
                <p className="text-xs text-gray-600">Total Check-ins</p>
                <p className="text-2xl font-bold text-gray-800">{userProfile.totalCheckIns}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Progress Section */}
      <motion.div 
        className="glass-card p-6 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        data-aos="fade-up"
      >
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Target className="text-red-500" />
          Your Progress
        </h3>
        
        <div className="grid grid-cols-2 gap-6">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-2">
              <CircularProgressbar
                value={completionRate}
                text={`${Math.round(completionRate)}%`}
                styles={buildStyles({
                  pathColor: `rgba(168, 85, 247, ${completionRate / 100})`,
                  textColor: '#7C3AED',
                  trailColor: '#E9D5FF',
                })}
              />
            </div>
            <p className="text-sm text-gray-600">Task Completion</p>
          </div>
          
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-2">
              <CircularProgressbar
                value={userProfile.motivationLevel}
                text={`${userProfile.motivationLevel}%`}
                styles={buildStyles({
                  pathColor: `rgba(236, 72, 153, ${userProfile.motivationLevel / 100})`,
                  textColor: '#DB2777',
                  trailColor: '#FCE7F3',
                })}
              />
            </div>
            <p className="text-sm text-gray-600">Motivation Level</p>
          </div>
        </div>
      </motion.div>

      {/* Achievements */}
      <motion.div 
        className="glass-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        data-aos="fade-up"
      >
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Award className="text-yellow-500" />
          Achievements
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-4 rounded-xl border-2 ${
                achievement.unlocked 
                  ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300' 
                  : 'bg-gray-50 border-gray-200 opacity-50'
              }`}
            >
              <div className="text-2xl mb-2">{achievement.icon}</div>
              <h4 className="font-bold text-sm text-gray-800">{achievement.name}</h4>
              <p className="text-xs text-gray-600 mt-1">{achievement.description}</p>
              {achievement.unlocked && (
                <div className="mt-2 text-xs text-green-600 font-semibold">✓ Unlocked</div>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div 
        className="glass-card p-6 mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        data-aos="fade-up"
      >
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Calendar className="text-blue-500" />
          Recent Check-ins
        </h3>
        
        {dailyCheckIns.length > 0 ? (
          <div className="space-y-2">
            {dailyCheckIns.slice(-5).reverse().map((checkIn, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center">
                    <span className="text-xs font-bold">{checkIn.day}</span>
                  </div>
                  <span className="text-sm text-gray-700">{new Date(checkIn.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Coins className="text-yellow-500" size={14} />
                  <span className="text-sm font-bold text-gray-700">+{checkIn.coins}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-4">No check-ins yet. Start your streak today!</p>
        )}
      </motion.div>
    </div>
  );
};
