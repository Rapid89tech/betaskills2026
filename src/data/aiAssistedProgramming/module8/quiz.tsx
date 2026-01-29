import type { Quiz } from '@/types/course';

export const module8Quiz: Quiz = {
  id: 8,
  title: 'Module 8 Quiz: Computer Vision Fundamentals',
  duration: '20 minutes',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the primary goal of computer vision?',
        options: [
          'To process numerical data for predictions',
          'To enable machines to interpret and understand visual data',
          'To generate human-like text',
          'To optimize computational resources'
        ],
        correct: 1,
        explanation: 'Computer vision focuses on processing images and videos, as described in section 8.1.'
      },
      {
        question: 'Which computer vision task involves assigning a single label to an entire image?',
        options: [
          'Object Detection',
          'Image Classification',
          'Image Segmentation',
          'Face Recognition'
        ],
        correct: 1,
        explanation: 'Image classification assigns a category to an image, as noted in section 8.2.'
      },
      {
        question: 'Which library is best suited for basic image processing tasks like resizing or edge detection?',
        options: [
          'TensorFlow',
          'OpenCV',
          'PyTorch',
          'MediaPipe'
        ],
        correct: 1,
        explanation: 'OpenCV is designed for core image processing tasks, as listed in section 8.3.'
      },
      {
        question: 'What is the role of convolution layers in a CNN?',
        options: [
          'Reduce image dimensions',
          'Detect features like edges or textures',
          'Perform final classification',
          'Normalize pixel values'
        ],
        correct: 1,
        explanation: 'Convolution layers apply filters to detect features, as described in section 8.5.'
      },
      {
        question: 'What is the purpose of pooling layers in a CNN?',
        options: [
          'To classify the image',
          'To reduce dimensions and computation',
          'To apply activation functions',
          'To generate new images'
        ],
        correct: 1,
        explanation: 'Pooling layers downsample feature maps, as noted in section 8.5.'
      },
      {
        question: 'Which data augmentation technique helps prevent overfitting by creating modified images?',
        options: [
          'Edge Detection',
          'Image Flipping',
          'Thresholding',
          'Color Space Conversion'
        ],
        correct: 1,
        explanation: 'Flipping is a common augmentation technique to increase dataset diversity, as described in section 8.6.'
      },
      {
        question: 'Which computer vision application involves analyzing medical scans like MRIs?',
        options: [
          'License Plate Recognition',
          'Medical Image Analysis',
          'Retail Surveillance',
          'Augmented Reality'
        ],
        correct: 1,
        explanation: 'Medical image analysis uses CV to diagnose diseases from scans, as listed in section 8.7.'
      },
      {
        question: 'What is a benefit of using pre-trained CNN models like VGG16?',
        options: [
          'They require no training data',
          'They enable faster development through fine-tuning',
          'They are only used for edge detection',
          'They eliminate the need for GPUs'
        ],
        correct: 1,
        explanation: 'Pre-trained models like VGG16 speed up development by leveraging learned features, as noted in section 8.8.'
      },
      {
        question: 'What is a challenge in computer vision related to visual data?',
        options: [
          'Handling numerical data',
          'Managing variability in lighting or angles',
          'Generating text descriptions',
          'Reducing dataset size'
        ],
        correct: 1,
        explanation: 'Variability in lighting or angles is a key challenge in CV, as mentioned in section 8.1.'
      },
      {
        question: 'Which tool is optimized for real-time face or pose tracking?',
        options: [
          'TensorFlow',
          'OpenCV',
          'MediaPipe',
          'YOLO'
        ],
        correct: 2,
        explanation: 'MediaPipe is designed for real-time tracking tasks like face or pose detection, as listed in section 8.3.'
      }
    ]
  }
};
