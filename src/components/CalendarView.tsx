import React, { useState } from 'react';
import { Calendar, Plus, Clock, MapPin, Bell, ChevronLeft, ChevronRight, Edit, Trash2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

export const CalendarView: React.FC = () => {
  const { tasks, addTask, updateTask, deleteTask, userProfile } = useStore();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: new Date(),
    priority: 'medium' as 'low' | 'medium' | 'high',
    category: 'class' as 'class' | 'assignment' | 'exam' | 'personal',
    location: '',
    reminderMinutes: userProfile.defaultReminderMinutes,
  });

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const handleAddTask = () => {
    if (!newTask.title.trim()) {
      toast.error('Please enter a task title');
      return;
    }

    addTask({
      ...newTask,
      id: Date.now().toString(),
      completed: false,
      dueDate: selectedDate,
    });

    toast.success('Task added successfully!', { icon: '✅' });
    setShowAddTask(false);
    setNewTask({
      title: '',
      description: '',
      dueDate: new Date(),
      priority: 'medium',
      category: 'class',
      location: '',
      reminderMinutes: userProfile.defaultReminderMinutes,
    });
  };

  const getTasksForDate = (date: Date) => {
    return tasks.filter(task => isSameDay(new Date(task.dueDate), date));
  };

  const categoryColors = {
    class: 'bg-blue-500',
    assignment: 'bg-purple-500',
    exam: 'bg-red-500',
    personal: 'bg-green-500',
  };

  return (
    <div className="min-h-screen pb-24 px-6 pt-8">
      {/* Header */}
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold mb-2 gradient-text">Your Calendar</h1>
        <p className="text-slate-600">Stay organized, stay motivated</p>
      </motion.div>

      {/* Month Navigation */}
      <motion.div 
        className="glass-card p-4 mb-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="p-2 hover:bg-white rounded-lg transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-xl font-bold">
            {format(currentMonth, 'MMMM yyyy')}
          </h2>
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="p-2 hover:bg-white rounded-lg transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-xs font-medium text-slate-600 py-2">
              {day}
            </div>
          ))}
          
          {monthDays.map((day, index) => {
            const dayTasks = getTasksForDate(day);
            const isSelected = isSameDay(day, selectedDate);
            const isToday = isSameDay(day, new Date());
            
            return (
              <motion.button
                key={day.toString()}
                onClick={() => setSelectedDate(day)}
                className={`aspect-square p-1 rounded-lg transition-all ${
                  isSelected ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' :
                  isToday ? 'bg-purple-100 text-purple-600' :
                  'hover:bg-slate-100'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.01 }}
              >
                <div className="text-sm font-medium">{format(day, 'd')}</div>
                {dayTasks.length > 0 && (
                  <div className="flex justify-center gap-1 mt-1">
                    {dayTasks.slice(0, 3).map((task, i) => (
                      <div
                        key={i}
                        className={`w-1 h-1 rounded-full ${categoryColors[task.category]}`}
                      />
                    ))}
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Selected Date Tasks */}
      <motion.div 
        className="glass-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">
            {format(selectedDate, 'EEEE, MMMM d')}
          </h3>
          <button
            onClick={() => setShowAddTask(true)}
            className="btn-primary text-sm"
          >
            <Plus size={16} />
            Add Task
          </button>
        </div>

        <div className="space-y-3">
          {getTasksForDate(selectedDate).map((task) => (
            <motion.div
              key={task.id}
              className="p-4 bg-white rounded-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-2 h-2 rounded-full ${categoryColors[task.category]}`} />
                    <span className="text-sm font-medium capitalize">{task.category}</span>
                  </div>
                  <h4 className="font-bold">{task.title}</h4>
                  {task.description && (
                    <p className="text-sm text-slate-600 mt-1">{task.description}</p>
                  )}
                  <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {format(new Date(task.dueDate), 'h:mm a')}
                    </span>
                    {task.location && (
                      <span className="flex items-center gap-1">
                        <MapPin size={12} />
                        {task.location}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Bell size={12} />
                      {task.reminderMinutes}m before
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-1 hover:bg-slate-100 rounded">
                    <Edit size={16} className="text-slate-600" />
                  </button>
                  <button 
                    onClick={() => {
                      deleteTask(task.id);
                      toast.success('Task deleted');
                    }}
                    className="p-1 hover:bg-slate-100 rounded"
                  >
                    <Trash2 size={16} className="text-red-600" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
          
          {getTasksForDate(selectedDate).length === 0 && (
            <div className="text-center py-8">
              <Calendar className="mx-auto text-slate-300 mb-3" size={48} />
              <p className="text-slate-600">No tasks scheduled</p>
              <p className="text-sm text-slate-500 mt-1">Add a task to get started</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Add Task Modal */}
      <AnimatePresence>
        {showAddTask && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAddTask(false)}
          >
            <motion.div
              className="glass-card p-6 w-full max-w-md"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-4">Add New Task</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    className="input-modern"
                    placeholder="e.g., Math Lecture"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select
                    value={newTask.category}
                    onChange={(e) => setNewTask({ ...newTask, category: e.target.value as any })}
                    className="input-modern"
                  >
                    <option value="class">Class</option>
                    <option value="assignment">Assignment</option>
                    <option value="exam">Exam</option>
                    <option value="personal">Personal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Priority</label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as any })}
                    className="input-modern"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Location</label>
                  <input
                    type="text"
                    value={newTask.location}
                    onChange={(e) => setNewTask({ ...newTask, location: e.target.value })}
                    className="input-modern"
                    placeholder="e.g., Room 301"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Reminder</label>
                  <select
                    value={newTask.reminderMinutes}
                    onChange={(e) => setNewTask({ ...newTask, reminderMinutes: Number(e.target.value) })}
                    className="input-modern"
                  >
                    <option value={5}>5 minutes before</option>
                    <option value={10}>10 minutes before</option>
                    <option value={15}>15 minutes before</option>
                    <option value={30}>30 minutes before</option>
                    <option value={60}>1 hour before</option>
                  </select>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowAddTask(false)}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddTask}
                    className="btn-primary flex-1"
                  >
                    Add Task
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
