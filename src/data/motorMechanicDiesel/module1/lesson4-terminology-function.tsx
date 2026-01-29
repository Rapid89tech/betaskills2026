import React from 'react';
import { Lesson } from '../../../types/course';

const lesson4TerminologyFunction: Lesson = {
  id: 4,
  title: 'Basic Diesel Engine Terminology and Function',
  duration: 30,
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/9KKfIYch1FE',
    textContent: `
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-lg border border-red-200">
          <h1 class="text-3xl font-bold text-gray-900 mb-4">
            🔍 Basic Diesel Engine Terminology and Function
          </h1>
          <p class="text-lg text-gray-700">
            This section provides a comprehensive exploration of diesel engine terminology and operational functions, laying a critical foundation for understanding diesel mechanics. Through detailed explanations, interactive animations, and carefully selected YouTube videos, learners will master key terms such as compression ratio, TDC, BDC, stroke, and injection timing, alongside the mechanics of the diesel engine cycle. Designed for flexible online access, this content equips students with the knowledge to diagnose and maintain diesel engines effectively, preparing them for roles in automotive, industrial, and marine applications. 🛠️
          </p>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 class="text-2xl font-bold text-red-600 mb-4">📖 Terminology</h2>
          <p class="text-gray-700 mb-4 font-medium">
            Core terms that define diesel engine operation and performance.
          </p>

          <div class="space-y-6">
            <div class="bg-blue-50 p-5 rounded-lg border border-blue-200">
              <h3 class="text-xl font-bold text-blue-800 mb-3">A. Compression Ratio: Efficient Ignition Foundation ⚙️</h3>
              <p class="text-gray-700 mb-3 font-medium">
                <strong>Overview:</strong> The compression ratio, the ratio of cylinder volume at the piston's bottom dead center (BDC) to top dead center (TDC), typically 15:1 to 20:1 in diesel engines, ensures efficient fuel ignition.
              </p>
              
              <div class="space-y-4">
                <div class="bg-white p-4 rounded border border-blue-100">
                  <h4 class="font-bold text-blue-700 mb-2">High Compression Mechanics:</h4>
                  <p class="text-gray-700 text-sm leading-relaxed">
                    Diesel engines compress air to 15:1–20:1, reaching 500–600 psi and 700–900°F, enabling spontaneous fuel ignition without spark plugs.
                  </p>
                  <p class="text-gray-700 text-sm leading-relaxed mt-2">
                    The compression ratio drives diesel efficiency, compressing air to ignite fuel instantly, achieving 40–50% thermal efficiency, 20–30% better than gasoline engines. High ratios produce torque (500–1,000 lb-ft), ideal for heavy loads. Worn piston rings reduce compression, causing misfires and $3,000+ repairs. Compression tests every 50,000 miles ensure performance. Telematics monitor pressure, supporting 2025 EPA compliance, enhancing fuel economy by 5–10%, and extending engine life to 500,000 miles for fleet reliability.
                  </p>
                </div>

                <div class="bg-white p-4 rounded border border-blue-100">
                  <h4 class="font-bold text-blue-700 mb-2">Impact on Efficiency:</h4>
                  <p class="text-gray-700 text-sm leading-relaxed">
                    Higher ratios increase thermal efficiency, reducing fuel consumption by 15–20% compared to gasoline engines (e.g., 25 MPG vs. 18 MPG).
                  </p>
                  <p class="text-gray-700 text-sm leading-relaxed mt-2">
                    Diesel's high compression ratios minimize fuel waste, saving $5,000 annually for 100,000-mile fleets. For example, a 20:1 ratio yields 25 MPG, compared to gasoline's 18 MPG. Clogged injectors or air filters lower efficiency, costing $1,500. Regular injector cleaning (every 100,000 miles) and air filter replacements (every 30,000 miles) maintain ratios. This efficiency supports 2025 EPA standards, reducing CO2 emissions and ensuring cost-effective operation for long-haul trucks.
                  </p>
                </div>

                <div class="bg-white p-4 rounded border border-blue-100">
                  <h4 class="font-bold text-blue-700 mb-2">Component Stress Management:</h4>
                  <p class="text-gray-700 text-sm leading-relaxed">
                    High ratios stress pistons and cylinders, requiring robust materials and maintenance to prevent wear.
                  </p>
                  <p class="text-gray-700 text-sm leading-relaxed mt-2">
                    Compression ratios of 15:1–20:1 generate 600 psi, stressing components. Robust cast iron or aluminum blocks withstand this, lasting 500,000 miles with proper care. Poor lubrication causes cylinder scoring, costing $4,000. Oil changes every 10,000 miles with 15W-40 oil and regular inspections prevent wear. Telematics track component health, ensuring durability and 2025 EPA compliance, minimizing downtime for heavy-duty applications.
                  </p>
                </div>
              </div>
            </div>

            <div class="bg-green-50 p-5 rounded-lg border border-green-200">
              <h3 class="text-xl font-bold text-green-800 mb-3">B. TDC (Top Dead Center): Maximum Compression Point 🔝</h3>
              <p class="text-gray-700 mb-3 font-medium">
                <strong>Overview:</strong> Top Dead Center (TDC) is the piston's highest point in the cylinder, maximizing compression for fuel ignition in diesel engines.
              </p>
              
              <div class="space-y-4">
                <div class="bg-white p-4 rounded border border-green-100">
                  <h4 class="font-bold text-green-700 mb-2">Compression Peak:</h4>
                  <p class="text-gray-700 text-sm leading-relaxed">
                    At TDC, air is compressed to 500–600 psi, heating to 700–900°F, enabling instant fuel ignition for efficient combustion.
                  </p>
                  <p class="text-gray-700 text-sm leading-relaxed mt-2">
                    TDC is the critical moment when air reaches maximum compression, triggering diesel ignition. This peak (15:1–20:1) ensures efficient combustion, delivering high torque. Misaligned timing or worn components reduce pressure, causing $2,000 misfire repairs. Regular compression tests (every 50,000 miles) and ECM calibration maintain TDC precision. Telematics monitor pressure, supporting 2025 EPA compliance, ensuring reliability and 5–10% fuel savings for fleets.
                  </p>
                </div>

                <div class="bg-white p-4 rounded border border-green-100">
                  <h4 class="font-bold text-green-700 mb-2">Valve and Injector Timing:</h4>
                  <p class="text-gray-700 text-sm leading-relaxed">
                    Valves close and fuel is injected at TDC, requiring precise camshaft and ECM coordination to optimize combustion.
                  </p>
                  <p class="text-gray-700 text-sm leading-relaxed mt-2">
                    At TDC, intake/exhaust valves close, and injectors deliver fuel at 20,000–30,000 psi, timed by the camshaft and ECM. Misaligned timing reduces power by 10%, costing $1,500. Valve adjustments every 50,000 miles and TSB-guided ECM updates ensure precision. Diagnostic tools like Cummins INSITE detect issues early. This coordination supports 2025 EPA standards, enhancing combustion efficiency and extending engine life for heavy-duty fleet operations.
                  </p>
                </div>

                <div class="bg-white p-4 rounded border border-green-100">
                  <h4 class="font-bold text-green-700 mb-2">Structural Integrity:</h4>
                  <p class="text-gray-700 text-sm leading-relaxed">
                    The cylinder head and block must withstand TDC pressures, requiring robust materials and regular maintenance.
                  </p>
                  <p class="text-gray-700 text-sm leading-relaxed mt-2">
                    TDC pressures of 600 psi stress the cylinder head and block, requiring cast iron or aluminum construction. Warping or cracks from overheating cost $4,000 to repair. Coolant checks every 10,000 miles and head bolt torque inspections (every 100,000 miles) prevent failures. Telematics monitor temperatures, ensuring 500,000-mile durability. This integrity supports 2025 EPA compliance, maintaining compression for efficient, reliable fleet performance.
                  </p>
                </div>
              </div>
            </div>

            <div class="bg-yellow-50 p-5 rounded-lg border border-yellow-200">
              <h3 class="text-xl font-bold text-yellow-800 mb-3">C. BDC (Bottom Dead Center): Maximum Air Intake 🌀</h3>
              <p class="text-gray-700 mb-3 font-medium">
                <strong>Overview:</strong> Bottom Dead Center (BDC) is the piston's lowest point, allowing maximum air intake volume to prepare for compression in diesel engines.
              </p>
              
              <div class="space-y-4">
                <div class="bg-white p-4 rounded border border-yellow-100">
                  <h4 class="font-bold text-yellow-700 mb-2">Air Intake Volume:</h4>
                  <p class="text-gray-700 text-sm leading-relaxed">
                    At BDC, the cylinder achieves maximum volume, drawing in air (often turbocharged) to fuel high-pressure combustion.
                  </p>
                  <p class="text-gray-700 text-sm leading-relaxed mt-2">
                    BDC maximizes air intake, critical for diesel's 15:1–20:1 compression. Turbochargers boost air volume by 20–30%, enhancing power. Clogged air filters reduce intake by 5–10%, costing $1,500 in efficiency losses. Air filter replacements every 30,000 miles and turbo inspections (every 50,000 miles) ensure airflow. Telematics monitor intake pressure, supporting 2025 EPA compliance, improving fuel economy, and ensuring reliability for heavy-duty fleets.
                  </p>
                </div>

                <div class="bg-white p-4 rounded border border-yellow-100">
                  <h4 class="font-bold text-yellow-700 mb-2">Piston Movement Dynamics:</h4>
                  <p class="text-gray-700 text-sm leading-relaxed">
                    The piston's full descent at BDC ensures sufficient air for combustion, driven by crankshaft rotation.
                  </p>
                  <p class="text-gray-700 text-sm leading-relaxed mt-2">
                    At BDC, the piston's descent, driven by the crankshaft, maximizes cylinder volume for air intake. This ensures enough air for high-pressure combustion, producing 500–1,000 lb-ft torque. Worn crankshaft bearings disrupt movement, costing $3,000 to repair. Oil changes every 10,000 miles with 15W-40 oil and bearing inspections (every 100,000 miles) maintain dynamics. Telematics track vibration, ensuring 500,000-mile durability and 2025 EPA compliance for efficient fleet operation.
                  </p>
                </div>

                <div class="bg-white p-4 rounded border border-yellow-100">
                  <h4 class="font-bold text-yellow-700 mb-2">Turbocharger Enhancement:</h4>
                  <p class="text-gray-700 text-sm leading-relaxed">
                    Turbochargers increase air density at BDC, boosting combustion efficiency and power output for heavy loads.
                  </p>
                  <p class="text-gray-700 text-sm leading-relaxed mt-2">
                    Turbochargers deliver 20–30 psi at BDC, increasing air density for 30–40% more power. Failing turbos reduce intake, cutting efficiency and costing $4,000. Monthly boost pressure checks and intercooler cleaning (every 50,000 miles) extend turbo life to 250,000 miles. Telematics monitor performance, ensuring 2025 EPA compliance. This enhancement supports high torque and fuel economy, critical for long-haul trucks and industrial diesel applications.
                  </p>
                </div>
              </div>
            </div>

            <div class="bg-purple-50 p-5 rounded-lg border border-purple-200">
              <h3 class="text-xl font-bold text-purple-800 mb-3">D. Stroke: Piston Movement Cycle 🚀</h3>
              <p class="text-gray-700 mb-3 font-medium">
                <strong>Overview:</strong> The stroke is the piston's full movement from TDC to BDC or vice versa, driving the combustion cycle in diesel engines.
              </p>
              
              <div class="space-y-4">
                <div class="bg-white p-4 rounded border border-purple-100">
                  <h4 class="font-bold text-purple-700 mb-2">Piston Travel Mechanics:</h4>
                  <p class="text-gray-700 text-sm leading-relaxed">
                    Each stroke (intake, compression, power, exhaust) moves the piston between TDC and BDC, converting energy via crankshaft rotation.
                  </p>
                  <p class="text-gray-700 text-sm leading-relaxed mt-2">
                    The stroke drives the four-stroke diesel cycle, with pistons traveling 3–5 inches between TDC and BDC to intake air, compress, combust, and exhaust. This produces 500–1,000 lb-ft torque. Worn pistons or crankshafts reduce efficiency, costing $5,000. Oil changes every 10,000 miles and inspections (every 100,000 miles) ensure smooth travel. Telematics track movement, supporting 2025 EPA compliance and 500,000-mile durability for fleet reliability.
                  </p>
                </div>

                <div class="bg-white p-4 rounded border border-purple-100">
                  <h4 class="font-bold text-purple-700 mb-2">Cycle Efficiency:</h4>
                  <p class="text-gray-700 text-sm leading-relaxed">
                    Full strokes ensure optimal air intake and exhaust, maximizing combustion efficiency and power output.
                  </p>
                  <p class="text-gray-700 text-sm leading-relaxed mt-2">
                    Complete strokes ensure sufficient air intake at BDC and exhaust expulsion, optimizing 40–50% thermal efficiency. Incomplete strokes from worn components reduce power by 10%, costing $2,000. Regular valve adjustments (every 50,000 miles) and air filter replacements (every 30,000 miles) maintain cycle efficiency. Telematics monitor performance, ensuring 2025 EPA compliance, improving fuel economy by 5–10%, and supporting reliable operation for heavy-duty fleets.
                  </p>
                </div>

                <div class="bg-white p-4 rounded border border-purple-100">
                  <h4 class="font-bold text-purple-700 mb-2">Component Stress:</h4>
                  <p class="text-gray-700 text-sm leading-relaxed">
                    Strokes generate high forces, requiring robust components and lubrication to prevent wear and maintain longevity.
                  </p>
                  <p class="text-gray-700 text-sm leading-relaxed mt-2">
                    Strokes produce 600 psi forces, stressing pistons, rods, and crankshafts. Robust components last 500,000 miles with proper care. Poor lubrication causes wear, costing $4,000. Oil changes every 10,000 miles with 15W-40 oil and bearing checks (every 100,000 miles) prevent failures. Telematics detect vibration, ensuring durability. This supports 2025 EPA standards, minimizing downtime and maintaining efficiency in demanding diesel applications.
                  </p>
                </div>
              </div>
            </div>

            <div class="bg-indigo-50 p-5 rounded-lg border border-indigo-200">
              <h3 class="text-xl font-bold text-indigo-800 mb-3">E. Injection Timing: Precision Combustion 💉</h3>
              <p class="text-gray-700 mb-3 font-medium">
                <strong>Overview:</strong> Injection timing is the precise moment fuel is injected into hot, compressed air at TDC, ensuring optimal combustion in diesel engines.
              </p>
              
              <div class="space-y-4">
                <div class="bg-white p-4 rounded border border-indigo-100">
                  <h4 class="font-bold text-indigo-700 mb-2">ECM-Controlled Precision:</h4>
                  <p class="text-gray-700 text-sm leading-relaxed">
                    The ECM times fuel injection at 20,000–30,000 psi, optimizing combustion for power and efficiency at TDC.
                  </p>
                  <p class="text-gray-700 text-sm leading-relaxed mt-2">
                    Injection timing, controlled by the ECM, delivers fuel at TDC for instant ignition, maximizing torque and 40–50% efficiency. Misaligned timing reduces power by 10%, costing $1,500. ECM updates via TSBs and injector cleaning every 100,000 miles ensure precision. Diagnostic tools like Cummins INSITE detect issues early, supporting 2025 EPA compliance. This precision enhances fuel economy by 5%, critical for long-haul fleets, ensuring reliable, cost-effective operation.
                  </p>
                </div>

                <div class="bg-white p-4 rounded border border-indigo-100">
                  <h4 class="font-bold text-indigo-700 mb-2">Fuel Quality Impact:</h4>
                  <p class="text-gray-700 text-sm leading-relaxed">
                    High-cetane diesel ensures rapid ignition, reducing emissions and improving timing accuracy.
                  </p>
                  <p class="text-gray-700 text-sm leading-relaxed mt-2">
                    High-cetane diesel (45–55) ignites faster, aligning with TDC injection for 5–10% better efficiency and lower NOx emissions. Poor fuel clogs injectors, disrupting timing and costing $2,000. Fuel filters every 15,000 miles and quarterly fuel quality tests prevent issues. Telematics monitor injector performance, ensuring 2025 EPA compliance. This supports combustion efficiency, extending engine life to 500,000 miles and reducing costs for heavy-duty applications.
                  </p>
                </div>

                <div class="bg-white p-4 rounded border border-indigo-100">
                  <h4 class="font-bold text-indigo-700 mb-2">Injector Maintenance:</h4>
                  <p class="text-gray-700 text-sm leading-relaxed">
                    Regular cleaning and calibration of injectors prevent timing errors, ensuring efficient combustion and compliance.
                  </p>
                  <p class="text-gray-700 text-sm leading-relaxed mt-2">
                    Injectors operating at 20,000–30,000 psi require cleaning every 100,000 miles to prevent clogs, which disrupt timing and cause misfires costing $2,000. OEM injectors (e.g., Bosch) last 200,000 miles. Regular diagnostics and TSB-guided maintenance ensure accuracy. Telematics track injector health, supporting 2025 EPA standards. This maintenance ensures optimal combustion, minimizing emissions and downtime for fleets in demanding environments.
                  </p>
                </div>
              </div>
            </div>

            <div class="bg-orange-50 p-5 rounded-lg border border-orange-200">
              <h3 class="text-xl font-bold text-orange-800 mb-3">F. Bore and Stroke Dimensions: Power and Displacement 📏</h3>
              <p class="text-gray-700 mb-3 font-medium">
                <strong>Overview:</strong> Bore (cylinder diameter) and stroke length determine engine displacement and influence power output in diesel engines.
              </p>
              
              <div class="space-y-4">
                <div class="bg-white p-4 rounded border border-orange-100">
                  <h4 class="font-bold text-orange-700 mb-2">Displacement Calculation:</h4>
                  <p class="text-gray-700 text-sm leading-relaxed">
                    Bore (3–5 inches) and stroke (3–6 inches) determine displacement (e.g., 6.7L for a Cummins ISX), affecting torque and power.
                  </p>
                  <p class="text-gray-700 text-sm leading-relaxed mt-2">
                    Bore and stroke define displacement (bore² × stroke × cylinders), with larger dimensions increasing torque (e.g., 900 lb-ft in a 6.7L engine). A 4-inch bore and 5-inch stroke yield high power for trucks. Worn cylinders reduce displacement efficiency, costing $4,000. Inspections every 100,000 miles and oil changes (every 10,000 miles) maintain dimensions. Telematics ensure performance, supporting 2025 EPA compliance and reliability for heavy-duty fleets.
                  </p>
                </div>

                <div class="bg-white p-4 rounded border border-orange-100">
                  <h4 class="font-bold text-orange-700 mb-2">Power Output Influence:</h4>
                  <p class="text-gray-700 text-sm leading-relaxed">
                    Larger bores increase air/fuel capacity, while longer strokes enhance torque, optimizing heavy-duty performance.
                  </p>
                  <p class="text-gray-700 text-sm leading-relaxed mt-2">
                    Larger bores (e.g., 4.5 inches) allow more air/fuel, boosting power, while longer strokes (e.g., 5 inches) increase torque for towing. A 6.7L diesel produces 400 hp and 1,000 lb-ft. Wear from poor lubrication reduces output, costing $3,000. Oil changes every 10,000 miles and cylinder inspections maintain performance. Telematics monitor power, ensuring 2025 EPA compliance, enhancing fuel economy by 5%, and supporting heavy-load applications.
                  </p>
                </div>

                <div class="bg-white p-4 rounded border border-orange-100">
                  <h4 class="font-bold text-orange-700 mb-2">Material Durability:</h4>
                  <p class="text-gray-700 text-sm leading-relaxed">
                    Cylinders must withstand high pressures, requiring cast iron or aluminum with regular maintenance to prevent wear.
                  </p>
                  <p class="text-gray-700 text-sm leading-relaxed mt-2">
                    Bore and stroke dimensions endure 600 psi, requiring robust cast iron or aluminum cylinders. Wear from contaminated oil causes scoring, costing $5,000. Oil changes every 10,000 miles with 15W-40 oil and coolant checks (every 10,000 miles) prevent damage. Telematics track cylinder health, ensuring 500,000-mile durability. This supports 2025 EPA standards, maintaining displacement efficiency for reliable, high-torque fleet performance.
                  </p>
                </div>
              </div>
            </div>

            <div class="bg-teal-50 p-5 rounded-lg border border-teal-200">
              <h3 class="text-xl font-bold text-teal-800 mb-3">G. Valve Timing: Air and Gas Flow Control 🕒</h3>
              <p class="text-gray-700 mb-3 font-medium">
                <strong>Overview:</strong> Valve timing coordinates intake and exhaust valve operation, ensuring efficient air intake and exhaust expulsion in diesel engines.
              </p>
              
              <div class="space-y-4">
                <div class="bg-white p-4 rounded border border-teal-100">
                  <h4 class="font-bold text-teal-700 mb-2">Camshaft Coordination:</h4>
                  <p class="text-gray-700 text-sm leading-relaxed">
                    The camshaft times valve opening/closing to align with TDC/BDC, optimizing air intake and exhaust flow for combustion.
                  </p>
                  <p class="text-gray-700 text-sm leading-relaxed mt-2">
                    Valve timing, driven by the camshaft, opens intake valves at BDC for air intake and exhaust valves post-combustion, ensuring 40–50% efficiency. Misaligned timing reduces airflow by 10%, costing $1,500. Valve adjustments every 50,000 miles and camshaft inspections (every 100,000 miles) maintain precision. Telematics and diagnostics like JPRO ensure 2025 EPA compliance, enhancing fuel economy and reliability for heavy-duty fleets.
                  </p>
                </div>

                <div class="bg-white p-4 rounded border border-teal-100">
                  <h4 class="font-bold text-teal-700 mb-2">Variable Valve Timing (VVT):</h4>
                  <p class="text-gray-700 text-sm leading-relaxed">
                    Modern diesels use VVT to adjust timing dynamically, improving efficiency across RPM ranges.
                  </p>
                  <p class="text-gray-700 text-sm leading-relaxed mt-2">
                    VVT in 2025 diesel engines adjusts valve timing for optimal airflow at varying RPMs, improving fuel economy by 3–5%. Faulty VVT systems reduce efficiency, costing $2,000. Regular ECM updates and VVT sensor checks (every 50,000 miles) prevent failures. Telematics monitor performance, ensuring 2025 EPA compliance. This technology enhances torque and reduces emissions, supporting reliable operation in long-haul trucks and industrial applications.
                  </p>
                </div>

                <div class="bg-white p-4 rounded border border-teal-100">
                  <h4 class="font-bold text-teal-700 mb-2">Valve Maintenance:</h4>
                  <p class="text-gray-700 text-sm leading-relaxed">
                    Regular adjustments and cleaning prevent sticking or leaks, ensuring efficient gas exchange and compliance.
                  </p>
                  <p class="text-gray-700 text-sm leading-relaxed mt-2">
                    Intake and exhaust valves require adjustments every 50,000 miles to prevent sticking from carbon buildup, which reduces airflow and costs $1,000 to repair. Cleaning valves every 100,000 miles and using high-cetane fuel maintain efficiency. Diagnostic tools detect leaks early, ensuring 500,000-mile durability. This supports 2025 EPA standards, minimizing emissions and downtime, and ensuring smooth gas flow for heavy-duty diesel fleets.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p class="text-gray-700 text-sm leading-relaxed">
              Mastering diesel engine terminology is essential for effective troubleshooting and maintenance. The compression ratio, typically 15:1 to 20:1 in diesel engines, compares the cylinder's volume when the piston is at BDC to TDC, creating high-pressure conditions (up to 20 bar) that heat air to over 500°C for spontaneous fuel ignition. TDC represents the piston's peak position, critical for maximum compression, while BDC allows the greatest air intake. A stroke, the piston's travel between TDC and BDC, forms the basis of the 4-stroke cycle. Injection timing ensures fuel is sprayed at the precise moment for efficient combustion, impacting power and emissions. Bore and stroke dimensions determine engine displacement, affecting torque output, while valve timing optimizes air and exhaust flow. Mechanics rely on these terms to diagnose issues like low compression or mistimed injection, ensuring engines deliver reliable performance across automotive, industrial, and marine applications.
            </p>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 class="text-2xl font-bold text-red-600 mb-4">⚙️ Function</h2>
          <p class="text-gray-700 mb-4 font-medium">
            The diesel engine cycle and synergistic component operation.
          </p>

          <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 class="font-bold text-blue-800 mb-2">Core Functions</h3>
                <ul class="space-y-2 text-sm text-gray-700">
                  <li><strong>Diesel Cycle:</strong> Compresses air to high pressure, ignites injected fuel, and converts energy to power</li>
                  <li><strong>Component Synergy:</strong> Cylinder, piston, crankshaft, and camshaft collaborate for seamless operation</li>
                  <li><strong>Power Output:</strong> Combustion energy drives pistons, converted to rotational torque via the crankshaft</li>
                </ul>
              </div>
            </div>
            
            <div class="space-y-4">
              <div class="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <h3 class="font-bold text-orange-800 mb-2">System Operations</h3>
                <ul class="space-y-2 text-sm text-gray-700">
                  <li><strong>Efficiency:</strong> High compression and precise timing maximize fuel economy and performance</li>
                  <li><strong>Air Management:</strong> Intake and exhaust systems ensure optimal air supply and waste removal</li>
                  <li><strong>Fuel Delivery:</strong> Precise injection systems enhance combustion efficiency and reduce emissions</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p class="text-gray-700 text-sm leading-relaxed">
              The diesel engine's function hinges on its efficient 4-stroke cycle, which powers a wide range of vehicles and machinery. Air is drawn into the cylinder and compressed to high pressures (15:1 to 20:1), generating temperatures above 500°C, allowing injected fuel to ignite spontaneously without a spark. This combustion drives the piston, producing mechanical energy converted into rotational torque by the crankshaft. The cylinder houses this process, while the camshaft coordinates valve timing to optimize air intake and exhaust expulsion. Fuel injection systems deliver precise amounts of atomized diesel at the correct moment, ensuring complete combustion and minimal waste. Understanding these integrated functions enables mechanics to diagnose performance issues, optimize efficiency, and maintain compliance with emission standards across diverse diesel applications from trucks to marine engines.
            </p>
          </div>
        </div>
      </div>
    `
  }
};

export default lesson4TerminologyFunction;