import React from 'react';
import { Lesson } from '../../../types/course';

const LessonContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-red-600 mb-6">Verifying Coolant Levels and Condition</h1>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Key Features</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Role of Coolant</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/HPVckPH6o-w?si=XgHWKXX3lV74hfJW</p>
            </div>
            <p className="text-gray-700 mb-4">
              Coolant, a 50/50 mix of ethylene/propylene glycol and water, regulates engine temperature by absorbing and transferring heat, prevents freezing in cold climates, and protects against corrosion in the radiator, water pump, and engine block. It ensures the engine operates within safe temperature ranges (80–100°C), avoiding damage like warped heads or blown gaskets.
            </p>
            <p className="text-gray-700">
              Learners will explore coolant properties in virtual simulations, understanding its role in heat dissipation and corrosion prevention. Low or degraded coolant can cause overheating, leading to repairs costing thousands of rands. Mechanics mastering coolant maintenance ensure reliable cooling, extending engine life. The AI voice tutor can explain coolant types or diagnose overheating causes, offering practical insights for workshops.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Checking Coolant Levels</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/9rdwD9bx_us?si=KLAOqFNvOPdnpc8g</p>
            </div>
            <p className="text-gray-700 mb-4">
              Checking coolant when the engine is cold involves inspecting the reservoir's "MIN" and "MAX" marks or the radiator's level (near the neck). Topping up with a 50/50 coolant-water mix maintains system pressure and prevents overheating. Low levels may indicate leaks, while overfilling can cause pressure buildup, damaging hoses.
            </p>
            <p className="text-gray-700">
              Learners will practice checks in virtual scenarios, identifying issues like air bubbles or low levels. Regular checks, ideally monthly, ensure cooling efficiency, especially in hot South African climates. Mechanics mastering this task prevent costly overheating damage, ensuring vehicle reliability. The AI voice tutor can guide learners through safe checking procedures or spotting leaks, ensuring accurate maintenance.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Testing Coolant Condition</h3>
            <p className="text-gray-700 mb-4">
              Coolant condition is assessed for rust, cloudiness, or particles, indicating corrosion or contamination (e.g., milky coolant suggests a head gasket leak). A coolant tester measures freeze/boil protection (e.g., -37°C to 129°C), ensuring system reliability. Rusty coolant can clog radiators, reducing cooling efficiency, while contaminated coolant may corrode components.
            </p>
            <p className="text-gray-700">
              Learners will use virtual testers to evaluate coolant, identifying issues like scale buildup. This skill helps mechanics diagnose cooling system failures early, preventing major repairs. The AI voice tutor can explain tester usage or contamination signs, enhancing diagnostic precision for real-world applications.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Flushing and Replacing Coolant</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/XdyZDw7jOP0?si=w4IrXlnKn4Wt1IXm</p>
            </div>
            <p className="text-gray-700 mb-4">
              Coolant flushes, needed every 50,000–100,000 kilometres, involve draining old coolant, flushing the system with water or a cleaning solution, and refilling with fresh coolant. Running the engine with the radiator cap off removes air bubbles, ensuring proper circulation. Improper flushes can leave air pockets, causing overheating, or old coolant can corrode components.
            </p>
            <p className="text-gray-700">
              Learners will simulate flushes, practicing techniques to avoid blockages. This task maintains cooling efficiency, critical for engine longevity. Mechanics mastering flushes ensure reliable systems, preventing costly failures. The AI voice tutor can guide learners through flush procedures or air bubble removal, ensuring precision.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Safety in Coolant Handling</h3>
            <p className="text-gray-700 mb-4">
              Coolant handling requires PPE like gloves and goggles, as it's toxic and can cause skin irritation or burns if hot. Never open a hot radiator cap to avoid scalding from pressurized steam. Used coolant must be disposed of at recycling centres per South African regulations (e.g., Hazardous Waste Management guidelines), and spills cleaned immediately to prevent slips or environmental harm.
            </p>
            <p className="text-gray-700">
              Learners will practice safe handling in virtual scenarios, using PPE and proper disposal methods. Mishandling can lead to injuries or fines, making safety critical. Mechanics mastering these practices ensure safe, compliant workshops. The AI voice tutor can explain safe handling protocols or local disposal rules, ensuring adherence to standards.
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
                Routine maintenance tasks like oil changes, air filter replacement, spark plug servicing, and coolant checks ensure engine efficiency, longevity, and performance. Neglecting these tasks leads to wear, reduced fuel economy, and costly repairs, emphasizing their importance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const lesson4_4: Lesson = {
  id: '4.4',
  title: 'Verifying Coolant Levels and Condition',
  content: LessonContent,
  duration: 30,
  objectives: [
    "Understand the role and importance of coolant in engine operation",
    "Master coolant level checking procedures and condition assessment",
    "Execute proper coolant flushing and replacement procedures",
    "Apply safe coolant handling and disposal practices",
    "Diagnose coolant system issues and contamination"
  ],
  keyTerms: [
    "Coolant mixture ratio",
    "Freeze/boil protection",
    "Coolant reservoir",
    "Head gasket leak",
    "Coolant contamination",
    "System flushing",
    "Air bubbles",
    "Coolant disposal"
  ]
};