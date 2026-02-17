import type { Lesson } from '@/types/course';

export const quiz9: Lesson = {
  id: 4,
  title: '📝 Module 9 Quiz: Project and Team Management',
  duration: '15 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'Why is it important to use project management tools in podcasting?',
        options: [
          'To make episodes longer',
          'To automate guest interviews',
          'To manage tasks, content, and collaboration efficiently',
          'To avoid using social media'
        ],
        correct: 2,
        explanation: 'Project management tools help organize production schedules, streamline teamwork, and reduce mistakes.'
      },
      {
        question: 'Which project management tool is best suited for visual thinkers using Kanban boards?',
        options: [
          'Asana',
          'Notion',
          'Trello',
          'Google Docs'
        ],
        correct: 2,
        explanation: 'Trello\'s Kanban-style boards make task visualization intuitive and ideal for creative planning.'
      },
      {
        question: 'In Notion, how can you track podcast guests effectively?',
        options: [
          'By using a voice memo',
          'By creating a CRM-style database',
          'By embedding Spotify playlists',
          'By scheduling through Instagram'
        ],
        correct: 1,
        explanation: 'Notion\'s database feature lets you organize guest outreach, contact details, and status updates like a mini-CRM.'
      },
      {
        question: 'What is a key advantage of using Asana for podcast production?',
        options: [
          'Offline editing tools',
          'Social media analytics',
          'Structured task assignment and automation',
          'Audio mixing'
        ],
        correct: 2,
        explanation: 'Asana shines with structured workflows and features like task dependencies, due dates, and automation.'
      },
      {
        question: 'Which tool uses "Butler" to automate task workflows?',
        options: [
          'Notion',
          'Trello',
          'Google Calendar',
          'Buffer'
        ],
        correct: 1,
        explanation: 'Trello\'s Butler automation helps auto-move cards, assign tasks, and trigger actions based on rules.'
      },
      {
        question: 'What should a weekly podcast workflow ideally start with?',
        options: [
          'Promotion',
          'Guest outreach',
          'Script planning',
          'Final review'
        ],
        correct: 2,
        explanation: 'Planning scripts or outlines early sets the tone and structure for the episode, enabling smoother execution.'
      },
      {
        question: 'When using Notion, which of the following is NOT a typical use case?',
        options: [
          'Creating podcast dashboards',
          'Recording interviews',
          'Embedding episode media',
          'Using templates for workflows'
        ],
        correct: 1,
        explanation: 'Notion does not offer built-in audio recording capabilities.'
      },
      {
        question: 'What is a major benefit of using templates in project management tools?',
        options: [
          'Reduces the number of episodes',
          'Makes podcast titles more creative',
          'Ensures consistency and saves time',
          'Guarantees more downloads'
        ],
        correct: 2,
        explanation: 'Templates standardize your workflow and reduce repetitive setup, saving time each week.'
      },
      {
        question: 'Which of the following is a strong reason to choose Asana over Trello or Notion?',
        options: [
          'It\'s the only free tool',
          'You want to track complex team workflows with automation',
          'It has the best audio recording quality',
          'It provides built-in guest scheduling'
        ],
        correct: 1,
        explanation: 'Asana handles large team coordination well, with advanced tracking and automation features.'
      },
      {
        question: 'What is a best practice when managing your podcast with any project tool?',
        options: [
          'Avoid labeling tasks',
          'Only assign tasks after publishing',
          'Review weekly progress and archive completed episodes',
          'Never use checklists'
        ],
        correct: 2,
        explanation: 'Weekly reviews help optimize workflow and ensure nothing is missed; archiving keeps your dashboard clean.'
      }
    ]
  }
};
