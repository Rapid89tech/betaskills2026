import type { Quiz } from '@/types/course';

const quiz: Quiz = {
  id: 2,
  title: 'Module 2 Quiz: Components of a Solar PV System',
  questions: [
    {
      id: 1,
      question: 'Which type of solar panel has the highest efficiency in 2025?',
      options: [
        'Polycrystalline',
        'Monocrystalline',
        'Thin-Film',
        'Amorphous Silicon'
      ],
      correctAnswer: 1
    },
    {
      id: 2,
      question: 'What is a key advantage of thin-film solar panels?',
      options: [
        'Highest power output per panel',
        'Longest lifespan',
        'Lightweight and flexible for curved surfaces',
        'Best performance in low light'
      ],
      correctAnswer: 2
    },
    {
      id: 3,
      question: 'What is the typical degradation rate per year for polycrystalline panels?',
      options: [
        '0.1-0.2%',
        '0.5-0.7%',
        '1.0-1.5%',
        '2.0%'
      ],
      correctAnswer: 1
    },
    {
      id: 4,
      question: 'Which inverter type allows panel-level optimization and works best for shaded roofs?',
      options: [
        'String Inverter',
        'Micro Inverter',
        'Hybrid Inverter',
        'Central Inverter'
      ],
      correctAnswer: 1
    },
    {
      id: 5,
      question: 'Hybrid inverters are particularly useful for...',
      options: [
        'Monitoring panel performance',
        'String array optimization',
        'Managing solar plus battery storage systems',
        'Reducing inverter costs'
      ],
      correctAnswer: 2
    },
    {
      id: 6,
      question: 'Which battery type offers the longest lifespan and 100% depth of discharge (DoD)?',
      options: [
        'Lead-Acid',
        'Lithium-Ion',
        'Flow Battery',
        'Nickel-Cadmium'
      ],
      correctAnswer: 2
    },
    {
      id: 7,
      question: 'What is the main limitation of PWM charge controllers in modern solar systems?',
      options: [
        'High cost',
        'Complex installation',
        'Poor performance when panel voltage exceeds battery voltage',
        'Incompatibility with batteries'
      ],
      correctAnswer: 2
    },
    {
      id: 8,
      question: 'Which type of mounting structure allows for the highest energy yield increase using sun tracking?',
      options: [
        'Roof-Mounted',
        'Ground-Mounted with Trackers',
        'Ballasted Rooftop',
        'Pole-Mounted'
      ],
      correctAnswer: 1
    },
    {
      id: 9,
      question: 'In terms of cabling, DC cables are primarily used to connect:',
      options: [
        'Inverter to the utility meter',
        'Panels to the inverter',
        'Battery to the load',
        'Inverter to AC breaker'
      ],
      correctAnswer: 1
    },
    {
      id: 10,
      question: 'What is the expected efficiency range for MPPT charge controllers?',
      options: [
        '70-80%',
        '80-85%',
        '85-90%',
        '95-99%'
      ],
      correctAnswer: 3
    }
  ]
};

export default quiz;

