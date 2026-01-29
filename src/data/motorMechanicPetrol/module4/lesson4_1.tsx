import React from 'react';
import { Lesson } from '../../../types/course';

const LessonContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-red-600 mb-6">Checking and Changing Engine Oil</h1>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Key Features</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Role of Engine Oil</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/4AIvbZew_c0?si=YRlm2RrR6-0JYphx</p>
            </div>
            <p className="text-gray-700 mb-4">
              Engine oil is critical for lubricating moving parts like pistons, crankshafts, and camshafts, reducing friction and wear that could otherwise lead to premature component failure. It also dissipates heat, cooling critical engine areas, and suspends contaminants like metal particles or carbon deposits, preventing sludge buildup. Without regular maintenance, dirty or low oil increases friction, causing overheating, accelerated wear, and potential engine seizure. For example, neglecting oil changes in high-performance engines can lead to bearing failure within 20,000 kilometres.
            </p>
            <p className="text-gray-700">
              Learners will explore oil viscosity grades (e.g., 5W-30) through virtual simulations, understanding how they affect performance in varying temperatures. Mechanics mastering oil maintenance can prevent catastrophic failures, ensuring vehicles run smoothly and efficiently, saving clients from costly repairs. The AI voice tutor can guide learners on selecting oil grades for specific engines or diagnosing issues like low oil pressure, offering practical insights for workshop applications.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Checking Oil Levels and Condition</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/MAwxOt-odP0?si=nkT6fp-1eUzC29Yh</p>
            </div>
            <p className="text-gray-700 mb-4">
              Checking oil levels ensures the engine has sufficient lubrication to operate safely. On a level surface, after the engine cools, the dipstick is used to assess oil quantity and quality. Clean, amber oil indicates good condition, while dark, gritty, or milky oil suggests contamination (e.g., coolant leaks) or overdue changes. Low levels can starve components of lubrication, leading to damage like scored cylinders.
            </p>
            <p className="text-gray-700">
              Learners will practice dipstick checks in virtual scenarios, identifying issues like metal shavings or water contamination, which could indicate serious problems like a blown head gasket. This skill allows mechanics to catch issues early, preventing major repairs. Regular checks, ideally every 1,000 kilometres, maintain engine health, especially in high-mileage vehicles. The AI voice tutor can explain how to interpret dipstick readings or diagnose contamination, ensuring accurate maintenance decisions in real-world settings.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Changing Engine Oil</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/O1hF25Cowv8?si=FevufPq5b1VK7YnF</p>
            </div>
            <p className="text-gray-700 mb-4">
              Oil changes, recommended every 8,000–12,000 kilometres or per manufacturer guidelines, involve draining old oil, replacing the filter, and refilling with the correct oil grade (e.g., SAE 10W-40). Warming the engine slightly loosens oil for easier draining, but care must be taken to avoid burns. A drain pan collects used oil, and the drain plug must be securely reinstalled to prevent leaks. Overfilling or using the wrong oil grade can cause foaming or inadequate lubrication, damaging components.
            </p>
            <p className="text-gray-700">
              Learners will simulate oil changes, practicing steps like torquing the drain plug to 25–35 Nm. This task ensures optimal lubrication and prevents sludge, critical for engine longevity. Mechanics mastering oil changes can deliver reliable services, boosting client confidence. The AI voice tutor can guide learners on oil selection or troubleshooting post-change leaks, ensuring precision.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Oil Filter Replacement Guide</h3>
            <p className="text-gray-700 mb-4">
              The oil filter traps contaminants like dirt and metal particles, ensuring clean oil circulates through the engine. Replaced during oil changes, the filter requires lubricating its gasket with fresh oil to ensure a tight seal and prevent leaks. Tightening to manufacturer specs (typically hand-tight plus a quarter-turn) avoids over-tightening, which can damage threads. A clogged filter restricts oil flow, risking engine wear or overheating.
            </p>
            <p className="text-gray-700">
              Learners will practice filter replacement in virtual simulations, focusing on proper installation to maintain oil pressure. Selecting the correct filter for the vehicle's make and model is crucial, as mismatches can cause bypass issues. Mechanics mastering this task ensure clean lubrication, vital for engine durability. The AI voice tutor can explain filter compatibility or diagnose issues like low oil pressure due to a faulty filter, enhancing maintenance accuracy.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Safety and Disposal Considerations</h3>
            <p className="text-gray-700 mb-4">
              Safe oil handling requires PPE like nitrile gloves and safety goggles to protect against skin irritation or splashes. Used oil, classified as hazardous waste, must be collected in sealed containers and disposed of at certified recycling centres to prevent environmental contamination. Spills should be cleaned immediately with absorbent materials to avoid slips or fire hazards. Warm oil increases burn risks, so cooling periods are essential.
            </p>
            <p className="text-gray-700">
              Learners will practice spill cleanup and disposal protocols in virtual scenarios, ensuring compliance with South African environmental regulations, such as the National Environmental Management: Waste Act. Improper disposal can lead to fines or ecological harm. Mechanics mastering these practices maintain safe, eco-friendly workshops, protecting themselves and the environment. The AI voice tutor can guide learners on local disposal laws or spill response techniques, ensuring safe practices.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const lesson4_1: Lesson = {
  id: '4.1',
  title: 'Checking and Changing Engine Oil',
  content: LessonContent,
  duration: 60,
  objectives: [
    "Understand the critical role of engine oil in vehicle operation",
    "Master proper oil level checking procedures and condition assessment",
    "Execute complete oil change procedures safely and efficiently",
    "Apply proper oil filter replacement techniques",
    "Implement safe disposal and environmental compliance practices"
  ],
  keyTerms: [
    "Engine oil viscosity",
    "Dipstick reading",
    "Oil contamination",
    "Oil filter gasket",
    "Drain plug torque",
    "Oil disposal",
    "Hazardous waste",
    "Lubrication system"
  ]
};