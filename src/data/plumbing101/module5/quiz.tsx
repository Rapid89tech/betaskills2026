import type { Quiz } from '@/types/course';

export const module5Quiz: Quiz = {
  id: 5,
  title: 'Module 5 Quiz: Pipe Installation and Fittings',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the primary purpose of flux when soldering copper pipes?',
        options: [
          'To clean and prepare the pipe for soldering.',
          'To hold the pipe in place during the soldering process.',
          'To act as an adhesive for copper fittings.',
          'To seal leaks after soldering is complete.'
        ],
        correct: 0,
        explanation: 'Flux is used to clean and prepare the pipe for soldering by preventing oxidation and aiding solder flow.'
      },
      {
        question: 'What tool is commonly used to create threads on metal pipes?',
        options: [
          'Tubing cutter',
          'Reciprocating saw',
          'Pipe threading machine',
          'Compression fitting'
        ],
        correct: 2,
        explanation: 'A pipe threading machine is the common tool used to create threads on metal pipes.'
      },
      {
        question: 'How should a PVC pipe and fitting be prepared before cementing them together?',
        options: [
          'Heat the pipe to make it more flexible.',
          'Prime both surfaces to clean and soften them.',
          'Roughen the pipe with sandpaper to create texture.',
          'Apply solder to ensure a stronger bond.'
        ],
        correct: 1,
        explanation: 'PVC pipes and fittings should be primed to clean and soften the surfaces before cementing them together.'
      },
      {
        question: 'Which type of PEX fitting requires a crimping tool to create a secure connection?',
        options: [
          'Push-fit fitting',
          'Expansion fitting',
          'Compression fitting',
          'Crimp fitting'
        ],
        correct: 3,
        explanation: 'Crimp fittings require a crimping tool to create a secure connection with PEX pipes.'
      },
      {
        question: 'What is the advantage of using push-fit (quick-connect) fittings?',
        options: [
          'They are cheaper than all other fitting types.',
          'They require no special tools and are easy to install.',
          'They create a permanent, non-removable connection.',
          'They are only compatible with PVC pipes.'
        ],
        correct: 1,
        explanation: 'Push-fit fittings require no special tools and are easy to install, making them convenient for many applications.'
      },
      {
        question: 'What type of valve allows flow in only one direction, preventing backflow?',
        options: [
          'Gate valve',
          'Ball valve',
          'Check valve',
          'Pressure-reducing valve'
        ],
        correct: 2,
        explanation: 'Check valves allow flow in only one direction, preventing backflow in plumbing systems.'
      },
      {
        question: 'What is the proper technique for applying solder to a heated copper joint?',
        options: [
          'Hold the solder directly in the flame.',
          'Apply the solder to the opposite side of the joint from where the heat is applied.',
          'Wrap the solder around the joint and heat it until it melts.',
          'Use the solder before applying heat to ensure even distribution.'
        ],
        correct: 1,
        explanation: 'The proper technique is to apply the solder to the opposite side of the joint from where the heat is applied.'
      },
      {
        question: 'Which fitting is used to change the direction of a pipe?',
        options: [
          'Coupling',
          'Elbow',
          'Tee',
          'Reducer'
        ],
        correct: 1,
        explanation: 'Elbows are used to change the direction of a pipe, typically at 90° or 45° angles.'
      },
      {
        question: 'Why is it important to remove burrs from a cut pipe before joining?',
        options: [
          'To improve the appearance of the pipe end.',
          'To ensure a smoother, stronger joint and prevent leaks.',
          'To increase water pressure in the system.',
          'To make it easier to apply flux.'
        ],
        correct: 1,
        explanation: 'Removing burrs ensures a smoother, stronger joint and prevents leaks in the plumbing system.'
      },
      {
        question: 'What is a common material used for soldering copper pipes?',
        options: [
          'Silicone sealant',
          'Lead-free solder',
          'PVC cement',
          'Epoxy resin'
        ],
        correct: 1,
        explanation: 'Lead-free solder is the common material used for soldering copper pipes in modern plumbing applications.'
      }
    ]
  }
}; 
