import type { Quiz } from '@/types/course';

const quiz: Quiz = {
  id: 7,
  title: 'Module 7 Quiz: Sanding and Smoothing Techniques',
  questions: [
    {
      id: 1,
      question: 'What is the main purpose of sanding in carpentry?',
      options: [
        'To color the wood',
        'To remove imperfections and prepare surfaces for finishes',
        'To make wood heavier',
        'To attach nails more easily'
      ],
      correctAnswer: 1,
      explanation: 'The main purpose of sanding is to remove imperfections, tool marks, and rough grain to prepare surfaces for finishes like staining, painting, or sealing.'
    },
    {
      id: 2,
      question: 'Which grit sandpaper is typically used for the final pre-finish sanding?',
      options: [
        '60–80',
        '120–150',
        '180–220',
        '320–400'
      ],
      correctAnswer: 2,
      explanation: '180–220 grit sandpaper is typically used for final pre-finish sanding to achieve a smooth surface ready for staining, oiling, or coating.'
    },
    {
      id: 3,
      question: 'Why should sanding always follow the grain of the wood?',
      options: [
        'To speed up sanding',
        'To prevent scratches and tear-out',
        'To make the wood shiny',
        'To reduce sanding dust'
      ],
      correctAnswer: 1,
      explanation: 'Sanding along the grain prevents scratches and tear-out that would be visible in the finished surface, ensuring a smooth, professional result.'
    },
    {
      id: 4,
      question: 'Which tool is best for smoothing large flat panels efficiently?',
      options: [
        'Detail sander',
        'Random orbital sander',
        'Hand scraper',
        'Spokeshave'
      ],
      correctAnswer: 1,
      explanation: 'A random orbital sander is best for smoothing large flat panels efficiently, as its circular motion with random pattern minimizes swirl marks while covering large areas quickly.'
    },
    {
      id: 5,
      question: 'What is a hand scraper mainly used for?',
      options: [
        'Rapid material removal on softwoods',
        'Removing fine shavings and smoothing tear-out on hardwoods',
        'Sanding large panels quickly',
        'Polishing finished surfaces'
      ],
      correctAnswer: 1,
      explanation: 'A hand scraper is mainly used for removing fine shavings and smoothing tear-out on hardwoods or figured grain where sandpaper might clog or cause further issues.'
    },
    {
      id: 6,
      question: 'Which sanding tool is specifically designed for tight corners and intricate moldings?',
      options: [
        'Drum sander',
        'Belt sander',
        'Detail sander',
        'Random orbital sander'
      ],
      correctAnswer: 2,
      explanation: 'A detail sander with its small, triangular sanding pad is specifically designed for tight corners and intricate moldings in cabinetry or furniture work.'
    },
    {
      id: 7,
      question: 'Why is it important to progress through sandpaper grits (e.g., 80 → 120 → 220)?',
      options: [
        'To make sanding faster',
        'To reduce dust buildup',
        'To systematically remove scratches from coarser grits and achieve smoothness',
        'To make the wood harder'
      ],
      correctAnswer: 2,
      explanation: 'Progressing through grits systematically removes scratches from coarser grits and achieves smoothness, as each finer grit removes the scratches left by the previous grit.'
    },
    {
      id: 8,
      question: 'When using a belt sander, what is the recommended technique to avoid gouging the wood?',
      options: [
        'Keep the sander stationary',
        'Apply maximum pressure and slow movement',
        'Keep the sander moving along the grain with light pressure',
        'Sand against the grain'
      ],
      correctAnswer: 2,
      explanation: 'Keeping the belt sander moving along the grain with light pressure prevents gouging, as belt sanders are aggressive and can remove material quickly if held in one spot.'
    },
    {
      id: 9,
      question: 'For ultra-smooth finishes between coats of varnish, which abrasive is commonly used?',
      options: [
        '60 grit sandpaper',
        '0000 steel wool',
        'Belt sander',
        'Detail sander'
      ],
      correctAnswer: 1,
      explanation: '0000 steel wool (very fine) is commonly used between coats of varnish to achieve ultra-smooth finishes without removing the coating, just smoothing any dust nibs or imperfections.'
    },
    {
      id: 10,
      question: 'What is a key safety precaution when sanding or smoothing wood?',
      options: [
        'Sand faster for better finish',
        'Wear safety glasses, dust mask, and hearing protection',
        'Use wet wood to reduce dust',
        'Avoid sanding along the grain'
      ],
      correctAnswer: 1,
      explanation: 'Wearing safety glasses, dust mask (N95 or better), and hearing protection is essential when sanding to protect against flying debris, fine dust particles, and noise from power sanders.'
    }
  ]
};

export default quiz;

