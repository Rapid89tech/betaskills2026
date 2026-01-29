import type { Lesson } from '@/types/course';

export const lesson1WhyModelEvaluationMatters: Lesson = {
  id: 1,
  title: 'Why Model Evaluation Matters',
  duration: '25 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=blAsag2F60Y',
    textContent: `<div class="lesson-content">

<h1>Why Model Evaluation Matters</h1>

<p><strong>Model evaluation is a critical step in the machine learning (ML) workflow that assesses how well a model performs on unseen data. It ensures the model generalizes effectively to real-world scenarios, providing insights into its strengths and weaknesses.</strong></p>

<h2>Key Objectives:</h2>
<ul>
  <li><strong>Detect Overfitting/Underfitting</strong>: Identifies if the model is too complex (overfitting) or too simple (underfitting) for the data.</li>
  <li><strong>Uncover Bias</strong>: Reveals biases in the model or data, such as skewed predictions due to imbalanced datasets.</li>
  <li><strong>Guide Improvement</strong>: Highlights areas for refinement, such as feature engineering, hyperparameter tuning, or data augmentation.</li>
  <li><strong>Ensure Reliability</strong>: Validates that the model meets performance requirements for deployment.</li>
  <li><strong>Compare Models</strong>: Enables comparison of different algorithms or configurations to select the best performer.</li>
</ul>

<h2>Importance:</h2>
<ul>
  <li>Prevents deploying unreliable models that fail in production.</li>
  <li>Ensures fairness and robustness by identifying biased predictions.</li>
  <li>Optimizes resource use by focusing efforts on high-impact improvements.</li>
</ul>

<h2>Example:</h2>
<p>A fraud detection model with high training accuracy but low test accuracy indicates overfitting, requiring techniques like regularization or more diverse data.</p>

</div>`
  }
};
