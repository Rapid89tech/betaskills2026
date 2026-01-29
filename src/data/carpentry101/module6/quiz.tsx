import type { Quiz } from '@/types/course';

const quiz: Quiz = {
  id: 6,
  title: 'Module 6 Quiz: Clamping and Squaring Techniques',
  questions: [
    {
      id: 1,
      question: 'What is the primary purpose of clamping in carpentry?',
      options: [
        'To cut wood precisely',
        'To hold workpieces firmly during gluing, fastening, or cutting',
        'To sand surfaces evenly',
        'To apply finishes'
      ],
      correctAnswer: 1,
      explanation: 'The primary purpose of clamping is to hold workpieces firmly during gluing, fastening, or cutting, ensuring accurate assemblies and preventing movement.'
    },
    {
      id: 2,
      question: 'Which type of clamp is best suited for large panel glue-ups, such as tabletops or cabinet carcasses?',
      options: [
        'Spring Clamp',
        'C-Clamp',
        'Bar Clamp',
        'Quick-Release Clamp'
      ],
      correctAnswer: 2,
      explanation: 'Bar clamps are best suited for large panel glue-ups like tabletops or cabinet carcasses due to their long reach (12–72 inches) and ability to apply even pressure.'
    },
    {
      id: 3,
      question: 'When assembling a cabinet carcass, which tool is commonly used to ensure 90° corners?',
      options: [
        'Carpenter\'s Level',
        'Try Square',
        'Hand Saw',
        'Router'
      ],
      correctAnswer: 1,
      explanation: 'A try square is commonly used to ensure 90° corners when assembling a cabinet carcass, verifying that joints are square for proper fit and structural integrity.'
    },
    {
      id: 4,
      question: 'Why should panels in frame and panel construction be allowed to "float" within the frame?',
      options: [
        'To make assembly faster',
        'To allow wood movement due to expansion and contraction',
        'To reduce the weight of the frame',
        'To make sanding easier'
      ],
      correctAnswer: 1,
      explanation: 'Panels should float within the frame to allow wood movement due to expansion and contraction from moisture changes, preventing warping or cracking of the panel or frame.'
    },
    {
      id: 5,
      question: 'Which clamping method involves using flat boards to distribute pressure evenly across a glued joint?',
      options: [
        'Using cauls',
        'Using spring clamps',
        'Using pipe clamps',
        'Using corner braces'
      ],
      correctAnswer: 0,
      explanation: 'Using cauls (flat boards placed across the joint) distributes clamping pressure evenly and helps keep surfaces flush during glue-ups.'
    },
    {
      id: 6,
      question: 'How can a carpenter verify squareness in a rectangular assembly like a cabinet?',
      options: [
        'Measure diagonal lengths; if equal, it is square',
        'Check the wood grain direction',
        'Tap joints with a hammer',
        'Use clamps only on one side'
      ],
      correctAnswer: 0,
      explanation: 'Measuring diagonal lengths is an effective way to verify squareness—if both diagonals are equal, the rectangular assembly is square.'
    },
    {
      id: 7,
      question: 'Which tool is most suitable for checking the horizontal or vertical alignment of installed cabinets or wall frames?',
      options: [
        'Combination Square',
        'Carpenter\'s Level',
        'Try Square',
        'Bar Clamp'
      ],
      correctAnswer: 1,
      explanation: 'A carpenter\'s level is most suitable for checking horizontal (level) or vertical (plumb) alignment of installed cabinets or wall frames.'
    },
    {
      id: 8,
      question: 'What is a common risk of over-tightening clamps during glue-ups?',
      options: [
        'Misaligned joints',
        'Glue starvation and crushed wood',
        'Uneven sanding',
        'Faster curing of glue'
      ],
      correctAnswer: 1,
      explanation: 'Over-tightening clamps can cause glue starvation (squeezing out too much glue) and crushed wood, weakening the joint and damaging the workpiece.'
    },
    {
      id: 9,
      question: 'When is it best to check the squareness of an assembly?',
      options: [
        'Only after glue has fully cured',
        'Before, during, and after clamping or fastening',
        'Only after sanding and finishing',
        'Only before applying glue'
      ],
      correctAnswer: 1,
      explanation: 'It\'s best to check squareness before, during, and after clamping or fastening to ensure proper alignment throughout the assembly process and catch issues early.'
    },
    {
      id: 10,
      question: 'Which type of clamp is ideal for holding irregular or curved assemblies like chair frames?',
      options: [
        'Bar Clamp',
        'Parallel Clamp',
        'Band Clamp',
        'C-Clamp'
      ],
      correctAnswer: 2,
      explanation: 'Band clamps with flexible straps are ideal for holding irregular or curved assemblies like chair frames, as they can wrap around non-rectangular shapes.'
    }
  ]
};

export default quiz;

