import type { Quiz } from '@/types/course';

export const quiz10: Quiz = {
  id: 'selling-online-module10-quiz',
  title: 'Module 10 Quiz: Customer Service & Relationship Building',
  description: 'Test your understanding of customer support channels, managing reviews, handling complaints, building loyalty, and community building.',
  moduleId: 'module10',
  passingScore: 70,
  questions: [
    {
      id: 'q1',
      question: 'Which customer support channel is best for urgent, real-time queries during the buying process?',
      options: [
        'Email support',
        'Live chat on website',
        'FAQ pages',
        'Phone support during set hours'
      ],
      correctAnswer: 1,
      explanation: 'Live chat on your website provides real-time help as customers explore, reducing abandonment by addressing doubts immediately when excitement peaks.'
    },
    {
      id: 'q2',
      question: 'What is the primary benefit of responding to every customer review personally and promptly?',
      options: [
        'It increases your product prices',
        'It humanises your brand and turns reviews into deeper connections',
        'It removes negative reviews automatically',
        'It guarantees 5-star ratings'
      ],
      correctAnswer: 1,
      explanation: 'Responding personally and promptly humanises your brand as buyers feel seen when you engage directly, turning positive reviews into deeper connections and transforming negative ones into resolution opportunities.'
    },
    {
      id: 'q3',
      question: 'When handling a customer complaint, what should you do first?',
      options: [
        'Explain why the problem occurred',
        'Offer a refund immediately',
        'Respond promptly and acknowledge with empathy',
        'Ask them to delete their complaint'
      ],
      correctAnswer: 2,
      explanation: 'Responding promptly and acknowledging with empathy shows the customer they\'ve been heard, calming frustration and preventing public escalation before moving to solutions.'
    },
    {
      id: 'q4',
      question: 'What is a key strategy for processing refunds effectively?',
      options: [
        'Delay refunds to discourage future requests',
        'Process quickly and communicate each step transparently',
        'Only offer store credit instead of refunds',
        'Require extensive documentation before processing'
      ],
      correctAnswer: 1,
      explanation: 'Processing refunds quickly and transparently reassures buyers, often leading to future purchases as the smooth resolution contrasts with less caring sellers.'
    },
    {
      id: 'q5',
      question: 'How should you view negative customer feedback?',
      options: [
        'As personal attacks to be defended against',
        'As constructive insights revealing blind spots',
        'As reasons to stop selling online',
        'As fake reviews to be reported'
      ],
      correctAnswer: 1,
      explanation: 'Negative feedback should be viewed as gifts revealing blind spots. Customers who initially point out issues often become advocates when they see you act on their feedback.'
    },
    {
      id: 'q6',
      question: 'What is the foundation of building customer loyalty?',
      options: [
        'Offering the lowest prices',
        'Delivering exceptional quality and consistency',
        'Sending frequent promotional emails',
        'Having the most products available'
      ],
      correctAnswer: 1,
      explanation: 'Delivering exceptional quality and consistency builds quiet confidence as buyers who experience the same high standard return because they know your products won\'t disappoint, creating loyalty rooted in dependable enhancement.'
    },
    {
      id: 'q7',
      question: 'Why is personalised post-purchase follow-up important for loyalty?',
      options: [
        'It increases immediate sales',
        'It makes customers feel valued beyond the transaction',
        'It reduces shipping costs',
        'It prevents all negative reviews'
      ],
      correctAnswer: 1,
      explanation: 'Personalised follow-ups with warm thank-yous and genuine interest make buyers feel valued beyond the transaction, often deepening the connection and encouraging repeat purchases.'
    },
    {
      id: 'q8',
      question: 'What is a key benefit of creating a customer community?',
      options: [
        'It eliminates the need for customer support',
        'It turns casual buyers into loyal supporters who advocate naturally',
        'It guarantees viral marketing',
        'It reduces product costs'
      ],
      correctAnswer: 1,
      explanation: 'Community building creates a welcoming group where customers feel connected to your brand and each other, turning casual buyers into loyal supporters who interact regularly and advocate naturally.'
    },
    {
      id: 'q9',
      question: 'How should you encourage customer reviews proactively?',
      options: [
        'Offer large discounts in exchange for 5-star reviews',
        'Send automated generic requests to everyone',
        'Gently invite feedback with warm, conversational messages after purchase',
        'Only ask customers who you know will leave positive reviews'
      ],
      correctAnswer: 2,
      explanation: 'Gently inviting feedback with warm, conversational messages makes it feel natural rather than obligatory. Buyers who\'ve had positive experiences are often eager to share when prompted kindly.'
    },
    {
      id: 'q10',
      question: 'What is the best approach to handling review disputes or unfair feedback?',
      options: [
        'Ignore them completely',
        'Respond publicly with empathy and facts while offering private resolution',
        'Delete the review if possible',
        'Argue aggressively to defend your reputation'
      ],
      correctAnswer: 1,
      explanation: 'Responding publicly with empathy and facts while offering private resolution preserves reputation as buyers watching see your commitment to fairness and improvement without defensiveness.'
    }
  ]
};
