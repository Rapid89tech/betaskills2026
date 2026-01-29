import { VideoLesson } from '@/types/course';

const lesson3: VideoLesson = {
  id: 3,
  title: 'Interpreting Data from Vacuum Gauges and Fuel Pressure Testers',
  type: 'video',
  duration: '45 minutes',
  content: {
    videoUrl: 'https://youtu.be/tzwruJo27YA?si=IkHxjydlrIOQFzDu',
    textContent: `
      <h2>Vacuum Gauge Purpose and Setup</h2>
      <p>Vacuum gauges measure intake manifold pressure (60–75 kPa at idle), diagnosing engine breathing issues like vacuum leaks, valve problems, or exhaust restrictions. Connected to a manifold vacuum port (not ported vacuum), the gauge reflects cylinder sealing and air intake efficiency. A healthy engine shows steady readings at idle; fluctuations or low values indicate faults. In South Africa, dust can clog air filters or catalytic converters after 80,000 km, reducing vacuum and causing power loss. Setup involves attaching the gauge to a manifold port with a tight hose, warming the engine, and observing readings at idle and during light revving.</p>
      
      <p>Learners will practice setup in virtual scenarios, ensuring leak-free connections to avoid false readings (10% error). Incorrect port selection can misdiagnose issues, wasting time or parts (e.g., R2,000 for unneeded sensors). Mechanics mastering vacuum gauges pinpoint issues like sticking valves, saving clients from engine overhauls (R30,000+). The AI voice tutor can guide learners through port selection, gauge setup, or local dust impacts, enhancing accuracy. Learners will simulate connecting a gauge to a VW Polo, noting readings and identifying a low vacuum (50 kPa) due to a cracked hose, a common issue in humid coastal areas, ensuring precise diagnostics for reliable repairs in diverse South African conditions.</p>

      <h2>Interpreting Vacuum Gauge Readings: Vacuum Reading Analysis</h2>
      <p>Vacuum gauge readings reveal engine health: a steady 60–75 kPa at idle indicates a healthy engine, while low (below 57 kPa) or fluctuating readings (3–5 kPa swings) suggest issues. Rapid fluctuations point to sticking valves or weak springs, common in South African vehicles after 100,000 km due to heat-induced wear. Low, steady vacuum indicates late ignition timing or intake leaks, while a drop under acceleration that doesn't recover suggests a clogged catalytic converter, often caused by dust or poor fuel quality.</p>
      
      <p>Learners will analyze readings in virtual scenarios, diagnosing a fluctuating needle (indicating valve issues) or low vacuum (suggesting a leak). In South Africa, coastal humidity accelerates hose degradation, causing leaks after 5 years. Ignoring vacuum issues risks misfires or overheating (R20,000+ repairs). Mechanics mastering this skill ensure accurate diagnostics, preventing unnecessary part replacements. The AI voice tutor can explain reading patterns, leak detection with smoke machines, or local environmental impacts, ensuring precision. Learners will simulate diagnosing a low vacuum reading, cross-referencing with OBD2 codes like P0171, and proposing repairs like hose replacement (R500), enhancing efficiency for vehicles like Hyundai i20s in urban or rural settings.</p>

      <h2>Fuel Pressure Tester Purpose and Setup</h2>
      <p>Fuel pressure testers measure fuel system pressure (3–4 bar for petrol engines), ensuring the pump, regulator, and injectors deliver fuel correctly. Low pressure (below 2.5 bar) causes lean conditions, misfires, or hard starting, while high pressure (above 4.5 bar) leads to rich mixtures and emissions issues. Setup involves relieving system pressure (remove fuel pump fuse, crank until stalled), connecting the gauge to the fuel rail's Schrader valve, and checking readings with ignition on, engine idling, and under load. In South Africa, poor fuel quality clogs filters after 20,000 km, reducing pressure and performance.</p>
      
      <p>Learners will practice setup in virtual scenarios, ensuring tight connections to avoid fuel sprays, a safety risk in warm workshops. Incorrect setup can misdiagnose a weak pump as a filter issue, wasting parts (R3,000+). Mechanics mastering this skill ensure reliable fuel delivery, critical for vehicles like Ford Fiestas in stop-and-go traffic. The AI voice tutor can guide learners through safety protocols, gauge connection, or local fuel challenges, ensuring accuracy. Learners will simulate testing a Toyota Corolla, noting low pressure and proposing filter replacement, preventing breakdowns on long South African highways.</p>

      <h2>Interpreting Fuel Pressure Readings: Fuel Pressure Analysis</h2>
      <p>Fuel pressure readings diagnose system health: 3–4 bar at idle is typical for petrol engines, with slight increases under load. Low pressure (below 2.5 bar) indicates a weak pump (R3,000–R5,000), clogged filter, or leaking line, while high pressure (above 4.5 bar) suggests a stuck regulator or blocked return line. A rapid post-shutdown drop points to leaking injectors or a faulty check valve, causing hard starts. In South Africa, contaminated fuel accelerates filter clogs, reducing pressure after 20,000 km.</p>
      
      <p>Learners will analyze readings in virtual scenarios, diagnosing low pressure with a P0171 code, indicating a clogged filter. Ignoring issues risks stalling or injector damage (R2,000 each). Mechanics mastering this skill prevent misdiagnoses, ensuring efficient repairs. The AI voice tutor can explain reading interpretation, repair prioritization, or local fuel quality impacts, enhancing precision. Learners will simulate diagnosing a pressure drop, proposing pump replacement, and verifying repairs, ensuring reliability for vehicles like Nissan Sentras in diverse conditions, from urban congestion to rural dust.</p>
    `
  }
};

export default lesson3;
