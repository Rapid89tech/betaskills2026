import type { Lesson } from '@/types/course';

export const lesson6PopularDeepLearningFrameworks: Lesson = {
  id: 6,
  title: 'Popular Deep Learning Frameworks',
  duration: '25 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/6M5VXKLf4D4',
    textContent: `<div class="lesson-content">

<h1>Popular Deep Learning Frameworks</h1>

<p><strong>Deep learning frameworks simplify the design, training, and deployment of neural networks.</strong></p>

<table>
  <thead>
    <tr>
      <th><strong>Framework</strong></th>
      <th><strong>Description</strong></th>
      <th><strong>Use Case</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>TensorFlow</strong></td>
      <td><strong>Google's open-source framework for scalable DL</strong></td>
      <td><strong>Production-grade models, mobile/edge deployment.</strong></td>
    </tr>
    <tr>
      <td><strong>Keras</strong></td>
      <td><strong>High-level API, often integrated with TensorFlow</strong></td>
      <td><strong>Rapid prototyping, beginner-friendly.</strong></td>
    </tr>
    <tr>
      <td><strong>PyTorch</strong></td>
      <td><strong>Flexible framework, preferred for research</strong></td>
      <td><strong>Dynamic computation graphs, NLP, vision.</strong></td>
    </tr>
    <tr>
      <td><strong>JAX</strong></td>
      <td><strong>High-performance numerical computing</strong></td>
      <td><strong>Research, custom gradient computations.</strong></td>
    </tr>
    <tr>
      <td><strong>Hugging Face</strong></td>
      <td><strong>Specialized for NLP with pre-trained models</strong></td>
      <td><strong>Fine-tuning transformers like BERT.</strong></td>
    </tr>
  </tbody>
</table>

<h2>Example Installation:</h2>
<pre><code>pip install tensorflow torch transformers</code></pre>

<h2>Considerations:</h2>
<ul>
  <li><strong>TensorFlow</strong>: Best for large-scale production and cross-platform deployment.</li>
  <li><strong>PyTorch</strong>: Ideal for research due to dynamic graphs and debugging ease.</li>
  <li><strong>Keras</strong>: Simplifies neural network design for quick experimentation.</li>
</ul>

</div>`
  }
};
