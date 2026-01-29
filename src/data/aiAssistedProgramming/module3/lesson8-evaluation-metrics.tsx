import type { Lesson } from '@/types/course';

export const lesson8EvaluationMetrics: Lesson = {
  id: 8,
  title: 'Evaluation Metrics',
  duration: '35 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=LbX4X71-TFI',
    textContent: `<div class="lesson-content">

<h1>Evaluation Metrics</h1>

<p><strong>Evaluation metrics quantify a model's performance, tailored to the task (classification, regression, etc.).</strong></p>

<table>
  <thead>
    <tr>
      <th><strong>Metric</strong></th>
      <th><strong>Description</strong></th>
      <th><strong>Use Case</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Accuracy</strong></td>
      <td>Proportion of correct predictions (correct/total).</td>
      <td>General classification performance.</td>
    </tr>
    <tr>
      <td><strong>Precision</strong></td>
      <td>Correct positive predictions out of total predicted positives (TP/(TP+FP)).</td>
      <td>When false positives are costly (e.g., spam detection).</td>
    </tr>
    <tr>
      <td><strong>Recall</strong></td>
      <td>Correct positive predictions out of actual positives (TP/(TP+FN)).</td>
      <td>When false negatives are costly (e.g., disease detection).</td>
    </tr>
    <tr>
      <td><strong>F1 Score</strong></td>
      <td>Harmonic mean of precision and recall (2 * (precision * recall)/(precision + recall)).</td>
      <td>Balances precision and recall.</td>
    </tr>
    <tr>
      <td><strong>Confusion Matrix</strong></td>
      <td>Table summarizing true positives (TP), true negatives (TN), false positives (FP), and false negatives (FN).</td>
      <td>Detailed classification analysis.</td>
    </tr>
    <tr>
      <td><strong>Mean Squared Error (MSE)</strong></td>
      <td>Average of squared differences between predicted and actual values.</td>
      <td>Regression tasks (e.g., price prediction).</td>
    </tr>
    <tr>
      <td><strong>R² Score</strong></td>
      <td>Proportion of variance in target explained by the model.</td>
      <td>Regression model fit.</td>
    </tr>
    <tr>
      <td><strong>ROC-AUC</strong></td>
      <td>Area under the Receiver Operating Characteristic curve, measuring classification performance.</td>
      <td>Binary classification.</td>
    </tr>
  </tbody>
</table>

<h2>Example:</h2>
<p>For a binary classifier:</p>
<pre><code>from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
y_true = [0, 1, 1, 0]
y_pred = [0, 1, 0, 0]
print(f"Accuracy: {accuracy_score(y_true, y_pred):.2f}")  # Output: 0.75
print(f"Precision: {precision_score(y_true, y_pred):.2f}")  # Output: 1.00
print(f"Recall: {recall_score(y_true, y_pred):.2f}")  # Output: 0.50
print(f"F1 Score: {f1_score(y_true, y_pred):.2f}")  # Output: 0.67</code></pre>

</div>`
  }
};
