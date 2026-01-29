import type { Lesson } from '@/types/course';

export const lesson5PythonLibrariesForAI: Lesson = {
  id: 5,
  title: 'Python Libraries for AI',
  duration: '35 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=p4G0coRey9w',
    textContent: `<div class="lesson-content">

<h1>Python Libraries for AI</h1>

<p><strong>Python's AI ecosystem is powered by specialized libraries that simplify complex tasks. Below is an expanded list with their purposes and use cases:</strong></p>

<table>
  <thead>
    <tr>
      <th><strong>Library</strong></th>
      <th><strong>Purpose</strong></th>
      <th><strong>AI Use Case</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>NumPy</strong></td>
      <td>Numerical operations, multidimensional arrays, and linear algebra</td>
      <td>Matrix operations for machine learning algorithms (e.g., gradient descent).</td>
    </tr>
    <tr>
      <td><strong>Pandas</strong></td>
      <td>Data manipulation, analysis, and cleaning with DataFrames</td>
      <td>Preprocessing datasets (e.g., handling missing values, filtering rows).</td>
    </tr>
    <tr>
      <td><strong>Matplotlib</strong></td>
      <td>Data visualization (e.g., plots, histograms)</td>
      <td>Visualizing model performance or data distributions (e.g., loss curves).</td>
    </tr>
    <tr>
      <td><strong>Seaborn</strong></td>
      <td>Statistical data visualization, built on Matplotlib</td>
      <td>Creating heatmaps or pair plots for data exploration.</td>
    </tr>
    <tr>
      <td><strong>Scikit-learn</strong></td>
      <td>Traditional machine learning algorithms (e.g., regression, classification)</td>
      <td>Building models like SVMs, decision trees, or clustering algorithms.</td>
    </tr>
    <tr>
      <td><strong>TensorFlow</strong></td>
      <td>Deep learning framework for neural networks and scalable deployment</td>
      <td>Training CNNs for image recognition or RNNs for time-series analysis.</td>
    </tr>
    <tr>
      <td><strong>PyTorch</strong></td>
      <td>Deep learning framework, flexible for research and NLP</td>
      <td>Developing transformer models for NLP or generative AI.</td>
    </tr>
    <tr>
      <td><strong>Hugging Face</strong></td>
      <td>NLP-focused library with pre-trained models and datasets</td>
      <td>Fine-tuning BERT for sentiment analysis or text generation.</td>
    </tr>
    <tr>
      <td><strong>OpenCV</strong></td>
      <td>Computer vision tasks (e.g., image processing, object detection)</td>
      <td>Preprocessing images for computer vision models (e.g., edge detection).</td>
    </tr>
    <tr>
      <td><strong>SciPy</strong></td>
      <td>Scientific computing (e.g., optimization, signal processing)</td>
      <td>Optimizing model parameters or signal analysis in AI applications.</td>
    </tr>
  </tbody>
</table>

<h2>Additional Libraries:</h2>
<ul>
  <li><strong>Plotly</strong>: Interactive visualizations for web-based AI dashboards.</li>
  <li><strong>NLTK/spaCy</strong>: Advanced NLP tasks like tokenization, part-of-speech tagging, or named entity recognition.</li>
  <li><strong>XGBoost/LightGBM</strong>: Gradient boosting for high-performance machine learning.</li>
  <li><strong>Keras</strong>: High-level API (integrated with TensorFlow) for simplified neural network design.</li>
</ul>

<h2>Installation Example:</h2>
<pre><code>pip install numpy pandas matplotlib scikit-learn tensorflow torch</code></pre>

</div>`
  }
};
