import type { Lesson } from '@/types/course';

export const lesson4FieldsOfAIProgramming: Lesson = {
  id: 4,
  title: 'Fields of AI Programming',
  duration: '30 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=gT1SiZttBDE',
    textContent: `<div class="lesson-content">

<h1>Fields of AI Programming</h1>

<p><strong>AI programming encompasses specialized subfields, each addressing unique challenges:</strong></p>

<ul>
  <li><strong>Machine Learning (ML):</strong>
    <ul>
      <li><strong>Enables systems to learn from data without explicit programming.</strong></li>
      <li><strong>Types: Supervised learning (e.g., predicting house prices), unsupervised learning (e.g., customer segmentation), and semi-supervised learning.</strong></li>
      <li><strong>Algorithms: Linear regression, logistic regression, support vector machines, random forests, gradient boosting (e.g., XGBoost).</strong></li>
    </ul>
  </li>
  <li><strong>Deep Learning (DL):</strong>
    <ul>
      <li><strong>A subset of ML using neural networks with multiple layers to model complex patterns.</strong></li>
      <li><strong>Applications: Image recognition (e.g., identifying objects in photos), speech synthesis (e.g., text-to-speech), and generative models (e.g., GANs for creating art).</strong></li>
      <li><strong>Architectures: Convolutional neural networks (CNNs), recurrent neural networks (RNNs), transformers.</strong></li>
    </ul>
  </li>
  <li><strong>Natural Language Processing (NLP):</strong>
    <ul>
      <li><strong>Enables machines to understand, generate, and interact with human language.</strong></li>
      <li><strong>Applications: Chatbots, sentiment analysis, machine translation (e.g., Google Translate), text summarization, and named entity recognition.</strong></li>
      <li><strong>Key models: BERT, GPT, and other transformer-based architectures.</strong></li>
    </ul>
  </li>
  <li><strong>Computer Vision:</strong>
    <ul>
      <li><strong>Allows machines to interpret visual data (images, videos).</strong></li>
      <li><strong>Applications: Facial recognition, object detection, medical imaging analysis (e.g., detecting tumors), and autonomous driving (e.g., lane detection).</strong></li>
      <li><strong>Techniques: Image classification, object segmentation, and optical character recognition (OCR).</strong></li>
    </ul>
  </li>
  <li><strong>Reinforcement Learning (RL):</strong>
    <ul>
      <li><strong>Agents learn optimal actions through trial and error, guided by rewards.</strong></li>
      <li><strong>Applications: Game-playing AI (e.g., AlphaGo, AlphaStar), robotics (e.g., robotic arm manipulation), and resource optimization (e.g., energy management).</strong></li>
      <li><strong>Algorithms: Q-learning, deep Q-networks (DQNs), and policy gradients.</strong></li>
    </ul>
  </li>
  <li><strong>Expert Systems:</strong>
    <ul>
      <li><strong>Rule-based systems that emulate human expertise in specific domains.</strong></li>
      <li><strong>Applications: Medical diagnosis (e.g., MYCIN), financial advising, and fault diagnosis in engineering.</strong></li>
    </ul>
  </li>
  <li><strong>Robotics:</strong>
    <ul>
      <li><strong>Combines AI with hardware to create autonomous or semi-autonomous systems.</strong></li>
      <li><strong>Applications: Warehouse automation, surgical robots, and drones.</strong></li>
    </ul>
  </li>
  <li><strong>Generative AI:</strong>
    <ul>
      <li><strong>Creates new content, such as text, images, music, or videos.</strong></li>
      <li><strong>Applications: AI-generated art (e.g., DALL-E), text generation (e.g., ChatGPT), and synthetic data creation for training.</strong></li>
    </ul>
  </li>
  <li><strong>Knowledge Representation and Reasoning (KRR):</strong>
    <ul>
      <li><strong>Models knowledge in a structured format to enable reasoning.</strong></li>
      <li><strong>Applications: Semantic web, question-answering systems, and ontology-based systems.</strong></li>
    </ul>
  </li>
</ul>

</div>`
  }
};
