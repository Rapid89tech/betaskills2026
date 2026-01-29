import React from 'react';
import { Lesson } from '../../../types/course';

const LessonContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-red-600 mb-6">Checking for Fuel Line Leaks</h1>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Key Features</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Causes of Fuel Line Leaks</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/plIzFxAlSLU?si=6-LW1R052BvoJWxd</p>
            </div>
            <p className="text-gray-700 mb-4">
              Fuel line leaks result from corrosion (rust from moisture or coastal salt in South Africa), physical damage (e.g., road debris punctures), loose fittings, deteriorated rubber hoses (from heat or ethanol in fuel), excessive pressure (from a faulty regulator), or improper repairs (e.g., using non-fuel-rated materials). Corrosion is prevalent in metal lines under vehicles, causing pinholes after 5–7 years, while rubber hoses crack from heat exposure in engine bays.
            </p>
            <p className="text-gray-700">
              Leaks waste fuel, reduce pressure (below 3 bar), and pose fire risks, especially near hot exhausts, potentially causing catastrophic vehicle damage costing R50,000+. Learners will explore these causes in virtual scenarios, identifying vulnerable areas like fuel tank connections. Early detection prevents environmental harm and ensures safety. Mechanics mastering this skill protect clients from dangerous breakdowns, enhancing workshop reputation. The AI voice tutor can explain corrosion factors, pressure issues, or South African environmental impacts, ensuring thorough understanding.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Identifying Fuel Line Leaks</h3>
            <p className="text-gray-700 mb-4">
              Identifying fuel line leaks involves visual inspections for wet spots, stains, or drips along lines, especially under the car or near the fuel tank, and detecting strong gasoline odours, a key indicator of leaks. Pressure testing with a gauge (checking for drops below 3 bar when the system is off) confirms leaks, while a smoke machine or UV dye with a blacklight can pinpoint small leaks in professional settings. Symptoms like rough idling, hard starting, or reduced fuel efficiency (e.g., 10% mileage loss) suggest air entering the system.
            </p>
            <p className="text-gray-700">
              In South Africa, coastal humidity accelerates corrosion, requiring checks every oil change (10,000 kilometres). Learners will practice inspections in virtual scenarios, using flashlights safely to avoid sparks. Ignoring leaks risks fires or engine damage costing R10,000+. Mechanics mastering this skill ensure safety and performance, addressing client concerns efficiently. The AI voice tutor can guide learners through inspection techniques, pressure testing, or odour detection, ensuring accurate diagnostics.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Repairing Fuel Line Leaks (Rubber or Nylon Lines)</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/1H04wPlDC6k?si=pmQ_rjVHc_56cIDb</p>
            </div>
            <p className="text-gray-700 mb-4">
              Repairing rubber or nylon fuel line leaks involves relieving system pressure (by removing the fuel pump fuse and stalling the engine), cutting out the damaged section with a hose cutter, and installing a fuel-rated replacement hose (e.g., 8 mm diameter) with barbed fittings and clamps tightened to 2–3 Nm. Nylon lines, common in newer vehicles like VW Polos, may require quick-connect fittings or a heat gun for flexibility.
            </p>
            <p className="text-gray-700">
              Learners will simulate repairs in virtual scenarios, ensuring no leaks post-repair by pressurizing the system (ignition on, engine off). In South Africa, heat degrades hoses faster, necessitating replacements every 5–7 years. Improper repairs (e.g., using tape) can cause fires, costing R50,000+ in damages. Mechanics mastering this task ensure safe, reliable fuel delivery, preventing hazardous leaks. The AI voice tutor can guide learners through hose selection, fitting installation, or leak checks, ensuring precise and safe repairs.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Repairing Fuel Line Leaks (Metal Lines)</h3>
            <p className="text-gray-700 mb-4">
              Metal fuel lines, typically steel or copper-nickel, are prone to rust or punctures from road debris, especially in South Africa's coastal or rural areas. Repair involves relieving system pressure, cutting the damaged section with a tube cutter, and installing a replacement line (e.g., 8 mm diameter) using a double flare tool for leak-proof connections (flared to 45°). Tighten flare nuts to 15–20 Nm, ensuring no kinks during bending with a tube bender.
            </p>
            <p className="text-gray-700">
              Learners will simulate repairs in virtual scenarios, practicing flaring and fitting installation. Repairs must use fuel-rated tubing, as regular plumbing pipe fails under pressure, risking leaks or fires. Neglecting repairs can cause fuel loss or engine damage costing R10,000+. Mechanics mastering this skill ensure durable repairs, maintaining fuel system integrity. The AI voice tutor can guide learners through flaring techniques, torque specs, or corrosion prevention, ensuring professional repairs.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Prevention Tips for Fuel Line Leaks</h3>
            <p className="text-gray-700 mb-4">
              Preventing fuel line leaks involves replacing rubber hoses every 5–7 years, using fuel-rated materials (e.g., SAE J30R9 hoses), and inspecting lines annually for corrosion or damage, especially in South Africa's humid or dusty regions. Keep the undercarriage clean to avoid salt buildup, and use heat shields near hot engine components to protect hoses. Regular pressure tests (3–4 bar) and visual checks every 10,000 kilometres catch issues early.
            </p>
            <p className="text-gray-700">
              Learners will practice prevention strategies in virtual scenarios, identifying corrosion risks. Neglecting prevention can lead to leaks causing fires or environmental fines (R5,000+ under South African regulations). Mechanics mastering these practices maintain safe vehicles, reducing client risks and repair costs. The AI voice tutor can explain local environmental factors, material selection, or inspection schedules, ensuring proactive maintenance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const lesson6_2: Lesson = {
  id: '6.2',
  title: 'Checking for Fuel Line Leaks',
  content: LessonContent,
  duration: 60,
  objectives: [
    "Understand the causes and risks of fuel line leaks",
    "Master fuel line leak identification techniques",
    "Execute repairs for rubber and nylon fuel lines",
    "Perform metal fuel line repairs safely",
    "Apply prevention strategies for fuel line maintenance"
  ],
  keyTerms: [
    "Fuel line corrosion",
    "Pressure testing",
    "Quick-connect fittings",
    "Double flare tool",
    "Fuel-rated materials",
    "SAE J30R9 hoses",
    "Heat shields",
    "Environmental regulations"
  ]
};