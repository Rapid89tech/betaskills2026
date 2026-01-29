import React from 'react';

// Helper function to parse inline formatting like **bold**
export const parseInlineFormatting = (text: string) => {
  if (!text.includes('**')) return text;
  
  const parts = text.split(/(\*\*.*?\*\*)/);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} className="font-bold">{part.replace(/\*\*/g, '')}</strong>;
    }
    return part;
  });
};