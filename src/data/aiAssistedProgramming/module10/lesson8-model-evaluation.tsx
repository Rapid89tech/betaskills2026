import type { Lesson } from '@/types/course';

export const lesson8ModelEvaluation: Lesson = {
  id: 8,
  title: 'Model Evaluation',
  duration: '25 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=LbX4X71-TFI&t=3s',
    textContent: `<div class="lesson-content">

<h1>Model Evaluation</h1>

<h2>Metrics:</h2>

<ul>
  <li><strong>Accuracy</strong> – overall correctness.</li>
  <li><strong>Precision</strong> – how many predicted churns were actual churns.</li>
  <li><strong>Recall</strong> – how many actual churns were detected.</li>
  <li><strong>F1 Score</strong> – harmonic mean of precision and recall.</li>
</ul>

<h3>Example:</h3>
<pre><code>predictions = model.predict(X_test)
print(classification_report(y_test, predictions))</code></pre>

</div>`
  }
};
