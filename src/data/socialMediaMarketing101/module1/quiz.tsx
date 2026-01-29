import type { Quiz } from '@/types/course';

export const module1Quiz: Quiz = {
  id: 1,
  title: 'Module 1 Quiz: Introduction to Social Media Marketing',
  duration: '20 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the primary goal of social media marketing (SMM)?',
        options: [
          'To sell products exclusively through physical stores',
          'To engage audiences, build brand awareness, drive website traffic, and generate leads or sales',
          'To replace traditional marketing completely',
          'To create mobile apps for businesses'
        ],
        correct: 1,
        explanation: 'Social media marketing aims to engage audiences, build brand awareness, drive website traffic, and generate leads or sales through strategic use of social media platforms.'
      },
      {
        question: 'Which of the following is NOT considered a key component of social media marketing?',
        options: [
          'Content creation',
          'Audience engagement',
          'Analytics and tracking',
          'Product packaging'
        ],
        correct: 3,
        explanation: 'Product packaging is not a component of social media marketing. The key components include content creation, audience engagement, advertising, analytics and tracking, influencer marketing, and community management.'
      },
      {
        question: 'Which social media platform is best suited for B2B marketing and professional networking?',
        options: [
          'Instagram',
          'LinkedIn',
          'TikTok',
          'X'
        ],
        correct: 1,
        explanation: 'LinkedIn is specifically designed for professional networking and B2B marketing, making it the ideal platform for connecting with business professionals and decision-makers.'
      },
      {
        question: 'Which of the following describes "audience engagement" in social media marketing?',
        options: [
          'Posting content without monitoring reactions',
          'Interacting with followers through comments, likes, shares, and messages',
          'Running paid ads only',
          'Creating long-form blogs'
        ],
        correct: 1,
        explanation: 'Audience engagement involves actively interacting with followers through comments, likes, shares, and direct messages to build relationships and foster community.'
      },
      {
        question: 'What is one major advantage of social media marketing compared to traditional marketing?',
        options: [
          'Limited reach',
          'High production costs',
          'Cost-effective advertising with precise targeting options',
          'Inability to measure performance'
        ],
        correct: 2,
        explanation: 'Social media marketing offers cost-effective advertising with precise targeting options based on demographics, interests, and behaviors, making it more accessible and efficient than traditional marketing.'
      },
      {
        question: 'Which of the following is an example of influencer marketing?',
        options: [
          'Sharing a news article about your industry',
          'Partnering with a popular Instagram user to promote a product',
          'Creating a billboard advertisement',
          'Sending direct mail to customers'
        ],
        correct: 1,
        explanation: 'Influencer marketing involves partnering with individuals who have large, engaged followings on social media to promote products or services to their audience.'
      },
      {
        question: 'What type of content can social media marketing include?',
        options: [
          'Posts, videos, images, stories, and live streams',
          'Only printed flyers and brochures',
          'Television commercials only',
          'Radio jingles'
        ],
        correct: 0,
        explanation: 'Social media marketing includes a wide variety of digital content formats such as posts, videos, images, stories, live streams, and more, tailored to each platform.'
      },
      {
        question: 'Why is analytics important in social media marketing?',
        options: [
          'It helps measure metrics like reach, engagement, and conversions to refine strategies',
          'It replaces content creation entirely',
          'It determines billboard placement',
          'It only tracks competitor activity'
        ],
        correct: 0,
        explanation: 'Analytics is crucial for measuring key performance metrics like reach, impressions, engagement rates, and conversions, allowing businesses to track success and refine their strategies.'
      },
      {
        question: 'Which of the following is a challenge commonly faced in social media marketing?',
        options: [
          'Unlimited reach and engagement',
          'Algorithm changes, content saturation, and potential negative feedback',
          'Free advertising without effort',
          'Guaranteed viral success for every post'
        ],
        correct: 1,
        explanation: 'Social media marketing faces challenges including frequent algorithm changes affecting visibility, content saturation making it hard to stand out, and the risk of negative public feedback.'
      },
      {
        question: 'How can social media marketing directly increase sales?',
        options: [
          'By posting content without calls-to-action',
          'Through e-commerce integration, promotions, influencer partnerships, and retargeting ads',
          'By focusing only on traditional billboards',
          'Ignoring analytics and engagement'
        ],
        correct: 1,
        explanation: 'Social media marketing drives sales through e-commerce integration (like Instagram Shopping), promotions and discounts, influencer partnerships, and retargeting ads that nudge users toward purchase.'
      }
    ]
  }
};

