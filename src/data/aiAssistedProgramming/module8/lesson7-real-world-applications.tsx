import type { Lesson } from '@/types/course';

export const lesson7RealWorldApplications: Lesson = {
  id: 7,
  title: 'Real-World Applications',
  duration: '25 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=eHCEtG-RU6E',
    textContent: `<div class="lesson-content">

<h1>Real-World Applications</h1>

<p><strong>Computer vision transforms industries by enabling machines to process and interpret visual data.</strong></p>

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
      <td><strong>Facial Recognition</strong></td>
      <td><strong>Identifies or verifies individuals from faces</strong></td>
      <td><strong>Smartphone unlocking, security systems.</strong></td>
    </tr>
    <tr>
      <td><strong>Medical Image Analysis</strong></td>
      <td><strong>Analyzes medical scans for diagnosis</strong></td>
      <td><strong>Detecting tumors in MRIs or X-rays.</strong></td>
    </tr>
    <tr>
      <td><strong>License Plate Recognition</strong></td>
      <td><strong>Reads vehicle license plates</strong></td>
      <td><strong>Traffic monitoring, parking systems.</strong></td>
    </tr>
    <tr>
      <td><strong>Self-Driving Cars</strong></td>
      <td><strong>Processes camera and sensor data for navigation</strong></td>
      <td><strong>Tesla, Waymo autonomous vehicles.</strong></td>
    </tr>
    <tr>
      <td><strong>Retail Surveillance</strong></td>
      <td><strong>Detects shoplifting or tracks customer behavior</strong></td>
      <td><strong>Smart retail stores, loss prevention.</strong></td>
    </tr>
    <tr>
      <td><strong>Augmented Reality</strong></td>
      <td><strong>Overlays digital content on real-world visuals</strong></td>
      <td><strong>Snapchat filters, AR gaming (Pokémon GO).</strong></td>
    </tr>
    <tr>
      <td><strong>Quality Inspection</strong></td>
      <td><strong>Detects defects in manufacturing</strong></td>
      <td><strong>Inspecting circuit boards or products.</strong></td>
    </tr>
  </tbody>
</table>

<h3>Emerging Applications:</h3>
<ul>
  <li><strong>Agriculture: Monitoring crop health using drone imagery.</strong></li>
  <li><strong>Environmental Monitoring: Analyzing satellite images for deforestation or climate change.</strong></li>
  <li><strong>Art Generation: Creating or restoring artwork using GANs.</strong></li>
</ul>

</div>`
  }
};
