import type { Lesson } from '@/types/course';

export const lesson8ModelDeploymentOverview: Lesson = {
  id: 8,
  title: 'Model Deployment Overview',
  duration: '30 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=mAvyG9OS4uY&t=67s',
    textContent: `<div class="lesson-content">

<h1>Model Deployment Overview</h1>

<p><strong>Deployment integrates a trained model into a production environment for real-world use.</strong></p>

<h2>Steps:</h2>

<h3>1. Save the Model:</h3>
<ul>
  <li>Use joblib or pickle to serialize the model.</li>
</ul>
<pre><code>import joblib
joblib.dump(model, 'model.pkl')</code></pre>

<h3>2. Load the Model:</h3>
<ul>
  <li>Load the saved model for predictions.</li>
</ul>
<pre><code>model = joblib.load('model.pkl')
new_predictions = model.predict(new_data)</code></pre>

<h3>3. Deploy via APIs:</h3>
<ul>
  <li>Use frameworks like Flask or FastAPI to create web services.</li>
</ul>
<pre><code>from flask import Flask, request, jsonify
app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    X_new = np.array(data['features']).reshape(1, -1)
    prediction = model.predict(X_new)
    return jsonify({'prediction': prediction.tolist()})

app.run()</code></pre>

<h3>4. Integrate into Systems:</h3>
<ul>
  <li>Embed models in mobile apps, IoT devices, or automated workflows.</li>
  <li>Use frameworks like TensorFlow Lite for edge devices.</li>
</ul>

<h3>5. Monitor and Update:</h3>
<ul>
  <li>Track model performance in production (e.g., accuracy, latency).</li>
  <li>Retrain with new data to address data drift.</li>
  <li>Example: Monitor a fraud detection model for new fraud patterns.</li>
</ul>

<h2>Deployment Platforms:</h2>
<ul>
  <li><strong>Cloud</strong>: AWS SageMaker, Google Cloud AI Platform, Azure ML.</li>
  <li><strong>Edge</strong>: TensorFlow Lite, ONNX Runtime.</li>
  <li><strong>Web</strong>: Flask, FastAPI, Django.</li>
</ul>

<h2>Challenges:</h2>
<ul>
  <li><strong>Scalability</strong>: Handle large-scale predictions or real-time inference.</li>
  <li><strong>Latency</strong>: Optimize for fast predictions in time-sensitive applications.</li>
  <li><strong>Security</strong>: Protect models and data from unauthorized access.</li>
</ul>

</div>`
  }
};
