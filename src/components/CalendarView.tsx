import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Calendar, Star, Trophy, Target } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';

export const CalendarView: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { tasks, holidays } = useStore();

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const getTasksForDay = (date: Date) => {
    return tasks.filter(task => isSameDay(new Date(task.dueDate), date));
  };

  const getHolidayForDay = (date: Date) => {
    return holidays.find(holiday => isSameDay(new Date(holiday.date), date));
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header" data-aos="fade-down">
        <h1 className="calendar-title">My Classroom Calendar</h1>
        <p className="calendar-subtitle">Stay organized, stay awesome! 🎒</p>
      </div>

      <motion.div 
        className="glass-card p-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Month Navigation */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handlePrevMonth}
            className="btn-secondary flex items-center gap-2"
          >
            <ChevronLeft size={20} />
            Previous
          </button>
          
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Calendar className="text-orange-500" />
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          
          <button
            onClick={handleNextMonth}
            className="btn-secondary flex items-center gap-2"
          >
            Next
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Days of Week */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center font-bold text-gray-600 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => {
            const dayTasks = getTasksForDay(day);
            const holiday = getHolidayForDay(day);
            const isToday = isSameDay(day, new Date());
            const isSelected = selectedDate && isSameDay(day, selectedDate);

            return (
              <motion.div
                key={day.toISOString()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.01 }}
                onClick={() => setSelectedDate(day)}
                className={`
                  min-h-[80px] p-2 rounded-lg cursor-pointer transition-all
                  ${isToday ? 'bg-gradient-to-br from-yellow-200 to-orange-200 shadow-lg' : 'bg-white'}
                  ${isSelected ? 'ring-2 ring-purple-500' : ''}
                  ${holiday ? 'bg-gradient-to-br from-pink-100 to-purple-100' : ''}
                  hover:shadow-md border-2 border-gray-100
                `}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-sm font-bold ${isToday ? 'text-orange-600' : 'text-gray-700'}`}>
                    {format(day, 'd')}
                  </span>
                  {holiday && <Star size={14} className="text-yellow-500" />}
                </div>
                
                {holiday && (
                  <p className="text-xs text-purple-600 font-medium mb-1">{holiday.name}</p>
                )}
                
                {dayTasks.length > 0 && (
                  <div className="space-y-1">
                    {dayTasks.slice(0, 2).map(task => (
                      <div
                        key={task.id}
                        className={`text-xs p-1 rounded ${
                          task.priority === 'high' 
                            ? 'bg-red-100 text-red-700' 
                            : task.priority === 'medium'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {task.title.substring(0, 15)}...
                      </div>
                    ))}
                    {dayTasks.length > 2 && (
                      <div className="text-xs text-gray-500">+{dayTasks.length - 2} more</div>
                    )}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="sticky-note">
            <div className="flex items-center gap-2">
              <Target className="text-red-500" size={20} />
              <div>
                <p className="text-xs text-gray-600">Tasks Today</p>
                <p className="text-xl font-bold text-gray-800">
                  {getTasksForDay(new Date()).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="sticky-note" style={{ transform: 'rotate(2deg)' }}>
            <div className="flex items-center gap-2">
              <Trophy className="text-yellow-500" size={20} />
              <div>
                <p className="text-xs text-gray-600">Completed</p>
                <p className="text-xl font-bold text-gray-800">
                  {tasks.filter(t => t.completed).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="sticky-note" style={{ transform: 'rotate(-1deg)' }}>
            <div className="flex items-center gap-2">
              <Star className="text-purple-500" size={20} />
              <div>
                <p className="text-xs text-gray-600">Streak</p>
                <p className="text-xl font-bold text-gray-800">
                  {useStore.getState().userProfile.currentStreak} days
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
