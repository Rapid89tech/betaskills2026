import type { Quiz } from '@/types/course';

export const module4Quiz: Quiz = {
  id: 4,
  title: 'Module 4 Quiz: Content Creation & Branding',
  duration: '20 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the primary purpose of a visual branding guide?',
        options: [
          'To improve website speed',
          'To ensure consistent and impactful brand identity',
          'To reduce printing costs',
          'To avoid using colors altogether'
        ],
        correct: 1,
        explanation: 'A visual branding guide ensures consistent and impactful brand identity by outlining colors, fonts, and imagery standards that enhance recognition, communicate values, and build trust.'
      },
      {
        question: 'Which emotion is most strongly associated with Brand Blue (#0057B8)?',
        options: [
          'Excitement, energy, and fun',
          'Trust, professionalism, and reliability',
          'Warmth, creativity, and friendliness',
          'Luxury, exclusivity, and mystery'
        ],
        correct: 1,
        explanation: 'Brand Blue (#0057B8) is most strongly associated with trust, professionalism, and reliability, making it ideal for main brand elements like logos and headers.'
      },
      {
        question: 'According to the guidelines, what percentage of designs should use the primary color palette?',
        options: [
          '10–20%',
          '30–40%',
          '70–80%',
          '90–100%'
        ],
        correct: 2,
        explanation: 'The primary color palette should be used for 70-80% of designs, with secondary colors for accents (20-30%) to maintain consistency.'
      },
      {
        question: 'Which secondary color is meant to add energy, creativity, and warmth to designs?',
        options: [
          'Brand White',
          'Sunset Orange (#FF6200)',
          'Slate Gray (#4A4A4A)',
          'Roboto Bold'
        ],
        correct: 1,
        explanation: 'Sunset Orange (#FF6200) is a secondary color meant to add energy, creativity, and warmth to designs as accents, buttons, or highlights.'
      },
      {
        question: 'Which primary font is recommended for headings, subheadings, and body text?',
        options: [
          'Lora',
          'Roboto',
          'Times New Roman',
          'Helvetica'
        ],
        correct: 1,
        explanation: 'Roboto is the primary font recommended for all text types: Roboto Bold for headings, Roboto Medium for subheadings, and Roboto Regular for body text.'
      },
      {
        question: 'Why is Lora used as the secondary font in the branding guide?',
        options: [
          'It improves loading speed on websites',
          'It adds warmth and elegance, balancing Roboto\'s modernity',
          'It is the cheapest licensed font available',
          'It is easier to read than Roboto in small sizes'
        ],
        correct: 1,
        explanation: 'Lora is used as the secondary font because it adds warmth and elegance, contrasting with Roboto\'s modernity for a balanced look in quotes and decorative elements.'
      },
      {
        question: 'What line spacing ratio is recommended for body text to improve readability?',
        options: [
          '1.0x',
          '1.2x',
          '1.5x',
          '2.0x'
        ],
        correct: 2,
        explanation: 'A 1.5x line spacing ratio (line height) is recommended for body text to improve readability and ensure comfortable reading.'
      },
      {
        question: 'What minimum resolution should images have for print use?',
        options: [
          '72 DPI',
          '150 DPI',
          '200 DPI',
          '300 DPI'
        ],
        correct: 3,
        explanation: 'Images should have a minimum resolution of 300 DPI for print use to ensure high-quality, crisp reproduction.'
      },
      {
        question: 'Which of the following is NOT a best practice for imagery in branding?',
        options: [
          'Use authentic, candid photography',
          'Maintain a unified style across all visuals',
          'Add subtle brand elements or watermarks',
          'Mix cartoonish illustrations with realistic photography'
        ],
        correct: 3,
        explanation: 'Mixing cartoonish illustrations with realistic photography is NOT a best practice as it breaks visual consistency. Maintain a unified style across all visuals.'
      },
      {
        question: 'Which tool is suggested for checking color palette accessibility and contrast ratios?',
        options: [
          'Coolors or Adobe Color',
          'Microsoft Word',
          'Google Docs',
          'Excel'
        ],
        correct: 0,
        explanation: 'Coolors or Adobe Color are suggested tools for checking color palette accessibility and contrast ratios to ensure designs meet WCAG standards.'
      }
    ]
  }
};

