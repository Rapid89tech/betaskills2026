import type { Lesson } from '@/types/course';

export const lesson7HyperparameterTuning: Lesson = {
  id: 7,
  title: 'Hyperparameter Tuning',
  duration: '35 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=HdlDYng8g9s',
    textContent: `<div class="lesson-content">

<h1>Hyperparameter Tuning</h1>

<p><strong>Hyperparameters are configuration settings for algorithms (e.g., learning rate, number of trees) that must be set before training. Tuning optimizes model performance.</strong></p>

<h2>Techniques:</h2>

<h3>Grid Search:</h3>
<p>Tests all combinations of hyperparameters.</p>
<pre><code>from sklearn.model_selection import GridSearchCV
param_grid = {'n_estimators': [50, 100], 'max_depth': [3, 5]}
grid_search = GridSearchCV(RandomForestClassifier(), param_grid, cv=5)
grid_search.fit(X_train, y_train)
print("Best Parameters:", grid_search.best_params_)</code></pre>

<h3>Random Search:</h3>
<p>Tests random combinations for efficiency.</p>
<pre><code>from sklearn.model_selection import RandomizedSearchCV
param_dist = {'n_estimators': [50, 100, 200], 'max_depth': [3, 5, 10]}
random_search = RandomizedSearchCV(RandomForestClassifier(), param_dist, n_iter=10, cv=5)
random_search.fit(X_train, y_train)</code></pre>

<h3>Bayesian Optimization:</h3>
<p>Uses probabilistic models to find optimal hyperparameters.</p>
<pre><code>from skopt import BayesSearchCV
opt = BayesSearchCV(RandomForestClassifier(), {'n_estimators': (50, 200), 'max_depth': (3, 10)}, n_iter=10, cv=5)
opt.fit(X_train, y_train)</code></pre>

<h2>Best Practices:</h2>
<ul>
  <li>Use cross-validation to evaluate hyperparameter performance.</li>
  <li>Start with coarse ranges, then refine with narrower searches.</li>
  <li>Balance tuning time with model improvement (e.g., prioritize impactful parameters).</li>
</ul>

</div>`
  }
};
