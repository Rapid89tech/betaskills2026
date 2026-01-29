import type { Lesson } from '@/types/course';

export const lesson4ModelTrainingTips: Lesson = {
  id: 4,
  title: 'Model Training Tips',
  duration: '30 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=fCUkvL0mbxI',
    textContent: `<div class="lesson-content">

<h1>Model Training Tips</h1>

<p><strong>Effective model training ensures robust and reliable performance.</strong></p>

<h2>Ensure Clean and Balanced Datasets:</h2>
<ul>
  <li>Clean data to remove noise, missing values, or outliers.</li>
  <li>Address imbalanced classes (e.g., in fraud detection) using techniques like SMOTE.</li>
</ul>
<pre><code>from imblearn.over_sampling import SMOTE
smote = SMOTE(random_state=42)
X_train_balanced, y_train_balanced = smote.fit_resample(X_train, y_train)</code></pre>

<h2>Use Cross-Validation:</h2>
<ul>
  <li>Split data into k-folds to evaluate model stability and reduce overfitting.</li>
</ul>
<pre><code>from sklearn.model_selection import cross_val_score
scores = cross_val_score(model, X, y, cv=5, scoring='neg_mean_squared_error')
print(f"Cross-Validation MSE: {-scores.mean():.2f}")</code></pre>

<h2>Avoid Data Leakage:</h2>
<ul>
  <li>Ensure test data is not used during preprocessing or training.</li>
  <li>Apply preprocessing (e.g., scaling) only on training data, then transform test data.</li>
</ul>
<pre><code>scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)</code></pre>

<h2>Choose Appropriate Metrics:</h2>
<ul>
  <li>Use accuracy, precision, recall, or F1-score for classification.</li>
  <li>Use MSE, RMSE, or R² for regression.</li>
  <li>Example: Prioritize recall for medical diagnosis to minimize false negatives.</li>
</ul>

<h2>Regularization:</h2>
<ul>
  <li>Apply techniques like L1/L2 regularization (e.g., Ridge, Lasso) to prevent overfitting.</li>
</ul>
<pre><code>from sklearn.linear_model import Ridge
model = Ridge(alpha=1.0)
model.fit(X_train, y_train)</code></pre>

<h2>Early Stopping:</h2>
<ul>
  <li>Stop training when validation performance plateaus to avoid overfitting.</li>
</ul>
<pre><code>from sklearn.ensemble import GradientBoostingRegressor
model = GradientBoostingRegressor(n_estimators=100, validation_fraction=0.1, n_iter_no_change=5)</code></pre>

<h2>Training Parameters:</h2>
<ul>
  <li><strong>Epochs</strong>: Number of passes through the training data.</li>
  <li><strong>Batch Size</strong>: Number of samples processed before updating weights.</li>
  <li><strong>Learning Rate</strong>: Step size for weight updates (e.g., 0.001).</li>
</ul>

</div>`
  }
};
