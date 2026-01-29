import type { Lesson } from '@/types/course';

export const lesson14AdditionalIndustryInsights: Lesson = {
  id: 14,
  title: 'Additional Industry Insights',
  duration: '20 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=9xdYTmOP4z8',
    textContent: `<div class="lesson-content">

<h1>Additional Industry Insights</h1>

<ul>
  <li><strong>Ethical considerations:</strong> Avoid bias in model predictions (e.g., don't let location-based bias unfairly influence churn predictions).</li>
  <li><strong>Model monitoring:</strong> After deployment, track prediction accuracy and retrain as data changes.</li>
  <li><strong>Explainability:</strong> Use tools like SHAP or LIME to explain predictions to non-technical stakeholders.</li>
</ul>

</div>`
  }
};
