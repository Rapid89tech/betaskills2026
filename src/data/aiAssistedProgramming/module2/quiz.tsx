import type { Quiz } from '@/types/course';

export const module2Quiz: Quiz = {
  id: 2,
  title: 'Module 2 Quiz: Python for AI Programming',
  duration: '20 minutes',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'Why is Python the most popular language for AI programming?',
        options: [
          'It is the fastest language for numerical computations',
          'It has a simple syntax and extensive AI libraries',
          'It is exclusively used for web development',
          'It lacks community support'
        ],
        correct: 1,
        explanation: 'Python\'s simplicity, readability, and libraries like NumPy, TensorFlow, and PyTorch make it ideal for AI, as noted in section 2.1.'
      },
      {
        question: 'Which Python data type represents a key-value pair collection?',
        options: [
          'list',
          'tuple',
          'dict',
          'set'
        ],
        correct: 2,
        explanation: 'A dictionary (dict) stores key-value pairs, such as {"name": "Alice", "score": 88}, as described in section 2.2.'
      },
      {
        question: 'What is the output of the following code?\n\nscore = 80\nif score > 90:\n    print("Excellent")\nelif score > 75:\n    print("Good")\nelse:\n    print("Needs Improvement")',
        options: [
          'Excellent',
          'Good',
          'Needs Improvement',
          'No output'
        ],
        correct: 1,
        explanation: 'The condition score > 75 is true for score = 80, so "Good" is printed, as per section 2.3.'
      },
      {
        question: 'What is the purpose of a for loop in Python?',
        options: [
          'To execute code while a condition is true',
          'To iterate over a sequence',
          'To define reusable functions',
          'To handle errors'
        ],
        correct: 1,
        explanation: 'A for loop iterates over sequences like lists or ranges, as explained in section 2.3.'
      },
      {
        question: 'What does the following function do?\n\ndef calculate_loss(predicted, actual):\n    return sum((p - a) ** 2 for p, a in zip(predicted, actual)) / len(predicted)',
        options: [
          'Computes mean squared error',
          'Sorts a list',
          'Normalizes data',
          'Generates random numbers'
        ],
        correct: 0,
        explanation: 'The function calculates the mean squared error (MSE) between predicted and actual values, as shown in section 2.4.'
      },
      {
        question: 'Which Python library is primarily used for data visualization in AI workflows?',
        options: [
          'NumPy',
          'Pandas',
          'Matplotlib',
          'Scikit-learn'
        ],
        correct: 2,
        explanation: 'Matplotlib is used for creating plots and visualizations, such as loss curves or data distributions, as listed in section 2.5.'
      },
      {
        question: 'In the AI workflow example, what does the model.fit(X, y) method do?',
        options: [
          'Makes predictions on new data',
          'Trains the model on input data X and target y',
          'Visualizes the dataset',
          'Cleans the input data'
        ],
        correct: 1,
        explanation: 'The fit method trains the model by optimizing its parameters using the input features (X) and target values (y), as shown in section 2.6.'
      },
      {
        question: 'What is a key benefit of using Jupyter Notebook for AI development?',
        options: [
          'It compiles Python code into machine code',
          'It supports interactive coding and visualizations',
          'It replaces virtual environments',
          'It is a deep learning framework'
        ],
        correct: 1,
        explanation: 'Jupyter Notebook allows interactive coding, data analysis, and visualization, making it ideal for AI development, as described in section 2.7.'
      },
      {
        question: 'Which best practice helps manage dependencies in Python AI projects?',
        options: [
          'Writing inline visualizations',
          'Using virtual environments',
          'Avoiding comments in code',
          'Hardcoding model parameters'
        ],
        correct: 1,
        explanation: 'Virtual environments isolate project dependencies to avoid conflicts, as recommended in section 2.8.'
      },
      {
        question: 'Which library is best suited for building and fine-tuning NLP models like BERT?',
        options: [
          'OpenCV',
          'Hugging Face',
          'SciPy',
          'Matplotlib'
        ],
        correct: 1,
        explanation: 'Hugging Face provides pre-trained NLP models and tools for fine-tuning tasks like sentiment analysis or text generation, as noted in section 2.5.'
      }
    ]
  }
};
