import type { Quiz } from '@/types/course';

export const quiz8: Quiz = {
  id: 'quiz8',
  title: 'Module 8 Quiz: Trading Psychology',
  description: 'Test your understanding of trading psychology including fear vs greed, discipline & patience, loss acceptance, revenge trading, building routines, and journaling trades.',
  questions: [
    {
      id: 'q1',
      question: 'In trading psychology, fear most commonly causes a trader to:',
      options: [
        'Increase position size after a win',
        'Hold losing trades longer than planned',
        'Exit winning trades too early',
        'Ignore stop-losses'
      ],
      correctAnswer: 2,
      explanation: 'Fear typically causes traders to exit winning trades too early, fearing reversal and giving back gains, which prevents them from letting winners run according to their plan.'
    },
    {
      id: 'q2',
      question: 'Greed in trading often leads to:',
      options: [
        'Reducing risk after profits',
        'Following strict position sizing rules',
        'Oversized positions and ignoring exit signals',
        'Waiting patiently for confirmation'
      ],
      correctAnswer: 2,
      explanation: 'Greed encourages oversized positions and ignoring exit signals as traders chase more gains without regard for reversals, leading to reckless behavior.'
    },
    {
      id: 'q3',
      question: 'A trader who avoids entering valid setups after a recent loss is primarily influenced by:',
      options: [
        'Discipline',
        'Patience',
        'Fear',
        'Strategy alignment'
      ],
      correctAnswer: 2,
      explanation: 'Fear causes traders to avoid entering valid setups after losses, as they become overly cautious and miss opportunities due to loss aversion.'
    },
    {
      id: 'q4',
      question: 'One effective way to control greed is to:',
      options: [
        'Remove stop-losses',
        'Use predefined risk-to-reward ratios',
        'Increase leverage gradually',
        'Double position sizes after wins'
      ],
      correctAnswer: 1,
      explanation: 'Using predefined risk-to-reward ratios helps control greed by establishing clear profit targets and preventing the temptation to hold positions too long.'
    },
    {
      id: 'q5',
      question: 'Discipline in trading mainly refers to:',
      options: [
        'Trading every market movement',
        'Strict adherence to a predefined trading plan',
        'Avoiding all losses',
        'Increasing trade frequency'
      ],
      correctAnswer: 1,
      explanation: 'Discipline in trading means strict adherence to a predefined trading plan, following rules consistently without emotional overrides.'
    },
    {
      id: 'q6',
      question: 'Patience helps traders to:',
      options: [
        'Force trades in quiet markets',
        'Hold losing trades indefinitely',
        'Wait for high-probability setups',
        'Ignore risk management rules'
      ],
      correctAnswer: 2,
      explanation: 'Patience helps traders wait for high-probability setups that match their criteria, avoiding forced trades in unclear conditions.'
    },
    {
      id: 'q7',
      question: 'Proper loss acceptance means:',
      options: [
        'Trying to recover losses immediately',
        'Viewing losses as normal business expenses',
        'Avoiding all losing trades',
        'Increasing position size after a stop-loss'
      ],
      correctAnswer: 1,
      explanation: 'Proper loss acceptance means viewing losses as normal business expenses rather than personal failures, enabling rational decision-making.'
    },
    {
      id: 'q8',
      question: 'Revenge trading typically occurs when a trader:',
      options: [
        'Takes a break after losses',
        'Reviews their journal carefully',
        'Increases risk impulsively to recover losses',
        'Follows daily loss limits'
      ],
      correctAnswer: 2,
      explanation: 'Revenge trading occurs when traders impulsively increase risk to quickly recover losses, often leading to compounded setbacks.'
    },
    {
      id: 'q9',
      question: 'A structured trading routine helps to reduce:',
      options: [
        'Market volatility',
        'Emotional decision-making',
        'Liquidity risks',
        'Economic uncertainty'
      ],
      correctAnswer: 1,
      explanation: 'A structured trading routine helps reduce emotional decision-making by establishing consistent habits and processes for preparation, execution, and review.'
    },
    {
      id: 'q10',
      question: 'The main purpose of journaling trades is to:',
      options: [
        'Track market news',
        'Record only profits',
        'Identify behavioral patterns and improve performance',
        'Increase trading frequency'
      ],
      correctAnswer: 2,
      explanation: 'The main purpose of journaling trades is to identify behavioral patterns and improve performance through systematic reflection and accountability.'
    }
  ]
};
