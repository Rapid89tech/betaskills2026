import type { Lesson } from '@/types/course';

export const lesson4DataCollection: Lesson = {
  id: 4,
  title: 'Data Collection',
  duration: '20 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=4SUGOKVVfOg',
    textContent: `<div class="lesson-content">

<h1>Data Collection</h1>

<h2>Dataset recommendation:</h2>

<ul>
  <li><strong>Telco Customer Churn Dataset</strong> (available on Kaggle).</li>
</ul>

<h2>Best practices:</h2>

<ul>
  <li><strong>Always verify data licensing before use.</strong></li>
  <li><strong>Document data source and version for reproducibility.</strong></li>
  <li><strong>Use Pandas to load and inspect:</strong></li>
</ul>

<h3>Example Code:</h3>
<pre><code>import pandas as pd

df = pd.read_csv('customer_churn.csv')
print(df.head())
print(df.info())</code></pre>

</div>`
  }
};
