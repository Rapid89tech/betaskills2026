import type { Lesson } from '@/types/course';

export const lesson3ControlStructures: Lesson = {
  id: 3,
  title: 'Control Structures',
  duration: '25 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=eT9eIOaSHxc',
    textContent: `<div class="lesson-content">

<h1>Control Structures</h1>

<p><strong>Control structures manage the flow of a Python program, essential for implementing logic in AI algorithms.</strong></p>

<h2>Conditional Statements</h2>
<p>Conditional statements (if, elif, else) execute code based on conditions, often used in AI for decision-making or data preprocessing.</p>

<h3>Example (Classifying model performance):</h3>
<pre><code>accuracy = 0.92
if accuracy > 0.90:
    print("Excellent model performance")
elif accuracy > 0.75:
    print("Good model performance")
else:
    print("Needs improvement")</code></pre>

<p><strong>AI Use Case</strong>: Conditions can filter data (e.g., selecting valid samples) or trigger actions (e.g., stopping training if loss is low).</p>

<h2>Loops</h2>
<p>Loops iterate over data or repeat tasks, critical for processing datasets or training models.</p>

<h3>For Loop</h3>
<p>Iterates over a sequence (e.g., list, range).</p>
<pre><code># Summing feature values
features = [1.5, 2.3, 3.1]
total = 0
for value in features:
    total += value
print(f"Sum of features: {total}")  # Output: 6.9</code></pre>

<h3>While Loop</h3>
<p>Repeats while a condition is true.</p>
<pre><code># Simulating training epochs
epoch = 1
max_epochs = 5
while epoch <= max_epochs:
    print(f"Training epoch {epoch}")
    epoch += 1</code></pre>

<h3>Nested Loops</h3>
<p>Used for multidimensional data (e.g., processing image pixels).</p>
<pre><code># Processing a 2D dataset (e.g., image matrix)
matrix = [[1, 2], [3, 4]]
for row in matrix:
    for value in row:
        print(value)</code></pre>

<p><strong>AI Use Case</strong>: Loops are used to iterate over datasets during preprocessing, training, or evaluation.</p>

<h2>List Comprehensions</h2>
<p>A concise way to create lists, common in AI for data transformation.</p>
<pre><code># Square features for a dataset
features = [1, 2, 3]
squared_features = [x**2 for x in features]  # Output: [1, 4, 9]</code></pre>

</div>`
  }
};
