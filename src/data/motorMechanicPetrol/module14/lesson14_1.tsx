import React from 'react';
import { Lesson } from '../../../types/course';

const LessonContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-red-600 mb-6">Ensuring Compliance with Emissions Standards</h1>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Key Features</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Importance of Emissions Standards</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/_99J2aUkvdQ?si=AXlZZdp4x7qtezDB</p>
            </div>
            <p className="text-gray-700 mb-4">
              Emissions standards, such as South Africa's SANS 20083 (aligned with Euro 4/5), limit pollutants like hydrocarbons (HC &lt;0.1 g/km), carbon monoxide (CO &lt;1.0 g/km), nitrogen oxides (NOx &lt;0.08 g/km), and particulate matter (PM &lt;0.005 g/km) to reduce air pollution and protect public health. In South Africa, urban areas like Johannesburg suffer from smog, with vehicle emissions contributing 30–40% of air pollutants, linked to respiratory issues costing R10 billion annually in healthcare. Compliance ensures vehicles pass roadworthy tests (e-Natis), avoiding fines (R1,000–R5,000) and maintaining resale value (e.g., a compliant VW Polo retains R20,000 more value). Non-compliance risks impoundment or repair costs (R10,000+ for catalytic converters).
            </p>
            <p className="text-gray-700 mb-4">
              Standards also drive cleaner technologies, like hybrid Toyota Corollas, reducing CO2 emissions (100–120 g/km vs. 150–180 g/km). Learners will explore standards in virtual simulations, analyzing emissions data (e.g., CO at 0.3% vs. 1.5%). Mechanics mastering compliance reduce environmental impact, saving clients R5,000–R15,000. The AI voice tutor can explain pollutant effects, SANS 20083 specs, or local smog challenges, enhancing understanding.
            </p>
            <div className="bg-green-50 p-4 rounded-lg">
              <h5 className="font-semibold text-green-800 mb-2">Real Scenario:</h5>
              <p className="text-green-700">
                A Cape Town mechanic services a Ford Fiesta (1.4L, 80,000 km) failing an e-Natis test due to high CO (1.2%). The client, a delivery driver, risks a R2,000 fine. The mechanic identifies a clogged air filter, replaces it, and reduces CO to 0.4%, passing the test and saving R5,000 in fines and repairs. Learners will simulate this scenario, analyzing emissions data, critical for urban compliance.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Factors Affecting Emissions Compliance</h3>
            <p className="text-gray-700 mb-4">
              Engine condition impacts emissions: worn spark plugs or misadjusted valves (0.15–0.30 mm clearance) cause incomplete combustion, increasing HC and CO by 20–30%. Regular maintenance (every 15,000 km) ensures efficient burning. Fuel quality is critical—South Africa's 91 RON fuel at rural stations can increase NOx by 15% compared to 95 RON. A balanced air-fuel ratio (14.7:1) minimizes emissions; faulty injectors or dirty intakes raise HC by 0.05 g/km. Exhaust system integrity is vital: leaks before oxygen sensors skew readings, increasing CO by 0.5%. Emission control components—catalytic converters, oxygen sensors, EGR valves—reduce pollutants by 90% when functional.
            </p>
            <p className="text-gray-700 mb-4">
              In South Africa, dusty roads (e.g., R34 in KwaZulu-Natal) clog filters, and high altitudes (1753 m) reduce combustion efficiency, requiring leaner mixtures. Learners will simulate factor impacts, adjusting a Toyota Corolla's air-fuel ratio. Poor maintenance risks failing emissions tests (R2,000–R5,000 fines). Mechanics mastering these factors ensure compliance, saving clients R3,000+. The AI voice tutor can explain combustion dynamics, fuel quality, or dust effects, ensuring precision.
            </p>
            <div className="bg-green-50 p-4 rounded-lg">
              <h5 className="font-semibold text-green-800 mb-2">Real Scenario:</h5>
              <p className="text-green-700">
                A Pretoria mechanic services a Nissan Sentra (1.6L) with high NOx (0.12 g/km) at high altitude. A worn EGR valve is the culprit. Replacing it reduces NOx to 0.07 g/km, passing the test and saving R3,000. Learners will simulate diagnosing this issue, vital for high-altitude compliance.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Steps to Maintain Compliance</h3>
            <p className="text-gray-700 mb-4">
              Follow manufacturer service intervals (e.g., 15,000 km for oil changes, 30,000 km for spark plugs) to maintain combustion efficiency. Address check engine lights (e.g., P0420) immediately using OBD-II scanners. Conduct emissions tests every 12 months, warming the engine to 80–90°C to ensure accurate readings. Use high-quality parts (e.g., Bosch O2 sensors, Denso spark plugs) meeting SANS 20083 specs and 95 RON fuel from reputable stations (e.g., Engen). In South Africa, dusty conditions require air filter checks every 5,000 km, and coastal humidity (e.g., Durban, 80%) necessitates corrosion-resistant components.
            </p>
            <p className="text-gray-700 mb-4">
              Avoid tampering with emission systems, as removal of catalytic converters incurs R5,000–R10,000 fines. Learners will simulate maintenance plans for a VW Polo, ensuring CO &lt;0.5%. Non-compliance risks impoundment or repairs (R10,000+). Mechanics mastering these steps ensure roadworthy compliance, saving clients R5,000+. The AI voice tutor can explain service schedules, test prep, or local dust challenges, ensuring accuracy.
            </p>
            <div className="bg-green-50 p-4 rounded-lg">
              <h5 className="font-semibold text-green-800 mb-2">Real Scenario:</h5>
              <p className="text-green-700">
                A Durban mechanic services a Hyundai i20 (1.4L) failing an emissions test due to a cracked exhaust manifold. Replacing it and using 95 RON fuel reduces HC from 0.15 g/km to 0.08 g/km, passing the test and saving R4,000. Learners will practice this maintenance plan, critical for coastal compliance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const lesson14_1: Lesson = {
  id: '14.1',
  title: 'Ensuring Compliance with Emissions Standards',
  content: LessonContent,
  duration: 60,
  objectives: [
    "Understand the importance and requirements of emissions standards",
    "Learn factors affecting emissions compliance",
    "Master steps to maintain compliance with SANS 20083",
    "Apply emissions testing and maintenance procedures",
    "Develop compliance strategies for different conditions"
  ],
  keyTerms: [
    "SANS 20083",
    "Emissions standards",
    "Hydrocarbons (HC)",
    "Carbon monoxide (CO)",
    "Nitrogen oxides (NOx)",
    "Particulate matter (PM)",
    "e-Natis testing",
    "Roadworthy compliance"
  ]
};