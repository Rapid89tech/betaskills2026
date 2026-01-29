
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Play, Clock, Users, Star } from 'lucide-react';

const VideoLearning = () => {
  const [activeVideo, setActiveVideo] = useState(0);

  const videos = [
    {
      id: 1,
      title: 'What is Entrepreneurship?',
      description: 'Understanding the fundamentals of entrepreneurship and business creation',
      videoId: 'rRpMrAMesbA',
      duration: '12:45',
      views: '245K',
      rating: 4.9
    },
    {
      id: 2,
      title: 'Entrepreneurial Mindset and Characteristics',
      description: 'Develop the right mindset and key characteristics of successful entrepreneurs',
      videoId: 'aynLyvLcrso',
      duration: '15:32',
      views: '189K',
      rating: 4.8
    },
    {
      id: 3,
      title: 'Business Ecosystem and Tangible',
      description: 'Navigate the business ecosystem and understand tangible business elements',
      videoId: '8bT_LEd65dQ',
      duration: '18:27',
      views: '156K',
      rating: 4.7
    },
    {
      id: 4,
      title: 'Business Model Fundamentals',
      description: 'Learn the core principles of building sustainable business models',
      videoId: 'Z_zthXw0Wb4',
      duration: '22:15',
      views: '298K',
      rating: 4.9
    },
    {
      id: 5,
      title: 'Consumer Marketing Models and Strategies',
      description: 'Master marketing strategies to reach and engage your target audience',
      videoId: 'IjS9eTpmhgk',
      duration: '35:42',
      views: '267K',
      rating: 4.8
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl font-bold mb-6 text-white">
            🎥 Interactive Video Learning
          </h2>
          <p className="text-2xl text-blue-200 max-w-4xl mx-auto leading-relaxed">
            Watch expert-led video lessons and master entrepreneurship fundamentals
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Video Player */}
          <div className="lg:col-span-2">
            <Card className="bg-black/50 backdrop-blur-sm border-white/20 overflow-hidden rounded-2xl shadow-2xl">
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${videos[activeVideo].videoId}?autoplay=0&rel=0&modestbranding=1&disablekb=0&playsinline=1&enablejsapi=1`}
                  title={videos[activeVideo].title}
                  frameBorder="0"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="rounded-t-2xl"
                  loading="lazy"
                ></iframe>
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-white mb-3">
                  {videos[activeVideo].title}
                </h3>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {videos[activeVideo].description}
                </p>
                <div className="flex items-center gap-6 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{videos[activeVideo].duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>{videos[activeVideo].views} views</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span>{videos[activeVideo].rating}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Video Playlist */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white mb-6 text-center lg:text-left">
              Course Playlist
            </h3>
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {videos.map((video, index) => (
                <Card 
                  key={video.id}
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 animate-fade-in ${
                    activeVideo === index 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 border-white/30' 
                      : 'bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20'
                  }`}
                  onClick={() => setActiveVideo(index)}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <div className={`w-16 h-12 rounded-lg flex items-center justify-center ${
                          activeVideo === index ? 'bg-white/20' : 'bg-black/30'
                        }`}>
                          <Play className={`h-6 w-6 ${
                            activeVideo === index ? 'text-white' : 'text-gray-400'
                          }`} />
                        </div>
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className={`font-semibold text-sm line-clamp-2 mb-2 ${
                          activeVideo === index ? 'text-white' : 'text-gray-200'
                        }`}>
                          {video.title}
                        </h4>
                        <div className="flex items-center gap-3 text-xs">
                          <span className={`${
                            activeVideo === index ? 'text-blue-200' : 'text-gray-400'
                          }`}>
                            {video.duration}
                          </span>
                          <span className={`${
                            activeVideo === index ? 'text-blue-200' : 'text-gray-400'
                          }`}>
                            {video.views} views
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-white/20 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">
              Complete Your Learning Journey
            </h3>
            <p className="text-xl text-blue-200 mb-6">
              Watch all videos to unlock your entrepreneurship certificate
            </p>
            <div className="flex justify-center gap-4 mb-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-2xl">📚</span>
                <p className="text-sm text-white font-semibold mt-1">5 Lessons</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-2xl">⏱️</span>
                <p className="text-sm text-white font-semibold mt-1">2+ Hours</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-2xl">🏆</span>
                <p className="text-sm text-white font-semibold mt-1">Certificate</p>
              </div>
            </div>
            <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              Continue Learning →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoLearning;
