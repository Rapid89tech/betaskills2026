import type { Quiz } from '@/types/course';

export const module3Quiz: Quiz = {
  id: 3,
  title: 'Module 3 Quiz: Social Media Strategy & Planning',
  duration: '20 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What does the "S" in SMART goals stand for?',
        options: [
          'Simple',
          'Specific',
          'Strategic',
          'Social'
        ],
        correct: 1,
        explanation: 'The "S" in SMART goals stands for Specific, meaning goals should be clearly defined and avoid vague terms.'
      },
      {
        question: 'Which of the following is an example of a measurable social media goal?',
        options: [
          'Improve brand awareness.',
          'Get more followers.',
          'Gain 5,000 new TikTok followers in 3 months.',
          'Be more active on Instagram.'
        ],
        correct: 2,
        explanation: '"Gain 5,000 new TikTok followers in 3 months" is measurable because it includes a specific numeric target and timeframe that can be tracked.'
      },
      {
        question: 'Why is the "Achievable" component important in SMART goals?',
        options: [
          'It ensures goals are ambitious enough to inspire teams.',
          'It ensures goals can realistically be reached with available resources.',
          'It helps track performance with analytics tools.',
          'It sets a clear deadline.'
        ],
        correct: 1,
        explanation: 'The "Achievable" component ensures goals can realistically be reached with available resources, preventing unrealistic expectations that waste time and budget.'
      },
      {
        question: 'Which platform is most suitable for B2B lead generation?',
        options: [
          'TikTok',
          'Instagram',
          'LinkedIn',
          'YouTube'
        ],
        correct: 2,
        explanation: 'LinkedIn is most suitable for B2B lead generation as it focuses on professional networking and allows targeting by industry, job title, and company size.'
      },
      {
        question: 'A company wants to "increase Instagram engagement to 5% by October 28, 2025." Which SMART element does October 28, 2025 represent?',
        options: [
          'Specific',
          'Measurable',
          'Relevant',
          'Time-bound'
        ],
        correct: 3,
        explanation: 'October 28, 2025 represents the Time-bound element of SMART goals, establishing a specific deadline to create urgency and focus.'
      },
      {
        question: 'Driving 1,000 website visits from X posts within 4 weeks is an example of which type of SMART goal?',
        options: [
          'Sales',
          'Engagement',
          'Website traffic',
          'Brand awareness'
        ],
        correct: 2,
        explanation: 'This is a website traffic goal as it specifically focuses on driving visitors to a website through social media link clicks.'
      },
      {
        question: 'Which of these metrics best measures brand awareness on TikTok?',
        options: [
          'Hashtag usage and follower count',
          'Website visits',
          'Instagram engagement rate',
          'LinkedIn ad click-through rate'
        ],
        correct: 0,
        explanation: 'Hashtag usage and follower count are the best metrics for measuring brand awareness on TikTok as they indicate reach and recognition among the target audience.'
      },
      {
        question: 'What is the main advantage of using SMART goals in social media marketing?',
        options: [
          'They guarantee viral content.',
          'They make content creation easier.',
          'They provide focus, clarity, and measurability.',
          'They reduce advertising costs.'
        ],
        correct: 2,
        explanation: 'SMART goals provide focus, clarity, and measurability, ensuring teams understand priorities and can track progress toward specific outcomes.'
      },
      {
        question: 'Which example best illustrates a SMART goal for sales?',
        options: [
          'Sell more products online.',
          'Generate $10,000 in Instagram Shop revenue by October 16, 2025.',
          'Promote new products on Instagram.',
          'Increase e-commerce conversions.'
        ],
        correct: 1,
        explanation: '"Generate $10,000 in Instagram Shop revenue by October 16, 2025" is a SMART goal as it is Specific (Instagram Shop), Measurable ($10,000), Achievable (based on resources), Relevant (supports revenue goals), and Time-bound (October 16, 2025).'
      },
      {
        question: 'Which step comes first when setting SMART social media goals?',
        options: [
          'Researching your audience',
          'Selecting platforms',
          'Setting deadlines',
          'Aligning with business objectives'
        ],
        correct: 3,
        explanation: 'Aligning with business objectives comes first to ensure social media goals support broader business aims like revenue growth or customer retention.'
      }
    ]
  }
};

