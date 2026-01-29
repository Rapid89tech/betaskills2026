
import { generatePodcastContent } from './content-generators/PodcastContentGenerator';
import { generateMechanicContent } from './content-generators/MechanicContentGenerator';
import { generateEntrepreneurshipContent } from './content-generators/EntrepreneurshipContentGenerator';
import { generateDefaultContent } from './content-generators/DefaultContentGenerator';
import type { VideoLesson } from '@/types/course';

export const generateFallbackContent = (lesson: VideoLesson): string => {
  const title = lesson.title;
  
  // Check if content contains HTML and skip it entirely for clean markdown generation
  if (lesson.content?.textContent && lesson.content.textContent.trim()) {
    const existingContent = lesson.content.textContent.trim();
    
    // Skip any HTML content - we want clean markdown
    if (existingContent.includes('<div') || 
        existingContent.includes('<h2>') || 
        existingContent.includes('<ul>') ||
        existingContent.includes('<li>') ||
        existingContent.includes('<p>') ||
        existingContent.includes('class=')) {
      // Skip HTML content and generate clean markdown instead
      console.log('Skipping HTML content for:', title);
    } else if (existingContent !== '#' && 
               !existingContent.startsWith('# \n') &&
               !existingContent.startsWith('#\n') &&
               existingContent.length > 5) {
      return existingContent;
    }
  }
  
  // Check for mechanic content first (more specific)
  const mechanicContent = generateMechanicContent(title);
  if (mechanicContent && mechanicContent.trim() && mechanicContent.trim().length > 10) {
    return mechanicContent;
  }
  
  // Check for podcast content
  if (title.toLowerCase().includes('podcast') || title.toLowerCase().includes('audio') || 
      title.toLowerCase().includes('recording') || title.toLowerCase().includes('content') ||
      title.toLowerCase().includes('marketing') || title.toLowerCase().includes('monetization') ||
      title.toLowerCase().includes('hosting') || title.toLowerCase().includes('distribution') ||
      title.toLowerCase().includes('analytics') || title.toLowerCase().includes('sponsorship') ||
      title.toLowerCase().includes('listener') || title.toLowerCase().includes('affiliate')) {
    
    const podcastContent = generatePodcastContent(title);
    if (podcastContent && podcastContent.trim() && podcastContent.trim().length > 10) {
      return podcastContent;
    }
  }
  
  // Check for entrepreneurship content
  const entrepreneurshipContent = generateEntrepreneurshipContent(title);
  if (entrepreneurshipContent && entrepreneurshipContent.trim() && entrepreneurshipContent.trim().length > 10) {
    return entrepreneurshipContent;
  }
  
  // Default fallback - always returns content
  return generateDefaultContent(title);
};
