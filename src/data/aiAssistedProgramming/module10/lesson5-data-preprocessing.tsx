import type { Lesson } from '@/types/course';

export const lesson5DataPreprocessing: Lesson = {
  id: 5,
  title: 'Data Preprocessing',
  duration: '25 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=NBm4etNMT5k',
    textContent: `<div class="lesson-content">

<h1>Data Preprocessing</h1>

<h2>Tasks:</h2>

<ol>
  <li><strong>Handle Missing Values</strong> – remove or impute.</li>
  <li><strong>Encode Categorical Variables</strong> – e.g., <code>get_dummies()</code> for one-hot encoding.</li>
  <li><strong>Scale Numerical Features</strong> – important for models sensitive to magnitude (e.g., Logistic Regression, SVM).</li>
</ol>

<h3>Example:</h3>
<pre><code>df.dropna(inplace=True)
df = pd.get_dummies(df, drop_first=True)</code></pre>

<h2>Industry tip:</h2>
<p><strong>Keep a copy of the original dataset before transformation for reference.</strong></p>

</div>`
  }
};
