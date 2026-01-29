import type { Lesson } from '@/types/course';

export const lesson4HyperparameterTuning: Lesson = {
  id: 4,
  title: 'Hyperparameter Tuning',
  duration: '30 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=HdlDYng8g9s',
    textContent: `<div class="lesson-content">

<h1>Hyperparameter Tuning</h1>

<p><strong>Hyperparameters are configuration settings defined before training that influence model behavior (e.g., learning rate, number of trees).</strong></p>

<h2>Common Hyperparameters:</h2>
<ul>
  <li><strong>General</strong>: Learning rate, batch size, number of epochs.</li>
  <li><strong>Tree-Based Models</strong>: Max depth, number of trees, minimum samples per split.</li>
  <li><strong>Neural Networks</strong>: Number of layers, neurons per layer, dropout rate.</li>
  <li><strong>SVM</strong>: Kernel type, regularization parameter (C).</li>
</ul>

<h2>Tuning Methods:</h2>

<h3>Grid Search: Tests all possible combinations of hyperparameters.</h3>
<pre><code>from sklearn.model_selection import GridSearchCV
from sklearn.ensemble import RandomForestClassifier

model = RandomForestClassifier()
param_grid = {'max_depth': [3, 5, 7], 'n_estimators': [50, 100]}
grid = GridSearchCV(model, param_grid, cv=3, scoring='accuracy')
grid.fit(X, y)
print("Best Parameters:", grid.best_params_)
print("Best Score:", grid.best_score_)</code></pre>

<h3>Random Search: Tests a random subset of combinations for efficiency.</h3>
<pre><code>from sklearn.model_selection import RandomizedSearchCV
param_dist = {'max_depth': [3, 5, 7, 10], 'n_estimators': [50, 100, 200]}
random_search = RandomizedSearchCV(model, param_dist, n_iter=10, cv=3)
random_search.fit(X, y)</code></pre>

<h3>Bayesian Optimization: Uses probabilistic models to prioritize promising hyperparameters.</h3>
<pre><code>from skopt import BayesSearchCV
opt = BayesSearchCV(model, {'max_depth': (3, 10), 'n_estimators': (50, 200)}, n_iter=10, cv=3)
opt.fit(X, y)</code></pre>

<h2>Best Practices:</h2>
<ul>
  <li>Start with coarse ranges, then refine with narrower searches.</li>
  <li>Use cross-validation to evaluate hyperparameter performance.</li>
  <li>Balance tuning time with model improvement (Random Search or Bayesian Optimization for large spaces).</li>
  <li>Prioritize impactful hyperparameters (e.g., learning rate in neural networks).</li>
</ul>

</div>`
  }
};
