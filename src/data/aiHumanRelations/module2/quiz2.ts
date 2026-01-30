import type { Lesson } from '@/types/course';

export const quiz2: Lesson = {
  id: 5,
  title: '📝 Quiz 2: Communication and Emotional Intelligence',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        id: 1,
        question: 'What is the primary function of AI-powered conversational interfaces like chatbots and virtual assistants?',
        options: [
          'To automate website design',
          'To enable intuitive human-machine interaction',
          'To store large datasets permanently',
          'To replace all human communication'
        ],
        correctAnswer: 1,
        explanation: 'Conversational interfaces use AI to facilitate natural, efficient interactions, enhancing user engagement in customer service, education, and healthcare.'
      },
      {
        id: 2,
        question: 'Which 1960s chatbot, considered a pioneer, simulated a psychotherapist?',
        options: [
          'Siri',
          'ELIZA',
          'Woebot',
          'Google Assistant'
        ],
        correctAnswer: 1,
        explanation: 'ELIZA, developed by Joseph Weizenbaum, used pattern-matching to mimic conversation, influencing modern chatbots in human-AI interaction.'
      },
      {
        id: 3,
        question: 'Which technology enables conversational AI to interpret and generate human language?',
        options: [
          'Computer Vision',
          'Natural Language Processing (NLP)',
          'Predictive Analytics',
          'Robotics'
        ],
        correctAnswer: 1,
        explanation: 'NLP powers chatbots and virtual assistants to understand and respond to human language, enabling seamless communication.'
      },
      {
        id: 4,
        question: 'Which task is NOT typically associated with NLP in conversational AI?',
        options: [
          'Tokenization',
          'Facial Expression Recognition',
          'Sentiment Analysis',
          'Named Entity Recognition'
        ],
        correctAnswer: 1,
        explanation: 'Facial expression recognition is handled by computer vision, while NLP focuses on language-related tasks like tokenization and sentiment analysis.'
      },
      {
        id: 5,
        question: 'What distinguishes AI-powered chatbots from rule-based chatbots?',
        options: [
          'AI-powered chatbots use fixed if-then logic',
          'Rule-based chatbots adapt to user interactions',
          'AI-powered chatbots learn and generate context-aware responses',
          'Rule-based chatbots are more scalable'
        ],
        correctAnswer: 2,
        explanation: 'AI-powered chatbots leverage NLP and ML to adapt and provide dynamic, context-aware responses, unlike rule-based bots.'
      },
      {
        id: 6,
        question: 'Which virtual assistant, launched in 2014, is integrated into Amazon\'s smart devices?',
        options: [
          'Google Assistant',
          'Siri',
          'Alexa',
          'Bixby'
        ],
        correctAnswer: 2,
        explanation: 'Alexa, introduced in 2014, enhances accessibility through voice-based control in smart homes.'
      },
      {
        id: 7,
        question: 'What is the role of Dialog Management in conversational AI systems?',
        options: [
          'Processes visual inputs',
          'Manages conversation flow and context retention',
          'Stores permanent user data',
          'Designs user interface layouts'
        ],
        correctAnswer: 1,
        explanation: 'Dialog Management ensures coherent conversation flow, context retention, and logical turn-taking.'
      },
      {
        id: 8,
        question: 'Which is a significant challenge for conversational AI in human interactions?',
        options: [
          'Providing 24/7 availability',
          'Understanding complex contextual threads',
          'Reducing operational costs',
          'Ensuring consistent responses'
        ],
        correctAnswer: 1,
        explanation: 'Understanding long or nuanced contexts is challenging, limiting AI\'s ability to handle complex interactions.'
      },
      {
        id: 9,
        question: 'How do conversational AI interfaces support healthcare applications?',
        options: [
          'By automating financial transactions',
          'By providing symptom checkers and mental health support',
          'By optimizing manufacturing processes',
          'By generating marketing content'
        ],
        correctAnswer: 1,
        explanation: 'Conversational AI, like Woebot, offers symptom checkers and mental health support, improving accessibility.'
      },
      {
        id: 10,
        question: 'Which ethical principle ensures users know they are interacting with a bot?',
        options: [
          'Cost-efficiency',
          'Scalability',
          'Transparency',
          'Personalization'
        ],
        correctAnswer: 2,
        explanation: 'Transparency fosters trust by informing users they are interacting with AI.'
      },
      {
        id: 11,
        question: 'What is the primary goal of affective computing in human relations?',
        options: [
          'To increase computational speed',
          'To detect and respond to human emotions',
          'To automate physical tasks',
          'To enhance data storage capacity'
        ],
        correctAnswer: 1,
        explanation: 'Affective computing enables AI to analyze emotions, fostering empathetic interactions in therapy and customer service.'
      },
      {
        id: 12,
        question: 'What major limitation of AI in emotional contexts affects its authenticity?',
        options: [
          'Excessive emotional sensitivity',
          'Lack of genuine emotional experience',
          'Overabundance of contextual awareness',
          'Inability to process large datasets'
        ],
        correctAnswer: 1,
        explanation: 'AI simulates emotions but does not feel them, limiting authenticity and trust in sensitive contexts.'
      },
      {
        id: 13,
        question: 'What risk does emotional AI pose in marketing applications?',
        options: [
          'Enhanced customer satisfaction',
          'Emotional manipulation of consumers',
          'Improved data security protocols',
          'Increased accessibility for users'
        ],
        correctAnswer: 1,
        explanation: 'Emotional AI can exploit vulnerable emotional states in marketing, raising ethical concerns about autonomy.'
      },
      {
        id: 14,
        question: 'How does the AI tool Woebot support mental health?',
        options: [
          'By automating surgical procedures',
          'By delivering CBT-based emotional support',
          'By optimizing smart home controls',
          'By predicting financial market trends'
        ],
        correctAnswer: 1,
        explanation: 'Woebot uses NLP to deliver Cognitive Behavioral Therapy, providing accessible mental health support.'
      },
      {
        id: 15,
        question: 'What strategy mitigates risks of AI in emotional contexts, such as misdiagnosis?',
        options: [
          'Eliminating human oversight',
          'Implementing human-in-the-loop supervision',
          'Reducing data minimization practices',
          'Limiting transparency protocols'
        ],
        correctAnswer: 1,
        explanation: 'Human-in-the-loop supervision validates AI responses, reducing risks like misdiagnosis in emotional contexts.'
      }
    ]
  }
};
