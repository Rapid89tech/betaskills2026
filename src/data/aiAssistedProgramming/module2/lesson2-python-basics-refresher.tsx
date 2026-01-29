import type { Lesson } from '@/types/course';

export const lesson2PythonBasicsRefresher: Lesson = {
  id: 2,
  title: 'Python Basics Refresher',
  duration: '30 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=fWjsdhR3z3c',
    textContent: `<div class="lesson-content">

<h1>Python Basics Refresher</h1>

<p><strong>Python's simplicity makes it an ideal starting point for AI programming. This section covers fundamental concepts with expanded examples and practical applications for AI.</strong></p>

<h2>Variables and Data Types</h2>
<p>Variables store data and are dynamically typed in Python, meaning no explicit type declaration is needed. Common data types include:</p>
<ul>
  <li><strong>int</strong>: Whole numbers (e.g., age = 5).</li>
  <li><strong>float</strong>: Decimal numbers (e.g., score = 99.9).</li>
  <li><strong>str</strong>: Text or strings (e.g., name = "AI").</li>
  <li><strong>bool</strong>: True or False values (e.g., is_active = True).</li>
  <li><strong>list</strong>: Ordered, mutable collections (e.g., scores = [88, 92, 95]).</li>
  <li><strong>tuple</strong>: Ordered, immutable collections (e.g., coordinates = (10, 20)).</li>
  <li><strong>dict</strong>: Key-value pairs (e.g., student = {"name": "Alice", "score": 88}).</li>
  <li><strong>set</strong>: Unordered, unique elements (e.g., unique_ids = {1, 2, 3}).</li>
</ul>

<h3>Example:</h3>
<pre><code># AI-related data example
model_name = "NeuralNet"  # str
training_epochs = 100     # int
learning_rate = 0.01      # float
is_trained = False        # bool
features = [1.5, 2.3, 3.1]  # list
model_config = {"layers": 3, "activation": "relu"}  # dict
unique_labels = {"cat", "dog", "bird"}  # set</code></pre>

<h3>Type Conversion:</h3>
<p>Convert between types for compatibility in AI tasks (e.g., converting strings to numbers for model input):</p>
<pre><code>score = "95.5"  # str
score_float = float(score)  # Convert to float: 95.5
count = int(score_float)    # Convert to int: 95</code></pre>

<h3>Practical AI Application:</h3>
<p>Variables and data types are used to store model parameters, datasets, and configurations in AI workflows.</p>

</div>`
  }
};
