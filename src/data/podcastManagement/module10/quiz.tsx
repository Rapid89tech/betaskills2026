import type { QuizLesson } from '@/types/course';

export const module10Quiz: QuizLesson = {
  id: 10,
  title: 'Module 10 Quiz: Launching and Managing Client Shows',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'Why is it important to set clear expectations with podcast clients?',
        options: [
          'To avoid having to sign contracts',
          'To limit how often you communicate',
          'To build trust, manage timelines, and prevent scope creep',
          'To avoid having to use management tools'
        ],
        correct: 2,
        explanation: 'Setting clear expectations helps build trust, manage timelines effectively, and prevent scope creep that can derail projects.'
      },
      {
        question: 'What is the purpose of a discovery call during client onboarding?',
        options: [
          'To pitch upsells only',
          'To download audio files',
          'To understand the client\'s goals, audience, and service needs',
          'To finalize episode titles'
        ],
        correct: 2,
        explanation: 'Discovery calls are essential for understanding the client\'s goals, target audience, and specific service requirements.'
      },
      {
        question: 'Which of the following should NOT be skipped when starting work with a client?',
        options: [
          'Designing the show logo',
          'Having a signed contract',
          'Publishing the first episode immediately',
          'Asking the client to provide guest bios'
        ],
        correct: 1,
        explanation: 'A signed contract is essential to protect both parties and establish clear terms of the working relationship.'
      },
      {
        question: 'What does the Scope of Work section in a podcast contract typically include?',
        options: [
          'Estimated show downloads',
          'Personal podcast preferences',
          'Services offered, revision limits, and exclusions',
          'Social media platform handles'
        ],
        correct: 2,
        explanation: 'The Scope of Work defines what services will be provided, limits on revisions, and what is not included in the agreement.'
      },
      {
        question: 'What clause defines how either party can cancel the podcast service agreement?',
        options: [
          'Payment clause',
          'Ownership clause',
          'Termination clause',
          'Communication clause'
        ],
        correct: 2,
        explanation: 'The termination clause outlines the conditions and procedures for ending the contract agreement.'
      },
      {
        question: 'Which of the following tools is best used for legally binding e-signatures on contracts?',
        options: [
          'Trello',
          'Dubsado',
          'Loom',
          'HelloSign'
        ],
        correct: 3,
        explanation: 'HelloSign is specifically designed for legally binding electronic signatures on contracts and legal documents.'
      },
      {
        question: 'Why should podcast managers avoid working without a contract?',
        options: [
          'It slows down the editing process',
          'It causes file format confusion',
          'It leaves both parties legally unprotected and can lead to disputes',
          'It limits branding creativity'
        ],
        correct: 2,
        explanation: 'Working without a contract leaves both parties vulnerable to misunderstandings and legal disputes.'
      },
      {
        question: 'What is one effective way to manage client expectations?',
        options: [
          'Promise the fastest turnaround without checking your calendar',
          'Allow unlimited revisions',
          'Communicate regularly with status updates and set boundaries',
          'Avoid talking about deadlines'
        ],
        correct: 2,
        explanation: 'Regular communication with status updates and clear boundaries helps manage client expectations effectively.'
      },
      {
        question: 'What should be included in the client intake form?',
        options: [
          'Guest interview questions',
          'Client\'s favorite podcast episodes',
          'Branding assets, style guide, and login info (securely)',
          'Audience survey results'
        ],
        correct: 2,
        explanation: 'Client intake forms should collect branding assets, style guides, and secure login information to streamline production.'
      },
      {
        question: 'What is the benefit of under-promising and over-delivering?',
        options: [
          'It makes contracts unnecessary',
          'It surprises and delights clients, increasing satisfaction and trust',
          'It allows unlimited edits',
          'It shortens the onboarding process'
        ],
        correct: 1,
        explanation: 'Under-promising and over-delivering creates positive surprises that build client satisfaction and trust.'
      }
    ]
  }
};
