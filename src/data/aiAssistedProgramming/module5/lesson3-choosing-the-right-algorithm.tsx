import type { Lesson } from '@/types/course';

export const lesson3ChoosingTheRightAlgorithm: Lesson = {
  id: 3,
  title: 'Choosing the Right Algorithm',
  duration: '35 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=E0Hmnixke2g',
    textContent: `<div class="lesson-content">

<h1>Choosing the Right Algorithm</h1>

<p><strong>Selecting the appropriate algorithm depends on the task, data characteristics, and requirements (e.g., interpretability, accuracy, speed).</strong></p>

<table>
  <thead>
    <tr>
      <th><strong>Task Type</strong></th>
      <th><strong>Algorithm</strong></th>
      <th><strong>Use Case</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Regression</strong></td>
      <td>Linear Regression, Ridge, Lasso, XGBoost</td>
      <td>Predicting house prices, sales forecasts.</td>
    </tr>
    <tr>
      <td><strong>Classification</strong></td>
      <td>Logistic Regression, Decision Trees, Random Forest, SVM, Naive Bayes</td>
      <td>Spam detection, disease diagnosis.</td>
    </tr>
    <tr>
      <td><strong>Clustering</strong></td>
      <td>K-Means, DBSCAN, Hierarchical Clustering</td>
      <td>Customer segmentation, anomaly detection.</td>
    </tr>
    <tr>
      <td><strong>Dimensionality Reduction</strong></td>
      <td>PCA, t-SNE, UMAP</td>
      <td>Data visualization, feature compression.</td>
    </tr>
  </tbody>
</table>

<h2>Algorithm Selection Criteria:</h2>
<ul>
  <li><strong>Task Type</strong>: Regression for continuous outputs, classification for categorical outputs.</li>
  <li><strong>Data Size</strong>: Simple models (e.g., linear regression) for small datasets; complex models (e.g., XGBoost, neural networks) for large datasets.</li>
  <li><strong>Interpretability</strong>: Linear models or decision trees for explainability; neural networks for high accuracy.</li>
  <li><strong>Computational Resources</strong>: Simple models for resource-constrained environments; deep learning for GPU-enabled systems.</li>
  <li><strong>Data Characteristics</strong>: Handle imbalanced data with ensemble methods (e.g., Random Forest) or oversampling techniques.</li>
</ul>

<h2>Example:</h2>
<p>For a small dataset with a linear relationship, use Linear Regression. For a large, complex dataset with non-linear patterns, use Random Forest or a neural network.</p>

</div>`
  }
};
