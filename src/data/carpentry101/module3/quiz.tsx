import type { Quiz } from '@/types/course';

const quiz: Quiz = {
  id: 3,
  title: 'Module 3 Quiz: Materials in Carpentry',
  questions: [
    {
      id: 1,
      question: 'Which of the following correctly distinguishes hardwoods from softwoods?',
      options: [
        'Hardwoods come from coniferous trees; softwoods come from deciduous trees',
        'Hardwoods come from deciduous trees; softwoods come from coniferous trees',
        'Hardwoods are always darker than softwoods',
        'Softwoods are always harder than hardwoods'
      ],
      correctAnswer: 1,
      explanation: 'Hardwoods come from deciduous trees (those that lose their leaves), such as oak and maple, while softwoods come from coniferous trees (evergreens), such as pine and cedar.'
    },
    {
      id: 2,
      question: 'Which property is typically higher in hardwoods compared to softwoods?',
      options: [
        'Cost',
        'Density and hardness',
        'Workability',
        'Growth rate'
      ],
      correctAnswer: 1,
      explanation: 'Hardwoods typically have higher density and hardness compared to softwoods, making them more resistant to wear and damage but harder to work with.'
    },
    {
      id: 3,
      question: 'Straight-grain wood is most suitable for:',
      options: [
        'Decorative veneers',
        'Figured tabletops',
        'Structural components like beams and studs',
        'Burl patterns'
      ],
      correctAnswer: 2,
      explanation: 'Straight-grain wood is ideal for structural components like beams and studs due to its strength, predictability, and ease of working.'
    },
    {
      id: 4,
      question: 'Interlocked or wavy grain in wood can cause:',
      options: [
        'Increased ease of cutting',
        'Tear-out during planing',
        'Decreased visual appeal',
        'Faster drying'
      ],
      correctAnswer: 1,
      explanation: 'Interlocked or wavy grain can cause tear-out during planing due to changing fiber directions, requiring sharp tools and careful technique.'
    },
    {
      id: 5,
      question: 'What is the typical moisture content (MC) for kiln-dried wood used indoors?',
      options: [
        '30–50%',
        '12–20%',
        '6–12%',
        '0–5%'
      ],
      correctAnswer: 2,
      explanation: 'Kiln-dried wood for indoor use typically has a moisture content of 6–12%, ensuring stability and preventing warping in furniture or cabinetry.'
    },
    {
      id: 6,
      question: 'Which of the following is a disadvantage of softwood compared to hardwood?',
      options: [
        'More difficult to cut',
        'Less durable and prone to dents and scratches',
        'More expensive',
        'Limited availability'
      ],
      correctAnswer: 1,
      explanation: 'Softwoods are less durable and more prone to dents and scratches compared to hardwoods, though they are easier to work with and more affordable.'
    },
    {
      id: 7,
      question: 'What does end grain in wood require to prevent splitting or moisture absorption?',
      options: [
        'Cutting against the grain',
        'Sealing with glue or finish',
        'Using only softwoods',
        'Using decorative brackets'
      ],
      correctAnswer: 1,
      explanation: 'End grain should be sealed with glue or finish to prevent cracking or excessive moisture absorption, as it is highly absorbent and prone to splitting.'
    },
    {
      id: 8,
      question: 'Green wood refers to wood that is:',
      options: [
        'Fully dried for indoor use',
        'Freshly cut with high moisture content',
        'Always softwood',
        'Pre-treated with chemicals'
      ],
      correctAnswer: 1,
      explanation: 'Green wood is freshly cut wood with high moisture content (30–200%), prone to shrinking and warping as it dries.'
    },
    {
      id: 9,
      question: 'Which of the following is a correct pairing of wood type and typical application?',
      options: [
        'Hardwood – framing and roofing',
        'Softwood – furniture and decorative cabinetry',
        'Hardwood – furniture and high-end cabinetry',
        'Softwood – luxury flooring'
      ],
      correctAnswer: 2,
      explanation: 'Hardwoods are typically used for furniture and high-end cabinetry due to their durability and aesthetic appeal, while softwoods are used for construction framing.'
    },
    {
      id: 10,
      question: 'Why is it important to acclimate wood to the project environment before use?',
      options: [
        'To make it softer',
        'To match the equilibrium moisture content (EMC) and reduce warping',
        'To change its grain pattern',
        'To reduce density'
      ],
      correctAnswer: 1,
      explanation: 'Acclimating wood to the project environment helps it match the equilibrium moisture content (EMC), minimizing movement, warping, or joint failure after construction.'
    }
  ]
};

export default quiz;

