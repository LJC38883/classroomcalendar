import React, { useState } from 'react';
import { Heart, Smile, Meh, Frown, Plus, Calendar, TrendingUp, Star, Cloud, Sun } from 'lucide-react';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

const moods = [
  { id: 'amazing' as const, icon: Star, color: 'text-yellow-500', label: 'Amazing' },
  { id: 'good' as const, icon: Smile, color: 'text-green-500', label: 'Good' },
  { id: 'okay' as const, icon: Sun, color: 'text-blue-500', label: 'Okay' },
  { id: 'stressed' as const, icon: Cloud, color: 'text-orange-500', label: 'Stressed' },
  { id: 'overwhelmed' as const, icon: Frown, color: 'text-red-500', label: 'Overwhelmed' },
];

export const ReflectionView: React.FC = () => {
  const { reflections, addReflection, updateMotivationLevel } = useStore();
  const [selectedMood, setSelectedMood] = useState<'amazing' | 'good' | 'okay' | 'stressed' | 'overwhelmed'>('okay');
  const [reflectionContent, setReflectionContent] = useState('');
  const [gratitudeText, setGratitudeText] = useState('');
  const [goalsText, setGoalsText] = useState('');

  const handleSubmit = () => {
    if (!reflectionContent.trim()) {
      toast.error('Please write your reflection');
      return;
    }

    addReflection({
      id: Date.now().toString(),
      date: new Date(),
      mood: selectedMood,
      content: reflectionContent,
      gratitude: gratitudeText.trim() || undefined,
      goals: goalsText.trim() || undefined,
    });

    // Update motivation based on mood
    const moodBoost = selectedMood === 'amazing' ? 15 : 
                     selectedMood === 'good' ? 10 : 
                     selectedMood === 'okay' ? 5 : 
                     selectedMood === 'stressed' ? 2 : 0;
    
    updateMotivationLevel(moodBoost);

    toast.success('Reflection saved! +' + moodBoost + ' motivation', { icon: '💝' });
    
    // Reset form
    setReflectionContent('');
    setGratitudeText('');
    setGoalsText('');
    setSelectedMood('okay');
  };

  return (
    <div className="min-h-screen pb-24 px-6 pt-8">
      {/* Header */}
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold mb-2 gradient-text">Daily Reflection</h1>
        <p className="text-slate-600">Take a moment to reflect on your day</p>
      </motion.div>

      {/* Mood Selector */}
      <motion.div 
        className="glass-card p-6 mb-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-lg font-bold mb-4">How are you feeling today?</h2>
        <div className="flex justify-between flex-wrap gap-2">
          {moods.map((mood) => {
            const Icon = mood.icon;
            const isSelected = selectedMood === mood.id;
            
            return (
              <button
                key={mood.id}
                onClick={() => setSelectedMood(mood.id)}
                className={`flex-1 min-w-[60px] p-3 rounded-xl transition-all ${
                  isSelected ? 'bg-white shadow-lg scale-110' : 'hover:bg-white/50'
                }`}
              >
                <Icon size={28} className={`mx-auto ${mood.color}`} />
                <p className="text-xs mt-2 font-medium">{mood.label}</p>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Reflection Input */}
      <motion.div 
        className="glass-card p-6 mb-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-lg font-bold mb-4">Today's Reflection</h2>
        <textarea
          value={reflectionContent}
          onChange={(e) => setReflectionContent(e.target.value)}
          placeholder="What's on your mind? How was your day?"
          className="input-modern min-h-[120px] resize-none"
        />
      </motion.div>

      {/* Gratitude */}
      <motion.div 
        className="glass-card p-6 mb-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-lg font-bold mb-4">What are you grateful for?</h2>
        <textarea
          value={gratitudeText}
          onChange={(e) => setGratitudeText(e.target.value)}
          placeholder="List things you're thankful for today..."
          className="input-modern min-h-[80px] resize-none"
        />
      </motion.div>

      {/* Goals */}
      <motion.div 
        className="glass-card p-6 mb-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.35 }}
      >
        <h2 className="text-lg font-bold mb-4">Tomorrow's Goals</h2>
        <textarea
          value={goalsText}
          onChange={(e) => setGoalsText(e.target.value)}
          placeholder="What do you want to accomplish tomorrow?"
          className="input-modern min-h-[80px] resize-none"
        />
      </motion.div>

      {/* Submit Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <button onClick={handleSubmit} className="w-full btn-primary mb-6">
          <Heart size={20} />
          Save Reflection
        </button>
      </motion.div>

      {/* Past Reflections */}
      {reflections.length > 0 && (
        <motion.div 
          className="glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Calendar className="text-purple-600" size={20} />
            Recent Reflections
          </h2>
          
          <div className="space-y-3">
            {reflections.slice(0, 3).map((reflection) => {
              const mood = moods.find(m => m.id === reflection.mood);
              const Icon = mood?.icon || Sun;
              
              return (
                <div key={reflection.id} className="p-4 bg-white rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon size={20} className={mood?.color || 'text-slate-500'} />
                      <span className="text-sm font-medium">
                        {format(new Date(reflection.date), 'MMM d, yyyy')}
                      </span>
                    </div>
                    <span className="text-xs px-2 py-1 bg-purple-100 text-purple-600 rounded-full">
                      {mood?.label || 'Reflection'}
                    </span>
                  </div>
                  <p className="text-sm text-slate-700 mb-2">{reflection.content}</p>
                  {reflection.gratitude && (
                    <div className="text-xs text-slate-500 mb-1">
                      <span className="font-medium">Grateful for: </span>
                      {reflection.gratitude}
                    </div>
                  )}
                  {reflection.goals && (
                    <div className="text-xs text-slate-500">
                      <span className="font-medium">Goals: </span>
                      {reflection.goals}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
};
