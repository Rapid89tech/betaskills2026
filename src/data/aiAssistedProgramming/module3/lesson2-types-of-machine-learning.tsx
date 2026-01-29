import type { Lesson } from '@/types/course';

export const lesson2TypesOfMachineLearning: Lesson = {
  id: 2,
  title: 'Types of Machine Learning',
  duration: '30 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=olFxW7kdtP8',
    textContent: `<div class="lesson-content">

<h1>Types of Machine Learning</h1>

<p><strong>Machine Learning is categorized into three main types, each suited to different problems and data scenarios:</strong></p>

<table>
  <thead>
    <tr>
      <th><strong>Type</strong></th>
      <th><strong>Description</strong></th>
      <th><strong>Example</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Supervised Learning</strong></td>
      <td>Uses labeled data (input-output pairs) to train models that predict or classify.</td>
      <td>Email spam detection, house price prediction.</td>
    </tr>
    <tr>
      <td><strong>Unsupervised Learning</strong></td>
      <td>Analyzes unlabeled data to find hidden patterns or groupings.</td>
      <td>Customer segmentation, anomaly detection.</td>
    </tr>
    <tr>
      <td><strong>Reinforcement Learning</strong></td>
      <td>An agent learns optimal actions through trial and error, guided by rewards.</td>
      <td>Game-playing AI (e.g., AlphaGo), robotics.</td>
    </tr>
  </tbody>
</table>

<h2>Additional Categories:</h2>
<ul>
  <li><strong>Semi-Supervised Learning</strong>: Combines labeled and unlabeled data, useful when labeling is expensive (e.g., image classification with limited labeled images).</li>
  <li><strong>Self-Supervised Learning</strong>: Generates labels from the data itself, common in NLP (e.g., pre-training language models like BERT).</li>
  <li><strong>Transfer Learning</strong>: Reuses a pre-trained model for a new task, widely used in deep learning (e.g., fine-tuning a pre-trained CNN for medical imaging).</li>
</ul>

</div>`
  }
};
