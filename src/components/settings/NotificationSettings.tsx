import React from 'react';
import { Volume2 } from 'lucide-react';

interface NotificationSettingsProps {
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  onSoundChange: (value: boolean) => void;
  onVibrationChange: (value: boolean) => void;
}

export const NotificationSettings: React.FC<NotificationSettingsProps> = ({ 
  soundEnabled, 
  vibrationEnabled, 
  onSoundChange, 
  onVibrationChange 
}) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
        <Volume2 size={24} />
        Sound & Notifications
      </h2>
      
      <div className="space-y-4">
        <label className="flex items-center justify-between">
          <span className="font-semibold text-gray-700">Sound Effects</span>
          <input
            type="checkbox"
            checked={soundEnabled}
            onChange={(e) => onSoundChange(e.target.checked)}
            className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
          />
        </label>
        
        <label className="flex items-center justify-between">
          <span className="font-semibold text-gray-700">Vibration</span>
          <input
            type="checkbox"
            checked={vibrationEnabled}
            onChange={(e) => onVibrationChange(e.target.checked)}
            className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
          />
        </label>
      </div>
    </div>
  );
};
