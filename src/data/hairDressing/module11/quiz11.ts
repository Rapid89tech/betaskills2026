import type { QuizLesson } from '@/types/course';

export const module11Quiz: QuizLesson = {
  id: 11,
  title: 'Module 11 Quiz: Chemical Processes in Hairdressing',
  duration: '20 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the primary purpose of perming hair?',
        options: [
          'To straighten the hair permanently',
          'To create curls or waves by altering the hair\'s protein structure',
          'To improve hair\'s natural shine and texture'
        ],
        correct: 1,
        explanation: 'Perming creates curls or waves by altering the hair\'s protein structure through chemical bonds.'
      },
      {
        question: 'Which type of relaxer is known to be more gentle on the scalp?',
        options: [
          'Sodium hydroxide (lye) relaxer',
          'Ammonium thioglycolate relaxer',
          'Calcium hydroxide (no-lye) relaxer'
        ],
        correct: 2,
        explanation: 'Calcium hydroxide (no-lye) relaxers are generally gentler on the scalp compared to lye-based relaxers.'
      },
      {
        question: 'What is a key benefit of a keratin treatment?',
        options: [
          'Permanently straightens the hair',
          'Reduces frizz and adds shine without altering natural curl patterns',
          'Changes the natural hair color'
        ],
        correct: 1,
        explanation: 'Keratin treatments reduce frizz and add shine while maintaining the natural curl pattern, unlike permanent straightening.'
      },
      {
        question: 'What is the main difference between a keratin treatment and a smoothing system?',
        options: [
          'Keratin treatments contain more chemicals than smoothing systems',
          'Smoothing systems provide longer-lasting results than keratin treatments',
          'Smoothing systems tend to be less intense and more temporary than keratin treatments'
        ],
        correct: 2,
        explanation: 'Smoothing systems are gentler and more temporary, typically lasting several weeks, while keratin treatments last longer.'
      },
      {
        question: 'What is the most common issue addressed by color correction?',
        options: [
          'Enhancing natural shine',
          'Fixing unwanted brassy or uneven tones',
          'Completely changing the hair\'s texture'
        ],
        correct: 1,
        explanation: 'Color correction primarily addresses unwanted brassy or uneven tones in hair color.'
      },
      {
        question: 'Which technique is best for neutralizing orange or yellow undertones?',
        options: [
          'Applying a blue or purple-based toner',
          'Using a high-lift permanent color',
          'Adding a filler before lightening'
        ],
        correct: 0,
        explanation: 'Blue or purple-based toners neutralize orange or yellow undertones by counteracting them on the color wheel.'
      },
      {
        question: 'Why is a strand test important before performing chemical treatments?',
        options: [
          'It helps determine the best application method',
          'It shows how the hair will react to the treatment without risking all the hair',
          'It reduces the overall processing time'
        ],
        correct: 1,
        explanation: 'Strand tests predict how hair will react to treatments, preventing damage to all the hair.'
      },
      {
        question: 'What should you always do after applying a relaxer?',
        options: [
          'Rinse and neutralize to stop the chemical process',
          'Apply heat to help the relaxer set',
          'Use a deep conditioning treatment immediately'
        ],
        correct: 0,
        explanation: 'Rinsing and neutralizing stops the chemical process and prevents over-processing or damage.'
      },
      {
        question: 'Which of the following is NOT a key step in color correction?',
        options: [
          'Applying a pre-lightening agent',
          'Strand testing for accurate results',
          'Skipping the conditioning step to avoid altering the new color'
        ],
        correct: 2,
        explanation: 'Conditioning is essential in color correction to maintain hair health and ensure even color application.'
      },
      {
        question: 'When performing a keratin treatment, why is it important to follow the manufacturer\'s instructions carefully?',
        options: [
          'To avoid overprocessing the hair',
          'To ensure the product lasts as long as possible',
          'Both a and b'
        ],
        correct: 2,
        explanation: 'Following instructions prevents overprocessing and ensures optimal, long-lasting results.'
      }
    ]
  }
};
