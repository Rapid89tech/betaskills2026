import type { Lesson } from '@/types/course';

export const lesson4BasicImageProcessingTechniques: Lesson = {
  id: 4,
  title: 'Basic Image Processing Techniques',
  duration: '35 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=kSqxn6zGE0c',
    textContent: `<div class="lesson-content">

<h1>Basic Image Processing Techniques</h1>

<p><strong>Image processing techniques prepare or enhance visual data for analysis, often using OpenCV.</strong></p>

<h2>Example Code:</h2>
<pre><code>import cv2

# Load image
image = cv2.imread("image.jpg")

# Convert to grayscale
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# Resize image
resized = cv2.resize(image, (200, 200))

# Apply Gaussian blur
blurred = cv2.GaussianBlur(image, (5, 5), 0)

# Edge detection
edges = cv2.Canny(image, 100, 200)

# Thresholding
_, thresh = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY)

# Display image
cv2.imshow("Grayscale Image", gray)
cv2.waitKey(0)
cv2.destroyAllWindows()</code></pre>

<h2>Common Tasks:</h2>
<ul>
  <li><strong>Resizing</strong>: Adjusts image dimensions for consistency or reduced computation.</li>
</ul>
<pre><code>resized = cv2.resize(image, (100, 100))</code></pre>

<ul>
  <li><strong>Cropping</strong>: Extracts a region of interest.</li>
</ul>
<pre><code>cropped = image[50:150, 50:150]</code></pre>

<ul>
  <li><strong>Blurring</strong>: Reduces noise or details (e.g., Gaussian blur).</li>
</ul>
<pre><code>blurred = cv2.GaussianBlur(image, (5, 5), 0)</code></pre>

<ul>
  <li><strong>Edge Detection</strong>: Identifies boundaries using algorithms like Canny.</li>
</ul>
<pre><code>edges = cv2.Canny(image, 100, 200)</code></pre>

<ul>
  <li><strong>Thresholding</strong>: Converts images to binary (e.g., for segmentation).</li>
</ul>
<pre><code>_, thresh = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY)</code></pre>

<ul>
  <li><strong>Color Space Conversion</strong>: Converts between color spaces (e.g., BGR to HSV).</li>
</ul>
<pre><code>hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)</code></pre>

<h2>Considerations:</h2>
<ul>
  <li>Preprocessing improves model performance by standardizing inputs.</li>
  <li>Techniques like blurring or thresholding are often prerequisites for advanced tasks like object detection.</li>
</ul>

</div>`
  }
};
