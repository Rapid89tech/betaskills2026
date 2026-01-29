import type { Quiz } from '@/types/course';

export const module7Quiz: Quiz = {
  id: 7,
  title: 'Module 7 Quiz: Analytics & Metrics',
  duration: '20 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'Which metric measures the number of unique users who see your content?',
        options: [
          'Impressions',
          'Reach',
          'CTR',
          'Conversions'
        ],
        correct: 1,
        explanation: 'Reach measures the number of unique users who see your content or ad, making it a key metric for brand awareness campaigns.'
      },
      {
        question: 'If your Instagram Reel reaches 15,000 unique users, what metric are you tracking?',
        options: [
          'Engagement',
          'CTR',
          'Reach',
          'Conversions'
        ],
        correct: 2,
        explanation: 'If your Instagram Reel is seen by 15,000 unique users, you are tracking Reach, which measures unique viewers.'
      },
      {
        question: 'Impressions count the total number of times your content is displayed, including:',
        options: [
          'Only new users',
          'Repeated views by the same user',
          'Only paid ads',
          'Organic traffic only'
        ],
        correct: 1,
        explanation: 'Impressions count the total number of times content is displayed, including repeated views by the same user, making it typically 2-3x higher than reach.'
      },
      {
        question: 'If a post has 10,000 reach and 25,000 impressions, what does this suggest?',
        options: [
          'People are ignoring the content',
          'Users are seeing the content multiple times',
          'The ad is too expensive',
          'CTR is too low'
        ],
        correct: 1,
        explanation: 'When impressions (25,000) are higher than reach (10,000), it indicates users are seeing the content multiple times, suggesting good repeated exposure.'
      },
      {
        question: 'Engagement includes which of the following?',
        options: [
          'Clicks, purchases, and form submissions',
          'Likes, comments, shares, and saves',
          'Only impressions',
          'Bounce rate'
        ],
        correct: 1,
        explanation: 'Engagement includes all interactions with content such as likes, comments, shares, and saves on social media platforms.'
      },
      {
        question: 'The formula for Engagement Rate is:',
        options: [
          'Engagement ÷ Conversions',
          'Impressions ÷ Reach',
          'Engagements ÷ Reach',
          'Clicks ÷ Impressions'
        ],
        correct: 2,
        explanation: 'Engagement Rate is calculated as (total engagements ÷ reach) × 100%, with a target of >2% for most social media campaigns.'
      },
      {
        question: 'What does CTR (Click-Through Rate) measure?',
        options: [
          'Total sales from ads',
          '% of users who click a link out of those who saw it',
          'Engagements per reach',
          'Conversion rate'
        ],
        correct: 1,
        explanation: 'CTR (Click-Through Rate) measures the percentage of users who click on a link or ad out of those who saw it, calculated as (clicks ÷ impressions) × 100%.'
      },
      {
        question: 'A Google Ad gets 500 clicks from 12,500 impressions. What is the CTR?',
        options: [
          '2%',
          '3%',
          '4%',
          '5%'
        ],
        correct: 2,
        explanation: 'CTR = (500 clicks ÷ 12,500 impressions) × 100% = 4%. This exceeds the >3% target for Google Ads search campaigns.'
      },
      {
        question: 'Which metric shows how many users completed a desired action (e.g., purchase, sign-up)?',
        options: [
          'Engagement',
          'Conversions',
          'Impressions',
          'CTR'
        ],
        correct: 1,
        explanation: 'Conversions measure the number of users who completed a desired action such as a purchase, sign-up, download, or form submission.'
      },
      {
        question: 'If an ad drives 1,000 clicks and results in 50 sign-ups, what is the conversion rate?',
        options: [
          '2%',
          '5%',
          '10%',
          '50%'
        ],
        correct: 1,
        explanation: 'Conversion Rate = (50 conversions ÷ 1,000 clicks) × 100% = 5%, which meets the typical target of >5% for conversion-focused campaigns.'
      }
    ]
  }
};

