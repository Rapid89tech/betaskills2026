import React from 'react';
import { Lesson } from '../../../types/course';

const LessonContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-red-600 mb-6">Examining and Replacing Spark Plugs</h1>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Key Features</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Function of Spark Plugs</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/bZf_q4as8Io?si=G3EOBVjfO6WPRwVf</p>
            </div>
            <p className="text-gray-700 mb-4">
              Spark plugs ignite the air-fuel mixture in petrol engines, producing the combustion that drives the piston, powering the vehicle. They ensure efficient combustion, smooth acceleration, and low emissions, critical for performance and environmental compliance. Worn plugs cause misfires, rough idling, or increased fuel consumption, reducing efficiency by up to 20%.
            </p>
            <p className="text-gray-700">
              Learners will explore spark plug components like electrodes and insulators in virtual simulations, understanding their role in ignition timing. Faulty plugs can lead to hard starting or check engine lights, common issues in high-mileage vehicles. Mechanics mastering spark plug maintenance can restore performance, addressing client concerns effectively. The AI voice tutor can explain heat ranges or diagnose misfire causes, offering practical guidance for workshop applications.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Inspecting Spark Plugs</h3>
            <p className="text-gray-700 mb-4">
              Inspecting spark plugs involves removing them with a spark plug socket, examining electrodes for wear, carbon buildup, or oil fouling, and checking the gap with a gauge (typically 0.6–1.1 mm). Sooty plugs indicate a rich mixture, oily plugs suggest oil leaks, and white, blistered plugs signal overheating.
            </p>
            <p className="text-gray-700">
              Learners will practice inspections in virtual scenarios, identifying conditions like cracked insulators requiring immediate replacement. This process reveals engine health, guiding further diagnostics like checking fuel injectors or valve seals. Mechanics mastering this skill can prevent misfires or engine damage, ensuring reliable performance. The AI voice tutor can guide learners through interpreting plug conditions or using gap tools, ensuring precise diagnostics.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Replacing Spark Plugs</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/5iuSgGfwBBY?si=Hs4It2ST1uSBkapE</p>
            </div>
            <p className="text-gray-700 mb-4">
              Spark plug replacement, needed every 50,000–160,000 kilometres depending on type (copper, platinum, or iridium), involves hand-threading new plugs to avoid cross-threading and torquing to specs (e.g., 25 Nm). Replacing one plug at a time prevents wire mix-ups, ensuring correct firing order.
            </p>
            <p className="text-gray-700">
              Learners will simulate replacements, practicing proper techniques to avoid damaging threads or causing misfires. Incorrect installation can lead to engine damage or poor combustion. Mechanics mastering this task can perform reliable services, enhancing vehicle reliability and client trust. The AI voice tutor can guide learners on selecting plug types or torquing correctly, ensuring precision in maintenance.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Spark Plug Types and Gaps</h3>
            <p className="text-gray-700 mb-4">
              Spark plugs include copper (affordable, 30,000–50,000 km lifespan), platinum, and iridium (80,000–160,000 km, higher cost), with gaps set to 0.6–1.1 mm per manufacturer specs. Correct gaps ensure strong sparks for efficient combustion, while incorrect gaps cause weak ignition or misfires.
            </p>
            <p className="text-gray-700">
              Learners will explore plug types and gap adjustments in virtual simulations, understanding their impact on performance. For example, iridium plugs suit high-performance engines, while copper suits older vehicles. Mechanics mastering this can select plugs tailored to vehicle needs, optimizing combustion. The AI voice tutor can explain gap specifications or plug type suitability, enhancing maintenance decisions.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Diagnosing Spark Plug Issues</h3>
            <p className="text-gray-700 mb-4">
              Worn spark plugs cause symptoms like hard starting, rough idling, misfires, poor acceleration, or increased fuel consumption (e.g., 10% efficiency loss). Visual inspection reveals issues like sooty deposits (rich mixture), oily residue (oil leaks), or blistered tips (overheating).
            </p>
            <p className="text-gray-700">
              Learners will diagnose these in virtual scenarios, linking symptoms to causes like faulty injectors or worn valve seals. This skill helps mechanics address performance complaints, preventing engine damage. Regular inspections, especially after 50,000 kilometres, are critical for high-mileage vehicles. The AI voice tutor can guide learners through plug diagnostics or interpreting error codes, ensuring accurate troubleshooting.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const lesson4_3: Lesson = {
  id: '4.3',
  title: 'Examining and Replacing Spark Plugs',
  content: LessonContent,
  duration: 45,
  objectives: [
    "Understand the function and importance of spark plugs in engine operation",
    "Master spark plug inspection techniques and condition assessment",
    "Execute proper spark plug replacement procedures",
    "Identify different spark plug types and their applications",
    "Diagnose spark plug-related engine issues"
  ],
  keyTerms: [
    "Spark plug electrodes",
    "Plug gap measurement",
    "Copper spark plugs",
    "Platinum spark plugs",
    "Iridium spark plugs",
    "Carbon fouling",
    "Oil fouling",
    "Heat range"
  ]
};