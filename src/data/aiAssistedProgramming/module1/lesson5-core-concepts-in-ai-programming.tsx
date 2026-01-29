import type { Lesson } from '@/types/course';

export const lesson5CoreConceptsInAIProgramming: Lesson = {
  id: 5,
  title: 'Core Concepts in AI Programming',
  duration: '35 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=qYNweeDHiyU',
    textContent: `<div class="lesson-content">

<h1>Core Concepts in AI Programming</h1>

<p><strong>AI programming relies on foundational concepts to build, train, and deploy effective systems:</strong></p>

<ul>
  <li><strong>Data Collection & Cleaning:</strong>
    <ul>
      <li><strong>Sources: Databases, APIs, web scraping, sensors, or user-generated content.</strong></li>
      <li><strong>Cleaning: Removing noise (e.g., irrelevant data), handling missing values, correcting errors, and addressing biases (e.g., underrepresentation of certain groups).</strong></li>
      <li><strong>Preprocessing: Normalization (scaling data to a standard range), encoding categorical variables, tokenizing text, or augmenting images.</strong></li>
    </ul>
  </li>
  <li><strong>Feature Engineering:</strong>
    <ul>
      <li><strong>Selecting or creating relevant features to improve model performance (e.g., extracting word embeddings for NLP or edge detection for images).</strong></li>
      <li><strong>Techniques: Dimensionality reduction (e.g., PCA), feature scaling, and feature selection.</strong></li>
    </ul>
  </li>
  <li><strong>Model Building:</strong>
    <ul>
      <li><strong>Choosing algorithms or architectures based on the task (e.g., decision trees for classification, LSTMs for time-series data).</strong></li>
      <li><strong>Designing custom architectures for specific problems (e.g., custom CNNs for medical imaging).</strong></li>
      <li><strong>Tuning hyperparameters (e.g., learning rate, number of layers) to optimize performance.</strong></li>
    </ul>
  </li>
  <li><strong>Training & Testing:</strong>
    <ul>
      <li><strong>Training: Feeding labeled or unlabeled data into the model to adjust parameters (e.g., backpropagation in neural networks).</strong></li>
      <li><strong>Validation: Using a separate dataset to tune hyperparameters and prevent overfitting.</strong></li>
      <li><strong>Testing: Evaluating the model on a holdout test set to assess generalization.</strong></li>
      <li><strong>Techniques: K-fold cross-validation, train-test splits (e.g., 80-20 split).</strong></li>
    </ul>
  </li>
  <li><strong>Evaluation:</strong>
    <ul>
      <li><strong>Metrics for classification: Accuracy, precision, recall, F1-score, ROC-AUC.</strong></li>
      <li><strong>Metrics for regression: Mean squared error (MSE), mean absolute error (MAE), R² score.</strong></li>
      <li><strong>Metrics for NLP: BLEU, ROUGE, perplexity.</strong></li>
      <li><strong>Metrics for computer vision: Intersection over Union (IoU), mean average precision (mAP).</strong></li>
    </ul>
  </li>
  <li><strong>Deployment and Monitoring:</strong>
    <ul>
      <li><strong>Deploying models via APIs, embedded systems, or cloud platforms (e.g., AWS, Google Cloud).</strong></li>
      <li><strong>Monitoring for data drift (changes in input data distribution) and model degradation.</strong></li>
      <li><strong>Retraining models periodically to maintain performance.</strong></li>
    </ul>
  </li>
  <li><strong>Scalability and Optimization:</strong>
    <ul>
      <li><strong>Optimizing models for efficiency using techniques like quantization, pruning, or knowledge distillation.</strong></li>
      <li><strong>Scaling training with distributed computing (e.g., GPU clusters, TPUs).</strong></li>
      <li><strong>Deploying models on edge devices (e.g., smartphones, IoT devices) with lightweight frameworks like TensorFlow Lite.</strong></li>
    </ul>
  </li>
</ul>

</div>`
  }
};
