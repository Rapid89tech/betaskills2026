import type { Quiz } from '@/types/course';

export const quiz1: Quiz = {
  id: 'online-trading-module1-quiz',
  title: 'Module 1 Quiz: Introduction to Financial Markets',
  description: 'Test your understanding of financial markets, market types, participants, online trading, brokers, and global trading sessions.',
  moduleId: 'module1',
  passingScore: 70,
  questions: [
    {
      id: 'q1',
      question: 'What is the primary purpose of financial markets?',
      options: [
        'To eliminate economic risk',
        'To allow only governments to raise money',
        'To enable buying and selling of financial instruments and allocate capital efficiently',
        'To control global currencies'
      ],
      correctAnswer: 2,
      explanation: 'Financial markets enable the buying and selling of financial instruments and allocate capital efficiently by connecting those with surplus funds to those who need capital.'
    },
    {
      id: 'q2',
      question: 'Which of the following is one of the three core functions of financial markets?',
      options: [
        'Tax collection',
        'Price discovery',
        'Currency printing',
        'Salary regulation'
      ],
      correctAnswer: 1,
      explanation: 'Price discovery is one of the three core functions of financial markets, along with capital allocation and liquidity provision.'
    },
    {
      id: 'q3',
      question: 'When a company issues shares to raise funds for expansion, this is an example of:',
      options: [
        'Liquidity provision',
        'Capital allocation',
        'Currency exchange',
        'Hedging'
      ],
      correctAnswer: 1,
      explanation: 'Capital allocation is the process where companies raise funds by issuing stocks or bonds to investors in exchange for ownership stakes or fixed returns.'
    },
    {
      id: 'q4',
      question: 'Which market is primarily used for trading ownership shares in publicly listed companies?',
      options: [
        'Bond market',
        'Forex market',
        'Stock (equity) market',
        'Money market'
      ],
      correctAnswer: 2,
      explanation: 'Stock (equity) markets enable the buying and selling of ownership shares in publicly listed companies.'
    },
    {
      id: 'q5',
      question: 'What is the primary platform for trading shares in South Africa?',
      options: [
        'London Stock Exchange',
        'Johannesburg Stock Exchange (JSE)',
        'New York Stock Exchange',
        'Derivatives market'
      ],
      correctAnswer: 1,
      explanation: 'The Johannesburg Stock Exchange (JSE) is the primary stock market in South Africa where shares of major companies are traded in rands.'
    },
    {
      id: 'q6',
      question: 'What is the main difference between primary and secondary markets?',
      options: [
        'Primary markets trade stocks, secondary markets trade bonds',
        'Primary markets are for institutions only',
        'Primary markets issue new securities, secondary markets trade existing securities',
        'There is no difference'
      ],
      correctAnswer: 2,
      explanation: 'Primary markets are where new securities are issued directly to investors, while secondary markets are where existing securities are traded among investors.'
    },
    {
      id: 'q7',
      question: 'Which type of market participant manages substantial pools of capital on behalf of beneficiaries or clients?',
      options: [
        'Retail traders',
        'Hedge funds',
        'Brokers',
        'Institutions'
      ],
      correctAnswer: 3,
      explanation: 'Institutions such as pension funds, insurance companies, and asset management firms manage substantial pools of capital on behalf of many beneficiaries or clients.'
    },
    {
      id: 'q8',
      question: 'What is the primary role of central banks like the South African Reserve Bank (SARB) in financial markets?',
      options: [
        'To maximize trading profits',
        'To compete with retail traders',
        'To implement monetary policy and maintain economic stability',
        'To control stock exchanges'
      ],
      correctAnswer: 2,
      explanation: 'Central banks participate in financial markets primarily to implement monetary policy, maintain economic stability, and manage foreign reserves.'
    },
    {
      id: 'q9',
      question: 'Which global trading session is known for having the highest forex volume globally?',
      options: [
        'Asia session',
        'London session',
        'New York session',
        'Weekend session'
      ],
      correctAnswer: 1,
      explanation: 'The London session is known as the European liquidity powerhouse with the highest forex volume globally, especially when overlapping with other sessions.'
    },
    {
      id: 'q10',
      question: 'What happens during session overlaps like London-New York?',
      options: [
        'Markets close temporarily',
        'Trading volume decreases',
        'Highest volatility and liquidity occur with tight spreads',
        'Only commodities are traded'
      ],
      correctAnswer: 2,
      explanation: 'Session overlaps like London-New York create the highest volatility windows with massive volume and tight spreads, providing prime trading opportunities.'
    }
  ]
};
