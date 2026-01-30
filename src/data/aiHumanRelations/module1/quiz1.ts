import type { Lesson } from '@/types/course';

export const quiz1: Lesson = {
  id: 2,
  title: '📝 Quiz 1: Foundations of AI and Human Interaction',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        id: 1,
        question: 'What is a defining characteristic of AI that enables it to personalize educational content or optimize HR processes?',
        options: [
          'Perception',
          'Learning from data',
          'Autonomy in decision-making',
          'Environmental interaction'
        ],
        correctAnswer: 1,
        explanation: 'Learning from data, a hallmark of machine learning, allows AI to adapt and personalize outputs, such as tailoring educational content or predicting employee turnover in HR, enhancing human relations.'
      },
      {
        id: 2,
        question: 'Which historical event formalized AI as a distinct academic discipline in 1956?',
        options: [
          'Turing Test introduction',
          'Dartmouth Conference',
          'Development of MYCIN',
          'Rise of deep learning'
        ],
        correctAnswer: 1,
        explanation: 'The 1956 Dartmouth Conference coined the term "Artificial Intelligence," igniting global research and shaping AI\'s integration into human-centered fields.'
      },
      {
        id: 3,
        question: 'Which AI type is currently prevalent in tools like voice assistants and email spam filters?',
        options: [
          'General AI',
          'Narrow AI',
          'Super AI',
          'Self-Aware AI'
        ],
        correctAnswer: 1,
        explanation: 'Narrow AI excels in specific tasks, powering tools like Siri or HR screening algorithms, but requires oversight to address limitations like bias.'
      },
      {
        id: 4,
        question: 'What limits Reactive Machines in dynamic human interactions, such as customer support requiring contextual understanding?',
        options: [
          'High computational cost',
          'Lack of memory or learning',
          'Inability to process language',
          'Limited visual recognition'
        ],
        correctAnswer: 1,
        explanation: 'Reactive Machines rely on pre-programmed responses without memory or learning, restricting their adaptability in dynamic human contexts like therapy or complex support.'
      },
      {
        id: 5,
        question: 'Which AI capability enables chatbots to handle customer queries or translate languages in global workplaces?',
        options: [
          'Computer Vision',
          'Natural Language Processing',
          'Robotics',
          'Expert Systems'
        ],
        correctAnswer: 1,
        explanation: 'Natural Language Processing (NLP) enables AI to understand and generate human language, facilitating seamless communication in chatbots and translation tools.'
      },
      {
        id: 6,
        question: 'What ethical challenge arises when AI hiring tools favor certain demographics due to skewed datasets?',
        options: [
          'Job displacement',
          'Bias in AI systems',
          'Lack of transparency',
          'Data privacy violation'
        ],
        correctAnswer: 1,
        explanation: 'Bias in AI, from skewed datasets, perpetuates discrimination in hiring, necessitating diverse data and audits to ensure fairness in human relations.'
      },
      {
        id: 7,
        question: 'How does AI enhance accessibility in healthcare, particularly for underserved populations?',
        options: [
          'By optimizing financial transactions',
          'Through virtual therapists and diagnostics',
          'By automating manufacturing tasks',
          'Via content recommendation systems'
        ],
        correctAnswer: 1,
        explanation: 'AI-driven diagnostics and virtual therapists, like Woebot, improve access to care, but require safeguards against bias and privacy risks.'
      },
      {
        id: 8,
        question: 'What is the development status of General AI, capable of performing any human intellectual task?',
        options: [
          'Fully implemented in daily tools',
          'Still a research goal, not achieved',
          'Widely used in customer service',
          'Replaced by Super AI'
        ],
        correctAnswer: 1,
        explanation: 'General AI remains under research, with potential to revolutionize human-AI collaboration but raising ethical concerns about autonomy and accountability.'
      },
      {
        id: 9,
        question: 'Which theoretical AI type could surpass human intelligence, prompting debates about societal control?',
        options: [
          'Narrow AI',
          'Limited Memory AI',
          'Super AI',
          'Reactive Machines'
        ],
        correctAnswer: 2,
        explanation: 'Super AI, a hypothetical construct, could exceed human capabilities, raising existential risks about control and alignment with human values.'
      },
      {
        id: 10,
        question: 'What AI capability supports sign language recognition to enhance inclusivity in human interactions?',
        options: [
          'Machine Learning',
          'Computer Vision',
          'Natural Language Processing',
          'Robotics'
        ],
        correctAnswer: 1,
        explanation: 'Computer Vision enables AI to interpret visual inputs like sign language, fostering inclusivity but requiring privacy safeguards for sensitive data.'
      },
      {
        id: 11,
        question: 'What is the goal of affective computing in enhancing AI\'s role in human relations?',
        options: [
          'To improve computational efficiency',
          'To detect and respond to human emotions',
          'To automate physical tasks',
          'To reduce data usage'
        ],
        correctAnswer: 1,
        explanation: 'Affective computing enables AI to interpret emotions, enhancing empathetic interactions in therapy, education, and customer service, but requires cultural sensitivity.'
      },
      {
        id: 12,
        question: 'How does human-AI collaboration in design industries, like using Adobe\'s Sensei, benefit productivity?',
        options: [
          'By eliminating human input',
          'By combining AI efficiency with human creativity',
          'By automating all creative tasks',
          'By reducing ethical oversight'
        ],
        correctAnswer: 1,
        explanation: 'Human-AI collaboration leverages AI\'s efficiency and human creativity, enhancing productivity while maintaining human oversight in creative processes.'
      },
      {
        id: 13,
        question: 'Which 1950s milestone influenced the design of modern AI assistants by testing conversational mimicry?',
        options: [
          'Dartmouth Conference',
          'Turing Test',
          'Deep learning development',
          'Expert system creation'
        ],
        correctAnswer: 1,
        explanation: 'Alan Turing\'s 1950 Turing Test challenged machines to mimic human conversation, shaping modern chatbots and virtual assistants.'
      },
      {
        id: 14,
        question: 'Why is data privacy critical in AI-driven HR tools that analyze employee sentiment?',
        options: [
          'It reduces personalization capabilities',
          'It requires robust security to protect sensitive data',
          'It increases automation efficiency',
          'It eliminates transparency needs'
        ],
        correctAnswer: 1,
        explanation: 'AI\'s use of personal data in HR, like sentiment analysis, risks breaches, necessitating encryption and consent protocols to ensure trust and compliance.'
      },
      {
        id: 15,
        question: 'What strategy mitigates AI-driven job displacement in sectors like customer service or manufacturing?',
        options: [
          'Limiting AI personalization',
          'Implementing reskilling programs',
          'Reducing data security measures',
          'Eliminating transparency protocols'
        ],
        correctAnswer: 1,
        explanation: 'Reskilling programs equip workers for AI-complementary roles, addressing job displacement\'s impact on livelihoods and workplace dynamics.'
      }
    ]
  }
};
