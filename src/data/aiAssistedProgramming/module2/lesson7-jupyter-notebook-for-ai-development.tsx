import type { Lesson } from '@/types/course';

export const lesson7JupyterNotebookForAIDevelopment: Lesson = {
  id: 7,
  title: 'Jupyter Notebook for AI Development',
  duration: '25 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=5pf0_bpNbkw',
    textContent: `<div class="lesson-content">

<h1>Jupyter Notebook for AI Development</h1>

<p><strong>Jupyter Notebook is an interactive environment for writing, testing, and documenting Python code, widely used in AI for its flexibility and visualization capabilities.</strong></p>

<h2>Key Features:</h2>
<ul>
  <li><strong>Interactive Coding</strong>: Run code cells individually, see immediate outputs, and iterate quickly.</li>
  <li><strong>Data Analysis</strong>: Combine code, visualizations, and markdown for exploratory data analysis.</li>
  <li><strong>Visualizations</strong>: Embed Matplotlib, Seaborn, or Plotly plots to visualize datasets or model results.</li>
  <li><strong>Model Testing</strong>: Prototype and test AI models interactively.</li>
  <li><strong>Documentation</strong>: Use markdown cells to explain code, making it ideal for tutorials or reports.</li>
  <li><strong>Support for Multiple Languages</strong>: Beyond Python, supports R, Julia, etc., via kernels.</li>
</ul>

<h2>Installation and Usage:</h2>
<pre><code>pip install notebook
jupyter notebook  # Launches browser-based interface</code></pre>

<h2>Example Notebook Structure:</h2>
<pre><code># Cell 1: Import libraries
import numpy as np
import pandas as pd

# Cell 2: Load data
data = pd.read_csv("dataset.csv")

# Cell 3: Visualize data
import matplotlib.pyplot as plt
plt.hist(data["column"], bins=20)
plt.show()

# Cell 4: Train model
from sklearn.linear_model import LogisticRegression
model = LogisticRegression()
model.fit(data[["feature1", "feature2"]], data["label"])</code></pre>

<h2>AI Use Cases:</h2>
<ul>
  <li>Exploratory data analysis (e.g., visualizing feature distributions).</li>
  <li>Model prototyping and hyperparameter tuning.</li>
  <li>Sharing AI experiments with collaborators via .ipynb files.</li>
</ul>

<h2>Tips:</h2>
<ul>
  <li>Use %matplotlib inline for inline plots in Jupyter.</li>
  <li>Save notebooks to GitHub for version control.</li>
  <li>Use extensions like <strong>JupyterLab</strong> for enhanced functionality.</li>
</ul>

</div>`
  }
};
