import type { Lesson } from '@/types/course';

export const lesson5TrainingANeuralNetwork: Lesson = {
  id: 5,
  title: 'Training a Neural Network',
  duration: '35 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/6M5VXKLf4D4',
    textContent: `<div class="lesson-content">

<h1>Training a Neural Network</h1>

<p><strong>Training a neural network involves optimizing its weights to minimize prediction errors through an iterative process.</strong></p>

<h2>Steps:</h2>

<h3>1. Forward Propagation:</h3>
<ul>
  <li>Input data passes through layers, undergoing transformations (weighted sums and activations).</li>
  <li>Produces a prediction at the output layer.</li>
</ul>
<pre><code># Example: Simplified forward pass
inputs = np.array([1, 2])
weights = np.array([[0.5, -0.5], [0.3, 0.7]])
bias = np.array([0.1, 0.2])
output = np.dot(inputs, weights.T) + bias  # Weighted sum
output = relu(output)  # Apply activation</code></pre>

<h3>2. Loss Calculation:</h3>
<ul>
  <li>Compare predicted output to actual values using a loss function (e.g., mean squared error for regression, binary cross-entropy for classification).</li>
</ul>
<pre><code>from sklearn.metrics import mean_squared_error
y_true = np.array([1])
y_pred = np.array([0.9])
loss = mean_squared_error(y_true, y_pred)</code></pre>

<h3>3. Backward Propagation (Backpropagation):</h3>
<ul>
  <li>Compute gradients of the loss with respect to weights using the chain rule.</li>
  <li>Update weights to reduce the loss.</li>
  <li>Example: Gradient descent updates weights as weight = weight - learning_rate * gradient.</li>
</ul>

<h3>4. Optimization:</h3>
<ul>
  <li>Use optimizers to minimize the loss function.</li>
  <li>Common optimizers:</li>
  <ul>
    <li><strong>Stochastic Gradient Descent (SGD)</strong>: Updates weights using small batches of data.</li>
    <li><strong>Adam</strong>: Combines momentum and adaptive learning rates for faster convergence.</li>
    <li><strong>RMSprop</strong>: Adapts learning rates for non-stationary data.</li>
  </ul>
</ul>
<pre><code>from tensorflow.keras.optimizers import Adam
model.compile(optimizer=Adam(learning_rate=0.001), loss='binary_crossentropy')</code></pre>

<h2>Training Parameters:</h2>
<ul>
  <li><strong>Epochs</strong>: Number of passes through the training data.</li>
  <li><strong>Batch Size</strong>: Number of samples processed before updating weights.</li>
  <li><strong>Learning Rate</strong>: Step size for weight updates (e.g., 0.001).</li>
</ul>

</div>`
  }
};
