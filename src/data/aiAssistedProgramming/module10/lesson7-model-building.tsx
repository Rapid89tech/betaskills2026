import type { Lesson } from '@/types/course';

export const lesson7ModelBuilding: Lesson = {
  id: 7,
  title: 'Model Building',
  duration: '30 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=5sLYAQS9sWQ',
    textContent: `<div class="lesson-content">

<h1>Model Building</h1>

<h2>Approach:</h2>

<ul>
  <li><strong>Split dataset: 80% training, 20% testing.</strong></li>
  <li><strong>Choose initial baseline model (e.g., Logistic Regression) and compare with more complex models (e.g., Random Forest, Gradient Boosted Trees).</strong></li>
</ul>

<h3>Example:</h3>
<pre><code>from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report

X = df.drop('Churn_Yes', axis=1)
y = df['Churn_Yes']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = RandomForestClassifier(random_state=42)
model.fit(X_train, y_train)</code></pre>

</div>`
  }
};
