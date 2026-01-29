import React from 'react';
import { Lesson } from '../../../types/course';

const LessonContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-red-600 mb-6">Flushing the Cooling System</h1>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Key Features</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Purpose of Flushing</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/UTC0V5CO67M?si=p8OdUiPlrAige0uQ</p>
            </div>
            <p className="text-gray-700 mb-4">
              Flushing removes rust, sediment, and degraded coolant, preventing clogs and corrosion that cause overheating. Old coolant loses anti-corrosion properties after 2–5 years, reducing heat transfer and risking water pump or radiator failure (R5,000–R10,000). In South Africa, hard water or poor coolant quality accelerates corrosion in high-mileage vehicles (100,000+ km). Flushing restores cooling efficiency, extending component life by 30–50%.
            </p>
            <p className="text-gray-700">
              Learners will explore flushing in virtual simulations, visualizing sediment removal. Ignoring flushes risks blockages, costing R10,000+ in repairs. Mechanics mastering this skill maintain engine health, critical for vehicles like VW Polos in hot climates. The AI voice tutor can explain coolant degradation, flush benefits, or local water quality issues, enhancing understanding. Learners will simulate a flush, identifying rusty coolant and proposing intervals, ensuring reliability for South African clients.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Tools and Materials Needed (Cooling System Flush Setup)</h3>
            <p className="text-gray-700 mb-4">
              Flushing requires a radiator flush solution, distilled water, fresh coolant (50/50 mix), a drain pan, funnel, pliers, and safety gear (gloves, goggles). Optional tools include a cooling system pressure tester or bleeder kit. Use distilled water to avoid mineral deposits, critical in South Africa where tap water is often hard. Preparation involves cooling the engine and securing a disposal method for toxic coolant.
            </p>
            <p className="text-gray-700">
              Learners will practice setup in virtual scenarios, selecting correct coolant types (e.g., OAT for modern vehicles). Incorrect materials risk corrosion (R3,000+). Mechanics mastering setup ensure effective flushes, saving clients costly repairs. The AI voice tutor can explain coolant selection, disposal regulations, or local water challenges, ensuring accuracy. Learners will simulate preparing for a flush on a Ford Fiesta, organizing tools and verifying coolant compatibility, enhancing efficiency in South African workshops.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Cooling System Flush Procedure</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/Cvcu3YFoV6o?si=V936VGsxNFg2X4kC</p>
            </div>
            <p className="text-gray-700 mb-4">
              To flush, drain old coolant via the radiator petcock into a pan, close the valve, and fill with distilled water. Run the engine for 10–15 minutes with the heater on, then drain again. For a chemical flush, add flush solution, run the engine per instructions, and drain. Repeat water flushes until clear, then refill with a 50/50 coolant-distilled water mix. Bleed air by running the engine with the cap off, squeezing hoses to release bubbles. In South Africa, flushes every 40,000 km prevent corrosion from heat and dust.
            </p>
            <p className="text-gray-700">
              Learners will simulate the process, ensuring clear drainage. Errors like using tap water risk clogs (R2,000+). Mechanics mastering this skill maintain cooling efficiency, saving clients R1,000–R5,000. The AI voice tutor can guide learners through bleeding, coolant mixing, or local maintenance schedules, ensuring precision. Learners will practice on a Hyundai i20, verifying leak-free operation, critical for South African vehicles.
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
                Diagnosing overheating involves checking coolant, thermostats, pumps, radiators, and fans. Replacing components requires proper draining, torquing, and bleeding. Flushing removes contaminants, ensuring efficient cooling and preventing costly damage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const lesson10_3: Lesson = {
  id: '10.3',
  title: 'Flushing the Cooling System',
  content: LessonContent,
  duration: 90,
  objectives: [
    "Understand the purpose and benefits of cooling system flushing",
    "Learn proper tools and materials selection for flushing",
    "Master the complete cooling system flush procedure",
    "Apply proper coolant mixing and bleeding techniques",
    "Develop maintenance scheduling for cooling system health"
  ],
  keyTerms: [
    "Cooling system flush",
    "Radiator flush solution",
    "Distilled water",
    "Coolant degradation",
    "Air bleeding",
    "Petcock valve",
    "Corrosion prevention",
    "Maintenance intervals"
  ]
};