import type { Quiz } from '@/types/course';

export const quiz6: Quiz = {
  id: 6,
  title: 'Module 6 Quiz: Payments, Legal, and Operations',
  questions: [
    {
      question: 'Why is it important to offer multiple payment options at checkout?',
      options: [
        'It increases website loading time',
        'It reduces product variety',
        'It allows customers to use their preferred payment method, reducing cart abandonment',
        'It removes the need for security'
      ],
      correct: 2,
      explanation: 'Offering multiple payment options allows customers to use their preferred method, removing friction and significantly reducing cart abandonment rates.'
    },
    {
      question: 'What is the VAT registration threshold in South Africa?',
      options: [
        'R50,000 turnover',
        'R500,000 turnover',
        'R1 million turnover in any 12-month period',
        'R5 million turnover'
      ],
      correct: 2,
      explanation: 'VAT registration becomes mandatory when business turnover exceeds R1 million in any 12-month period in South Africa.'
    },
    {
      question: 'What does the reorder point in inventory management indicate?',
      options: [
        'The maximum stock level allowed',
        'The stock level that triggers a new purchase order',
        'The price at which to reorder',
        'The number of suppliers to use'
      ],
      correct: 1,
      explanation: 'The reorder point is the stock level at which you need to place a new order, calculated based on lead time and sales velocity to prevent stockouts.'
    },
    {
      question: 'What is the recommended return window to build customer trust?',
      options: [
        '7 days',
        '14 to 30 days',
        '60 days',
        '90 days'
      ],
      correct: 1,
      explanation: 'A return window of 14 to 30 days is industry standard and builds strong customer trust while remaining manageable for businesses.'
    },
    {
      question: 'What does 3D Secure authentication do?',
      options: [
        'Encrypts the website',
        'Adds an extra verification layer by redirecting customers to their bank for authentication',
        'Stores customer passwords',
        'Automatically approves all transactions'
      ],
      correct: 1,
      explanation: '3D Secure adds extra verification by redirecting customers to their bank for OTP or biometric confirmation, shifting chargeback liability and reducing fraud.'
    },
    {
      question: 'Which South African payment gateway specializes in instant EFT?',
      options: [
        'PayPal',
        'Stripe',
        'Ozow',
        'Square'
      ],
      correct: 2,
      explanation: 'Ozow is a South African payment gateway that specializes in instant EFT (Electronic Funds Transfer) for fast, secure bank transfers.'
    },
    {
      question: 'What is stock turnover rate?',
      options: [
        'The number of employees managing stock',
        'How many times inventory is sold and replaced in a period',
        'The cost of storing inventory',
        'The number of suppliers used'
      ],
      correct: 1,
      explanation: 'Stock turnover rate measures how many times inventory is sold and replaced during a period, indicating efficiency of inventory management.'
    },
    {
      question: 'What should be included in a transparent shipping cost strategy?',
      options: [
        'Hidden fees revealed only at checkout',
        'No shipping information until after purchase',
        'Clear costs shown early, with no surprise fees at checkout',
        'Random shipping charges'
      ],
      correct: 2,
      explanation: 'Transparent shipping means showing all costs early in the shopping journey with no surprise fees at checkout, which reduces cart abandonment.'
    },
    {
      question: 'What is the purpose of CVV/CVC verification?',
      options: [
        'To store customer card details',
        'To prove possession of the physical card and prevent fraud',
        'To increase transaction fees',
        'To slow down checkout'
      ],
      correct: 1,
      explanation: 'CVV/CVC verification requires the security code from the physical card, proving possession and blocking many fraud attempts using stolen card numbers.'
    },
    {
      question: 'Why should businesses track return reasons?',
      options: [
        'To punish customers who return items',
        'To identify product issues and improve descriptions, reducing future returns',
        'To increase return shipping costs',
        'To eliminate all returns'
      ],
      correct: 1,
      explanation: 'Tracking return reasons provides valuable feedback to identify product issues, improve descriptions, and address quality concerns, ultimately reducing future return rates.'
    }
  ]
};
