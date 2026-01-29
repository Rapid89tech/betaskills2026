import React from 'react';
import { parseInlineFormatting } from './InlineFormatters';

const getRandomEmoji = () => {
  const emojis = ['🎯', '🚀', '✨', '💡', '🔥', '⭐', '🎨', '🌟', '💎', '🎪', '🎭', '🎨', '🎬', '🎵', '🎸', '🎺', '🎻', '🥁', '🎤', '🎧', '📚', '📖', '📝', '📊', '📈', '📉', '📋', '📌', '📍', '📎', '📂', '📁', '🗂️', '🗃️', '🗄️', '📇', '📑', '📒', '📓', '📔', '📕', '📗', '📘', '📙', '📰', '🗞️', '📄', '📃', '📜', '📦'];
  return emojis[Math.floor(Math.random() * emojis.length)];
};

export const formatHeaders = (line: string, lineIndex: number) => {
  // Handle headers with modern styling and dynamic animated emojis
  if (line.startsWith('### ')) {
    const emoji = getRandomEmoji();
    return (
      <h3 key={`h3-${lineIndex}`} className="group relative text-sm md:text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-purple-600 to-indigo-700 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 mt-4 mb-2 transform transition-all duration-300 hover:scale-105 animate-fade-in">
        <span className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10 rounded-lg -z-10 transform scale-0 group-hover:scale-100 transition-transform duration-300"></span>
        <span className="inline-block mr-2 text-lg animate-bounce group-hover:animate-spin transition-all duration-300">{emoji}</span>
        {line.replace('### ', '')}
      </h3>
    );
  }
  if (line.startsWith('## ')) {
    const emoji = getRandomEmoji();
    return (
      <h2 key={`h2-${lineIndex}`} className="group relative text-base md:text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 via-purple-700 to-indigo-800 dark:from-blue-300 dark:via-purple-300 dark:to-indigo-300 mt-5 mb-3 transform transition-all duration-300 hover:scale-105 animate-fade-in">
        <span className="absolute inset-0 bg-gradient-to-r from-blue-500/15 via-purple-500/15 to-indigo-500/15 rounded-xl -z-10 transform scale-0 group-hover:scale-100 transition-transform duration-300"></span>
        <span className="inline-block mr-2 text-xl animate-pulse group-hover:animate-bounce transition-all duration-300">{emoji}</span>
        {line.replace('## ', '')}
      </h2>
    );
  }
  if (line.startsWith('# ')) {
    const emoji = getRandomEmoji();
    return (
      <h1 key={`h1-${lineIndex}`} className="group relative text-lg md:text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-purple-800 to-indigo-900 dark:from-blue-200 dark:via-purple-200 dark:to-indigo-200 mb-5 transform transition-all duration-300 hover:scale-105 animate-fade-in">
        <span className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-indigo-500/20 rounded-2xl -z-10 transform scale-0 group-hover:scale-100 transition-transform duration-300"></span>
        <span className="inline-block mr-2 text-2xl animate-pulse group-hover:animate-spin transition-all duration-500">{emoji}</span>
        {line.replace('# ', '')}
      </h1>
    );
  }
  return null;
};

export const formatEmojiPoints = (line: string, lineIndex: number) => {
  // Handle emoji bullets and important points first (more specific)
  const emojiPrefixes = ['🎯', '💡', '✅', '🔧', '⚡', '🛠️', '📊', '🌡️', '🔍', '🦺', '⚙️', '🛑', '🚗', '⛽', '🔥', '🔄', '💧', '🔬', '⚖️', '💻', '📋', '🎤', '🔊', '🎵', '📻', '🎧', '🎼'];
  
  const hasEmojiPrefix = emojiPrefixes.some(emoji => line.startsWith(emoji));
  
  if (hasEmojiPrefix) {
    return (
      <div 
        key={`emoji-${lineIndex}`} 
        className="group relative my-3 transform transition-all duration-500 hover:scale-[1.02] animate-fade-in"
        style={{ animationDelay: `${lineIndex * 100}ms` }}
      >
        {/* Background Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10 rounded-xl transform scale-95 group-hover:scale-100 transition-transform duration-300 opacity-0 group-hover:opacity-100"></div>
        
        <div className="relative bg-gradient-to-br from-white via-blue-50/50 to-purple-50/50 dark:from-gray-800/80 dark:via-blue-900/20 dark:to-purple-900/20 border border-blue-200/50 dark:border-blue-700/30 p-3 rounded-xl shadow-lg backdrop-blur-sm hover:shadow-xl transition-all duration-300">
          {/* Animated Border */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-indigo-500/50 opacity-0 group-hover:opacity-20 transition-opacity duration-300 animate-pulse"></div>
          
          <p className="relative text-gray-800 dark:text-gray-200 font-medium flex items-start text-sm">
            <span className="mr-3 text-xl transform transition-transform duration-300 hover:scale-125 hover:rotate-12 cursor-pointer">
              {line.charAt(0)}
            </span>
            <span className="flex-1 leading-relaxed">{parseInlineFormatting(line.substring(1).trim())}</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export const formatBoldLines = (line: string, lineIndex: number) => {
  // Handle bold lines with ultra-modern styling
  if (line.startsWith('**') && line.endsWith('**')) {
    return (
      <p key={`bold-${lineIndex}`} className="group relative font-bold text-base md:text-lg text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 dark:from-indigo-400 dark:via-purple-400 dark:to-blue-400 my-3 transform transition-all duration-300 hover:scale-105">
        <span className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-blue-500/10 rounded-lg -z-10 transform scale-0 group-hover:scale-100 transition-transform duration-300"></span>
        💎 {line.replace(/\*\*/g, '')}
      </p>
    );
  }
  return null;
};

export const formatBulletPoints = (line: string, lineIndex: number) => {
  // Handle ALL types of bullet points with ultra-modern styling
  // Aggressively strip all leading bullet characters and whitespace
  if (line.match(/^\s*([-•]+\s*)+/)) {
    const bulletText = line.replace(/^\s*([-•]+\s*)+/, '').trim();
    return (
      <div
        key={`bullet-${lineIndex}`}
        className="group relative flex items-start my-2 p-3 bg-gradient-to-r from-gray-50/80 via-blue-50/40 to-purple-50/40 dark:from-gray-800/50 dark:via-blue-900/20 dark:to-purple-900/20 rounded-lg border border-gray-200/50 dark:border-gray-700/30 transform transition-all duration-300 hover:scale-[1.03] hover:shadow-lg backdrop-blur-sm animate-fade-in reveal-on-scroll"
        style={{ animationDelay: `${lineIndex * 80}ms` }}
      >
        {/* Animated Bullet Point */}
        <div className="flex-shrink-0 relative">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 mr-3 mt-1.5 shadow-md transform transition-all duration-300 group-hover:scale-125 group-hover:rotate-180 animate-pulse"></div>
          <div className="absolute inset-0 w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 animate-ping opacity-20"></div>
        </div>
        <p className="text-gray-700 dark:text-gray-300 flex-1 leading-relaxed text-base font-medium animate-fade-in" style={{ animationDelay: `${lineIndex * 100 + 100}ms` }}>{parseInlineFormatting(bulletText)}</p>
      </div>
    );
  }
  return null;
};

export const formatRegularText = (line: string, lineIndex: number) => {
  // Regular paragraphs with modern styling and inline formatting
  return (
    <p key={`text-${lineIndex}`} className="text-gray-700 dark:text-gray-300 my-2 leading-relaxed text-sm font-medium transform transition-all duration-300 hover:text-gray-900 dark:hover:text-gray-100">
      {parseInlineFormatting(line)}
    </p>
  );
};