import type { Quiz } from '@/types/course';

const quiz: Quiz = {
  id: 3,
  title: 'Module 3 Quiz: Site Assessment and System Design',
  questions: [
    {
      id: 1,
      question: 'What is the primary goal of assessing solar potential?',
      options: [
        'To determine grid capacity',
        'To forecast wind patterns',
        'To evaluate the amount of sunlight a site receives',
        'To select battery types'
      ],
      correctAnswer: 2
    },
    {
      id: 2,
      question: 'Which factor can reduce solar energy output by up to 20-30% if not properly addressed?',
      options: [
        'Panel color',
        'Inverter placement',
        'Shading',
        'Wind direction'
      ],
      correctAnswer: 2
    },
    {
      id: 3,
      question: 'What tool is commonly used on-site to manually assess shading patterns throughout the year?',
      options: [
        'Thermometer',
        'Solar pathfinder',
        'Lux meter',
        'Multimeter'
      ],
      correctAnswer: 1
    },
    {
      id: 4,
      question: 'Which metric quantifies how much sunlight reaches a surface without obstruction annually?',
      options: [
        'LCOE',
        'TSRF (Total Solar Resource Fraction)',
        'DoD',
        'CAPEX'
      ],
      correctAnswer: 1
    },
    {
      id: 5,
      question: 'What is a key benefit of using 3D modeling software in solar potential assessment?',
      options: [
        'Lower installation costs',
        'Real-time weather forecasting',
        'Simulation of sunlight paths and shadow casting',
        'Panel cleaning automation'
      ],
      correctAnswer: 2
    },
    {
      id: 6,
      question: 'What is the advantage of using AI-driven tools for shading analysis?',
      options: [
        'They require no internet access',
        'They eliminate the need for solar panels',
        'They process LiDAR and weather data to optimize layouts',
        'They forecast utility bills'
      ],
      correctAnswer: 2
    },
    {
      id: 7,
      question: 'What does GIS stand for in the context of solar analysis?',
      options: [
        'Geographic Information System',
        'Global Irradiance Sensor',
        'General Inspection Survey',
        'Ground Integrated Storage'
      ],
      correctAnswer: 0
    },
    {
      id: 8,
      question: 'Which of the following is a common pitfall when performing solar potential and shading assessments?',
      options: [
        'Using PVWatts as a first step',
        'Adjusting for seasonal solar angles',
        'Ignoring future tree growth and seasonal changes',
        'Integrating GIS and 3D simulations'
      ],
      correctAnswer: 2
    },
    {
      id: 9,
      question: 'What does the Solar Access Value (SAV) indicate?',
      options: [
        'The voltage level required for off-grid systems',
        'The ratio of sunlight access over time',
        'The panel angle in degrees',
        'Battery cycle count'
      ],
      correctAnswer: 1
    },
    {
      id: 10,
      question: 'Why is analyzing solar access during the winter solstice especially important?',
      options: [
        'Solar panels produce more energy in winter',
        'It is when sunlight is most consistent',
        'It represents the lowest sun angle and potential maximum shading',
        'Utility prices are lowest in winter'
      ],
      correctAnswer: 2
    }
  ]
};

export default quiz;

