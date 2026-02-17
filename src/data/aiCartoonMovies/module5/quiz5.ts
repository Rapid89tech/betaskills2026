import { Quiz } from '../../../types/course';

export const quiz5: Quiz = {
  id: 5,
  title: 'Module 5 Quiz: Post-Production',
  questions: [
    {
      question: 'What is the primary difference between traditional editing software and AI-powered tools like Runway and Pika Labs?',
      options: [
        'Traditional tools are faster',
        'AI tools automate and simplify editing tasks',
        'AI tools require more technical expertise',
        'Traditional tools rely on cloud computing'
      ],
      correct: 1,
      explanation: 'AI tools automate and simplify editing tasks, making professional-grade video editing accessible without extensive manual adjustments and technical expertise.'
    },
    {
      question: 'Which Runway model is widely recognized for advanced text-to-video generation and professional editing?',
      options: [
        'Gen-1 Beta',
        'Pika 1.0',
        'Gen-3 Alpha',
        'Motion Brush AI'
      ],
      correct: 2,
      explanation: 'Runway\'s Gen-3 Alpha model is known for advanced text-to-video generation, professional editing capabilities, and high visual fidelity.'
    },
    {
      question: 'Pika Labs primarily operates through which platform?',
      options: [
        'Standalone desktop software',
        'Mobile application',
        'Web browser only',
        'Discord-based interface'
      ],
      correct: 3,
      explanation: 'Pika Labs operates primarily through a Discord-based interface, making it accessible and community-driven for fast generation and collaborative feedback.'
    },
    {
      question: 'Which feature in Runway allows users to animate specific parts of an image?',
      options: [
        'Auto-Reframe',
        'Motion Brush',
        'Camera Control',
        'Scene Detection'
      ],
      correct: 1,
      explanation: 'Motion Brush allows users to animate specific parts of an image, such as water or hair, by painting over areas for precise control over motion.'
    },
    {
      question: 'What does color correction involve in video post-production?',
      options: [
        'Adding special effects',
        'Adjusting color balance, brightness, contrast, and saturation',
        'Creating scene transitions',
        'Generating subtitles'
      ],
      correct: 1,
      explanation: 'Color correction involves adjusting a video\'s color balance, brightness, contrast, and saturation to achieve a consistent and visually appealing look.'
    },
    {
      question: 'Which AI tool is known for its Neural Engine that provides advanced color correction?',
      options: [
        'Pika Labs',
        'Runway',
        'DaVinci Resolve',
        'Pollo AI'
      ],
      correct: 2,
      explanation: 'DaVinci Resolve\'s Neural Engine leverages AI for advanced color correction, scene detection, and automated transitions, widely used in professional production.'
    },
    {
      question: 'What is the main purpose of AI denoising in rendering?',
      options: [
        'To add noise to images',
        'To remove noise from rendered images and accelerate workflows',
        'To increase file size',
        'To change color schemes'
      ],
      correct: 1,
      explanation: 'AI denoising removes noise from rendered images, significantly reducing render times while maintaining visual fidelity.'
    },
    {
      question: 'Which tool specializes in real-time collaborative 3D design and rendering?',
      options: [
        'Pollo AI',
        'NVIDIA Omniverse',
        'Pika Labs',
        'Adobe Premiere Pro'
      ],
      correct: 1,
      explanation: 'NVIDIA Omniverse is a real-time collaborative 3D design and rendering platform with AI-driven path tracing for photorealistic visuals.'
    },
    {
      question: 'What does NVIDIA DLSS stand for and what does it do?',
      options: [
        'Deep Learning Super Sampling - increases resolution and frame rates',
        'Digital Light Scene System - adjusts lighting',
        'Dynamic Layer Style Synthesis - creates effects',
        'Direct Line Sound System - enhances audio'
      ],
      correct: 0,
      explanation: 'NVIDIA DLSS (Deep Learning Super Sampling) uses AI to increase resolution and frame rates in real-time rendering, improving performance and visual quality.'
    },
    {
      question: 'What is one major ethical consideration when using AI-powered post-production tools?',
      options: [
        'They are too expensive',
        'Job displacement for traditional editors and artists',
        'They require too much storage',
        'They only work on specific platforms'
      ],
      correct: 1,
      explanation: 'Job displacement for traditional editors, colorists, and VFX artists is a major ethical consideration as AI automation reduces demand for manual labor in post-production.'
    }
  ]
};
