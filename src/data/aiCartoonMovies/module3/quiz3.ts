import { Quiz } from '../../../types/course';

export const quiz3: Quiz = {
  id: 'ai-cartoon-movies-module3-quiz',
  title: 'Module 3 Quiz: Character & World Design',
  description: 'Test your understanding of AI-generated character concepts, world building, and maintaining design consistency',
  questions: [
    {
      id: 'q1',
      question: 'Which AI tool is primarily accessed through Discord and excels at generating high-resolution character designs?',
      options: [
        'Photoshop',
        'MidJourney',
        'Final Cut Pro',
        'Blender'
      ],
      correctAnswer: 1,
      explanation: 'MidJourney is a web-based AI tool primarily accessed through Discord integration that generates high-resolution character designs from text prompts.'
    },
    {
      id: 'q2',
      question: 'What is the main advantage of using image-to-image generation for character design?',
      options: [
        'It makes the process slower',
        'It allows you to enhance hand-drawn sketches with AI-generated details',
        'It removes all human creativity',
        'It only works with photographs'
      ],
      correctAnswer: 1,
      explanation: 'Image-to-image generation allows you to start with a hand-drawn sketch and use AI to enhance it with details, textures, or specific styles, creating a hybrid workflow.'
    },
    {
      id: 'q3',
      question: 'When crafting prompts for AI character generation, what should you include for best results?',
      options: [
        'Only the character name',
        'Just one word',
        'Specific details about style, personality, clothing, pose, and background',
        'Random unrelated words'
      ],
      correctAnswer: 2,
      explanation: 'Detailed prompts that include style, personality, clothing, pose, and background information guide AI tools toward more accurate and relevant character designs.'
    },
    {
      id: 'q4',
      question: 'What is Artbreeder primarily used for in character design?',
      options: [
        'Writing scripts',
        'Creating and modifying character designs by blending images using GANs',
        'Recording voice acting',
        'Editing video footage'
      ],
      correctAnswer: 1,
      explanation: 'Artbreeder uses generative adversarial networks (GANs) to create and modify character designs, allowing users to blend multiple images and customize features via sliders.'
    },
    {
      id: 'q5',
      question: 'What is the main benefit of blending AI-generated designs with human touch-up in Photoshop/Illustrator?',
      options: [
        'It makes the process more expensive',
        'It combines AI speed with human precision and artistry',
        'It removes all AI elements',
        'It only works for backgrounds'
      ],
      correctAnswer: 1,
      explanation: 'Blending AI with human touch-up combines the speed and versatility of AI generation with the precision and artistry of manual editing, creating unique, polished results.'
    },
    {
      id: 'q6',
      question: 'When creating environments for animation, what is the advantage of generating separate layers?',
      options: [
        'It makes files larger',
        'It allows for parallax scrolling effects and easier animation integration',
        'It reduces image quality',
        'It limits creativity'
      ],
      correctAnswer: 1,
      explanation: 'Generating separate layers for foreground, midground, and background allows for parallax scrolling effects and makes it easier to integrate environments into animation workflows.'
    },
    {
      id: 'q7',
      question: 'What is one of the biggest challenges when using AI for character and world design?',
      options: [
        'AI is too slow',
        'Maintaining visual consistency across multiple generations',
        'AI cannot generate any images',
        'It only works in black and white'
      ],
      correctAnswer: 1,
      explanation: 'Maintaining visual consistency is challenging because AI tools create unique outputs each time, even with identical prompts, which can lead to variations in character appearance and style.'
    },
    {
      id: 'q8',
      question: 'What should a comprehensive style guide include?',
      options: [
        'Only character names',
        'Color palette, art style keywords, character sheets, and lighting guidelines',
        'Just one reference image',
        'Random notes'
      ],
      correctAnswer: 1,
      explanation: 'A comprehensive style guide should include color palettes with hex codes, art style keywords, detailed character sheets, environment templates, and lighting guidelines to maintain consistency.'
    },
    {
      id: 'q9',
      question: 'In MidJourney, what feature helps maintain character consistency across generations?',
      options: [
        'The delete button',
        'Using the same seed number and --cref (character reference) parameter',
        'Changing prompts randomly',
        'Using different styles each time'
      ],
      correctAnswer: 1,
      explanation: 'MidJourney offers features like using the same seed number and the --cref (character reference) parameter to help maintain character consistency across multiple generations.'
    },
    {
      id: 'q10',
      question: 'What is the purpose of creating character turnaround sheets?',
      options: [
        'To make the project more expensive',
        'To show characters from multiple angles and ensure consistency',
        'To delete characters',
        'To write dialogue'
      ],
      correctAnswer: 1,
      explanation: 'Character turnaround sheets show characters from multiple angles (front, side, back, 3/4 views) along with expressions and poses, ensuring visual consistency throughout the animation.'
    }
  ]
};
