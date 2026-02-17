import type { Quiz } from '@/types/course';

export const module2Quiz: Quiz = {
  id: 2,
  title: 'Module 2 Quiz: Choosing What to Sell',
  duration: '25 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the main advantage of selling digital products over physical products?',
        options: [
          'Higher customer trust',
          'Better sensory appeal',
          'Unlimited scalability without production costs per sale',
          'Easier to return'
        ],
        correct: 2,
        explanation: 'Digital products can be sold repeatedly without additional production costs per sale, offering high margins and passive income potential with instant delivery.'
      },
      {
        question: 'Which fulfillment model requires the lowest upfront investment?',
        options: [
          'Wholesale',
          'Handmade',
          'Dropshipping',
          'Subscription boxes'
        ],
        correct: 2,
        explanation: 'Dropshipping requires the lowest upfront costs since you don\'t hold inventory. The supplier ships directly to customers while you handle marketing and customer service.'
      },
      {
        question: 'What is a key challenge of the handmade business model?',
        options: [
          'Low profit margins',
          'Time-intensive production limits scale',
          'No customer loyalty',
          'Easy to copy'
        ],
        correct: 1,
        explanation: 'Handmade products are time-intensive to create, which limits how much you can scale. Each item requires personal effort and craftsmanship.'
      },
      {
        question: 'What type of research involves collecting fresh data directly from your audience?',
        options: [
          'Secondary research',
          'Competitor analysis',
          'Primary research',
          'Market segmentation'
        ],
        correct: 2,
        explanation: 'Primary research involves collecting fresh data directly from your audience through surveys, polls, interviews, or direct feedback in comments and messages.'
      },
      {
        question: 'Which fulfillment model is best for testing creative designs without inventory risk?',
        options: [
          'Wholesale',
          'Print-on-demand',
          'Handmade',
          'Dropshipping'
        ],
        correct: 1,
        explanation: 'Print-on-demand creates custom products only after an order is placed, allowing you to test multiple designs without inventory risk or upfront production costs.'
      },
      {
        question: 'What is the main benefit of subscription-based selling?',
        options: [
          'One-time high revenue',
          'No customer service needed',
          'Predictable recurring revenue',
          'Lower production costs'
        ],
        correct: 2,
        explanation: 'Subscriptions provide predictable recurring revenue, higher customer lifetime value, and better cash flow planning through ongoing customer relationships.'
      },
      {
        question: 'When identifying customer problems, what is the most valuable source of feedback?',
        options: [
          'Industry reports',
          'Direct customer comments and messages',
          'Competitor websites',
          'General market trends'
        ],
        correct: 1,
        explanation: 'Direct customer feedback in comments and messages provides firsthand insights into real problems and needs from people already interested in your niche.'
      },
      {
        question: 'What is a minimum viable product (MVP)?',
        options: [
          'The most expensive version of your product',
          'A stripped-down version to test actual purchasing behavior',
          'A fully featured product with all options',
          'A free sample product'
        ],
        correct: 1,
        explanation: 'An MVP is a stripped-down version with limited features or stock that allows you to test actual purchasing behavior and gather feedback before full-scale production.'
      },
      {
        question: 'What should you analyze when conducting competitor research?',
        options: [
          'Only their pricing',
          'Only their product range',
          'Their strengths, weaknesses, and gaps you can fill',
          'Only their social media followers'
        ],
        correct: 2,
        explanation: 'Competitor analysis should identify what they do well, where they fall short, and gaps in the market that you can fill with your unique offerings.'
      },
      {
        question: 'Which business model combines well with handmade products to diversify income?',
        options: [
          'Only wholesale',
          'Print-on-demand or subscriptions',
          'Only dropshipping',
          'None - handmade should stay alone'
        ],
        correct: 1,
        explanation: 'Handmade products combine well with print-on-demand extensions or subscription add-ons to diversify income streams while maintaining the core handmade authenticity.'
      },
      {
        question: 'What is the purpose of product validation?',
        options: [
          'To increase production costs',
          'To test if customers will actually buy before full investment',
          'To copy competitor products',
          'To delay launching'
        ],
        correct: 1,
        explanation: 'Product validation tests whether your idea has real demand before investing significant time, effort, or money, reducing risks of unsold stock or wasted resources.'
      },
      {
        question: 'What is a key advantage of wholesale selling?',
        options: [
          'No upfront investment needed',
          'Higher profit margins on volume purchases',
          'No storage space required',
          'Instant delivery to customers'
        ],
        correct: 1,
        explanation: 'Wholesale allows you to buy in bulk at discounted rates and sell at markup, providing higher profit margins on volume while maintaining control over packaging and bundling.'
      }
    ]
  }
};
