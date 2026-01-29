import type { Lesson } from '@/types/course';

export const lesson7MachineLearningPipeline: Lesson = {
  id: 7,
  title: 'Machine Learning Pipeline',
  duration: '40 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=HWWxtVL-D9k',
    textContent: `<div class="lesson-content">

<h1>Machine Learning Pipeline</h1>

<p><strong>The ML pipeline is a structured workflow to build, train, and deploy models efficiently.</strong></p>

<ol>
  <li><strong>Data Collection</strong>:
    <ul>
      <li>Gather data from sources like databases, APIs, sensors, or web scraping.</li>
      <li>Ensure data is diverse, representative, and relevant to the problem.</li>
      <li>Example: Collecting customer purchase history for a recommendation system.</li>
    </ul>
  </li>
  <li><strong>Data Preprocessing</strong>:
    <ul>
      <li><strong>Cleaning</strong>: Remove missing values, duplicates, or outliers.</li>
      <li><strong>Normalization</strong>: Scale numerical features (e.g., to [0,1]).</li>
      <li><strong>Encoding</strong>: Convert categorical data (e.g., "red", "blue") to numerical formats.</li>
      <li><strong>Augmentation</strong>: Generate synthetic data (e.g., image rotations) to increase dataset size.</li>
      <li>Example: Normalizing pixel values for image classification.</li>
    </ul>
  </li>
  <li><strong>Model Selection</strong>:
    <ul>
      <li>Choose an algorithm based on the task (e.g., regression, classification, clustering).</li>
      <li>Consider trade-offs: Interpretability (e.g., linear models) vs. accuracy (e.g., neural networks).</li>
      <li>Example: Selecting XGBoost for a classification task due to its performance.</li>
    </ul>
  </li>
  <li><strong>Training</strong>:
    <ul>
      <li>Feed data into the model to optimize parameters (e.g., using gradient descent).</li>
      <li>Split data into training (70-80%), validation (10-15%), and test (10-15%) sets.</li>
      <li>Example: Training a neural network on labeled images.</li>
    </ul>
  </li>
  <li><strong>Evaluation</strong>:
    <ul>
      <li>Assess model performance on validation/test data using metrics like accuracy or F1-score.</li>
      <li>Use cross-validation to ensure robust results.</li>
      <li>Example: Computing precision and recall for a spam classifier.</li>
    </ul>
  </li>
  <li><strong>Hyperparameter Tuning</strong>:
    <ul>
      <li>Adjust settings like learning rate or number of layers using grid search or random search.</li>
      <li>Example: Tuning the number of trees in a random forest.</li>
    </ul>
  </li>
  <li><strong>Deployment</strong>:
    <ul>
      <li>Integrate the model into applications (e.g., via APIs or embedded systems).</li>
      <li>Monitor performance for data drift or degradation.</li>
      <li>Example: Deploying a fraud detection model in a banking system.</li>
    </ul>
  </li>
  <li><strong>Monitoring and Maintenance</strong>:
    <ul>
      <li>Continuously track model performance in production.</li>
      <li>Retrain with new data to adapt to changing patterns.</li>
      <li>Example: Updating a recommendation system with new user data.</li>
    </ul>
  </li>
</ol>

</div>`
  }
};
