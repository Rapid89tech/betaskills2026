import type { Quiz } from '@/types/course';

const quiz: Quiz = {
  id: 9,
  title: 'Module 9 Quiz: Business & Professional Practice',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is one key benefit of combining grooming and training services in a single business?',
        options: [
          'It reduces the need for certifications',
          'It creates multiple revenue streams',
          'It eliminates the need for insurance',
          'It shortens setup time'
        ],
        correct: 1,
        explanation: 'Combining grooming and training services creates multiple revenue streams, allowing businesses to offer diverse services and increase profitability.'
      },
      {
        question: 'Which professional organizations set standards for grooming and training practices?',
        options: [
          'AKC and CFA',
          'CCPDT and NDGAA',
          'WHO and CDC',
          'USDA and FDA'
        ],
        correct: 1,
        explanation: 'The Certification Council for Professional Dog Trainers (CCPDT) and National Dog Groomers Association of America (NDGAA) set professional standards for grooming and training practices.'
      },
      {
        question: 'Which of the following is essential grooming equipment?',
        options: [
          'Clicker and treats',
          'Grooming table with non-slip mat',
          'Training cones and mats',
          'Crates and Adaptil diffuser'
        ],
        correct: 1,
        explanation: 'A grooming table with a non-slip mat is essential grooming equipment for safe and efficient grooming sessions.'
      },
      {
        question: 'Why is liability insurance important for a grooming and training business?',
        options: [
          'It covers marketing expenses',
          'It protects against accidents or injuries',
          'It replaces grooming tools annually',
          'It pays for social media ads'
        ],
        correct: 1,
        explanation: 'Liability insurance protects the business against accidents or injuries, providing financial protection and legal coverage.'
      },
      {
        question: 'Which certification enhances credibility for dog trainers?',
        options: [
          'NDGAA',
          'CCPDT',
          'USDA',
          'CFA'
        ],
        correct: 1,
        explanation: 'The Certification Council for Professional Dog Trainers (CCPDT) certification enhances credibility for dog trainers.'
      },
      {
        question: 'What is one example of effective marketing for a grooming and training business?',
        options: [
          'Posting before-and-after grooming photos on social media',
          'Avoiding online promotion to reduce workload',
          'Offering services without clear pricing',
          'Limiting outreach to only one client per week'
        ],
        correct: 0,
        explanation: 'Posting before-and-after grooming photos on social media is an effective marketing strategy that showcases expertise and attracts clients.'
      },
      {
        question: 'What should be included in the facility setup to ensure safety and hygiene?',
        options: [
          'Non-slip flooring and pet-safe disinfectants',
          'Regular paint upgrades and scented candles',
          'Televisions and loud music',
          'Carpeting and air fresheners'
        ],
        correct: 0,
        explanation: 'Non-slip flooring and pet-safe disinfectants are essential for ensuring safety and hygiene in a grooming and training facility.'
      },
      {
        question: 'Why is continuing education important for groomers and trainers?',
        options: [
          'To reduce costs on equipment',
          'To stay updated on best practices and techniques',
          'To avoid interacting with clients',
          'To increase social media followers'
        ],
        correct: 1,
        explanation: 'Continuing education is important to stay updated on best practices and techniques, ensuring professional growth and quality service delivery.'
      },
      {
        question: 'Which breed group is especially prone to ear infections, requiring extra grooming care?',
        options: [
          'Herding breeds',
          'Sporting breeds',
          'Terrier breeds',
          'Toy breeds'
        ],
        correct: 1,
        explanation: 'Sporting breeds, such as Labrador Retrievers and Golden Retrievers, are especially prone to ear infections due to their floppy ears, requiring extra grooming care.'
      },
      {
        question: 'What is a key ethical principle emphasized in a grooming and training business?',
        options: [
          'Using punishment for fast results',
          'Prioritizing speed over welfare',
          'Using positive reinforcement methods',
          'Offering services without client input'
        ],
        correct: 2,
        explanation: 'Using positive reinforcement methods is a key ethical principle that ensures humane treatment and promotes dog welfare in grooming and training businesses.'
      }
    ]
  }
};

export default quiz;

