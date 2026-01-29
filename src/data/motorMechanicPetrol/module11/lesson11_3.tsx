import React from 'react';
import { Lesson } from '../../../types/course';

const LessonContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-red-600 mb-6">Cleaning or Replacing Clogged Oil Passages</h1>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Key Features</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Causes of Clogged Oil Passages</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/eMFeJvxKpu4?si=ghp_TaOzpAnzFRrA</p>
            </div>
            <p className="text-gray-700 mb-4">
              Sludge from degraded oil (beyond 10,000 km), dirt, or coolant leaks clogs oil passages, reducing flow and pressure. In South Africa, neglected maintenance in high-mileage vehicles (100,000+ km) like Ford Fiestas accelerates buildup. Contaminants like metal shavings or carbon deposits block galleries, risking bearing failure (R20,000+).
            </p>
            <p className="text-gray-700">
              Learners will explore causes in virtual simulations, visualizing sludge effects. Ignoring clogs causes engine seizure (R50,000+). Mechanics mastering this knowledge prevent damage, saving clients costly repairs. The AI voice tutor can explain sludge formation, coolant contamination, or local maintenance issues, enhancing understanding. Learners will simulate identifying a clogged passage, proposing cleaning methods, critical for South African conditions.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Signs of Clogged Oil Passages</h3>
            <p className="text-gray-700 mb-4">
              Signs include low pressure (below 100 kPa) despite full oil, ticking/knocking from unlubricated components, overheating (above 90°C), or excessive exhaust smoke (blue/gray). In South Africa, coastal humidity accelerates corrosion, clogging passages after 5 years.
            </p>
            <p className="text-gray-700">
              Learners will practice identifying symptoms in virtual scenarios, correlating noises with blockages. Ignoring signs risks engine failure (R50,000+). Mechanics mastering symptom recognition diagnose issues early, saving clients R5,000–R20,000. The AI voice tutor can explain noise causes, pressure effects, or local corrosion factors, ensuring precision. Learners will simulate diagnosing a ticking engine with low pressure, proposing cleaning for vehicles like Hyundai i20s, ensuring reliability in urban or rural settings.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Methods to Clean Clogged Oil Passages (Cleaning Passages Procedure)</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/0wOyRtjHce8?si=Q-p6m7p5dmfQGI7f</p>
            </div>
            <p className="text-gray-700 mb-4">
              Use engine flush additives (run for 10–15 minutes, then drain), manual cleaning during rebuilds (brushes, solvent), or ultrasonic cleaning for disassembled parts. Clean or replace the pickup screen and filter. In South Africa, flushes every 20,000 km prevent clogs.
            </p>
            <p className="text-gray-700">
              Learners will simulate cleaning, ensuring debris removal. Incorrect methods risk seal damage (R3,000+). Mechanics mastering cleaning restore oil flow, saving clients R5,000+. The AI voice tutor can guide learners through flush use, manual cleaning, or local maintenance needs, ensuring accuracy. Learners will practice flushing a Nissan Sentra, verifying pressure post-cleaning, critical for South African vehicles.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">When to Replace Oil Passages or Galleries (Passage Replacement Guidelines)</h3>
            <p className="text-gray-700 mb-4">
              Replace passages if cleaning fails or damage (cracks, corrosion) is severe, requiring block or head replacement (R20,000+). In South Africa, corrosion from coolant leaks is common in older vehicles. Re-drilling or external lines may bypass damage.
            </p>
            <p className="text-gray-700">
              Learners will simulate assessing damage, proposing replacement. Ignoring severe clogs risks engine failure (R50,000+). Mechanics mastering this skill ensure long-term reliability, saving clients costly repairs. The AI voice tutor can explain replacement criteria, machining, or local corrosion issues, ensuring precision. Learners will practice assessing a blocked gallery on a Toyota Corolla, proposing solutions, vital for South African workshops.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Preventative Measures (Preventing Clogged Passages)</h3>
            <p className="text-gray-700 mb-4">
              Regular oil changes (every 10,000 km), high-quality oil (e.g., 5W-30 synthetic), and prompt leak repairs prevent clogs. Avoid overfilling or low-quality additives. In South Africa, dusty conditions necessitate frequent filter changes.
            </p>
            <p className="text-gray-700">
              Learners will simulate maintenance plans, ensuring clean oil systems. Neglecting maintenance risks clogs (R10,000+). Mechanics mastering prevention extend engine life, saving clients R5,000+. The AI voice tutor can explain oil types, filter quality, or local dust impacts, ensuring accuracy. Learners will practice planning maintenance for a Ford Fiesta, enhancing reliability in South African conditions.
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
                Diagnosing oil pressure issues involves checking levels, filters, and pumps. Replacing oil pumps restores lubrication, and cleaning passages prevents blockages. Regular maintenance ensures long-term engine health.
              </p>
            </div>
            <div>
              <h5 className="font-semibold text-gray-700">Outcome:</h5>
              <p className="text-gray-700">
                Participants will master diagnosing and repairing lubrication system issues, ensuring optimal engine performance and preventing costly failures, enhancing workshop capabilities in South African and global contexts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const lesson11_3: Lesson = {
  id: '11.3',
  title: 'Cleaning or Replacing Clogged Oil Passages',
  content: LessonContent,
  duration: 75,
  objectives: [
    "Identify causes and signs of clogged oil passages",
    "Learn various methods for cleaning oil passages",
    "Understand when passage replacement is necessary",
    "Apply preventative measures to avoid oil passage clogs",
    "Develop maintenance strategies for oil system health"
  ],
  keyTerms: [
    "Oil passages",
    "Sludge formation",
    "Engine flush",
    "Pickup screen",
    "Oil galleries",
    "Ultrasonic cleaning",
    "Passage replacement",
    "Preventative maintenance"
  ]
};