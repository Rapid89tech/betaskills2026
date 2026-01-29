import type { Lesson } from '@/types/course';

export const lesson2EvaluationMetricsByProblemType: Lesson = {
  id: 2,
  title: 'Evaluation Metrics by Problem Type',
  duration: '30 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=8EbTSHxBgik',
    textContent: `<div class="lesson-content">

<h1>Evaluation Metrics by Problem Type</h1>

<p><strong>Evaluation metrics quantify model performance, tailored to the problem type (classification, regression, etc.).</strong></p>

<h2>For Classification:</h2>
<table>
  <thead>
    <tr>
      <th><strong>Metric</strong></th>
      <th><strong>Description</strong></th>
      <th><strong>Formula</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Accuracy</strong></td>
      <td><strong>Percentage of correct predictions.</strong></td>
      <td><strong>(TP + TN) / (TP + TN + FP + FN)</strong></td>
    </tr>
    <tr>
      <td><strong>Precision</strong></td>
      <td><strong>Proportion of positive predictions that are correct.</strong></td>
      <td><strong>TP / (TP + FP)</strong></td>
    </tr>
    <tr>
      <td><strong>Recall (Sensitivity)</strong></td>
      <td><strong>Proportion of actual positives correctly identified.</strong></td>
      <td><strong>TP / (TP + FN)</strong></td>
    </tr>
    <tr>
      <td><strong>F1 Score</strong></td>
      <td><strong>Harmonic mean of precision and recall, balancing both.</strong></td>
      <td><strong>2 * (Precision * Recall) / (Precision + Recall)</strong></td>
    </tr>
    <tr>
      <td><strong>Confusion Matrix</strong></td>
      <td><strong>Table summarizing true positives (TP), true negatives (TN), false positives (FP), and false negatives (FN).</strong></td>
      <td><strong>N/A</strong></td>
    </tr>
  </tbody>
</table>

<h3>Example Code:</h3>
<pre><code>from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix

y_true = [1, 0, 1, 1, 0]
y_pred = [1, 1, 1, 0, 0]

print("Accuracy:", accuracy_score(y_true, y_pred))
print("Precision:", precision_score(y_true, y_pred))
print("Recall:", recall_score(y_true, y_pred))
print("F1 Score:", f1_score(y_true, y_pred))
print("Confusion Matrix:\\n", confusion_matrix(y_true, y_pred))</code></pre>

<h2>For Regression:</h2>
<table>
  <thead>
    <tr>
      <th><strong>Metric</strong></th>
      <th><strong>Description</strong></th>
      <th><strong>Formula</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Mean Absolute Error (MAE)</strong></td>
      <td><strong>Average absolute difference between predicted and actual values.</strong></td>
      <td><strong>mean(|y_true - y_pred|)</strong></td>
    </tr>
    <tr>
      <td><strong>Mean Squared Error (MSE)</strong></td>
      <td><strong>Average squared difference between predicted and actual values.</strong></td>
      <td><strong>mean((y_true - y_pred)^2)</strong></td>
    </tr>
    <tr>
      <td><strong>Root Mean Squared Error (RMSE)</strong></td>
      <td><strong>Square root of MSE, in the same units as the target.</strong></td>
      <td><strong>sqrt(mean((y_true - y_pred)^2))</strong></td>
    </tr>
    <tr>
      <td><strong>R² Score</strong></td>
      <td><strong>Proportion of variance in the target explained by the model (0 to 1).</strong></td>
      <td><strong>1 - (sum((y_true - y_pred)^2) / sum((y_true - mean(y_true))^2))</strong></td>
    </tr>
  </tbody>
</table>

<h3>Example Code:</h3>
<pre><code>from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import numpy as np

y_true = np.array([3.0, -0.5, 2.0, 7.0])
y_pred = np.array([2.5, 0.0, 2.1, 7.8])

print("MAE:", mean_absolute_error(y_true, y_pred))
print("MSE:", mean_squared_error(y_true, y_pred))
print("RMSE:", np.sqrt(mean_squared_error(y_true, y_pred)))
print("R²:", r2_score(y_true, y_pred))</code></pre>

<h2>Additional Metrics:</h2>
<ul>
  <li><strong>ROC-AUC</strong>: Measures classification performance by plotting true positive rate vs. false positive rate.</li>
  <li><strong>Log Loss</strong>: Quantifies uncertainty in classification predictions.</li>
  <li><strong>Mean Average Precision (mAP)</strong>: Used for ranking tasks or multi-label classification.</li>
</ul>

<h2>Considerations:</h2>
<ul>
  <li>Choose metrics aligned with the problem (e.g., prioritize recall for medical diagnostics to minimize false negatives).</li>
  <li>Use multiple metrics for a comprehensive evaluation (e.g., precision and recall for imbalanced datasets).</li>
</ul>

</div>`
  }
};
