import React from 'react';
import { Lesson } from '../../../types/course';

const LessonContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-red-600 mb-6">Monitoring Engine Performance with Advanced Diagnostic Equipment</h1>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Key Features</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Importance of Performance Monitoring</h3>
            <p className="text-gray-700 mb-4">
              Regular monitoring detects issues like misfires, knock, or sensor failures before they cause damage (R10,000–R50,000), ensuring peak efficiency (12–15 km/l), power (80–100 kW), and emissions (CO &lt;0.5%) for South African roadworthy compliance. Early detection of low fuel pressure (below 250 kPa), lean mixtures (&gt;15:1), or advanced timing (beyond 35° BTDC) prevents piston or valve damage. In South Africa, high temperatures (30–40°C in Durban) and dusty roads (e.g., R34 in KwaZulu-Natal) stress engines, requiring checks every 5,000 km. Monitoring optimizes fuel trims (±10%), timing (5–35° BTDC), and coolant temperature (80–90°C), preventing breakdowns on long routes like the N4.
            </p>
            <p className="text-gray-700 mb-4">
              Learners will explore monitoring in virtual simulations, analyzing live data for a Toyota Corolla (e.g., P0301 misfire code). Neglecting monitoring risks catastrophic failures, especially in high-altitude areas like Pretoria (1753 m). Mechanics mastering monitoring save clients R5,000–R15,000 by preventing failures. The AI voice tutor can explain data interpretation, heat effects, or emissions standards, enhancing understanding.
            </p>
            <div className="bg-green-50 p-4 rounded-lg">
              <h5 className="font-semibold text-green-800 mb-2">Real Scenario:</h5>
              <p className="text-green-700">
                A Johannesburg mechanic services a Ford Fiesta (1.4L) with a P0171 lean code, reported by a client driving at high altitude. Monitoring reveals a clogged fuel filter, reducing pressure to 200 kPa. Replacing it restores 300 kPa, improving economy from 9 km/l to 13 km/l, saving R3,000. Learners will simulate diagnosing this issue, critical for urban reliability.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Key Diagnostic Tools</h3>
            <p className="text-gray-700 mb-4">
              OBD-II scanners (e.g., Bosch KTS) retrieve DTCs (e.g., P0301) and live data (fuel trims, timing, O2 sensor readings). Wideband air-fuel ratio gauges monitor mixtures (14.7:1 ideal), critical for tuning turbo engines like Hyundai i20s (100 kPa boost). Performance data loggers record RPM, boost (50–150 kPa), and intake temperature (20–40°C), identifying trends over 1000 km. Digital vacuum/boost gauges ensure manifold pressure (20–30 kPa) and turbo operation. Infrared thermometers detect hot spots (e.g., 100°C+ in exhaust manifolds), indicating clogs. In South Africa, dust fouls sensors after 10,000 km, requiring clean connections.
            </p>
            <p className="text-gray-700 mb-4">
              Learners will simulate tool use, analyzing a P0172 rich code on a Nissan Sentra. Incorrect tools risk misdiagnosis (R2,000–R5,000). Mechanics mastering tools optimize performance, ensuring reliability for VW Polos. The AI voice tutor can explain scanner functions, mixture analysis, or dust mitigation, ensuring precision.
            </p>
            <div className="bg-green-50 p-4 rounded-lg">
              <h5 className="font-semibold text-green-800 mb-2">Real Scenario:</h5>
              <p className="text-green-700">
                A Limpopo mechanic diagnoses a Toyota Corolla (1.6L) with rough idling. An OBD-II scanner reveals a P0302 code (misfire). A wideband gauge shows a lean 16:1 ratio due to a faulty O2 sensor, clogged by dust. Replacing it restores 14.7:1, saving R5,000 in repairs. Learners will practice logging data for a virtual dyno test, vital for rural reliability.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Best Practices for Monitoring Performance</h3>
            <p className="text-gray-700 mb-4">
              Scan for DTCs every 5,000 km using OBD-II tools, even without warning lights. Monitor parameters: fuel trims (±10%), air-fuel ratio (14.7:1), timing (5–35° BTDC), coolant temperature (80–90°C), and boost (50–150 kPa). Log data in a spreadsheet, comparing to specs (e.g., 300 kPa fuel pressure). Conduct visual inspections for worn belts or clogged filters, critical in South Africa's dusty Karoo. After upgrades (e.g., turbo), verify performance with dyno tests or live data. Respond to warning signs like knocking or high exhaust temperatures (600°C+). In South Africa, high-altitude tuning requires leaner mixtures (14.5:1).
            </p>
            <p className="text-gray-700 mb-4">
              Learners will simulate monitoring a VW Polo, logging data for 10,000 km. Neglecting practices risks failures (R10,000+). Mechanics mastering monitoring ensure efficiency, saving clients R3,000+. The AI voice tutor can explain logging, parameter specs, or altitude effects, ensuring accuracy.
            </p>
            <div className="bg-green-50 p-4 rounded-lg">
              <h5 className="font-semibold text-green-800 mb-2">Real Scenario:</h5>
              <p className="text-green-700">
                A Durban mechanic monitors a Hyundai i20 turbo (1.6L) for a client on the N2. A boost gauge shows erratic 200 kPa readings due to a loose intercooler hose, causing power loss. Tightening it restores 150 kPa, improving economy to 14 km/l, saving R2,500. Learners will practice analyzing live data for a turbo engine, critical for coastal reliability.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-yellow-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Conclusion and Q&A</h3>
          <h4 className="text-lg font-semibold text-red-700 mb-3">Activities</h4>
          <div className="space-y-3">
            <div>
              <h5 className="font-semibold text-gray-700">Recap Key Points:</h5>
              <p className="text-gray-700">
                High-quality performance parts enhance durability and power, optimal fuel grades and additives ensure clean combustion, and advanced diagnostics maintain efficiency, preventing costly failures.
              </p>
            </div>
            <div>
              <h5 className="font-semibold text-gray-700">Outcome:</h5>
              <p className="text-gray-700">
                Participants will master selecting performance parts, fuel grades, and additives, and using diagnostics to optimize engine efficiency, improving power, economy (12–15 km/l), and reliability. These skills enhance workshop capabilities in South African urban (e.g., Johannesburg) and rural (e.g., Limpopo) settings, addressing challenges like heat, dust, and poor fuel quality, saving clients R5,000–R20,000 in fuel and repairs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const lesson13_3: Lesson = {
  id: '13.3',
  title: 'Monitoring Engine Performance with Advanced Diagnostic Equipment',
  content: LessonContent,
  duration: 90,
  objectives: [
    "Understand the importance of regular performance monitoring",
    "Learn to use key diagnostic tools for performance analysis",
    "Master best practices for systematic performance monitoring",
    "Apply data logging and analysis techniques",
    "Develop preventive maintenance strategies through monitoring"
  ],
  keyTerms: [
    "Performance monitoring",
    "OBD-II scanners",
    "Wideband air-fuel gauge",
    "Data loggers",
    "Vacuum/boost gauges",
    "Infrared thermometers",
    "Live data analysis",
    "Preventive diagnostics"
  ]
};