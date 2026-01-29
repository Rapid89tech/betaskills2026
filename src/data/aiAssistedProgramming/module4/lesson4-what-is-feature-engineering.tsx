import type { Lesson } from '@/types/course';

export const lesson4WhatIsFeatureEngineering: Lesson = {
  id: 4,
  title: 'What is Feature Engineering?',
  duration: '30 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=Bg3CjiJ67Cc',
    textContent: `<div class="lesson-content">

<h1>What is Feature Engineering?</h1>

<p><strong>Feature Engineering is the process of creating, selecting, or transforming features to improve the performance of machine learning models. It leverages domain knowledge and data insights to make models more effective and efficient.</strong></p>

<h2>Objectives:</h2>
<ul>
  <li><strong>Enhance Model Performance</strong>: Create features that capture relevant patterns.</li>
  <li><strong>Reduce Complexity</strong>: Eliminate irrelevant or redundant features.</li>
  <li><strong>Improve Interpretability</strong>: Design features that are meaningful to stakeholders.</li>
  <li><strong>Enable Generalization</strong>: Ensure models perform well on unseen data.</li>
</ul>

<h2>Importance:</h2>
<ul>
  <li>Well-engineered features can outperform complex models trained on raw data.</li>
  <li>Feature engineering reduces training time and mitigates overfitting.</li>
  <li>It bridges domain expertise (e.g., medical or financial knowledge) with ML algorithms.</li>
</ul>

<h2>Example:</h2>
<p>For a churn prediction model, raw data like "customer age" and "last purchase date" can be transformed into features like "days since last purchase" or "age group" to improve predictions.</p>

</div>`
  }
};
