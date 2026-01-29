import React from 'react';
import { Lesson } from '../../../types/course';

const LessonContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-red-600 mb-6">Selecting the Right Fuel Grade and Additives</h1>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Key Features</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Fuel Grade and Octane Ratings</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/ltjVT1wyUuw?si=dMQe5eR-J_PXqCjR</p>
            </div>
            <p className="text-gray-700 mb-4">
              Octane ratings (91–95 RON in South Africa) measure fuel's resistance to knocking, critical for high-compression engines (10:1, e.g., Ford Fiesta ST) or turbocharged vehicles (100–150 kPa boost). Higher octane (95 RON) ensures stable combustion under high pressures (800–1000 kPa), preventing pre-ignition that damages pistons or valves (R15,000–R30,000). Standard engines (8:1 compression, e.g., Toyota Corolla 1.4L) run efficiently on 93 RON, but performance-tuned or high-altitude vehicles (e.g., Johannesburg, 1753 m) require 95 RON to avoid knock, which reduces power by 10–15% and economy (8–10 km/l vs. 12–15 km/l). In South Africa, rural stations often supply inconsistent 91 RON fuel, increasing detonation risk in hot climates (30–40°C).
            </p>
            <p className="text-gray-700 mb-4">
              Learners will explore octane effects in virtual simulations, visualizing combustion stability with 93 vs. 95 RON. Using lower-than-recommended octane triggers knock sensors (P0325 code), failing emissions tests, while higher octane offers no benefit unless tuned for it (e.g., ECU remap for 95 RON). Mechanics mastering fuel selection optimize performance, saving clients R2,000–R5,000 in fuel and repairs. The AI voice tutor can explain knock dynamics, altitude effects, or local fuel quality issues, enhancing understanding.
            </p>
            <div className="bg-green-50 p-4 rounded-lg">
              <h5 className="font-semibold text-green-800 mb-2">Real Scenario:</h5>
              <p className="text-green-700">
                A Durban mechanic services a Hyundai i20 turbo (1.6L) for a client reporting knocking on the N2 highway. The client uses 91 RON fuel, causing detonation at 35°C. The mechanic recommends 95 RON, eliminating knock and improving economy from 10 km/l to 14 km/l, saving R2,500 annually. Learners will simulate selecting 95 RON, analyzing knock reduction, critical for coastal reliability.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Role of Fuel Additives</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/FwX5iIXz0jA?si=aQU1DxDa1L-70Zql</p>
            </div>
            <p className="text-gray-700 mb-4">
              Fuel additives enhance performance and protect components. Detergent additives (e.g., Techron, Liqui Moly) clean injectors, valves, and combustion chambers, restoring spray patterns and improving economy by 1–2 km/l (e.g., 12 km/l to 14 km/l). Octane boosters raise RON by 2–6 points, reducing knock in tuned engines when 95 RON is unavailable, common in rural South Africa (e.g., Limpopo). Fuel system conditioners remove water, preventing tank corrosion (R5,000+ repairs), critical in humid coastal areas like Durban (80% humidity). Performance enhancers claim 3–5% power gains but require reputable brands to avoid O2 sensor fouling (R2,000–R3,000).
            </p>
            <p className="text-gray-700 mb-4">
              In South Africa, poor fuel quality accelerates injector clogs after 50,000 km, reducing power by 10%. Learners will simulate additive effects, observing injector cleaning in a virtual flow bench. Overuse risks carbon buildup or sensor damage (R2,000–R5,000). Mechanics mastering additives maintain efficiency, saving clients R3,000+. The AI voice tutor can explain additive chemistry, dosage calculations, or humidity impacts, ensuring precision.
            </p>
            <div className="bg-green-50 p-4 rounded-lg">
              <h5 className="font-semibold text-green-800 mb-2">Real Scenario:</h5>
              <p className="text-green-700">
                A mechanic in Bloemfontein services a Ford Fiesta (1.4L, 80,000 km) with hesitation due to clogged injectors from poor fuel. Using a Techron cleaner every 10,000 km restores spray patterns, boosting economy from 9 km/l to 13 km/l and saving R2,000 in fuel annually. Learners will practice selecting a cleaner, verifying economy gains, vital for Free State reliability.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Best Practices for Fuel and Additives</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/IZMKcbC0rTs?si=WLCVjApDYjPJtK89</p>
            </div>
            <p className="text-gray-700 mb-4">
              Source fuel from reputable stations (e.g., Engen, Shell) to avoid contaminants, critical in South Africa's rural areas where 91 RON fuel may contain impurities. Match octane to specs (93 RON for standard engines, 95 RON for turbocharged). Use additives like injector cleaners every 10,000 km (300 ml per 60L tank) to maintain spray patterns. Monitor economy (km/l) and power (kW) to validate additive effects, using OBD-II scanners for fuel trim data (±10% ideal). Avoid overuse, which clogs injectors or fouls plugs (R1,000–R3,000). In South Africa, dusty conditions require clean fuel filters every 15,000 km to complement additives.
            </p>
            <p className="text-gray-700 mb-4">
              Learners will simulate fuel and additive plans, tracking economy gains for a VW Polo. Incorrect practices reduce efficiency or trigger DTCs (e.g., P0171). Mechanics mastering best practices optimize combustion, saving clients R2,000+. The AI voice tutor can explain fuel quality, dosage, or dust impacts, ensuring accuracy.
            </p>
            <div className="bg-green-50 p-4 rounded-lg">
              <h5 className="font-semibold text-green-800 mb-2">Real Scenario:</h5>
              <p className="text-green-700">
                A Cape Town mechanic services a Nissan Sentra (1.6L) for a client driving in humid conditions (80%). Poor fuel quality causes injector clogs, reducing economy to 8 km/l. Using 95 RON and Liqui Moly cleaner restores 12 km/l, saving R2,500 annually. Learners will practice planning for humid coastal conditions, ensuring reliability on the N7.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const lesson13_2: Lesson = {
  id: '13.2',
  title: 'Selecting the Right Fuel Grade and Additives',
  content: LessonContent,
  duration: 45,
  objectives: [
    "Understand octane ratings and fuel grade selection criteria",
    "Learn about fuel additives and their performance benefits",
    "Master best practices for fuel and additive usage",
    "Apply fuel quality considerations for different conditions",
    "Develop fuel economy optimization strategies"
  ],
  keyTerms: [
    "Octane rating",
    "RON fuel",
    "Fuel additives",
    "Detergent additives",
    "Octane boosters",
    "Fuel system conditioners",
    "Knock prevention",
    "Injection cleaning"
  ]
};