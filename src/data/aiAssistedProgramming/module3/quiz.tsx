import type { Quiz } from '@/types/course';

export const module3Quiz: Quiz = {
  id: 3,
  title: 'Module 3 Quiz: Machine Learning Fundamentals',
  duration: '20 minutes',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the primary goal of Machine Learning?',
        options: [
          'To explicitly program every decision',
          'To enable systems to learn from data without explicit programming',
          'To replace all human tasks',
          'To focus solely on hardware optimization'
        ],
        correct: 1,
        explanation: 'ML focuses on learning patterns from data to make predictions or decisions, as described in section 3.1.'
      },
      {
        question: 'Which type of Machine Learning uses labeled data to train models?',
        options: [
          'Unsupervised Learning',
          'Supervised Learning',
          'Reinforcement Learning',
          'Self-Supervised Learning'
        ],
        correct: 1,
        explanation: 'Supervised learning uses input-output pairs (labeled data) for training, as noted in section 3.3.'
      },
      {
        question: 'Which algorithm is commonly used for clustering in unsupervised learning?',
        options: [
          'Logistic Regression',
          'K-Means Clustering',
          'Support Vector Machines',
          'Q-Learning'
        ],
        correct: 1,
        explanation: 'K-Means Clustering groups unlabeled data into clusters, as described in section 3.4.'
      },
      {
        question: 'What is the role of the "agent" in Reinforcement Learning?',
        options: [
          'To preprocess data',
          'To learn optimal actions through rewards and penalties',
          'To visualize model performance',
          'To select features'
        ],
        correct: 1,
        explanation: 'The agent interacts with the environment to maximize rewards, as outlined in section 3.5.'
      },
      {
        question: 'What does overfitting mean in Machine Learning?',
        options: [
          'The model is too simple to capture patterns',
          'The model performs well on new data',
          'The model memorizes training data and performs poorly on new data',
          'The model has too few features'
        ],
        correct: 2,
        explanation: 'Overfitting occurs when a model is too complex and fails to generalize, as explained in section 3.6.'
      },
      {
        question: 'Which step in the ML pipeline involves cleaning and normalizing data?',
        options: [
          'Model Selection',
          'Data Preprocessing',
          'Deployment',
          'Evaluation'
        ],
        correct: 1,
        explanation: 'Data preprocessing includes cleaning, normalizing, and encoding data, as detailed in section 3.7.'
      },
      {
        question: 'Which evaluation metric balances precision and recall?',
        options: [
          'Accuracy',
          'F1 Score',
          'Mean Squared Error',
          'ROC-AUC'
        ],
        correct: 1,
        explanation: 'The F1 Score is the harmonic mean of precision and recall, balancing both, as noted in section 3.8.'
      },
      {
        question: 'Which ML algorithm is best suited for predicting continuous values like house prices?',
        options: [
          'K-Nearest Neighbors',
          'Linear Regression',
          'K-Means Clustering',
          'Policy Gradients'
        ],
        correct: 1,
        explanation: 'Linear regression predicts continuous values, as listed in section 3.3.'
      },
      {
        question: 'What is a key application of Reinforcement Learning?',
        options: [
          'Customer segmentation',
          'Game-playing AI',
          'Dimensionality reduction',
          'Text classification'
        ],
        correct: 1,
        explanation: 'Reinforcement learning is used in game-playing AI like AlphaGo, as described in section 3.5.'
      },
      {
        question: 'What does a confusion matrix summarize?',
        options: [
          'Model hyperparameters',
          'True positives, true negatives, false positives, and false negatives',
          'Feature importance scores',
          'Data preprocessing steps'
        ],
        correct: 1,
        explanation: 'A confusion matrix summarizes classification results, as explained in section 3.8.'
      }
    ]
  }
};
