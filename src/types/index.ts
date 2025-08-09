export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: Date;
  priority: 'low' | 'medium' | 'high';
  category: 'class' | 'assignment' | 'exam' | 'personal';
  location?: string;
  reminderMinutes: number;
  completed: boolean;
}

export interface Reflection {
  id: string;
  date: Date;
  content: string;
  mood: 'amazing' | 'good' | 'okay' | 'stressed' | 'overwhelmed';
  gratitude?: string;
  goals?: string;
}

export interface Class {
  id: string;
  title: string;
  location: string;
  startTime: Date;
  endTime: Date;
  isImportant: boolean;
  notes?: string;
  color: string;
  reminderMinutes: number;
}

export interface Holiday {
  id: string;
  name: string;
  date: Date;
  type: 'public' | 'university';
}

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  type: 'background' | 'music' | 'decoration' | 'theme';
  preview?: string;
  unlocked?: boolean;
}

export interface DailyCheckIn {
  date: string;
  day: number;
  coins: number;
}

export interface UserProfile {
  name?: string;
  email?: string;
  studentId?: string;
  coins: number;
  motivationLevel: number;
  currentStreak: number;
  totalCheckIns: number;
  purchasedItems: string[];
  selectedTheme?: string;
  selectedMusic?: string;
  coachPersonality: 'fun' | 'cool' | 'motivational' | 'serious' | 'humble';
  defaultReminderMinutes: number;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'coach' | 'ai';
  timestamp: Date;
  personality?: string;
}

export interface MoodEntry {
  date: string;
  mood: 'amazing' | 'good' | 'okay' | 'stressed' | 'overwhelmed';
  reflection?: string;
}
