import type { Lesson } from '@/types/course';

export const lesson1OverviewOfModelBuildingInMachineLearning: Lesson = {
  id: 1,
  title: 'Overview of Model Building in Machine Learning',
  duration: '25 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=yN7ypxC7838',
    textContent: `<div class="lesson-content">

<h1>Overview of Model Building in Machine Learning</h1>

<p><strong>Model building in Machine Learning (ML) is the process of creating a mathematical model that learns patterns from a prepared dataset to make predictions, classifications, or other decisions. The goal is to develop a model that generalizes well to new, unseen data, enabling accurate and reliable outcomes for tasks like forecasting sales, diagnosing diseases, or clustering customers. Model building combines data preparation, algorithm selection, training, evaluation, and optimization to achieve robust performance.</strong></p>

<h2>Key Objectives:</h2>
<ul>
  <li><strong>Learn Patterns</strong>: Identify relationships in data to predict or classify outcomes.</li>
  <li><strong>Generalization</strong>: Ensure the model performs well on new data, not just training data.</li>
  <li><strong>Scalability</strong>: Build models that can handle large datasets or real-time applications.</li>
  <li><strong>Interpretability vs. Accuracy</strong>: Balance simple, interpretable models (e.g., linear regression) with complex, high-accuracy models (e.g., neural networks).</li>
</ul>

<h2>Applications:</h2>
<ul>
  <li><strong>Regression</strong>: Predicting continuous values (e.g., house prices).</li>
  <li><strong>Classification</strong>: Assigning categories (e.g., spam vs. non-spam emails).</li>
  <li><strong>Clustering</strong>: Grouping similar data points (e.g., customer segmentation).</li>
  <li><strong>Dimensionality Reduction</strong>: Simplifying data for visualization or efficiency.</li>
</ul>

</div>`
  }
};
