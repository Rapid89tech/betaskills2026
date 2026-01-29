import React from 'react';
import { Lesson } from '../../../types/course';

const LessonContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-red-600 mb-6">Diagnosing Catalytic Converter and Oxygen Sensor Issues</h1>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Key Features</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Role of the Catalytic Converter</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/lJiznlz5buc?si=K1n6gSj6tOgAZY5L</p>
            </div>
            <p className="text-gray-700 mb-4">
              Catalytic converters reduce HC, CO, and NOx by 90%, converting them into CO2, H2O, and N2 via a ceramic honeycomb coated with platinum, palladium, and rhodium. In South Africa, where urban smog (e.g., Johannesburg) contributes to 10,000 annual respiratory cases, converters are critical for compliance with SANS 20083 (CO &lt;1.0 g/km). They operate at 400–600°C, requiring proper engine tuning to avoid overheating. Clogging from carbon deposits reduces power by 10–15% (e.g., 80 kW to 70 kW), while overheating from rich mixtures (12:1) or misfires melts the substrate, costing R10,000–R30,000 to replace.
            </p>
            <p className="text-gray-700 mb-4">
              Oil or coolant contamination (e.g., from head gasket leaks) poisons catalysts, reducing efficiency by 50%. Learners will simulate converter operation, observing pollutant reduction. Faulty converters fail emissions tests, incurring fines (R2,000–R5,000). Mechanics mastering converter maintenance ensure compliance and performance, saving clients R10,000+. The AI voice tutor can explain catalytic reactions, overheating risks, or local fuel quality impacts, enhancing understanding.
            </p>
            <div className="bg-green-50 p-4 rounded-lg">
              <h5 className="font-semibold text-green-800 mb-2">Real Scenario:</h5>
              <p className="text-green-700">
                A Bloemfontein mechanic services a Toyota Corolla (1.6L, 100,000 km) with reduced power (75 kW) and a P0420 code. A clogged converter from poor 91 RON fuel is identified. Replacing it restores 90 kW and reduces CO to 0.3%, passing the test and saving R12,000. Learners will simulate diagnosing this issue, critical for Free State reliability.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Diagnosing Catalytic Converter Issues</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/rGdsQ9jLz0I?si=yAtOxN1NGA2Mj_78</p>
            </div>
            <p className="text-gray-700 mb-4">
              Symptoms of a failing converter include reduced acceleration (e.g., 0–100 km/h in 12s vs. 10s), rattling noises from broken substrates, P0420/P0430 codes, or a rotten egg smell (sulfur from rich mixtures). Test backpressure with a gauge (&lt;10 kPa normal; &gt;20 kPa indicates clogs). Measure temperatures with an infrared thermometer: outlet should be 30–50°C hotter than inlet (e.g., 450°C vs. 400°C). OBD-II data showing similar upstream/downstream O2 sensor readings (0.1–0.9V) indicates inefficiency. In South Africa, poor fuel quality accelerates clogging after 50,000 km, and dusty roads (e.g., R34) contaminate exhausts.
            </p>
            <p className="text-gray-700 mb-4">
              Learners will simulate diagnostics on a Ford Fiesta, analyzing P0420 data. Misdiagnosis risks unnecessary replacements (R10,000+). Mechanics mastering diagnostics save clients R5,000–R15,000. The AI voice tutor can explain backpressure testing, temperature analysis, or dust impacts, ensuring precision.
            </p>
            <div className="bg-green-50 p-4 rounded-lg">
              <h5 className="font-semibold text-green-800 mb-2">Real Scenario:</h5>
              <p className="text-green-700">
                A Johannesburg mechanic diagnoses a VW Polo (1.4L) with sluggish performance and a P0420 code. Backpressure tests show 25 kPa, indicating a clog. Replacing the converter restores power and reduces HC to 0.08 g/km, saving R10,000. Learners will practice this diagnosis, vital for urban compliance.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Role of Oxygen Sensors</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/x8ldQArMOLU?si=zi9inqt2XnBvmw63</p>
            </div>
            <p className="text-gray-700 mb-4">
              Oxygen sensors measure exhaust oxygen content, sending 0.1–0.9V signals to the ECU to maintain a 14.7:1 air-fuel ratio, reducing HC and CO by 80%. Upstream sensors adjust fuel delivery; downstream sensors monitor converter efficiency. In South Africa, high-mileage vehicles (100,000+ km) like Nissan Sentras suffer sensor degradation, increasing emissions by 20% (e.g., CO to 1.2%). Contamination from oil or soot (common with 91 RON fuel) or faulty heater circuits (10–20 ohms spec) causes slow response, triggering P0130–P0167 codes.
            </p>
            <p className="text-gray-700 mb-4">
              Faulty sensors reduce economy (8–10 km/l vs. 12–15 km/l) and damage converters (R10,000+). Learners will simulate sensor operation, observing voltage swings. Mechanics mastering sensor maintenance ensure compliance, saving clients R3,000–R10,000. The AI voice tutor can explain sensor signals, contamination risks, or local fuel issues, enhancing understanding.
            </p>
            <div className="bg-green-50 p-4 rounded-lg">
              <h5 className="font-semibold text-green-800 mb-2">Real Scenario:</h5>
              <p className="text-green-700">
                A Durban mechanic services a Hyundai i20 (1.6L) with poor economy (9 km/l) and a P0131 code. A contaminated O2 sensor from humid conditions is replaced, restoring 13 km/l and saving R2,500 annually. Learners will simulate this diagnosis, critical for coastal reliability.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Diagnosing Oxygen Sensor Issues</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/z2GZENewSC8?si=2Bmg2k4skyPbB2ka</p>
            </div>
            <p className="text-gray-700 mb-4">
              Symptoms include poor economy (8–10 km/l), rough idling, P0130–P0167 codes, or failed emissions tests (HC &gt;0.1 g/km). Test voltage with a multimeter (0.1–0.9V oscillation) or scan tool for slow response (&lt;1s cycle). Check heater circuit resistance (10–20 ohms). Live data showing flatlined readings (e.g., 0.4V constant) indicates failure. In South Africa, dust (e.g., Limpopo) and humidity (80% in Durban) accelerate sensor fouling after 60,000 km.
            </p>
            <p className="text-gray-700 mb-4">
              Learners will simulate diagnostics on a Toyota Corolla, analyzing P0171 data. Misdiagnosis risks converter damage (R10,000+). Mechanics mastering diagnostics ensure efficiency, saving clients R3,000+. The AI voice tutor can explain voltage testing, heater checks, or dust effects, ensuring precision.
            </p>
            <div className="bg-green-50 p-4 rounded-lg">
              <h5 className="font-semibold text-green-800 mb-2">Real Scenario:</h5>
              <p className="text-green-700">
                A Pretoria mechanic diagnoses a Ford Fiesta (1.4L) with a P0130 code and rough idling. Voltage tests show a flat 0.3V, indicating a faulty sensor. Replacing it restores smooth operation and reduces CO to 0.4%, saving R4,000. Learners will practice this diagnosis, vital for high-altitude reliability.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Preventative Measures</h3>
            <p className="text-gray-700 mb-4">
              Use 95 RON fuel from reputable stations to avoid contamination. Replace O2 sensors every 60,000–100,000 km, as per manufacturer specs. Address misfires or oil leaks (e.g., from worn valve seals) promptly to protect converters and sensors. In South Africa, dusty roads require air filter checks every 5,000 km, and humid conditions necessitate corrosion-resistant sensors. Regular OBD-II scans (every 5,000 km) detect early issues.
            </p>
            <p className="text-gray-700 mb-4">
              Learners will simulate preventative plans for a Nissan Sentra, ensuring emissions compliance. Neglecting measures risks fines (R2,000–R5,000). Mechanics mastering prevention save clients R5,000+. The AI voice tutor can explain maintenance schedules, fuel quality, or humidity impacts, ensuring accuracy.
            </p>
            <div className="bg-green-50 p-4 rounded-lg">
              <h5 className="font-semibold text-green-800 mb-2">Real Scenario:</h5>
              <p className="text-green-700">
                A Limpopo mechanic services a VW Polo (1.6L) with high HC (0.15 g/km) due to misfires. Replacing worn plugs and using a fuel cleaner prevents converter damage, saving R10,000. Learners will practice this plan, critical for rural reliability.
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
                Emissions standards (SANS 20083) limit pollutants, protecting health and ensuring compliance. Catalytic converters and oxygen sensors reduce emissions by 90%, requiring regular diagnostics. Proper maintenance enhances performance, economy (12–15 km/l), and environmental impact.
              </p>
            </div>
            <div>
              <h5 className="font-semibold text-gray-700">Practice Assignments:</h5>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Research SANS 20083 standards and list common reasons for emissions test failures in South Africa (600 words).</li>
                <li>Create a diagnostic checklist for catalytic converters and oxygen sensors, including backpressure and voltage tests (600 words).</li>
                <li>Analyze a sample OBD-II report with P0420 and P0131 codes, identifying converter or sensor issues (600 words).</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-gray-700">Outcome:</h5>
              <p className="text-gray-700">
                Participants will master emissions compliance, catalytic converter and oxygen sensor diagnostics, and environmental considerations, ensuring cleaner, more efficient engines (12–15 km/l, CO &lt;0.5%). These skills enable compliance with South African roadworthy tests, reduce environmental impact, and save clients R5,000–R20,000 in fines and repairs, preparing mechanics for urban (e.g., Cape Town) and rural (e.g., Limpopo) workshops.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const lesson14_2: Lesson = {
  id: '14.2',
  title: 'Diagnosing Catalytic Converter and Oxygen Sensor Issues',
  content: LessonContent,
  duration: 120,
  objectives: [
    "Understand the role and operation of catalytic converters",
    "Learn diagnostic techniques for catalytic converter issues",
    "Master oxygen sensor function and testing procedures",
    "Apply diagnostic methods for oxygen sensor problems",
    "Develop preventative maintenance strategies"
  ],
  keyTerms: [
    "Catalytic converter",
    "Oxygen sensors",
    "P0420/P0430 codes",
    "Backpressure testing",
    "Air-fuel ratio",
    "Voltage testing",
    "Heater circuits",
    "Preventative maintenance"
  ]
};