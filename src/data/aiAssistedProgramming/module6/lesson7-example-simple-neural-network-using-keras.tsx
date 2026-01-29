import type { Lesson } from '@/types/course';

export const lesson7ExampleSimpleNeuralNetworkUsingKeras: Lesson = {
  id: 7,
  title: 'Example: Simple Neural Network using Keras',
  duration: '30 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/6M5VXKLf4D4',
    textContent: `<div class="lesson-content">

<h1>Example: Simple Neural Network using Keras</h1>

<p><strong>This example demonstrates building, training, and evaluating a neural network for binary classification using Keras.</strong></p>

<pre><code>from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
import numpy as np

# Sample data
X_train = np.random.rand(100, 4)  # 100 samples, 4 features
y_train = np.random.randint(0, 2, 100)  # Binary labels
X_test = np.random.rand(20, 4)
y_test = np.random.randint(0, 2, 20)

# Build model
model = Sequential([
    Dense(8, input_dim=4, activation='relu'),  # Hidden layer with 8 neurons
    Dense(4, activation='relu'),               # Additional hidden layer
    Dense(1, activation='sigmoid')             # Output layer for binary classification
])

# Compile model
model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])

# Train model
model.fit(X_train, y_train, epochs=100, batch_size=10, validation_data=(X_test, y_test), verbose=0)

# Evaluate model
loss, accuracy = model.evaluate(X_test, y_test)
print(f"Test Loss: {loss:.4f}, Test Accuracy: {accuracy:.4f}")

# Make predictions
predictions = model.predict(X_test)</code></pre>

<h2>Workflow Explanation:</h2>
<ul>
  <li><strong>Model Architecture</strong>: A sequential model with two hidden layers (ReLU) and a sigmoid output layer for binary classification.</li>
  <li><strong>Compilation</strong>: Uses binary cross-entropy loss and Adam optimizer.</li>
  <li><strong>Training</strong>: Runs for 100 epochs with a batch size of 10, validating on test data.</li>
  <li><strong>Evaluation</strong>: Reports loss and accuracy on the test set.</li>
  <li><strong>Prediction</strong>: Generates probabilities for new inputs.</li>
</ul>

</div>`
  }
};
