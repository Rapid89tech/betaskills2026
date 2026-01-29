import type { Lesson } from '../../../types/course';

const lesson3EngineComponents: Lesson = {
  id: 3,
  title: 'Diesel Engine Components: Detailed Breakdown',
  duration: '60 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/X4PEVU7psMo',
    textContent: `
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-lg border border-red-200">
          <h1 class="text-3xl font-bold text-gray-900 mb-4">
            🔧 Diesel Engine Components: Detailed Breakdown
          </h1>
          <p class="text-lg text-gray-700">
            This section provides an in-depth exploration of diesel engine components, detailing their roles in ensuring efficient operation. Through engaging explanations, interactive animations, and curated YouTube videos, learners will master the functions of critical parts like the cylinder head, pistons, and turbocharger. Designed for flexible online access, this content prepares students for diesel mechanic roles in automotive, industrial, and marine applications. 🛠️
          </p>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 class="text-2xl font-bold text-red-600 mb-4">🛑 Cylinder Head and Block</h2>
          <p class="text-gray-700 mb-4 font-medium">
            The foundation of the diesel engine, housing combustion chambers.
          </p>

          <div class="space-y-6">
            <div class="bg-blue-50 p-5 rounded-lg border border-blue-200">
              <h3 class="text-xl font-bold text-blue-800 mb-3">A. Cylinder Block: Combustion Chamber Foundation 🛠️</h3>
              <p class="text-gray-700 mb-3 font-medium">
                <strong>Overview:</strong> The cylinder block contains the cylinders where fuel combustion occurs, driving the pistons to produce mechanical energy in a diesel engine.
              </p>
              
              <div class="space-y-4">
                <div class="bg-white p-4 rounded border border-blue-100">
                  <h4 class="font-bold text-blue-700 mb-2">Cylinder Housing:</h4>
                  <p class="text-gray-700 text-sm leading-relaxed">
                    The block contains 4–12 cylinders in inline or V configurations, where pistons move to convert combustion energy into mechanical work.
                  </p>
                  <p class="text-gray-700 text-sm leading-relaxed mt-2">
                    The cylinder block is the structural core of a diesel engine, housing cylinders where air is compressed and fuel ignites, driving pistons to produce torque. Inline-6 or V-8 configurations are common in heavy-duty applications, delivering 500–1,000 lb-ft. Cylinder wear from poor lubrication can cause compression loss, costing $5,000+ in repairs. Regular oil changes (every 10,000–25,000 miles) with 15W-40 oil and telematics monitoring of cylinder health ensure 500,000-mile durability. This foundation supports 2025 EPA compliance by maintaining efficient combustion, critical for fleet reliability.
                  </p>
                </div>

                <div class="bg-white p-4 rounded border border-blue-100">
                  <h4 class="font-bold text-blue-700 mb-2">Coolant and Oil Passages:</h4>
                  <p class="text-gray-700 text-sm leading-relaxed">
                    Integrated passages circulate coolant and oil to manage heat and lubricate moving parts, preventing overheating and wear.
                  </p>
                  <p class="text-gray-700 text-sm leading-relaxed mt-2">
                    The cylinder block features coolant and oil passages to dissipate heat from 700–900°F combustion and lubricate pistons. Clogged passages cause overheating, risking $3,000+ in repairs. Coolant flushes every 2 years and oil changes every 10,000 miles maintain flow. Diagnostic tools like JPRO monitor temperatures, preventing failures. Effective cooling and lubrication extend block life, ensuring compliance with 2025 EPA standards and minimizing downtime for heavy-duty fleets.
                  </p>
                </div>

                <div class="bg-white p-4 rounded border border-blue-100">
                  <h4 class="font-bold text-blue-700 mb-2">Structural Integrity:</h4>
                  <p class="text-gray-700 text-sm leading-relaxed">
                    The block's robust design withstands high pressures (500–600 psi), ensuring longevity under heavy-duty conditions.
                  </p>
                  <p class="text-gray-700 text-sm leading-relaxed mt-2">
                    Designed to handle 15:1–20:1 compression ratios, the cylinder block's strength prevents cracking under 600 psi pressures, supporting 500,000-mile lifespans. Poor maintenance, like contaminated oil, causes cylinder scoring, costing $4,000 to repair. Regular inspections (every 100,000 miles) and high-quality oil ensure integrity. Telematics track vibration, detecting stress early. This durability makes the block ideal for trucks and industrial applications, maintaining efficiency and compliance.
                  </p>
                </div>
              </div>
            </div>

            <div class="bg-green-50 p-5 rounded-lg border border-green-200">
              <h3 class="text-xl font-bold text-green-800 mb-3">B. Cylinder Head: Combustion Control Center 🔧</h3>
              <p class="text-gray-700 mb-3 font-medium">
                <strong>Overview:</strong> The cylinder head covers the block, housing intake and exhaust ports, fuel injectors, and valves to manage air, fuel, and exhaust flow.
              </p>
              
              <div class="space-y-4">
                <div class="bg-white p-4 rounded border border-green-100">
                  <h4 class="font-bold text-green-700 mb-2">Intake and Exhaust Ports:</h4>
                  <p class="text-gray-700 text-sm leading-relaxed">
                    Ports channel air into cylinders and exhaust gases out, optimized for efficient airflow and combustion.
                  </p>
                  <p class="text-gray-700 text-sm leading-relaxed mt-2">
                    The cylinder head's intake ports deliver air for 15:1–20:1 compression, while exhaust ports expel gases post-combustion. Poor port design or carbon buildup reduces airflow by 5–10%, costing $1,500 in repairs. Cleaning ports every 100,000 miles and using high-cetane fuel ensure efficiency. Telematics monitor airflow, supporting 2025 EPA compliance. Optimized ports enhance fuel economy by 5%, critical for heavy-duty fleets, ensuring reliable combustion and minimal emissions.
                  </p>
                </div>

                <div class="bg-white p-4 rounded border border-green-100">
                  <h4 class="font-bold text-green-700 mb-2">Fuel Injectors and Valves:</h4>
                  <p class="text-gray-700 text-sm leading-relaxed">
                    Injectors deliver fuel at 20,000–30,000 psi, and valves control air/exhaust flow, timed by the camshaft for precise combustion.
                  </p>
                  <p class="text-gray-700 text-sm leading-relaxed mt-2">
                    Cylinder head injectors atomize fuel for instant ignition, while intake/exhaust valves, driven by the camshaft, manage gas flow. Faulty injectors or sticking valves cause misfires, costing $2,000–$3,000. Injector cleaning every 100,000 miles and valve adjustments every 50,000 miles maintain precision. Diagnostic tools like Cummins INSITE and TSB updates prevent issues, ensuring 2025 EPA compliance. This precision supports 500,000-mile durability, reducing downtime for fleets.
                  </p>
                </div>

                <div class="bg-white p-4 rounded border border-green-100">
                  <h4 class="font-bold text-green-700 mb-2">Heat and Pressure Resistance:</h4>
                  <p class="text-gray-700 text-sm leading-relaxed">
                    The head withstands extreme temperatures (700–900°F) and pressures, requiring robust construction and maintenance.
                  </p>
                  <p class="text-gray-700 text-sm leading-relaxed mt-2">
                    The cylinder head endures 600 psi and 900°F, requiring materials like cast iron to resist warping. Overheating from coolant leaks can crack heads, costing $4,000+ to replace. Coolant checks every 10,000 miles and head bolt torque inspections (every 100,000 miles) prevent failures. Telematics monitor temperatures, ensuring reliability. This resistance supports heavy-duty applications, maintaining efficiency and compliance with 2025 EPA standards for long-haul operations.
                  </p>
                </div>
              </div>
            </div>

            <div class="bg-yellow-50 p-5 rounded-lg border border-yellow-200">
              <h3 class="text-xl font-bold text-yellow-800 mb-3">C. Material: Cast Iron or Aluminum 🏗️</h3>
              <p class="text-gray-700 mb-3 font-medium">
                <strong>Overview:</strong> Cylinder blocks and heads are typically made of cast iron or aluminum, balancing durability, heat dissipation, and weight for diesel engine performance.
              </p>
              
              <div class="space-y-4">
                <div class="bg-white p-4 rounded border border-yellow-100">
                  <h4 class="font-bold text-yellow-700 mb-2">Cast Iron Strength:</h4>
                  <p class="text-gray-700 text-sm leading-relaxed">
                    Cast iron blocks and heads offer superior durability, ideal for high-pressure diesel applications like heavy-duty trucks.
                  </p>
                  <p class="text-gray-700 text-sm leading-relaxed mt-2">
                    Cast iron's high tensile strength withstands 600 psi and 900°F, making it ideal for diesel blocks and heads in trucks and industrial engines. Its durability supports 500,000-mile lifespans but adds 10–15% weight. Cracks from overheating cost $5,000 to repair. Regular coolant flushes (every 2 years) and oil changes (every 10,000 miles) prevent damage. Cast iron's robustness ensures 2025 EPA compliance and reliability, minimizing downtime for demanding fleets.
                  </p>
                </div>

                <div class="bg-white p-4 rounded border border-yellow-100">
                  <h4 class="font-bold text-yellow-700 mb-2">Aluminum Weight Savings:</h4>
                  <p class="text-gray-700 text-sm leading-relaxed">
                    Aluminum blocks and heads reduce weight by 20–30%, improving fuel economy but requiring careful maintenance to avoid corrosion.
                  </p>
                  <p class="text-gray-700 text-sm leading-relaxed mt-2">
                    Aluminum's lightweight properties reduce diesel engine weight by 20–30%, improving fuel economy by 3–5% in medium-duty applications. However, it's prone to corrosion and warping under high pressures, costing $3,000+ to repair. Coolant with corrosion inhibitors and checks every 10,000 miles prevent issues. Telematics monitor temperatures, ensuring durability. Aluminum suits lighter trucks, supporting 2025 EPA standards with efficient performance, though less durable than cast iron.
                  </p>
                </div>

                <div class="bg-white p-4 rounded border border-yellow-100">
                  <h4 class="font-bold text-yellow-700 mb-2">Heat Dissipation Properties:</h4>
                  <p class="text-gray-700 text-sm leading-relaxed">
                    Both materials dissipate heat effectively, with aluminum offering faster cooling but cast iron retaining heat for stable operation.
                  </p>
                  <p class="text-gray-700 text-sm leading-relaxed mt-2">
                    Aluminum dissipates heat 50% faster than cast iron, reducing engine temperatures but risking thermal stress. Cast iron's heat retention stabilizes combustion, ideal for heavy loads. Poor cooling systems cause warping, costing $2,000–$4,000. Coolant flushes every 2 years and radiator checks every 50,000 miles ensure efficiency. Both materials support 2025 EPA compliance by maintaining combustion efficiency, with telematics ensuring optimal heat management for fleet reliability.
                  </p>
                </div>
              </div>
            </div>

            <div class="bg-purple-50 p-5 rounded-lg border border-purple-200">
              <h3 class="text-xl font-bold text-purple-800 mb-3">D. Sealing: Head Gasket Integrity 🔩</h3>
              <p class="text-gray-700 mb-3 font-medium">
                <strong>Overview:</strong> The head gasket ensures a tight seal between the cylinder block and head, maintaining compression and preventing leaks.
              </p>
              
              <div class="space-y-4">
                <div class="bg-white p-4 rounded border border-purple-100">
                  <h4 class="font-bold text-purple-700 mb-2">Compression Sealing:</h4>
                  <p class="text-gray-700 text-sm leading-relaxed">
                    The gasket maintains 500–600 psi compression, preventing gas leaks that reduce efficiency and power.
                  </p>
                  <p class="text-gray-700 text-sm leading-relaxed mt-2">
                    The head gasket seals the cylinder head to the block, preserving 15:1–20:1 compression for efficient combustion. A blown gasket causes compression loss, reducing power by 10–20% and costing $2,000–$4,000 to replace. Regular torque checks (every 100,000 miles) and coolant monitoring prevent failures. Telematics track pressure, ensuring early detection. This sealing supports 2025 EPA compliance by maintaining combustion efficiency, critical for heavy-duty fleet performance and longevity.
                  </p>
                </div>

                <div class="bg-white p-4 rounded border border-purple-100">
                  <h4 class="font-bold text-purple-700 mb-2">Coolant and Oil Separation:</h4>
                  <p class="text-gray-700 text-sm leading-relaxed">
                    The gasket prevents mixing of coolant and oil, avoiding engine damage from contamination.
                  </p>
                  <p class="text-gray-700 text-sm leading-relaxed mt-2">
                    The head gasket separates coolant and oil passages, preventing contamination that can cause $5,000+ in engine damage. Leaks from worn gaskets lead to oil in coolant or vice versa, risking bearing failure. Coolant checks every 10,000 miles and gasket inspections during major services (every 100,000 miles) ensure integrity. Diagnostic tools detect leaks early, maintaining reliability. This separation supports 500,000-mile durability and 2025 EPA standards, minimizing costly repairs for fleets.
                  </p>
                </div>

                <div class="bg-white p-4 rounded border border-purple-100">
                  <h4 class="font-bold text-purple-700 mb-2">Material and Maintenance:</h4>
                  <p class="text-gray-700 text-sm leading-relaxed">
                    Multi-layer steel (MLS) gaskets are common, requiring proper torque and regular checks to prevent blowouts.
                  </p>
                  <p class="text-gray-700 text-sm leading-relaxed mt-2">
                    MLS head gaskets, made of layered steel, withstand 600 psi and 900°F, ensuring a durable seal. Improper torque or overheating causes blowouts, costing $3,000 to repair. Torque head bolts to manufacturer specs during installation and check every 100,000 miles. Regular coolant and oil analysis prevent corrosion. Telematics and TSBs guide maintenance, ensuring 2025 EPA compliance and extending engine life, making MLS gaskets reliable for heavy-duty diesel applications.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p class="text-gray-700 text-sm leading-relaxed">
              The cylinder head and block form the structural core of a diesel engine, enabling the combustion process that powers the system. The cylinder block, often crafted from cast iron for its strength and durability, houses multiple cylinders where pistons reciprocate to convert fuel energy into mechanical work. The cylinder head, securely bolted to the block, contains essential components such as intake and exhaust ports, valves, and fuel injectors, which manage airflow and fuel delivery. A robust head gasket between the head and block prevents leaks, maintaining high compression ratios (typically 15:1 to 20:1) critical for diesel ignition. These components endure extreme pressures and temperatures, necessitating precise engineering and regular maintenance. Mechanics must routinely inspect for cracks, warping, or gasket failures to ensure engine reliability, making a thorough understanding of these parts essential for effective diagnostics and repairs in diesel systems.
            </p>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 class="text-2xl font-bold text-red-600 mb-4">⚙️ Pistons and Connecting Rods</h2>
          <p class="text-gray-700 mb-4 font-medium">
            Convert combustion energy into mechanical motion.
          </p>

          <div class="space-y-6">
            <div class="bg-indigo-50 p-5 rounded-lg border border-indigo-200">
              <h3 class="text-xl font-bold text-indigo-800 mb-3">A. Pistons: Driving Motion Through Combustion 🔥</h3>
              <p class="text-gray-700 mb-3 font-medium">
                <strong>Overview:</strong> Pistons move up and down in cylinders, driven by combustion pressure, to generate the force needed for engine power.
              </p>
              
              <div class="space-y-4">
                <div class="bg-white p-4 rounded border border-indigo-100">
                  <h4 class="font-bold text-indigo-700 mb-2">Combustion-Driven Motion:</h4>
                  <p class="text-gray-700 text-sm leading-relaxed">
                    Converts combustion pressure into linear motion.
                  </p>
                  <p class="text-gray-700 text-sm leading-relaxed mt-2">
                    Pistons convert 15,000–30,000 psi combustion pressure into 500–1,000 lb-ft torque, boosting power by 30–50% and saving $1,200 annually in fuel for 100,000 miles. Inspections every 50,000 miles prevent wear. Telematics monitor piston performance, supporting 2025 EPA compliance. This is critical for diesel trucks and machinery in high-performance applications.
                  </p>
                </div>

                <div class="bg-white p-4 rounded border border-indigo-100">
                  <h4 class="font-bold text-indigo-700 mb-2">Power Generation:</h4>
                  <p class="text-gray-700 text-sm leading-relaxed">
                    Transfers energy to the crankshaft for propulsion.
                  </p>
                  <p class="text-gray-700 text-sm leading-relaxed mt-2">
                    Pistons drive crankshaft rotation, ensuring 40–50% combustion efficiency and avoiding $1,500 in misfire repairs. Worn pistons reduce power by 10%. Maintenance every 50,000 miles ensures function. Telematics track power output, supporting 2025 EPA compliance. This maintains performance in diesel trucks, buses, and heavy equipment in regulated markets.
                  </p>
                </div>

                <div class="bg-white p-4 rounded border border-indigo-100">
                  <h4 class="font-bold text-indigo-700 mb-2">Combustion Efficiency:</h4>
                  <p class="text-gray-700 text-sm leading-relaxed">
                    Optimizes air-fuel mixture for maximum output.
                  </p>
                  <p class="text-gray-700 text-sm leading-relaxed mt-2">
                    Efficient piston motion improves 25 MPG and reduces PM emissions by 10%, preventing $1,000 in injector damage. Neglect causes inefficiency. Inspections every 50,000 miles ensure efficiency. Telematics monitor combustion, ensuring 2025 EPA compliance. This is vital for diesel fleets in trucks and machinery in high-load conditions.
                  </p>
                </div>
              </div>
            </div>

            <div class="bg-orange-50 p-5 rounded-lg border border-orange-200">
              <h3 class="text-xl font-bold text-orange-800 mb-3">B. Connecting Rods: Linking Pistons to Crankshaft ⚙️</h3>
              <p class="text-gray-700 mb-3 font-medium">
                <strong>Overview:</strong> Connecting rods link pistons to the crankshaft, transferring linear motion into rotational motion to drive the engine.
              </p>
              
              <div class="space-y-4">
                <div class="bg-white p-4 rounded border border-orange-100">
                  <h4 class="font-bold text-orange-700 mb-2">Motion Transfer:</h4>
                  <p class="text-gray-700 text-sm leading-relaxed">
                    Converts piston motion into crankshaft rotation.
                  </p>
                  <p class="text-gray-700 text-sm leading-relaxed mt-2">
                    Connecting rods transfer motion, delivering 500–1,000 lb-ft torque and avoiding $2,000 in crankshaft damage. Worn rods reduce efficiency by 5%. Replacing OEM rods (e.g., Cummins) every 200,000 miles ensures performance. Telematics monitor rod health, supporting 2025 EPA compliance. This is critical for diesel trucks and machinery in high-pressure systems.
                  </p>
                </div>

                <div class="bg-white p-4 rounded border border-orange-100">
                  <h4 class="font-bold text-orange-700 mb-2">Mechanical Linkage:</h4>
                  <p class="text-gray-700 text-sm leading-relaxed">
                    Ensures precise piston-crankshaft alignment.
                  </p>
                  <p class="text-gray-700 text-sm leading-relaxed mt-2">
                    Precise alignment prevents valve-piston collisions, saving $3,000 in repairs. Misalignment causes power loss. Inspections every 50,000 miles ensure function. Telematics track alignment, supporting 2025 EPA compliance. This maintains performance in diesel trucks, buses, and heavy equipment in regulated markets.
                  </p>
                </div>

                <div class="bg-white p-4 rounded border border-orange-100">
                  <h4 class="font-bold text-orange-700 mb-2">Durability:</h4>
                  <p class="text-gray-700 text-sm leading-relaxed">
                    Withstands high combustion forces for reliable operation.
                  </p>
                  <p class="text-gray-700 text-sm leading-relaxed mt-2">
                    Connecting rods withstand 500,000-mile loads, preventing $1,500 in failures. Wear causes vibration. Maintenance every 50,000 miles with OEM parts ensures durability. Telematics monitor rod condition, ensuring 2025 EPA compliance. This is vital for diesel fleets in trucks and machinery in high-mileage applications.
                  </p>
                </div>
              </div>
            </div>

            <div class="bg-emerald-50 p-5 rounded-lg border border-emerald-200">
              <h3 class="text-xl font-bold text-emerald-800 mb-3">C. Materials: Aluminum Pistons and Forged Steel Rods 🛠️</h3>
              <p class="text-gray-700 mb-3 font-medium">
                <strong>Overview:</strong> Pistons are made of aluminum alloys for lightweight strength, while connecting rods use forged steel for durability under high loads.
              </p>
              
              <div class="space-y-4">
                <div class="bg-white p-4 rounded border border-emerald-100">
                  <h4 class="font-bold text-emerald-700 mb-2">Aluminum Alloy Pistons:</h4>
                  <p class="text-gray-700 text-sm leading-relaxed">
                    Lightweight for efficiency and heat resistance.
                  </p>
                  <p class="text-gray-700 text-sm leading-relaxed mt-2">
                    Aluminum pistons reduce weight by 20%, improving fuel efficiency by 1–2 MPG and saving $1,000 annually for 100,000 miles. Wear causes $2,000 in repairs. Replacing OEM pistons (e.g., Mahle) every 200,000 miles ensures durability. Telematics monitor piston health, supporting 2025 EPA compliance. This is critical for diesel trucks and machinery in high-performance conditions.
                  </p>
                </div>

                <div class="bg-white p-4 rounded border border-emerald-100">
                  <h4 class="font-bold text-emerald-700 mb-2">Forged Steel Rods:</h4>
                  <p class="text-gray-700 text-sm leading-relaxed">
                    Provide strength for high combustion forces.
                  </p>
                  <p class="text-gray-700 text-sm leading-relaxed mt-2">
                    Forged steel rods withstand 15,000–30,000 psi, preventing $1,500 in failures. Cracks reduce reliability. Inspections every 50,000 miles with OEM rods ensure strength. Telematics track material health, supporting 2025 EPA compliance. This maintains performance in diesel trucks, buses, and heavy equipment in high-pressure systems.
                  </p>
                </div>

                <div class="bg-white p-4 rounded border border-emerald-100">
                  <h4 class="font-bold text-emerald-700 mb-2">Material Maintenance:</h4>
                  <p class="text-gray-700 text-sm leading-relaxed">
                    Ensures long-term durability and performance.
                  </p>
                  <p class="text-gray-700 text-sm leading-relaxed mt-2">
                    Regular maintenance every 50,000 miles prevents $2,000 in damage from material wear. Neglect causes efficiency loss. OEM parts ensure 500,000-mile longevity. Telematics monitor material condition, ensuring 2025 EPA compliance. This is vital for diesel fleets in trucks and machinery in regulated markets.
                  </p>
                </div>
              </div>
            </div>

            <div class="bg-cyan-50 p-5 rounded-lg border border-cyan-200">
              <h3 class="text-xl font-bold text-cyan-800 mb-3">D. Lubrication: Reducing Friction Between Moving Parts 🛢️</h3>
              <p class="text-gray-700 mb-3 font-medium">
                <strong>Overview:</strong> Oil lubrication reduces friction between pistons, connecting rods, and other components, ensuring smooth operation and longevity.
              </p>
              
              <div class="space-y-4">
                <div class="bg-white p-4 rounded border border-cyan-100">
                  <h4 class="font-bold text-cyan-700 mb-2">Friction Reduction:</h4>
                  <p class="text-gray-700 text-sm leading-relaxed">
                    Minimizes wear on pistons and rods.
                  </p>
                  <p class="text-gray-700 text-sm leading-relaxed mt-2">
                    Lubrication with 15W-40 oil reduces friction by 15%, preventing $2,000 in piston or rod damage. Low oil increases wear by 10%. Oil changes every 10,000 miles ensure performance. Telematics monitor oil health, supporting 2025 EPA compliance. This is critical for diesel trucks and machinery in high-load applications.
                  </p>
                </div>

                <div class="bg-white p-4 rounded border border-cyan-100">
                  <h4 class="font-bold text-cyan-700 mb-2">Component Longevity:</h4>
                  <p class="text-gray-700 text-sm leading-relaxed">
                    Extends lifespan of moving parts to 500,000 miles.
                  </p>
                  <p class="text-gray-700 text-sm leading-relaxed mt-2">
                    Proper lubrication extends piston and rod life, saving $1,500 in repairs. Poor lubrication causes seizures. Checking oil levels every 10,000 miles ensures durability. Telematics track lubrication, supporting 2025 EPA compliance. This maintains performance in diesel trucks, buses, and heavy equipment in regulated markets.
                  </p>
                </div>

                <div class="bg-white p-4 rounded border border-cyan-100">
                  <h4 class="font-bold text-cyan-700 mb-2">Heat Dissipation:</h4>
                  <p class="text-gray-700 text-sm leading-relaxed">
                    Oil aids in cooling to prevent overheating.
                  </p>
                  <p class="text-gray-700 text-sm leading-relaxed mt-2">
                    Lubrication dissipates heat, reducing piston temperatures by 10°F and avoiding $1,000 in repairs. Neglect causes thermal stress. Oil maintenance every 10,000 miles ensures cooling. Telematics monitor oil temperature, ensuring 2025 EPA compliance. This is vital for diesel fleets in trucks and machinery in high-mileage conditions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p class="text-gray-700 text-sm leading-relaxed">
              Pistons and connecting rods play a pivotal role in transforming the explosive energy of diesel combustion into usable mechanical motion. Pistons, typically made from lightweight yet heat-resistant aluminum alloys, move rapidly within the cylinders, driven by the intense pressure of fuel ignition. Connecting rods, forged from high-strength steel, link each piston to the crankshaft, converting the pistons' linear up-and-down motion into rotational force that drives the engine's output. Operating under immense stress, pistons can endure pressures exceeding 200 bar, requiring robust design and precise tolerances. Engine oil provides essential lubrication, reducing friction and wear at pivot points. Mechanics must regularly check for piston ring wear, rod bearing deterioration, or cylinder scoring to prevent power loss or catastrophic engine damage, making expertise in these components crucial for maintaining performance and extending engine lifespan in diesel applications.
            </p>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 class="text-2xl font-bold text-red-600 mb-4">🔄 Crankshaft</h2>
          <p class="text-gray-700 mb-4 font-medium">
            Converts piston motion into rotational power.
          </p>

          <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 class="font-bold text-blue-800 mb-2">Function: Transforming Motion ⚙️</h3>
                <ul class="space-y-2 text-sm text-gray-700">
                  <li><strong>Linear to Rotational:</strong> Converts piston strokes into rotational torque</li>
                  <li><strong>Power Transfer:</strong> Delivers energy to the transmission</li>
                  <li><strong>Combustion Support:</strong> Aligns piston motion for optimal cycles</li>
                </ul>
              </div>
            </div>
            
            <div class="space-y-4">
              <div class="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <h3 class="font-bold text-orange-800 mb-2">Design and Construction 🛠️</h3>
                <ul class="space-y-2 text-sm text-gray-700">
                  <li><strong>Forged Steel:</strong> Provides durability for high-torque applications</li>
                  <li><strong>Counterweights:</strong> Minimize vibrations for smooth operation</li>
                  <li><strong>Precision Engineering:</strong> Ensures seamless component integration</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p class="text-gray-700 text-sm leading-relaxed">
              The crankshaft serves as the diesel engine's primary power delivery mechanism, converting the linear motion of pistons into rotational torque that drives the vehicle's transmission. Constructed from high-strength forged steel and equipped with counterweights to minimize vibrations, the crankshaft ensures smooth operation under heavy loads. Main and rod bearings, lubricated by engine oil, support the shaft and reduce friction, allowing it to spin at speeds often exceeding 2,000 RPM in diesel engines. The crankshaft's rotational output is transmitted to the drivetrain, ultimately powering the vehicle's wheels. Issues such as misalignment, bearing wear, or imbalances can lead to excessive vibrations or even engine failure, necessitating precise inspection and measurement of tolerances. A deep understanding of the crankshaft's function is vital for mechanics to diagnose power delivery problems and maintain efficient engine performance across various applications.
            </p>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 class="text-2xl font-bold text-red-600 mb-4">🕒 Camshaft</h2>
          <p class="text-gray-700 mb-4 font-medium">
            Regulates valve timing for optimal combustion.
          </p>

          <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <div class="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 class="font-bold text-green-800 mb-2">Role: Precise Valve Operation ⏱️</h3>
                <ul class="space-y-2 text-sm text-gray-700">
                  <li><strong>Valve Actuation:</strong> Controls timing for optimal air/fuel mixing</li>
                  <li><strong>Air and Exhaust Flow:</strong> Ensures proper intake and exhaust</li>
                  <li><strong>Combustion Efficiency:</strong> Maximizes power through precise control</li>
                </ul>
              </div>
            </div>
            
            <div class="space-y-4">
              <div class="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h3 class="font-bold text-purple-800 mb-2">Design and Timing 🛠️</h3>
                <ul class="space-y-2 text-sm text-gray-700">
                  <li><strong>Steel/Cast Iron:</strong> Ensures durability under high stress</li>
                  <li><strong>Lobe Design:</strong> Actuates valves with precise lift and timing</li>
                  <li><strong>Synchronized Operation:</strong> Times with crankshaft for precision</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p class="text-gray-700 text-sm leading-relaxed">
              The camshaft is a critical component that orchestrates the diesel engine's valve timing, ensuring precise control over air and exhaust flow during the combustion process. Made from durable steel or cast iron, the camshaft features precisely shaped lobes that press against lifters or followers to open and close intake and exhaust valves in coordination with the engine's 4-stroke cycle. Driven by timing gears or a belt connected to the crankshaft, the camshaft rotates at half the crankshaft's speed to align valve events with piston movements. Accurate timing is essential for maximizing fuel efficiency, power output, and emission control. Misalignment, worn lobes, or timing belt failures can result in reduced performance or severe engine damage. Mechanics must be adept at inspecting camshaft condition and verifying timing to maintain optimal engine efficiency, making this component a cornerstone of diesel engine maintenance and repair.
            </p>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 class="text-2xl font-bold text-red-600 mb-4">⛽ Fuel System Components</h2>
          <p class="text-gray-700 mb-4 font-medium">
            Deliver precise fuel amounts for combustion.
          </p>

          <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <div class="bg-red-50 p-4 rounded-lg border border-red-200">
                <h3 class="font-bold text-red-800 mb-2">High-Pressure Systems ⛽</h3>
                <ul class="space-y-2 text-sm text-gray-700">
                  <li><strong>Fuel Pump:</strong> Pressurizes fuel at 15,000–30,000 psi</li>
                  <li><strong>Injectors:</strong> Atomize fuel for precise delivery</li>
                  <li><strong>Common Rail:</strong> Maintains consistent pressure</li>
                </ul>
              </div>
            </div>
            
            <div class="space-y-4">
              <div class="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                <h3 class="font-bold text-indigo-800 mb-2">Electronic Control 📡</h3>
                <ul class="space-y-2 text-sm text-gray-700">
                  <li><strong>Timing Control:</strong> Optimizes fuel delivery for maximum power</li>
                  <li><strong>Emission Regulation:</strong> Reduces NOx and PM for compliance</li>
                  <li><strong>Efficiency Optimization:</strong> Balances fuel use and power output</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p class="text-gray-700 text-sm leading-relaxed">
              The fuel system is the heart of a diesel engine's operation, delivering fuel with exceptional precision to achieve efficient and clean combustion. The high-pressure fuel pump generates pressures as high as 2,000 bar, supplying fuel to the common rail—a high-pressure reservoir found in modern diesel engines. Electronically controlled fuel injectors then spray finely atomized fuel into the cylinders at precise moments, ensuring complete combustion and minimal waste. This sophisticated system enhances fuel economy, reduces emissions, and meets stringent environmental regulations like EPA standards. Failures such as clogged injectors, pump malfunctions, or pressure leaks can lead to misfires, reduced power, or increased emissions. Mechanics must develop expertise in diagnosing and servicing fuel system components, including cleaning or replacing injectors and calibrating electronic controls, to ensure optimal engine performance and regulatory compliance in diesel-powered vehicles and equipment.
            </p>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 class="text-2xl font-bold text-red-600 mb-4">🌬️ Turbocharger (If Equipped)</h2>
          <p class="text-gray-700 mb-4 font-medium">
            Boosts power by increasing air intake.
          </p>

          <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <div class="bg-teal-50 p-4 rounded-lg border border-teal-200">
                <h3 class="font-bold text-teal-800 mb-2">Function and Benefits 🔥</h3>
                <ul class="space-y-2 text-sm text-gray-700">
                  <li><strong>Air Compression:</strong> Increases cylinder air volume by 20-30%</li>
                  <li><strong>Power Boost:</strong> Adds 100-200 hp without engine size increase</li>
                  <li><strong>Fuel Efficiency:</strong> Improves MPG through optimized combustion</li>
                </ul>
              </div>
            </div>
            
            <div class="space-y-4">
              <div class="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <h3 class="font-bold text-amber-800 mb-2">Components and Maintenance ⚙️</h3>
                <ul class="space-y-2 text-sm text-gray-700">
                  <li><strong>Turbine & Compressor:</strong> Driven by exhaust gas energy</li>
                  <li><strong>Oil Lubrication:</strong> Essential for bearing protection</li>
                  <li><strong>Regular Inspections:</strong> Check for wear and damage</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p class="text-gray-700 text-sm leading-relaxed">
              The turbocharger significantly enhances diesel engine performance by increasing the volume of air available for combustion, resulting in greater power output. Powered by exhaust gases, the turbocharger's turbine spins at high speeds to drive a compressor, which forces additional air into the cylinders at elevated pressures. This process allows more fuel to be burned, boosting power by up to 40% without increasing engine size, making turbochargers ideal for heavy-duty trucks and performance vehicles. Regular maintenance, including oil lubrication to prevent bearing wear and inspections for leaks or impeller damage, is critical to ensure longevity. Issues like turbo lag or insufficient boost pressure can compromise performance, requiring mechanics to diagnose and address problems effectively. A thorough understanding of turbocharger operation is essential for optimizing power delivery and maintaining efficiency in modern diesel engines across various applications.
            </p>
          </div>
        </div>
      </div>
    `
  }
};

export default lesson3EngineComponents;