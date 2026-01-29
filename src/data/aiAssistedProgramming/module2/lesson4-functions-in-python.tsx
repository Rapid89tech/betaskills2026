import type { Lesson } from '@/types/course';

export const lesson4FunctionsInPython: Lesson = {
  id: 4,
  title: 'Functions in Python',
  duration: '30 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=89cGQjB5R4M',
    textContent: `<div class="lesson-content">

<h1>Functions in Python</h1>

<p><strong>Functions modularize code, making it reusable and maintainable. They are critical for structuring AI workflows, such as data preprocessing or model evaluation.</strong></p>

<h2>Defining Functions</h2>
<pre><code>def greet(name):
    return f"Hello, {name}!"
print(greet("AI Developer"))  # Output: Hello, AI Developer!</code></pre>

<h2>Functions with Multiple Parameters</h2>
<pre><code>def calculate_loss(predicted, actual):
    return sum((p - a) ** 2 for p, a in zip(predicted, actual)) / len(predicted)

predictions = [2.1, 4.2, 6.3]
actuals = [2, 4, 6]
mse = calculate_loss(predictions, actuals)
print(f"Mean Squared Error: {mse:.2f}")  # Output: Mean Squared Error: 0.01</code></pre>

<h2>Default and Keyword Arguments</h2>
<pre><code>def train_model(data, learning_rate=0.01, epochs=100):
    return f"Training with learning rate {learning_rate} for {epochs} epochs"

print(train_model(data=[1, 2, 3], epochs=50))  # Override default epochs</code></pre>

<h2>Lambda Functions</h2>
<p>Anonymous functions for short, one-off tasks in AI (e.g., custom sorting).</p>
<pre><code># Sort data by absolute value
data = [-3, 1, -2]
sorted_data = sorted(data, key=lambda x: abs(x))
print(sorted_data)  # Output: [1, -2, -3]</code></pre>

<p><strong>AI Use Case</strong>: Functions encapsulate tasks like data normalization, model training, or evaluation metrics, improving code organization.</p>

</div>`
  }
};
