import type { Lesson } from '@/types/course';

export const lesson8OverfittingInDeepLearning: Lesson = {
  id: 8,
  title: 'Overfitting in Deep Learning',
  duration: '25 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/6M5VXKLf4D4',
    textContent: `<div class="lesson-content">

<h1>Overfitting in Deep Learning</h1>

<p><strong>Deep learning models, due to their high capacity (many parameters), are prone to overfitting, where they memorize training data but perform poorly on unseen data.</strong></p>

<h2>Signs of Overfitting:</h2>
<ul>
  <li>High training accuracy but low validation/test accuracy.</li>
  <li>Diverging training and validation loss curves.</li>
</ul>
<pre><code>import matplotlib.pyplot as plt
history = model.fit(X_train, y_train, validation_data=(X_test, y_test), epochs=100, verbose=0)
plt.plot(history.history['loss'], label='Training Loss')
plt.plot(history.history['val_loss'], label='Validation Loss')
plt.legend()
plt.show()</code></pre>

<h2>Solutions:</h2>

<h3>Dropout Layers:</h3>
<p>Randomly disable neurons during training to prevent over-reliance on specific paths.</p>
<pre><code>from tensorflow.keras.layers import Dropout
model.add(Dropout(0.3))  # 30% of neurons dropped</code></pre>

<h3>Early Stopping:</h3>
<p>Halt training when validation performance stops improving.</p>
<pre><code>from tensorflow.keras.callbacks import EarlyStopping
early_stopping = EarlyStopping(patience=5, restore_best_weights=True)
model.fit(X_train, y_train, callbacks=[early_stopping], validation_data=(X_test, y_test))</code></pre>

<h3>Regularization:</h3>
<ul>
  <li><strong>L1/L2 Regularization</strong>: Add penalties to weights to reduce complexity.</li>
</ul>
<pre><code>from tensorflow.keras.regularizers import l2
model.add(Dense(8, activation='relu', kernel_regularizer=l2(0.01)))</code></pre>

<h3>More Training Data:</h3>
<p>Collect or augment data (e.g., image rotations, flips) to improve generalization.</p>
<pre><code>from tensorflow.keras.preprocessing.image import ImageDataGenerator
datagen = ImageDataGenerator(rotation_range=20, horizontal_flip=True)</code></pre>

<h3>Simpler Architecture:</h3>
<p>Reduce layers or neurons to lower model capacity.</p>

</div>`
  }
};
