import type { Lesson } from '@/types/course';

export const lesson2WhatIsAIProgramming: Lesson = {
  id: 2,
  title: 'What is AI Programming?',
  duration: '25 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=w4rG5GY9IlA&t=29s',
    textContent: `<div class="lesson-content">

<h1>What is AI Programming?</h1>

<p><strong>AI programming involves designing and coding systems that enable machines to exhibit intelligent behavior. It combines computer science, mathematics, statistics, and domain expertise to create algorithms and models that process data, learn patterns, and make predictions or decisions. AI programming spans from simple rule-based systems to complex neural networks.</strong></p>

<h2>Core Elements:</h2>
<ul>
  <li><strong>Algorithms: Mathematical procedures for solving problems, such as:</strong>
    <ul>
      <li><strong>Decision trees for classification tasks.</strong></li>
      <li><strong>Clustering algorithms (e.g., K-means) for grouping similar data.</strong></li>
      <li><strong>Neural networks for modeling complex relationships.</strong></li>
    </ul>
  </li>
  <li><strong>Data: The backbone of AI, providing the information needed for learning. Data types include structured (e.g., spreadsheets), unstructured (e.g., text, images), and semi-structured (e.g., JSON). High-quality, diverse, and representative data is essential.</strong></li>
  <li><strong>Models: Mathematical constructs that represent systems or processes, such as:</strong>
    <ul>
      <li><strong>Linear regression models for predicting numerical outcomes.</strong></li>
      <li><strong>Convolutional neural networks (CNNs) for image analysis.</strong></li>
      <li><strong>Transformers for natural language processing.</strong></li>
    </ul>
  </li>
  <li><strong>Training and Inference:</strong>
    <ul>
      <li><strong>Training: Optimizing model parameters using labeled or unlabeled data to learn patterns (e.g., training a spam filter with email datasets).</strong></li>
      <li><strong>Inference: Applying a trained model to new data to generate predictions or decisions (e.g., classifying new emails as spam or not).</strong></li>
    </ul>
  </li>
  <li><strong>Optimization: Techniques like gradient descent to minimize errors in model predictions.</strong></li>
  <li><strong>Feature Engineering: Selecting or transforming data features to improve model performance (e.g., extracting word frequencies for text analysis).</strong></li>
</ul>

<h2>AI Programming Workflow:</h2>
<ol>
  <li><strong>Problem Definition: Identify the task (e.g., predict customer churn, recognize handwritten digits).</strong></li>
  <li><strong>Data Collection: Gather relevant datasets from sources like databases, APIs, or sensors.</strong></li>
  <li><strong>Data Preprocessing: Clean data (e.g., remove duplicates, handle missing values) and preprocess (e.g., normalize numerical data, tokenize text).</strong></li>
  <li><strong>Model Selection: Choose appropriate algorithms or architectures (e.g., random forests, deep neural networks).</strong></li>
  <li><strong>Training: Train the model on a subset of data, adjusting parameters to minimize errors.</strong></li>
  <li><strong>Validation and Testing: Evaluate the model on separate validation and test datasets to ensure generalization.</strong></li>
  <li><strong>Hyperparameter Tuning: Adjust settings like learning rate or number of layers to optimize performance.</strong></li>
  <li><strong>Deployment: Integrate the model into applications (e.g., a mobile app or web service).</strong></li>
  <li><strong>Monitoring and Maintenance: Track model performance in production and retrain as needed to address data drift or new requirements.</strong></li>
</ol>

</div>`
  }
};
