import type { Quiz } from '@/types/course';

export const module9Quiz: Quiz = {
  id: 9,
  title: 'Module 9 Quiz: Model Evaluation and Deployment',
  duration: '20 minutes',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'Why is model evaluation critical in machine learning?',
        options: [
          'To preprocess raw data',
          'To assess performance on unseen data and detect issues like overfitting',
          'To select features manually',
          'To deploy the model directly'
        ],
        correct: 1,
        explanation: 'Model evaluation ensures generalization and identifies issues like overfitting or bias, as described in section 9.1.'
      },
      {
        question: 'Which metric measures the proportion of positive predictions that are correct in classification?',
        options: [
          'Accuracy',
          'Precision',
          'Recall',
          'F1 Score'
        ],
        correct: 1,
        explanation: 'Precision is defined as TP / (TP + FP), as noted in section 9.2.'
      },
      {
        question: 'What is the purpose of K-Fold Cross-Validation?',
        options: [
          'To tune hyperparameters',
          'To evaluate model performance using multiple train-test splits',
          'To save the model for deployment',
          'To preprocess data'
        ],
        correct: 1,
        explanation: 'K-Fold Cross-Validation assesses model consistency across multiple splits, as described in section 9.3.'
      },
      {
        question: 'What is a hyperparameter in machine learning?',
        options: [
          'A feature in the dataset',
          'A configuration variable set before training',
          'A predicted output',
          'A performance metric'
        ],
        correct: 1,
        explanation: 'Hyperparameters, like learning rate or max depth, are set before training, as noted in section 9.4.'
      },
      {
        question: 'Which hyperparameter tuning method tests all possible combinations?',
        options: [
          'Random Search',
          'Grid Search',
          'Bayesian Optimization',
          'Cross-Validation'
        ],
        correct: 1,
        explanation: 'Grid Search exhaustively tests all combinations, as described in section 9.4.'
      },
      {
        question: 'Which library is optimized for saving machine learning models with large NumPy arrays?',
        options: [
          'Pickle',
          'Joblib',
          'Pandas',
          'Matplotlib'
        ],
        correct: 1,
        explanation: 'Joblib is faster for models with large arrays, as noted in section 9.5.'
      },
      {
        question: 'Which deployment method is a lightweight Python framework for creating model APIs?',
        options: [
          'Docker',
          'Flask',
          'AWS SageMaker',
          'FastAPI'
        ],
        correct: 1,
        explanation: 'Flask is a lightweight framework for model APIs, as listed in section 9.6.'
      },
      {
        question: 'What is a key task in post-deployment model maintenance?',
        options: [
          'Feature engineering',
          'Monitoring for performance drift',
          'Data preprocessing',
          'Visualizing data'
        ],
        correct: 1,
        explanation: 'Monitoring performance drift ensures models remain effective in production, as described in section 9.7.'
      },
      {
        question: 'Which metric is used to evaluate regression models by measuring average squared errors?',
        options: [
          'Precision',
          'Mean Squared Error (MSE)',
          'F1 Score',
          'Confusion Matrix'
        ],
        correct: 1,
        explanation: 'MSE measures average squared errors in regression, as listed in section 9.2.'
      },
      {
        question: 'What is a benefit of using Docker for model deployment?',
        options: [
          'It preprocesses data automatically',
          'It ensures consistent deployment across environments',
          'It tunes hyperparameters',
          'It visualizes model performance'
        ],
        correct: 1,
        explanation: 'Docker containerizes models for portability and consistency, as noted in section 9.6.'
      }
    ]
  }
};
