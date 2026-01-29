import type { Quiz } from '@/types/course';

export const module10Quiz: Quiz = {
  id: 10,
  title: 'Module 10 Quiz: Capstone Project – Building a Full AI Application',
  duration: '20 minutes',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the main purpose of the Capstone Project in this course?',
        options: [
          'To practice only data preprocessing',
          'To test theory without implementation',
          'To integrate all learned skills into a real-world AI application',
          'To memorize Python syntax'
        ],
        correct: 2,
        explanation: 'The Capstone Project integrates all learned concepts from the course into a real-world AI application, as described in section 10.1.'
      },
      {
        question: 'In the churn prediction problem, why is it important for a telecom company to predict churn?',
        options: [
          'To increase customer complaints',
          'To retain customers and reduce revenue loss',
          'To collect more customer emails',
          'To reduce marketing costs by avoiding customers'
        ],
        correct: 1,
        explanation: 'It is often 5x cheaper to keep a customer than to find a new one, and reducing churn directly increases profitability, as noted in section 10.2.'
      },
      {
        question: 'Which dataset is recommended for this project, and where can it be found?',
        options: [
          'Titanic Passenger Dataset – UCI Repository',
          'Telco Customer Churn Dataset – Kaggle',
          'MNIST Handwritten Digits – TensorFlow Hub',
          'Movie Ratings Dataset – IMDb'
        ],
        correct: 1,
        explanation: 'The Telco Customer Churn Dataset is recommended and available on Kaggle, as listed in section 10.4.'
      },
      {
        question: 'Name two common preprocessing tasks before building a machine learning model.',
        options: [
          'Adding random noise and deleting columns',
          'Handling missing values and encoding categorical variables',
          'Copying data to Excel and printing results',
          'Renaming columns and merging duplicates only'
        ],
        correct: 1,
        explanation: 'Handling missing values and encoding categorical variables are essential preprocessing tasks, as described in section 10.5.'
      },
      {
        question: 'Why is exploratory data analysis (EDA) performed before model building?',
        options: [
          'To skip feature engineering',
          'To guess model performance without data',
          'To understand patterns, detect anomalies, and find relationships in data',
          'To deploy the model directly'
        ],
        correct: 2,
        explanation: 'EDA helps discover patterns and relationships, and identify outliers or imbalances, as noted in section 10.6.'
      },
      {
        question: 'What is the difference between precision and recall?',
        options: [
          'Precision is about speed; recall is about accuracy',
          'Precision measures correct positive predictions, recall measures captured actual positives',
          'Precision is about negatives; recall is about positives',
          'There is no difference between them'
        ],
        correct: 1,
        explanation: 'Precision measures how many predicted churns were actual churns, while recall measures how many actual churns were detected, as described in section 10.8.'
      },
      {
        question: 'Which Python library is used in this project to deploy the model as an API?',
        options: [
          'NumPy',
          'Flask',
          'Pandas',
          'Scikit-learn'
        ],
        correct: 1,
        explanation: 'Flask is used to create a web API for model deployment, as shown in section 10.11.'
      },
      {
        question: 'What is the purpose of using GridSearchCV in model training?',
        options: [
          'To clean missing data',
          'To select the best hyperparameters for the model',
          'To deploy the model',
          'To visualize data'
        ],
        correct: 1,
        explanation: 'GridSearchCV is used for hyperparameter tuning to improve performance without overfitting, as described in section 10.9.'
      },
      {
        question: 'After training a model, why do we save it using joblib?',
        options: [
          'To share the dataset',
          'To delete the model',
          'To store the trained model for reuse without retraining',
          'To convert it into an Excel file'
        ],
        correct: 2,
        explanation: 'Saving the model allows reuse without retraining, enabling deployment or sharing, as noted in section 10.10.'
      },
      {
        question: 'Name one tool that can be used to explain why a model made a certain prediction.',
        options: [
          'PowerPoint',
          'Photoshop',
          'SHAP or LIME',
          'Flask'
        ],
        correct: 2,
        explanation: 'SHAP or LIME can be used to explain predictions to non-technical stakeholders, as mentioned in section 10.14.'
      }
    ]
  }
};
