import type { Lesson } from '@/types/course';

export const lesson5ConvolutionalNeuralNetworksCNNs: Lesson = {
  id: 5,
  title: 'Convolutional Neural Networks (CNNs)',
  duration: '30 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=QzY57FaENXg',
    textContent: `<div class="lesson-content">

<h1>Convolutional Neural Networks (CNNs)</h1>

<p><strong>CNNs are specialized neural networks designed for processing grid-like data, such as images. They use convolutional layers to automatically learn hierarchical features from raw pixel data.</strong></p>

<h2>Key Components:</h2>
<ul>
  <li><strong>Convolutional Layers</strong>: Apply filters to detect features like edges, textures, or patterns.</li>
  <li><strong>Pooling Layers</strong>: Reduce spatial dimensions and computation (e.g., max pooling).</li>
  <li><strong>Fully Connected Layers</strong>: Perform classification based on extracted features.</li>
</ul>

<h2>Example CNN Architecture:</h2>
<pre><code>from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense

model = Sequential([
    Conv2D(32, (3, 3), activation='relu', input_shape=(64, 64, 3)),  # First convolution
    MaxPooling2D(pool_size=(2, 2)),
    Conv2D(64, (3, 3), activation='relu'),                           # Second convolution
    MaxPooling2D(pool_size=(2, 2)),
    Flatten(),                                                       # Flatten for dense layers
    Dense(128, activation='relu'),                                   # Fully connected layer
    Dense(1, activation='sigmoid')                                   # Output layer (binary)
])

# Compile model
model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])</code></pre>

<h3>Explanation:</h3>
<ul>
  <li><strong>Input Shape: (64, 64, 3) for 64x64 RGB images.</strong></li>
  <li><strong>Conv2D: Applies 32 or 64 filters to detect features.</strong></li>
  <li><strong>MaxPooling2D: Reduces spatial dimensions (e.g., 64x64 to 32x32).</strong></li>
  <li><strong>Flatten: Converts 2D feature maps to 1D for dense layers.</strong></li>
  <li><strong>Dense: Performs classification (sigmoid for binary output).</strong></li>
</ul>

<h3>Pre-trained CNNs:</h3>
<ul>
  <li><strong>VGG16/VGG19: Deep architectures for image classification.</strong></li>
  <li><strong>ResNet: Uses residual connections for very deep networks.</strong></li>
  <li><strong>EfficientNet: Balances accuracy and efficiency.</strong></li>
  <li><strong>MobileNet: Lightweight for mobile devices.</strong></li>
</ul>
<pre><code>from tensorflow.keras.applications import VGG16
base_model = VGG16(weights='imagenet', include_top=False, input_shape=(224, 224, 3))</code></pre>

</div>`
  }
};
