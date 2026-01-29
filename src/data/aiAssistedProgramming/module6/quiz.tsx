import type { Quiz } from '@/types/course';

export const module6Quiz: Quiz = {
  id: 6,
  title: 'Module 6 Quiz: Deep Learning Fundamentals',
  duration: '20 minutes',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is deep learning?',
        options: [
          'A method for cleaning raw data',
          'A subset of ML using artificial neural networks',
          'A technique for manual feature selection',
          'A visualization tool for data analysis'
        ],
        correct: 1,
        explanation: 'Deep learning uses neural networks to model complex patterns, as described in section 6.1.'
      },
      {
        question: 'What is the role of the hidden layers in an artificial neural network?',
        options: [
          'To receive raw input data',
          'To perform mathematical transformations on data',
          'To produce the final prediction',
          'To optimize the learning rate'
        ],
        correct: 1,
        explanation: 'Hidden layers transform inputs through weighted computations and activations, as noted in section 6.2.'
      },
      {
        question: 'Which activation function is commonly used in hidden layers for its simplicity and speed?',
        options: [
          'Sigmoid',
          'ReLU (Rectified Linear Unit)',
          'Softmax',
          'Tanh'
        ],
        correct: 1,
        explanation: 'ReLU is fast and effective for hidden layers, preventing vanishing gradients, as listed in section 6.3.'
      },
      {
        question: 'Which type of neural network is best suited for image processing tasks?',
        options: [
          'Feedforward Neural Network',
          'Convolutional Neural Network (CNN)',
          'Recurrent Neural Network (RNN)',
          'Generative Adversarial Network (GAN)'
        ],
        correct: 1,
        explanation: 'CNNs are designed for image data, detecting spatial patterns, as described in section 6.4.'
      },
      {
        question: 'What is the purpose of backpropagation in neural network training?',
        options: [
          'To visualize the model\'s performance',
          'To adjust weights using gradients to minimize error',
          'To preprocess input data',
          'To select the optimizer'
        ],
        correct: 1,
        explanation: 'Backpropagation computes gradients to update weights, reducing prediction errors, as explained in section 6.5.'
      },
      {
        question: 'Which deep learning framework is preferred for research due to its dynamic computation graphs?',
        options: [
          'TensorFlow',
          'Keras',
          'PyTorch',
          'JAX'
        ],
        correct: 2,
        explanation: 'PyTorch is favored for research due to its flexibility and dynamic graphs, as noted in section 6.6.'
      },
      {
        question: 'In the Keras example, what does the model.fit method do?',
        options: [
          'Makes predictions on test data',
          'Trains the model on training data',
          'Saves the model for deployment',
          'Visualizes the network architecture'
        ],
        correct: 1,
        explanation: 'The model.fit method trains the neural network on input data, as shown in section 6.7.'
      },
      {
        question: 'What is a common solution to prevent overfitting in deep learning?',
        options: [
          'Increase model complexity',
          'Add dropout layers',
          'Reduce training epochs',
          'Train on test data'
        ],
        correct: 1,
        explanation: 'Dropout layers randomly disable neurons to prevent overfitting, as described in section 6.8.'
      },
      {
        question: 'Which application is an example of deep learning in action?',
        options: [
          'Manual data cleaning',
          'Face recognition in security systems',
          'Basic arithmetic calculations',
          'Feature selection'
        ],
        correct: 1,
        explanation: 'Face recognition is a key deep learning application, as listed in section 6.9.'
      },
      {
        question: 'What is a challenge of deep learning compared to traditional machine learning?',
        options: [
          'It requires less computational power',
          'It needs large datasets and specialized hardware',
          'It is always more interpretable',
          'It avoids overfitting'
        ],
        correct: 1,
        explanation: 'Deep learning requires significant data and computational resources (e.g., GPUs), as noted in section 6.1.'
      }
    ]
  }
};
