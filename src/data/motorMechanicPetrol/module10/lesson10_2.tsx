import React from 'react';
import { Lesson } from '../../../types/course';

const LessonContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-red-600 mb-6">Replacing Key Cooling System Components</h1>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Key Features</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Thermostat Replacement Procedure</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/ejugXlSPORM?si=ZMoBuT0lnuoU5pB7</p>
            </div>
            <p className="text-gray-700 mb-4">
              The thermostat regulates coolant flow, opening at 85–90°C to prevent overheating. A stuck-closed thermostat causes overheating (above 100°C), while a stuck-open one reduces efficiency. Tools include wrenches (10–13mm), a screwdriver, a new thermostat, gasket or O-ring, coolant, and a drain pan. Cool the engine, drain coolant (2–3 liters), remove the thermostat housing bolts, and replace the thermostat (spring side toward engine). Torque bolts to specs (8–15 Nm), refill coolant, and bleed air by running the engine with the radiator cap off. In South Africa, poor coolant quality accelerates thermostat sticking after 80,000 km.
            </p>
            <p className="text-gray-700">
              Learners will simulate replacement, ensuring proper orientation. Errors like improper sealing risk leaks (R1,000+). Mechanics mastering this skill restore cooling efficiency, saving clients R2,000–R5,000. The AI voice tutor can explain torque specs, bleeding techniques, or local coolant issues, ensuring accuracy. Learners will practice on a Hyundai i20, verifying thermostat operation post-repair, critical for reliable performance in South Africa's hot climate.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Water Pump Replacement Procedure</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/47wOTVNrK4A?si=3yw2DZJChI9lQx_B</p>
            </div>
            <p className="text-gray-700 mb-4">
              The water pump circulates coolant, and failure (leaks or bearing wear) causes overheating or whining noises. Tools include a socket set (10–17mm), wrenches, a new pump, gasket, coolant, and a scraper. Drain the system, remove drive or timing belts, unbolt the pump, and clean the mounting surface. Install the new pump, torque bolts (10–20 Nm), reassemble belts, and refill coolant. In South Africa, dust and heat shorten pump life to 100,000 km.
            </p>
            <p className="text-gray-700">
              Learners will simulate replacement, ensuring belt alignment. Errors like overtightening risk pump damage (R3,000+). Mechanics mastering this skill prevent overheating, saving clients R5,000–R10,000. The AI voice tutor can guide learners through belt tensioning, torque specs, or local wear factors, ensuring precision. Learners will practice on a Nissan Sentra, verifying leak-free operation, critical for long-distance reliability in South Africa's rural areas.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Radiator Replacement Procedure</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/MeruAZebIeU?si=uvVOKw9lYyu_1Fnh</p>
            </div>
            <p className="text-gray-700 mb-4">
              Radiators dissipate heat, and clogs or leaks cause overheating. Tools include screwdrivers, wrenches (10–13mm), a new radiator, hoses (if worn), coolant, and a drain pan. Drain the system, disconnect hoses and transmission lines (if applicable), remove mounting brackets, and extract the radiator. Install the new radiator, torque bolts (8–12 Nm), reconnect hoses, and refill coolant, bleeding air during engine warm-up. In South Africa, dust clogs radiators after 50,000 km, especially in dry regions.
            </p>
            <p className="text-gray-700">
              Learners will simulate replacement, ensuring proper hose clamping. Errors like loose connections risk leaks (R2,000+). Mechanics mastering this skill ensure efficient cooling, saving clients R5,000–R15,000. The AI voice tutor can explain hose sealing, air bleeding, or local dust impacts, ensuring accuracy. Learners will practice on a Toyota Corolla, verifying cooling performance, vital for South African urban traffic or rural highways.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const lesson10_2: Lesson = {
  id: '10.2',
  title: 'Replacing Key Cooling System Components',
  content: LessonContent,
  duration: 90,
  objectives: [
    "Master thermostat replacement procedures and specifications",
    "Learn water pump replacement techniques and belt alignment",
    "Apply proper radiator replacement and installation methods",
    "Understand torque specifications and bleeding procedures",
    "Develop skills in component inspection and testing"
  ],
  keyTerms: [
    "Thermostat replacement",
    "Water pump installation",
    "Radiator mounting",
    "Torque specifications",
    "Air bleeding",
    "Belt alignment",
    "Coolant refilling",
    "Gasket sealing"
  ]
};