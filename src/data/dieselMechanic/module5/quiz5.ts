import type { Lesson } from '@/types/course';

export const quiz5: Lesson = {
  id: 4,
  title: 'Module 5 Quiz: Electrical and Diagnostic Systems',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the primary purpose of an oxygen (O2) sensor in a diesel engine?',
        options: [
          'To measure engine oil temperature',
          'To monitor oxygen levels in the exhaust stream and determine air-fuel ratio',
          'To control turbocharger boost pressure',
          'To regulate coolant flow through the engine'
        ],
        correct: 1,
        explanation: 'O2 sensors monitor oxygen levels in the exhaust stream to determine the air-fuel ratio, providing real-time feedback to the ECU for adjusting fuel injection to maintain optimal combustion and ensure emissions compliance.'
      },
      {
        question: 'Which type of oxygen sensor provides precise air-fuel ratio readings across a wide range?',
        options: [
          'Narrowband sensor',
          'Wideband sensor',
          'Temperature sensor',
          'Pressure sensor'
        ],
        correct: 1,
        explanation: 'Wideband sensors deliver precise air-fuel ratio readings across a wide range, enabling finer ECU control. They are used in modern vehicles for enhanced efficiency and emissions control, unlike narrowband sensors which provide binary (rich or lean) signals.'
      },
      {
        question: 'What is a common symptom of a contaminated or faulty MAF sensor?',
        options: [
          'Excessive coolant consumption',
          'Hesitation during acceleration and rough idling',
          'Increased oil pressure',
          'Improved fuel economy'
        ],
        correct: 1,
        explanation: 'A contaminated or faulty MAF sensor causes hesitation during acceleration, rough idling, poor fuel economy, stalling, or black exhaust smoke. This occurs because the sensor provides incorrect airflow data to the ECU, disrupting fuel delivery calculations.'
      },
      {
        question: 'What should you use to clean a MAF sensor without damaging it?',
        options: [
          'Brake cleaner',
          'Carburetor cleaner',
          'MAF-specific cleaner',
          'Water and soap'
        ],
        correct: 2,
        explanation: 'Use MAF-specific cleaners to remove contaminants without damaging the sensor. These cleaners are formulated to safely clean the delicate hot wire or film element. Avoid touching the sensing element and never use harsh chemicals like brake or carburetor cleaner.'
      },
      {
        question: 'What is the primary function of an EGR sensor?',
        options: [
          'To measure fuel pressure in the injection system',
          'To monitor EGR valve position and exhaust gas recirculation volume',
          'To control engine idle speed',
          'To regulate transmission shift points'
        ],
        correct: 1,
        explanation: 'EGR sensors monitor the position of the EGR valve and the volume of exhaust gas recirculated into the intake manifold, providing feedback to the ECU to regulate exhaust gas flow and lower combustion temperatures to reduce NOx emissions.'
      },
      {
        question: 'Which diagnostic tool is best for retrieving and clearing diagnostic trouble codes (DTCs)?',
        options: [
          'Multimeter',
          'Oscilloscope',
          'Scan tool',
          'Compression tester'
        ],
        correct: 2,
        explanation: 'Scan tools are designed to retrieve and clear DTCs stored in the vehicle\'s ECU. They also provide live data monitoring, system tests, and bidirectional control capabilities, making them essential for modern automotive diagnostics.'
      },
      {
        question: 'What electrical property does a multimeter measure to check for broken wires in a circuit?',
        options: [
          'Voltage',
          'Resistance (continuity)',
          'Frequency',
          'Capacitance'
        ],
        correct: 1,
        explanation: 'A multimeter measures resistance (continuity) to check for broken wires. An open circuit (broken wire) shows infinite resistance, while a good connection shows near-zero resistance. This test must be performed with power disconnected from the circuit.'
      },
      {
        question: 'What is the primary advantage of using an oscilloscope for diagnostics?',
        options: [
          'It can measure fuel pressure accurately',
          'It visualizes signal patterns and waveforms to detect intermittent faults',
          'It automatically repairs faulty components',
          'It measures engine compression'
        ],
        correct: 1,
        explanation: 'Oscilloscopes visualize signal patterns and waveforms in real time, revealing issues that scan tools or multimeters may miss. They are excellent for detecting intermittent faults, analyzing signal timing and amplitude, and diagnosing complex electrical issues.'
      },
      {
        question: 'What does CAN stand for in automotive diagnostics?',
        options: [
          'Computer Automated Network',
          'Controller Area Network',
          'Central Access Node',
          'Communication And Navigation'
        ],
        correct: 1,
        explanation: 'CAN stands for Controller Area Network, a robust communication protocol that enables multiple ECUs to exchange data efficiently within a vehicle. It acts as a digital backbone connecting systems like engine control, transmission, and ABS modules.'
      },
      {
        question: 'What is the typical resistance measurement across a properly functioning CAN bus with the battery disconnected?',
        options: [
          '0 ohms',
          '60 ohms',
          '120 ohms',
          '240 ohms'
        ],
        correct: 1,
        explanation: 'A properly functioning CAN bus should measure approximately 60 ohms with the battery disconnected. This results from two 120-ohm terminating resistors connected in parallel at each end of the bus. Values outside 50-70 ohms indicate wiring issues or terminating resistor failures.'
      }
    ]
  }
};
