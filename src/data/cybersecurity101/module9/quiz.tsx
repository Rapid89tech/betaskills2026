import type { Lesson } from '@/types/course';

const quiz: Lesson = {
  id: 4,
  title: 'Module 9 Quiz',
  duration: '15 min',
  type: 'quiz',
  content: {
    questions: [
      {
        id: 1,
        question: 'What is the main goal of cloud security?',
        options: [
          'Reduce server size',
          'Ensure safe use of cloud systems',
          'Improve social media usage',
          'Increase internet speed'
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        question: 'Which cloud model combines private and public clouds?',
        options: [
          'Personal Cloud',
          'Virtual Cloud',
          'Hybrid Cloud',
          'Community Cloud'
        ],
        correctAnswer: 2
      },
      {
        id: 3,
        question: 'Who is responsible for data and access controls in the cloud?',
        options: [
          'Cloud provider only',
          'ISP',
          'Customer',
          'Hardware vendor'
        ],
        correctAnswer: 2
      },
      {
        id: 4,
        question: 'What does IAM stand for?',
        options: [
          'Integrated Access Monitoring',
          'Identity and Access Management',
          'Internal Application Module',
          'Instant API Management'
        ],
        correctAnswer: 1
      },
      {
        id: 5,
        question: 'What is a common cloud misconfiguration risk?',
        options: [
          'Overheating servers',
          'Exposed storage buckets',
          'Weak internet speed',
          'Too many users'
        ],
        correctAnswer: 1
      },
      {
        id: 6,
        question: 'What does encryption do in cloud security?',
        options: [
          'Boost performance',
          'Reduce storage costs',
          'Protect data by converting it into unreadable form',
          'Increase screen resolution'
        ],
        correctAnswer: 2
      },
      {
        id: 7,
        question: 'Which tool is used to track AWS user activity?',
        options: [
          'CloudWatch',
          'CloudTrail',
          'S3 Monitor',
          'IAM Inspector'
        ],
        correctAnswer: 1
      },
      {
        id: 8,
        question: 'What is SOC 2 focused on?',
        options: [
          'Speed testing',
          'Data recovery',
          'Auditing cloud service provider security',
          'Internet bandwidth'
        ],
        correctAnswer: 2
      },
      {
        id: 9,
        question: 'Why is MFA recommended in the cloud?',
        options: [
          'Makes login faster',
          'Saves password effort',
          'Adds a second layer of authentication',
          'Avoids data backup'
        ],
        correctAnswer: 2
      },
      {
        id: 10,
        question: 'What does the shared responsibility model mean?',
        options: [
          'Users own all cloud infrastructure',
          'Cloud security is optional',
          'Provider and customer share security roles',
          'Only the network team is responsible'
        ],
        correctAnswer: 2
      }
    ]
  }
};

export default quiz;
