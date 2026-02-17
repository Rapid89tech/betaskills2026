import type { Quiz } from '@/types/course';

export const quiz5: Quiz = {
  id: 'quiz5',
  title: 'Module 5 Quiz: Technical Analysis',
  description: 'Test your understanding of technical analysis concepts including candlestick charts, trends, support and resistance, chart patterns, and technical indicators.',
  questions: [
    {
      id: 'q1',
      question: 'Each candlestick on a price chart represents:',
      options: [
        'Only the closing price',
        'Open, High, Low, and Close for a specific period',
        'Trading volume only',
        'Market sentiment only'
      ],
      correctAnswer: 1,
      explanation: 'Each candlestick displays four key price points: the opening price, highest price, lowest price, and closing price for a specific time period.'
    },
    {
      id: 'q2',
      question: 'A long candle body with small shadows typically indicates:',
      options: [
        'Market indecision',
        'Low volatility',
        'Strong directional pressure from buyers or sellers',
        'A guaranteed reversal'
      ],
      correctAnswer: 2,
      explanation: 'A long body with small shadows shows that buyers or sellers dominated decisively during the period, indicating strong directional pressure.'
    },
    {
      id: 'q3',
      question: 'A Doji candle most commonly signals:',
      options: [
        'Strong trend continuation',
        'Market indecision and possible reversal',
        'Immediate breakout',
        'High trading volume'
      ],
      correctAnswer: 1,
      explanation: 'A Doji forms when open and close prices are virtually identical, symbolising market indecision and potentially foreshadowing a reversal.'
    },
    {
      id: 'q4',
      question: 'A hammer pattern appearing after a downtrend suggests:',
      options: [
        'Continuation of bearish momentum',
        'Buyers rejected lower prices and a potential bullish reversal',
        'Market consolidation',
        'Guaranteed profit opportunity'
      ],
      correctAnswer: 1,
      explanation: 'A hammer after a downtrend shows buyers rejected lower prices, suggesting a possible bullish reversal as buying interest emerges.'
    },
    {
      id: 'q5',
      question: 'An uptrend is identified by:',
      options: [
        'Lower highs and lower lows',
        'Equal highs and equal lows',
        'Higher highs and higher lows',
        'Random price movement'
      ],
      correctAnswer: 2,
      explanation: 'An uptrend is characterized by a pattern of higher highs and higher lows, indicating buyers are in control and pushing prices upward.'
    },
    {
      id: 'q6',
      question: 'In a sideways (ranging) market, traders typically:',
      options: [
        'Only buy breakouts',
        'Buy at resistance and sell at support',
        'Buy near support and sell near resistance',
        'Avoid all trading activity'
      ],
      correctAnswer: 2,
      explanation: 'In sideways markets, traders exploit range-bound strategies by buying near support and selling near resistance as prices oscillate within the channel.'
    },
    {
      id: 'q7',
      question: 'When price breaks above a strong resistance level with high volume, this is called a:',
      options: [
        'False breakout',
        'Breakdown',
        'Bullish breakout',
        'Reversal trap'
      ],
      correctAnswer: 2,
      explanation: 'A decisive close above resistance with increased volume signals a bullish breakout, suggesting potential strong upward continuation.'
    },
    {
      id: 'q8',
      question: 'A Head and Shoulders pattern signals:',
      options: [
        'Continuation of an uptrend',
        'Potential bearish reversal after an uptrend',
        'Sideways consolidation',
        'Increased volatility only'
      ],
      correctAnswer: 1,
      explanation: 'The Head and Shoulders is a reliable reversal pattern that signals the end of an uptrend and the potential start of a downtrend.'
    },
    {
      id: 'q9',
      question: 'An RSI reading below 30 generally indicates:',
      options: [
        'Overbought conditions',
        'Strong resistance',
        'Oversold conditions',
        'Trendline breakout'
      ],
      correctAnswer: 2,
      explanation: 'RSI below 30 suggests oversold conditions where selling pressure may have been excessive, potentially leading to bounces as buying interest emerges.'
    },
    {
      id: 'q10',
      question: 'Bollinger Bands narrowing (a squeeze) often suggests:',
      options: [
        'Market closure',
        'Decreasing volatility before a potential breakout',
        'Guaranteed reversal',
        'Strong downtrend continuation'
      ],
      correctAnswer: 1,
      explanation: 'A Bollinger Band squeeze (narrow bands) indicates decreasing volatility and often precedes a significant breakout in either direction.'
    }
  ],
  passingScore: 70,
  timeLimit: 15
};
