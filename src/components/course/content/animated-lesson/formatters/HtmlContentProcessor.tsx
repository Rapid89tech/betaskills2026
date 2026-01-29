import React from 'react';

interface YouTubeMatch {
  placeholder: string;
  title: string;
  url: string;
}

export const processHtmlContent = (text: string) => {
  // Helper function to extract video ID from various YouTube URL formats
  const extractVideoId = (url: string): string => {
    if (url.includes('youtube.com/watch?v=')) {
      return url.split('v=')[1].split('&')[0];
    } else if (url.includes('youtu.be/')) {
      return url.split('youtu.be/')[1].split('?')[0];
    } else if (url.includes('youtube.com/embed/')) {
      return url.split('embed/')[1].split('?')[0];
    } else if (url.includes('www.youtube.com/watch?')) {
      return url.split('v=')[1].split('&')[0];
    }
    return url;
  };

  // Extract and replace YouTube links with placeholders - handle multiple formats
  const youtubeRegex = /📺\s*YOUTUBE:\s*([^-\n]+?)\s*-\s*(https?:\/\/[^\s<\n]+)/gi;
  const youtubeMatches: YouTubeMatch[] = [];
  let processedHtml = text;
  
  let match;
  let index = 0;
  while ((match = youtubeRegex.exec(text)) !== null) {
    const title = match[1].trim();
    const url = match[2].trim();
    const placeholder = `__YOUTUBE_PLACEHOLDER_${index}__`;
    youtubeMatches.push({ placeholder, title, url });
    processedHtml = processedHtml.replace(match[0], placeholder);
    index++;
  }
  
  // Also check for any remaining YouTube URLs that might not have been caught
  const fallbackYoutubeRegex = /(https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)[^\s<\n]+)/gi;
  let fallbackMatch;
  while ((fallbackMatch = fallbackYoutubeRegex.exec(text)) !== null) {
    const url = fallbackMatch[1].trim();
    // Check if this URL is already in our matches
    const alreadyMatched = youtubeMatches.some(match => match.url === url);
    if (!alreadyMatched) {
      const placeholder = `__YOUTUBE_PLACEHOLDER_${index}__`;
      youtubeMatches.push({ placeholder, title: 'YouTube Video', url });
      processedHtml = processedHtml.replace(fallbackMatch[0], placeholder);
      index++;
    }
  }
  
  // Minimal debug logging
  if (youtubeMatches.length > 0) {
    console.log(`HtmlContentProcessor: Found ${youtubeMatches.length} YouTube video(s)`);
    youtubeMatches.forEach((match, i) => {
      console.log(`HtmlContentProcessor: Video ${i + 1}: "${match.title}" - ${match.url}`);
    });
  }
  
  return (
    <div className="lesson-html-content-modern">
      {(() => {
        return processedHtml.split(/(__YOUTUBE_PLACEHOLDER_\d+__)/).map((part, partIndex) => {
          const youtubeMatch = youtubeMatches.find(yt => yt.placeholder === part);
          if (youtubeMatch) {
            // Extract video ID and render YouTube component
            const videoId = extractVideoId(youtubeMatch.url);
            console.log(`HtmlContentProcessor: Extracted video ID: ${videoId} from URL: ${youtubeMatch.url}`);
            
            if (videoId) {
              // EMERGENCY FIX: Use YouTube nocookie domain + extreme parameters
              const iframeSrc = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=0&fs=1&cc_load_policy=0&iv_load_policy=3&showinfo=0&controls=1&disablekb=1&playsinline=1&origin=${window.location.origin}&widget_referrer=${window.location.origin}&enablejsapi=0&color=white&theme=dark&end=99999999&playlist=${videoId}&loop=1`;

              
              return (
                <div key={`youtube-${partIndex}`} className="my-8 transform translate-y-4 opacity-0 animate-[slideUp_0.6s_ease-out_forwards]" style={{ animationDelay: '200ms' }}>
                  <div className="relative w-full bg-black rounded-xl overflow-hidden shadow-2xl border-4 border-gray-200 transform transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl group">
                    <div className="relative w-full h-0 pb-[56.25%]">
                      <iframe
                         src={iframeSrc}
                         title={youtubeMatch.title}
                         frameBorder="0"
                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                         allowFullScreen
                         className="absolute top-0 left-0 w-full h-full transition-all duration-300"
                         style={{ minHeight: '400px' }}
                       />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              );
            }
          }
          
          // Render regular HTML content with modern styling
          return (
            <div 
              key={`html-${partIndex}`}
              className="modern-content-renderer"
              dangerouslySetInnerHTML={{ __html: part }}
            />
          );
        });
      })()}
      <style>{`
        .lesson-html-content-modern {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.7;
          color: #374151;
        }
        
        .modern-content-renderer {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .modern-content-renderer h2 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1f2937;
          margin: 1rem 0 0.75rem 0;
          padding: 0.5rem 0;
          border-left: 2px solid #ef4444;
          padding-left: 0.75rem;
          background: linear-gradient(135deg, #fef2f2 0%, #fecaca 100%);
          border-radius: 0 6px 6px 0;
          position: relative;
          overflow: hidden;
        }
        
        .modern-content-renderer h2::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(239, 68, 68, 0.1), transparent);
          animation: shimmer 2s infinite;
        }
        
        .modern-content-renderer h3 {
          font-size: 1rem;
          font-weight: 600;
          color: #dc2626;
          margin: 1rem 0 0.5rem 0;
          padding: 0.4rem 0.6rem;
          background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
          border-radius: 6px;
          border-left: 2px solid #ef4444;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        
        .modern-content-renderer h3::before {
          content: '🔧';
          font-size: 1rem;
        }
        
        .modern-content-renderer p {
          font-size: 1.1rem;
          line-height: 1.8;
          margin: 1.5rem 0;
          padding: 1.25rem;
          background: linear-gradient(135deg, #ffffff 0%, #f9fafb 100%);
          border-radius: 16px;
          border: 1px solid #e5e7eb;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        
        .modern-content-renderer p::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
          background: linear-gradient(180deg, #ef4444, #dc2626);
          border-radius: 0 2px 2px 0;
        }
        
        .modern-content-renderer p:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          border-color: #ef4444;
        }
        
        .modern-content-renderer ul {
          margin: 1.5rem 0;
          padding: 1.5rem;
          background: linear-gradient(135deg, #fef7ff 0%, #f3e8ff 100%);
          border-radius: 16px;
          border: 1px solid #e9d5ff;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        
        .modern-content-renderer li {
          font-size: 1.05rem;
          line-height: 1.7;
          margin: 0.75rem 0;
          padding: 0.75rem 1rem;
          background: rgba(255, 255, 255, 0.7);
          border-radius: 8px;
          border-left: 3px solid #a855f7;
          position: relative;
          transition: all 0.3s ease;
        }
        
        .modern-content-renderer li::before {
          content: '⚡';
          position: absolute;
          left: -0.5rem;
          top: 50%;
          transform: translateY(-50%);
          background: white;
          border-radius: 50%;
          padding: 0.25rem;
          font-size: 0.75rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .modern-content-renderer li:hover {
          background: rgba(255, 255, 255, 0.9);
          transform: translateX(4px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        
        .modern-content-renderer strong {
          color: #dc2626;
          font-weight: 700;
          background: linear-gradient(135deg, #fef2f2 0%, #fecaca 100%);
          padding: 0.25rem 0.5rem;
          border-radius: 6px;
          border: 1px solid #fecaca;
        }
        
        .modern-content-renderer em {
          color: #7c3aed;
          font-style: italic;
          font-weight: 600;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};