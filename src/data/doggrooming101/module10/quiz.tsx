import type { Quiz } from '@/types/course';

const quiz: Quiz = {
  id: 10,
  title: 'Module 10 Quiz: Practical Workshop & Assessment',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'Why is hands-on grooming practice essential for professional dog groomers?',
        options: [
          'To reduce the cost of grooming supplies',
          'To master techniques for various breeds and coat types while ensuring dog comfort',
          'To avoid using grooming tables',
          'To teach dogs tricks'
        ],
        correct: 1,
        explanation: 'Hands-on grooming practice is essential to master techniques for various breeds and coat types while ensuring dog comfort, building professional skills, and meeting client expectations.'
      },
      {
        question: 'Which tool is most suitable for detangling long, silky coats without causing pain?',
        options: [
          'Nail clippers',
          'Slicker brush and comb',
          'High-velocity dryer only',
          'Safety-tip shears'
        ],
        correct: 1,
        explanation: 'A slicker brush and comb are most suitable for detangling long, silky coats, starting at the tips to avoid pain and using positive reinforcement to reward cooperation.'
      },
      {
        question: 'How often should a Poodle\'s curly coat typically be brushed to prevent matting?',
        options: [
          'Once a week',
          'Every 2–3 weeks',
          'Daily',
          'Only before competitions'
        ],
        correct: 2,
        explanation: 'A Poodle\'s curly coat should be brushed daily to prevent matting, as curly coats are dense and prone to tangling.'
      },
      {
        question: 'Which grooming technique is recommended for a German Shepherd\'s double coat?',
        options: [
          'Hand-stripping with a stripping knife',
          'Use of an undercoat rake to remove loose undercoat',
          'Shaving the entire coat',
          'Only brushing the topcoat'
        ],
        correct: 1,
        explanation: 'An undercoat rake is recommended for a German Shepherd\'s double coat to remove loose undercoat, as shaving can damage the coat\'s insulating properties.'
      },
      {
        question: 'What is the main purpose of using positive reinforcement during grooming?',
        options: [
          'To make grooming sessions longer',
          'To reduce stress and encourage cooperation',
          'To avoid bathing the dog',
          'To prevent shedding'
        ],
        correct: 1,
        explanation: 'The main purpose of using positive reinforcement during grooming is to reduce stress and encourage cooperation, building trust and making the experience more pleasant for the dog.'
      },
      {
        question: 'Which coat type requires hand-stripping to maintain texture?',
        options: [
          'Short, smooth coats',
          'Wire coats (e.g., Schnauzer, Jack Russell Terrier)',
          'Curly, woolly coats',
          'Double coats'
        ],
        correct: 1,
        explanation: 'Wire coats, such as those found on Schnauzers and Jack Russell Terriers, require hand-stripping to maintain their characteristic coarse, wiry texture.'
      },
      {
        question: 'What is the recommended frequency for trimming nails in dogs with long, silky coats?',
        options: [
          'Every 6–8 weeks',
          'Every 2–4 weeks',
          'Only when they break',
          'Daily'
        ],
        correct: 1,
        explanation: 'Nails should be trimmed every 2–4 weeks for dogs with long, silky coats to prevent overgrowth and maintain mobility.'
      },
      {
        question: 'Which of the following is a safe practice to prevent injuries during grooming?',
        options: [
          'Using any sharp tool without supervision',
          'Securing dogs on non-slip tables with grooming loops',
          'Clipping mats without checking skin',
          'Grooming multiple dogs at the same time on one table'
        ],
        correct: 1,
        explanation: 'Securing dogs on non-slip tables with grooming loops is a safe practice that prevents falls and injuries during grooming sessions.'
      },
      {
        question: 'When dealing with a matted coat that is severe, what is the recommended approach?',
        options: [
          'Pull the mat out with fingers quickly',
          'Shave under the mats in small sections using clippers and reward the dog',
          'Leave the mat and brush around it',
          'Use a regular brush only'
        ],
        correct: 1,
        explanation: 'For severe matting, the recommended approach is to shave under the mats in small sections using clippers and reward the dog for cooperation, as pulling can cause pain and injury.'
      },
      {
        question: 'Which breeds are most likely to require deshedding tools due to heavy shedding?',
        options: [
          'Beagles and Chihuahuas',
          'German Shepherds and Golden Retrievers',
          'Poodles and Soft Coated Wheaten Terriers',
          'Bulldogs and Pomeranians'
        ],
        correct: 1,
        explanation: 'German Shepherds and Golden Retrievers are most likely to require deshedding tools due to their heavy shedding, especially during seasonal coat changes.'
      }
    ]
  }
};

export default quiz;

