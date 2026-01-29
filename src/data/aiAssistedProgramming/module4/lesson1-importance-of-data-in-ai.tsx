import type { Lesson } from '@/types/course';

export const lesson1ImportanceOfDataInAI: Lesson = {
  id: 1,
  title: 'Importance of Data in AI',
  duration: '25 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=0Ec0tgdpDEU',
    textContent: `<div class="lesson-content">

<h1>Importance of Data in AI</h1>

<p><strong>Data is the cornerstone of Artificial Intelligence (AI) and Machine Learning (ML), often described as the "fuel" that powers models. The quality, quantity, and relevance of data directly influence a model's accuracy, robustness, and generalization to real-world scenarios. Poorly prepared data can lead to biased, inaccurate, or inefficient models, while well-prepared data enhances performance and reliability.</strong></p>

<h2>Key Points:</h2>
<ul>
  <li><strong>Data Quality</strong>: High-quality data is accurate, complete, consistent, and representative of the problem domain. Poor data quality (e.g., missing values, outliers) can degrade model performance.</li>
  <li><strong>Data Volume</strong>: Large, diverse datasets improve model generalization, especially for complex tasks like deep learning.</li>
  <li><strong>Relevance</strong>: Data must align with the problem (e.g., using medical records for disease prediction).</li>
  <li><strong>Impact on Performance</strong>: Well-prepared data reduces overfitting, improves convergence, and enhances predictive power.</li>
  <li><strong>Applications</strong>: Data drives tasks like image classification (e.g., labeled images), natural language processing (e.g., text corpora), and predictive analytics (e.g., sales data).</li>
</ul>

<h2>Challenges:</h2>
<ul>
  <li><strong>Noisy Data</strong>: Errors, outliers, or inconsistencies in data collection.</li>
  <li><strong>Incomplete Data</strong>: Missing values or incomplete records.</li>
  <li><strong>Biased Data</strong>: Underrepresentation of certain groups, leading to unfair models.</li>
  <li><strong>High Dimensionality</strong>: Large numbers of features can increase computational complexity and noise.</li>
</ul>

<h2>Example:</h2>
<p>A model predicting house prices requires clean, relevant data (e.g., square footage, location) to produce accurate predictions. If the data contains errors (e.g., incorrect square footage) or biases (e.g., only urban properties), the model's predictions will be unreliable.</p>

</div>`
  }
};
