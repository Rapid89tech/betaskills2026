import type { Lesson } from '@/types/course';

export const lesson7EthicalConsiderationsInAI: Lesson = {
  id: 7,
  title: 'Ethical Considerations in AI',
  duration: '30 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=aGwYtUzMQUk',
    textContent: `<div class="lesson-content">

<h1>Ethical Considerations in AI</h1>

<p><strong>AI development raises complex ethical challenges that require careful consideration to ensure responsible and equitable use:</strong></p>

<ul>
  <li><strong>Bias in Data and Algorithms:</strong>
    <ul>
      <li><strong>AI models can inherit biases from training data (e.g., gender or racial biases in hiring algorithms).</strong></li>
      <li><strong>Mitigation: Use diverse datasets, apply fairness-aware algorithms, and conduct bias audits.</strong></li>
    </ul>
  </li>
  <li><strong>Privacy and Surveillance:</strong>
    <ul>
      <li><strong>AI systems processing personal data (e.g., location tracking, health records) risk violating user privacy.</strong></li>
      <li><strong>Mitigation: Implement privacy-preserving techniques like differential privacy, federated learning, or encryption.</strong></li>
      <li><strong>Compliance with regulations like GDPR (Europe) or CCPA (California).</strong></li>
    </ul>
  </li>
  <li><strong>Job Displacement:</strong>
    <ul>
      <li><strong>Automation may disrupt industries like manufacturing, retail, or transportation, leading to job losses.</strong></li>
      <li><strong>Mitigation: Invest in workforce retraining, upskilling programs, and policies for economic transition.</strong></li>
    </ul>
  </li>
  <li><strong>Transparency and Explainability:</strong>
    <ul>
      <li><strong>Complex models like deep neural networks can be opaque, making it hard to understand their decisions.</strong></li>
      <li><strong>Mitigation: Use explainable AI techniques (e.g., SHAP, LIME) and provide clear documentation for stakeholders.</strong></li>
    </ul>
  </li>
  <li><strong>AI Safety:</strong>
    <ul>
      <li><strong>Ensuring AI systems operate reliably in critical applications (e.g., autonomous vehicles, medical diagnostics).</strong></li>
      <li><strong>Mitigation: Rigorous testing, fail-safe mechanisms, and alignment with human values.</strong></li>
    </ul>
  </li>
  <li><strong>Accountability:</strong>
    <ul>
      <li><strong>Determining responsibility for AI errors or harm (e.g., who is liable if an autonomous car causes an accident?).</strong></li>
      <li><strong>Mitigation: Establish clear governance frameworks and legal standards.</strong></li>
    </ul>
  </li>
  <li><strong>Environmental Impact:</strong>
    <ul>
      <li><strong>Training large AI models (e.g., GPT-3, BERT) consumes significant energy, contributing to carbon emissions.</strong></li>
      <li><strong>Mitigation: Optimize models for efficiency, use renewable energy for training, and explore sustainable AI practices.</strong></li>
    </ul>
  </li>
  <li><strong>Misuse of AI:</strong>
    <ul>
      <li><strong>Risks include deepfakes, autonomous weapons, or AI-driven misinformation campaigns.</strong></li>
      <li><strong>Mitigation: Develop ethical guidelines, enforce regulations, and promote responsible AI development.</strong></li>
    </ul>
  </li>
  <li><strong>Equity and Access:</strong>
    <ul>
      <li><strong>AI benefits may be unevenly distributed, favoring wealthy organizations or regions.</strong></li>
      <li><strong>Mitigation: Promote open-source AI, support global access to AI tools, and address digital divides.</strong></li>
    </ul>
  </li>
</ul>

<h2>Ethical Best Practices:</h2>
<ul>
  <li><strong>Engage diverse stakeholders (e.g., communities, policymakers) in AI development.</strong></li>
  <li><strong>Conduct regular ethical audits and impact assessments.</strong></li>
  <li><strong>Prioritize fairness, inclusivity, and transparency in AI design.</strong></li>
  <li><strong>Foster interdisciplinary collaboration between technologists, ethicists, and social scientists.</strong></li>
  <li><strong>Educate users and developers about AI's societal implications.</strong></li>
</ul>

</div>`
  }
};
