import type { Lesson } from '@/types/course';

export const lesson8BestPracticesInPythonForAI: Lesson = {
  id: 8,
  title: 'Best Practices in Python for AI',
  duration: '30 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=St48epdRDZw',
    textContent: `<div class="lesson-content">

<h1>Best Practices in Python for AI</h1>

<p><strong>Adopting best practices ensures efficient, maintainable, and scalable AI code.</strong></p>

<ul>
  <li><strong>Use Virtual Environments</strong>:
    <ul>
      <li>Isolate project dependencies to avoid conflicts.</li>
      <li>Tools: venv, virtualenv, or conda.</li>
    </ul>
    <pre><code>python -m venv ai_env
source ai_env/bin/activate  # Linux/macOS
ai_env\\Scripts\\activate     # Windows
pip install tensorflow pandas</code></pre>
  </li>
  <li><strong>Write Clean, Modular Code</strong>:
    <ul>
      <li>Follow <strong>PEP 8</strong> (Python style guide) for consistent formatting.</li>
      <li>Use meaningful variable names (e.g., learning_rate instead of lr).</li>
      <li>Add comments and docstrings to explain complex logic.</li>
    </ul>
    <pre><code>def preprocess_data(df):
    """Remove missing values and normalize numerical columns."""
    df = df.dropna()
    df["value"] = (df["value"] - df["value"].mean()) / df["value"].std()
    return df</code></pre>
  </li>
  <li><strong>Use Version Control (Git)</strong>:
    <ul>
      <li>Track code changes and collaborate using Git/GitHub.</li>
    </ul>
    <pre><code>git init
git add .
git commit -m "Initial AI model"
git push origin main</code></pre>
  </li>
  <li><strong>Test Functions and Models</strong>:
    <ul>
      <li>Write unit tests using unittest or pytest to verify code.</li>
      <li>Validate models with metrics like accuracy or MSE.</li>
    </ul>
    <pre><code>import unittest
class TestPreprocess(unittest.TestCase):
    def test_preprocess_data(self):
        df = pd.DataFrame({"value": [1, 2, 3]})
        result = preprocess_data(df)
        self.assertEqual(len(result), 3)</code></pre>
  </li>
  <li><strong>Optimize Performance</strong>:
    <ul>
      <li>Use vectorized operations in NumPy instead of loops.</li>
      <li>Profile code with tools like cProfile to identify bottlenecks.</li>
      <li>Leverage GPUs/TPUs for training with TensorFlow or PyTorch.</li>
    </ul>
  </li>
  <li><strong>Document Workflows</strong>:
    <ul>
      <li>Use Jupyter markdown cells or separate documentation files.</li>
      <li>Include data sources, model assumptions, and evaluation metrics.</li>
    </ul>
  </li>
  <li><strong>Handle Errors Gracefully</strong>:
    <ul>
      <li>Use try-except blocks for robust code.</li>
    </ul>
    <pre><code>try:
    model.fit(X, y)
except ValueError as e:
    print(f"Error in model training: {e}")</code></pre>
  </li>
  <li><strong>Automate Repetitive Tasks</strong>:
    <ul>
      <li>Use scripts or tools like <strong>MLflow</strong> for experiment tracking.</li>
      <li>Automate data pipelines with <strong>Airflow</strong> or <strong>Prefect</strong>.</li>
    </ul>
  </li>
  <li><strong>Ensure Reproducibility</strong>:
    <ul>
      <li>Set random seeds for reproducibility (e.g., np.random.seed(42)).</li>
      <li>Document library versions in requirements.txt.</li>
    </ul>
    <pre><code>pip freeze > requirements.txt</code></pre>
  </li>
</ul>

</div>`
  }
};
