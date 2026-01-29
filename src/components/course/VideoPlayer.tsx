
import React from 'react';
import { Play } from 'lucide-react';

interface VideoPlayerProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  currentLessonData: any;
}

const VideoPlayer = ({ isPlaying, setIsPlaying, currentLessonData }: VideoPlayerProps) => {
  return (
    <div className="bg-black flex-1 flex items-center justify-center relative">
      <div className="text-center text-white">
        {isPlaying ? (
          <div className="space-y-4">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm animate-pulse">
              <div className="w-6 h-6 bg-white rounded-full animate-ping" />
            </div>
            <p className="text-xl">Playing: {currentLessonData?.title}</p>
          </div>
        ) : (
          <div className="space-y-4">
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto hover:bg-blue-700 transition-all duration-300 hover:scale-110"
            >
              <Play className="h-12 w-12 ml-1" />
            </button>
            <h3 className="text-2xl font-semibold">{currentLessonData?.title}</h3>
            <p className="text-white/80">Click to start lesson</p>
          </div>
        )}
      </div>

      {/* Learning stats overlay */}
      <div className="absolute bottom-6 left-6 bg-black/50 backdrop-blur-sm rounded-lg p-4 text-white">
        <p className="text-sm">90,234 people are learning right now.</p>
      </div>

      {/* XP indicator */}
      <div className="absolute bottom-6 right-6 bg-yellow-500 text-black px-3 py-1 rounded-full font-semibold">
        XP 40
      </div>
    </div>
  );
};

export default VideoPlayer;
