import React from 'react';
import { Calendar, Brain, Heart, TrendingUp, Sparkles, Clock, Award, Users } from 'lucide-react';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const motivationalQuotes = [
  "Your emotional intelligence is your superpower!",
  "Every small step counts towards your growth.",
  "Balance your mind, balance your life.",
  "Today's reflection is tomorrow's strength.",
  "You're building habits that will last a lifetime!"
];

const heroImages = [
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800',
  'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800',
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800',
];

export const HomeView: React.FC = () => {
  const { userProfile, tasks, updateMotivationLevel } = useStore();
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [currentQuote] = React.useState(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const todayTasks = tasks.filter(task => {
    const taskDate = new Date(task.dueDate);
    const today = new Date();
    return taskDate.toDateString() === today.toDateString();
  });

  const eqScore = Math.round((userProfile.motivationLevel * 0.4) + (userProfile.currentStreak * 2) + 50);

  return (
    <div className="min-h-screen pb-24 px-6 pt-8">
      {/* Welcome Header */}
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold mb-2 gradient-text">
          Welcome back, {userProfile.name}!
        </h1>
        <p className="text-slate-600">{currentQuote}</p>
      </motion.div>

      {/* Hero Image Card */}
      <motion.div 
        className="glass-card p-0 mb-6 overflow-hidden h-48"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="relative h-full">
          <img 
            src={heroImages[currentImageIndex]}
            alt="Students collaborating"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
            <div className="text-white">
              <h2 className="text-2xl font-bold mb-1">Build Your EQ</h2>
              <p className="text-white/90 text-sm">Emotional intelligence for academic success</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <motion.div 
          className="glass-card p-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-2">
            <Brain className="text-purple-600" size={24} />
            <span className="text-2xl font-bold">{eqScore}</span>
          </div>
          <p className="text-sm text-slate-600">EQ Score</p>
          <div className="mt-2 h-2 bg-slate-200 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-purple-600 to-pink-600"
              initial={{ width: 0 }}
              animate={{ width: `${eqScore}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </motion.div>

        <motion.div 
          className="glass-card p-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="text-green-600" size={24} />
            <span className="text-2xl font-bold">{userProfile.currentStreak}</span>
          </div>
          <p className="text-sm text-slate-600">Day Streak</p>
          <p className="text-xs text-green-600 mt-2">Keep it going! 🔥</p>
        </motion.div>
      </div>

      {/* Motivation Bar */}
      <motion.div 
        className="glass-card p-6 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Heart className="text-red-500" size={20} />
              Daily Motivation
            </h3>
            <p className="text-sm text-slate-600 mt-1">How energized do you feel?</p>
          </div>
          <div className="w-20 h-20">
            <CircularProgressbar
              value={userProfile.motivationLevel}
              text={`${userProfile.motivationLevel}%`}
              styles={buildStyles({
                textSize: '24px',
                pathColor: `rgba(236, 72, 153, ${userProfile.motivationLevel / 100})`,
                textColor: '#ec4899',
                trailColor: '#e2e8f0',
              })}
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={() => updateMotivationLevel(10)}
            className="btn-secondary text-sm flex-1"
          >
            <Sparkles size={16} />
            Boost +10
          </button>
          <button className="btn-primary text-sm flex-1">
            <Award size={16} />
            Daily Check-in
          </button>
        </div>
      </motion.div>

      {/* Today's Tasks */}
      <motion.div 
        className="glass-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Calendar className="text-purple-600" />
          Today's Schedule
        </h3>
        
        {todayTasks.length > 0 ? (
          <div className="space-y-3">
            {todayTasks.slice(0, 3).map((task) => (
              <div key={task.id} className="flex items-center gap-3 p-3 bg-white rounded-lg">
                <Clock className="text-slate-400" size={20} />
                <div className="flex-1">
                  <p className="font-medium">{task.title}</p>
                  <p className="text-sm text-slate-600">
                    {new Date(task.dueDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <div className={`w-2 h-2 rounded-full ${
                  task.priority === 'high' ? 'bg-red-500' :
                  task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                }`} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Users className="mx-auto text-slate-300 mb-3" size={48} />
            <p className="text-slate-600">No tasks for today</p>
            <p className="text-sm text-slate-500 mt-1">Time to plan your day!</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};
