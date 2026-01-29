import type { Quiz } from '@/types/course';

export const module9Quiz: Quiz = {
  id: 9,
  title: 'Module 9 Quiz: Influencer Marketing & Collaborations',
  duration: '20 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What does influencer identification primarily involve?',
        options: [
          'Creating new social media platforms',
          'Selecting influencers who align with brand objectives',
          'Tracking competitors\' marketing strategies',
          'Paying celebrities for endorsements'
        ],
        correct: 1,
        explanation: 'Influencer identification primarily involves researching and selecting content creators whose audience, content, and values align with your brand\'s objectives.'
      },
      {
        question: 'Which of the following is not a benefit of identifying suitable influencers?',
        options: [
          'Expanding reach',
          'Building trust',
          'Increasing fake followers',
          'Boosting ROI'
        ],
        correct: 2,
        explanation: 'Increasing fake followers is NOT a benefit. The actual benefits include expanding reach, building trust, driving engagement, and boosting ROI through authentic partnerships.'
      },
      {
        question: 'Which tool is best known for verifying influencer authenticity and detecting fake followers?',
        options: [
          'Later',
          'HypeAuditor',
          'Upfluence',
          'GA4'
        ],
        correct: 1,
        explanation: 'HypeAuditor is best known for its AI-driven audience analysis to detect fake followers and verify influencer authenticity with authenticity scores.'
      },
      {
        question: 'What engagement rate is typically expected from nano-influencers (1,000–10,000 followers)?',
        options: [
          '0.5–1%',
          '1–2%',
          '2–5%',
          '5–10%'
        ],
        correct: 3,
        explanation: 'Nano-influencers (1,000–10,000 followers) typically achieve 5–10% engagement rates due to their highly engaged, niche audiences.'
      },
      {
        question: 'Which platform is best suited for Instagram-focused influencer discovery and visual campaign planning?',
        options: [
          'Upfluence',
          'GA4',
          'Later',
          'Twitch'
        ],
        correct: 2,
        explanation: 'Later is best suited for Instagram-focused influencer discovery with its hashtag tracking, visual content planner, and Linkin.bio features.'
      },
      {
        question: 'What feature in GA4 helps marketers identify sudden performance shifts in influencer campaigns?',
        options: [
          'Consent Mode v2',
          'Anomaly detection',
          'UTM tracking',
          'Linkin.bio integration'
        ],
        correct: 1,
        explanation: 'GA4\'s AI-powered anomaly detection (updated September 2024) helps identify sudden performance shifts in campaigns, enabling quick strategic adjustments.'
      },
      {
        question: 'According to 2025 trends, which type of influencer delivers 30% higher engagement for niche brands?',
        options: [
          'Macro-influencers',
          'Celebrity influencers',
          'Nano-influencers',
          'AI-generated influencers'
        ],
        correct: 2,
        explanation: 'Nano-influencers deliver 30% higher engagement for niche brands due to their highly engaged, authentic audiences and targeted reach.'
      },
      {
        question: 'Which step in identifying influencers focuses on reviewing tone, aesthetics, and values?',
        options: [
          'Audience alignment',
          'Content quality evaluation',
          'Campaign goal setting',
          'UTM parameter tracking'
        ],
        correct: 1,
        explanation: 'Content quality evaluation focuses on reviewing an influencer\'s tone, aesthetics, and values to ensure they align with your brand identity.'
      },
      {
        question: 'What is the main purpose of using UTM parameters with influencers?',
        options: [
          'To track influencer payments',
          'To measure website traffic and conversions in GA4',
          'To verify follower authenticity',
          'To automate outreach messages'
        ],
        correct: 1,
        explanation: 'UTM parameters are used to track website traffic and conversions in GA4 from influencer-specific links, allowing precise campaign attribution and ROI measurement.'
      },
      {
        question: 'What is considered a best practice for identifying suitable influencers?',
        options: [
          'Focus only on follower count',
          'Avoid long-term relationships',
          'Align with brand values and verify authenticity',
          'Ignore engagement rates if reach is high'
        ],
        correct: 2,
        explanation: 'Best practice is to align with brand values and verify authenticity using tools like HypeAuditor, rather than focusing solely on follower count or reach.'
      }
    ]
  }
};

