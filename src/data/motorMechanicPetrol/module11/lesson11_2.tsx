import React from 'react';
import { Lesson } from '../../../types/course';

const LessonContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-red-600 mb-6">Replacing Oil Pumps</h1>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Key Features</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Importance of the Oil Pump</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/YQLwC8xfNoQ?si=q99Xaxk2JA3RrLzB</p>
            </div>
            <p className="text-gray-700 mb-4">
              The oil pump circulates oil at 100–400 kPa, lubricating and cooling components like crankshafts and camshafts. A failing pump causes low pressure, leading to wear or seizure (R50,000+). In South Africa, high-mileage vehicles (100,000+ km) like Nissan Sentras suffer pump wear from dust and heat.
            </p>
            <p className="text-gray-700">
              Learners will explore pump function in virtual simulations, visualizing oil flow. Ignoring pump failure risks engine destruction in minutes, critical for long-distance travel. Mechanics mastering this knowledge ensure reliable lubrication, saving clients R10,000–R20,000. The AI voice tutor can explain pump types (gear vs. rotor), failure signs, or local wear factors, enhancing understanding. Learners will simulate analyzing a failing pump, proposing replacement to maintain engine health, vital for South African workshops.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Tools and Materials Needed (Oil Pump Replacement Setup)</h3>
            <p className="text-gray-700 mb-4">
              Tools include a socket set (10–17mm), wrenches, torque wrench, gasket scraper, drain pan, and optional harmonic balancer puller. Materials include a new oil pump, pickup screen, gasket or RTV sealant, oil (5–6 liters), and filter. Preparation involves cooling the engine, disconnecting the battery, and raising the vehicle. In South Africa, dust contamination requires clean workspaces.
            </p>
            <p className="text-gray-700">
              Learners will practice setup in virtual scenarios, selecting OEM-spec parts. Incorrect tools or materials risk leaks (R2,000+). Mechanics mastering setup ensure efficient repairs, critical for vehicles like Toyota Corollas. The AI voice tutor can explain tool functions, sealant use, or local dust challenges, ensuring accuracy. Learners will simulate preparing for a pump replacement, organizing tools and verifying part compatibility, enhancing reliability in South African workshops.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Steps to Replace an Oil Pump</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/dqxMWl9xb4s?si=ixLOEsDsdri1bx6I</p>
            </div>
            <p className="text-gray-700 mb-4">
              Drain oil via the pan plug, remove the oil pan bolts (10–13mm), and lower the pan, inspecting for debris. Unbolt the pump and pickup tube, clean mating surfaces, and install the new pump, torquing bolts (10–20 Nm). Reattach the pan with a new gasket or RTV, refill with oil, and test pressure (100–400 kPa). In South Africa, pump replacement every 150,000 km prevents failure.
            </p>
            <p className="text-gray-700">
              Learners will simulate the process, ensuring proper torque. Errors like debris contamination risk pump failure (R5,000+). Mechanics mastering this skill restore lubrication, saving clients R10,000+. The AI voice tutor can guide learners through torque sequences, priming, or local maintenance schedules, ensuring precision. Learners will practice on a VW Polo, verifying pressure post-repair, critical for South African vehicles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const lesson11_2: Lesson = {
  id: '11.2',
  title: 'Replacing Oil Pumps',
  content: LessonContent,
  duration: 75,
  objectives: [
    "Understand the critical importance of oil pump function",
    "Learn proper tools and materials for oil pump replacement",
    "Master the complete oil pump replacement procedure",
    "Apply correct torque specifications and testing methods",
    "Develop maintenance scheduling for oil pump longevity"
  ],
  keyTerms: [
    "Oil pump replacement",
    "Oil circulation",
    "Pickup screen",
    "Gasket sealing",
    "Torque specifications",
    "Pressure testing",
    "Oil pan removal",
    "Pump priming"
  ]
};