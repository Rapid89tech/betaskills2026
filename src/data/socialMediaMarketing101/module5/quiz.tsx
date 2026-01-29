import type { Quiz } from '@/types/course';

export const module5Quiz: Quiz = {
  id: 5,
  title: 'Module 5 Quiz: Paid Social Media Advertising',
  duration: '20 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What does PPC stand for in digital advertising?',
        options: [
          'Pay Per Click',
          'Post Promotion Campaign',
          'Paid Product Content',
          'Platform Paid Conversion'
        ],
        correct: 0,
        explanation: 'PPC stands for Pay Per Click, a model where advertisers pay each time a user clicks their ad, typically used on search engines or display networks.'
      },
      {
        question: 'Which of the following is a key benefit of PPC advertising?',
        options: [
          'Precise targeting and measurable results',
          'Guaranteed viral social media posts',
          'Free advertising on search engines',
          'Automated content creation'
        ],
        correct: 0,
        explanation: 'PPC advertising offers precise targeting and measurable results, allowing businesses to reach specific audiences and track performance metrics like CTR and conversions.'
      },
      {
        question: 'Which ad format is commonly used for PPC campaigns on Google Ads?',
        options: [
          'Stories and Reels',
          'Text ads, display banners, and video ads',
          'Carousel posts on Instagram',
          'Organic posts on LinkedIn'
        ],
        correct: 1,
        explanation: 'Google Ads PPC campaigns commonly use text ads for search, display banners for website placements, and video ads for YouTube.'
      },
      {
        question: 'Boosted posts are primarily used for:',
        options: [
          'Driving immediate conversions on search engines',
          'Increasing engagement, brand awareness, and reach on social media',
          'Optimizing website SEO',
          'Conducting email marketing campaigns'
        ],
        correct: 1,
        explanation: 'Boosted posts are social media posts promoted with a budget to increase engagement, brand awareness, and reach to a larger or targeted audience.'
      },
      {
        question: 'Which of the following is an example of targeting in boosted posts?',
        options: [
          'Selecting keywords like "productivity app"',
          'Narrowing audience by age, location, interests, or lookalike audiences',
          'Paying only when someone clicks your ad',
          'Writing blog content for organic reach'
        ],
        correct: 1,
        explanation: 'Boosted posts allow targeting by demographics (age, location), interests, behaviors, and lookalike audiences to reach specific user segments.'
      },
      {
        question: 'What is the recommended headline length for a Google search ad?',
        options: [
          'Under 50 characters',
          'Under 80 characters',
          'Under 100 characters',
          'Under 120 characters'
        ],
        correct: 1,
        explanation: 'Google search ad headlines should be kept under 80 characters to highlight value effectively while fitting the display format.'
      },
      {
        question: 'Which metric is commonly used to measure the effectiveness of PPC ads?',
        options: [
          'Cost per Click (CPC)',
          'Follower growth on social media',
          'Likes on Instagram posts',
          'Open rate for emails'
        ],
        correct: 0,
        explanation: 'Cost per Click (CPC) is a key metric for measuring PPC ad effectiveness, indicating how much you pay for each click and helping optimize budget allocation.'
      },
      {
        question: 'What is a best practice when boosting posts on social media?',
        options: [
          'Boost every post regardless of engagement',
          'Boost high-performing posts (e.g., posts with >2% engagement rate)',
          'Avoid using brand colors and fonts',
          'Ignore captions and alt text'
        ],
        correct: 1,
        explanation: 'It\'s best to boost high-performing organic posts that already have good engagement (>2% engagement rate) as they\'re more likely to resonate with a larger audience.'
      },
      {
        question: 'Which statement is TRUE regarding targeting in paid ads?',
        options: [
          'Behavioral targeting ignores user actions like website visits',
          'Interest targeting focuses on user demographics only',
          'Combining demographics, interests, and behavior increases ad precision',
          'Excluding audiences reduces the efficiency of campaigns'
        ],
        correct: 2,
        explanation: 'Combining demographics, interests, and behavior in targeting (layering) increases ad precision by reaching the most relevant audience segments for better results.'
      },
      {
        question: 'What is a key advantage of A/B testing in paid ads?',
        options: [
          'Reduces the need for creative visuals',
          'Optimizes ad copy, visuals, and audience targeting for better CTR and conversions',
          'Guarantees the lowest CPC across all campaigns',
          'Eliminates the need for tracking KPIs'
        ],
        correct: 1,
        explanation: 'A/B testing optimizes ad copy, visuals, and audience targeting by comparing variations to identify what drives better CTR and conversions, improving overall campaign performance.'
      }
    ]
  }
};

