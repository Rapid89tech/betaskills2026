import type { Lesson } from '@/types/course';

export const lesson3StepByStepDevelopmentPlan: Lesson = {
  id: 3,
  title: 'Step-by-Step Development Plan',
  duration: '30 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=jcgaNrC4ElU&t=3s',
    textContent: `<div class="lesson-content">

<h1>Step-by-Step Development Plan</h1>

<p><strong>The capstone project follows a systematic approach to building a complete AI application:</strong></p>

<ol>
  <li><strong>Data Collection</strong> - Gather and understand the dataset</li>
  <li><strong>Data Preprocessing</strong> - Clean and prepare the data</li>
  <li><strong>Exploratory Data Analysis (EDA)</strong> - Understand patterns and relationships</li>
  <li><strong>Model Building</strong> - Develop and train machine learning models</li>
  <li><strong>Model Evaluation</strong> - Assess model performance</li>
  <li><strong>Hyperparameter Tuning</strong> - Optimize model parameters</li>
  <li><strong>Save the Model</strong> - Persist the trained model</li>
  <li><strong>Deploy the Model with Flask</strong> - Create a web API</li>
  <li><strong>Test Your API</strong> - Validate the deployment</li>
  <li><strong>Documentation and Presentation</strong> - Document and present results</li>
</ol>

<p><strong>This structured approach ensures a comprehensive understanding of the entire AI development lifecycle.</strong></p>

</div>`
  }
};
