import type { Quiz } from '@/types/course';

export const module3Quiz: Quiz = {
  id: 3,
  title: 'Module 3 Quiz: Gel and Acrylic Nail Applications',
  duration: '20 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the main difference between hard gel and soft gel?',
        options: [
          'Hard gel is more expensive',
          'Hard gel cannot be soaked off with acetone',
          'Soft gel is stronger',
          'Hard gel requires no curing'
        ],
        correct: 1,
        explanation: 'Hard gel is non-porous and cannot be soaked off with acetone—it requires filing for removal. Soft gel can be soaked off with acetone.'
      },
      {
        question: 'How long should gel nails typically be cured under an LED lamp?',
        options: [
          '10-15 seconds',
          '30-60 seconds',
          '5 minutes',
          '10 minutes'
        ],
        correct: 1,
        explanation: 'LED lamps typically cure gel in 30-60 seconds, while UV lamps take about 2 minutes.'
      },
      {
        question: 'What is the purpose of applying primer before acrylic application?',
        options: [
          'To add shine to the nails',
          'To create a bond between the natural nail and acrylic',
          'To moisturize the cuticles',
          'To remove old polish'
        ],
        correct: 1,
        explanation: 'Primer creates a bond between the natural nail and acrylic, preventing lifting and ensuring better adhesion.'
      },
      {
        question: 'What causes bubbles to form in acrylic nails?',
        options: [
          'Using too much powder',
          'Shaking the liquid monomer or using a wet brush',
          'Filing too aggressively',
          'Not using primer'
        ],
        correct: 1,
        explanation: 'Bubbles in acrylic are caused by shaking the liquid monomer, using a wet brush, or incorrect liquid-to-powder ratio.'
      },
      {
        question: 'Which type of nail enhancement is known for being odorless during application?',
        options: [
          'Acrylic nails',
          'Gel nails',
          'Both gel and acrylic',
          'Neither gel nor acrylic'
        ],
        correct: 1,
        explanation: 'Gel nails are odorless during application, while acrylic nails have a strong chemical odor that requires good ventilation.'
      },
      {
        question: 'What is the apex of a nail enhancement?',
        options: [
          'The tip of the nail',
          'The highest point of the nail for proper structure',
          'The cuticle area',
          'The sidewalls of the nail'
        ],
        correct: 1,
        explanation: 'The apex is the highest point of the nail enhancement, providing proper structure and strength to prevent breaking.'
      },
      {
        question: 'How should toenails be trimmed to prevent ingrown nails?',
        options: [
          'Round the corners deeply',
          'Cut in a V-shape',
          'Trim straight across',
          'Cut very short'
        ],
        correct: 2,
        explanation: 'This question appears to be from Module 2, but the answer is to trim straight across to prevent ingrown nails.'
      },
      {
        question: 'What should you use to remove the sticky residue after curing gel nails?',
        options: [
          'Water and soap',
          'Alcohol or gel cleanser',
          'Hand lotion',
          'Nail file'
        ],
        correct: 1,
        explanation: 'Alcohol or gel cleanser is used to remove the sticky inhibition layer that remains after curing gel nails.'
      },
      {
        question: 'How often do acrylic nails typically need fills?',
        options: [
          'Every week',
          'Every 2-3 weeks',
          'Every month',
          'Every 6 weeks'
        ],
        correct: 1,
        explanation: 'Acrylic nails typically need fills every 2-3 weeks as the natural nail grows out, creating a gap at the cuticle area.'
      },
      {
        question: 'What is the main cause of gel or acrylic nail lifting?',
        options: [
          'Using too much top coat',
          'Improper nail prep or moisture on the nail',
          'Filing the nails too short',
          'Applying cuticle oil before service'
        ],
        correct: 1,
        explanation: 'Lifting is primarily caused by improper nail preparation, moisture or oil on the nail, skipping primer, or applying product too close to cuticles.'
      }
    ]
  }
};
