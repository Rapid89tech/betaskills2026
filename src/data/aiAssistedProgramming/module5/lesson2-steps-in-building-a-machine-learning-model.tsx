import type { Lesson } from '@/types/course';

export const lesson2StepsInBuildingAMachineLearningModel: Lesson = {
  id: 2,
  title: 'Steps in Building a Machine Learning Model',
  duration: '40 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=jcgaNrC4ElU',
    textContent: `<div class="lesson-content">

<h1>Steps in Building a Machine Learning Model</h1>

<p><strong>Building an ML model follows a structured workflow to ensure accuracy, reproducibility, and efficiency. Below is an expanded explanation of each step with practical examples.</strong></p>

<h2>1. Import Required Libraries</h2>
<p>Load necessary Python libraries for data handling, model training, and evaluation.</p>
<pre><code>import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error</code></pre>

<h3>Common Libraries:</h3>
<ul>
  <li><strong>Pandas</strong>: Data manipulation and loading.</li>
  <li><strong>NumPy</strong>: Numerical operations and array handling.</li>
  <li><strong>Scikit-learn</strong>: ML algorithms, preprocessing, and evaluation.</li>
  <li><strong>TensorFlow/PyTorch</strong>: Deep learning frameworks.</li>
  <li><strong>Matplotlib/Seaborn</strong>: Visualization for analysis.</li>
</ul>

<h2>2. Load and Prepare the Dataset</h2>
<p>Load data from sources (e.g., CSV, databases, APIs) and preprocess it to ensure quality.</p>
<pre><code># Load dataset
df = pd.read_csv('data.csv')

# Select features and target
X = df[['feature1', 'feature2']]  # Input features
y = df['target']                  # Output variable

# Handle missing values
df.fillna(df.mean(), inplace=True)</code></pre>

<h3>Preprocessing Tasks:</h3>
<ul>
  <li>Remove or impute missing values.</li>
  <li>Encode categorical variables (e.g., one-hot encoding).</li>
  <li>Scale numerical features (e.g., standardization).</li>
  <li>Remove outliers or duplicates.</li>
</ul>

<h2>3. Split the Data</h2>
<p>Divide the dataset into training, validation, and test sets to evaluate model performance.</p>
<pre><code>X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)</code></pre>

<h3>Train-Test Split:</h3>
<ul>
  <li><strong>Training Set</strong> (70-80%): Used to train the model.</li>
  <li><strong>Test Set</strong> (20-30%): Used to evaluate final performance.</li>
  <li><strong>Validation Set</strong> (optional): Used for hyperparameter tuning.</li>
</ul>
<ul>
  <li><strong>Random State</strong>: Ensures reproducibility of the split.</li>
  <li><strong>Stratified Splitting</strong>: For classification, maintain class proportions using stratify=y.</li>
</ul>

<h2>4. Choose and Train the Model</h2>
<p>Select an appropriate algorithm and train it on the training data.</p>
<pre><code>model = LinearRegression()
model.fit(X_train, y_train)</code></pre>

<h3>Training Process:</h3>
<ul>
  <li>The model optimizes its parameters (e.g., weights in linear regression) to minimize a loss function.</li>
  <li>Example: Gradient descent minimizes mean squared error in regression.</li>
</ul>
<p><strong>Algorithm Selection</strong>: Depends on task type (see section 5.3).</p>

<h2>5. Make Predictions</h2>
<p>Use the trained model to predict outcomes on the test set or new data.</p>
<pre><code>predictions = model.predict(X_test)</code></pre>

<h3>Prediction Types:</h3>
<ul>
  <li><strong>Regression</strong>: Continuous outputs (e.g., predicted prices).</li>
  <li><strong>Classification</strong>: Class labels or probabilities (e.g., spam or not spam).</li>
  <li><strong>Clustering</strong>: Cluster assignments.</li>
</ul>

<h2>6. Evaluate the Model</h2>
<p>Assess model performance using appropriate metrics.</p>
<pre><code>mse = mean_squared_error(y_test, predictions)
print(f"Mean Squared Error: {mse:.2f}")</code></pre>

<p><strong>Evaluation Metrics</strong>: Vary by task (see section 5.6).</p>

<h3>Visualization:</h3>
<p>Plot predictions vs. actual values to assess fit.</p>
<pre><code>import matplotlib.pyplot as plt
plt.scatter(y_test, predictions)
plt.xlabel("Actual Values")
plt.ylabel("Predicted Values")
plt.title("Predictions vs Actual")
plt.show()</code></pre>

<h2>7. Iterate and Optimize</h2>
<p>Refine the model by tuning hyperparameters, adjusting features, or trying different algorithms based on evaluation results.</p>

</div>`
  }
};
