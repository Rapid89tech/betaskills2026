import type { Lesson } from '@/types/course';

export const lesson1WhatIsMachineLearning: Lesson = {
  id: 1,
  title: 'What is Machine Learning?',
  duration: '25 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=9gGnTQTYNaE',
    textContent: `<div class="lesson-content">

<h1>What is Machine Learning?</h1>

<p><strong>Machine Learning (ML) is a subfield of Artificial Intelligence (AI) that focuses on developing algorithms and models that enable systems to learn from data and improve their performance over time without explicit programming. By analyzing patterns in data, ML models can make predictions, classify objects, or uncover insights, making them integral to applications like recommendation systems, fraud detection, and autonomous vehicles.</strong></p>

<h2>Core Principles:</h2>
<ul>
  <li><strong>Learning from Data</strong>: ML systems use historical data to identify patterns and generalize to new, unseen data.</li>
  <li><strong>Adaptability</strong>: Models improve with more data or feedback, refining their accuracy or decision-making.</li>
  <li><strong>Automation</strong>: ML reduces the need for manual rule-based programming by learning directly from examples.</li>
  <li><strong>Applications</strong>: ML powers diverse domains, including healthcare (e.g., predicting disease risk), finance (e.g., credit scoring), and natural language processing (e.g., sentiment analysis).</li>
</ul>

<h2>Key Characteristics:</h2>
<ul>
  <li><strong>Generalization</strong>: Models aim to perform well on new data, not just memorized training data.</li>
  <li><strong>Scalability</strong>: ML can handle large datasets and complex problems with modern computing resources.</li>
  <li><strong>Flexibility</strong>: ML supports various tasks, from regression and classification to clustering and reinforcement learning.</li>
</ul>

<h2>Examples of ML in Action:</h2>
<ul>
  <li><strong>Predictive Analytics</strong>: Forecasting stock prices or weather patterns.</li>
  <li><strong>Classification</strong>: Identifying spam emails or diagnosing diseases from medical images.</li>
  <li><strong>Recommendation Systems</strong>: Suggesting movies on Netflix or products on Amazon.</li>
  <li><strong>Autonomous Systems</strong>: Enabling self-driving cars to navigate roads.</li>
</ul>

</div>`
  }
};
