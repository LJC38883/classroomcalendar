import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task, Reflection, Class, Holiday, ShopItem, UserProfile, ChatMessage, MoodEntry, DailyCheckIn } from '../types';

interface Store {
  // Tasks
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  
  // Reflections
  reflections: Reflection[];
  addReflection: (reflection: Reflection) => void;
  
  // Classes
  classes: Class[];
  addClass: (classItem: Class) => void;
  updateClass: (id: string, updates: Partial<Class>) => void;
  deleteClass: (id: string) => void;
  
  // Holidays
  holidays: Holiday[];
  addHoliday: (holiday: Holiday) => void;
  
  // Shop
  shopItems: ShopItem[];
  purchaseItem: (itemId: string) => void;
  
  // User Profile
  userProfile: UserProfile;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  updateMotivationLevel: (change: number) => void;
  
  // Chat
  chatMessages: ChatMessage[];
  addChatMessage: (message: ChatMessage) => void;
  clearChatHistory: () => void;
  
  // Mood
  moodHistory: MoodEntry[];
  addMoodEntry: (entry: MoodEntry) => void;
  
  // Daily Check-ins
  dailyCheckIns: DailyCheckIn[];
  lastCheckIn: string | null;
  performDailyCheckIn: () => { success: boolean; coins: number };
  
  // Computed
  currentStreak: number;
}

const initialShopItems: ShopItem[] = [
  {
    id: 'theme-ocean',
    name: 'Ocean Theme',
    description: 'Calming blue waves background',
    price: 10,
    type: 'theme',
    preview: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0'
  },
  {
    id: 'theme-forest',
    name: 'Forest Theme',
    description: 'Peaceful green forest vibes',
    price: 8,
    type: 'theme',
    preview: 'https://images.unsplash.com/photo-1511497584788-876760111969'
  },
  {
    id: 'music-lofi',
    name: 'Lo-Fi Study Mix',
    description: 'Chill beats for studying',
    price: 5,
    type: 'music'
  },
  {
    id: 'music-classical',
    name: 'Classical Focus',
    description: 'Mozart & Bach for concentration',
    price: 5,
    type: 'music'
  },
  {
    id: 'decoration-plants',
    name: 'Virtual Plants',
    description: 'Add some greenery to your calendar',
    price: 7,
    type: 'decoration'
  }
];

const malaysianHolidays: Holiday[] = [
  { id: '1', name: "New Year's Day", date: new Date('2024-01-01'), type: 'public' },
  { id: '2', name: 'Chinese New Year', date: new Date('2024-02-10'), type: 'public' },
  { id: '3', name: 'Hari Raya Aidilfitri', date: new Date('2024-04-10'), type: 'public' },
  { id: '4', name: 'Wesak Day', date: new Date('2024-05-22'), type: 'public' },
  { id: '5', name: 'Hari Raya Haji', date: new Date('2024-06-17'), type: 'public' },
  { id: '6', name: 'Merdeka Day', date: new Date('2024-08-31'), type: 'public' },
  { id: '7', name: 'Malaysia Day', date: new Date('2024-09-16'), type: 'public' },
  { id: '8', name: 'Deepavali', date: new Date('2024-11-01'), type: 'public' },
  { id: '9', name: 'Christmas Day', date: new Date('2024-12-25'), type: 'public' }
];

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      // Tasks
      tasks: [],
      addTask: (task) => set((state) => ({
        tasks: [...state.tasks, task]
      })),
      updateTask: (id, updates) => set((state) => ({
        tasks: state.tasks.map(t => t.id === id ? { ...t, ...updates } : t)
      })),
      deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter(t => t.id !== id)
      })),
      
      // Reflections
      reflections: [],
      addReflection: (reflection) => set((state) => ({
        reflections: [...state.reflections, reflection]
      })),
      
      // Classes
      classes: [],
      addClass: (classItem) => set((state) => ({
        classes: [...state.classes, classItem]
      })),
      updateClass: (id, updates) => set((state) => ({
        classes: state.classes.map(c => c.id === id ? { ...c, ...updates } : c)
      })),
      deleteClass: (id) => set((state) => ({
        classes: state.classes.filter(c => c.id !== id)
      })),
      
      // Holidays
      holidays: malaysianHolidays,
      addHoliday: (holiday) => set((state) => ({
        holidays: [...state.holidays, holiday]
      })),
      
      // Shop
      shopItems: initialShopItems,
      purchaseItem: (itemId) => set((state) => {
        const item = state.shopItems.find(i => i.id === itemId);
        if (!item || state.userProfile.coins < item.price) return state;
        
        return {
          userProfile: {
            ...state.userProfile,
            coins: state.userProfile.coins - item.price,
            purchasedItems: [...state.userProfile.purchasedItems, itemId],
            selectedTheme: item.type === 'theme' ? itemId : state.userProfile.selectedTheme,
            selectedMusic: item.type === 'music' ? itemId : state.userProfile.selectedMusic
          },
          shopItems: state.shopItems.map(i => 
            i.id === itemId ? { ...i, unlocked: true } : i
          )
        };
      }),
      
      // User Profile
      userProfile: {
        name: '',
        email: '',
        studentId: '',
        coins: 10,
        motivationLevel: 75,
        currentStreak: 0,
        totalCheckIns: 0,
        purchasedItems: [],
        selectedTheme: undefined,
        selectedMusic: undefined,
        coachPersonality: 'motivational',
        defaultReminderMinutes: 15
      },
      updateUserProfile: (updates) => set((state) => ({
        userProfile: { ...state.userProfile, ...updates }
      })),
      updateMotivationLevel: (change) => set((state) => ({
        userProfile: {
          ...state.userProfile,
          motivationLevel: Math.max(0, Math.min(100, state.userProfile.motivationLevel + change))
        }
      })),
      
      // Chat
      chatMessages: [],
      addChatMessage: (message) => set((state) => ({
        chatMessages: [...state.chatMessages, message]
      })),
      clearChatHistory: () => set({ chatMessages: [] }),
      
      // Mood
      moodHistory: [],
      addMoodEntry: (entry) => set((state) => ({
        moodHistory: [...state.moodHistory, entry],
        userProfile: {
          ...state.userProfile,
          motivationLevel: Math.min(100, state.userProfile.motivationLevel + 
            (entry.mood === 'amazing' ? 10 : entry.mood === 'good' ? 5 : 0))
        }
      })),
      
      // Daily Check-ins
      dailyCheckIns: [],
      lastCheckIn: null,
      performDailyCheckIn: () => {
        const today = new Date().toDateString();
        const state = get();
        
        if (state.lastCheckIn === today) {
          return { success: false, coins: 0 };
        }
        
        const dayNumber = (state.userProfile.currentStreak % 7) + 1;
        const coins = dayNumber;
        
        set({
          lastCheckIn: today,
          dailyCheckIns: [...state.dailyCheckIns, {
            date: today,
            day: dayNumber,
            coins
          }],
          userProfile: {
            ...state.userProfile,
            coins: state.userProfile.coins + coins,
            currentStreak: state.userProfile.currentStreak + 1,
            totalCheckIns: state.userProfile.totalCheckIns + 1,
            motivationLevel: Math.min(100, state.userProfile.motivationLevel + 5)
          }
        });
        
        return { success: true, coins };
      },
      
      // Computed
      get currentStreak() {
        return get().userProfile.currentStreak;
      }
    }),
    {
      name: 'classroom-calendar-storage'
    }
  )
);
