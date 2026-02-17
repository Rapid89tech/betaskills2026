import { Quiz } from '../../../types/course';

export const quiz9: Quiz = {
  id: 'selling-online-module9-quiz',
  title: 'Module 9 Quiz: Conversion Optimization & Sales Psychology',
  description: 'Test your knowledge of sales funnels, buyer psychology, CTAs, social proof, urgency, upselling, cross-selling, cart abandonment, and A/B testing.',
  questions: [
    {
      id: 'q1',
      question: 'What is the main purpose of a sales funnel?',
      options: [
        'To increase website design quality',
        'To map how customers move from awareness to loyalty',
        'To reduce product prices',
        'To replace customer service'
      ],
      correctAnswer: 1,
      explanation: 'A sales funnel maps the customer journey from initial awareness through to loyalty and advocacy, helping you understand and optimize each stage of the buying process.'
    },
    {
      id: 'q2',
      question: 'Which emotion is most important at the Awareness stage of the funnel?',
      options: [
        'Urgency',
        'Loyalty',
        'Curiosity',
        'Satisfaction'
      ],
      correctAnswer: 2,
      explanation: 'At the Awareness stage, curiosity is key as buyers are just discovering your brand and deciding if it\'s relevant to them, requiring content that sparks interest without pressure.'
    },
    {
      id: 'q3',
      question: 'Why should awareness-stage content avoid being overly sales-focused?',
      options: [
        'Buyers are ready to purchase immediately',
        'It reduces ad costs',
        'Buyers are still deciding if the brand is relevant',
        'It improves checkout speed'
      ],
      correctAnswer: 2,
      explanation: 'At the awareness stage, buyers are still evaluating if your brand fits their needs and world, so overly sales-focused content can feel pushy and cause them to dismiss you.'
    },
    {
      id: 'q4',
      question: 'What psychological need is strongest during the Interest stage?',
      options: [
        'Speed',
        'Emotional connection and relevance',
        'Discounts',
        'Social status'
      ],
      correctAnswer: 1,
      explanation: 'During the Interest stage, buyers seek emotional connection and relevance as they explore whether your products fulfill their deeper wants and aspirations.'
    },
    {
      id: 'q5',
      question: 'What helps buyers most during the Consideration stage?',
      options: [
        'More brand logos',
        'Loud advertising',
        'Social proof and reassurance',
        'Random product suggestions'
      ],
      correctAnswer: 2,
      explanation: 'At the Consideration stage, buyers are comparing options and need social proof and reassurance to overcome hesitation and trust in your quality and value.'
    },
    {
      id: 'q6',
      question: 'Why is social proof powerful in buyer decision-making?',
      options: [
        'It replaces product quality',
        'It shows others have made the same choice successfully',
        'It guarantees refunds',
        'It lowers shipping costs'
      ],
      correctAnswer: 1,
      explanation: 'Social proof is powerful because it shows that others similar to the buyer have successfully made the same choice, reducing perceived risk and building trust.'
    },
    {
      id: 'q7',
      question: 'What psychological trigger is most effective at the Intent stage?',
      options: [
        'Fear of missing out (urgency)',
        'Brand storytelling',
        'Education',
        'Long explanations'
      ],
      correctAnswer: 0,
      explanation: 'At the Intent stage, urgency and fear of missing out are most effective as buyers have shown strong interest but need a final push to overcome procrastination.'
    },
    {
      id: 'q8',
      question: 'What is the main goal of the Purchase stage?',
      options: [
        'Increase website traffic',
        'Upsell aggressively',
        'Reduce buyer anxiety and confirm the decision',
        'Collect social media followers'
      ],
      correctAnswer: 2,
      explanation: 'The Purchase stage focuses on reducing buyer anxiety and confirming their decision through smooth processes, clear information, and reassurance.'
    },
    {
      id: 'q9',
      question: 'Why is the Retention stage important in a sales funnel?',
      options: [
        'It replaces marketing',
        'Returning customers cost less to maintain than new ones',
        'It only benefits large companies',
        'It stops competitors'
      ],
      correctAnswer: 1,
      explanation: 'The Retention stage is crucial because returning customers cost significantly less to maintain than acquiring new ones, and they often have higher lifetime value.'
    },
    {
      id: 'q10',
      question: 'What turns loyal customers into advocates?',
      options: [
        'Constant discounts',
        'Pressure to share',
        'Consistently positive experiences and emotional connection',
        'Automated messages only'
      ],
      correctAnswer: 2,
      explanation: 'Loyal customers become advocates through consistently positive experiences and strong emotional connections that make them want to share and recommend your brand naturally.'
    }
  ],
  passingScore: 70,
  timeLimit: 15
};
