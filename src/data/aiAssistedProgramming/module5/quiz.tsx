import type { Quiz } from '@/types/course';

export const module5Quiz: Quiz = {
  id: 5,
  title: 'Module 5 Quiz: Model Building in Machine Learning',
  duration: '20 minutes',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the primary goal of model building in machine learning?',
        options: [
          'To clean raw data',
          'To train a model to make predictions or classifications',
          'To select features manually',
          'To visualize data distributions'
        ],
        correct: 1,
        explanation: 'Model building involves training a model to learn patterns for predictions or classifications, as described in section 5.1.'
      },
      {
        question: 'What is the purpose of the train_test_split function in Scikit-learn?',
        options: [
          'To preprocess data',
          'To split data into training and test sets',
          'To tune hyperparameters',
          'To deploy the model'
        ],
        correct: 1,
        explanation: 'train_test_split divides data for training and evaluation, as shown in section 5.2.'
      },
      {
        question: 'Which algorithm is suitable for a regression task?',
        options: [
          'K-Means',
          'Logistic Regression',
          'Ridge Regression',
          'DBSCAN'
        ],
        correct: 2,
        explanation: 'Ridge Regression is used for regression tasks, as listed in section 5.3.'
      },
      {
        question: 'What is a key tip to avoid overfitting during model training?',
        options: [
          'Use a simpler model',
          'Train on the test set',
          'Reduce training data',
          'Ignore cross-validation'
        ],
        correct: 0,
        explanation: 'Simplifying the model or adding regularization prevents overfitting, as noted in section 5.4.'
      },
      {
        question: 'What does underfitting indicate about a model?',
        options: [
          'It performs well on test data',
          'It is too simple to capture data patterns',
          'It has too many features',
          'It is over-optimized'
        ],
        correct: 1,
        explanation: 'Underfitting occurs when a model is too simple, as described in section 5.5.'
      },
      {
        question: 'Which metric is used to evaluate regression models?',
        options: [
          'Precision',
          'Root Mean Squared Error (RMSE)',
          'F1 Score',
          'Confusion Matrix'
        ],
        correct: 1,
        explanation: 'RMSE measures regression model performance, as listed in section 5.6.'
      },
      {
        question: 'What is the purpose of hyperparameter tuning?',
        options: [
          'To preprocess data',
          'To optimize model performance by adjusting settings',
          'To visualize predictions',
          'To clean the dataset'
        ],
        correct: 1,
        explanation: 'Hyperparameter tuning adjusts settings like learning rate to improve performance, as described in section 5.7.'
      },
      {
        question: 'Which technique tests all combinations of hyperparameters?',
        options: [
          'Random Search',
          'Grid Search',
          'Bayesian Optimization',
          'Cross-Validation'
        ],
        correct: 1,
        explanation: 'Grid Search tests all hyperparameter combinations, as noted in section 5.7.'
      },
      {
        question: 'How can a trained model be saved for deployment?',
        options: [
          'Using Matplotlib',
          'Using joblib or pickle',
          'Using Pandas DataFrame',
          'Using NumPy arrays'
        ],
        correct: 1,
        explanation: 'Models are saved using joblib or pickle for deployment, as shown in section 5.8.'
      },
      {
        question: 'What is a challenge in model deployment?',
        options: [
          'Feature engineering',
          'Ensuring low latency for real-time predictions',
          'Data cleaning',
          'Visualizing data'
        ],
        correct: 1,
        explanation: 'Latency is a key challenge in deploying models for real-time applications, as discussed in section 5.8.'
      }
    ]
  }
};
