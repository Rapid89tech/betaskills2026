import type { Lesson } from '@/types/course';

export const lesson2ArtificialNeuralNetworks: Lesson = {
  id: 2,
  title: 'Artificial Neural Networks (ANNs)',
  duration: '30 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/6M5VXKLf4D4',
    textContent: `<div class="lesson-content">

<h1>Artificial Neural Networks (ANNs)</h1>

<p><strong>Artificial Neural Networks are the backbone of deep learning, designed to mimic the human brain's information processing through layers of interconnected nodes (neurons).</strong></p>

<h2>Structure:</h2>
<ul>
  <li><strong>Input Layer</strong>: Receives raw data (e.g., pixel values in an image).</li>
  <li><strong>Hidden Layers</strong>: Perform transformations via weighted computations and activation functions. Deeper networks (more hidden layers) can model complex patterns.</li>
  <li><strong>Output Layer</strong>: Produces the final prediction or classification (e.g., probability of a class, numerical value).</li>
</ul>

<h2>Neuron Functionality:</h2>
<p>Each neuron computes a weighted sum of inputs, applies an activation function, and passes the result to the next layer:</p>
<p><strong>output = activation(weighted_sum(inputs) + bias)</strong></p>
<ul>
  <li><strong>Weights</strong>: Learnable parameters that adjust the influence of inputs.</li>
  <li><strong>Bias</strong>: Shifts the activation to improve model flexibility.</li>
  <li><strong>Activation Function</strong>: Introduces non-linearity to capture complex patterns (see section 6.3).</li>
</ul>

<h2>Example:</h2>
<p>For an image classification task:</p>
<ul>
  <li><strong>Input Layer</strong>: Pixel values of an image (e.g., 28x28 pixels = 784 inputs).</li>
  <li><strong>Hidden Layers</strong>: Transform inputs to detect features like edges or shapes.</li>
  <li><strong>Output Layer</strong>: Probabilities for each class (e.g., [0.9, 0.1] for "cat" vs. "dog").</li>
</ul>

<h2>Types of ANNs:</h2>
<ul>
  <li><strong>Shallow Networks</strong>: Few hidden layers, suitable for simple tasks.</li>
  <li><strong>Deep Networks</strong>: Many hidden layers, ideal for complex tasks like image or speech recognition.</li>
</ul>

</div>`
  }
};
