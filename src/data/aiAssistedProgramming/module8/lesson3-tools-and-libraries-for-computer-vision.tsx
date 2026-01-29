import type { Lesson } from '@/types/course';

export const lesson3ToolsAndLibrariesForComputerVision: Lesson = {
  id: 3,
  title: 'Tools and Libraries for Computer Vision',
  duration: '25 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=WEgS8pnWc4k',
    textContent: `<div class="lesson-content">

<h1>Tools and Libraries for Computer Vision</h1>

<p><strong>A variety of libraries and frameworks support computer vision tasks, from basic image processing to advanced deep learning.</strong></p>

<table>
  <thead>
    <tr>
      <th><strong>Library</strong></th>
      <th><strong>Description</strong></th>
      <th><strong>Use Case</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>OpenCV</strong></td>
      <td><strong>Open-source library for core image processing tasks</strong></td>
      <td><strong>Image manipulation, feature detection.</strong></td>
    </tr>
    <tr>
      <td><strong>TensorFlow/Keras</strong></td>
      <td><strong>Deep learning framework for building CV models</strong></td>
      <td><strong>CNNs for classification, segmentation.</strong></td>
    </tr>
    <tr>
      <td><strong>PyTorch</strong></td>
      <td><strong>Flexible framework for research and CV models</strong></td>
      <td><strong>Dynamic neural networks, object detection.</strong></td>
    </tr>
    <tr>
      <td><strong>MediaPipe</strong></td>
      <td><strong>Google's library for real-time tracking</strong></td>
      <td><strong>Face, pose, or hand tracking.</strong></td>
    </tr>
    <tr>
      <td><strong>YOLO</strong></td>
      <td><strong>Real-time object detection model</strong></td>
      <td><strong>Fast detection in videos or images.</strong></td>
    </tr>
    <tr>
      <td><strong>SSD</strong></td>
      <td><strong>Single Shot MultiBox Detector for object detection</strong></td>
      <td><strong>Efficient detection with good accuracy.</strong></td>
    </tr>
    <tr>
      <td><strong>Faster R-CNN</strong></td>
      <td><strong>High-accuracy object detection model</strong></td>
      <td><strong>Precise detection for complex scenes.</strong></td>
    </tr>
  </tbody>
</table>

<h2>Example Installation:</h2>
<pre><code>pip install opencv-python tensorflow torch mediapipe</code></pre>

<h2>Considerations:</h2>
<ul>
  <li><strong>OpenCV</strong>: Ideal for traditional CV tasks like filtering or edge detection.</li>
  <li><strong>TensorFlow/Keras</strong>: Suited for production-grade deep learning models.</li>
  <li><strong>PyTorch</strong>: Preferred for research due to its flexibility and dynamic computation graphs.</li>
  <li><strong>MediaPipe/YOLO</strong>: Optimized for real-time applications on resource-constrained devices.</li>
</ul>

</div>`
  }
};
