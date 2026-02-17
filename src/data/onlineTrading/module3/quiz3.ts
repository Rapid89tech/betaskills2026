import type { Quiz } from '@/types/course';

export const quiz3: Quiz = {
  id: 'online-trading-module3-quiz',
  title: 'Module 3 Quiz: Market Mechanics & Order Types',
  description: 'Test your understanding of market orders, limit orders, pending orders, stop-loss and take-profit, slippage, liquidity, pips, lots, and spreads.',
  moduleId: 'module3',
  passingScore: 70,
  questions: [
    {
      id: 'q1',
      question: 'What is the main advantage of a market order?',
      options: [
        'It guarantees the best price',
        'It executes immediately at the current market price',
        'It has no slippage risk',
        'It only works during market hours'
      ],
      correctAnswer: 1,
      explanation: 'Market orders execute immediately at the best available current price, ensuring immediate fill but without price guarantees, making them ideal for urgent entries or exits.'
    },
    {
      id: 'q2',
      question: 'What is the key characteristic of a limit order?',
      options: [
        'It executes instantly',
        'It has no expiration',
        'It sets a specific desired price and waits for the market to reach it',
        'It guarantees execution'
      ],
      correctAnswer: 2,
      explanation: 'Limit orders set specific desired price levels and wait patiently for the market to reach them, providing price control but with potential non-execution if the price never arrives.'
    },
    {
      id: 'q3',
      question: 'What type of pending order would you use to enter a long position when price breaks above resistance?',
      options: [
        'Buy limit',
        'Buy stop',
        'Sell stop',
        'Sell limit'
      ],
      correctAnswer: 1,
      explanation: 'A buy stop order triggers purchases when price rises through resistance, anticipating continuation and providing confirmation for uptrend participation without premature entries.'
    },
    {
      id: 'q4',
      question: 'What is the primary purpose of a stop-loss order?',
      options: [
        'To maximize profits',
        'To automatically close losing positions at predetermined levels, protecting capital',
        'To open new positions',
        'To increase leverage'
      ],
      correctAnswer: 1,
      explanation: 'Stop-loss orders automatically close losing positions at predetermined levels, preventing catastrophic drawdowns and ensuring capital preservation through controlled losses.'
    },
    {
      id: 'q5',
      question: 'What is a trailing stop-loss?',
      options: [
        'A stop that never moves',
        'A stop that follows price to protect profits while allowing gains to run',
        'A stop that only works at market close',
        'A guaranteed stop'
      ],
      correctAnswer: 1,
      explanation: 'A trailing stop-loss follows price movements to protect profits, moving with favorable price action while maintaining a set distance, allowing gains to run while protecting against reversals.'
    },
    {
      id: 'q6',
      question: 'What is slippage in trading?',
      options: [
        'The broker commission',
        'The difference between expected execution price and actual filled price',
        'The spread between bid and ask',
        'The leverage ratio'
      ],
      correctAnswer: 1,
      explanation: 'Slippage is the difference between the expected execution price and the actual filled price, occurring when the market moves between order placement and execution, especially during high volatility.'
    },
    {
      id: 'q7',
      question: 'When is slippage most likely to occur?',
      options: [
        'During low volatility periods',
        'During high liquidity with tight spreads',
        'During news releases, market opens, or volatile sessions',
        'Never with limit orders'
      ],
      correctAnswer: 2,
      explanation: 'Slippage occurs most during news releases, market opens, or volatile sessions when prices jump rapidly and order books thin, preventing fills at desired levels.'
    },
    {
      id: 'q8',
      question: 'What characterizes high liquidity in a market?',
      options: [
        'Wide bid-ask spreads',
        'Slow execution',
        'Tight bid-ask spreads and large order sizes filling instantly',
        'High volatility only'
      ],
      correctAnswer: 2,
      explanation: 'High liquidity features tight bid-ask spreads and large order sizes that fill instantly without significantly affecting prices, enabling smooth transactions with minimal slippage.'
    },
    {
      id: 'q9',
      question: 'What is a pip in forex trading?',
      options: [
        'A type of order',
        'The smallest price increment, typically 0.0001 for most currency pairs',
        'A trading strategy',
        'A lot size'
      ],
      correctAnswer: 1,
      explanation: 'A pip is the smallest price increment in forex trading, typically the fourth decimal place (0.0001) for most currency pairs, used to measure price movements and calculate profits or losses.'
    },
    {
      id: 'q10',
      question: 'What is the spread in trading?',
      options: [
        'The difference between stop-loss and take-profit',
        'The difference between bid and ask prices, representing transaction cost',
        'The leverage amount',
        'The lot size'
      ],
      correctAnswer: 1,
      explanation: 'The spread is the difference between the bid (sell) and ask (buy) prices, representing the broker\'s commission and immediate transaction cost that traders must overcome to profit.'
    }
  ]
};
