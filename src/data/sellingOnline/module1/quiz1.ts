import type { Quiz } from '@/types/course';

export const quiz1: Quiz = {
  id: 1,
  title: 'Module 1 Quiz: Introduction to Online Selling',
  description: 'Test your understanding of online selling fundamentals, business models, and current trends.',
  questions: [
    {
      id: 1,
      question: 'What is the main advantage of building your own ecommerce store compared to selling on marketplaces?',
      options: [
        'Lower startup costs',
        'Immediate access to existing traffic',
        'Full control over branding and customer data',
        'No technical skills required'
      ],
      correctAnswer: 2,
      explanation: 'Building your own ecommerce store gives you complete ownership over the customer experience, branding, pricing, and customer data, though it requires more effort to attract visitors.'
    },
    {
      id: 2,
      question: 'Which type of online seller focuses on selling directly to individual consumers for personal use?',
      options: [
        'B2B (Business to Business)',
        'B2C (Business to Consumer)',
        'DTC (Direct to Consumer)',
        'Wholesale'
      ],
      correctAnswer: 1,
      explanation: 'B2C (Business to Consumer) sellers focus on offering products or services directly to individual everyday buyers for personal use, making it the most common model for retail-style online selling.'
    },
    {
      id: 3,
      question: 'What is a key challenge of online selling mentioned in the module?',
      options: [
        'Too much customer interaction',
        'Intense competition in a crowded digital space',
        'Limited audience reach',
        'High overhead costs'
      ],
      correctAnswer: 1,
      explanation: 'Intense competition in a crowded digital space is a major challenge, as buyers can easily compare options across platforms, making visibility harder without consistent effort.'
    },
    {
      id: 4,
      question: 'Which current ecommerce trend involves allowing direct purchases from social media feeds without leaving the app?',
      options: [
        'Voice commerce',
        'Subscription models',
        'Social commerce',
        'Omnichannel selling'
      ],
      correctAnswer: 2,
      explanation: 'Social commerce involves platforms deepening shopping features to allow direct purchases from feeds, stories, lives, or videos without leaving the app, blending entertainment with buying seamlessly.'
    },
    {
      id: 5,
      question: 'What percentage of buyers now browse and purchase primarily on smartphones?',
      options: [
        'About 25%',
        'About 50%',
        'Most buyers',
        'Very few buyers'
      ],
      correctAnswer: 2,
      explanation: 'Most buyers now browse and purchase on smartphones, making mobile-first optimization essential for ecommerce success.'
    },
    {
      id: 6,
      question: 'Which South African company started as a small online kitchenware store and grew through exceptional customer service?',
      options: [
        'Takealot',
        'Bathu',
        'Yuppiechef',
        'Faithful to Nature'
      ],
      correctAnswer: 2,
      explanation: 'Yuppiechef began as a small online kitchenware store focused on quality products and exceptional customer service, growing into one of South Africa\'s most recognised ecommerce brands.'
    },
    {
      id: 7,
      question: 'What is the main benefit of a subscription model for online sellers?',
      options: [
        'One-time large payments',
        'Predictable recurring revenue',
        'No customer service needed',
        'Instant viral growth'
      ],
      correctAnswer: 1,
      explanation: 'Subscription models provide predictable recurring revenue and deeper customer relationships through convenience, shifting focus from one-off sales to retention.'
    },
    {
      id: 8,
      question: 'Which business model did Bathu use to maintain higher margins and authentic storytelling?',
      options: [
        'Marketplace selling',
        'Wholesale distribution',
        'Direct-to-Consumer (DTC)',
        'Affiliate marketing'
      ],
      correctAnswer: 2,
      explanation: 'Bathu used a Direct-to-Consumer (DTC) model, selling directly through their own online store and social channels to maintain authentic storytelling and higher margins.'
    },
    {
      id: 9,
      question: 'What is a key advantage of selling digital products online?',
      options: [
        'Customers can touch and feel the product',
        'Unlimited scalability without production costs per sale',
        'No marketing required',
        'Guaranteed high prices'
      ],
      correctAnswer: 1,
      explanation: 'Digital products offer unlimited scalability without additional production costs per sale, high profit margins after initial creation, and instant delivery with no shipping required.'
    },
    {
      id: 10,
      question: 'According to the module, what is increasingly important to conscious consumers when choosing products?',
      options: [
        'Fastest delivery only',
        'Lowest price regardless of quality',
        'Sustainability and ethical practices',
        'Celebrity endorsements'
      ],
      correctAnswer: 2,
      explanation: 'Buyers increasingly seek eco-friendly options, transparent sourcing, and low-impact packaging, with sustainability and ethical shopping becoming key priorities that influence purchasing decisions.'
    }
  ]
};
