import React from 'react';
import { Lesson } from '../../../types/course';

const LessonContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-red-600 mb-6">Proper Handling of Fuels and Chemicals</h1>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Key Features</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Fuel Hazards and Precautions</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/5wzzbJa6n94?si=W7ayG7ypm81sMKna</p>
            </div>
            <p className="text-gray-700 mb-4">
              Fuels like petrol and diesel are highly flammable, igniting easily from sparks, flames, or heat, and prolonged skin contact can cause irritation or burns. Safe handling involves using PPE, ensuring ventilation, and avoiding ignition sources to prevent fires or health risks.
            </p>
            <p className="text-gray-700">
              Fuels pose significant risks in automotive workshops due to their volatility and potential for catastrophic fires or explosions. Learners will explore safe handling techniques through virtual scenarios, such as transferring petrol using approved pumps or wearing nitrile gloves to avoid skin exposure. Precautions like grounding containers to prevent static sparks are critical for safety. Mechanics mastering fuel handling can prevent accidents, ensuring a safe workshop environment. The AI voice tutor can guide learners through safe fuel transfer protocols or emergency response steps for fuel spills, enhancing workshop safety.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Chemical Hazards and Safety Data Sheets (SDS)</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/-1qFlEXqI30?si=bgBQl7ew4_dN1uan</p>
            </div>
            <p className="text-gray-700 mb-4">
              Chemicals like degreasers, solvents, and cleaners can cause skin burns, respiratory issues, or eye damage due to toxic properties or VOC emissions. Safety Data Sheets (SDS) provide critical handling, storage, and emergency information for each chemical, ensuring safe use.
            </p>
            <p className="text-gray-700">
              Understanding chemical hazards and SDS is essential for preventing health risks in workshops, where exposure to solvents or cleaners is common. Learners will review SDS documents through virtual exercises, identifying precautions for chemicals like brake cleaner or antifreeze. Proper use of PPE and ventilation systems mitigates risks like inhalation or skin contact. Mechanics mastering these practices can handle chemicals safely, protecting themselves and colleagues. The AI voice tutor can explain how to interpret SDS sections or select PPE for specific chemicals, ensuring compliance with safety regulations.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Safe Storage Practices</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/xh1e1dRivko?si=58_EuBoZ16H_G5ML</p>
            </div>
            <p className="text-gray-700 mb-4">
              Fuels and chemicals must be stored in labeled, approved containers in cool, well-ventilated areas away from ignition sources. Secondary containment, like spill trays, and separation of incompatible substances (e.g., acids and bases) prevent accidents and reactions.
            </p>
            <p className="text-gray-700">
              Proper storage of fuels and chemicals is critical for preventing fires, spills, or chemical reactions that could endanger the workshop. Learners will explore storage protocols through simulations, practicing labeling and organizing flammable liquids in fire-rated cabinets. Incorrect storage, such as keeping petrol near welding stations, can lead to catastrophic incidents. Mechanics mastering storage practices can maintain a safe and compliant workshop environment. The AI voice tutor can guide learners through setting up storage systems or responding to spills, offering practical safety solutions.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Spill Containment and Cleanup</h3>
            <p className="text-gray-700 mb-4">
              Spill kits with absorbent materials, gloves, and disposal bags are essential for managing fuel or chemical spills. Secondary containment, like bunds or trays, catches leaks, while immediate cleanup prevents slips, fires, or environmental contamination.
            </p>
            <p className="text-gray-700">
              Effective spill containment and cleanup are vital for maintaining workshop safety and environmental compliance, as spills can create slippery surfaces or ignite. Learners will practice spill response through virtual scenarios, using absorbent pads to clean up simulated petrol spills. Proper disposal of contaminated materials ensures compliance with local regulations. Mechanics mastering spill management can prevent accidents and fines, ensuring a safe workplace. The AI voice tutor can guide learners through spill kit usage or proper disposal procedures, enhancing emergency preparedness.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Handling and Disposal Procedures</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/mAxw-3nrzI8?si=roA0CnnC9aeCRMPf</p>
            </div>
            <p className="text-gray-700 mb-4">
              Safe handling involves reading SDS, wearing PPE, using approved transfer methods, and ensuring ventilation. After use, chemicals and containers must be disposed of according to local regulations, often at designated hazardous waste facilities, to prevent environmental harm.
            </p>
            <p className="text-gray-700">
              Proper handling and disposal of chemicals prevent health risks and environmental damage, critical in workshops where solvents and fuels are prevalent. Learners will practice safe transfer techniques, like using pumps for fuel, and learn disposal protocols through virtual exercises. Improper disposal, such as pouring chemicals down drains, can lead to fines or ecological harm. Mechanics mastering these procedures can maintain compliance and safety, protecting themselves and the environment. The AI voice tutor can explain safe handling techniques or local disposal regulations, ensuring practical application.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const lesson3_2: Lesson = {
  id: '3.2',
  title: 'Proper Handling of Fuels and Chemicals',
  content: LessonContent,
  duration: 60,
  objectives: [
    "Understand fuel and chemical hazards in automotive workshops",
    "Apply proper handling and storage procedures for hazardous materials",
    "Read and interpret Safety Data Sheets (SDS)",
    "Implement spill containment and cleanup procedures",
    "Ensure compliance with environmental regulations for disposal"
  ],
  keyTerms: [
    "Safety Data Sheets (SDS)",
    "Volatile Organic Compounds (VOCs)",
    "Secondary containment",
    "Spill kits",
    "Hazardous waste",
    "Fire-rated cabinets",
    "Incompatible substances",
    "Environmental compliance"
  ]
};