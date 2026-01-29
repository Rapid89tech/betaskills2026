import { Lesson } from '../../../types/course';

const lesson4Quiz: Lesson = {
  id: 4,
  title: 'Module 3 Quiz: Installation Techniques',
  duration: '15 minutes',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the purpose of using a notched trowel when applying adhesive?',
        options: [
          'To spread adhesive evenly and create proper ridges',
          'To remove excess adhesive',
          'To clean the substrate',
          'To cut the adhesive container'
        ],
        correct: 0,
        explanation: 'A notched trowel spreads adhesive evenly and creates ridges that ensure proper coverage and bonding between tile and substrate.'
      },
      {
        question: 'What is the recommended adhesive coverage for most tile installations?',
        options: [
          '50%',
          '70%',
          '80-95%',
          '100%'
        ],
        correct: 2,
        explanation: '80-95% adhesive coverage is recommended for most tile installations to ensure proper bonding and prevent hollow spots.'
      },
      {
        question: 'How should you check for proper adhesive transfer?',
        options: [
          'Look at the substrate',
          'Pull up a test tile and check the back',
          'Measure the adhesive thickness',
          'Wait until it dries'
        ],
        correct: 1,
        explanation: 'Pulling up a test tile allows you to visually inspect the adhesive transfer pattern on the back of the tile.'
      },
      {
        question: 'What is the purpose of tile spacers?',
        options: [
          'To make installation faster',
          'To maintain consistent gaps for grout lines',
          'To prevent tiles from sliding',
          'To protect tile edges'
        ],
        correct: 1,
        explanation: 'Tile spacers maintain consistent gaps between tiles, ensuring uniform grout lines throughout the installation.'
      },
      {
        question: 'When should you twist or slide tiles during installation?',
        options: [
          'Always, to ensure good adhesion',
          'Never, it can cause adhesive buildup',
          'Only on the first row',
          'Only when adhesive is thick'
        ],
        correct: 1,
        explanation: 'Twisting or sliding tiles can cause adhesive to build up in grout lines and should be avoided.'
      },
      {
        question: 'What is lippage in tile installation?',
        options: [
          'Uneven tile edges creating height differences',
          'Excess grout between tiles',
          'Missing adhesive coverage',
          'Cracked tile edges'
        ],
        correct: 0,
        explanation: 'Lippage occurs when adjacent tiles are not at the same height, creating uneven surfaces and edges.'
      },
      {
        question: 'How can you prevent lippage during installation?',
        options: [
          'Use more adhesive',
          'Use a tile leveling system',
          'Install tiles faster',
          'Use smaller spacers'
        ],
        correct: 1,
        explanation: 'Tile leveling systems help maintain consistent height across adjacent tiles, preventing lippage.'
      },
      {
        question: 'What should you do if adhesive gets into grout lines?',
        options: [
          'Leave it to dry',
          'Clean it out immediately',
          'Cover it with more adhesive',
          'Wait until grouting'
        ],
        correct: 1,
        explanation: 'Adhesive in grout lines should be cleaned out immediately to ensure proper grout adhesion and appearance.'
      },
      {
        question: 'How long should you typically wait before walking on newly installed floor tiles?',
        options: [
          '2-4 hours',
          '12-24 hours',
          '48-72 hours',
          '1 week'
        ],
        correct: 1,
        explanation: '12-24 hours is typically required for adhesive to cure sufficiently before allowing foot traffic on floor tiles.'
      },
      {
        question: 'What is the recommended working time for most tile adhesives?',
        options: [
          '5-10 minutes',
          '15-30 minutes',
          '1-2 hours',
          '4-6 hours'
        ],
        correct: 1,
        explanation: 'Most tile adhesives have a working time of 15-30 minutes, after which they begin to skin over and lose bonding strength.'
      }
    ]
  },
};

export default lesson4Quiz;
