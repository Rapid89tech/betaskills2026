import type { QuizLesson } from '@/types/course';

export const module12Quiz: QuizLesson = {
  id: 12,
  title: 'Module 12 Quiz: Client Consultation and Business Skills',
  duration: '20 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the first step in a professional client consultation?',
        options: [
          'Recommending a style you think would look good',
          'Listening to the client\'s needs and preferences',
          'Starting the haircut or treatment right away'
        ],
        correct: 1,
        explanation: 'Listening to the client\'s needs and preferences is the foundation of a successful consultation.'
      },
      {
        question: 'Why is it important to understand a client\'s lifestyle before suggesting a style?',
        options: [
          'So you can give them a style that suits their everyday routine',
          'To ensure the client comes back for more frequent appointments',
          'So you know what products to sell them after the appointment'
        ],
        correct: 0,
        explanation: 'Understanding lifestyle ensures the recommended style fits the client\'s daily routine and maintenance capabilities.'
      },
      {
        question: 'When a client mentions a past negative experience with another stylist, what is the best approach?',
        options: [
          'Reassure them and clearly outline your plan to achieve their desired look',
          'Quickly move on and start the treatment',
          'Tell them that the previous stylist likely used the wrong technique'
        ],
        correct: 0,
        explanation: 'Reassuring the client and outlining a clear plan builds trust and demonstrates professionalism.'
      },
      {
        question: 'If a client has damaged or brittle hair, what would be the most suitable recommendation?',
        options: [
          'Proceed with any color or chemical treatment as planned',
          'Suggest a strengthening treatment and advise on gentle at-home care',
          'Recommend a permanent straightening treatment'
        ],
        correct: 1,
        explanation: 'Strengthening treatments and gentle care help restore damaged hair health before proceeding with chemical services.'
      },
      {
        question: 'What is a key benefit of using open-ended questions during the consultation?',
        options: [
          'It encourages the client to provide detailed information about their preferences',
          'It helps you save time by getting quick "yes" or "no" answers',
          'It allows you to select the products you think the client should buy'
        ],
        correct: 0,
        explanation: 'Open-ended questions encourage clients to share detailed information, leading to better personalized recommendations.'
      },
      {
        question: 'What would you do if a client is unsure about the style they want?',
        options: [
          'Make a decision for them and begin the service',
          'Present a few tailored options and explain the benefits of each',
          'Postpone the consultation until they can decide'
        ],
        correct: 1,
        explanation: 'Presenting tailored options with clear benefits helps guide indecisive clients to make informed decisions.'
      },
      {
        question: 'How should you address a client\'s concerns about the cost of a recommended treatment?',
        options: [
          'Offer a detailed explanation of the benefits and suggest a phased approach',
          'Insist on the treatment as the only option',
          'Ignore the concern and proceed with the appointment'
        ],
        correct: 0,
        explanation: 'Explaining benefits and suggesting phased approaches demonstrates professionalism and flexibility.'
      },
      {
        question: 'When recommending a new style, why is it important to consider the client\'s natural hair texture?',
        options: [
          'It helps ensure the style will be easy to maintain',
          'It allows you to sell them more styling products',
          'It prevents you from having to adjust the style after the appointment'
        ],
        correct: 0,
        explanation: 'Considering natural hair texture ensures the style is practical and easy for the client to maintain.'
      },
      {
        question: 'What should you do if you discover during the consultation that the client\'s hair is thinning?',
        options: [
          'Suggest a scalp treatment or volume-boosting style and provide supportive guidance',
          'Tell them to seek help from a medical professional and end the consultation',
          'Avoid mentioning it and proceed with the appointment'
        ],
        correct: 0,
        explanation: 'Suggesting supportive solutions while being tactful shows professionalism and care for the client\'s concerns.'
      },
      {
        question: 'What is one of the most important factors in ensuring a successful client consultation?',
        options: [
          'Quickly recommending a trendy style before listening to the client',
          'Being empathetic, communicative, and fully understanding the client\'s needs',
          'Offering as many products as possible during the consultation'
        ],
        correct: 1,
        explanation: 'Empathy, communication, and understanding client needs are fundamental to successful consultations.'
      }
    ]
  }
};
