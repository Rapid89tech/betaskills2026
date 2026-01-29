import React from 'react';
import { Lesson } from '../../../types/course';

const LessonContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-red-600 mb-6">Tuning Carburetors or Recalibrating Fuel Injectors</h1>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Key Features</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Tuning Carburetors</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/Z1_bL7yHwgw?si=88N5Jo7FVwyUB6pi</p>
            </div>
            <p className="text-gray-700 mb-4">
              Carburetors mix air and fuel for combustion, targeting a 14.7:1 ratio at idle (600–900 RPM) and under load. Poor tuning causes rough idle, black smoke (rich mixture, &lt;12:1), backfiring (lean, &gt;15:1), or hesitation, reducing fuel economy (8–10 km/l vs. 12–15 km/l). Tools include screwdrivers (flathead for mixture screws), a vacuum gauge (20–25 kPa for optimal idle), and a tachometer. Adjust idle mixture screws (1/8-turn increments) for highest vacuum or smoothest idle, set idle speed screw to spec (e.g., 800 RPM), and verify choke opens fully at 80°C. Main jets or power valves may need replacement for high-RPM performance (3000–5000 RPM).
            </p>
            <p className="text-gray-700 mb-4">
              In South Africa, dust from rural roads clogs jets after 20,000 km, and poor fuel quality (91 RON) requires leaner settings. Learners will simulate tuning a VW Polo carburetor, achieving 800 RPM and 22 kPa vacuum. Errors like over-rich mixtures cause carbon buildup (R2,000–R5,000), while lean settings risk misfires. Mechanics mastering tuning restore efficiency, saving clients R3,000+ in fuel and repairs.
            </p>
            <p className="text-gray-700">
              The AI voice tutor can explain mixture ratios, jet sizing, or dust mitigation, ensuring accuracy. Learners will practice on a classic VW Golf, adjusting for smooth acceleration in a virtual test, critical for urban reliability. Scenarios include tuning for high-altitude performance or addressing clogged jets from dusty environments, ensuring adaptability to South African conditions like those in the Karoo.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Recalibrating Fuel Injectors</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/99uLyZK8OOU?si=IS9q6o2QNaoVM0XC</p>
            </div>
            <p className="text-gray-700 mb-4">
              Fuel injectors deliver precise fuel amounts (e.g., 350 cc/min) into the combustion chamber or intake manifold, controlled by the ECU. Clogs, mismatches, or wear cause misfires, poor economy (10–12 km/l vs. 15 km/l), hesitation, or high emissions (failing South African e-Natis tests). Tools include a fuel pressure gauge (250–350 kPa), OBD-II scanner for fuel trim data (±10% ideal), ultrasonic cleaner, and tuning software (e.g., Hondata). Check pressure, inspect spray patterns (fine mist, not dripping), clean injectors ultrasonically, and adjust fuel maps for consistent delivery.
            </p>
            <p className="text-gray-700 mb-4">
              In South Africa, poor fuel quality clogs injectors after 50,000 km, especially in coastal areas with high humidity. Learners will simulate recalibrating a Ford Fiesta's injectors, ensuring 300 kPa and balanced trims. Errors like mismatched injectors cause engine damage (R10,000–R20,000). Mechanics mastering recalibration optimize performance, saving clients R5,000+ in fuel and repairs.
            </p>
            <p className="text-gray-700">
              The AI voice tutor can explain trim adjustments, cleaning techniques, or local fuel quality issues, ensuring precision. Learners will practice on a Hyundai i20, verifying spray patterns in a virtual flow bench, critical for highway performance on routes like the N2. Scenarios include recalibrating for aftermarket turbo installations or addressing fuel contamination, ensuring reliability in South African urban and rural settings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const lesson12_2: Lesson = {
  id: '12.2',
  title: 'Tuning Carburetors or Recalibrating Fuel Injectors',
  content: LessonContent,
  duration: 90,
  objectives: [
    "Master carburetor tuning procedures and mixture adjustments",
    "Learn fuel injector recalibration and cleaning techniques",
    "Understand air-fuel ratio optimization for performance",
    "Apply proper diagnostic tools for fuel system analysis",
    "Develop skills in fuel delivery system optimization"
  ],
  keyTerms: [
    "Carburetor tuning",
    "Air-fuel ratio",
    "Fuel injector",
    "Mixture screws",
    "Fuel pressure",
    "Spray pattern",
    "Fuel trim",
    "Ultrasonic cleaning"
  ]
};