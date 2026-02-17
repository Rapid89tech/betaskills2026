import type { Quiz } from '@/types/course';

export const quiz2: Quiz = {
  id: 'online-trading-module2-quiz',
  title: 'Module 2 Quiz: Trading Instruments Explained',
  description: 'Test your understanding of stocks vs CFDs, forex pairs, commodities, indices, cryptocurrency trading, and leverage and margin concepts.',
  moduleId: 'module2',
  passingScore: 70,
  questions: [
    {
      id: 'q1',
      question: 'What is the main difference between owning stocks and trading CFDs?',
      options: [
        'Stocks are more volatile than CFDs',
        'Stocks provide ownership and dividends, while CFDs are derivative contracts without ownership',
        'CFDs always have lower fees than stocks',
        'There is no difference'
      ],
      correctAnswer: 1,
      explanation: 'Stocks grant full shareholder status with dividends and voting rights, while CFDs are derivative contracts that only profit from price changes without actual ownership of the underlying asset.'
    },
    {
      id: 'q2',
      question: 'Which advantage do CFDs offer over traditional stock ownership?',
      options: [
        'Guaranteed profits',
        'Dividend payments',
        'Ability to use leverage and short-sell without owning the asset',
        'No price movement'
      ],
      correctAnswer: 2,
      explanation: 'CFDs allow traders to use leverage for larger positions with smaller capital and enable short-selling to profit from falling prices, which traditional stock ownership does not permit.'
    },
    {
      id: 'q3',
      question: 'What are "major" forex pairs?',
      options: [
        'Any currency pair with high volatility',
        'Currency pairs that always include the US dollar paired with strong economies',
        'Only European currency pairs',
        'Crosses'
      ],
      correctAnswer: 1,
      explanation: 'Major forex pairs are the most traded liquid combinations that always include USD paired with currencies like EUR, JPY, GBP, AUD, CAD, CHF, or NZD, offering tight spreads and deep liquidity.'
    },
    {
      id: 'q4',
      question: 'What characterizes "exotic" forex pairs?',
      options: [
        'They have the tightest spreads',
        'They only trade during Asian sessions',
        'They pair major currencies with emerging or smaller economy currencies, offering higher volatility and wider spreads',
        'USD pairs only'
      ],
      correctAnswer: 2,
      explanation: 'Exotic pairs involve major currencies paired with emerging or smaller economy currencies (like USD/ZAR or USD/TRY), featuring higher volatility, wider spreads, and lower liquidity than majors or minors.'
    },
    {
      id: 'q5',
      question: 'Why is gold considered a "safe-haven" asset?',
      options: [
        'It always increases in value',
        'It preserves wealth during uncertainty with limited supply and reliable demand',
        'It pays regular dividends',
        'It has no volatility'
      ],
      correctAnswer: 1,
      explanation: 'Gold is considered a safe-haven because it maintains value during economic uncertainty, has limited mining supply, and enjoys reliable demand from institutions and investors seeking wealth preservation.'
    },
    {
      id: 'q6',
      question: 'What makes oil different from gold as a commodity?',
      options: [
        'Oil has no industrial use',
        'Oil is less liquid than gold',
        'Oil has high volatility driven by production decisions, geopolitical events, and demand cycles',
        'They are controlled by central banks'
      ],
      correctAnswer: 2,
      explanation: 'Oil is an energy commodity with high volatility, fluctuating sharply based on OPEC decisions, geopolitical tensions, demand shifts, and supply disruptions, unlike gold\'s more stable safe-haven characteristics.'
    },
    {
      id: 'q7',
      question: 'What does the S&P 500 index track?',
      options: [
        'Only technology companies',
        'Around 500 leading US companies across sectors, representing broad market performance',
        'International stocks only',
        'The dividend received'
      ],
      correctAnswer: 1,
      explanation: 'The S&P 500 tracks approximately 500 leading US companies across various sectors, providing a broad benchmark of American economic health and market performance through market-cap weighting.'
    },
    {
      id: 'q8',
      question: 'What distinguishes the NASDAQ index from the S&P 500?',
      options: [
        'NASDAQ only includes 50 companies',
        'NASDAQ is technology-heavy with growth stocks, offering higher volatility',
        'NASDAQ has no volatility',
        'The leverage ratio'
      ],
      correctAnswer: 1,
      explanation: 'NASDAQ is dominated by technology and growth stocks like tech and biotech companies, making it more volatile with higher potential returns compared to the more diversified S&P 500.'
    },
    {
      id: 'q9',
      question: 'What is a key risk in cryptocurrency trading?',
      options: [
        'No price movement ever occurs',
        'High volatility with sharp price swings from news, sentiment, and regulatory changes',
        'It is completely regulated like traditional stocks',
        'Guaranteed returns'
      ],
      correctAnswer: 1,
      explanation: 'Cryptocurrency trading features high volatility with sharp price swings driven by news events, market sentiment, regulatory announcements, and adoption trends, requiring careful risk management.'
    },
    {
      id: 'q10',
      question: 'What is leverage in trading?',
      options: [
        'A type of stock',
        'The ability to control larger positions with smaller capital through borrowed funds',
        'A guaranteed profit strategy',
        'A type of cryptocurrency'
      ],
      correctAnswer: 1,
      explanation: 'Leverage allows traders to control larger positions with smaller capital outlay by using borrowed funds from brokers, amplifying both potential profits and losses through margin trading.'
    }
  ]
};
