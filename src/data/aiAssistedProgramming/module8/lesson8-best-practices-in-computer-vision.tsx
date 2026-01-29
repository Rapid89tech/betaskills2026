import type { Lesson } from '@/types/course';

export const lesson8BestPracticesInComputerVision: Lesson = {
  id: 8,
  title: 'Best Practices in Computer Vision',
  duration: '25 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=RNAH2BWk2gU',
    textContent: `<div class="lesson-content">

<h1>Best Practices in Computer Vision</h1>

<p><strong>Adopting best practices ensures robust and efficient computer vision workflows.</strong></p>

<ul>
  <li><strong>Preprocess Images Consistently: Normalize pixel values (e.g., to [0, 1]) and standardize sizes.</strong></li>
</ul>
<pre><code>image = image / 255.0  # Normalize pixel values</code></pre>

<ul>
  <li><strong>Leverage Pre-trained Models: Fine-tune models like VGG16 or ResNet for faster development.</strong></li>
</ul>
<pre><code>from tensorflow.keras.applications import ResNet50
model = ResNet50(weights='imagenet', include_top=False)</code></pre>

<ul>
  <li><strong>Use Data Augmentation: Apply augmentation to improve generalization, especially for small datasets.</strong></li>
  <li><strong>Validate with Real-World Data: Test models on diverse, representative images to ensure robustness.</strong></li>
  <li><strong>Optimize for Efficiency: Use lightweight models (e.g., MobileNet) for edge devices or real-time applications.</strong></li>
  <li><strong>Monitor Bias: Address biases in datasets (e.g., underrepresentation in facial recognition).</strong></li>
  <li><strong>Document Pipelines: Record preprocessing, model architecture, and training steps using tools like MLflow.</strong></li>
</ul>

</div>`
  }
};
