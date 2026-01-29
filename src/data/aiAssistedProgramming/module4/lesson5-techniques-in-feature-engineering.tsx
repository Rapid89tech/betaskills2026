import type { Lesson } from '@/types/course';

export const lesson5TechniquesInFeatureEngineering: Lesson = {
  id: 5,
  title: 'Techniques in Feature Engineering',
  duration: '45 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=wxFaQGyaOKE',
    textContent: `<div class="lesson-content">

<h1>Techniques in Feature Engineering</h1>

<p><strong>Feature engineering involves a range of techniques to create, select, or transform features for better model performance.</strong></p>

<h2>1. Feature Creation</h2>
<p>Derive new features from existing data to capture additional information.</p>

<h3>Mathematical Transformations:</h3>
<p>Create features like ratios or products.</p>
<pre><code>df["bmi"] = df["weight"] / (df["height"] ** 2)  # BMI from weight and height</code></pre>

<h3>Time-Based Features:</h3>
<p>Extract day, month, or time differences.</p>
<pre><code>df["days_since_purchase"] = (pd.to_datetime("today") - pd.to_datetime(df["last_purchase"])).dt.days</code></pre>

<h3>Text Features:</h3>
<p>Extract word counts, TF-IDF scores, or sentiment scores.</p>
<pre><code>from textblob import TextBlob
df["sentiment"] = df["review"].apply(lambda x: TextBlob(x).sentiment.polarity)</code></pre>

<h2>2. Feature Selection</h2>
<p>Identify the most relevant features to reduce noise and improve efficiency.</p>

<h3>Correlation Analysis:</h3>
<p>Remove features with high correlation to avoid redundancy.</p>
<pre><code>corr_matrix = df.corr()
high_corr = corr_matrix[abs(corr_matrix) > 0.8]</code></pre>

<h3>Recursive Feature Elimination (RFE):</h3>
<p>Iteratively remove least important features.</p>
<pre><code>from sklearn.feature_selection import RFE
from sklearn.ensemble import RandomForestClassifier
model = RandomForestClassifier()
rfe = RFE(model, n_features_to_select=5)
rfe.fit(X, y)</code></pre>

<h3>LASSO Regression:</h3>
<p>Uses L1 regularization to select features by shrinking coefficients to zero.</p>
<pre><code>from sklearn.linear_model import Lasso
lasso = Lasso(alpha=0.1)
lasso.fit(X, y)
selected_features = X[:, lasso.coef_ != 0]</code></pre>

<h3>Feature Importance:</h3>
<p>Use tree-based models to rank features.</p>
<pre><code>from sklearn.ensemble import RandomForestClassifier
model = RandomForestClassifier()
model.fit(X, y)
importance = model.feature_importances_</code></pre>

<h2>3. Binning</h2>
<p>Convert continuous variables into discrete bins to simplify patterns.</p>

<h3>Example:</h3>
<p>Convert ages into bins like "child," "adult," or "senior."</p>
<pre><code>df["age_group"] = pd.cut(df["age"], bins=[0, 18, 35, 60, 100], labels=["child", "young_adult", "adult", "senior"])</code></pre>

<h2>4. Interaction Features</h2>
<p>Combine features to capture relationships.</p>

<h3>Example:</h3>
<p>Product of two features to model their interaction.</p>
<pre><code>df["feature_interaction"] = df["feature1"] * df["feature2"]</code></pre>

<h3>Polynomial Features:</h3>
<p>Generate higher-order interactions.</p>
<pre><code>from sklearn.preprocessing import PolynomialFeatures
poly = PolynomialFeatures(degree=2, interaction_only=True)
interaction_features = poly.fit_transform(X)</code></pre>

<h2>5. Domain-Specific Features</h2>
<p>Incorporate expert knowledge to create meaningful features.</p>

<h3>Example:</h3>
<p>In finance, calculate debt-to-income ratio for credit risk models.</p>
<pre><code>df["debt_to_income"] = df["debt"] / df["income"]</code></pre>

<h2>6. Handling Imbalanced Data</h2>
<p>For classification tasks, address imbalanced classes (e.g., fraud detection).</p>

<h3>Oversampling:</h3>
<p>Use techniques like SMOTE to generate synthetic minority class samples.</p>
<pre><code>from imblearn.over_sampling import SMOTE
smote = SMOTE()
X_balanced, y_balanced = smote.fit_resample(X, y)</code></pre>

<h3>Undersampling:</h3>
<p>Reduce majority class samples.</p>

</div>`
  }
};
