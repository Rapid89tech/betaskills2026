import type { Quiz } from '@/types/course';

export const quiz4: Quiz = {
  id: 'quiz4',
  title: 'Module 4 Quiz: Fundamental Analysis',
  description: 'Test your understanding of fundamental analysis concepts including economic indicators, central bank policies, earnings reports, geopolitical risk, and reading economic calendars.',
  questions: [
    {
      id: 'q1',
      question: 'What does GDP primarily measure?',
      options: [
        'The total tax collected by government',
        'The total value of goods and services produced within a country',
        'The number of employed citizens',
        'The inflation rate'
      ],
      correctAnswer: 1,
      explanation: 'GDP (Gross Domestic Product) measures the total value of all final goods and services produced within a country over a specific period.'
    },
    {
      id: 'q2',
      question: 'If South Africa\'s GDP is rising strongly, what is the most likely market reaction?',
      options: [
        'The rand weakens immediately',
        'Investor confidence improves and JSE shares may rise',
        'Interest rates automatically fall',
        'Inflation disappears'
      ],
      correctAnswer: 1,
      explanation: 'Strong GDP growth typically boosts investor confidence, strengthens the rand, and drives gains in JSE-listed shares, particularly in cyclical sectors.'
    },
    {
      id: 'q3',
      question: 'The Consumer Price Index (CPI) is mainly used to measure:',
      options: [
        'Employment growth',
        'Currency supply',
        'Inflation',
        'Export volumes'
      ],
      correctAnswer: 2,
      explanation: 'The CPI tracks the average change in prices paid by consumers for goods and services, measuring the rate of inflation.'
    },
    {
      id: 'q4',
      question: 'If inflation rises above the SARB target range, the SARB is most likely to:',
      options: [
        'Lower interest rates',
        'Increase the repo rate',
        'Print more money',
        'Suspend trading on the JSE'
      ],
      correctAnswer: 1,
      explanation: 'When inflation rises above target, the SARB typically increases the repo rate to cool demand and curb inflationary pressures.'
    },
    {
      id: 'q5',
      question: 'Higher interest rates in South Africa generally:',
      options: [
        'Reduce borrowing and may strengthen the rand',
        'Increase consumer spending',
        'Automatically boost stock prices',
        'Eliminate unemployment'
      ],
      correctAnswer: 0,
      explanation: 'Higher interest rates make borrowing more expensive, curbing spending and inflation, while typically strengthening the rand through capital inflows.'
    },
    {
      id: 'q6',
      question: 'When a company listed on the JSE reports Earnings Per Share (EPS) above expectations, the stock price will most likely:',
      options: [
        'Fall sharply',
        'Remain unchanged',
        'Increase due to positive sentiment',
        'Be suspended from trading'
      ],
      correctAnswer: 2,
      explanation: 'When actual EPS exceeds expectations (an "earnings beat"), it typically triggers buying interest and lifts the share price.'
    },
    {
      id: 'q7',
      question: 'Geopolitical conflicts often cause investors to:',
      options: [
        'Increase risk exposure in emerging markets',
        'Move capital to safer assets',
        'Ignore currency markets',
        'Increase inflation automatically'
      ],
      correctAnswer: 1,
      explanation: 'Geopolitical conflicts create uncertainty, prompting investors to move capital away from riskier assets to safer alternatives.'
    },
    {
      id: 'q8',
      question: 'On an economic calendar, a "high-impact" SARB interest rate decision usually means:',
      options: [
        'It has little effect on markets',
        'It can cause significant volatility in the rand and JSE',
        'It only affects banks',
        'It guarantees a market rally'
      ],
      correctAnswer: 1,
      explanation: 'High-impact events like SARB rate decisions routinely cause sharp rand swings and heightened JSE trading volume due to their direct bearing on monetary policy.'
    },
    {
      id: 'q9',
      question: 'If actual economic data is better than the consensus forecast, this is called a:',
      options: [
        'Policy failure',
        'Data revision',
        'Positive surprise (beat)',
        'Market correction'
      ],
      correctAnswer: 2,
      explanation: 'When actual data exceeds the consensus forecast, it\'s called a positive surprise or "beat," which typically bolsters market sentiment.'
    },
    {
      id: 'q10',
      question: 'High unemployment in South Africa typically signals:',
      options: [
        'Strong consumer spending',
        'Economic weakness and cautious market sentiment',
        'Immediate rand appreciation',
        'Automatic interest rate cuts'
      ],
      correctAnswer: 1,
      explanation: 'High unemployment signals weak economic demand, reduced consumer spending power, and social challenges, leading to cautious market sentiment.'
    }
  ],
  passingScore: 70,
  timeLimit: 15
};
