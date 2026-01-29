import React from 'react';
import { Lesson } from '../../../types/course';

const LessonContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-red-600 mb-6">Addressing Minor Gasket Leaks</h1>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Key Features</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Common Gasket Issues</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/MVlE_gCcUtI?si=uMf8wmXXOIt9gEr4</p>
            </div>
            <p className="text-gray-700 mb-4">
              Gaskets seal engine components, preventing oil, coolant, or air leaks. Valve cover gaskets stop oil seepage from the cylinder head, intake manifold gaskets ensure proper air-fuel mixture, and oil pan gaskets prevent drips from the crankcase. Leaks occur due to heat cycles drying out gaskets (common after 80,000 km in South Africa's hot climate), causing oil stains, vacuum issues, or drips costing R500–R2,000 to repair. Valve cover leaks produce burning oil smells, intake leaks cause rough idling (P0171 codes), and oil pan leaks leave puddles under parked vehicles. In coastal areas, humidity accelerates gasket degradation.
            </p>
            <p className="text-gray-700">
              Learners will explore gasket types in virtual simulations, identifying leak signs like oil residue or hissing noises. Ignoring leaks risks low oil pressure (R5,000+ pump damage) or emissions fines (R5,000+). Mechanics mastering gasket repairs prevent escalation, ensuring engine health. The AI voice tutor can explain gasket functions, leak impacts, or local climate effects, enhancing understanding. Learners will simulate identifying a valve cover leak on a Toyota Corolla, proposing repairs to save clients from costly engine damage, critical for reliability in South Africa's varied conditions.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Diagnosing a Gasket Leak</h3>
            <p className="text-gray-700 mb-4">
              Diagnosing gasket leaks involves visual inspection for oil or coolant residue around valve covers, intake manifolds, or oil pans, and checking for drips under the vehicle. A hissing noise or rough idling (600–1,000 RPM fluctuations) suggests an intake manifold leak, often confirmed with a smoke test or carb cleaner spray (engine speed changes indicate leaks). OBD-II codes like P0171 or compression tests diagnose intake or head gasket issues. In South Africa, dust and heat accelerate gasket wear after 5 years, especially in high-mileage vehicles like VW Golfs.
            </p>
            <p className="text-gray-700">
              Learners will practice diagnostics in virtual scenarios, identifying oil stains or vacuum leaks and correlating with codes. Ignoring leaks risks engine damage (R20,000+) or fines for oil spills. Mechanics mastering diagnostics avoid misrepairs, saving clients R1,000–R5,000. The AI voice tutor can guide learners through smoke tests, code analysis, or local wear factors, ensuring accuracy. Learners will simulate diagnosing an intake leak on a Ford Fiesta, proposing gasket replacement, enhancing efficiency for urban or rural workshops where quick repairs are vital.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Tools and Materials Needed</h3>
            <p className="text-gray-700 mb-4">
              Gasket repairs require a socket set (8–13mm), ratchet, torque wrench (for precise Nm specs), plastic scraper, degreaser, and rags. Materials include OEM or high-quality aftermarket gaskets, RTV sealant (if specified), and replacement fluids (oil or coolant). Optional tools include a pry bar for stuck components and a cooling system pressure tester for head gasket leaks. Preparation involves cleaning the work area to prevent debris contamination, draining fluids if needed, and ensuring a cool engine to avoid burns. In South Africa, dust can contaminate surfaces, requiring thorough cleaning.
            </p>
            <p className="text-gray-700">
              Learners will practice setup in virtual scenarios, selecting tools and materials for a valve cover gasket repair. Incorrect tools or sealant misuse risks new leaks (R2,000+). Mechanics mastering setup ensure clean, efficient repairs, critical for vehicles like Hyundai i20s. The AI voice tutor can explain tool selection, sealant application, or local contamination risks, ensuring precision. Learners will simulate preparing for an oil pan gasket repair, organizing tools and verifying sealant compatibility, enhancing reliability in South African workshops.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Repair Steps</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/rywFdTc4dMo?si=ILYQkf1CTyj491gy</p>
            </div>
            <p className="text-gray-700 mb-4">
              To address a gasket leak, clean the area with degreaser to confirm the source, then remove the component (e.g., valve cover) by loosening bolts in a crisscross pattern (8–12 Nm). Peel off the old gasket, scrape residue with a plastic scraper to avoid surface damage, and clean thoroughly. Position the new gasket, applying RTV sealant if specified, and reassemble, torquing bolts evenly to manufacturer specs. Refill fluids and test for leaks by idling the engine and checking for drips or vacuum issues. In South Africa, coastal humidity requires extra sealant care to prevent future leaks.
            </p>
            <p className="text-gray-700">
              Learners will simulate replacing a valve cover gasket on a Nissan Sentra, ensuring proper torque and leak-free results. Errors like overtightening risk gasket crushing (R1,000+ re-repair). Mechanics mastering this skill prevent oil loss, saving clients R500–R2,000. The AI voice tutor can guide learners through torque sequences, sealant use, or local humidity impacts, ensuring accuracy. Learners will verify repairs with a test drive, critical for South African vehicles in high-use urban or rural settings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const lesson9_2: Lesson = {
  id: '9.2',
  title: 'Addressing Minor Gasket Leaks',
  content: LessonContent,
  duration: 45,
  objectives: [
    "Identify common gasket types and their functions",
    "Learn to diagnose gasket leaks through visual and technical inspection",
    "Master proper tools and materials selection for gasket repairs",
    "Apply correct gasket replacement procedures",
    "Understand prevention strategies for gasket degradation"
  ],
  keyTerms: [
    "Valve cover gasket",
    "Intake manifold gasket",
    "Oil pan gasket",
    "RTV sealant",
    "Torque sequence",
    "Vacuum leak",
    "Gasket degradation",
    "Heat cycles"
  ]
};