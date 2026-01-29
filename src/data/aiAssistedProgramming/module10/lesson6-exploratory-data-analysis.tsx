import type { Lesson } from '@/types/course';

export const lesson6ExploratoryDataAnalysis: Lesson = {
  id: 6,
  title: 'Exploratory Data Analysis (EDA)',
  duration: '25 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=QiqZliDXCCg',
    textContent: `<div class="lesson-content">

<h1>Exploratory Data Analysis (EDA)</h1>

<h2>Purpose:</h2>

<ul>
  <li><strong>Discover patterns and relationships.</strong></li>
  <li><strong>Identify outliers or imbalances.</strong></li>
</ul>

<h3>Example:</h3>
<pre><code>import seaborn as sns
import matplotlib.pyplot as plt

sns.countplot(x='Churn', data=df)
plt.show()</code></pre>

<h2>Recommended EDA activities:</h2>

<ul>
  <li><strong>Compare churn rates across contract types.</strong></li>
  <li><strong>Visualize correlations between features and churn.</strong></li>
  <li><strong>Plot distribution of tenure and monthly charges.</strong></li>
</ul>

</div>`
  }
};
