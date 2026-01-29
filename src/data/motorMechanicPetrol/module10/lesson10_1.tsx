import React from 'react';
import { Lesson } from '../../../types/course';

const LessonContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-red-600 mb-6">Diagnosing Overheating Issues</h1>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Key Features</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Common Causes of Overheating</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/8KAszximKhw?si=s6Q8zbvFlSOyvAYt</p>
            </div>
            <p className="text-gray-700 mb-4">
              Overheating can damage engines, costing R20,000–R50,000 in repairs. Common causes include low coolant levels from leaks (hoses, radiator, heater core) or evaporation, often seen in South Africa's high temperatures (30–40°C). A stuck-closed thermostat (failing to open at 85–90°C) blocks coolant flow, while a stuck-open one delays warm-up, reducing efficiency. Failing water pumps cause leaks or poor circulation, evident from whining noises or drips. Clogged radiators (internal corrosion or external debris) reduce heat transfer, and faulty fans (electric or clutch-driven) impair airflow, especially at idle. In South Africa, dust clogs radiator fins after 20,000 km, exacerbating overheating in stop-and-go traffic.
            </p>
            <p className="text-gray-700">
              Learners will explore causes in virtual simulations, visualizing coolant flow and fan operation. Ignoring issues risks head gasket failure (R15,000+). Mechanics mastering this knowledge prevent catastrophic damage, ensuring reliability for vehicles like Toyota Corollas. The AI voice tutor can explain local climate impacts, leak sources, or fan types, enhancing understanding. Learners will simulate identifying a clogged radiator, proposing solutions to save clients costly repairs, critical in rural areas with limited workshop access.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Signs of Overheating (Overheating Symptoms)</h3>
            <p className="text-gray-700 mb-4">
              Overheating manifests as a rising temperature gauge (above 90°C), coolant boiling (steam from the hood), or overflow tank bubbling, indicating pressure buildup or head gasket issues. Power loss, knocking sounds (pre-ignition), or discolored coolant (rusty or oily) signal problems, with white exhaust smoke suggesting head gasket failure. Persistent leaks under the vehicle or a sweet coolant smell indicate hose or radiator issues, common in South Africa's coastal humidity.
            </p>
            <p className="text-gray-700">
              Learners will practice identifying symptoms in virtual scenarios, correlating steam with low coolant or knocking with overheating. Ignoring signs risks engine seizure (R50,000+). Mechanics mastering symptom recognition diagnose issues early, saving clients R5,000–R20,000. The AI voice tutor can explain symptom causes, head gasket diagnostics, or local environmental factors, ensuring precision. Learners will simulate diagnosing a vehicle with steam and a P0128 code (coolant temperature below thermostat range), proposing repairs for vehicles like VW Polos, ensuring reliability in urban or rural South African conditions.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Diagnostic Steps (Overheating Diagnostic Procedure)</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/l04NOlfOumk?si=i5GRpRAVxUKG95IK</p>
            </div>
            <p className="text-gray-700 mb-4">
              Diagnosing overheating starts with checking coolant levels and condition (rusty or oily indicates corrosion or contamination) when the engine is cool. Test the thermostat by feeling the upper radiator hose (hot at 85–90°C if open) or submerging it in 90°C water to verify opening. Inspect hoses for cracks or leaks, and check the radiator for debris or uneven cooling (using an infrared thermometer). Verify fan operation (electric fans activate at 95°C) and listen for water pump noises (whining or grinding). Check belt tension (10–15 mm deflection). In South Africa, dust and heat accelerate hose degradation after 5 years.
            </p>
            <p className="text-gray-700">
              Learners will practice diagnostics in virtual scenarios, using a pressure tester to detect leaks (e.g., 100 kPa drop). Misdiagnosis risks unnecessary repairs (R2,000+). Mechanics mastering diagnostics ensure accurate fixes, critical for vehicles like Ford Fiestas. The AI voice tutor can guide learners through pressure testing, thermostat checks, or local wear factors, ensuring precision. Learners will simulate diagnosing a low coolant issue, proposing repairs to prevent breakdowns on South African highways.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const lesson10_1: Lesson = {
  id: '10.1',
  title: 'Diagnosing Overheating Issues',
  content: LessonContent,
  duration: 60,
  objectives: [
    "Identify common causes of engine overheating",
    "Recognize symptoms and signs of overheating problems",
    "Apply systematic diagnostic procedures for cooling system issues",
    "Use proper testing techniques and tools for diagnosis",
    "Understand environmental factors affecting cooling systems"
  ],
  keyTerms: [
    "Overheating",
    "Thermostat",
    "Water pump",
    "Radiator",
    "Coolant flow",
    "Head gasket",
    "Cooling fans",
    "Temperature gauge"
  ]
};