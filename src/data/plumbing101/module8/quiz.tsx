import type { Quiz } from '@/types/course';

export const module8Quiz: Quiz = {
  id: 8,
  title: 'Module 8 Quiz: Plumbing Repairs and Maintenance',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is a common sign of a hidden plumbing leak?',
        options: [
          'Increased water pressure',
          'A drop in water bills',
          'Water stains on ceilings or walls',
          'Improved water quality'
        ],
        correct: 2,
        explanation: 'Water stains on ceilings or walls are a common sign of a hidden plumbing leak.'
      },
      {
        question: 'Which tool is typically used to tighten a leaky faucet\'s connections?',
        options: [
          'Pipe cutter',
          'Basin wrench',
          'Hacksaw',
          'Auger'
        ],
        correct: 1,
        explanation: 'A basin wrench is typically used to tighten a leaky faucet\'s connections.'
      },
      {
        question: 'What is the best method to temporarily repair a small crack in a pipe?',
        options: [
          'Wrap the crack with electrical tape',
          'Apply plumber\'s putty',
          'Use epoxy putty to seal the crack until a replacement can be installed',
          'Heat the pipe with a blowtorch and seal it with solder'
        ],
        correct: 2,
        explanation: 'The best method is to use epoxy putty to seal the crack until a replacement can be installed.'
      },
      {
        question: 'Which of the following is an effective way to prevent clogs in a sink drain?',
        options: [
          'Pouring cooking oil down the drain',
          'Running cold water after using the sink',
          'Using a drain screen to catch hair and debris',
          'Regularly flushing the sink with chemical drain cleaners'
        ],
        correct: 2,
        explanation: 'Using a drain screen to catch hair and debris is an effective way to prevent clogs in a sink drain.'
      },
      {
        question: 'How should a plunger be used to unclog a sink?',
        options: [
          'Insert the plunger, push down once, and immediately pull it out.',
          'Create a tight seal around the drain, then push and pull repeatedly to dislodge the clog.',
          'Leave the plunger submerged for several minutes without moving it.',
          'Use a plunger only when the sink is completely dry.'
        ],
        correct: 1,
        explanation: 'Create a tight seal around the drain, then push and pull repeatedly to dislodge the clog.'
      },
      {
        question: 'When is it time to replace a pipe rather than repair it?',
        options: [
          'If it\'s less than five years old',
          'If it shows visible corrosion or has frequent leaks',
          'If it\'s made of plastic',
          'If it\'s connected to multiple fixtures'
        ],
        correct: 1,
        explanation: 'It\'s time to replace a pipe if it shows visible corrosion or has frequent leaks.'
      },
      {
        question: 'Which type of hose should be regularly inspected and replaced to prevent leaks?',
        options: [
          'Dishwasher drain hoses',
          'Flexible supply lines to faucets and toilets',
          'Washing machine hoses',
          'All of the above'
        ],
        correct: 3,
        explanation: 'All of the above types of hoses should be regularly inspected and replaced to prevent leaks.'
      },
      {
        question: 'What is a recommended preventive maintenance practice for water heaters?',
        options: [
          'Flushing the tank to remove sediment buildup',
          'Increasing the thermostat setting every year',
          'Running cold water through the tank monthly',
          'Adding bleach to the water supply'
        ],
        correct: 0,
        explanation: 'Flushing the tank to remove sediment buildup is a recommended preventive maintenance practice for water heaters.'
      },
      {
        question: 'What can help prevent frozen pipes in winter?',
        options: [
          'Insulating pipes in unheated areas',
          'Turning off the main water supply',
          'Leaving all faucets open at night',
          'Replacing pipes with plastic tubing'
        ],
        correct: 0,
        explanation: 'Insulating pipes in unheated areas can help prevent frozen pipes in winter.'
      },
      {
        question: 'Why is regular inspection of seals and gaskets important?',
        options: [
          'It ensures higher water pressure.',
          'It prevents leaks and extends the life of fixtures.',
          'It speeds up the repair process when leaks occur.',
          'It reduces water quality issues.'
        ],
        correct: 1,
        explanation: 'Regular inspection of seals and gaskets prevents leaks and extends the life of fixtures.'
      }
    ]
  }
}; 
