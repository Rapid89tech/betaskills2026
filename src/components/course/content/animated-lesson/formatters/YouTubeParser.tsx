import React from 'react';

// Helper function to parse YouTubeVideoRenderer components
export const parseYouTubeRenderer = (text: string) => {
  // Helper function to extract video ID from various YouTube URL formats
  const extractVideoId = (id: string): string => {
    if (id.includes('youtube.com/watch?v=')) {
      return id.split('v=')[1].split('&')[0];
    } else if (id.includes('youtu.be/')) {
      return id.split('youtu.be/')[1].split('?')[0];
    } else if (id.includes('youtube.com/embed/')) {
      return id.split('embed/')[1].split('?')[0];
    } else if (id.includes('www.youtube.com/watch?')) {
      return id.split('v=')[1].split('&')[0];
    }
    return id;
  };

  // Check for <YouTubeVideoRenderer> component format
  const rendererMatch = text.match(/<YouTubeVideoRenderer\s+videoId="([^"]+)"\s+title="([^"]*)"[^>]*\/>/);
  if (rendererMatch) {
    const videoId = extractVideoId(rendererMatch[1]);
    const title = rendererMatch[2] || "Educational Video";
    
    return (
      <div className="my-8 transform translate-y-4 opacity-0 animate-[slideUp_0.6s_ease-out_forwards]" style={{ animationDelay: '200ms' }}>
        <div className="relative w-full bg-black rounded-xl overflow-hidden shadow-2xl border-4 border-gray-200 transform transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl group">
          <div className="relative w-full h-0 pb-[56.25%]">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=0&fs=1&cc_load_policy=1&iv_load_policy=3&showinfo=0&controls=1&disablekb=1&playsinline=1&origin=${window.location.origin}`}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full transition-all duration-300"
              style={{ minHeight: '500px' }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>
    );
  }
  
  return null;
};

// Helper function to parse YouTube links and iframes
export const parseYouTubeLink = (text: string) => {
  // Helper function to extract video ID from various YouTube URL formats
  const extractVideoId = (id: string): string => {
    if (id.includes('youtube.com/watch?v=')) {
      return id.split('v=')[1].split('&')[0];
    } else if (id.includes('youtu.be/')) {
      return id.split('youtu.be/')[1].split('?')[0];
    } else if (id.includes('youtube.com/embed/')) {
      return id.split('embed/')[1].split('?')[0];
    } else if (id.includes('www.youtube.com/watch?')) {
      return id.split('v=')[1].split('&')[0];
    }
    return id;
  };

  // Check for [[VIDEO:videoId]] format first
  const videoTagMatch = text.match(/\[\[VIDEO:([^\]]+)\]\]/);
  if (videoTagMatch) {
    const videoId = extractVideoId(videoTagMatch[1]);
    return (
      <div className="mb-6 transform translate-y-4 opacity-0 animate-[slideUp_0.6s_ease-out_forwards]" style={{ animationDelay: '200ms' }}>
        <div className="relative w-full bg-black rounded-xl overflow-hidden shadow-2xl border-4 border-gray-200 transform transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl group">
          <div className="relative w-full h-0 pb-[56.25%]">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=0&fs=1&cc_load_policy=1&iv_load_policy=3&showinfo=0&controls=1`}
              title="Educational Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
              style={{ minHeight: '500px' }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>
    );
  }

  // First check for iframe tags
  const iframeMatch = text.match(/<iframe[^>]*src=["']([^"']*youtube[^"']*)"[^>]*>/i);
  if (iframeMatch) {
    const src = iframeMatch[1];
    let videoId = '';
    
    // Extract video ID from iframe src
    if (src.includes('youtube.com/embed/')) {
      videoId = src.split('embed/')[1].split('?')[0];
    } else if (src.includes('youtube.com/watch?v=')) {
      videoId = src.split('v=')[1].split('&')[0];
    }
    
    if (videoId) {
      return (
        <div className="mb-6 transform translate-y-4 opacity-0 animate-[slideUp_0.6s_ease-out_forwards]" style={{ animationDelay: '200ms' }}>
          <div className="relative w-full bg-black rounded-lg overflow-hidden shadow-lg">
            <div className="relative w-full h-0 pb-[56.25%]">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=0&fs=1&cc_load_policy=1&iv_load_policy=3&showinfo=0&controls=1&disablekb=1&playsinline=1&origin=${window.location.origin}`}
                title="Educational Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
                style={{ minHeight: '500px' }}
              />
            </div>
          </div>
        </div>
      );
    }
  }

  // More flexible YouTube link detection
  const youtubePatterns = [
    /🎬\s*YOUTUBE\s*LINK:\s*(.+)/i,
    /📺\s*YOUTUBE\s*LINK:\s*(.+)/i,
    /YOUTUBE\s*LINK:\s*(.+)/i,
    /🎥\s*(.+youtube\.com.+)/i,
    /🎥\s*(.+youtu\.be.+)/i,
    /📺\s*YOUTUBE:\s*(.+)\s*-\s*(https?:\/\/[^\s]+)/i,  // New pattern for Sound Engineering
    /📺\s*YOUTUBE:\s*([^-]+)\s*-\s*(https?:\/\/[^\s]+)/i, // Alternative pattern
    /YOUTUBE:\s*([^-]+)\s*-\s*(https?:\/\/[^\s]+)/i, // Without emoji
  ];
  
  let url = '';
  let title = '';
  for (const pattern of youtubePatterns) {
    const match = text.match(pattern);
    if (match) {
      if (match.length > 2) {
        // Pattern with title and URL
        title = match[1].trim();
        url = match[2].trim();
      } else {
        // Pattern with just URL
        url = match[1].trim();
      }
      break;
    }
  }
  
  if (url) {
    let videoId = '';
    
    // Extract video ID from various YouTube URL formats
    if (url.includes('youtube.com/watch?v=')) {
      videoId = url.split('v=')[1].split('&')[0];
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    } else if (url.includes('youtube.com/embed/')) {
      videoId = url.split('embed/')[1].split('?')[0];
    }
    
    if (videoId) {
      return (
        <div className="mb-6 transform translate-y-4 opacity-0 animate-[slideUp_0.6s_ease-out_forwards]" style={{ animationDelay: '200ms' }}>
          <div className="relative w-full bg-black rounded-xl overflow-hidden shadow-2xl border-4 border-gray-200 transform transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl group">
            <div className="relative w-full h-0 pb-[56.25%]">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=0&fs=1&cc_load_policy=1&iv_load_policy=3&showinfo=0&controls=1`}
                title={title || "Educational Video"}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full transition-all duration-300"
                style={{ minHeight: '500px' }}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
      );
    }
  }
  
  return null;
};