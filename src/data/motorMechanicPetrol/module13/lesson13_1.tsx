import React from 'react';
import { Lesson } from '../../../types/course';

const LessonContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-red-600 mb-6">Using High-Quality Performance Parts</h1>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Key Features</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Importance of Quality Components</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/m0a0cQ-Qo9c?si=8QntRDX3knFiVLZB</p>
            </div>
            <p className="text-gray-700 mb-4">
              High-quality performance parts are critical for enhancing engine efficiency, delivering 10–25% power gains (e.g., 80–100 kW in a 1.6L engine) and improving fuel economy (12–15 km/l vs. 8–10 km/l). These components, made from advanced materials like forged aluminum pistons, iridium spark plugs, or high-strength stainless steel exhausts, offer tighter tolerances (±0.01 mm for bearings) and superior durability under high stresses (6000–8000 RPM, 80–100°C). In South Africa, vehicles like VW Polos face harsh conditions—dusty rural roads (e.g., R573 in Limpopo) clog standard air filters after 10,000 km, and high temperatures (30–40°C) accelerate wear on OEM parts. Inferior parts, such as low-quality spark plugs or gaskets, cause misfires, oil leaks, or sensor failures, triggering check engine lights (e.g., P0300 code) and failing South African roadworthy tests (e-Natis compliance), costing R2,000–R5,000 in repairs.
            </p>
            <p className="text-gray-700 mb-4">
              Severe failures, like cracked pistons from cheap components, can lead to engine rebuilds (R20,000–R50,000). Learners will explore component benefits in virtual simulations, visualizing airflow gains from high-flow intakes (15–20% increase) or reduced friction from performance bearings (5–10% less wear). For example, a high-quality air filter can extend engine life by 20,000 km in dusty conditions. Mechanics mastering quality parts ensure reliability, saving clients R5,000–R15,000. The AI voice tutor can explain material properties, tolerance impacts, or local environmental challenges like dust and heat, enhancing practical understanding.
            </p>
            <div className="bg-green-50 p-4 rounded-lg">
              <h5 className="font-semibold text-green-800 mb-2">Real Scenario:</h5>
              <p className="text-green-700">
                A mechanic in Polokwane services a Toyota Corolla (1.6L, 100,000 km) with rough idling and low power (70 kW vs. 90 kW spec). The client, a taxi driver on the N1, reports frequent breakdowns due to a cheap aftermarket air filter clogging with dust. The mechanic replaces it with a K&N high-flow filter, increasing airflow by 20% and restoring power to 88 kW, improving fuel economy from 8 km/l to 12 km/l. The client saves R3,000 annually on fuel and avoids a R10,000 engine repair. Learners will simulate this scenario, selecting a compatible filter and calculating power gains, critical for rural South African reliability.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Key Performance Parts to Consider</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/GS69owXpGdY?si=oE98YvLLluLX6YMS</p>
            </div>
            <p className="text-gray-700 mb-4">
              High-performance air filters (e.g., K&N) and cold air intakes increase airflow by 15–25%, adding 5–10 kW and improving combustion efficiency, ideal for South Africa's stop-and-go urban traffic in Johannesburg. Performance exhaust systems (e.g., Borla, Magnaflow) reduce backpressure by 10–20 kPa, boosting horsepower (5–15 kW) and torque (10–20 Nm), enhancing economy (1–2 km/l) and producing a deeper exhaust note. Upgraded spark plugs (iridium, NGK) and ignition coils (MSD) deliver stronger sparks, reducing misfires by 90% and improving throttle response, critical with South Africa's 91 RON fuel. Enhanced cooling components, like high-capacity radiators or performance water pumps, maintain temperatures below 90°C, preventing overheating in Durban's 30–40°C climate.
            </p>
            <p className="text-gray-700 mb-4">
              High-quality pistons, rings, and bearings (e.g., forged steel) handle 6000+ RPMs, reducing friction by 5–10% and wear in high-mileage vehicles (100,000+ km). Aftermarket intake manifolds and timing components (e.g., reinforced belts) optimize air distribution and high-RPM stability. Learners will explore parts in virtual simulations, comparing OEM vs. performance components (e.g., 15% power gain from exhaust). Inferior parts risk failures (e.g., cracked manifolds, R5,000+). Mechanics mastering part selection optimize performance for vehicles like Ford Fiestas. The AI voice tutor can explain airflow dynamics, exhaust flow, or local heat challenges, ensuring precision.
            </p>
            <div className="bg-green-50 p-4 rounded-lg">
              <h5 className="font-semibold text-green-800 mb-2">Real Scenario:</h5>
              <p className="text-green-700">
                A Cape Town mechanic upgrades a Hyundai i20 (1.4L, turbo) for a client racing on weekends. The stock exhaust restricts flow, limiting power to 80 kW. Installing a Magnaflow exhaust and NGK iridium plugs increases power to 95 kW and torque by 15 Nm, improving lap times by 2 seconds. The mechanic verifies cooling with a high-capacity radiator, preventing overheating at 35°C track temperatures. Learners will simulate this upgrade, calculating power gains and ensuring compatibility, vital for coastal performance.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Tips for Selecting Performance Parts</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/cAlTo5PEw2M?si=zU-xflKTc7wL4-2a</p>
            </div>
            <p className="text-gray-700 mb-4">
              Choose parts from reputable brands (e.g., K&N, Bosch, MSD) with 1–2-year warranties, ensuring compatibility with engine codes (e.g., 4A-GE for Toyota) via VIN or manufacturer specs. Verify fitment to avoid mismatches, which cause misfires or leaks (R2,000–R5,000). In South Africa, dusty Karoo roads require frequent cleaning of high-flow intakes (every 5,000 km). Invest in professional installation and ECU tuning to maximize gains (e.g., 10 kW from a tuned intake), as improper setups reduce reliability. Balance performance with maintenance costs: turbo kits increase power by 30% but stress clutches (R10,000+).
            </p>
            <p className="text-gray-700 mb-4">
              Create a build plan (e.g., Stage 1: intake, exhaust; Stage 2: ECU tune) to avoid compatibility issues. Track purchases in a spreadsheet, noting part numbers and torque specs (e.g., 20 Nm for intake bolts). Learners will practice part selection in virtual scenarios, evaluating a Nissan Sentra's needs. Incorrect choices fail roadworthy tests or cause breakdowns. Mechanics mastering selection optimize upgrades, saving clients R3,000–R10,000. The AI voice tutor can explain compatibility checks, tuning needs, or dust mitigation, ensuring accuracy.
            </p>
            <div className="bg-green-50 p-4 rounded-lg">
              <h5 className="font-semibold text-green-800 mb-2">Real Scenario:</h5>
              <p className="text-green-700">
                A Pretoria mechanic services a VW Polo (1.6L, 120,000 km) for a client driving in high-altitude conditions (1753 m). The client reports sluggish performance due to a mismatched aftermarket intake. The mechanic selects a K&N intake and tunes the ECU, boosting power by 8 kW and economy from 9 km/l to 13 km/l. The client avoids a R5,000 repair bill. Learners will simulate selecting a compatible intake, ensuring altitude-appropriate tuning, critical for urban reliability.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const lesson13_1: Lesson = {
  id: '13.1',
  title: 'Using High-Quality Performance Parts',
  content: LessonContent,
  duration: 45,
  objectives: [
    "Understand the importance and benefits of quality performance components",
    "Learn about key performance parts and their applications",
    "Master selection criteria for performance parts",
    "Apply compatibility and installation considerations",
    "Develop cost-effective performance upgrade strategies"
  ],
  keyTerms: [
    "Performance parts",
    "High-flow air filter",
    "Cold air intake",
    "Performance exhaust",
    "Iridium spark plugs",
    "Forged components",
    "ECU tuning",
    "Compatibility checks"
  ]
};