import type { Lesson } from '@/types/course';

export const lesson6ToolsAndFrameworks: Lesson = {
  id: 6,
  title: 'Tools and Frameworks',
  duration: '25 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=LUttsadgSEY',
    textContent: `<div class="lesson-content">

<h1>Tools and Frameworks</h1>

<p><strong>AI development is supported by a robust ecosystem of tools, frameworks, and platforms:</strong></p>

<ul>
  <li><strong>TensorFlow: Google's open-source framework for machine learning and deep learning. Supports distributed training, deployment on mobile/edge devices, and production-grade systems.</strong></li>
  <li><strong>PyTorch: Facebook's deep learning framework, favored for its dynamic computation graphs and ease of use in research. Widely used for prototyping and experimentation.</strong></li>
  <li><strong>Keras: A high-level API (integrated with TensorFlow) for building neural networks with minimal code. Ideal for beginners and rapid prototyping.</strong></li>
  <li><strong>Scikit-learn: Python library for traditional machine learning, offering algorithms for classification, regression, clustering, and dimensionality reduction.</strong></li>
  <li><strong>Hugging Face: A platform for NLP, providing pre-trained transformer models (e.g., BERT, GPT), datasets, and tools for fine-tuning and deployment.</strong></li>
  <li><strong>OpenCV: A library for computer vision tasks, including image processing, object detection, and facial recognition.</strong></li>
  <li><strong>Jupyter Notebook: An interactive IDE for data science, supporting code, visualizations, and markdown. Widely used for experimentation and teaching.</strong></li>
  <li><strong>Apache Spark: For big data processing and distributed machine learning, with libraries like MLlib.</strong></li>
  <li><strong>MLflow: For managing the machine learning lifecycle, including experiment tracking, model versioning, and deployment.</strong></li>
  <li><strong>ONNX: An open format for model interoperability, enabling models trained in one framework (e.g., PyTorch) to be deployed in another (e.g., TensorFlow).</strong></li>
  <li><strong>FastAI: A high-level library built on PyTorch, simplifying deep learning for non-experts.</strong></li>
  <li><strong>Streamlit: For building interactive web apps to showcase AI models and data visualizations.</strong></li>
  <li><strong>Cloud Platforms: AWS SageMaker, Google Cloud AI Platform, and Azure Machine Learning for scalable training and deployment.</strong></li>
</ul>

</div>`
  }
};
