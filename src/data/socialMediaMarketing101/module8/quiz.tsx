import type { Quiz } from '@/types/course';

export const module8Quiz: Quiz = {
  id: 8,
  title: 'Module 8 Quiz: Social Media Management Tools',
  duration: '20 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the primary purpose of social media scheduling tools?',
        options: [
          'To create website designs',
          'To plan, create, and automate content publishing',
          'To manage website SEO',
          'To host webinars'
        ],
        correct: 1,
        explanation: 'Social media scheduling tools are designed to plan, create, and automate the publishing of content across multiple platforms from a single interface, saving time and maintaining consistency.'
      },
      {
        question: 'Which of the following is NOT a benefit of using scheduling tools?',
        options: [
          'Time efficiency',
          'Consistent posting',
          'Analytics and insights',
          'Direct email marketing'
        ],
        correct: 3,
        explanation: 'Direct email marketing is not a benefit of social media scheduling tools. The key benefits include time efficiency, consistent posting, analytics, team collaboration, and cross-platform management.'
      },
      {
        question: 'Which social media scheduling tool is best suited for small businesses and creators seeking simplicity and affordability?',
        options: [
          'Hootsuite',
          'Buffer',
          'Later',
          'Brandwatch'
        ],
        correct: 1,
        explanation: 'Buffer is best suited for small businesses and creators as it offers simplicity, affordability, a user-friendly interface, and a robust free plan.'
      },
      {
        question: 'Which scheduling tool offers a visual drag-and-drop Instagram grid preview and strong ecommerce integration?',
        options: [
          'Buffer',
          'Hootsuite',
          'Later',
          'Contentful'
        ],
        correct: 2,
        explanation: 'Later offers a visual drag-and-drop Instagram grid preview and strong e-commerce integration through its Linkin.bio feature, making it ideal for visual brands.'
      },
      {
        question: 'Hootsuite is particularly useful for:',
        options: [
          'Solo creators managing one social account',
          'Mid-sized to large teams needing advanced analytics and social listening',
          'Instagram-first visual brands',
          'Offline content creation'
        ],
        correct: 1,
        explanation: 'Hootsuite is particularly useful for mid-sized to large teams and enterprises that need advanced analytics, social listening, and robust team workflows for managing multiple accounts.'
      },
      {
        question: 'What feature is unique to Later compared to Buffer and Hootsuite?',
        options: [
          'Multi-platform scheduling',
          'Instagram grid preview and Linkin.bio for shoppable links',
          'Team collaboration approval workflows',
          'Social listening streams'
        ],
        correct: 1,
        explanation: 'Later\'s unique features include Instagram grid preview and Linkin.bio for creating shoppable links, which are specifically designed for visual brands and e-commerce.'
      },
      {
        question: 'Which tool provides AI-powered post suggestions and caption generation?',
        options: [
          'Buffer and Hootsuite',
          'Later only',
          'Contentful',
          'GA4'
        ],
        correct: 0,
        explanation: 'Both Buffer and Hootsuite provide AI-powered features including post suggestions and caption generation to help streamline content creation.'
      },
      {
        question: 'How can scheduling tools be combined with GA4 for better insights?',
        options: [
          'By creating graphics in Canva',
          'By adding UTM parameters to track traffic and conversions',
          'By posting manually at random times',
          'By sending newsletters'
        ],
        correct: 1,
        explanation: 'Scheduling tools can be combined with GA4 by adding UTM parameters to links in scheduled posts, allowing you to track traffic sources and conversions from social media campaigns.'
      },
      {
        question: 'Which of the following is a common challenge of social media scheduling tools?',
        options: [
          'Overuse of hashtags',
          'Platform limitations and data discrepancies',
          'Too many emojis',
          'Offline file management'
        ],
        correct: 1,
        explanation: 'Common challenges include platform limitations (e.g., auto-publish restrictions), data discrepancies between tools and native analytics, and API changes affecting functionality.'
      },
      {
        question: 'What is the best practice when using scheduling tools to optimize social media strategy?',
        options: [
          'Post at random times to test engagement',
          'Batch content creation, use analytics, and adjust based on performance data',
          'Only focus on one social media platform',
          'Avoid using free plans'
        ],
        correct: 1,
        explanation: 'The best practice is to batch content creation for efficiency, use analytics to identify optimal posting times and high-performing content, and adjust strategies based on performance data to continuously improve results.'
      }
    ]
  }
};

