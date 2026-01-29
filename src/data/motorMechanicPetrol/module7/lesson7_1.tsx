import React from 'react';
import { Lesson } from '../../../types/course';

const LessonContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-red-600 mb-6">Recognizing Common Symptoms</h1>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Key Features</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Engine Misfiring</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/5uStenDABHE?si=54znvRyvU960BaIF</p>
            </div>
            <p className="text-gray-700 mb-4">
              Engine misfiring occurs when one or more cylinders fail to combust fuel properly, disrupting the power stroke and causing noticeable shaking, jerking, or power loss, particularly at idle or low speeds (below 1,500 RPM). Symptoms include a "coughing" or popping sound from the exhaust, vibrations felt in the cabin, or a check engine light with codes like P0301 (cylinder 1 misfire) or P0300 (random misfire). Common causes include clogged fuel injectors (restricting fuel flow), weak fuel pressure (below 3 bar due to a failing pump or clogged filter), faulty spark plugs or ignition coils, or water-contaminated fuel, a frequent issue in South Africa due to inconsistent fuel quality at rural stations.
            </p>
            <p className="text-gray-700">
              Misfires can overheat catalytic converters, leading to failures costing R10,000–R15,000 to replace. In South Africa's hot climate, heat accelerates injector clogging after 20,000–30,000 kilometres, exacerbating misfires. Learners will use virtual simulations to diagnose misfires, practicing OBD2 scanner use to read codes and inspecting components like spark plugs (checking for fouling) or injectors (testing spray patterns). Early detection prevents severe damage, such as piston scoring or converter clogging, which can strand clients or lead to costly repairs. Mechanics mastering misfire diagnostics ensure smooth engine performance, enhancing reliability and client satisfaction. Regular checks every 10,000 kilometres, especially in dusty regions, prevent escalation. The AI voice tutor can guide learners through code interpretation, injector cleaning techniques, or fuel quality impacts specific to South African conditions, ensuring accurate diagnostics. For example, learners can simulate swapping spark plugs or using a fuel system cleaner to resolve minor misfires, learning to differentiate between ignition and fuel-related causes. This skill is critical for maintaining vehicles like Toyota Corollas or VW Polos, common in South Africa, where misfires can reduce fuel efficiency by 10–15% or cause breakdowns in remote areas, impacting client trust and workshop reputation.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Fuel Economy Issues</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/23MngtdOWMA?si=gSLZYBU5pZlCA19A</p>
            </div>
            <p className="text-gray-700 mb-4">
              Poor fuel economy is evident when a vehicle's efficiency drops significantly, such as from 12 km/L to 10 km/L, requiring more frequent refuelling without changes in driving habits. Symptoms include dark exhaust smoke (indicating unburned fuel), a noticeable fuel smell (suggesting leaks or over-fueling), or a check engine light with codes like P0172 (rich mixture) or P0171 (lean mixture). Causes include leaking fuel injectors, a clogged air filter restricting airflow, a faulty oxygen sensor (O2) causing improper fuel trim, or a malfunctioning mass airflow sensor (MAF) disrupting the air-fuel ratio.
            </p>
            <p className="text-gray-700">
              In South Africa, low-quality fuel from unregulated stations can clog injectors after 20,000 kilometres, reducing efficiency by up to 15%. Learners will practice diagnostics in virtual scenarios, using OBD2 scanners to identify codes and inspecting air filters for dirt accumulation, common in dusty regions like Gauteng. Addressing these issues restores mileage, saving clients R2,000–R3,000 annually on fuel for a typical sedan. Neglecting poor economy risks carbon buildup, damaging catalytic converters (R10,000+) or increasing emissions, which can lead to fines under South African regulations (R5,000+). Mechanics mastering this skill optimize engine performance, reducing environmental impact and enhancing client savings. The AI voice tutor can explain sensor diagnostics, guide filter replacement, or analyze fuel consumption patterns, ensuring precise solutions. Learners will simulate cleaning MAF sensors with specialized sprays or replacing O2 sensors, learning to verify repairs with a test drive. This skill is vital for high-mileage vehicles, where efficiency losses are common, and helps mechanics build trust by delivering cost-effective solutions tailored to local driving conditions, such as stop-and-go traffic in Johannesburg or long highway trips in the Western Cape.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Idling and Stalling Issues</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/mQ0u-3qPFDQ?si=ZdiMrGmHQMNUpvDS</p>
            </div>
            <p className="text-gray-700 mb-4">
              Rough idling manifests as a jittery or uneven engine operation at rest, with RPM fluctuating between 600–1,000, often accompanied by sputtering noises or vibrations. Stalling occurs unexpectedly at stoplights, during deceleration, or at low RPMs, requiring hard restarts. Causes include dirty fuel injectors causing uneven fuel delivery, vacuum leaks in intake hoses (common in South Africa's humid coastal areas), a failing idle air control valve (IAC), or a faulty throttle body. OBD2 codes like P0101 (MAF sensor) or P0507 (high idle) may appear.
            </p>
            <p className="text-gray-700">
              In South Africa, moisture from coastal regions like Durban can corrode sensors, exacerbating issues after 30,000 kilometres. Learners will simulate diagnostics in virtual scenarios, inspecting vacuum hoses for cracks and cleaning throttle bodies with carb cleaner. Neglecting these issues risks fuel pump strain (R3,000–R5,000 to replace) or sudden breakdowns, stranding clients in remote areas. Mechanics mastering this skill ensure reliable idling and starting, critical for client satisfaction in daily-driven vehicles like Hyundai i20s. The AI voice tutor can guide learners through vacuum leak detection using smoke machines, IAC cleaning, or local environmental impacts on sensor performance, ensuring accurate diagnostics. Learners will practice resetting idle after cleaning or replacing components, verifying repairs with a scan tool. This skill prevents minor issues from escalating into major repairs, such as injector failure (R2,000 each) or engine damage from prolonged misfires, and is essential for maintaining vehicle reliability in South Africa's varied climates, from arid interiors to humid coasts, where maintenance schedules must account for environmental wear.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Unusual Noises (Knocking, Tapping)</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/ZrWfYh_9TZo?si=JTwE9ihxX4gjLYZF</p>
            </div>
            <p className="text-gray-700 mb-4">
              Unusual engine noises provide critical clues to internal issues. Knocking or pinging, a metallic sound during acceleration or under load (e.g., climbing hills), often results from low-octane fuel (below 95, common in South Africa), incorrect ignition timing, or carbon buildup in combustion chambers, risking piston damage (R20,000–R30,000). Tapping or clicking at idle may indicate worn valve lifters, low oil pressure (below 2 bar), or faulty fuel injectors, producing excessive noise. Deep thumping suggests failing main or connecting rod bearings, visible as metal shavings in oil during a drain.
            </p>
            <p className="text-gray-700">
              In South Africa's hot climate, oil degradation accelerates after 10,000 kilometres, worsening lifter or bearing wear. Learners will use virtual stethoscopes to isolate noises in simulations, correlating sounds to causes like timing issues (checked with a timing light) or oil starvation (verified with a pressure gauge). Ignoring noises risks catastrophic failures, such as engine seizures costing R50,000+. Mechanics mastering noise diagnostics prevent major repairs, ensuring engine longevity. The AI voice tutor can guide learners through pinpointing noise sources, checking oil pressure, or analyzing carbon buildup causes, tailored to local conditions like high ambient temperatures. Learners will simulate oil changes to check for metal particles or adjust timing to correct pinging, learning to differentiate between normal injector clicks and problematic tapping. This skill is crucial for vehicles like Ford Fiestas, common in South Africa, where early intervention saves clients from expensive overhauls and maintains workshop efficiency.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Exhaust Smoke Analysis</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/4CT6j399QGw?si=oOoP6TjbcFXe2B50</p>
            </div>
            <p className="text-gray-700 mb-4">
              Exhaust smoke color is a key diagnostic indicator. Blue smoke signals oil burning in the combustion chamber, caused by worn piston rings, valve seals, or a faulty PCV system, leading to oil consumption and potential engine damage (R15,000–R25,000 for repairs). Black smoke indicates a rich fuel mixture (too much fuel, not enough air), often due to clogged injectors, a faulty MAF sensor, or a failing fuel pressure regulator, triggering codes like P0172. White smoke suggests coolant entering the cylinders, typically from a blown head gasket or cracked cylinder head, costing R20,000–R40,000 to repair.
            </p>
            <p className="text-gray-700">
              In South Africa, coastal humidity accelerates seal and gasket wear, increasing oil or coolant leaks after 80,000 kilometres. Learners will analyze smoke in virtual scenarios, linking colors to causes like injector clogs (tested with a pulse tester) or gasket failures (confirmed with a compression test). Ignoring smoke risks engine seizures, catalytic converter damage (R10,000+), or emissions fines (R5,000+ under South African regulations). Mechanics mastering smoke analysis ensure early intervention, maintaining engine health and compliance. The AI voice tutor can explain smoke causes, repair cost estimates, or local factors like humidity, enhancing diagnostic precision. Learners will practice identifying smoke patterns during test drives and cross-referencing with OBD2 codes, ensuring accurate repairs for vehicles like VW Golfs, where smoke issues are common due to high mileage and environmental wear.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const lesson7_1: Lesson = {
  id: '7.1',
  title: 'Recognizing Common Symptoms',
  content: LessonContent,
  duration: 90,
  objectives: [
    "Identify and diagnose engine misfiring symptoms and causes",
    "Recognize fuel economy issues and their underlying problems",
    "Diagnose idling and stalling problems systematically",
    "Interpret unusual engine noises and their significance",
    "Analyze exhaust smoke colors for diagnostic information"
  ],
  keyTerms: [
    "Engine misfiring",
    "Fuel economy",
    "Rough idling",
    "Engine stalling",
    "Knocking sounds",
    "Exhaust smoke analysis",
    "OBD2 codes",
    "Diagnostic symptoms"
  ]
};