import React, { useState } from 'react';
import { Music, Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, ChevronUp, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const studyTracks = [
  { id: 1, name: 'Deep Focus', artist: 'Study Vibes', duration: '45:00' },
  { id: 2, name: 'Rain Sounds', artist: 'Nature', duration: '60:00' },
  { id: 3, name: 'Lo-Fi Beats', artist: 'Chill Hop', duration: '30:00' },
  { id: 4, name: 'Piano Meditation', artist: 'Classical', duration: '25:00' },
  { id: 5, name: 'Ocean Waves', artist: 'Nature', duration: '55:00' },
];

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(studyTracks[0]);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNextTrack = () => {
    const currentIndex = studyTracks.findIndex(t => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % studyTracks.length;
    setCurrentTrack(studyTracks[nextIndex]);
  };

  const handlePrevTrack = () => {
    const currentIndex = studyTracks.findIndex(t => t.id === currentTrack.id);
    const prevIndex = currentIndex === 0 ? studyTracks.length - 1 : currentIndex - 1;
    setCurrentTrack(studyTracks[prevIndex]);
  };

  return (
    <motion.div
      className="fixed bottom-24 right-4 z-40"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="absolute bottom-16 right-0 w-80 glass-card p-4 mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <h3 className="font-bold mb-3">Study Music</h3>
            
            {/* Track List */}
            <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
              {studyTracks.map((track) => (
                <button
                  key={track.id}
                  onClick={() => setCurrentTrack(track)}
                  className={`w-full text-left p-2 rounded-lg transition-colors ${
                    currentTrack.id === track.id
                      ? 'bg-gradient-to-r from-purple-100 to-pink-100'
                      : 'hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{track.name}</p>
                      <p className="text-xs text-slate-600">{track.artist}</p>
                    </div>
                    <span className="text-xs text-slate-500">{track.duration}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-1"
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
                className="flex-1 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${volume}%, #e2e8f0 ${volume}%, #e2e8f0 100%)`
                }}
              />
              <span className="text-xs w-8 text-right">{isMuted ? 0 : volume}%</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Player Widget */}
      <motion.div
        className="glass-card p-3 flex items-center gap-3"
        whileHover={{ scale: 1.05 }}
      >
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevTrack}
            className="p-1 hover:bg-white/50 rounded-lg transition-colors"
          >
            <SkipBack size={16} />
          </button>
          
          <button
            onClick={handlePlayPause}
            className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white"
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
          </button>
          
          <button
            onClick={handleNextTrack}
            className="p-1 hover:bg-white/50 rounded-lg transition-colors"
          >
            <SkipForward size={16} />
          </button>
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium truncate">{currentTrack.name}</p>
          <p className="text-xs text-slate-600 truncate">{currentTrack.artist}</p>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 hover:bg-white/50 rounded-lg transition-colors"
        >
          {isExpanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
        </button>
      </motion.div>
    </motion.div>
  );
};
