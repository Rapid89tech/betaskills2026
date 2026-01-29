import type { Lesson } from '@/types/course';

export const lesson1WhatIsDeepLearning: Lesson = {
  id: 1,
  title: 'What is Deep Learning?',
  duration: '25 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/6M5VXKLf4D4',
    textContent: `<div class="lesson-content">

<h1>What is Deep Learning?</h1>

<p><strong>Deep Learning (DL) is a specialized subset of Machine Learning (ML) that leverages artificial neural networks (ANNs), inspired by the structure and function of the human brain, to model complex patterns in data. Unlike traditional ML, which relies on manually engineered features, deep learning automatically learns hierarchical feature representations from raw data, making it exceptionally powerful for tasks requiring high-dimensional or unstructured data.</strong></p>

<h2>Key Characteristics:</h2>
<ul>
  <li><strong>Neural Networks</strong>: Composed of interconnected layers of nodes (neurons) that process data through weighted computations and activation functions.</li>
  <li><strong>Large Datasets</strong>: Performs best with substantial data, enabling the capture of intricate patterns (e.g., millions of images for object recognition).</li>
  <li><strong>Computational Power</strong>: Relies on GPUs or TPUs to handle the intensive computations of deep networks.</li>
  <li><strong>End-to-End Learning</strong>: Models learn directly from raw inputs to outputs, reducing the need for manual feature engineering.</li>
</ul>

<h2>Advantages:</h2>
<ul>
  <li>Excels in tasks like image recognition, speech processing, and natural language understanding.</li>
  <li>Automatically extracts features, reducing reliance on domain expertise.</li>
  <li>Scales well with data and computational resources.</li>
</ul>

<h2>Challenges:</h2>
<ul>
  <li>Requires large, labeled datasets, which can be costly or time-consuming to acquire.</li>
  <li>Computationally expensive, necessitating specialized hardware.</li>
  <li>Can be prone to overfitting due to high model complexity.</li>
  <li>Interpretability is often limited compared to simpler ML models.</li>
</ul>

<h2>Applications:</h2>
<ul>
  <li><strong>Image Recognition</strong>: Identifying objects or faces in photos (e.g., facial recognition systems).</li>
  <li><strong>Speech Processing</strong>: Converting speech to text or generating speech (e.g., virtual assistants like Siri).</li>
  <li><strong>Natural Language Understanding</strong>: Sentiment analysis, machine translation, or chatbots.</li>
  <li><strong>Generative Tasks</strong>: Creating realistic images, music, or text (e.g., deepfakes, AI-generated art).</li>
</ul>

</div>`
  }
};
