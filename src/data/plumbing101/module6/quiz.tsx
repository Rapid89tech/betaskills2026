import type { Quiz } from '@/types/course';

export const module6Quiz: Quiz = {
  id: 6,
  title: 'Module 6 Quiz: Fixtures and Appliances Installation',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the purpose of a wax ring when installing a toilet?',
        options: [
          'To secure the tank to the bowl.',
          'To create a seal between the toilet base and the closet flange, preventing leaks.',
          'To attach the seat to the bowl.',
          'To reinforce the bolts in the flange.'
        ],
        correct: 1,
        explanation: 'A wax ring creates a seal between the toilet base and the closet flange, preventing leaks.'
      },
      {
        question: 'When connecting a water heater, what is the first step before turning on the power or gas?',
        options: [
          'Secure the gas line with plumber\'s tape.',
          'Fill the tank with water to prevent the heating element from burning out.',
          'Set the thermostat to the maximum setting.',
          'Apply solder to the electrical connections.'
        ],
        correct: 1,
        explanation: 'The tank must be filled with water before turning on the power or gas to prevent the heating element from burning out.'
      },
      {
        question: 'Which tool is most commonly used to tighten water supply connections for faucets and sinks?',
        options: [
          'Channel-lock pliers',
          'Screwdriver',
          'Hacksaw',
          'Pipe threader'
        ],
        correct: 0,
        explanation: 'Channel-lock pliers are most commonly used to tighten water supply connections for faucets and sinks.'
      },
      {
        question: 'What is the primary function of a T&P (temperature and pressure) relief valve on a water heater?',
        options: [
          'To regulate the water temperature.',
          'To prevent pressure buildup that could cause the tank to burst.',
          'To increase water flow to the heater.',
          'To filter out impurities from the incoming water supply.'
        ],
        correct: 1,
        explanation: 'The T&P relief valve prevents pressure buildup that could cause the tank to burst.'
      },
      {
        question: 'How should the dishwasher drain hose be connected to prevent backflow into the appliance?',
        options: [
          'Attach the hose directly to the main sewer line.',
          'Secure the hose to a high loop or air gap above the flood level of the sink.',
          'Insert the hose into the garbage disposal drain with no additional fitting.',
          'Use a crimp ring to seal the hose to the water supply line.'
        ],
        correct: 1,
        explanation: 'The dishwasher drain hose should be secured to a high loop or air gap above the flood level of the sink to prevent backflow.'
      },
      {
        question: 'What is the best way to ensure a washing machine is level?',
        options: [
          'Adjust the legs by hand until the unit stops wobbling.',
          'Place a spirit level on top of the machine and adjust the leveling feet until it reads level.',
          'Use shims under the feet without checking with a level.',
          'Rely on the floor\'s natural slope for balance.'
        ],
        correct: 1,
        explanation: 'The best way to ensure a washing machine is level is to place a spirit level on top and adjust the leveling feet until it reads level.'
      },
      {
        question: 'When installing a sink faucet, why should you use plumber\'s tape on the threads of the supply lines?',
        options: [
          'To make the connections easier to disassemble.',
          'To improve the water pressure.',
          'To ensure a watertight seal and prevent leaks.',
          'To avoid the need for washers or gaskets.'
        ],
        correct: 2,
        explanation: 'Plumber\'s tape should be used on the threads of supply lines to ensure a watertight seal and prevent leaks.'
      },
      {
        question: 'Which type of sealant is most commonly used around shower bases and tubs to prevent water seepage into walls?',
        options: [
          'PVC cement',
          'Silicone caulk',
          'Teflon tape',
          'Plumber\'s putty'
        ],
        correct: 1,
        explanation: 'Silicone caulk is most commonly used around shower bases and tubs to prevent water seepage into walls.'
      },
      {
        question: 'What is a common sign of a leak after installing a fixture or appliance?',
        options: [
          'A slight hissing sound near the connections.',
          'Steady water pressure when running the fixture.',
          'Water pooling or dripping under the connection points.',
          'The fixture taking longer to fill with water.'
        ],
        correct: 2,
        explanation: 'Water pooling or dripping under the connection points is a common sign of a leak after installing a fixture or appliance.'
      },
      {
        question: 'Why is it important to test all connections after installing a dishwasher or washing machine?',
        options: [
          'To confirm the appliance\'s capacity.',
          'To ensure that the installation follows local building codes.',
          'To identify and correct any leaks or improper connections before regular use.',
          'To adjust the cycle settings for better performance.'
        ],
        correct: 2,
        explanation: 'It is important to test all connections to identify and correct any leaks or improper connections before regular use.'
      }
    ]
  }
}; 
