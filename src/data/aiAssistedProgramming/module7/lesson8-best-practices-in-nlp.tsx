import type { Lesson } from '@/types/course';

export const lesson8BestPracticesInNLP: Lesson = {
  id: 8,
  title: 'Best Practices in NLP',
  duration: '25 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=GIikRdc7pVc',
    textContent: `<div class="lesson-content">

<h1>Best Practices in NLP</h1>

<p><strong>Adopting best practices ensures effective and robust NLP workflows.</strong></p>

<ul>
  <li><strong>Clean Text Thoroughly</strong>: Remove noise (e.g., HTML tags, emojis) and normalize text (e.g., lowercasing).</li>
  <li><strong>Choose Appropriate Vectorization</strong>: Use BoW/TF-IDF for simple tasks, embeddings for semantic tasks, and transformers for state-of-the-art performance.</li>
  <li><strong>Handle Imbalanced Data</strong>: Address skewed sentiment or class distributions using oversampling or class weights.</li>
</ul>
<pre><code>from sklearn.utils.class_weight import compute_class_weight
class_weights = compute_class_weight('balanced', classes=np.unique(y), y=y)</code></pre>

<ul>
  <li><strong>Leverage Pre-trained Models</strong>: Fine-tune models like BERT instead of training from scratch.</li>
  <li><strong>Validate with Domain-Specific Data</strong>: Ensure test data reflects real-world use cases.</li>
  <li><strong>Monitor Bias</strong>: Check for biases in training data (e.g., gender or cultural biases in sentiment analysis).</li>
  <li><strong>Optimize for Efficiency</strong>: Use spaCy for fast preprocessing or distilled models (e.g., DistilBERT) for lower resource usage.</li>
  <li><strong>Document Pipelines</strong>: Record preprocessing and modeling steps for reproducibility using tools like MLflow.</li>
</ul>

</div>`
  }
};
