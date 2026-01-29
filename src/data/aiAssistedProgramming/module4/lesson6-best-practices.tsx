import type { Lesson } from '@/types/course';

export const lesson6BestPractices: Lesson = {
  id: 6,
  title: 'Best Practices',
  duration: '35 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=mgBvJPd7UP8',
    textContent: `<div class="lesson-content">

<h1>Best Practices</h1>

<p><strong>Adopting best practices ensures effective data preprocessing and feature engineering.</strong></p>

<h2>Visualize Data:</h2>
<ul>
  <li>Use histograms, scatter plots, or box plots to understand distributions and identify issues.</li>
</ul>
<pre><code>import seaborn as sns
sns.boxplot(x=df["feature"])
plt.show()</code></pre>

<h2>Avoid Data Leakage:</h2>
<ul>
  <li>Ensure test data is not used during preprocessing or feature engineering.</li>
  <li>Split data into train/test sets before preprocessing.</li>
</ul>
<pre><code>from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)</code></pre>

<h2>Normalize/Scale Features:</h2>
<ul>
  <li>Apply scaling for algorithms sensitive to feature magnitude (e.g., SVM, neural networks).</li>
  <li>Standardize numerical features and encode categorical ones appropriately.</li>
</ul>

<h2>Automate Preprocessing:</h2>
<ul>
  <li>Use pipelines to streamline preprocessing steps.</li>
</ul>
<pre><code>from sklearn.pipeline import Pipeline
pipeline = Pipeline([
    ("scaler", StandardScaler()),
    ("model", LogisticRegression())
])
pipeline.fit(X_train, y_train)</code></pre>

<h2>Validate Features:</h2>
<ul>
  <li>Test feature impact using cross-validation or feature importance scores.</li>
  <li>Remove features with low predictive power.</li>
</ul>

<h2>Document Preprocessing:</h2>
<ul>
  <li>Record steps (e.g., imputation methods, scaling parameters) for reproducibility.</li>
  <li>Use tools like MLflow for tracking.</li>
</ul>

<h2>Handle Bias and Fairness:</h2>
<ul>
  <li>Check for biases in data (e.g., underrepresentation of groups).</li>
  <li>Use fairness-aware preprocessing (e.g., reweighing samples).</li>
</ul>

<h2>Optimize for Efficiency:</h2>
<ul>
  <li>Use efficient data structures (e.g., NumPy arrays over lists).</li>
  <li>Parallelize preprocessing for large datasets with tools like Dask.</li>
</ul>

</div>`
  }
};
