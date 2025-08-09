import React, { useState, useEffect } from 'react';
import { CalendarView } from './components/CalendarView';
import { Chat } from './components/Chat';
import { ShopView } from './components/ShopView';
import { ProfileView } from './components/ProfileView';
import { Settings } from './components/Settings';
import { BottomNav } from './components/BottomNav';
import { MusicPlayer } from './components/MusicPlayer';
import { WelcomeModal } from './components/WelcomeModal';
import { Toaster } from 'react-hot-toast';
import { useStore } from './store/useStore';

function App() {
  const [activeView, setActiveView] = useState('calendar');
  const { userProfile } = useStore();
  const [showWelcome, setShowWelcome] = useState(!userProfile.name);

  useEffect(() => {
    if (userProfile.name) {
      setShowWelcome(false);
    }
  }, [userProfile.name]);

  const renderView = () => {
    switch (activeView) {
      case 'calendar':
        return <CalendarView />;
      case 'chat':
        return <Chat />;
      case 'shop':
        return <ShopView />;
      case 'profile':
        return <ProfileView />;
      case 'settings':
        return <Settings />;
      default:
        return <CalendarView />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white">
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: 'linear-gradient(to right, #8B5CF6, #EC4899)',
            color: 'white',
            fontWeight: 'bold',
          },
        }}
      />
      {showWelcome && <WelcomeModal onComplete={() => setShowWelcome(false)} />}
      {renderView()}
      <MusicPlayer />
      <BottomNav activeView={activeView} setActiveView={setActiveView} />
    </div>
  );
}

export default App;
