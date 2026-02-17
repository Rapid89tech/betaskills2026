import type { Quiz } from '@/types/course';

export const module5Quiz: Quiz = {
  id: 5,
  title: 'Module 5 Quiz: Hygiene, Sanitation, and Safety',
  duration: '20 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the difference between disinfection and sterilization?',
        options: [
          'There is no difference',
          'Disinfection kills most microorganisms; sterilization kills all microorganisms',
          'Sterilization is faster than disinfection',
          'Disinfection is only for surfaces'
        ],
        correct: 1,
        explanation: 'Disinfection kills most (but not all) microorganisms, while sterilization kills all microorganisms including bacterial spores.'
      },
      {
        question: 'What causes "greenies" (Pseudomonas) under nail enhancements?',
        options: [
          'Using green nail polish',
          'Bacterial infection in moist environments',
          'Fungal infection from dirty tools',
          'Allergic reaction to gel'
        ],
        correct: 1,
        explanation: 'Pseudomonas is a bacterial infection that causes green discoloration and thrives in moist environments between the natural nail and enhancement.'
      },
      {
        question: 'How long should tools be immersed in Barbicide for proper disinfection?',
        options: [
          '2 minutes',
          '5 minutes',
          '10 minutes',
          '30 minutes'
        ],
        correct: 2,
        explanation: 'Tools should be fully submerged in Barbicide for the manufacturer\'s recommended time, which is typically 10 minutes.'
      },
      {
        question: 'Which type of glove is best for nail services due to chemical resistance?',
        options: [
          'Latex gloves',
          'Vinyl gloves',
          'Nitrile gloves',
          'Cotton gloves'
        ],
        correct: 2,
        explanation: 'Nitrile gloves are chemical-resistant, latex-free, and ideal for nail services involving chemicals like acrylics and gels.'
      },
      {
        question: 'What should you do if a client has a visible fungal infection?',
        options: [
          'Apply enhancement to cover it',
          'Treat it with antifungal cream',
          'Refuse service and refer to a doctor',
          'Disinfect the area and proceed'
        ],
        correct: 2,
        explanation: 'Never apply enhancements over infected nails. Politely refuse service and refer the client to a doctor for treatment.'
      },
      {
        question: 'Which items should NEVER be reused between clients?',
        options: [
          'Metal nail files',
          'Cuticle nippers',
          'Orangewood sticks and pumice stones',
          'Nail brushes'
        ],
        correct: 2,
        explanation: 'Single-use items like orangewood sticks, pumice stones, disposable files, and toe separators should never be reused.'
      },
      {
        question: 'What is the minimum alcohol concentration needed for effective disinfection?',
        options: [
          '50%',
          '60%',
          '70%',
          '90%'
        ],
        correct: 2,
        explanation: 'Alcohol-based disinfectants should be at least 70% isopropyl alcohol for effective disinfection.'
      },
      {
        question: 'When should you wear a dust mask during nail services?',
        options: [
          'Only when sick',
          'When filing acrylic or gel to avoid inhaling dust',
          'Never necessary',
          'Only during pedicures'
        ],
        correct: 1,
        explanation: 'Dust masks (N95) should be worn when filing acrylic or gel to avoid inhaling airborne particles and dust.'
      },
      {
        question: 'How often should pedicure spa disinfectant solution be replaced?',
        options: [
          'Once a week',
          'Once a month',
          'Daily or when visibly contaminated',
          'Never, just add more'
        ],
        correct: 2,
        explanation: 'Disinfectant solutions like Barbicide should be replaced daily or when visibly contaminated to maintain effectiveness.'
      },
      {
        question: 'What is paronychia?',
        options: [
          'A type of nail polish',
          'Infection of the skin around the nail',
          'A nail shaping technique',
          'A type of nail enhancement'
        ],
        correct: 1,
        explanation: 'Paronychia is an infection of the skin around the nail, causing redness, swelling, and pus, often from bacteria entering through damaged cuticles.'
      }
    ]
  }
};
