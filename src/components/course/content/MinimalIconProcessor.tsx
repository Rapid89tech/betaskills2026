import React from 'react';
import { replaceEmojiIcons } from '@/utils/courseIcons';

interface MinimalIconProcessorProps {
  content: string;
  children?: React.ReactNode;
}

const MinimalIconProcessor: React.FC<MinimalIconProcessorProps> = ({ content, children }) => {
  const processedContent = replaceEmojiIcons(content);
  
  if (children) {
    return <>{children}</>;
  }
  
  return (
    <div 
      dangerouslySetInnerHTML={{ __html: processedContent }}
      className="prose prose-lg max-w-none"
    />
  );
};

export default MinimalIconProcessor;
