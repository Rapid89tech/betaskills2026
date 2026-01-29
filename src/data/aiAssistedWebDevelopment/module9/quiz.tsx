import type { Quiz } from '@/types/course';

export const module9Quiz: Quiz = {
  id: 9,
  title: 'Module 9 Quiz: The Future of AI in Web Development',
  description: 'This quiz tests your understanding of the Future of AI in Web Development module, covering emerging AI technologies and trends, ethical considerations and responsible AI use, and career opportunities in AI-assisted development. Each question includes four multiple-choice options and the correct answer with an explanation.',
  questions: [
    {
      id: 1,
      question: 'What is the primary purpose of Generative AI in the context of emerging technologies?',
      options: [
        'To replace human developers entirely',
        'To enable the creation of text, images, code, and multimedia content from simple prompts',
        'To automate only repetitive tasks',
        'To reduce computational costs'
      ],
      correctAnswer: 1,
      explanation: 'Generative AI, including large language models like ChatGPT, LLaMA, and Grok, along with image generation models like DALL·E and Stable Diffusion, enables the creation of text, images, code, and multimedia content from simple prompts. It does not replace human developers entirely, automate only repetitive tasks, or reduce computational costs.'
    },
    {
      id: 2,
      question: 'Which technology enables AI models to run on edge devices for real-time processing?',
      options: [
        'Cloud AI',
        'Edge AI',
        'Quantum AI',
        'Federated AI'
      ],
      correctAnswer: 1,
      explanation: 'Edge AI enables AI models to run on edge devices (e.g., IoT devices, smartphones) for real-time processing with low latency, which is critical for applications like autonomous vehicles and smart homes. Cloud AI, Quantum AI, and Federated AI are different technologies.'
    },
    {
      id: 3,
      question: 'What is the main benefit of Explainable AI (XAI)?',
      options: [
        'It reduces computational costs',
        'It makes AI decision-making transparent, allowing users to understand and trust model outputs',
        'It eliminates the need for human oversight',
        'It increases processing speed'
      ],
      correctAnswer: 1,
      explanation: 'Explainable AI (XAI) makes AI decision-making transparent, allowing users to understand and trust model outputs, which is particularly important in regulated industries like finance and law. It does not reduce computational costs, eliminate human oversight, or increase processing speed.'
    },
    {
      id: 4,
      question: 'Which trend involves AI tailoring user experiences in real-time?',
      options: [
        'Sustainable AI',
        'Personalization at Scale',
        'Multimodal AI',
        'Federated Learning'
      ],
      correctAnswer: 1,
      explanation: 'Personalization at Scale involves AI tailoring user experiences in real-time, from e-commerce recommendations to personalized learning paths in education. Sustainable AI focuses on reducing environmental impact, Multimodal AI processes multiple data types, and Federated Learning involves decentralized training.'
    },
    {
      id: 5,
      question: 'What is a key challenge in emerging AI technologies?',
      options: [
        'AI models are too simple',
        'High computational costs for training large models require significant resources',
        'AI tools are too expensive for individuals',
        'AI cannot integrate with existing systems'
      ],
      correctAnswer: 1,
      explanation: 'A key challenge in emerging AI technologies is scalability - high computational costs for training large models require significant resources. AI models are not too simple, tools are accessible to individuals, and AI can integrate with existing systems.'
    },
    {
      id: 6,
      question: 'What is the primary focus of ethical AI frameworks like IEEE Ethically Aligned Design?',
      options: [
        'Maximizing AI performance',
        'Prioritizing human well-being in AI systems',
        'Reducing AI development costs',
        'Accelerating AI deployment'
      ],
      correctAnswer: 1,
      explanation: 'IEEE Ethically Aligned Design provides guidelines for prioritizing human well-being in AI systems. It focuses on ethical considerations rather than maximizing performance, reducing costs, or accelerating deployment.'
    },
    {
      id: 7,
      question: 'Which technique helps protect user data during AI processing?',
      options: [
        'Centralized data storage',
        'Federated learning, differential privacy, and homomorphic encryption',
        'Open data sharing',
        'Manual data processing'
      ],
      correctAnswer: 1,
      explanation: 'Techniques like federated learning, differential privacy, and homomorphic encryption protect user data during AI processing. Centralized storage, open data sharing, and manual processing do not provide the same level of privacy protection.'
    },
    {
      id: 8,
      question: 'What is the role of an AI Integration Specialist?',
      options: [
        'To replace all existing software systems',
        'To integrate AI tools into existing software pipelines, ensuring compatibility and performance',
        'To develop only new AI models',
        'To manage only cloud infrastructure'
      ],
      correctAnswer: 1,
      explanation: 'An AI Integration Specialist integrates AI tools (e.g., GitHub Copilot, Dialogflow) into existing software pipelines, ensuring compatibility and performance. They do not replace all existing systems, develop only new models, or manage only cloud infrastructure.'
    },
    {
      id: 9,
      question: 'Which skill is most important for AI-assisted development professionals?',
      options: [
        'Only technical coding skills',
        'A combination of technical skills, AI-specific knowledge, soft skills, and ethical awareness',
        'Only business management skills',
        'Only research skills'
      ],
      correctAnswer: 1,
      explanation: 'AI-assisted development professionals need a combination of technical skills (Python, TensorFlow, etc.), AI-specific knowledge (machine learning, NLP), soft skills (communication, collaboration), and ethical awareness (bias mitigation, privacy laws).'
    },
    {
      id: 10,
      question: 'What is a recommended approach for staying current in AI-assisted development?',
      options: [
        'Learning only one programming language',
        'Continuous learning through certifications, research papers, and staying updated with new tools and techniques',
        'Focusing only on theoretical knowledge',
        'Avoiding new technologies'
      ],
      correctAnswer: 1,
      explanation: 'Continuous learning is essential in AI-assisted development, including staying updated with certifications (e.g., Google\'s Professional Machine Learning Engineer), research papers, and new tools and techniques. Learning only one language, focusing only on theory, or avoiding new technologies would limit career growth.'
    }
  ]
};
