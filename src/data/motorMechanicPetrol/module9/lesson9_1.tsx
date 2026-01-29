import React from 'react';
import { Lesson } from '../../../types/course';

const LessonContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-red-600 mb-6">Replacing a Faulty Spark Plug or Ignition Coil</h1>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Key Features</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Purpose and Importance</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/al2qer16PRE?si=b2epwQuB2bXU-omU</p>
            </div>
            <p className="text-gray-700 mb-4">
              Spark plugs ignite the air-fuel mixture in the combustion chamber, driving the power stroke, while ignition coils convert 12V battery power to high-voltage sparks (up to 40,000V). Faulty plugs cause misfires, rough idling, or reduced fuel efficiency (e.g., dropping from 12 km/L to 10 km/L), and failing coils mimic these symptoms, triggering codes like P0301 (cylinder 1 misfire). In South Africa, poor fuel quality accelerates plug fouling after 20,000–30,000 km, especially in high-mileage vehicles like VW Polos. Neglecting these issues risks catalytic converter damage (R10,000–R15,000) or engine strain, leading to breakdowns costing R20,000+.
            </p>
            <p className="text-gray-700">
              Learners will explore their roles in virtual simulations, visualizing spark plug fouling (e.g., carbon deposits) and coil failure effects. Replacing plugs or coils restores performance, saving clients R2,000–R3,000 annually on fuel. Mechanics mastering these repairs ensure reliable engines, critical for long-distance travel in South Africa's rural areas. The AI voice tutor can explain plug types (e.g., copper vs. iridium), coil diagnostics, or local fuel impacts, ensuring precise repairs. Learners will simulate inspecting a fouled plug, identifying oil deposits, and replacing a coil, learning to verify repairs with a test drive. This skill is vital for maintaining vehicles like Toyota Corollas, common in South Africa, where early intervention prevents client inconvenience and builds workshop trust.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Identifying the Problem</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/l6q5Tfe5g0w?si=myVpTBegdsURG3ef</p>
            </div>
            <p className="text-gray-700 mb-4">
              Faulty spark plugs or ignition coils manifest as engine misfires (shaking at idle), hard starting, reduced fuel economy (e.g., 10% loss), poor acceleration, or a check engine light with codes like P030X (misfire) or P035X (coil fault). Visual plug inspection reveals fouling (black soot), oil deposits, or worn electrodes, while coils show cracks, corrosion, or weak spark output (tested with a spark tester). In South Africa, dusty conditions clog air filters, causing rich mixtures that foul plugs after 20,000 km, and coastal humidity corrodes coil connectors.
            </p>
            <p className="text-gray-700">
              Learners will practice diagnostics in virtual scenarios, using OBD-II scanners to read codes and inspecting plugs for wear patterns. Ignoring issues risks catalytic converter clogging or engine damage (R15,000+). Mechanics mastering diagnostics pinpoint faults accurately, avoiding unnecessary part replacements costing R500–R2,000. The AI voice tutor can guide learners through code interpretation, plug analysis, or local environmental impacts, ensuring precision. Learners will simulate diagnosing a P0302 code, inspecting a plug for carbon buildup, and testing a coil's spark, learning to differentiate causes for vehicles like Ford Fiestas, ensuring efficient repairs in busy urban workshops or remote settings where reliability is critical.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Tools and Preparation</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/r3YOEDO-oMs?si=OwooLxveayOAUrIO</p>
            </div>
            <p className="text-gray-700 mb-4">
              Replacing spark plugs or ignition coils requires a spark plug socket (e.g., 16mm), ratchet, extension bar, torque wrench (20–30 Nm), dielectric grease, and a screwdriver for coil connectors. Optional tools include a feeler gauge for plug gaps (0.8–1.2 mm). Preparation involves cooling the engine to avoid burns, disconnecting the negative battery terminal to prevent shocks, and cleaning plug wells to avoid debris entering cylinders, a common issue in South Africa's dusty regions.
            </p>
            <p className="text-gray-700">
              Learners will practice setup in virtual scenarios, ensuring proper tool selection and safety protocols. Incorrect preparation risks cross-threading plugs (R2,000 to repair) or electrical damage. Mechanics mastering preparation ensure safe, efficient repairs, saving time and client costs. The AI voice tutor can explain tool use, safety steps, or local dust challenges, ensuring accuracy. Learners will simulate preparing a Hyundai i20 for plug replacement, labeling coils for reassembly, and applying dielectric grease to prevent corrosion, a key skill for maintaining vehicles in humid coastal areas or high-traffic urban environments where quick, accurate repairs are essential.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Replacement Steps</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/a9VVZn7o7uk?si=fMSaou4v8V9lRF3t</p>
            </div>
            <p className="text-gray-700 mb-4">
              To replace a spark plug, locate it using the service manual (often under coils), unplug the coil's connector, remove the coil bolt, and extract the coil. Use a spark plug socket to remove the plug, inspect for fouling (e.g., oil or carbon), and hand-thread a new plug with the correct gap (0.8–1.2 mm) to avoid cross-threading. Torque to specs (20–30 Nm), apply dielectric grease to the coil boot, and reinstall the coil. For coils, replace if cracked or spark output is weak, securing with bolts (8–10 Nm). Test by starting the engine, checking for smooth operation.
            </p>
            <p className="text-gray-700">
              In South Africa, replacing plugs every 30,000 km prevents misfires, critical for long highway trips. Learners will simulate the process, torquing plugs and verifying repairs. Errors like overtightening risk thread damage (R2,000+). Mechanics mastering this skill ensure reliable ignition, saving clients R500–R1,000 per repair. The AI voice tutor can guide learners through torquing, plug inspection, or local maintenance schedules, ensuring precision. Learners will practice on a Nissan Sentra, confirming smooth idling post-repair, enhancing reliability for South African vehicles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const lesson9_1: Lesson = {
  id: '9.1',
  title: 'Replacing a Faulty Spark Plug or Ignition Coil',
  content: LessonContent,
  duration: 60,
  objectives: [
    "Understand the purpose and importance of spark plugs and ignition coils",
    "Learn to identify symptoms of faulty spark plugs and coils",
    "Master proper tools and preparation techniques",
    "Apply correct replacement procedures with proper torque specifications",
    "Verify repairs through testing and inspection"
  ],
  keyTerms: [
    "Spark plug",
    "Ignition coil",
    "Misfiring",
    "Fouling",
    "Electrode gap",
    "Dielectric grease",
    "Torque specifications",
    "OBD-II codes"
  ]
};