import type { Lesson } from '@/types/course';

export const lesson1WhatIsComputerVision: Lesson = {
  id: 1,
  title: 'What is Computer Vision?',
  duration: '25 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=puB-4LuRNys',
    textContent: `<div class="lesson-content">

<h1>What is Computer Vision?</h1>

<p><strong>Computer Vision (CV) is a field of Artificial Intelligence (AI) that enables machines to interpret and understand visual data, such as images and videos, mimicking human visual perception. By processing pixel data, CV systems extract meaningful information to perform tasks like recognizing objects, detecting faces, or analyzing medical scans.</strong></p>

<h2>Key Characteristics:</h2>
<ul>
  <li><strong>Visual Data Processing</strong>: Analyzes images or videos to identify patterns, objects, or features.</li>
  <li><strong>Deep Learning Integration</strong>: Leverages neural networks, especially Convolutional Neural Networks (CNNs), for advanced tasks.</li>
  <li><strong>Multidisciplinary</strong>: Combines AI, machine learning, image processing, and signal processing.</li>
  <li><strong>Real-Time Capabilities</strong>: Many CV applications require fast processing for real-time use (e.g., autonomous vehicles).</li>
</ul>

<h2>Advantages:</h2>
<ul>
  <li>Automates visual tasks, reducing human effort in fields like surveillance or medical diagnostics.</li>
  <li>Scales to process large volumes of visual data (e.g., analyzing thousands of images).</li>
  <li>Enhances accuracy in tasks like object detection or facial recognition with modern deep learning models.</li>
</ul>

<h2>Challenges:</h2>
<ul>
  <li><strong>High Computational Cost</strong>: Requires powerful hardware (e.g., GPUs) for deep learning models.</li>
  <li><strong>Data Requirements</strong>: Needs large, labeled datasets for training robust models.</li>
  <li><strong>Variability</strong>: Handles variations in lighting, angles, or occlusions in visual data.</li>
  <li><strong>Bias</strong>: Models can inherit biases from training data, affecting fairness (e.g., in facial recognition).</li>
</ul>

<h2>Applications:</h2>
<ul>
  <li><strong>Facial Recognition</strong>: Security systems, user authentication (e.g., smartphone unlocking).</li>
  <li><strong>Object Detection</strong>: Identifying objects in autonomous vehicles or retail surveillance.</li>
  <li><strong>Medical Imaging</strong>: Diagnosing diseases from X-rays or MRIs.</li>
  <li><strong>Augmented Reality</strong>: Overlaying digital content on real-world visuals.</li>
  <li><strong>Video Analysis</strong>: Motion tracking or event detection in sports or security footage.</li>
</ul>

</div>`
  }
};
