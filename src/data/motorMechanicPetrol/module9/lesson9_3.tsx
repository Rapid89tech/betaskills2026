import React from 'react';
import { Lesson } from '../../../types/course';

const LessonContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-red-600 mb-6">Repairing Damaged Wiring or Connectors</h1>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Key Features</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Common Causes of Wiring Issues</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/CGEd3SMsoLE?si=QvYycNf3x6m9YuzS</p>
            </div>
            <p className="text-gray-700 mb-4">
              Wiring issues disrupt engine performance, causing intermittent faults, sensor failures, or check engine lights (e.g., P0135 for O2 sensor issues). Common causes include corrosion from South Africa's coastal humidity, rodent damage (chewed wires in rural areas), abrasion from engine vibration, and heat-induced insulation cracking after 80,000 km. Poor previous repairs or water ingress from leaks also contribute, leading to shorts or open circuits.
            </p>
            <p className="text-gray-700">
              Learners will explore causes in virtual simulations, visualizing corroded connectors or frayed harnesses. Ignoring issues risks system failures (e.g., fuel pump, R3,000+) or safety hazards like shorts causing fires. Mechanics mastering this knowledge prevent costly damage, ensuring reliability for vehicles like Toyota Corollas. The AI voice tutor can explain corrosion effects, rodent prevention, or local climate impacts, enhancing understanding. Learners will simulate identifying a corroded O2 sensor connector, proposing repairs to save clients R500–R2,000, critical for maintaining trust in South African workshops where environmental wear is prevalent.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Diagnosing Wiring or Connector Issues</h3>
            <p className="text-gray-700 mb-4">
              Diagnosing wiring issues involves visual inspection for frayed insulation, corroded pins, or melted connectors, and performing a wiggle test to detect intermittent faults (e.g., lights flickering). Use a multimeter to check continuity (0 ohms for intact wires), voltage (12V for power lines), or resistance (high values indicate corrosion). OBD-II codes like P0351 (coil circuit) or P0135 (O2 sensor) often point to wiring faults. In South Africa, coastal salt accelerates connector corrosion, causing failures after 5 years.
            </p>
            <p className="text-gray-700">
              Learners will practice diagnostics in virtual scenarios, testing a fuel pump circuit for continuity and identifying a corroded connector. Ignoring faults risks system failures or misdiagnoses (R2,000+). Mechanics mastering diagnostics ensure accurate repairs, saving time and costs. The AI voice tutor can guide learners through multimeter use, code correlation, or local corrosion factors, ensuring precision. Learners will simulate diagnosing a misfire due to a faulty coil connector on a VW Polo, enhancing efficiency for South African vehicles in diverse conditions.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Tools and Materials Needed</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/LmPN9waCn3E?si=EAwsVcDfS2_iTtre</p>
            </div>
            <p className="text-gray-700 mb-4">
              Wiring repairs require wire strippers, crimping tools, soldering iron, heat gun, multimeter, and connector pin removal tools. Materials include heat shrink tubing, electrical tape, replacement connectors, dielectric grease, and OEM-spec wires. Optional tools include a wire tracer for complex harnesses. Preparation involves disconnecting the battery, cleaning connectors with contact cleaner, and organizing tools to avoid losing small parts. In South Africa, humid conditions necessitate dielectric grease to prevent corrosion.
            </p>
            <p className="text-gray-700">
              Learners will practice setup in virtual scenarios, selecting tools for a sensor wire repair. Incorrect tools risk poor connections, causing repeat failures (R1,000+). Mechanics mastering setup ensure durable repairs, critical for vehicles like Ford Fiestas. The AI voice tutor can explain tool functions, grease application, or local humidity challenges, ensuring accuracy. Learners will simulate preparing for a fuel injector wire repair, organizing materials and verifying connector compatibility, enhancing reliability in South African workshops.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Repair Steps</h3>
            <p className="text-gray-700 mb-4">
              To repair wiring, identify the damaged section via visual inspection or multimeter tests, then disconnect the battery. Cut out the damaged wire, strip 1–1.5 cm of insulation, and crimp or solder a new connector or wire segment, sealing with heat shrink tubing. For connectors, replace corroded pins using a pin removal tool, apply dielectric grease, and secure with a new housing if needed. Test continuity and voltage post-repair, then start the engine to verify functionality. In South Africa, coastal moisture requires robust sealing to prevent re-corrosion.
            </p>
            <p className="text-gray-700">
              Learners will simulate repairing an O2 sensor wire on a Hyundai i20, ensuring secure connections. Errors like poor crimping risk intermittent faults (R500+ re-repair). Mechanics mastering this skill ensure reliable electrical systems, saving clients R1,000–R3,000. The AI voice tutor can guide learners through soldering, pin replacement, or local corrosion prevention, ensuring precision. Learners will verify repairs with a multimeter, critical for South African vehicles in humid or dusty environments.
            </p>
          </div>
        </div>

        <div className="mt-8 bg-yellow-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Conclusion and Q&A</h3>
          <h4 className="text-lg font-semibold text-red-700 mb-3">Activities</h4>
          <div className="space-y-3">
            <div>
              <h5 className="font-semibold text-gray-700">Recap Key Points:</h5>
              <p className="text-gray-700">
                Replacing spark plugs and ignition coils restores engine performance, addressing minor gasket leaks prevents fluid loss, and repairing wiring ensures reliable electrical systems. These skills reduce repair costs and enhance vehicle reliability, critical for client satisfaction.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const lesson9_3: Lesson = {
  id: '9.3',
  title: 'Repairing Damaged Wiring or Connectors',
  content: LessonContent,
  duration: 75,
  objectives: [
    "Identify common causes of wiring and connector issues",
    "Learn systematic diagnostic procedures for electrical problems",
    "Master proper tools and materials for wiring repairs",
    "Apply correct repair techniques for damaged wiring and connectors",
    "Understand prevention methods for electrical system failures"
  ],
  keyTerms: [
    "Wiring harness",
    "Connector corrosion",
    "Continuity testing",
    "Heat shrink tubing",
    "Dielectric grease",
    "Wire crimping",
    "Soldering",
    "Pin removal tools"
  ]
};