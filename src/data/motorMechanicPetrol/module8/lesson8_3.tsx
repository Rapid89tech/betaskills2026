import React from 'react';
import { Lesson } from '../../../types/course';

const LessonContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-red-600 mb-6">Compression and Leak-Down Testing</h1>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Key Features</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Compression Testing Procedures</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/zCR6wahr9FU?si=N7RxoRd4JFJ_nkmM</p>
            </div>
            <p className="text-gray-700 mb-4">
              Compression testing measures cylinder pressure during cranking, revealing internal engine health. Proper procedure involves warming the engine to operating temperature (80–90°C), disabling ignition and fuel systems (remove fuses or disconnect coils/injectors), removing all spark plugs simultaneously, and threading the compression gauge into each cylinder. Crank the engine 4–6 compression strokes per cylinder, recording peak pressure. Healthy petrol engines typically show 170–210 kPa (25–30 psi), with cylinders within 10–15% of each other. Low compression (below 120 kPa) or high variation (above 20%) indicates worn rings, burned valves, or head gasket issues.
            </p>
            <p className="text-gray-700">
              In South Africa, high-mileage vehicles often show compression loss due to inadequate maintenance in harsh conditions. Learners will practice testing procedures in virtual workshops, learning proper gauge installation and result interpretation. The AI voice tutor can guide technique, explain pressure specifications for different engines, or troubleshoot testing issues like insufficient cranking speed. For example, a Toyota Corolla with 200,000 km might show 150 kPa average compression—acceptable for age but indicating future rebuilding needs. Accurate compression testing prevents misdiagnoses, such as attributing poor performance to fuel system issues when the actual cause is worn piston rings requiring engine rebuilding (R25,000–R40,000).
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Leak-Down Testing</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/Lm24xpGlUPE?si=uQHk8qCm4MdPW8oY</p>
            </div>
            <p className="text-gray-700 mb-4">
              Leak-down testing applies compressed air (100 kPa) to cylinders at top dead center (TDC), measuring pressure loss and identifying leak locations. The test reveals where compression escapes: hissing from the throttle body indicates intake valve leaks, exhaust pipe sounds suggest exhaust valve problems, bubbles in the radiator point to head gasket failure, and crankcase noise (oil filler cap) indicates worn piston rings. Acceptable leak-down is typically below 20%, with 10–15% considered excellent, 15–20% acceptable, and above 25% requiring repair. The test pinpoints specific component failures, guiding repair decisions more precisely than compression testing alone.
            </p>
            <p className="text-gray-700">
              In South Africa's hot climate, valve seat recession is common in older engines, causing compression loss and requiring valve work (R8,000–R15,000). Learners will practice leak-down procedures in virtual simulations, learning to identify leak sources by sound and location. The AI voice tutor can guide TDC positioning, explain leak interpretation, or address climate-related wear patterns. For example, bubbles in the cooling system during testing confirm head gasket failure, justifying major repair costs (R20,000–R30,000) versus minor valve adjustments. This precision prevents unnecessary work, such as removing cylinder heads when the issue is simply worn rings, saving customers significant money and workshop time.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Vacuum Gauge Diagnostics</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/xxoCaNac2uE?si=5AkzY6eFgS5asdE9</p>
            </div>
            <p className="text-gray-700 mb-4">
              Vacuum gauges measure intake manifold pressure, revealing engine health and performance issues. Connect to a manifold vacuum port (not ported vacuum), warm the engine, and observe readings at idle, 2,000 RPM, and during snap acceleration. Healthy engines show steady 60–75 kPa vacuum at idle (adjusted for altitude), rising to 85+ kPa at 2,000 RPM. Low steady vacuum (below 50 kPa) suggests worn rings or late timing, rapid fluctuations (5–10 kPa) indicate burned valves, gradual drop under acceleration points to exhaust restrictions, and irregular patterns suggest intake leaks or intermittent valve issues.
            </p>
            <p className="text-gray-700">
              In South Africa, high altitude locations like Johannesburg (1,750m) naturally reduce vacuum readings by 15–20%, requiring adjusted baselines. Dust and poor fuel quality can clog catalytic converters, reducing vacuum under load. Learners will practice gauge connection and interpretation in virtual scenarios, correlating readings with symptoms and engine conditions. The AI voice tutor can explain altitude corrections, pattern recognition, or local factors affecting vacuum readings. For example, a gradual vacuum drop during acceleration might indicate a clogged catalytic converter, common in high-mileage vehicles using low-quality fuel, requiring replacement (R8,000–R12,000). Accurate vacuum testing guides repairs efficiently, preventing misdiagnoses and unnecessary component replacements.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Fuel Pressure Testing</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/_oXLUqE4Sf0?si=tdtdfUXA9VSZhN8O</p>
            </div>
            <p className="text-gray-700 mb-4">
              Fuel pressure testing verifies system delivery capability and component function. Connect a fuel pressure gauge to the fuel rail's Schrader valve after relieving system pressure (remove fuel pump fuse, crank until engine stalls). Test with ignition on (pump priming), engine idling, and under acceleration, recording pressures. Most petrol engines require 250–400 kPa (36–58 psi), varying by system design. Low pressure indicates weak pump, clogged filter, or leaking lines, while high pressure suggests faulty regulator. Pressure drop after shutdown reveals injector leaks or check valve failure. Dynamic testing under load shows pump capacity under demand.
            </p>
            <p className="text-gray-700">
              In South Africa, fuel quality issues frequently clog filters and contaminate pumps, affecting pressure delivery. High ambient temperatures can cause vapor lock, reducing effective pressure. Learners will practice testing procedures in virtual workshops, learning gauge connection, pressure interpretation, and safety precautions. The AI voice tutor can guide testing techniques, explain pressure specifications, or address fuel quality impacts on system performance. For example, pressure dropping from 300 kPa to 200 kPa under load indicates pump weakness, requiring replacement (R3,000–R5,000) before complete failure strands the customer. Accurate fuel pressure testing prevents misdiagnoses, such as blaming injectors for poor performance when the actual cause is insufficient fuel delivery.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Specialized Testing Equipment</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/CoH7w8P3yHI?si=xYdQNk6s9rVfBJpT</p>
            </div>
            <p className="text-gray-700 mb-4">
              Specialized equipment enhances diagnostic capability beyond basic tools. Smoke machines inject controlled smoke into vacuum or EVAP systems, revealing small leaks invisible during visual inspection. Exhaust gas analyzers measure CO, HC, NOx, and O2 levels, confirming catalyst efficiency and combustion quality. Timing lights verify ignition timing accuracy (typically 6–12° BTDC at idle), while digital timing tools provide precise measurements. Injector testers verify spray patterns, flow rates, and electrical operation, ensuring proper fuel delivery. Temperature guns identify hotspots, cold spots, or thermal irregularities in cooling systems, exhaust components, or electrical connections.
            </p>
            <p className="text-gray-700">
              In South Africa, specialized tools become cost-effective for busy workshops handling diverse vehicle types and complex problems. Government emissions testing requirements may mandate gas analyzers for compliance verification. Learners will explore equipment applications in virtual demonstrations, understanding when advanced tools justify their cost. The AI voice tutor can explain tool selection, cost-benefit analysis, or regulatory requirements affecting tool needs. For example, a smoke machine costing R5,000 can quickly locate EVAP leaks that might take hours to find manually, paying for itself through improved efficiency. Investment in specialized equipment enhances workshop capability, customer satisfaction, and competitive advantage in South Africa's growing automotive service market.
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
                Mastering diagnostic tools—OBD2 scanners, multimeters, compression testers, and specialized equipment—enables accurate, efficient engine diagnostics. Proper tool selection, technique, and result interpretation prevent misdiagnoses, reduce repair time, and ensure customer satisfaction.
              </p>
            </div>
            <div>
              <h5 className="font-semibold text-gray-700">Interactive Q&A Session:</h5>
              <p className="text-gray-700">
                Learners participate in live discussions about tool applications, troubleshooting techniques, and equipment selection. Real-world scenarios address common diagnostic challenges, tool limitations, and cost-effective solutions for different workshop sizes and budgets.
              </p>
            </div>
            <div>
              <h5 className="font-semibold text-gray-700">Practice Assignments:</h5>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Perform virtual compression testing on a high-mileage engine, interpreting results and recommending repairs in a 500-word report.</li>
                <li>Create a diagnostic flowchart for using OBD2 scanners, multimeters, and pressure gauges to diagnose a no-start condition.</li>
                <li>Research and compare three different OBD2 scanners, analyzing features, costs, and suitability for small workshop applications.</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-gray-700">Outcome:</h5>
              <p className="text-gray-700">
                Participants will confidently select, operate, and interpret results from essential diagnostic tools, ensuring accurate engine problem identification and efficient repair planning. These skills form the foundation for professional automotive diagnostics in modern workshop environments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const lesson8_3: Lesson = {
  id: '8.3',
  title: 'Compression and Leak-Down Testing',
  content: LessonContent,
  duration: 90,
  objectives: [
    "Master compression testing procedures and interpretation",
    "Learn leak-down testing techniques for precise diagnostics",
    "Develop vacuum gauge diagnostic skills",
    "Apply fuel pressure testing for system evaluation",
    "Understand specialized testing equipment applications"
  ],
  keyTerms: [
    "Compression testing",
    "Leak-down testing",
    "Vacuum gauge diagnostics",
    "Fuel pressure testing",
    "Smoke machines",
    "Exhaust gas analyzers",
    "Timing verification",
    "Specialized equipment"
  ]
};