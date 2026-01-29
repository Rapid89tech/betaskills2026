import type { Quiz } from '@/types/course';

export const module3Quiz: Quiz = {
  id: 6,
  title: 'Module 3 Quiz: Legal Considerations and Business Structure',
  duration: '20 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the main purpose of registering your business name?',
        options: [
          'To pay taxes',
          'To legally protect your brand and name',
          'To hire employees',
          'To increase sales'
        ],
        correct: 1,
        explanation: 'Registering your business name with the CIPC ensures legal protection, builds brand identity, and supports professional operations like banking.'
      },
      {
        question: 'Which government body is commonly responsible for business registration in South Africa?',
        options: [
          'SARS',
          'CIPC',
          'UIF',
          'BBBEE Commission'
        ],
        correct: 1,
        explanation: 'The Companies and Intellectual Property Commission (CIPC) oversees business registration in South Africa, issuing certificates for legal recognition.'
      },
      {
        question: 'What does VAT stand for?',
        options: [
          'Value Added Tax',
          'Variable Asset Tax',
          'Value Allocation Tax',
          'Verified Annual Tax'
        ],
        correct: 0,
        explanation: 'VAT is a consumption tax on goods and services, mandatory for businesses exceeding a turnover threshold like R1 million in South Africa.'
      },
      {
        question: 'When is a business required to register for VAT?',
        options: [
          'When the business hires employees',
          'When the business turnover exceeds a specific threshold',
          'When the business opens a bank account',
          'When the business is a sole proprietorship'
        ],
        correct: 1,
        explanation: 'Businesses must register for VAT with SARS when annual turnover exceeds R1 million, ensuring compliance with tax regulations.'
      },
      {
        question: 'Which of the following is NOT a common type of business structure?',
        options: [
          'Sole Proprietorship',
          'Partnership',
          'Corporation',
          'Monopoly'
        ],
        correct: 3,
        explanation: 'A monopoly is a market condition, not a business structure; valid structures include Sole Proprietorship, Partnership, and Corporation.'
      },
      {
        question: 'What is the purpose of a business license?',
        options: [
          'To increase the business\'s revenue',
          'To legally authorize certain business activities',
          'To protect the business name',
          'To reduce taxes'
        ],
        correct: 1,
        explanation: 'Licenses, like trading or health permits, ensure compliance with regulations, protecting public safety and enabling legal operations.'
      },
      {
        question: 'Which document do you need to open a business bank account?',
        options: [
          'Business registration certificate',
          'Employee contract',
          'VAT invoice',
          'Trade license'
        ],
        correct: 0,
        explanation: 'A CIPC-issued registration certificate is required to open a business bank account, proving legal establishment.'
      },
      {
        question: 'What is PAYE?',
        options: [
          'A tax on imported goods',
          'A tax withheld from employee salaries',
          'A tax on company profits',
          'A license fee'
        ],
        correct: 1,
        explanation: 'PAYE (Pay-As-You-Earn) is deducted from employee salaries and remitted to SARS, ensuring tax compliance for employers.'
      },
      {
        question: 'Which intellectual property protects your company\'s logo?',
        options: [
          'Patent',
          'Trademark',
          'Copyright',
          'Trade secret'
        ],
        correct: 1,
        explanation: 'A trademark protects a company\'s logo, ensuring exclusive brand identity and preventing competitor misuse.'
      },
      {
        question: 'What can happen if a business fails to comply with legal and tax obligations?',
        options: [
          'Increased profits',
          'Fines, penalties, or closure',
          'Government grants',
          'Free marketing'
        ],
        correct: 1,
        explanation: 'Non-compliance with legal and tax obligations risks financial penalties, legal action, or business closure, harming reputation.'
      }
    ]
  }
}; 
