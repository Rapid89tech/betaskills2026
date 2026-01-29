import type { Lesson } from '@/types/course';

export const lesson11DeployTheModelWithFlask: Lesson = {
  id: 11,
  title: 'Deploy the Model with Flask',
  duration: '30 minutes',
  type: 'video',
  content: {
    videoUrl: '',
    textContent: `<div class="lesson-content">

<h1>Deploy the Model with Flask</h1>

<h3>Example:</h3>
<pre><code>from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)
model = joblib.load('churn_model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)
    prediction = model.predict([list(data.values())])
    return jsonify({'prediction': int(prediction[0])})</code></pre>

</div>`
  }
};
