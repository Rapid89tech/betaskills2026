import type { Lesson } from '@/types/course';

export const lesson6ExampleBasicAIWorkflowWithPython: Lesson = {
  id: 6,
  title: 'Example: Basic AI Workflow with Python',
  duration: '40 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=bTMPwUgLZf0',
    textContent: `<div class="lesson-content">

<h1>Example: Basic AI Workflow with Python</h1>

<p><strong>This section expands the linear regression example to include data preprocessing, visualization, and evaluation, demonstrating a complete AI workflow.</strong></p>

<h2>Example Code:</h2>
<pre><code>import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error

# 1. Create and preprocess dataset
data = pd.DataFrame({
    "input": [1, 2, 3, 4, 5],
    "output": [2.1, 3.8, 6.2, 7.9, 10.1]
})
X = data[["input"]].values  # Feature matrix
y = data["output"].values   # Target vector

# 2. Initialize and train model
model = LinearRegression()
model.fit(X, y)

# 3. Make predictions
X_test = np.array([[6], [7]])  # New inputs
predictions = model.predict(X_test)
print(f"Predictions for inputs 6 and 7: {predictions}")  # Output: ~[12.0, 14.0]

# 4. Evaluate model
y_pred = model.predict(X)
mse = mean_squared_error(y, y_pred)
print(f"Mean Squared Error: {mse:.2f}")

# 5. Visualize results
plt.scatter(X, y, color="blue", label="Data points")
plt.plot(X, y_pred, color="red", label="Linear fit")
plt.xlabel("Input")
plt.ylabel("Output")
plt.title("Linear Regression Example")
plt.legend()
plt.show()</code></pre>

<h2>Workflow Steps:</h2>
<ol>
  <li><strong>Data Preparation</strong>: Load and clean data using Pandas, convert to NumPy arrays for modeling.</li>
  <li><strong>Model Training</strong>: Fit a linear regression model to learn the relationship between inputs and outputs.</li>
  <li><strong>Prediction</strong>: Use the trained model to predict new outputs.</li>
  <li><strong>Evaluation</strong>: Compute metrics like MSE to assess model performance.</li>
  <li><strong>Visualization</strong>: Plot data and predictions to interpret results.</li>
</ol>

<p><strong>AI Use Case</strong>: This workflow applies to tasks like predicting sales, house prices, or sensor readings.</p>

</div>`
  }
};
