import type { Lesson } from '@/types/course';

export const lesson10SaveTheModel: Lesson = {
  id: 10,
  title: 'Save the Model',
  duration: '15 minutes',
  type: 'video',
  content: {
    videoUrl: '',
    textContent: `<div class="lesson-content">

<h1>Save the Model</h1>

<h3>Example:</h3>
<pre><code>import joblib

joblib.dump(grid.best_estimator_, 'churn_model.pkl')</code></pre>

<h2>Best practice:</h2>
<p><strong>Save both the model and preprocessing pipeline to ensure consistent future predictions.</strong></p>

</div>`
  }
};
