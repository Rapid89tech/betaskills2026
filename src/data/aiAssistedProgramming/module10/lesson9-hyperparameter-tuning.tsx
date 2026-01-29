import type { Lesson } from '@/types/course';

export const lesson9HyperparameterTuning: Lesson = {
  id: 9,
  title: 'Hyperparameter Tuning',
  duration: '25 minutes',
  type: 'video',
  content: {
    videoUrl: '',
    textContent: `<div class="lesson-content">

<h1>Hyperparameter Tuning</h1>

<h2>Purpose: Improve performance without overfitting.</h2>

<h3>Example with GridSearchCV:</h3>
<pre><code>from sklearn.model_selection import GridSearchCV

params = {'n_estimators': [50, 100, 200], 'max_depth': [5, 10, None]}
grid = GridSearchCV(RandomForestClassifier(random_state=42), params, cv=3, scoring='f1')
grid.fit(X_train, y_train)</code></pre>

</div>`
  }
};
