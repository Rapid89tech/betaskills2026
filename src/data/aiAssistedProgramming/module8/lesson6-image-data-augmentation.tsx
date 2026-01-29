import type { Lesson } from '@/types/course';

export const lesson6ImageDataAugmentation: Lesson = {
  id: 6,
  title: 'Image Data Augmentation',
  duration: '25 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=rfM4DaLTkMs',
    textContent: `<div class="lesson-content">

<h1>Image Data Augmentation</h1>

<p><strong>Data augmentation generates modified versions of images to increase dataset diversity and prevent overfitting.</strong></p>

<h3>Techniques:</h3>
<ul>
  <li><strong>Flipping: Horizontal or vertical flips.</strong></li>
  <li><strong>Rotating: Rotating images by a specified angle.</strong></li>
  <li><strong>Shifting: Translating images horizontally or vertically.</strong></li>
  <li><strong>Zooming: Zooming in or out.</strong></li>
  <li><strong>Shearing: Distorting images along an axis.</strong></li>
  <li><strong>Brightness/Contrast Adjustment: Altering lighting conditions.</strong></li>
</ul>

<h3>Example Code:</h3>
<pre><code>from tensorflow.keras.preprocessing.image import ImageDataGenerator

# Define augmentation
datagen = ImageDataGenerator(
    rotation_range=20,
    width_shift_range=0.2,
    height_shift_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True,
    fill_mode='nearest'
)

# Example usage with a single image
import numpy as np
image = cv2.imread("image.jpg")
image = image.reshape((1,) + image.shape)  # Add batch dimension
augmented_images = datagen.flow(image, batch_size=1)</code></pre>

<h3>Benefits:</h3>
<ul>
  <li><strong>Increases dataset size, improving model generalization.</strong></li>
  <li><strong>Simulates real-world variations (e.g., different lighting or angles).</strong></li>
  <li><strong>Reduces overfitting by exposing the model to diverse examples.</strong></li>
</ul>

<h3>Considerations:</h3>
<ul>
  <li><strong>Avoid excessive augmentation that distorts meaningful features (e.g., over-rotating text images).</strong></li>
  <li><strong>Use real-time augmentation during training for efficiency.</strong></li>
</ul>
<pre><code>datagen.fit(X_train)
model.fit(datagen.flow(X_train, y_train, batch_size=32), epochs=50)</code></pre>

</div>`
  }
};
