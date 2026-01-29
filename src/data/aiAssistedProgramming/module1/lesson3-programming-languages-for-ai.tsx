import type { Lesson } from '@/types/course';

export const lesson3ProgrammingLanguagesForAI: Lesson = {
  id: 3,
  title: 'Programming Languages for AI',
  duration: '20 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=isId8sJGyUI',
    textContent: `<div class="lesson-content">

<h1>Programming Languages for AI</h1>

<p><strong>AI development leverages a variety of programming languages, each suited to specific needs:</strong></p>

<ul>
  <li><strong>Python: The leading language for AI due to its simplicity, readability, and extensive ecosystem. Key libraries include:</strong>
    <ul>
      <li><strong>NumPy and Pandas for numerical and data manipulation.</strong></li>
      <li><strong>Scikit-learn for traditional machine learning.</strong></li>
      <li><strong>TensorFlow and PyTorch for deep learning.</strong></li>
      <li><strong>NLTK and spaCy for natural language processing.</strong></li>
      <li><strong>Python's versatility supports rapid prototyping, research, and production-grade systems.</strong></li>
    </ul>
  </li>
  <li><strong>R: Specialized for statistical analysis and visualization, widely used in academia and data science. Libraries like ggplot2 (visualization), caret (machine learning), and tidyverse (data manipulation) make R ideal for statistical modeling.</strong></li>
  <li><strong>Java: Suited for large-scale, enterprise-level AI applications due to its portability, scalability, and robust frameworks like Weka (machine learning) and Deeplearning4j (deep learning).</strong></li>
  <li><strong>C++: Used in performance-critical applications like real-time AI systems (e.g., robotics, gaming). Libraries like OpenCV (computer vision) and Dlib (machine learning) leverage C++'s speed.</strong></li>
  <li><strong>Julia: Gaining traction for high-performance numerical computing, with libraries like Flux.jl for machine learning. Julia offers speed comparable to C++ with Python-like syntax.</strong></li>
  <li><strong>Lisp: Historically significant for AI, particularly in symbolic reasoning and early expert systems. Modern use is limited but persists in niche areas.</strong></li>
  <li><strong>Go: Emerging for scalable AI microservices and deployment, with libraries like Gorgonia for machine learning.</strong></li>
  <li><strong>MATLAB: Used in engineering and research for signal processing and prototyping AI algorithms.</strong></li>
</ul>

<h2>Choosing a Language:</h2>
<ul>
  <li><strong>Prototyping and Research: Python or R for rapid development and rich libraries.</strong></li>
  <li><strong>Performance-Critical Systems: C++ or Julia for low-latency applications.</strong></li>
  <li><strong>Enterprise Applications: Java for scalability and integration with existing systems.</strong></li>
  <li><strong>Statistical Analysis: R or MATLAB for data-heavy research.</strong></li>
</ul>

</div>`
  }
};
