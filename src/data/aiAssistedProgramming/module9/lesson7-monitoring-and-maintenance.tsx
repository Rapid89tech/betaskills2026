import type { Lesson } from '@/types/course';

export const lesson7MonitoringAndMaintenance: Lesson = {
  id: 7,
  title: 'Monitoring and Maintenance',
  duration: '25 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=BApzsgq32mM',
    textContent: `<div class="lesson-content">

<h1>Monitoring and Maintenance</h1>

<p><strong>Post-deployment, models require ongoing monitoring and maintenance to ensure performance and relevance.</strong></p>

<h2>Key Tasks:</h2>

<h3>Monitor Performance Drift:</h3>
<ul>
  <li>Track metrics like accuracy or RMSE in production.</li>
  <li>Detect data drift (changes in input data distribution).</li>
</ul>
<pre><code>from sklearn.metrics import accuracy_score
production_data = ...  # New data
y_true, y_pred = production_data['true'], model.predict(production_data['features'])
print("Production Accuracy:", accuracy_score(y_true, y_pred))</code></pre>

<h3>Update Models:</h3>
<ul>
  <li>Retrain with new data to address drift or changing patterns.</li>
  <li>Example: Update a fraud detection model with recent transactions.</li>
</ul>
<pre><code>model.fit(new_X, new_y)  # Retrain with new data
joblib.dump(model, 'model_updated.pkl')</code></pre>

<h3>Version Control:</h3>
<ul>
  <li>Track model versions, parameters, and datasets using tools like MLflow or DVC.</li>
</ul>
<pre><code>import mlflow
with mlflow.start_run():
    mlflow.log_param("max_depth", 5)
    mlflow.log_metric("accuracy", 0.85)
    mlflow.sklearn.log_model(model, "model")</code></pre>

<h2>Best Practices:</h2>
<ul>
  <li>Automate monitoring with tools like Prometheus or Grafana.</li>
  <li>Schedule periodic retraining based on data updates.</li>
  <li>Maintain a model registry for traceability (e.g., MLflow Model Registry).</li>
  <li>Test updates in a staging environment before production deployment.</li>
</ul>

</div>`
  }
};
