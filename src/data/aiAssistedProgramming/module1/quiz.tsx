import type { Quiz } from '@/types/course';

export const module1Quiz: Quiz = {
  id: 1,
  title: 'Module 1 Quiz: Introduction to AI Programming',
  duration: '20 minutes',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the primary goal of Artificial Intelligence (AI)?',
        options: [
          'To simulate human intelligence in machines',
          'To replace all human jobs with automation',
          'To create hardware for faster computing',
          'To develop video games exclusively'
        ],
        correct: 0,
        explanation: 'AI focuses on enabling machines to mimic human cognitive abilities like reasoning, learning, and decision-making, as described in section 1.1.'
      },
      {
        question: 'Which category of AI is currently implemented in tools like Siri and Google Assistant?',
        options: [
          'General AI',
          'Narrow AI',
          'Super AI',
          'Expert AI'
        ],
        correct: 1,
        explanation: 'Siri and Google Assistant are examples of Narrow AI, designed for specific tasks like voice recognition and task automation, as outlined in section 1.1.'
      },
      {
        question: 'What is a key step in the AI programming workflow that involves preparing datasets by removing noise and handling missing values?',
        options: [
          'Model Deployment',
          'Data Collection & Cleaning',
          'Hyperparameter Tuning',
          'Inference'
        ],
        correct: 1,
        explanation: 'Data collection and cleaning involve preparing datasets by removing noise, duplicates, or biases, as detailed in sections 1.2 and 1.5.'
      },
      {
        question: 'Which programming language is most widely used for AI development due to its simplicity and extensive libraries like TensorFlow and PyTorch?',
        options: [
          'Java',
          'Python',
          'C++',
          'R'
        ],
        correct: 1,
        explanation: 'Python is the dominant language for AI due to its readability and libraries like NumPy, TensorFlow, and PyTorch, as noted in section 1.3.'
      },
      {
        question: 'Which field of AI programming enables machines to interpret and analyze visual data, such as images or videos?',
        options: [
          'Natural Language Processing',
          'Reinforcement Learning',
          'Computer Vision',
          'Expert Systems'
        ],
        correct: 2,
        explanation: 'Computer vision allows machines to process and interpret visual data, used in applications like facial recognition and autonomous driving, as described in section 1.4.'
      },
      {
        question: 'What is the purpose of the "training" phase in AI programming?',
        options: [
          'To deploy the model in a real-world application',
          'To evaluate the model\'s performance on a test dataset',
          'To optimize model parameters using data to learn patterns',
          'To select the programming language for development'
        ],
        correct: 2,
        explanation: 'Training involves feeding data into a model to adjust its parameters and learn patterns, as explained in sections 1.2 and 1.5.'
      },
      {
        question: 'Which AI framework is developed by Google and widely used for scalable machine learning and deep learning tasks?',
        options: [
          'PyTorch',
          'TensorFlow',
          'Scikit-learn',
          'Hugging Face'
        ],
        correct: 1,
        explanation: 'TensorFlow, developed by Google, is an open-source framework for machine learning and deep learning, supporting scalable training and deployment, as mentioned in section 1.6.'
      },
      {
        question: 'What is a major ethical concern in AI related to models inheriting biases from training data?',
        options: [
          'Job Displacement',
          'Bias in Data and Algorithms',
          'Environmental Impact',
          'Transparency'
        ],
        correct: 1,
        explanation: 'Bias in data and algorithms can lead to unfair outcomes, such as biased hiring systems, and requires mitigation through diverse datasets, as discussed in section 1.7.'
      },
      {
        question: 'Which AI programming concept involves selecting or transforming data features to improve model performance?',
        options: [
          'Model Evaluation',
          'Feature Engineering',
          'Data Normalization',
          'Inference'
        ],
        correct: 1,
        explanation: 'Feature engineering involves selecting or creating relevant features to enhance model performance, such as extracting word embeddings for NLP, as noted in section 1.5.'
      },
      {
        question: 'Which subfield of AI programming involves agents learning optimal behaviors through rewards and trial-and-error?',
        options: [
          'Deep Learning',
          'Natural Language Processing',
          'Reinforcement Learning',
          'Computer Vision'
        ],
        correct: 2,
        explanation: 'Reinforcement learning involves agents learning optimal actions through trial and error, guided by rewards, as described in section 1.4.'
      }
    ]
  }
};
