import type { Lesson } from '@/types/course';

export const module1Quiz: Lesson = {
  id: 6,
  title: 'Module 1 Quiz',
  duration: '15 min',
  type: 'quiz',
  content: {
    questions: [
      {
        id: 1,
        question: 'What is film production?',
        options: [
          'A type of live theater performance',
          'The process of creating a motion picture from concept to distribution',
          'The editing of recorded video clips only',
          'The marketing of movies after release'
        ],
        correctAnswer: 1,
        explanation: 'Film production is the comprehensive process of creating a motion picture, encompassing everything from the initial concept to the final distribution.'
      },
      {
        id: 2,
        question: 'What are the five main stages of film production?',
        options: [
          'Scriptwriting, Casting, Directing, Editing, Marketing',
          'Development, Pre-Production, Production, Post-Production, Distribution',
          'Funding, Shooting, Editing, Promotion, Archiving',
          'Idea, Crew Hiring, Filming, Advertising, Screening'
        ],
        correctAnswer: 1,
        explanation: 'The five main stages are Development, Pre-Production, Production, Post-Production, and Distribution.'
      },
      {
        id: 3,
        question: 'During which stage is a screenplay written and funding secured?',
        options: [
          'Pre-Production',
          'Production',
          'Development',
          'Post-Production'
        ],
        correctAnswer: 2,
        explanation: 'Development is the stage where the screenplay is written and funding is secured.'
      },
      {
        id: 4,
        question: 'Which of the following activities happen during Pre-Production?',
        options: [
          'Filming and capturing performances',
          'Editing footage and adding visual effects',
          'Casting actors, scouting locations, designing sets and costumes',
          'Marketing the film with trailers and posters'
        ],
        correctAnswer: 2,
        explanation: 'Pre-production includes casting actors, scouting locations, and designing sets and costumes.'
      },
      {
        id: 5,
        question: 'Who is responsible for shaping the creative vision of the film and guiding actors\' performances?',
        options: [
          'Producer',
          'Director',
          'Cinematographer',
          'Editor'
        ],
        correctAnswer: 1,
        explanation: 'The director shapes the creative vision and guides actors\' performances.'
      },

      {
        id: 6,
        question: 'What does the cinematographer (Director of Photography) do?',
        options: [
          'Manages the project\'s budget',
          'Designs costumes and props',
          'Manages camera work, lighting, and framing',
          'Promotes the film to streaming platforms'
        ],
        correctAnswer: 2,
        explanation: 'The cinematographer manages camera work, lighting, and framing to achieve the desired aesthetic.'
      },
      {
        id: 7,
        question: 'Which stage of production includes editing, sound design, adding visual effects, and color grading?',
        options: [
          'Development',
          'Pre-Production',
          'Production',
          'Post-Production'
        ],
        correctAnswer: 3,
        explanation: 'Post-Production includes editing, sound design, visual effects, and color grading.'
      },
      {
        id: 8,
        question: 'Which of the following are examples of film distribution methods?',
        options: [
          'Streaming platforms and theatrical releases',
          'Costume design and set construction',
          'Casting and rehearsals',
          'Editing and sound mixing'
        ],
        correctAnswer: 0,
        explanation: 'Film distribution methods include streaming platforms and theatrical releases.'
      },
      {
        id: 9,
        question: 'What are two common challenges in film production?',
        options: [
          'Choosing film genres and selecting actors',
          'Budget constraints and time management',
          'Selling movie tickets and writing reviews',
          'Costume design and storyboard drawing'
        ],
        correctAnswer: 1,
        explanation: 'Common challenges include budget constraints and time management.'
      },
      {
        id: 10,
        question: 'Which of the following is NOT a type of film?',
        options: [
          'Feature Film',
          'Documentary',
          'Animation',
          'Television Commercial'
        ],
        correctAnswer: 3,
        explanation: 'Television commercials are not considered a type of film in the traditional sense.'
      }
    ]
  }
};
