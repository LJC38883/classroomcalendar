import React, { useState } from 'react';
import { Clock, Plus, Calendar, Trash2, Edit2, Save, X, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';
import { Class } from '../types';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const colors = [
  { name: 'Purple', value: 'bg-purple-500' },
  { name: 'Pink', value: 'bg-pink-500' },
  { name: 'Blue', value: 'bg-blue-500' },
  { name: 'Green', value: 'bg-green-500' },
  { name: 'Yellow', value: 'bg-yellow-500' },
  { name: 'Red', value: 'bg-red-500' },
];

export const ClassScheduler: React.FC = () => {
  const { classes, addClass, updateClass, deleteClass } = useStore();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Class>>({
    name: '',
    day: 'Monday',
    startTime: '09:00',
    endTime: '10:00',
    location: '',
    color: 'bg-purple-500',
    reminder: 15,
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.location) {
      toast.error('Please fill in all fields');
      return;
    }

    if (editingId) {
      updateClass(editingId, formData);
      toast.success('Class updated successfully!');
      setEditingId(null);
    } else {
      addClass({
        id: Date.now().toString(),
        ...formData as Class,
      });
      toast.success('Class added successfully!');
    }

    setFormData({
      name: '',
      day: 'Monday',
      startTime: '09:00',
      endTime: '10:00',
      location: '',
      color: 'bg-purple-500',
      reminder: 15,
    });
    setIsAdding(false);
  };

  const handleEdit = (classItem: Class) => {
    setFormData(classItem);
    setEditingId(classItem.id);
    setIsAdding(true);
  };

  const handleDelete = (id: string) => {
    deleteClass(id);
    toast.success('Class deleted');
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <div className="min-h-screen pb-24 px-6 pt-8">
      {/* Header */}
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        data-aos="fade-down"
      >
        <h1 className="text-4xl font-bold mb-2 gradient-text font-display">Class Schedule</h1>
        <p className="text-slate-600">Manage your weekly class timetable</p>
      </motion.div>

      {/* Hero Image */}
      <motion.div 
        className="glass-card p-0 mb-6 overflow-hidden h-48"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        data-aos="zoom-in"
      >
        <img 
          src="https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg"
          alt="Classroom"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
          <div className="text-white">
            <h2 className="text-2xl font-bold mb-1 font-display">Stay Organized</h2>
            <p className="text-white/90 text-sm">Never miss a class with smart reminders</p>
          </div>
        </div>
      </motion.div>

      {/* Add/Edit Form */}
      <AnimatePresence>
        {isAdding && (
          <motion.div
            className="glass-card p-6 mb-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            data-aos="fade-up"
          >
            <h3 className="font-bold mb-4 font-display">
              {editingId ? 'Edit Class' : 'Add New Class'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Class Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-modern"
                  placeholder="e.g., Advanced Mathematics"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Day</label>
                  <select
                    value={formData.day}
                    onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                    className="input-modern"
                  >
                    {days.map(day => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="input-modern"
                    placeholder="Room 101"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Start Time</label>
                  <input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    className="input-modern"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">End Time</label>
                  <input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    className="input-modern"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Color</label>
                  <div className="flex gap-2">
                    {colors.map(color => (
                      <button
                        key={color.value}
                        onClick={() => setFormData({ ...formData, color: color.value })}
                        className={`w-8 h-8 rounded-lg ${color.value} ${
                          formData.color === color.value ? 'ring-2 ring-offset-2 ring-purple-600' : ''
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">
                    <Bell size={14} className="inline mr-1" />
                    Reminder (minutes)
                  </label>
                  <select
                    value={formData.reminder}
                    onChange={(e) => setFormData({ ...formData, reminder: Number(e.target.value) })}
                    className="input-modern"
                  >
                    <option value={5}>5 minutes</option>
                    <option value={10}>10 minutes</option>
                    <option value={15}>15 minutes</option>
                    <option value={30}>30 minutes</option>
                    <option value={60}>1 hour</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2">
                <button onClick={handleSubmit} className="btn-primary flex-1">
                  <Save size={16} />
                  {editingId ? 'Update' : 'Save'} Class
                </button>
                <button 
                  onClick={() => {
                    setIsAdding(false);
                    setEditingId(null);
                    setFormData({
                      name: '',
                      day: 'Monday',
                      startTime: '09:00',
                      endTime: '10:00',
                      location: '',
                      color: 'bg-purple-500',
                      reminder: 15,
                    });
                  }}
                  className="btn-secondary"
                >
                  <X size={16} />
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Button */}
      {!isAdding && (
        <motion.button
          onClick={() => setIsAdding(true)}
          className="w-full btn-primary mb-6"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          data-aos="fade-up"
        >
          <Plus size={20} />
          Add New Class
        </motion.button>
      )}

      {/* Class List by Day */}
      <div className="space-y-4">
        {days.map((day, dayIndex) => {
          const dayClasses = classes.filter(c => c.day === day);
          
          if (dayClasses.length === 0 && !isAdding) return null;
          
          return (
            <motion.div
              key={day}
              className="glass-card p-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: dayIndex * 0.1 }}
              data-aos="fade-right"
              data-aos-delay={dayIndex * 100}
            >
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <Calendar size={18} className="text-purple-600" />
                {day}
              </h3>
              
              {dayClasses.length > 0 ? (
                <div className="space-y-2">
                  {dayClasses.map((classItem) => (
                    <motion.div
                      key={classItem.id}
                      className="flex items-center justify-between p-3 bg-white rounded-lg card-hover"
                      whileHover={{ x: 4 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${classItem.color}`} />
                        <div>
                          <p className="font-medium">{classItem.name}</p>
                          <p className="text-sm text-slate-600">
                            <i className="fas fa-clock mr-1"></i>
                            {formatTime(classItem.startTime)} - {formatTime(classItem.endTime)}
                          </p>
                          <p className="text-xs text-slate-500">
                            <i className="fas fa-map-marker-alt mr-1"></i>
                            {classItem.location}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(classItem)}
                          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                          <Edit2 size={16} className="text-blue-600" />
                        </button>
                        <button
                          onClick={() => handleDelete(classItem.id)}
                          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} className="text-red-600" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500 italic">No classes scheduled</p>
              )}
            </motion.div>
          );
        })}
      </div>

      {classes.length === 0 && !isAdding && (
        <motion.div 
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          data-aos="fade-up"
        >
          <Clock className="mx-auto text-slate-300 mb-4" size={48} />
          <p className="text-slate-600">No classes scheduled yet</p>
          <p className="text-sm text-slate-500 mt-1">Add your first class to get started!</p>
        </motion.div>
      )}
    </div>
  );
};
