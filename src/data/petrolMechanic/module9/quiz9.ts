import type { Lesson } from '@/types/course';

export const quiz9: Lesson = {
  id: 4,
  title: '📝 Module 9 Quiz: Basic Repairs',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the primary role of a spark plug?',
        options: [
          'To inject fuel into the combustion chamber',
          'To ignite the air-fuel mixture in the cylinder',
          'To control exhaust gas flow',
          'To regulate engine temperature'
        ],
        correct: 1,
        explanation: 'Spark plugs ignite the air-fuel mixture in the combustion chamber, creating the explosion that drives the piston and powers the engine.'
      },
      {
        question: 'What is a common symptom of a failing ignition coil?',
        options: [
          'Increased fuel efficiency',
          'Engine misfires or rough idling',
          'High oil pressure',
          'Smooth acceleration'
        ],
        correct: 1,
        explanation: 'A failing ignition coil causes engine misfires, rough idling, hard starting, and reduced fuel economy, often triggering check engine codes like P030X or P035X.'
      },
      {
        question: 'What should you do before removing a spark plug?',
        options: [
          'Drain the coolant',
          'Ensure the engine is cool and disconnect the battery',
          'Remove the oil pan',
          'Adjust valve clearance'
        ],
        correct: 1,
        explanation: 'Before removing spark plugs, ensure the engine is cool to avoid burns, disconnect the battery to prevent electrical shocks, and clean plug wells to prevent debris entry.'
      },
      {
        question: 'Which gasket commonly leaks oil at the top of the engine?',
        options: [
          'Exhaust manifold gasket',
          'Valve cover gasket',
          'Cylinder head gasket',
          'Intake manifold gasket'
        ],
        correct: 1,
        explanation: 'Valve cover gaskets seal the top of the cylinder head and commonly leak oil, producing burning oil smells and oil stains on the engine.'
      },
      {
        question: 'What can cause a gasket to leak over time?',
        options: [
          'Excessive coolant temperature',
          'Heat cycles causing gasket material to dry out and crack',
          'High-octane fuel',
          'Improper spark plug gaps'
        ],
        correct: 1,
        explanation: 'Heat cycles cause gasket materials to dry out, crack, and lose elasticity over time, especially after 80,000 km in hot climates, leading to leaks.'
      },
      {
        question: 'What is the purpose of heat shrink tubing in wiring repairs?',
        options: [
          'To prevent wire overheating',
          'To insulate and protect the repaired wire connection',
          'To increase wire resistance',
          'To improve wire flexibility'
        ],
        correct: 1,
        explanation: 'Heat shrink tubing insulates and protects repaired wire connections from moisture, corrosion, and abrasion, ensuring durable and reliable repairs.'
      },
      {
        question: 'What is a sign of a corroded connector in the wiring harness?',
        options: [
          'Smooth operation of electrical components',
          'Consistent voltage readings',
          'Intermittent electrical issues or complete circuit failure',
          'Reduced fuel consumption'
        ],
        correct: 2,
        explanation: 'Corroded connectors cause intermittent electrical issues, complete circuit failures, or sensor faults due to poor conductivity from oxidation or moisture damage.'
      },
      {
        question: 'What is the first step before cutting damaged wiring?',
        options: [
          'Heat the wire with a heat gun',
          'Ensure the circuit is powered',
          'Disconnect the battery or power source',
          'Soak wiring in water to prevent sparks'
        ],
        correct: 2,
        explanation: 'Always disconnect the battery or power source before cutting damaged wiring to prevent electrical shocks, shorts, or sparks that could cause fires.'
      },
      {
        question: 'What does a burning oil smell indicate in gasket issues?',
        options: [
          'Intake manifold leak',
          'Valve cover gasket leak',
          'Exhaust manifold leak',
          'Throttle body leak'
        ],
        correct: 1,
        explanation: 'A burning oil smell typically indicates a valve cover gasket leak, where oil seeps onto hot engine components and burns, producing a distinctive odor.'
      },
      {
        question: 'What tool ensures spark plugs are tightened correctly?',
        options: [
          'Multimeter',
          'Torque wrench',
          'Wire stripper',
          'Compression tester'
        ],
        correct: 1,
        explanation: 'A torque wrench ensures spark plugs are tightened to manufacturer specifications (20–30 Nm), preventing overtightening that damages threads or undertightening that causes leaks.'
      },
      {
        question: 'What OBD-II code might indicate a faulty ignition coil?',
        options: [
          'P0171',
          'P0351',
          'P0420',
          'P0455'
        ],
        correct: 1,
        explanation: 'P0351 indicates an ignition coil circuit fault (typically coil A/cylinder 1), while P035X codes indicate specific coil circuit issues for different cylinders.'
      },
      {
        question: 'What should be applied to ignition coil boots to prevent corrosion?',
        options: [
          'RTV sealant',
          'Anti-seize compound',
          'Dielectric grease',
          'Electrical tape'
        ],
        correct: 2,
        explanation: 'Dielectric grease should be applied to ignition coil boots to prevent moisture ingress, corrosion, and ensure reliable electrical connections, especially in humid climates.'
      }
    ]
  }
};
