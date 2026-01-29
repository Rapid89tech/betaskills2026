import type { Lesson } from '@/types/course';

export const lesson5ModelSavingAndSerialization: Lesson = {
  id: 5,
  title: 'Model Saving and Serialization',
  duration: '20 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=KfnhNlD8WZI',
    textContent: `<div class="lesson-content">

<h1>Model Saving and Serialization</h1>

<p><strong>Saving trained models allows reuse without retraining, enabling deployment or sharing.</strong></p>

<h2>Methods:</h2>

<h3>Pickle: General-purpose Python serialization.</h3>
<pre><code>import pickle

with open('model.pkl', 'wb') as f:
    pickle.dump(model, f)

# Load model
with open('model.pkl', 'rb') as f:
    model = pickle.load(f)</code></pre>

<h3>Joblib: Optimized for large NumPy arrays, common in ML models.</h3>
<pre><code>import joblib

joblib.dump(model, 'model.pkl')

# Load model
model = joblib.load('model.pkl')</code></pre>

<h2>Considerations:</h2>
<ul>
  <li><strong>Joblib vs. Pickle</strong>: Joblib is faster for scikit-learn models with large arrays.</li>
  <li><strong>Security</strong>: Avoid loading untrusted pickle files due to potential vulnerabilities.</li>
  <li><strong>Versioning</strong>: Save model metadata (e.g., library versions) for reproducibility.</li>
</ul>

</div>`
  }
};
