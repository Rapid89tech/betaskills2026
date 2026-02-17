import type { QuizLesson } from '@/types/course';

export const module13Quiz: QuizLesson = {
  id: 13,
  title: 'Module 13 Quiz: Salon Management and Customer Service',
  duration: '20 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is one of the most important aspects of effective communication with clients?',
        options: [
          'Using technical jargon to show expertise',
          'Listening actively to understand their needs',
          'Telling the client what you think is best without their input'
        ],
        correct: 1,
        explanation: 'Active listening helps understand client needs and builds trust through genuine engagement.'
      },
      {
        question: 'Why is it important to keep detailed records of client preferences and previous treatments?',
        options: [
          'To save time by avoiding consultations in future appointments',
          'To personalize services and build long-term client loyalty',
          'To have evidence if the client complains about their service'
        ],
        correct: 1,
        explanation: 'Detailed records enable personalized service that builds loyalty and enhances client satisfaction.'
      },
      {
        question: 'What is the main advantage of using a digital scheduling system?',
        options: [
          'It guarantees no one will ever cancel or reschedule',
          'It allows you to track appointments and reduces booking errors',
          'It eliminates the need for any client interaction'
        ],
        correct: 1,
        explanation: 'Digital scheduling systems streamline bookings, track histories, and minimize errors for efficient operations.'
      },
      {
        question: 'If a client consistently arrives late, what is the best way to handle the situation?',
        options: [
          'Refuse to provide them with any further services',
          'Remind them of your cancellation or rescheduling policy',
          'Ignore it and proceed with the full appointment as usual'
        ],
        correct: 1,
        explanation: 'Politely reminding clients of policies maintains professionalism while protecting salon efficiency.'
      },
      {
        question: 'When handling a client with unrealistic expectations, what should you do?',
        options: [
          'Agree to whatever they want to avoid conflict',
          'Clearly explain what is achievable and show visual examples',
          'Tell them their expectations are impossible and they need to lower them'
        ],
        correct: 1,
        explanation: 'Clear explanations with visual aids help set realistic expectations while maintaining client trust.'
      },
      {
        question: 'What is a helpful technique for managing time effectively in the salon?',
        options: [
          'Double-booking appointments to maximize income',
          'Scheduling time blocks that include consultation, treatment, and cleanup',
          'Reducing the length of all services to fit in more appointments'
        ],
        correct: 1,
        explanation: 'Comprehensive time blocks ensure quality service without rushing, maintaining both efficiency and standards.'
      },
      {
        question: 'How can you create a more welcoming environment for clients?',
        options: [
          'Offering personalized greetings and making the salon atmosphere comfortable',
          'Keeping interactions strictly professional and formal',
          'Only focusing on the technical aspects of their service'
        ],
        correct: 0,
        explanation: 'Personalized touches and a comfortable atmosphere make clients feel valued and encourage loyalty.'
      },
      {
        question: 'Why is it important to set clear boundaries with clients?',
        options: [
          'To reduce the risk of miscommunication and manage expectations',
          'To avoid any emotional connection with clients',
          'To discourage clients from asking too many questions'
        ],
        correct: 0,
        explanation: 'Clear boundaries prevent miscommunication and help manage expectations for better client relationships.'
      },
      {
        question: 'What is the best way to handle a disruptive or angry client?',
        options: [
          'Stay calm, listen to their concerns, and work towards a solution',
          'Interrupt them and explain why their behavior is unacceptable',
          'Ignore the behavior and continue the appointment as normal'
        ],
        correct: 0,
        explanation: 'Staying calm and focusing on solutions demonstrates professionalism and often resolves conflicts effectively.'
      },
      {
        question: 'What is one benefit of analyzing appointment history?',
        options: [
          'It helps identify no-show patterns and peak booking times',
          'It reduces the need for keeping client records',
          'It allows you to double-book more appointments'
        ],
        correct: 0,
        explanation: 'Analyzing appointment data reveals patterns that help optimize scheduling and improve salon operations.'
      }
    ]
  }
};
