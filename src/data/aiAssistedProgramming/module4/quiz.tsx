import type { Quiz } from '@/types/course';

export const module4Quiz: Quiz = {
  id: 4,
  title: 'Module 4 Quiz: Data Preprocessing and Feature Engineering',
  duration: '20 minutes',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'Why is data considered the "fuel" for machine learning models?',
        options: [
          'It powers the hardware for training',
          'It directly affects model accuracy and performance',
          'It replaces the need for algorithms',
          'It is only used for visualization'
        ],
        correct: 1,
        explanation: 'Data quality and preparation are critical for model accuracy and generalization, as described in section 4.1.'
      },
      {
        question: 'What is the purpose of data preprocessing in machine learning?',
        options: [
          'To train the model directly',
          'To prepare raw data for modeling by cleaning and transforming it',
          'To select the final model algorithm',
          'To deploy the model in production'
        ],
        correct: 1,
        explanation: 'Data preprocessing cleans and formats raw data for ML models, as noted in section 4.2.'
      },
      {
        question: 'Which method is used to handle missing values in data cleaning?',
        options: [
          'One-Hot Encoding',
          'Imputing with the mean',
          'Dimensionality Reduction',
          'Feature Interaction'
        ],
        correct: 1,
        explanation: 'Imputing with mean, median, or mode is a common way to handle missing values, as shown in section 4.3.'
      },
      {
        question: 'What does Min-Max Scaling do in data transformation?',
        options: [
          'Centers data around mean 0',
          'Scales features to a fixed range, typically [0, 1]',
          'Removes duplicate records',
          'Encodes categorical variables'
        ],
        correct: 1,
        explanation: 'Min-Max Scaling transforms features to a specified range, as described in section 4.3.'
      },
      {
        question: 'What is the purpose of one-hot encoding in data preprocessing?',
        options: [
          'To normalize numerical data',
          'To create binary columns for categorical variables',
          'To reduce dataset size',
          'To calculate feature importance'
        ],
        correct: 1,
        explanation: 'One-hot encoding converts categorical variables into binary columns, as shown in section 4.3.'
      },
      {
        question: 'What is feature engineering?',
        options: [
          'Selecting the best ML algorithm',
          'Creating or transforming features to improve model performance',
          'Deploying a model to production',
          'Visualizing data distributions'
        ],
        correct: 1,
        explanation: 'Feature engineering involves creating or selecting features to enhance model accuracy, as defined in section 4.4.'
      },
      {
        question: 'Which technique creates a new feature like "BMI" from "height" and "weight"?',
        options: [
          'Feature Selection',
          'Feature Creation',
          'Binning',
          'Data Cleaning'
        ],
        correct: 1,
        explanation: 'Feature creation derives new features, such as BMI from height and weight, as described in section 4.5.'
      },
      {
        question: 'What is a method used for feature selection in feature engineering?',
        options: [
          'Standardization',
          'Recursive Feature Elimination (RFE)',
          'Text Tokenization',
          'Data Integration'
        ],
        correct: 1,
        explanation: 'RFE iteratively removes least important features to select the best ones, as noted in section 4.5.'
      },
      {
        question: 'Why should you avoid data leakage in preprocessing?',
        options: [
          'It increases training time',
          'It uses test set information during training, leading to overly optimistic results',
          'It reduces dataset size',
          'It simplifies feature engineering'
        ],
        correct: 1,
        explanation: 'Data leakage causes models to overfit by accessing test data during training, as warned in section 4.6.'
      },
      {
        question: 'Which tool can automate preprocessing steps like scaling and modeling?',
        options: [
          'Matplotlib',
          'Scikit-learn Pipeline',
          'Pandas DataFrame',
          'NumPy Array'
        ],
        correct: 1,
        explanation: 'Scikit-learn\'s Pipeline automates preprocessing and modeling steps for consistency, as recommended in section 4.6.'
      }
    ]
  }
};
