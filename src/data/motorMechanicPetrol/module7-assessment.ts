
import type { Module } from '@/types/course';

export const module7Assessment: Module = {
  id: 7,
  title: 'Final Assessment and Certification',
  description: 'Comprehensive final assessment covering all aspects of petrol engine repair and maintenance.',
  lessons: [
    {
      id: 19,
      title: 'Practical Skills Assessment',
      duration: '90 minutes',
      type: 'assignment',
      content: {
        title: 'Practical Skills Assessment',
        description: 'Demonstrate your practical skills in petrol engine diagnosis, repair, and maintenance.',
        requirements: [
          'Perform a complete engine diagnostic procedure',
          'Identify and explain common engine problems',
          'Demonstrate proper use of diagnostic equipment',
          'Complete a major service procedure',
          'Show understanding of safety procedures'
        ],
        deliverables: 'Submit a comprehensive report documenting your practical assessment, including photos, test results, and explanations of procedures performed.',
        rubric: {
          'Diagnostic Skills': 'Ability to systematically diagnose engine problems using appropriate tools and procedures',
          'Technical Knowledge': 'Understanding of engine systems, components, and their interactions',
          'Practical Skills': 'Competency in performing maintenance and repair procedures',
          'Safety Awareness': 'Demonstration of proper safety procedures and practices',
          'Documentation': 'Quality and completeness of assessment documentation'
        }
      }
    },
    {
      id: 20,
      title: 'Comprehensive Final Exam',
      duration: '60 minutes',
      type: 'quiz',
      content: {
        questions: [
          {
            question: 'In the four-stroke cycle, during which stroke does the spark plug fire?',
            options: [
              'Intake stroke',
              'Compression stroke',
              'Power stroke',
              'Exhaust stroke'
            ],
            correct: 2,
            explanation: 'The spark plug fires at the end of the compression stroke, beginning the power stroke where the air-fuel mixture is ignited and forces the piston down.'
          },
          {
            question: 'What is the typical compression ratio range for modern petrol engines?',
            options: [
              '6:1 to 8:1',
              '8:1 to 12:1',
              '15:1 to 20:1',
              '20:1 to 25:1'
            ],
            correct: 1,
            explanation: 'Modern petrol engines typically have compression ratios between 8:1 and 12:1, which is optimal for spark ignition and prevents knock.'
          },
          {
            question: 'Which fuel injection system provides the most precise fuel control?',
            options: [
              'Carburettor',
              'Single-point injection',
              'Multi-point injection',
              'Direct injection'
            ],
            correct: 3,
            explanation: 'Direct injection provides the most precise fuel control as it injects fuel directly into the combustion chamber at precisely the right moment.'
          },
          {
            question: 'What is the primary purpose of the thermostat in the cooling system?',
            options: [
              'To increase coolant pressure',
              'To control coolant flow and maintain operating temperature',
              'To prevent coolant from freezing',
              'To circulate coolant through the system'
            ],
            correct: 1,
            explanation: 'The thermostat controls coolant flow to maintain optimal engine operating temperature by opening and closing based on coolant temperature.'
          },
          {
            question: 'What does a P0301 diagnostic trouble code typically indicate?',
            options: [
              'Mass airflow sensor malfunction',
              'Cylinder 1 misfire detected',
              'Oxygen sensor circuit malfunction',
              'Throttle position sensor error'
            ],
            correct: 1,
            explanation: 'P0301 indicates a misfire detected in cylinder 1. The last digit indicates which cylinder is misfiring (P0302 = cylinder 2, etc.).'
          },
          {
            question: 'What is the recommended oil change interval for conventional motor oil?',
            options: [
              '3,000 km',
              '5,000-7,500 km',
              '10,000-15,000 km',
              '20,000 km'
            ],
            correct: 1,
            explanation: 'Conventional motor oil should typically be changed every 5,000-7,500 km, though severe driving conditions may require more frequent changes.'
          },
          {
            question: 'Which component in the ignition system steps up voltage from 12V to 15,000-40,000V?',
            options: [
              'Distributor',
              'Spark plug',
              'Ignition coil',
              'Condenser'
            ],
            correct: 2,
            explanation: 'The ignition coil is a step-up transformer that increases the 12V battery voltage to the high voltage needed to create a spark at the spark plug.'
          },
          {
            question: 'What is the purpose of the knock sensor?',
            options: [
              'To detect engine speed',
              'To detect engine knock/ping and allow timing adjustment',
              'To measure fuel pressure',
              'To monitor exhaust emissions'
            ],
            correct: 1,
            explanation: 'The knock sensor detects engine knock (detonation) and sends a signal to the ECU to retard ignition timing to prevent engine damage.'
          },
          {
            question: 'In a compression test, what would indicate worn piston rings?',
            options: [
              'High compression in all cylinders',
              'Low compression that improves significantly with oil added',
              'Low compression that doesn\'t improve with oil added',
              'Compression that varies with engine temperature'
            ],
            correct: 1,
            explanation: 'If compression is low but improves significantly when oil is added to the cylinder (wet test), it indicates worn piston rings allowing compression to leak past the rings.'
          },
          {
            question: 'What is the typical service interval for timing belt replacement?',
            options: [
              '30,000-50,000 km',
              '60,000-80,000 km',
              '80,000-160,000 km',
              '200,000+ km'
            ],
            correct: 2,
            explanation: 'Timing belts typically need replacement every 80,000-160,000 km, depending on the manufacturer. Failure to replace can result in severe engine damage.'
          }
        ]
      }
    },
    {
      id: 21,
      title: 'Course Completion Certificate',
      duration: '5 minutes',
      type: 'certificate',
      content: {
        title: 'Motor Mechanic - Petrol Engine Professional Certification',
        description: 'Congratulations on completing the Motor Mechanic - Petrol Engine Professional Certification course!',
        certificateText: 'This certifies that you have successfully completed the comprehensive Motor Mechanic - Petrol Engine Professional Certification course, demonstrating competency in petrol engine diagnosis, repair, and maintenance procedures.'
      }
    }
  ]
};
