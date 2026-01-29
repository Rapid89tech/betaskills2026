import type { Lesson } from '@/types/course';

export const lesson6ModelEvaluationMetrics: Lesson = {
  id: 6,
  title: 'Model Evaluation Metrics',
  duration: '35 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=FXokoJUhsLQ',
    textContent: `<div class="lesson-content">

<h1>Model Evaluation Metrics</h1>

<p><strong>Evaluation metrics quantify a model's performance, tailored to the task.</strong></p>

<h2>For Classification:</h2>
<ul>
  <li><strong>Accuracy</strong>: Proportion of correct predictions (correct/total).</li>
  <li><strong>Precision</strong>: Correct positive predictions out of total predicted positives (TP/(TP+FP)).</li>
  <li><strong>Recall</strong>: Correct positive predictions out of actual positives (TP/(TP+FN)).</li>
  <li><strong>F1 Score</strong>: Harmonic mean of precision and recall (2 * (precision * recall)/(precision + recall)).</li>
</ul>

<p><strong>Confusion Matrix</strong>: Table showing true positives (TP), true negatives (TN), false positives (FP), and false negatives (FN).</p>
<pre><code>from sklearn.metrics import confusion_matrix
cm = confusion_matrix(y_test, predictions)
print("Confusion Matrix:\\n", cm)</code></pre>

<h2>For Regression:</h2>
<ul>
  <li><strong>Mean Squared Error (MSE)</strong>: Average of squared differences between predicted and actual values.</li>
</ul>

<p><strong>Root Mean Squared Error (RMSE)</strong>: Square root of MSE, in the same units as the target.</p>
<pre><code>rmse = np.sqrt(mean_squared_error(y_test, predictions))
print(f"RMSE: {rmse:.2f}")</code></pre>

<p><strong>Mean Absolute Error (MAE)</strong>: Average of absolute differences between predicted and actual values.</p>
<pre><code>from sklearn.metrics import mean_absolute_error
mae = mean_absolute_error(y_test, predictions)
print(f"MAE: {mae:.2f}")</code></pre>

<p><strong>R² Score</strong>: Proportion of variance explained by the model (0 to 1, higher is better).</p>
<pre><code>from sklearn.metrics import r2_score
r2 = r2_score(y_test, predictions)
print(f"R² Score: {r2:.2f}")</code></pre>

<h2>Advanced Metrics:</h2>
<ul>
  <li><strong>ROC-AUC</strong>: Area under the Receiver Operating Characteristic curve for classification.</li>
  <li><strong>Log Loss</strong>: Measures uncertainty in classification predictions.</li>
  <li><strong>Mean Average Precision (mAP)</strong>: For ranking tasks or multi-label classification.</li>
</ul>

</div>`
  }
};
