import React from 'react';
import { Lesson } from '../../../types/course';

const LessonContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-red-600 mb-6">Diagnosing and Prioritizing Repairs</h1>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Key Features</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Initial Diagnostic Steps</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/3Fs7goQcYWk?si=CFnnCQ2geGtgroON</p>
            </div>
            <p className="text-gray-700 mb-4">
              Effective engine diagnostics start with a systematic approach to identify issues like misfiring, stalling, or smoke. First, use an OBD2 scanner, plugged into the vehicle's port (typically under the dashboard), to read diagnostic trouble codes (DTCs) such as P0300 (random misfire), P0171 (lean mixture), or P0172 (rich mixture). Visual inspections check for loose ignition wires, cracked vacuum hoses, oil or coolant leaks, and spark plug conditions (e.g., black soot for rich mixtures, oil fouling for burning oil). Listening with a mechanic's stethoscope or long screwdriver isolates noises like knocking or tapping, pinpointing sources like lifters or bearings.
            </p>
            <p className="text-gray-700">
              In South Africa, dusty conditions can clog air filters, triggering MAF-related codes after 15,000 kilometres, while coastal moisture corrodes wiring, causing sensor faults. Learners will practice these steps in virtual scenarios, documenting findings and correlating codes with symptoms. Early diagnostics prevent escalation, such as catalytic converter failure (R10,000–R15,000) or engine damage from ignored leaks (R30,000+). Mechanics mastering initial diagnostics streamline repairs, reducing downtime and costs for clients driving common vehicles like Toyota Corollas. The AI voice tutor can guide learners through code interpretation, spark plug analysis, or noise localization, tailored to South African conditions like dust or heat. Learners will simulate inspecting under-hood components, checking for fuel smells or coolant stains, and using scan tools to retrieve freeze-frame data, ensuring a thorough approach. This skill is critical for maintaining workshop efficiency, preventing misdiagnoses, and building client trust by addressing issues like rough idling or power loss before they worsen, especially in high-traffic urban areas or remote rural regions where breakdowns are costly.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Compression Testing</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/zCR6wahr9FU?si=N7RxoRd4JFJ_nkmM</p>
            </div>
            <p className="text-gray-700 mb-4">
              Compression testing evaluates cylinder health by measuring pressure (170–210 kPa for most petrol engines) during cranking, diagnosing issues like worn piston rings, damaged valves, or blown head gaskets. The process involves warming the engine, disabling fuel (remove pump fuse) and ignition (disconnect coils), removing all spark plugs, and threading a compression gauge into each cylinder's spark plug hole. Crank the engine 4–6 times per cylinder, recording readings. Healthy cylinders show consistent pressures within 10–15% of each other; low readings (below 120 kPa) or high variance suggest ring wear or valve issues. A "wet test" (adding oil to the cylinder) confirms ring wear if pressure rises.
            </p>
            <p className="text-gray-700">
              In South Africa, high-mileage vehicles (100,000+ km) often suffer ring or valve wear due to heat and poor oil maintenance, common in older models like Nissan Sentras. Learners will simulate tests in virtual scenarios, comparing readings and performing wet tests to differentiate causes. Ignoring low compression risks misfires, oil burning, or engine failure, costing R15,000–R40,000. Mechanics mastering compression testing confirm internal engine health, preventing catastrophic failures and ensuring accurate repairs. The AI voice tutor can guide learners through test setup, interpreting results, or addressing local wear factors like oil degradation in hot climates. Learners will practice ensuring a charged battery for consistent cranking and cross-referencing results with OBD2 codes, enhancing diagnostic precision. This skill is vital for South African mechanics, where budget constraints often lead clients to delay maintenance, increasing the risk of severe engine damage in vehicles used for long-distance travel or heavy urban commuting.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Fuel Pressure Testing</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/_oXLUqE4Sf0?si=tdtdfUXA9VSZhN8O</p>
            </div>
            <p className="text-gray-700 mb-4">
              Fuel pressure testing verifies the fuel system's ability to deliver consistent pressure (3–4 bar for most petrol engines) to injectors, diagnosing issues like hard starting, misfiring, or stalling. Using a fuel pressure gauge, connect to the fuel rail's Schrader valve after relieving system pressure (remove fuel pump fuse and crank until the engine stalls). Check pressure with the ignition on (pump priming), engine idling, and under light revving. Low pressure (below 2.5 bar) indicates a weak pump (R3,000–R5,000 to replace), clogged filter, or leaking line, while high pressure (above 4.5 bar) suggests a faulty regulator. A rapid drop after shutdown points to leaking injectors or a failed check valve.
            </p>
            <p className="text-gray-700">
              In South Africa, poor fuel quality can clog filters after 20,000 kilometres, reducing pressure and causing performance issues. Learners will simulate tests in virtual scenarios, interpreting readings and checking for leaks. Neglecting low pressure risks engine starvation, leading to breakdowns or injector damage (R2,000 each). Mechanics mastering this skill ensure reliable fuel delivery, critical for vehicles like Ford Fiestas in stop-and-go traffic. The AI voice tutor can guide learners through gauge connection, pressure specifications, or troubleshooting, tailored to local fuel challenges. Learners will practice verifying repairs by retesting pressure after filter replacement, ensuring no leaks. This skill prevents misdiagnoses, reduces client downtime, and maintains engine efficiency, especially in South Africa's diverse driving conditions, from urban congestion to rural dirt roads.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Vacuum Testing</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/xxoCaNac2uE?si=5AkzY6eFgS5asdE9</p>
            </div>
            <p className="text-gray-700 mb-4">
              Vacuum testing measures intake manifold pressure (60–75 kPa at idle) to diagnose engine health, identifying issues like vacuum leaks, burned valves, or exhaust restrictions. Connect a vacuum gauge to a manifold port (not ported vacuum), warm the engine, and observe readings at idle and under light acceleration. Steady readings below 57 kPa suggest worn rings or timing issues, rapid fluctuations (3–5 kPa) indicate sticking valves, and drops under load point to clogged catalytic converters.
            </p>
            <p className="text-gray-700">
              In South Africa, dust accumulation can block converters after 80,000 kilometres, reducing vacuum and causing power loss. Learners will simulate tests in virtual scenarios, using smoke machines to locate leaks or correlating readings with OBD2 codes like P0171. Ignoring vacuum issues risks misfires, overheating, or converter damage (R10,000+). Mechanics mastering vacuum testing pinpoint faults accurately, ensuring efficient repairs for vehicles like VW Polos. The AI voice tutor can explain gauge interpretation, leak detection, or local dust impacts, enhancing diagnostics. Learners will practice combining vacuum tests with compression tests for a comprehensive engine assessment, learning to adjust readings for South Africa's varied altitudes (e.g., lower vacuum in Johannesburg). This skill prevents costly misdiagnoses, ensures emissions compliance, and maintains vehicle reliability in harsh conditions, from coastal humidity to inland heat.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Planning the Repair Strategy</h3>
            <p className="text-gray-700 mb-4">
              Prioritizing repairs involves analyzing diagnostic findings (OBD2 codes, visual inspections, compression, vacuum, and fuel pressure tests) to address critical issues first, ensuring safety and preventing further damage. Immediate repairs include fuel leaks (fire risk, R50,000+ in damages), misfires (catalytic converter damage, R10,000+), and coolant leaks (engine seizure, R30,000–R50,000). High-priority issues (within days) include faulty sensors (e.g., MAF, R2,000) or worn spark plugs (R500). Medium-priority repairs (within weeks) address minor vacuum leaks or air filter clogs, while low-priority tasks (e.g., cosmetic fixes) can wait for routine maintenance.
            </p>
            <p className="text-gray-700">
              In South Africa, part availability can delay repairs, requiring mechanics to source OEM or quality aftermarket parts early. Learners will practice prioritization in virtual scenarios, estimating costs (e.g., R20,000 for a head gasket vs. R500 for a filter) and creating timelines. Neglecting critical repairs risks accidents or breakdowns, especially on long South African highways. Mechanics mastering this skill optimize repair efficiency, balancing safety and budgets for clients with vehicles like Hyundai i20s. The AI voice tutor can guide learners through cost estimation, part sourcing, or prioritization strategies, tailored to local supply challenges. Learners will simulate repair plans for scenarios like a misfiring engine with a coolant leak, ensuring urgent issues are addressed first, maintaining client safety and workshop reputation in diverse conditions, from urban Cape Town to rural Free State.
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
                Identifying symptoms like misfiring, smoke, or noises, and using diagnostic tools (OBD2, compression, vacuum, fuel pressure tests) ensures accurate engine issue detection. Prioritizing repairs based on severity prevents damage, ensuring safety, reliability, and cost efficiency.
              </p>
            </div>
            <div>
              <h5 className="font-semibold text-gray-700">Interactive Q&A Session:</h5>
              <p className="text-gray-700">
                Learners engage in live Zoom Q&A sessions, discussing misfire diagnostics, smoke analysis, or repair prioritization. Instructors share real-world cases, like fixing a head gasket or replacing injectors. The AI voice tutor answers follow-up questions on codes, tests, or local challenges.
              </p>
            </div>
            <div>
              <h5 className="font-semibold text-gray-700">Practice Assignments:</h5>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Conduct a virtual engine inspection, documenting symptoms like smoke or noises in a 500-word report.</li>
                <li>Research a trouble code (e.g., P0302) and write a 500-word diagnostic and repair plan, including costs.</li>
                <li>Create a guide for addressing blue or black smoke, detailing steps, tools, and estimated expenses.</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-gray-700">Outcome:</h5>
              <p className="text-gray-700">
                Participants will master diagnosing and prioritizing engine repairs, ensuring efficient troubleshooting and preventing costly damage. These skills prepare learners for advanced diagnostics, enhancing workshop capabilities and client trust in South African and global contexts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const lesson7_2: Lesson = {
  id: '7.2',
  title: 'Diagnosing and Prioritizing Repairs',
  content: LessonContent,
  duration: 90,
  objectives: [
    "Execute systematic initial diagnostic procedures",
    "Perform compression testing to evaluate engine health",
    "Conduct fuel pressure testing for fuel system diagnosis",
    "Apply vacuum testing for comprehensive engine assessment",
    "Develop effective repair strategy and prioritization plans"
  ],
  keyTerms: [
    "OBD2 diagnostics",
    "Compression testing",
    "Fuel pressure testing",
    "Vacuum testing",
    "Diagnostic trouble codes",
    "Repair prioritization",
    "Cost estimation",
    "Safety assessment"
  ]
};