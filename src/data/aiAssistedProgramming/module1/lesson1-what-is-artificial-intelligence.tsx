import type { Lesson } from '@/types/course';

export const lesson1WhatIsArtificialIntelligence: Lesson = {
  id: 1,
  title: 'What is Artificial Intelligence (AI)?',
  duration: '20 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=oV74Najm6Nc',
    textContent: `<div class="lesson-content">

<h1>What is Artificial Intelligence (AI)?</h1>

<p><strong>Artificial Intelligence (AI) is the field of computer science focused on creating systems that simulate human intelligence, enabling machines to perform tasks such as reasoning, problem-solving, learning, perception, and decision-making. AI systems process vast datasets, identify patterns, and act autonomously or semi-autonomously to achieve specific goals. Applications span everyday tools like virtual assistants and recommendation systems to advanced domains like autonomous vehicles, medical diagnostics, and creative arts.</strong></p>

<h2>Categories of AI:</h2>
<ul>
  <li><strong>Narrow AI (Weak AI): Designed for specific tasks with constrained capabilities. Examples include:</strong>
    <ul>
      <li><strong>Virtual assistants (e.g., Siri, Google Assistant, Alexa) for voice commands and task automation.</strong></li>
      <li><strong>Recommendation systems (e.g., Netflix, Spotify, Amazon) for personalized content or product suggestions.</strong></li>
      <li><strong>Fraud detection systems in banking to identify suspicious transactions.</strong></li>
      <li><strong>Narrow AI excels in defined domains but lacks general-purpose intelligence.</strong></li>
    </ul>
  </li>
  <li><strong>General AI (Strong AI): A theoretical AI capable of performing any intellectual task a human can, such as reasoning across domains, adapting to new environments, and demonstrating creativity. General AI would require abilities like abstract thinking, emotional understanding, and self-awareness. It remains a long-term research goal, with no fully realized implementations today.</strong></li>
  <li><strong>Super AI: A hypothetical future AI surpassing human intelligence in all domains, including cognitive, creative, and emotional capacities. Super AI could autonomously innovate, solve complex global problems, or pose existential risks if not properly controlled. Its development raises profound ethical and safety concerns.</strong></li>
</ul>

<h2>Key Characteristics of AI:</h2>
<ul>
  <li><strong>Learning: AI systems improve performance by learning from data, such as machine learning models trained on historical sales data to predict future trends.</strong></li>
  <li><strong>Reasoning: AI applies logic to draw conclusions, like diagnosing diseases based on medical imaging or symptom analysis.</strong></li>
  <li><strong>Adaptability: AI adjusts to new inputs or contexts, such as chatbots refining responses based on user feedback or self-driving cars navigating dynamic road conditions.</strong></li>
  <li><strong>Autonomy: AI operates with minimal human intervention, as seen in robotic vacuum cleaners or industrial automation systems.</strong></li>
  <li><strong>Perception: AI interprets sensory data, such as recognizing objects in images (computer vision) or understanding spoken language (speech recognition).</strong></li>
  <li><strong>Interaction: AI engages with humans or environments, like conversational agents or collaborative robots (cobots) in manufacturing.</strong></li>
</ul>

<h2>Applications of AI:</h2>
<ul>
  <li><strong>Healthcare: Diagnosing diseases, personalizing treatment plans, and analyzing medical images (e.g., detecting tumors in X-rays).</strong></li>
  <li><strong>Finance: Fraud detection, algorithmic trading, and credit risk assessment.</strong></li>
  <li><strong>Transportation: Autonomous vehicles, traffic optimization, and route planning.</strong></li>
  <li><strong>Entertainment: Content generation (e.g., AI-composed music, deepfake videos), gaming AI, and personalized streaming.</strong></li>
  <li><strong>Education: Adaptive learning platforms, automated grading, and virtual tutors.</strong></li>
  <li><strong>Security: Facial recognition, cybersecurity threat detection, and predictive policing.</strong></li>
</ul>

</div>`
  }
};
