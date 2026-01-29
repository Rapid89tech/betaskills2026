import type { Quiz } from '@/types/course';

const quiz: Quiz = {
  id: 2,
  title: 'Module 2 Quiz: Power Tools in Carpentry',
  questions: [
    {
      id: 1,
      question: 'Which type of drill combines regular drilling with a hammering action for tougher materials?',
      options: [
        'Corded Drill',
        'Cordless Drill',
        'Hammer Drill',
        'Drill Press'
      ],
      correctAnswer: 2,
      explanation: 'Hammer drills combine drilling with a hammering action for masonry or tough materials, occasionally used in construction carpentry.'
    },
    {
      id: 2,
      question: 'Which sander is best for finishing furniture and minimizing swirl marks?',
      options: [
        'Belt Sander',
        'Random Orbital Sander',
        'Sheet Sander',
        'Detail Sander'
      ],
      correctAnswer: 1,
      explanation: 'Random Orbital Sanders use a circular sanding motion to minimize swirl marks, making them ideal for finishing furniture or cabinetry.'
    },
    {
      id: 3,
      question: 'What is the primary use of a circular saw in carpentry?',
      options: [
        'Sanding rough surfaces',
        'Cutting lumber, plywood, and sheet materials',
        'Shaping edges',
        'Drilling precise holes'
      ],
      correctAnswer: 1,
      explanation: 'Circular saws are powerful cutting tools used primarily for straight cuts in lumber, plywood, and sheet materials for framing, roofing, or furniture.'
    },
    {
      id: 4,
      question: 'When using a router for edge profiling, which safety measure is most important?',
      options: [
        'Feeding wood quickly',
        'Using a router table or jig for stability',
        'Ignoring dust masks',
        'Using a dull bit'
      ],
      correctAnswer: 1,
      explanation: 'Using a router table or jig for stability during complex cuts is the most important safety measure when edge profiling, preventing kickback and ensuring precision.'
    },
    {
      id: 5,
      question: 'How should a planer be used to avoid uneven cuts (snipe) at the ends of boards?',
      options: [
        'Feed wood slowly and evenly',
        'Apply maximum pressure',
        'Use dull blades',
        'Plan only short boards'
      ],
      correctAnswer: 0,
      explanation: 'Feeding wood slowly and evenly prevents snipe (uneven cuts at board ends), ensuring uniform thickness throughout the planing process.'
    },
    {
      id: 6,
      question: 'Which type of power drill is battery-operated and ideal for on-site work?',
      options: [
        'Corded Drill',
        'Cordless Drill/Driver',
        'Drill Press',
        'Hammer Drill'
      ],
      correctAnswer: 1,
      explanation: 'Cordless Drill/Drivers are battery-powered for portability, making them suitable for general carpentry and on-site work where power access may be limited.'
    },
    {
      id: 7,
      question: 'What is a recommended best practice for sanding wood surfaces?',
      options: [
        'Start with fine sandpaper and finish with coarse',
        'Apply heavy pressure while sanding',
        'Progress from coarse to fine sandpaper',
        'Avoid using dust collection'
      ],
      correctAnswer: 2,
      explanation: 'Progressing from coarse to fine sandpaper (e.g., 80 → 120 → 220 grit) systematically removes scratches and achieves a smooth finish efficiently.'
    },
    {
      id: 8,
      question: 'Which circular saw type is guided by a track for precise, straight cuts?',
      options: [
        'Standard Circular Saw',
        'Cordless Circular Saw',
        'Track Saw',
        'Mini Circular Saw'
      ],
      correctAnswer: 2,
      explanation: 'Track Saws are guided by a track for precise, straight cuts in plywood or MDF, making them popular in cabinetry and furniture making.'
    },
    {
      id: 9,
      question: 'Why is it important to select the correct drill bit for a task?',
      options: [
        'To make drilling faster',
        'To prevent wood splitting and achieve clean holes',
        'To save electricity',
        'Drill bit choice is not important'
      ],
      correctAnswer: 1,
      explanation: 'Selecting the correct drill bit prevents wood splitting and achieves clean holes, ensuring proper fit for dowels, screws, or hardware.'
    },
    {
      id: 10,
      question: 'Which personal protective equipment (PPE) is essential when using power tools?',
      options: [
        'Safety glasses, hearing protection, dust mask',
        'Gloves only',
        'Helmet only',
        'No PPE is needed'
      ],
      correctAnswer: 0,
      explanation: 'Safety glasses, hearing protection, and dust masks are essential PPE when using power tools to protect against debris, noise, and fine particles.'
    }
  ]
};

export default quiz;

