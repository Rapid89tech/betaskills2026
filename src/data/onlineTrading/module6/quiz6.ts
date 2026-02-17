import type { Quiz } from '@/types/course';

export const quiz6: Quiz = {
  id: 'quiz6',
  title: 'Module 6 Quiz: Risk Management',
  description: 'Test your understanding of risk management concepts including risk-to-reward ratios, position sizing, capital preservation, drawdown management, and trading psychology.',
  questions: [
    {
      id: 'q1',
      question: 'A risk-to-reward ratio of 1:3 means:',
      options: [
        'Risking 3 units to make 1',
        'Risking 1 unit to potentially gain 3',
        'Winning 3 trades out of 1',
        'Losing 3 trades out of 1'
      ],
      correctAnswer: 1,
      explanation: 'A 1:3 risk-to-reward ratio means you are risking 1 unit of capital to potentially gain 3 units, providing favorable asymmetric returns.'
    },
    {
      id: 'q2',
      question: 'If a trader risks R1,000 on a trade with a 1:2 risk-to-reward ratio, the profit target should be:',
      options: [
        'R500',
        'R1,000',
        'R2,000',
        'R3,000'
      ],
      correctAnswer: 2,
      explanation: 'With a 1:2 ratio, if you risk R1,000, your profit target should be R2,000 (twice the risk amount).'
    },
    {
      id: 'q3',
      question: 'A strategy with a 40% win rate can still be profitable if:',
      options: [
        'The trader avoids stop-losses',
        'The risk-to-reward ratio is favourable (e.g., 1:3)',
        'The trader increases position size after losses',
        'Every trade uses maximum leverage'
      ],
      correctAnswer: 1,
      explanation: 'Even with a 40% win rate, a favorable risk-to-reward ratio like 1:3 can generate strong returns because winners significantly outweigh losers.'
    },
    {
      id: 'q4',
      question: 'Position sizing is primarily used to:',
      options: [
        'Increase trade frequency',
        'Maximise leverage',
        'Control how much capital is risked per trade',
        'Predict market direction'
      ],
      correctAnswer: 2,
      explanation: 'Position sizing determines how much capital to allocate to each trade, controlling risk exposure and preventing any single trade from causing significant damage.'
    },
    {
      id: 'q5',
      question: 'If stop-loss distance increases, proper position sizing requires:',
      options: [
        'Increasing position size',
        'Keeping size unchanged',
        'Reducing position size',
        'Removing the stop-loss'
      ],
      correctAnswer: 2,
      explanation: 'A wider stop-loss requires a smaller position size to maintain the same risk amount, keeping total risk constant.'
    },
    {
      id: 'q6',
      question: 'Capital preservation focuses on:',
      options: [
        'Aggressive compounding',
        'Avoiding large losses to protect core capital',
        'Trading every opportunity',
        'Maximising win rate only'
      ],
      correctAnswer: 1,
      explanation: 'Capital preservation prioritizes protecting the original capital base from substantial erosion by avoiding large losses rather than chasing high returns.'
    },
    {
      id: 'q7',
      question: 'A 50% drawdown requires approximately what percentage gain to recover to break even?',
      options: [
        '25%',
        '50%',
        '75%',
        '100%'
      ],
      correctAnswer: 3,
      explanation: 'A 50% drawdown requires a 100% gain to recover. If you lose 50% of R100 (down to R50), you need to gain 100% of R50 to get back to R100.'
    },
    {
      id: 'q8',
      question: 'Overtrading is best prevented by:',
      options: [
        'Trading more frequently to recover losses',
        'Setting daily trade limits and requiring justification for each trade',
        'Increasing position sizes',
        'Ignoring stop-losses'
      ],
      correctAnswer: 1,
      explanation: 'Setting clear trade limits and requiring documented justification for each trade helps prevent emotional, impulsive overtrading.'
    },
    {
      id: 'q9',
      question: 'Fear and greed in trading psychology typically lead to:',
      options: [
        'Better decision-making',
        'Premature exits or oversized positions',
        'Guaranteed profits',
        'Reduced market volatility'
      ],
      correctAnswer: 1,
      explanation: 'Fear causes premature exits and missed profits, while greed encourages oversized positions and holding too long, both distorting rational judgment.'
    },
    {
      id: 'q10',
      question: 'Emotional discipline in trading is best maintained through:',
      options: [
        'Ignoring all trading rules',
        'Pre-defined rules, journaling, and taking breaks after significant events',
        'Trading based on gut feelings',
        'Avoiding all risk management'
      ],
      correctAnswer: 1,
      explanation: 'Emotional discipline requires pre-defined rules, regular journaling to process emotions, and mandatory breaks to prevent impulsive decisions.'
    }
  ],
  passingScore: 70,
  timeLimit: 15
};
