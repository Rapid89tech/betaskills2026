import type { Lesson } from '@/types/course';

export const lesson12TestYourAPI: Lesson = {
  id: 12,
  title: 'Test Your API',
  duration: '20 minutes',
  type: 'video',
  content: {
    videoUrl: '',
    textContent: `<div class="lesson-content">

<h1>Test Your API</h1>

<h2>Using Postman or curl:</h2>

<h3>Example:</h3>
<pre><code>curl -X POST http://localhost:5000/predict \\
-H "Content-Type: application/json" \\
-d '{"tenure":12, "MonthlyCharges":45.5, "Contract_Two year":0, "PaymentMethod_Electronic check":1}'</code></pre>

</div>`
  }
};
