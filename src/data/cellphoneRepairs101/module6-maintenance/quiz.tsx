import type { Quiz } from '@/types/course';

export const module6Quiz: Quiz = {
  id: 6,
  title: 'Quiz: Module 6 – Maintenance and Preventive Care',
  duration: '20-25 minutes',
  type: 'quiz',
  content: {
    questions: [
      {
        id: 1,
        question: 'Which of the following charging practices helps extend battery lifespan?',
        type: 'multiple-choice',
        options: [
          'Charging to 100% every time',
          'Letting the battery drop to 0% frequently',
          'Charging between 20% and 80%',
          'Keeping the phone plugged in overnight'
        ],
        correctAnswer: 2,
        explanation: 'Charging between 20% and 80% helps extend battery lifespan by minimizing chemical stress on the lithium-ion cells.'
      },
      {
        id: 2,
        question: 'Why should customers avoid using non-certified chargers?',
        type: 'multiple-choice',
        options: [
          'They charge the phone too slowly',
          'They do not fit properly',
          'They can damage internal components or battery health',
          'They don\'t look nice'
        ],
        correctAnswer: 2,
        explanation: 'Non-certified chargers can damage internal components or battery health due to inconsistent power delivery.'
      },
      {
        id: 3,
        question: 'What tool is best for cleaning charging ports safely?',
        type: 'multiple-choice',
        options: [
          'Paper clip',
          'Water and a cotton swab',
          'Compressed air or a soft brush',
          'Screwdriver'
        ],
        correctAnswer: 2,
        explanation: 'Compressed air or a soft brush is best for cleaning charging ports safely without damaging delicate pins.'
      },
      {
        id: 4,
        question: 'Firmware updates can help with all of the following EXCEPT:',
        type: 'multiple-choice',
        options: [
          'Improving battery performance',
          'Adding new features',
          'Cleaning the phone screen',
          'Fixing software bugs'
        ],
        correctAnswer: 2,
        explanation: 'Firmware updates cannot clean the phone screen; that requires physical cleaning with appropriate tools.'
      },
      {
        id: 5,
        question: 'How can protective cases help with phone maintenance?',
        type: 'multiple-choice',
        options: [
          'They prevent unauthorized access',
          'They improve signal strength',
          'They protect against drops and scratches',
          'They replace the need for cleaning'
        ],
        correctAnswer: 2,
        explanation: 'Protective cases help with phone maintenance by protecting against drops and scratches.'
      },
      {
        id: 6,
        question: 'What is a good way to remind customers about firmware updates?',
        type: 'multiple-choice',
        options: [
          'Tell them not to worry about updates',
          'Set their phones to auto-update',
          'Ask them to check once every few years',
          'Disable their notifications'
        ],
        correctAnswer: 1,
        explanation: 'Setting their phones to auto-update is a good way to remind customers about firmware updates.'
      },
      {
        id: 7,
        question: 'What is the safest method to update firmware on most smartphones?',
        type: 'multiple-choice',
        options: [
          'Jailbreaking the phone',
          'Over-the-Air (OTA) updates via system settings',
          'Removing the battery and reattaching it',
          'Downloading random firmware from the internet'
        ],
        correctAnswer: 1,
        explanation: 'Over-the-Air (OTA) updates via system settings is the safest method to update firmware on most smartphones.'
      },
      {
        id: 8,
        question: 'Why is customer education important in cell phone repair?',
        type: 'multiple-choice',
        options: [
          'It helps sell more expensive parts',
          'It reduces the chance of repeat visits for preventable issues',
          'It gives technicians more free time',
          'It discourages customers from asking questions'
        ],
        correctAnswer: 1,
        explanation: 'Customer education is important because it reduces the chance of repeat visits for preventable issues.'
      },
      {
        id: 9,
        question: 'What should a technician advise if a customer charges their phone overnight daily?',
        type: 'multiple-choice',
        options: [
          'It\'s fine as long as they turn off the Wi-Fi',
          'Recommend stopping to avoid overheating and battery stress',
          'Advise replacing the battery weekly',
          'Suggest using two chargers instead'
        ],
        correctAnswer: 1,
        explanation: 'A technician should recommend stopping overnight charging to avoid overheating and battery stress.'
      },
      {
        id: 10,
        question: 'Which of the following is NOT a reason to educate customers?',
        type: 'multiple-choice',
        options: [
          'Build trust and loyalty',
          'Encourage phone misuse for more repairs',
          'Promote safe usage and maintenance',
          'Prevent common, avoidable damage'
        ],
        correctAnswer: 1,
        explanation: 'Encouraging phone misuse for more repairs is NOT a reason to educate customers; education should prevent issues, not create them.'
      },
      {
        id: 11,
        question: 'What is the primary role of firmware in a smartphone?',
        type: 'multiple-choice',
        options: [
          'To manage user-installed apps',
          'To control hardware components like sensors and the processor',
          'To display the user interface',
          'To clean external ports'
        ],
        correctAnswer: 1,
        explanation: 'The primary role of firmware in a smartphone is to control hardware components like sensors and the processor.'
      },
      {
        id: 12,
        question: 'Which of the following should be done before a firmware update?',
        type: 'multiple-choice',
        options: [
          'Drain the battery completely',
          'Back up all user data',
          'Remove the SIM card',
          'Disable Wi-Fi permanently'
        ],
        correctAnswer: 1,
        explanation: 'Backing up all user data should be done before a firmware update to prevent data loss.'
      },
      {
        id: 13,
        question: 'What can happen if dust accumulates in a phone\'s charging port?',
        type: 'multiple-choice',
        options: [
          'Improved battery life',
          'Intermittent or failed charging',
          'Enhanced signal strength',
          'Faster app performance'
        ],
        correctAnswer: 1,
        explanation: 'If dust accumulates in a phone\'s charging port, it can cause intermittent or failed charging.'
      },
      {
        id: 14,
        question: 'Which type of screen protector offers the best protection against drops?',
        type: 'multiple-choice',
        options: [
          'Plastic film',
          'Tempered glass',
          'Liquid screen protector',
          'Matte film'
        ],
        correctAnswer: 1,
        explanation: 'Tempered glass screen protectors offer the best protection against drops due to their hardness and impact resistance.'
      },
      {
        id: 15,
        question: 'What is a key benefit of educating customers on routine maintenance?',
        type: 'multiple-choice',
        options: [
          'Increasing repair frequency',
          'Building customer trust and loyalty',
          'Reducing the need for accessories',
          'Encouraging device replacement'
        ],
        correctAnswer: 1,
        explanation: 'A key benefit of educating customers on routine maintenance is building customer trust and loyalty.'
      }
    ]
  }
};
