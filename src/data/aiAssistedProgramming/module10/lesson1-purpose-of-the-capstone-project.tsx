import type { Lesson } from '@/types/course';

export const lesson1PurposeOfTheCapstoneProject: Lesson = {
  id: 1,
  title: 'Purpose of the Capstone Project',
  duration: '20 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=9NEAVBOBV18',
    textContent: `<div class="lesson-content">

<h1>Purpose of the Capstone Project</h1>

<p><strong>The Capstone Project is not just another assignment — it's your opportunity to demonstrate that you can apply AI and programming knowledge to a real-world problem from start to finish.</strong></p>

<p><strong>This project allows you to:</strong></p>

<ul>
  <li><strong>Integrate all learned concepts from the course (data preprocessing, visualization, model building, tuning, deployment).</strong></li>
  <li><strong>Simulate an industry workflow — from raw data to production-level API.</strong></li>
  <li><strong>Work with real-world challenges like messy data, imbalanced classes, and performance trade-offs.</strong></li>
  <li><strong>Build a portfolio piece you can present to employers or clients as evidence of your AI development skills.</strong></li>
</ul>

<p><strong>Think of it as the bridge between theory and practice — the place where your learning becomes tangible.</strong></p>

</div>`
  }
};
