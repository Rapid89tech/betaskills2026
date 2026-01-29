import type { Lesson } from '@/types/course';

export const lesson9RealWorldApplications: Lesson = {
  id: 9,
  title: 'Real-World Applications',
  duration: '25 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/6M5VXKLf4D4',
    textContent: `<div class="lesson-content">

<h1>Real-World Applications</h1>

<p><strong>Deep learning powers transformative applications across industries.</strong></p>

<table>
  <thead>
    <tr>
      <th><strong>Application</strong></th>
      <th><strong>Description</strong></th>
      <th><strong>Example</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Face Recognition</strong></td>
      <td><strong>Identifies faces in images or videos</strong></td>
      <td><strong>Security systems, social media tagging.</strong></td>
    </tr>
    <tr>
      <td><strong>Speech Recognition</strong></td>
      <td><strong>Converts spoken language to text</strong></td>
      <td><strong>Virtual assistants (Siri, Alexa).</strong></td>
    </tr>
    <tr>
      <td><strong>Fraud Detection</strong></td>
      <td><strong>Detects anomalous patterns in transactions</strong></td>
      <td><strong>Banking and credit card systems.</strong></td>
    </tr>
    <tr>
      <td><strong>Chatbots/Translators</strong></td>
      <td><strong>Understands and generates human-like text</strong></td>
      <td><strong>Customer service bots, Google Translate.</strong></td>
    </tr>
    <tr>
      <td><strong>Autonomous Vehicles</strong></td>
      <td><strong>Processes sensor data for navigation and decisions</strong></td>
      <td><strong>Self-driving cars (Tesla, Waymo).</strong></td>
    </tr>
    <tr>
      <td><strong>Medical Diagnosis</strong></td>
      <td><strong>Analyzes medical images or data for diagnosis</strong></td>
      <td><strong>Detecting tumors in MRI scans.</strong></td>
    </tr>
    <tr>
      <td><strong>Generative AI</strong></td>
      <td><strong>Creates content like images, music, or text</strong></td>
      <td><strong>DALL-E, ChatGPT, AI-generated art.</strong></td>
    </tr>
  </tbody>
</table>

<h2>Example:</h2>
<p>A CNN trained on X-ray images can detect pneumonia with high accuracy, assisting doctors in diagnosis.</p>

</div>`
  }
};
