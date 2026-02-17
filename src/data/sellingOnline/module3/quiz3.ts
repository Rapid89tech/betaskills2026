import type { Quiz } from '@/types/course';

export const quiz3: Quiz = {
  id: 3,
  title: 'Module 3 Quiz: Understanding Your Customer',
  description: 'Test your understanding of target audiences, buyer personas, customer pain points, journey mapping, and building trust online.',
  questions: [
    {
      id: 1,
      question: 'What is the primary purpose of creating buyer personas?',
      options: [
        'To make marketing materials look professional',
        'To create detailed, relatable profiles representing ideal customers',
        'To collect as much data as possible',
        'To compete with other businesses'
      ],
      correctAnswer: 1,
      explanation: 'Buyer personas are detailed, semi-fictional profiles representing your ideal customers, built from research to capture their demographics, behaviours, motivations, and challenges in a relatable way that guides business decisions.'
    },
    {
      id: 2,
      question: 'Which of the following is an example of a customer pain point?',
      options: [
        'Wanting to try new products',
        'Spices losing potency quickly in storage',
        'Having extra money to spend',
        'Enjoying online shopping'
      ],
      correctAnswer: 1,
      explanation: 'A pain point is a specific problem or frustration customers face. Spices losing potency quickly is a practical pain point that creates ongoing annoyance and represents an opportunity for sellers to provide a better solution.'
    },
    {
      id: 3,
      question: 'What are the five main stages of the customer journey?',
      options: [
        'Search, Click, Buy, Return, Repeat',
        'Awareness, Consideration, Purchase, Retention, Advocacy',
        'Interest, Desire, Action, Satisfaction, Loyalty',
        'Discovery, Research, Decision, Usage, Feedback'
      ],
      correctAnswer: 1,
      explanation: 'The five main stages are Awareness (first discovery), Consideration (research and comparison), Purchase (buying decision), Retention (post-purchase experience), and Advocacy (sharing and recommending).'
    },
    {
      id: 4,
      question: 'Why is it important to identify customer motivations beyond just pain points?',
      options: [
        'Motivations are easier to measure than pain points',
        'Pain points don\'t matter in online selling',
        'Motivations reveal deeper desires and aspirations that drive purchases',
        'Motivations are the same for all customers'
      ],
      correctAnswer: 2,
      explanation: 'Understanding motivations reveals the deeper emotional and aspirational drivers behind purchases, such as creating memorable experiences or expressing identity, which helps create more compelling offerings and messaging.'
    },
    {
      id: 5,
      question: 'What is a "touchpoint" in customer journey mapping?',
      options: [
        'The final purchase moment',
        'Any point where a customer interacts with your brand',
        'Only physical interactions with products',
        'The customer service department'
      ],
      correctAnswer: 1,
      explanation: 'A touchpoint is any point of interaction between a customer and your brand, including social media posts, website visits, messages, checkout processes, delivery, and post-purchase communications.'
    },
    {
      id: 6,
      question: 'Which of the following best builds trust online?',
      options: [
        'Making exaggerated claims about products',
        'Hiding negative reviews',
        'Sharing authentic behind-the-scenes content and responding quickly to inquiries',
        'Only showing perfect, polished content'
      ],
      correctAnswer: 2,
      explanation: 'Trust is built through authenticity, transparency, and responsiveness. Sharing genuine behind-the-scenes content and being quick to help customers shows you care and have nothing to hide.'
    },
    {
      id: 7,
      question: 'What type of pain point does "feeling disconnected from cultural heritage" represent?',
      options: [
        'Practical pain point',
        'Emotional pain point',
        'Financial pain point',
        'Technical pain point'
      ],
      correctAnswer: 1,
      explanation: 'This is an emotional pain point related to identity, belonging, and self-expression. Emotional pain points are powerful drivers that can be addressed through products that reflect cultural pride and authenticity.'
    },
    {
      id: 8,
      question: 'How many core buyer personas should most businesses create?',
      options: [
        '1 persona is enough',
        '3-5 core personas',
        'At least 20 personas',
        'One for every product'
      ],
      correctAnswer: 1,
      explanation: 'Most businesses should create 3-5 core personas to cover their main customer segments without diluting focus. This provides enough diversity while remaining manageable for strategic planning.'
    },
    {
      id: 9,
      question: 'What is the purpose of mapping emotions at each stage of the customer journey?',
      options: [
        'To manipulate customers into buying',
        'To understand how customers feel and address concerns empathetically',
        'To make the map look more complete',
        'Emotions don\'t matter in business'
      ],
      correctAnswer: 1,
      explanation: 'Mapping emotions helps you understand customer feelings at each stage so you can address concerns, smooth friction points, and amplify positive moments, creating a more supportive and satisfying experience.'
    },
    {
      id: 10,
      question: 'Which element is most important for building credibility online?',
      options: [
        'Having the lowest prices',
        'Consistent quality and honest communication',
        'Posting every day',
        'Having the most followers'
      ],
      correctAnswer: 1,
      explanation: 'Credibility is built through consistent quality delivery and honest, transparent communication. When customers know they can rely on you to deliver what you promise and communicate truthfully, trust grows over time.'
    }
  ]
};
