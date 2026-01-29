import type { Quiz } from '@/types/course';

export const module1Quiz: Quiz = {
  id: 1,
  title: 'Module 1 Quiz: Introduction to Entrepreneurship and Market Research',
  duration: '20 minutes',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the primary purpose of market research?',
        options: [
          'To increase product price',
          'To identify and understand customer needs',
          'To hire more staff',
          'To reduce taxes'
        ],
        correct: 1,
        explanation: 'Market research focuses on understanding customer needs to ensure your product or service meets market demands.'
      },
      {
        question: 'A "target market" refers to:',
        options: [
          'Everyone in your city',
          'People with the highest income',
          'A specific group most likely to buy your product',
          'Your competitors'
        ],
        correct: 2,
        explanation: 'A target market is a defined group of potential customers most likely to benefit from and purchase your offering.'
      },
      {
        question: 'Which of the following is NOT a method of validating a business idea?',
        options: [
          'Creating a landing page',
          'Building a full product with all features',
          'Conducting surveys',
          'Running a small test campaign'
        ],
        correct: 1,
        explanation: 'Validating a business idea involves testing with minimal resources, not building a complete product.'
      },
      {
        question: 'What is the main purpose of an MVP (Minimum Viable Product)?',
        options: [
          'To impress investors',
          'To test your idea with minimal resources',
          'To make the final version of the product',
          'To copy a competitor\'s product'
        ],
        correct: 1,
        explanation: 'An MVP tests the core concept efficiently, gathering feedback without extensive investment.'
      },
      {
        question: 'Which of the following best describes a focus group?',
        options: [
          'A one-on-one interview with an investor',
          'A group of random people in a public space',
          'A selected group discussing your product to give feedback',
          'An online advertisement group'
        ],
        correct: 2,
        explanation: 'A focus group involves a targeted group providing insights on your product or idea.'
      },
      {
        question: 'What is the primary purpose of establishing a brand voice?',
        options: [
          'To create a visually appealing logo',
          'To maintain a consistent personality and tone in communication',
          'To increase product prices',
          'To write technical manuals'
        ],
        correct: 1,
        explanation: 'Brand voice ensures consistent communication, reflecting the brand\'s personality and building customer recognition and trust.'
      },
      {
        question: 'Which of the following is NOT a key component of brand messaging?',
        options: [
          'Core message',
          'Tagline or slogan',
          'Product pricing',
          'Value statements'
        ],
        correct: 2,
        explanation: 'Brand messaging includes core messages, taglines, and value statements, but pricing is part of marketing strategy, not messaging.'
      },
      {
        question: 'Which social media marketing strategy helps increase direct engagement with customers?',
        options: [
          'Ignoring comments',
          'Posting randomly without a schedule',
          'Responding to comments and messages promptly',
          'Avoiding paid ads'
        ],
        correct: 2,
        explanation: 'Prompt responses on social media foster direct engagement, building relationships and trust with customers.'
      },
      {
        question: 'What is one major benefit of digital marketing over traditional marketing?',
        options: [
          'It is less measurable',
          'It can reach a global audience quickly and affordably',
          'It requires no planning',
          'It is only useful for large companies'
        ],
        correct: 1,
        explanation: 'Digital marketing offers global reach, cost-effectiveness, and measurable results, unlike traditional marketing\'s limited scope.'
      },
      {
        question: 'Networking helps businesses by:',
        options: [
          'Increasing costs',
          'Providing access to resources and opportunities',
          'Limiting business growth',
          'Reducing customer engagement'
        ],
        correct: 1,
        explanation: 'Networking connects businesses to suppliers, partners, and customers, fostering growth through valuable relationships.'
      },
      {
        question: 'Which of the following is a type of business partnership?',
        options: [
          'Solo venture',
          'Strategic alliance',
          'Individual freelancing',
          'Monopoly'
        ],
        correct: 1,
        explanation: 'Strategic alliances are partnerships that leverage mutual strengths, unlike solo ventures or freelancing.'
      },
      {
        question: 'Customer loyalty programs primarily aim to:',
        options: [
          'Attract new customers only',
          'Reward repeat customers and encourage ongoing purchases',
          'Increase product prices',
          'Limit customer access to services'
        ],
        correct: 1,
        explanation: 'Loyalty programs incentivize repeat purchases, increasing retention and customer lifetime value.'
      },
      {
        question: 'Which of these is a common type of loyalty program?',
        options: [
          'Points-based system',
          'Random giveaways without tracking',
          'Unlimited free products without purchase',
          'One-time discounts only'
        ],
        correct: 0,
        explanation: 'Points-based systems reward purchases with redeemable points, a common and effective loyalty program structure.'
      },
      {
        question: 'Why is personalized communication important in customer engagement?',
        options: [
          'It makes communication more relevant and builds stronger relationships',
          'It increases marketing costs unnecessarily',
          'It annoys customers',
          'It limits the audience'
        ],
        correct: 0,
        explanation: 'Personalized communication tailors messages to customer needs, fostering stronger connections and loyalty.'
      },
      {
        question: 'To ensure a successful partnership, it is important to:',
        options: [
          'Avoid communication after signing an agreement',
          'Define clear roles and responsibilities',
          'Ignore conflicts',
          'Avoid legal agreements'
        ],
        correct: 1,
        explanation: 'Clear roles in partnerships prevent conflicts and ensure mutual benefits, supporting successful collaborations.'
      },
      {
        question: 'What is the main goal of content marketing?',
        options: [
          'To sell products directly',
          'To educate and attract audiences with valuable content',
          'To replace social media marketing',
          'To reduce website traffic'
        ],
        correct: 1,
        explanation: 'Content marketing builds authority and engagement by providing valuable information, not direct sales.'
      },
      {
        question: 'What is a key benefit of influencer marketing?',
        options: [
          'It requires no budget',
          'It amplifies brand visibility through trusted voices',
          'It guarantees immediate sales',
          'It avoids audience targeting'
        ],
        correct: 1,
        explanation: 'Influencer marketing leverages trusted figures to expand reach and build credibility with targeted audiences.'
      },
      {
        question: 'What is a primary advantage of email marketing?',
        options: [
          'It is expensive and time-consuming',
          'It delivers personalized messages at low cost',
          'It requires no customer data',
          'It replaces all other marketing strategies'
        ],
        correct: 1,
        explanation: 'Email marketing offers cost-effective, personalized communication, driving engagement and conversions efficiently.'
      },
      {
        question: 'What does event marketing achieve for a business?',
        options: [
          'It reduces customer interaction',
          'It creates buzz and engages audiences directly',
          'It eliminates the need for digital marketing',
          'It focuses only on existing customers'
        ],
        correct: 1,
        explanation: 'Event marketing generates excitement and fosters direct interaction, building community and driving sales.'
      },
      {
        question: 'Competitor analysis helps you avoid copying other businesses.',
        options: ['True', 'False'],
        correct: 0,
        explanation: 'Competitor analysis helps you understand what others offer, allowing you to differentiate rather than copy.'
      },
      {
        question: 'The feedback collected during the MVP stage should only come from friends and family.',
        options: ['True', 'False'],
        correct: 1,
        explanation: 'Feedback during the MVP stage should come from your target audience, not just friends and family, to ensure objectivity.'
      },
      {
        question: 'A good business idea should always solve a real problem.',
        options: ['True', 'False'],
        correct: 0,
        explanation: 'A good business idea must address a real problem to attract customers and achieve market fit.'
      }
    ]
  }
}; 
