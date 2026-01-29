import type { QuizLesson } from '@/types/course';

export const module2Quiz: QuizLesson = {
  id: 2,
  title: 'Module 2 Quiz: Planning and Launching Your Podcast',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the first step when developing a new podcast?',
        options: [
          'Choosing your microphone',
          'Writing a script',
          'Defining your podcast concept',
          'Editing your intro music'
        ],
        correct: 2,
        explanation: 'Defining your podcast concept is the foundational first step that shapes all other aspects of your show.'
      },
      {
        question: 'Which question is NOT part of defining your podcast concept?',
        options: [
          'What value do you offer?',
          'Who is your co-host?',
          'What makes your show unique?',
          'Who is your target audience?'
        ],
        correct: 1,
        explanation: 'While co-host selection is important, it\'s not part of the core concept definition process.'
      },
      {
        question: 'What is a good format for a podcast focused on expert opinions and diverse voices?',
        options: [
          'Solo Monologue',
          'Interview',
          'Fiction/Audio Drama',
          'Q&A'
        ],
        correct: 1,
        explanation: 'Interview format is ideal for featuring expert opinions and diverse voices from different guests.'
      },
      {
        question: 'What element helps maintain consistency in your podcast episodes?',
        options: [
          'Multiple hosts',
          'Fancy cover art',
          'A clear episode structure',
          'Changing formats regularly'
        ],
        correct: 2,
        explanation: 'A clear episode structure provides familiar flow and maintains consistency across episodes.'
      },
      {
        question: 'Which of the following is part of a basic episode structure?',
        options: [
          'Trailer, Teaser, and Bloopers',
          'Intro, Main Content, Break, Outro',
          'Guest bio, Music playlist, Listener contest',
          'Cover Art, Promotion Plan, Outro'
        ],
        correct: 1,
        explanation: 'Intro, Main Content, Break, and Outro form the standard episode structure template.'
      },
      {
        question: 'Which format is best suited for fictional storytelling with immersive sound effects?',
        options: [
          'Interview',
          'Solo',
          'Audio Drama',
          'Panel'
        ],
        correct: 2,
        explanation: 'Audio Drama format is specifically designed for fictional storytelling with immersive sound effects.'
      },
      {
        question: 'What is the purpose of a podcast content calendar?',
        options: [
          'To improve your podcast artwork',
          'To schedule episode release and plan content',
          'To track podcast reviews',
          'To organize guest clothing choices'
        ],
        correct: 1,
        explanation: 'Content calendars help schedule episode releases and plan content systematically.'
      },
      {
        question: 'What tool would help with scheduling podcast guests?',
        options: [
          'Canva',
          'Anchor',
          'Calendly',
          'Audacity'
        ],
        correct: 2,
        explanation: 'Calendly is a scheduling tool that helps coordinate podcast guest interviews.'
      },
      {
        question: 'Why are show notes important for your podcast?',
        options: [
          'They increase file size',
          'They offer clickable links to episodes',
          'They improve SEO and give listeners context',
          'They reduce your editing time'
        ],
        correct: 2,
        explanation: 'Show notes improve SEO and provide listeners with context about episode content.'
      },
      {
        question: 'What should a good guest profile include? (Select all that apply)',
        options: [
          'Guest\'s height and weight',
          'Social handles',
          'Notable achievements',
          'Topics of interest'
        ],
        correct: 1,
        explanation: 'A good guest profile should include social handles, notable achievements, and topics of interest to help with research and promotion.'
      }
    ]
  }
};
