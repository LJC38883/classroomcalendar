import React, { useState, useEffect } from 'react';
import { CalendarView } from './components/CalendarView';
import { ChatView } from './components/ChatView';
import { ShopView } from './components/ShopView';
import { ProfileView } from './components/ProfileView';
import { SettingsView } from './components/SettingsView';
import { BottomNav } from './components/BottomNav';
import { MusicPlayer } from './components/MusicPlayer';
import { WelcomeModal } from './components/WelcomeModal';
import { Toaster } from 'react-hot-toast';
import { useStore } from './store/useStore';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [activeView, setActiveView] = useState('calendar');
  const { userProfile } = useStore();
  const [showWelcome, setShowWelcome] = useState(!userProfile.name);

  useEffect(() => {
    if (userProfile.name) {
      setShowWelcome(false);
    }
  }, [userProfile.name]);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const renderView = () => {
    switch (activeView) {
      case 'calendar':
        return <CalendarView />;
      case 'chat':
        return <ChatView />;
      case 'shop':
        return <ShopView />;
      case 'profile':
        return <ProfileView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <CalendarView />;
    }
  };

  return (
    <div className="app-container">
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            fontWeight: 'bold',
            borderRadius: '12px',
            padding: '16px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
          },
        }}
      />
      
      {showWelcome && <WelcomeModal onComplete={() => setShowWelcome(false)} />}
      
      <MusicPlayer />
      
      <div className="main-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="page-content"
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </div>
      
      <BottomNav activeView={activeView} setActiveView={setActiveView} />
    </div>
  );
}

export default App;
