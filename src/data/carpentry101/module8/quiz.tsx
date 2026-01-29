import type { Quiz } from '@/types/course';

const quiz: Quiz = {
  id: 8,
  title: 'Module 8 Quiz: Advanced Carpentry',
  questions: [
    {
      id: 1,
      question: 'Which principle in furniture design prioritizes usability, such as ergonomic seating or efficient storage?',
      options: [
        'Aesthetics',
        'Functionality',
        'Structural Integrity',
        'Precision'
      ],
      correctAnswer: 1,
      explanation: 'Functionality is the principle that prioritizes usability in furniture design, ensuring pieces serve their intended purpose effectively, such as ergonomic seating or efficient storage.'
    },
    {
      id: 2,
      question: 'What is the recommended height range for an ergonomic chair seat?',
      options: [
        '12–14 inches',
        '17–19 inches',
        '20–22 inches',
        '25–27 inches'
      ],
      correctAnswer: 1,
      explanation: 'The recommended height range for an ergonomic chair seat is 17–19 inches, which provides comfortable seating for most adults and proper leg positioning.'
    },
    {
      id: 3,
      question: 'Which joinery technique is commonly used for drawer boxes due to its strength and decorative appeal?',
      options: [
        'Mortise and Tenon',
        'Dovetail',
        'Pocket-Hole Joint',
        'Biscuit Joint'
      ],
      correctAnswer: 1,
      explanation: 'Dovetail joints are commonly used for drawer boxes because they provide excellent strength against pulling forces and showcase decorative craftsmanship when visible.'
    },
    {
      id: 4,
      question: 'In frame and panel construction, why should panels "float" in the grooves without glue?',
      options: [
        'To make assembly faster',
        'To allow for wood movement due to expansion and contraction',
        'To reduce weight',
        'To save on material'
      ],
      correctAnswer: 1,
      explanation: 'Panels should float in grooves without glue to allow for wood movement due to expansion and contraction from moisture changes, preventing warping or cracking.'
    },
    {
      id: 5,
      question: 'Which tool is commonly used to measure and verify squareness when assembling furniture or cabinets?',
      options: [
        'Mallet',
        'Bar Clamp',
        'Try Square',
        'Router'
      ],
      correctAnswer: 2,
      explanation: 'A try square is commonly used to measure and verify that corners are perfectly square (90°) when assembling furniture or cabinets, ensuring proper fit and structural integrity.'
    },
    {
      id: 6,
      question: 'When finishing furniture, what grit of sandpaper is typically used for a smooth, finish-ready surface?',
      options: [
        '80–100',
        '120–220',
        '300–400',
        '500–600'
      ],
      correctAnswer: 1,
      explanation: 'Sandpaper grit of 120–220 is typically used for a smooth, finish-ready surface on furniture, preparing it for staining, oiling, or coating applications.'
    },
    {
      id: 7,
      question: 'What is the purpose of using shims when installing cabinet doors or pre-hung doors?',
      options: [
        'To speed up gluing',
        'To level and plumb the frame',
        'To protect the wood from scratches',
        'To create decorative gaps'
      ],
      correctAnswer: 1,
      explanation: 'Shims are used to level and plumb the frame when installing cabinet doors or pre-hung doors, ensuring proper alignment and smooth operation.'
    },
    {
      id: 8,
      question: 'Which type of wood is recommended for high-end, durable furniture pieces?',
      options: [
        'Pine',
        'MDF',
        'Walnut',
        'Plywood'
      ],
      correctAnswer: 2,
      explanation: 'Walnut (along with other hardwoods like oak and maple) is recommended for high-end, durable furniture pieces due to its density, beautiful grain patterns, and resistance to wear.'
    },
    {
      id: 9,
      question: 'Why is dry-fitting components before gluing considered a best practice?',
      options: [
        'To avoid sanding later',
        'To test alignment, fit, and squareness before permanent assembly',
        'To make finishing easier',
        'To reduce material cost'
      ],
      correctAnswer: 1,
      explanation: 'Dry-fitting allows you to test alignment, fit, and squareness before permanent assembly, identifying and correcting issues before glue sets and makes changes difficult.'
    },
    {
      id: 10,
      question: 'Which joinery method is ideal for quick, concealed connections, often used in face frames?',
      options: [
        'Mortise and Tenon',
        'Dovetail',
        'Pocket-Hole Joint',
        'Box Joint'
      ],
      correctAnswer: 2,
      explanation: 'Pocket-hole joints are ideal for quick, concealed connections in face frames, offering speed and strength while hiding the fasteners from view.'
    }
  ]
};

export default quiz;

