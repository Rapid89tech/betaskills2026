import type { Lesson } from '@/types/course';

export const lesson2WhatIsDataPreprocessing: Lesson = {
  id: 2,
  title: 'What is Data Preprocessing?',
  duration: '30 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=4i9aiTjjxHY',
    textContent: `<div class="lesson-content">

<h1>What is Data Preprocessing?</h1>

<p><strong>Data preprocessing is the process of cleaning, transforming, and structuring raw data into a format suitable for machine learning models. It ensures data is consistent, complete, and optimized for training, addressing issues like missing values, varying scales, or inconsistent formats.</strong></p>

<h2>Objectives:</h2>
<ul>
  <li><strong>Improve Data Quality</strong>: Remove errors, inconsistencies, and noise.</li>
  <li><strong>Enhance Model Performance</strong>: Prepare data to improve accuracy and reduce training time.</li>
  <li><strong>Ensure Compatibility</strong>: Format data to meet model requirements (e.g., numerical inputs for neural networks).</li>
  <li><strong>Reduce Bias</strong>: Mitigate biases in data to ensure fair and generalizable models.</li>
</ul>

<h2>Importance:</h2>
<ul>
  <li>Many ML algorithms (e.g., gradient-based models like SVM or neural networks) are sensitive to data scale and distribution.</li>
  <li>Preprocessing reduces computational overhead and prevents issues like overfitting or poor convergence.</li>
  <li>It enables seamless integration of data from diverse sources (e.g., combining CSV files and APIs).</li>
</ul>

<h2>Example:</h2>
<p>Raw data with missing values, categorical variables, and unnormalized features (e.g., ages ranging from 0-100 and incomes from 0-1,000,000) is preprocessed to ensure consistent scales and formats for a classification model.</p>

</div>`
  }
};
