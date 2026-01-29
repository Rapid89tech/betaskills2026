import type { Lesson } from '@/types/course';

export const lesson6KeyConceptsInMachineLearning: Lesson = {
  id: 6,
  title: 'Key Concepts in Machine Learning',
  duration: '30 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=PcbuKRNtCUc',
    textContent: `<div class="lesson-content">

<h1>Key Concepts in Machine Learning</h1>

<p><strong>Understanding core ML concepts is essential for building and evaluating models effectively.</strong></p>

<table>
  <thead>
    <tr>
      <th><strong>Concept</strong></th>
      <th><strong>Description</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Features</strong></td>
      <td>Input variables used for prediction (e.g., pixel values in an image).</td>
    </tr>
    <tr>
      <td><strong>Labels</strong></td>
      <td>Output values to be predicted (e.g., "cat" or "dog" for image classification).</td>
    </tr>
    <tr>
      <td><strong>Model</strong></td>
      <td>Mathematical representation of the data-to-prediction mapping (e.g., a neural network).</td>
    </tr>
    <tr>
      <td><strong>Training</strong></td>
      <td>Feeding data to the model to optimize its parameters (e.g., adjusting weights).</td>
    </tr>
    <tr>
      <td><strong>Testing</strong></td>
      <td>Evaluating model performance on unseen data to assess generalization.</td>
    </tr>
    <tr>
      <td><strong>Overfitting</strong></td>
      <td>Model memorizes training data, performing poorly on new data due to excessive complexity.</td>
    </tr>
    <tr>
      <td><strong>Underfitting</strong></td>
      <td>Model is too simple to capture data patterns, leading to poor performance.</td>
    </tr>
    <tr>
      <td><strong>Hyperparameters</strong></td>
      <td>Settings like learning rate or number of trees, tuned to optimize performance.</td>
    </tr>
    <tr>
      <td><strong>Feature Engineering</strong></td>
      <td>Creating or selecting features to improve model accuracy (e.g., normalizing data).</td>
    </tr>
    <tr>
      <td><strong>Cross-Validation</strong></td>
      <td>Splitting data into multiple subsets to validate model performance (e.g., k-fold).</td>
    </tr>
  </tbody>
</table>

<h2>Practical Considerations:</h2>
<ul>
  <li><strong>Overfitting Mitigation</strong>: Use regularization (e.g., L1/L2), dropout, or simpler models.</li>
  <li><strong>Underfitting Mitigation</strong>: Increase model complexity or improve feature engineering.</li>
  <li><strong>Feature Selection</strong>: Use techniques like correlation analysis or recursive feature elimination.</li>
</ul>

</div>`
  }
};
