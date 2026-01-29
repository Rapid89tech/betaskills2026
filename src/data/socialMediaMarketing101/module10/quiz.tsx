import type { Quiz } from '@/types/course';

export const module10Quiz: Quiz = {
  id: 10,
  title: 'Module 10 Quiz: Legal, Ethical, and Crisis Management',
  duration: '20 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'Which of the following best defines copyrights?',
        options: [
          'A social media guideline set by platforms',
          'Legal protections for original creative works',
          'Permission to use someone\'s image online',
          'Rules for influencer disclosures'
        ],
        correct: 1,
        explanation: 'Copyrights are legal protections for original creative works (e.g., images, videos, music, text), granting creators exclusive rights to use, distribute, and monetize their content.'
      },
      {
        question: 'What is the main purpose of image usage rules?',
        options: [
          'To encourage reposting without credit',
          'To define when and how images can be used legally',
          'To ban stock photos in campaigns',
          'To avoid using user-generated content'
        ],
        correct: 1,
        explanation: 'Image usage rules define when and how images can be used legally in marketing, social media, or other content, including licensing, permissions, and attribution requirements.'
      },
      {
        question: 'Which of the following platforms requires disclosure of sponsored content using #ad or #sponsored?',
        options: [
          'Instagram',
          'TikTok',
          'YouTube',
          'All of the above'
        ],
        correct: 3,
        explanation: 'All major platforms (Instagram, TikTok, YouTube, LinkedIn, etc.) require clear disclosure of sponsored content using #ad, #sponsored, or platform-specific tools to comply with FTC/ASA guidelines.'
      },
      {
        question: 'What is the key difference between royalty-free images and licensed images?',
        options: [
          'Royalty-free images are always free to use commercially',
          'Licensed images are free but require attribution',
          'Royalty-free images can be used under broad terms, licensed images require purchase or explicit rights',
          'Licensed images are only used for personal projects'
        ],
        correct: 2,
        explanation: 'Royalty-free images can be used under broad terms (pay once, use indefinitely with some restrictions), while licensed images require purchase or explicit rights based on usage scope.'
      },
      {
        question: 'Which tool provides a search engine for Creative Commons-licensed images?',
        options: [
          'Canva',
          'Hootsuite',
          'Creative Commons Search',
          'Google Analytics 4'
        ],
        correct: 2,
        explanation: 'Creative Commons Search is a free search engine that helps find images with clear licensing for legal use, with filters for commercial use and attribution requirements.'
      },
      {
        question: 'What does YouTube\'s Content ID system do?',
        options: [
          'Schedules video uploads',
          'Flags copyrighted material in videos',
          'Creates automatic captions',
          'Approves monetization requests'
        ],
        correct: 1,
        explanation: 'YouTube\'s Content ID system automatically detects and flags copyrighted material (audio, video) in uploaded content, helping protect intellectual property rights.'
      },
      {
        question: 'What is a major risk of ignoring copyright laws in campaigns?',
        options: [
          'Lower engagement',
          'Content going viral unexpectedly',
          'Lawsuits, fines, or takedowns',
          'Having to use fewer hashtags'
        ],
        correct: 2,
        explanation: 'Ignoring copyright laws can result in serious consequences including lawsuits, fines, content takedowns, and account suspensions, making compliance essential.'
      },
      {
        question: 'Which 2025 update in GA4 helps ensure compliance with EU User Consent Policy?',
        options: [
          'UTM tracking',
          'Consent Mode v2',
          'AI-powered anomaly detection',
          'Lead generation reports'
        ],
        correct: 1,
        explanation: 'Consent Mode v2 (updated January 13, 2025) ensures GA4 data collection respects user consent for analytics and ad personalization, complying with EU User Consent Policy and privacy regulations.'
      },
      {
        question: 'What is required when using user-generated content (UGC) in campaigns?',
        options: [
          'Nothing, it\'s free to use',
          'Platform approval',
          'Explicit permission from the creator',
          'Payment of royalties'
        ],
        correct: 2,
        explanation: 'Using user-generated content (UGC) in campaigns requires explicit permission from the creator to avoid copyright infringement and respect intellectual property rights.'
      },
      {
        question: 'Which platform specifically restricts copyrighted music in Reels without proper licensing?',
        options: [
          'Instagram',
          'TikTok',
          'YouTube',
          'X (Twitter)'
        ],
        correct: 0,
        explanation: 'Instagram specifically restricts the use of copyrighted music in Reels without proper licensing, requiring users to use music from Instagram\'s licensed library for commercial content.'
      }
    ]
  }
};

