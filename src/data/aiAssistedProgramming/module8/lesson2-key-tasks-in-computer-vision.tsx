import type { Lesson } from '@/types/course';

export const lesson2KeyTasksInComputerVision: Lesson = {
  id: 2,
  title: 'Key Tasks in Computer Vision',
  duration: '30 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=dnEpS_Jw9vU',
    textContent: `<div class="lesson-content">

<h1>Key Tasks in Computer Vision</h1>

<p><strong>Computer Vision encompasses a variety of tasks, each addressing specific challenges in processing visual data.</strong></p>

<table>
  <thead>
    <tr>
      <th><strong>Task</strong></th>
      <th><strong>Description</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Image Classification</strong></td>
      <td><strong>Assigns a single label to an entire image (e.g., "cat" or "dog").</strong></td>
    </tr>
    <tr>
      <td><strong>Object Detection</strong></td>
      <td><strong>Identifies and locates multiple objects in an image with bounding boxes.</strong></td>
    </tr>
    <tr>
      <td><strong>Image Segmentation</strong></td>
      <td><strong>Classifies each pixel into a category (e.g., separating objects from background).</strong></td>
    </tr>
    <tr>
      <td><strong>Face Recognition</strong></td>
      <td><strong>Identifies or verifies individuals based on facial features.</strong></td>
    </tr>
    <tr>
      <td><strong>Image Captioning</strong></td>
      <td><strong>Generates textual descriptions of an image's content (e.g., "A dog chasing a ball").</strong></td>
    </tr>
    <tr>
      <td><strong>Pose Estimation</strong></td>
      <td><strong>Detects human body landmarks or poses (e.g., for motion tracking).</strong></td>
    </tr>
    <tr>
      <td><strong>Optical Character Recognition (OCR)</strong></td>
      <td><strong>Extracts text from images (e.g., scanning documents).</strong></td>
    </tr>
  </tbody>
</table>

<h2>Additional Tasks:</h2>
<ul>
  <li><strong>Image Generation</strong>: Creating synthetic images using models like GANs.</li>
  <li><strong>Video Tracking</strong>: Following objects across video frames.</li>
  <li><strong>Scene Understanding</strong>: Interpreting the context or layout of a scene.</li>
</ul>

</div>`
  }
};
