import type { Quiz } from '@/types/course';

export const quiz7: Quiz = {
  id: 'quiz7',
  title: 'Module 7 Quiz: Trading Strategies',
  description: 'Test your understanding of various trading strategies including scalping, day trading, swing trading, position trading, trend-following, breakout, and reversal strategies.',
  questions: [
    {
      id: 'q1',
      question: 'Scalping primarily aims to:',
      options: [
        'Capture multi-month macro trends',
        'Profit from tiny price movements through high-frequency trades',
        'Hold positions for dividend income',
        'Trade only based on company fundamentals'
      ],
      correctAnswer: 1,
      explanation: 'Scalping is a high-frequency trading strategy that aims to profit from tiny price movements by executing numerous quick trades held for seconds to minutes.'
    },
    {
      id: 'q2',
      question: 'Which market condition is most suitable for scalping?',
      options: [
        'Low liquidity with wide spreads',
        'Illiquid penny stocks',
        'Highly liquid markets with tight spreads',
        'Markets closed overnight'
      ],
      correctAnswer: 2,
      explanation: 'Scalping thrives in highly liquid markets with tight spreads, which allow for fast execution and minimal slippage on frequent trades.'
    },
    {
      id: 'q3',
      question: 'The main advantage of day trading compared to swing trading is:',
      options: [
        'Lower screen time',
        'Avoidance of overnight risk',
        'Larger long-term trend capture',
        'Dependence on dividends'
      ],
      correctAnswer: 1,
      explanation: 'Day trading closes all positions before market close, eliminating overnight risk from gaps caused by after-hours news or events.'
    },
    {
      id: 'q4',
      question: 'Swing trading typically holds positions for:',
      options: [
        'Seconds to minutes',
        'Minutes to hours only',
        'Several days to weeks',
        'Multiple years'
      ],
      correctAnswer: 2,
      explanation: 'Swing trading captures short- to medium-term price movements by holding positions for several days to weeks.'
    },
    {
      id: 'q5',
      question: 'Position trading relies heavily on:',
      options: [
        'Tick charts and 1-minute signals',
        'Fundamental and macroeconomic analysis',
        'Doji candles only',
        'High-frequency scalping tools'
      ],
      correctAnswer: 1,
      explanation: 'Position trading is a long-term strategy that relies heavily on fundamental and macroeconomic analysis to identify major trends.'
    },
    {
      id: 'q6',
      question: 'A trend-following strategy generally advises traders to:',
      options: [
        'Predict exact market tops and bottoms',
        'Trade against strong momentum',
        'Align trades with the dominant market direction',
        'Close positions within minutes'
      ],
      correctAnswer: 2,
      explanation: 'Trend-following strategies align trades with the dominant market direction, following the principle "the trend is your friend."'
    },
    {
      id: 'q7',
      question: 'In a breakout strategy, confirmation is often strengthened by:',
      options: [
        'Low trading volume',
        'Entering before the level is broken',
        'Increased volume and strong candle closes',
        'Ignoring support and resistance levels'
      ],
      correctAnswer: 2,
      explanation: 'Breakout strategies are confirmed by increased volume and strong candle closes beyond the breakout level, validating genuine momentum.'
    },
    {
      id: 'q8',
      question: 'A reversal strategy commonly uses which signal for confirmation?',
      options: [
        'Higher highs in a strong uptrend',
        'Divergence between price and an oscillator like RSI',
        'Narrow spreads only',
        'Moving average continuation crossovers only'
      ],
      correctAnswer: 1,
      explanation: 'Reversal strategies often use divergence between price and oscillators like RSI to spot momentum weakness and anticipate trend changes.'
    },
    {
      id: 'q9',
      question: 'Which strategy is most suitable for a busy professional with limited screen time?',
      options: [
        'Scalping',
        'High-frequency day trading',
        'Swing trading or position trading',
        'News scalping only'
      ],
      correctAnswer: 2,
      explanation: 'Swing trading and position trading require less screen time and can be analyzed after hours, making them suitable for busy professionals.'
    },
    {
      id: 'q10',
      question: 'Tight stop-losses are most critical in which strategy?',
      options: [
        'Position trading',
        'Long-term investing',
        'Scalping',
        'Dividend investing'
      ],
      correctAnswer: 2,
      explanation: 'Scalping requires tight stop-losses to limit downside per trade and prevent small losses from compounding in high-frequency operations.'
    }
  ]
};
