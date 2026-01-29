import type { Lesson } from '@/types/course';

export const lesson6ModelDeploymentMethods: Lesson = {
  id: 6,
  title: 'Model Deployment Methods',
  duration: '30 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=vA0C0k72-b4',
    textContent: `<div class="lesson-content">

<h1>Model Deployment Methods</h1>

<p><strong>Deployment integrates trained models into production systems for real-world use.</strong></p>

<table>
  <thead>
    <tr>
      <th><strong>Method</strong></th>
      <th><strong>Description</strong></th>
      <th><strong>Use Case</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Flask API</strong></td>
      <td><strong>Lightweight Python web framework for model APIs</strong></td>
      <td><strong>Simple web-based inference.</strong></td>
    </tr>
    <tr>
      <td><strong>FastAPI</strong></td>
      <td><strong>High-performance Python framework with async support</strong></td>
      <td><strong>Scalable APIs for real-time applications.</strong></td>
    </tr>
    <tr>
      <td><strong>Docker</strong></td>
      <td><strong>Containerizes models for portability and scalability</strong></td>
      <td><strong>Consistent deployment across environments.</strong></td>
    </tr>
    <tr>
      <td><strong>Cloud Platforms</strong></td>
      <td><strong>Managed services like AWS SageMaker, Google AI Platform, Azure ML</strong></td>
      <td><strong>Large-scale, cloud-based deployment.</strong></td>
    </tr>
  </tbody>
</table>

<h2>Example: Flask API</h2>
<pre><code>from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)
model = joblib.load('model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    features = np.array(data['features']).reshape(1, -1)
    prediction = model.predict(features)
    return jsonify({'prediction': prediction.tolist()})

if __name__ == '__main__':
    app.run(debug=True)</code></pre>

<h2>Example: Docker Deployment</h2>
<pre><code>FROM python:3.9
WORKDIR /app
COPY . /app
RUN pip install -r requirements.txt
CMD ["python", "app.py"]</code></pre>

<h2>Cloud Deployment:</h2>
<ul>
  <li><strong>AWS SageMaker</strong>: Host models with built-in scaling and monitoring.</li>
  <li><strong>Google AI Platform</strong>: Deploy TensorFlow or PyTorch models.</li>
  <li><strong>Azure ML</strong>: Supports multi-framework deployment with MLOps integration.</li>
</ul>

<h2>Considerations:</h2>
<ul>
  <li><strong>Scalability</strong>: Ensure the deployment method handles expected load (e.g., Docker for scalability).</li>
  <li><strong>Latency</strong>: Optimize for real-time applications (e.g., FastAPI for low latency).</li>
  <li><strong>Security</strong>: Protect APIs with authentication and encryption.</li>
</ul>

</div>`
  }
};
