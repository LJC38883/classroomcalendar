import React, { useState, useEffect, useRef } from 'react';
import { Music, Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Howl } from 'howler';

const tracks = [
  { 
    id: 1, 
    name: 'Focus Flow', 
    artist: 'Study Beats', 
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  { 
    id: 2, 
    name: 'Calm Waters', 
    artist: 'Nature Sounds', 
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
  },
  { 
    id: 3, 
    name: 'Concentration', 
    artist: 'Lo-Fi Mix', 
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
  },
];

export const MusicPlayer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(tracks[0]);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const soundRef = useRef<Howl | null>(null);

  useEffect(() => {
    // Load user preference from session storage
    const savedState = sessionStorage.getItem('musicPlayerState');
    if (savedState) {
      const state = JSON.parse(savedState);
      setIsOpen(state.isOpen);
      setVolume(state.volume);
      setIsMuted(state.isMuted);
    }
  }, []);

  useEffect(() => {
    // Save state to session storage
    sessionStorage.setItem('musicPlayerState', JSON.stringify({
      isOpen,
      volume,
      isMuted,
    }));
  }, [isOpen, volume, isMuted]);

  useEffect(() => {
    if (soundRef.current) {
      soundRef.current.unload();
    }

    soundRef.current = new Howl({
      src: [currentTrack.url],
      html5: true,
      volume: isMuted ? 0 : volume / 100,
      onend: () => {
        handleNextTrack();
      }
    });

    return () => {
      if (soundRef.current) {
        soundRef.current.unload();
      }
    };
  }, [currentTrack]);

  useEffect(() => {
    if (soundRef.current) {
      soundRef.current.volume(isMuted ? 0 : volume / 100);
    }
  }, [volume, isMuted]);

  const handlePlayPause = () => {
    if (!soundRef.current) return;

    if (isPlaying) {
      soundRef.current.pause();
    } else {
      soundRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNextTrack = () => {
    const currentIndex = tracks.findIndex(t => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % tracks.length;
    
    if (soundRef.current) {
      soundRef.current.stop();
    }
    
    setCurrentTrack(tracks[nextIndex]);
    setIsPlaying(false);
  };

  const handlePrevTrack = () => {
    const currentIndex = tracks.findIndex(t => t.id === currentTrack.id);
    const prevIndex = currentIndex === 0 ? tracks.length - 1 : currentIndex - 1;
    
    if (soundRef.current) {
      soundRef.current.stop();
    }
    
    setCurrentTrack(tracks[prevIndex]);
    setIsPlaying(false);
  };

  return (
    <>
      {/* Music Toggle Button */}
      <motion.button
        className="music-toggle-button"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Toggle music player"
      >
        <Music size={20} />
      </motion.button>

      {/* Music Player Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="music-player"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
          >
            <div className="music-player-header">
              <h3 className="music-player-title">Music Player</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="music-close-button"
                aria-label="Close music player"
              >
                <X size={18} />
              </button>
            </div>

            <div className="music-track-info">
              <p className="track-name">{currentTrack.name}</p>
              <p className="track-artist">{currentTrack.artist}</p>
            </div>

            <div className="music-controls">
              <button
                onClick={handlePrevTrack}
                className="music-control-button"
                aria-label="Previous track"
              >
                <SkipBack size={18} />
              </button>
              
              <button
                onClick={handlePlayPause}
                className="music-play-button"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
              
              <button
                onClick={handleNextTrack}
                className="music-control-button"
                aria-label="Next track"
              >
                <SkipForward size={18} />
              </button>
            </div>

            <div className="music-volume">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="volume-button"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
              
              <input
                type="range"
                min="0"
                max="100"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setVolume(Number(e.target.value));
                  setIsMuted(false);
                }}
                className="volume-slider"
                aria-label="Volume"
              />
              
              <span className="volume-value">{isMuted ? 0 : volume}%</span>
            </div>

            <div className="music-tracks">
              {tracks.map((track) => (
                <button
                  key={track.id}
                  onClick={() => {
                    if (soundRef.current) soundRef.current.stop();
                    setCurrentTrack(track);
                    setIsPlaying(false);
                  }}
                  className={`track-item ${currentTrack.id === track.id ? 'active' : ''}`}
                >
                  <span className="track-item-name">{track.name}</span>
                  <span className="track-item-artist">{track.artist}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
