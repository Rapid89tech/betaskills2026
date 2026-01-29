import type { Quiz } from '@/types/course';

const quiz: Quiz = {
  id: 7,
  title: 'Module 7 Quiz: Advanced Training & Behavior Management',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the primary purpose of advanced obedience and off-leash reliability training?',
        options: [
          'To eliminate the need for treats entirely',
          'To teach entertaining tricks for shows',
          'To achieve precise and consistent behavior in complex environments',
          'To make dogs less active indoors'
        ],
        correct: 2,
        explanation: 'Advanced obedience and off-leash reliability training aims to achieve precise and consistent behavior in complex environments, ensuring dogs respond reliably even in distracting or challenging situations.'
      },
      {
        question: 'Which of the following is a key benefit of advanced obedience?',
        options: [
          'Reduces grooming needs',
          'Strengthens trust between dog and handler',
          'Teaches a dog to bark on command',
          'Allows dogs to ignore distractions freely'
        ],
        correct: 1,
        explanation: 'Advanced obedience training strengthens trust between dog and handler through consistent, positive training interactions, building a stronger bond.'
      },
      {
        question: 'Which tool is commonly used for long-distance recall before going fully off-leash?',
        options: [
          'A 15–30 foot long line',
          'A retractable leash',
          'A grooming harness',
          'A choke chain'
        ],
        correct: 0,
        explanation: 'A 15–30 foot long line is used for distance training and recall practice before transitioning to fully off-leash work, providing safety and control.'
      },
      {
        question: 'What is the main purpose of "proofing recall"?',
        options: [
          'To teach dogs to stay indoors',
          'To practice recall under distractions and in public environments',
          'To train dogs only for competitions',
          'To reduce the need for positive reinforcement'
        ],
        correct: 1,
        explanation: 'Proofing recall involves practicing recall in high-distraction settings and public environments to ensure reliability in real-world situations.'
      },
      {
        question: 'Which advanced technique ensures a dog halts immediately for safety?',
        options: [
          'Extended duration commands',
          'Emergency stop',
          'Complex command chains',
          'Off-leash heel'
        ],
        correct: 1,
        explanation: 'Emergency stop teaches an immediate "stop" or "down" cue for safety, allowing handlers to quickly halt dogs in potentially dangerous situations.'
      },
      {
        question: 'What is the critical socialization window for puppies?',
        options: [
          '1–4 weeks',
          '3–12 weeks',
          '6–18 weeks',
          '12–24 weeks'
        ],
        correct: 1,
        explanation: 'The critical socialization window for puppies is 3–12 weeks, during which positive exposures shape lifelong behavior and confidence.'
      },
      {
        question: 'Which technique is most effective for correcting separation anxiety?',
        options: [
          'Punishing destructive behavior',
          'Gradual departures with positive reinforcement',
          'Leaving the dog alone for extended periods',
          'Ignoring the behavior completely'
        ],
        correct: 1,
        explanation: 'Gradual departures with positive reinforcement, starting with short absences and gradually increasing duration, is the most effective approach for correcting separation anxiety.'
      },
      {
        question: 'What is the first step in clicker training?',
        options: [
          'Teaching complex tricks',
          'Charging the clicker',
          'Using the clicker for punishment',
          'Training without treats'
        ],
        correct: 1,
        explanation: 'Charging the clicker involves clicking and immediately giving a treat 10–15 times to establish the association between the click sound and reward.'
      },
      {
        question: 'Which breed type often requires high-value food rewards to stay focused because of strong scent instincts?',
        options: [
          'Sporting breeds',
          'Hound breeds',
          'Terrier breeds',
          'Herding breeds'
        ],
        correct: 1,
        explanation: 'Hound breeds, particularly Beagles, are scent-driven and often require high-value treats to maintain focus during training, competing with their strong instinct to follow scents.'
      },
      {
        question: 'What is an essential ethical guideline in advanced obedience training?',
        options: [
          'Use dominance-based corrections for faster results',
          'Prioritize force-free, positive reinforcement methods',
          'Train only in low-distraction areas',
          'Avoid rewarding with toys or treats'
        ],
        correct: 1,
        explanation: 'Prioritizing force-free, positive reinforcement methods is essential for ethical training, ensuring dog welfare and building trust, as endorsed by organizations like CCPDT.'
      }
    ]
  }
};

export default quiz;

