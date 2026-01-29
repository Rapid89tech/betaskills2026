import type { Lesson } from '@/types/course';

export const lesson3CrossValidation: Lesson = {
  id: 3,
  title: 'Cross-Validation',
  duration: '25 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=fSytzGwwBVw',
    textContent: `<div class="lesson-content">

<h1>Cross-Validation</h1>

<p><strong>Cross-validation assesses model performance by testing on multiple data splits, ensuring robustness and reducing reliance on a single train-test split.</strong></p>

<h2>K-Fold Cross-Validation:</h2>
<ul>
  <li>Splits data into k equal parts (folds).</li>
  <li>Trains the model on k-1 folds and tests on the remaining fold.</li>
  <li>Repeats k times, averaging performance metrics.</li>
  <li>Common choice: k=5 or k=10.</li>
</ul>

<h3>Example Code:</h3>
<pre><code>from sklearn.model_selection import cross_val_score
from sklearn.linear_model import LogisticRegression

model = LogisticRegression()
scores = cross_val_score(model, X, y, cv=5, scoring='accuracy')
print("Cross-Validation Accuracy:", scores.mean(), "±", scores.std())</code></pre>

<h2>Variants:</h2>
<ul>
  <li><strong>Stratified K-Fold</strong>: Maintains class proportions in each fold, ideal for imbalanced classification.</li>
</ul>
<pre><code>from sklearn.model_selection import StratifiedKFold
skf = StratifiedKFold(n_splits=5)</code></pre>

<ul>
  <li><strong>Leave-One-Out (LOO)</strong>: Uses one sample for testing, rest for training (computationally expensive).</li>
  <li><strong>Time Series Split</strong>: For sequential data, ensures training data precedes test data.</li>
</ul>

<h2>Benefits:</h2>
<ul>
  <li>Provides a more reliable estimate of model performance.</li>
  <li>Reduces overfitting by evaluating on multiple subsets.</li>
  <li>Helps detect data variability or bias.</li>
</ul>

<h2>Considerations:</h2>
<ul>
  <li>Computationally expensive for large datasets or complex models.</li>
  <li>Choose k based on dataset size (larger k for small datasets).</li>
</ul>

</div>`
  }
};
