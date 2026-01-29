import type { Quiz } from '@/types/course';

export const module11Quiz: Quiz = {
  id: 11,
  title: 'Module 11 Quiz: Advanced Strategies & Trends',
  duration: '20 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the main feature of social commerce?',
        options: [
          'Selling products through physical stores only',
          'Selling products directly through social media platforms',
          'Promoting posts with no purchase options',
          'Sharing posts without engagement tracking'
        ],
        correct: 1,
        explanation: 'Social commerce refers to selling products or services directly through social media platforms, integrating shopping experiences into user feeds without requiring users to leave the platform.'
      },
      {
        question: 'What are shoppable posts?',
        options: [
          'Posts with trending hashtags only',
          'Posts that allow purchases without leaving the platform',
          'Ads that redirect users to third-party websites',
          'Stories that can\'t include links'
        ],
        correct: 1,
        explanation: 'Shoppable posts are social media posts that include product tags or links, allowing users to browse and purchase items without leaving the platform, creating a seamless shopping experience.'
      },
      {
        question: 'Which platform is best for visual commerce and supports product tags in posts, Stories, and Reels?',
        options: [
          'TikTok Shop',
          'Instagram Shopping',
          'Later',
          'Hootsuite'
        ],
        correct: 1,
        explanation: 'Instagram Shopping is best for visual commerce, supporting product tags in posts, Stories, Reels, and Explore, with in-app checkout features for seamless purchases.'
      },
      {
        question: 'TikTok Shop is particularly effective for which audience type?',
        options: [
          'Older professionals',
          'Younger audiences',
          'LinkedIn users',
          'Pinterest shoppers'
        ],
        correct: 1,
        explanation: 'TikTok Shop is particularly effective for younger audiences (Gen Z) who engage with short-form video content and are driven by viral trends and LIVE shopping events.'
      },
      {
        question: 'Which tool provides Linkin.bio for driving traffic to product pages from shoppable posts?',
        options: [
          'Google Analytics 4 (GA4)',
          'Later',
          'Hootsuite',
          'TikTok Shop'
        ],
        correct: 1,
        explanation: 'Later provides Linkin.bio, a tool for creating a clickable landing page that drives traffic from social media posts to product pages, with analytics for tracking click-throughs.'
      },
      {
        question: 'What is a key function of Google Analytics 4 (GA4) in social commerce?',
        options: [
          'Scheduling posts',
          'Creating AR filters',
          'Tracking conversions and ROI from shoppable posts',
          'Designing influencer campaigns'
        ],
        correct: 2,
        explanation: 'GA4\'s key function in social commerce is tracking traffic, conversions, and ROI from shoppable posts using UTM parameters, ecommerce reports, and AI-powered anomaly detection.'
      },
      {
        question: 'Which platform helps manage and track social commerce campaigns across multiple platforms using social listening?',
        options: [
          'Later',
          'TikTok Shop',
          'Hootsuite',
          'Shopify'
        ],
        correct: 2,
        explanation: 'Hootsuite helps manage and track social commerce campaigns across multiple platforms with features like content scheduling, social listening, and analytics for performance tracking.'
      },
      {
        question: 'Which metric measures the percentage of users clicking on shoppable links?',
        options: [
          'ROI',
          'Click-Through Rate (CTR)',
          'Impressions',
          'Engagement Rate'
        ],
        correct: 1,
        explanation: 'Click-Through Rate (CTR) measures the percentage of users who click on shoppable links out of those who see them, calculated as (clicks ÷ impressions) × 100%.'
      },
      {
        question: 'What recent 2025 trend significantly boosted conversions on TikTok Shop and Instagram?',
        options: [
          'Carousel posts',
          'LIVE shopping events',
          'Static ads only',
          'Blog-style captions'
        ],
        correct: 1,
        explanation: 'LIVE shopping events on TikTok Shop and Instagram significantly boosted conversions in 2025 by enabling real-time purchases, interactive product demonstrations, and limited-time offers.'
      },
      {
        question: 'What is a recommended best practice when using influencers for shoppable posts?',
        options: [
          'Skip compliance hashtags to save space',
          'Use #ad or #sponsored for disclosure compliance',
          'Post only once per campaign',
          'Avoid product tagging in influencer content'
        ],
        correct: 1,
        explanation: 'Best practice requires using #ad or #sponsored hashtags for disclosure compliance per FTC/ASA guidelines, ensuring transparency when influencers promote shoppable products.'
      }
    ]
  }
};

