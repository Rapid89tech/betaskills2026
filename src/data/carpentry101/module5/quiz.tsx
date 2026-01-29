import type { Quiz } from '@/types/course';

const quiz: Quiz = {
  id: 5,
  title: 'Module 5 Quiz: Wood Joints & Joinery',
  questions: [
    {
      id: 1,
      question: 'Which of the following joints is typically used to create strong, decorative corners in furniture or cabinetry?',
      options: [
        'Butt joint',
        'Box joint',
        'Dowel joint',
        'Mortise and tenon'
      ],
      correctAnswer: 1,
      explanation: 'Box joints are typically used to create strong, decorative corners in furniture or cabinetry with their interlocking rectangular fingers that are visually appealing.'
    },
    {
      id: 2,
      question: 'What is the main advantage of a finger joint over a basic butt joint?',
      options: [
        'Decorative appearance',
        'Ability to lengthen short boards',
        'Easier to cut without tools',
        'Requires no glue'
      ],
      correctAnswer: 1,
      explanation: 'The main advantage of a finger joint is its ability to lengthen short boards end-to-end with strong interlocking fingers, making it efficient for creating longer pieces from shorter stock.'
    },
    {
      id: 3,
      question: 'Which tool is primarily used to cut slots for a biscuit joint?',
      options: [
        'Table saw',
        'Biscuit joiner (plate joiner)',
        'Circular saw',
        'Band saw'
      ],
      correctAnswer: 1,
      explanation: 'A biscuit joiner (also called a plate joiner) is specifically designed to cut the crescent-shaped slots needed for biscuit joints.'
    },
    {
      id: 4,
      question: 'Why are box and finger joints considered "advanced" carpentry joints?',
      options: [
        'They require minimal measuring',
        'They provide strength, precision, and often visual appeal',
        'They can be done without clamps or glue',
        'They are only used in construction, not furniture'
      ],
      correctAnswer: 1,
      explanation: 'Box and finger joints are considered advanced because they require precise tools and techniques to provide strength, precision, and often serve as visually striking decorative elements.'
    },
    {
      id: 5,
      question: 'Which material is generally preferred for box joints due to durability and aesthetics?',
      options: [
        'Pine',
        'Oak or maple',
        'MDF only',
        'Softwood plywood'
      ],
      correctAnswer: 1,
      explanation: 'Hardwoods like oak or maple are generally preferred for box joints due to their durability, strength, and attractive grain patterns that enhance the joint\'s aesthetic appeal.'
    },
    {
      id: 6,
      question: 'For what purpose are finger joints most commonly used in construction?',
      options: [
        'Decorative drawer corners',
        'Lengthening lumber for beams or studs',
        'Creating hidden panel connections in furniture',
        'Reinforcing miter joints'
      ],
      correctAnswer: 1,
      explanation: 'In construction, finger joints are most commonly used for lengthening lumber for beams or studs, creating continuous pieces from shorter boards in a cost-effective manner.'
    },
    {
      id: 7,
      question: 'What is a key best practice when using biscuit joints in furniture making?',
      options: [
        'Space biscuits randomly along the joint',
        'Apply glue to both slots and biscuits, clamp evenly',
        'Avoid using any glue for a tighter fit',
        'Only use biscuits for exterior joints'
      ],
      correctAnswer: 1,
      explanation: 'The key best practice is to apply glue to both slots and biscuits and clamp evenly to ensure maximum bond strength and proper alignment of the joint.'
    },
    {
      id: 8,
      question: 'Which joint is generally the most visually striking when left exposed in cabinetry or furniture?',
      options: [
        'Finger joint',
        'Box joint',
        'Biscuit joint',
        'Butt joint'
      ],
      correctAnswer: 1,
      explanation: 'Box joints are generally the most visually striking when left exposed due to their uniform, interlocking rectangular fingers that showcase craftsmanship.'
    },
    {
      id: 9,
      question: 'What is the primary reason for using specialized jigs when cutting box or finger joints?',
      options: [
        'To speed up sanding',
        'To ensure consistent, precise cuts and alignment',
        'To avoid using glue',
        'To make the joint invisible'
      ],
      correctAnswer: 1,
      explanation: 'Specialized jigs ensure consistent, precise cuts and alignment when cutting box or finger joints, which is critical for tight-fitting, strong connections.'
    },
    {
      id: 10,
      question: 'In furniture making, why might a biscuit joint be preferred over a butt joint?',
      options: [
        'It is stronger, provides alignment, and results in a hidden joint',
        'It does not require glue',
        'It is faster to make than a box joint',
        'It is the only joint suitable for hardwood'
      ],
      correctAnswer: 0,
      explanation: 'Biscuit joints are preferred over butt joints in furniture making because they are stronger, provide better alignment of panels, and result in a clean, hidden joint.'
    }
  ]
};

export default quiz;

