import type { Quiz } from '@/types/course';

const quiz: Quiz = {
  id: 4,
  title: 'Module 4 Quiz: Carpentry Fundamentals',
  questions: [
    {
      id: 1,
      question: 'What type of technical drawing shows a top-down view of a structure or component?',
      options: [
        'Elevation View',
        'Plan View',
        'Section View',
        'Isometric View'
      ],
      correctAnswer: 1,
      explanation: 'A Plan View shows a top-down perspective of a structure or component, such as floor plans for rooms or furniture tabletops.'
    },
    {
      id: 2,
      question: 'In technical drawings, what does a dashed line usually represent?',
      options: [
        'Visible edges',
        'Center of circular features',
        'Hidden edges or features',
        'Material type'
      ],
      correctAnswer: 2,
      explanation: 'Dashed lines in technical drawings represent hidden edges or features that are not directly visible from the current view.'
    },
    {
      id: 3,
      question: 'When a piece of lumber is labeled 2x4, what is the actual dimension?',
      options: [
        '2 x 4 inches',
        '1.5 x 3.5 inches',
        '2 x 3 inches',
        '1 x 4 inches'
      ],
      correctAnswer: 1,
      explanation: 'A piece of lumber labeled as 2x4 (nominal size) has actual dimensions of 1.5 x 3.5 inches due to planing and drying processes.'
    },
    {
      id: 4,
      question: 'Which tool is best for making precise, straight lines on plywood or MDF without tear-out?',
      options: [
        'Pencil only',
        'Chalk line',
        'Marking knife',
        'Awl'
      ],
      correctAnswer: 2,
      explanation: 'A marking knife creates precise, fine lines that prevent tear-out during cutting on plywood or MDF, making it ideal for furniture or cabinetry.'
    },
    {
      id: 5,
      question: 'Cross-cutting a board involves cutting:',
      options: [
        'Parallel to the grain',
        'Across the grain',
        'At a 45° angle only',
        'Only in MDF or plywood'
      ],
      correctAnswer: 1,
      explanation: 'Cross-cutting involves cutting wood perpendicular to (across) the grain, typically to shorten boards or create precise ends.'
    },
    {
      id: 6,
      question: 'For rip cutting a long board along the grain, which tool is most appropriate for high precision in a workshop?',
      options: [
        'Miter saw',
        'Circular saw without guide',
        'Table saw with rip fence',
        'Backsaw'
      ],
      correctAnswer: 2,
      explanation: 'A table saw with rip fence is the most appropriate tool for high-precision rip cutting in a workshop, offering accurate, straight cuts along the grain.'
    },
    {
      id: 7,
      question: 'When reading a technical drawing, which step should be performed first?',
      options: [
        'Check annotations for materials',
        'Review the title block for scale and project details',
        'Measure every dimension with a ruler',
        'Visualize the project in 3D'
      ],
      correctAnswer: 1,
      explanation: 'The first step when reading a technical drawing should be reviewing the title block, which contains the project name, scale, date, and designer details.'
    },
    {
      id: 8,
      question: 'Which cutting method is used for creating angled joints or bevel edges?',
      options: [
        'Cross-cutting',
        'Rip cutting',
        'Angled cuts',
        'None of the above'
      ],
      correctAnswer: 2,
      explanation: 'Angled cuts, including miters (across the face) and bevels (through the thickness), are used for creating angled joints or decorative edges.'
    },
    {
      id: 9,
      question: 'Why is it important to measure from a fixed reference point rather than previous marks?',
      options: [
        'It makes marking faster',
        'Prevents cumulative errors',
        'Saves material',
        'Reduces the need for tools'
      ],
      correctAnswer: 1,
      explanation: 'Measuring from a fixed reference point prevents cumulative errors that can occur when measuring from previous marks, ensuring accuracy across the entire project.'
    },
    {
      id: 10,
      question: 'Which of the following is a best practice when selecting tools for different cuts in carpentry?',
      options: [
        'Use the same tool for all materials regardless of hardness',
        'Match the tool to the cut type and material',
        'Always use hand tools for accuracy',
        'Choose the cheapest tool available'
      ],
      correctAnswer: 1,
      explanation: 'Matching the tool to the cut type and material ensures precision, safety, and efficiency, as different cuts and materials require specific tools and blade types.'
    }
  ]
};

export default quiz;

