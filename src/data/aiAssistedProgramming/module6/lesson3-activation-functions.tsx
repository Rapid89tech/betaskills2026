import type { Lesson } from '@/types/course';

export const lesson3ActivationFunctions: Lesson = {
  id: 3,
  title: 'Activation Functions',
  duration: '25 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/6M5VXKLf4D4',
    textContent: `<div class="lesson-content">

<h1>Activation Functions</h1>

<p><strong>Activation functions introduce non-linearity into neural networks, enabling them to model complex relationships. They determine whether a neuron "fires" by transforming its input.</strong></p>

<table>
  <thead>
    <tr>
      <th><strong>Function</strong></th>
      <th><strong>Formula</strong></th>
      <th><strong>Use Case</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>ReLU (Rectified Linear Unit)</strong></td>
      <td><strong>f(x) = max(0, x)</strong></td>
      <td><strong>Fast and effective for hidden layers; prevents vanishing gradients.</strong></td>
    </tr>
    <tr>
      <td><strong>Sigmoid</strong></td>
      <td><strong>f(x) = 1 / (1 + e^-x)</strong></td>
      <td><strong>Binary classification (outputs 0 to 1); used in output layers.</strong></td>
    </tr>
    <tr>
      <td><strong>Softmax</strong></td>
      <td><strong>Normalizes outputs to sum to 1</strong></td>
      <td><strong>Multi-class classification (e.g., probabilities for multiple classes).</strong></td>
    </tr>
    <tr>
      <td><strong>Tanh</strong></td>
      <td><strong>f(x) = (e^x - e^-x) / (e^x + e^-x)</strong></td>
      <td><strong>Normalizes outputs to [-1, 1]; used in shallow networks or RNNs.</strong></td>
    </tr>
    <tr>
      <td><strong>Leaky ReLU</strong></td>
      <td><strong>f(x) = max(αx, x), α small</strong></td>
      <td><strong>Prevents "dying ReLU" problem in deep networks.</strong></td>
    </tr>
    <tr>
      <td><strong>ELU (Exponential Linear Unit)</strong></td>
      <td><strong>Similar to ReLU with negative exponential</strong></td>
      <td><strong>Smooths gradients for negative inputs, improving training.</strong></td>
    </tr>
  </tbody>
</table>

<h2>Example:</h2>
<pre><code>import numpy as np

def relu(x):
    return np.maximum(0, x)

x = np.array([-1, 0, 2])
print(relu(x))  # Output: [0, 0, 2]</code></pre>

<h2>Considerations:</h2>
<ul>
  <li><strong>ReLU</strong>: Default choice for hidden layers due to simplicity and performance.</li>
  <li><strong>Sigmoid/Softmax</strong>: Common in output layers for classification tasks.</li>
  <li><strong>Tanh</strong>: Useful for centered data but slower than ReLU.</li>
</ul>

</div>`
  }
};
