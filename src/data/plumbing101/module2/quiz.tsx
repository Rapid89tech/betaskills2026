import type { Quiz } from '@/types/course';

export const module2Quiz: Quiz = {
  id: 2,
  title: 'Module 2 Quiz: Plumbing Tools and Materials',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'Which of the following is NOT a common hand tool used by plumbers?',
        options: [
          'Pipe wrench',
          'Needle-nose pliers',
          'Hacksaw',
          'Circular saw'
        ],
        correct: 3,
        explanation: 'Circular saws are power tools, not hand tools commonly used by plumbers. The other options are all essential hand tools for plumbing work.'
      },
      {
        question: 'What is the primary purpose of a pipe wrench?',
        options: [
          'To cut PVC pipes',
          'To remove clogs from drains',
          'To grip and turn threaded pipes and fittings',
          'To solder copper pipes'
        ],
        correct: 2,
        explanation: 'Pipe wrenches are specifically designed to grip and turn threaded pipes and fittings securely.'
      },
      {
        question: 'Why are PEX pipes popular in residential plumbing?',
        options: [
          'They are heavier than other materials.',
          'They are easy to bend, resistant to freezing, and simple to install.',
          'They require specialized equipment for every connection.',
          'They are the most expensive pipe material available.'
        ],
        correct: 1,
        explanation: 'PEX pipes are popular because they are flexible (easy to bend), resistant to freezing, and simple to install, making them ideal for residential applications.'
      },
      {
        question: 'What type of pipe is typically used for drainage, waste, and vent systems?',
        options: [
          'Copper',
          'PVC',
          'PEX',
          'Stainless steel'
        ],
        correct: 1,
        explanation: 'PVC pipes are commonly used for drainage, waste, and vent systems due to their affordability, corrosion resistance, and suitability for these applications.'
      },
      {
        question: 'Which material is used to join copper pipes and ensure a leak-free connection?',
        options: [
          'PVC cement',
          'Flux and solder',
          'Epoxy sealant',
          'Silicone caulk'
        ],
        correct: 1,
        explanation: 'Flux and solder are the traditional materials used to join copper pipes, creating strong, leak-free connections through the soldering process.'
      },
      {
        question: 'What is the primary function of a pipe threading machine?',
        options: [
          'To cut pipes to length',
          'To create threads on metal pipes for secure fittings',
          'To grind metal fittings smooth',
          'To bend PVC pipes without breaking them'
        ],
        correct: 1,
        explanation: 'Pipe threading machines are specifically designed to create threads on metal pipes, allowing for secure fittings and connections.'
      },
      {
        question: 'Which of the following adhesives is commonly used for PVC pipe connections?',
        options: [
          'Epoxy sealant',
          'PVC cement and primer',
          'Flux and solder',
          'Silicone caulk'
        ],
        correct: 1,
        explanation: 'PVC cement and primer are the standard adhesives used for bonding PVC pipes and fittings together.'
      },
      {
        question: 'Why are rubber gaskets used in plumbing?',
        options: [
          'To increase water pressure in the pipes',
          'To create a tight seal and prevent leaks at joints',
          'To reduce pipe corrosion',
          'To block water flow for maintenance'
        ],
        correct: 1,
        explanation: 'Rubber gaskets are used to create tight seals at joints, preventing leaks and ensuring watertight connections.'
      },
      {
        question: 'What is the benefit of using a tubing cutter instead of a hacksaw on copper pipes?',
        options: [
          'It cuts faster but leaves a rough edge.',
          'It creates a cleaner, more precise cut.',
          'It\'s only useful for cutting plastic materials.',
          'It automatically deburrs the pipe after cutting.'
        ],
        correct: 1,
        explanation: 'Tubing cutters create cleaner, more precise cuts on copper pipes compared to hacksaws, which is important for proper fittings and connections.'
      },
      {
        question: 'When working in tight spaces, which tool is most commonly used?',
        options: [
          'Channel-lock pliers',
          'End pipe wrench',
          'Standard pipe wrench',
          'Pipe threading machine'
        ],
        correct: 1,
        explanation: 'End pipe wrenches are specifically designed for working in tight spaces and close-to-wall applications.'
      }
    ]
  }
}; 
