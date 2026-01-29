import type { Lesson } from '@/types/course';

export const lesson5OverfittingVsUnderfitting: Lesson = {
  id: 5,
  title: 'Overfitting vs. Underfitting',
  duration: '30 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=0RT2Q0qwXSA',
    textContent: `<div class="lesson-content">

<h1>Overfitting vs. Underfitting</h1>

<p><strong>Overfitting and underfitting are common challenges in model training that affect performance.</strong></p>

<table>
  <thead>
    <tr>
      <th><strong>Type</strong></th>
      <th><strong>Description</strong></th>
      <th><strong>Symptoms</strong></th>
      <th><strong>Solutions</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Overfitting</strong></td>
      <td>Model learns noise and specifics of training data, performing poorly on test data.</td>
      <td>High training accuracy, low test accuracy.</td>
      <td>Simplify model, add regularization, increase data, use dropout.</td>
    </tr>
    <tr>
      <td><strong>Underfitting</strong></td>
      <td>Model is too simple to capture data patterns, performing poorly on both training and test data.</td>
      <td>Low accuracy on both sets.</td>
      <td>Increase model complexity, improve features, train longer.</td>
    </tr>
  </tbody>
</table>

<h2>Detection:</h2>
<p><strong>Learning Curves</strong>: Plot training and validation loss to identify overfitting (diverging curves) or underfitting (high loss).</p>
<pre><code>from sklearn.model_selection import learning_curve
train_sizes, train_scores, val_scores = learning_curve(model, X, y, cv=5)
plt.plot(train_sizes, train_scores.mean(axis=1), label="Training Score")
plt.plot(train_sizes, val_scores.mean(axis=1), label="Validation Score")
plt.legend()
plt.show()</code></pre>

<h2>Mitigation:</h2>
<ul>
  <li><strong>Overfitting</strong>: Use regularization, cross-validation, or more diverse data.</li>
  <li><strong>Underfitting</strong>: Add features, increase model complexity (e.g., more layers in neural networks), or improve feature engineering.</li>
</ul>

</div>`
  }
};
