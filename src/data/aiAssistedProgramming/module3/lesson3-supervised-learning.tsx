import type { Lesson } from '@/types/course';

export const lesson3SupervisedLearning: Lesson = {
  id: 3,
  title: 'Supervised Learning',
  duration: '35 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=4qVRBYAdLAo',
    textContent: `<div class="lesson-content">

<h1>Supervised Learning</h1>

<p><strong>Supervised Learning involves training a model on a dataset with labeled input-output pairs, where the model learns to map inputs to correct outputs. It is the most common ML approach due to its applicability to well-defined problems.</strong></p>

<h2>Features:</h2>
<ul>
  <li><strong>Labeled Data</strong>: Each input (e.g., an email) is paired with an output label (e.g., "spam" or "not spam").</li>
  <li><strong>Predictive Power</strong>: Models predict numerical values (regression) or categories (classification).</li>
  <li><strong>Real-World Dominance</strong>: Used in applications like fraud detection, medical diagnosis, and speech recognition.</li>
</ul>

<h2>Common Algorithms:</h2>
<ul>
  <li><strong>Linear Regression</strong>: Predicts continuous values (e.g., house prices) by fitting a linear equation.</li>
  <li><strong>Logistic Regression</strong>: Classifies data into categories (e.g., predicting if a customer will buy a product) using a sigmoid function.</li>
  <li><strong>Decision Trees</strong>: Splits data into branches based on feature values for classification or regression (e.g., predicting loan default).</li>
  <li><strong>Support Vector Machines (SVM)</strong>: Finds a hyperplane to separate classes with maximum margin (e.g., text classification).</li>
  <li><strong>K-Nearest Neighbors (KNN)</strong>: Classifies data based on the majority class of its k-nearest neighbors (e.g., image recognition).</li>
  <li><strong>Random Forests</strong>: Combines multiple decision trees to improve accuracy and reduce overfitting.</li>
  <li><strong>Gradient Boosting (e.g., XGBoost, LightGBM)</strong>: Iteratively builds trees to minimize errors, used in high-performance tasks like ranking.</li>
</ul>

<h2>Example:</h2>
<pre><code>from sklearn.linear_model import LogisticRegression
X = [[1, 2], [3, 4], [5, 6]]  # Features
y = [0, 1, 1]                  # Labels (binary)
model = LogisticRegression()
model.fit(X, y)
print(model.predict([[2, 3]]))  # Output: [1]</code></pre>

<h2>Use Cases:</h2>
<ul>
  <li><strong>Classification</strong>: Spam email detection, disease diagnosis, sentiment analysis.</li>
  <li><strong>Regression</strong>: Predicting stock prices, energy consumption, or customer lifetime value.</li>
</ul>

</div>`
  }
};
