import type { Lesson } from '@/types/course';

export const lesson4TypesOfNeuralNetworks: Lesson = {
  id: 4,
  title: 'Types of Neural Networks',
  duration: '30 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/6M5VXKLf4D4',
    textContent: `<div class="lesson-content">

<h1>Types of Neural Networks</h1>

<p><strong>Different neural network architectures are designed for specific tasks, leveraging unique structures to handle data effectively.</strong></p>

<table>
  <thead>
    <tr>
      <th><strong>Type</strong></th>
      <th><strong>Use Case</strong></th>
      <th><strong>Description</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Feedforward Neural Networks (FNN)</strong></td>
      <td><strong>Basic ANN for simple tasks</strong></td>
      <td><strong>Data flows in one direction; used for tabular data or simple classification.</strong></td>
    </tr>
    <tr>
      <td><strong>Convolutional Neural Networks (CNNs)</strong></td>
      <td><strong>Image and video processing</strong></td>
      <td><strong>Uses convolutional layers to detect spatial patterns (e.g., edges, textures).</strong></td>
    </tr>
    <tr>
      <td><strong>Recurrent Neural Networks (RNNs)</strong></td>
      <td><strong>Sequence data (text, time series)</strong></td>
      <td><strong>Processes sequential data with memory (e.g., LSTMs or GRUs for NLP).</strong></td>
    </tr>
    <tr>
      <td><strong>Generative Adversarial Networks (GANs)</strong></td>
      <td><strong>Data generation (images, text)</strong></td>
      <td><strong>Two networks (generator and discriminator) compete to create realistic data.</strong></td>
    </tr>
    <tr>
      <td><strong>Transformers</strong></td>
      <td><strong>NLP and vision tasks</strong></td>
      <td><strong>Uses attention mechanisms for tasks like machine translation or image analysis.</strong></td>
    </tr>
    <tr>
      <td><strong>Autoencoders</strong></td>
      <td><strong>Unsupervised learning, denoising</strong></td>
      <td><strong>Compresses and reconstructs data for tasks like anomaly detection.</strong></td>
    </tr>
  </tbody>
</table>

<h2>Examples:</h2>
<ul>
  <li><strong>CNNs</strong>: Classifying images in datasets like ImageNet or detecting tumors in medical scans.</li>
  <li><strong>RNNs</strong>: Predicting stock prices or generating text sequences.</li>
  <li><strong>GANs</strong>: Creating realistic images or synthetic datasets.</li>
  <li><strong>Transformers</strong>: Powering models like BERT for text understanding or ViT for vision tasks.</li>
</ul>

</div>`
  }
};
