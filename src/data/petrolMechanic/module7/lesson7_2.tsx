import type { Lesson } from '@/types/course';

export const lesson7_2: Lesson = {
  id: 2,
  title: 'Diagnosing and Prioritizing Repairs',
  duration: '60 min',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/3Fs7goQcYWk',
    textContent: `
## Initial Diagnostic Steps

https://youtu.be/3Fs7goQcYWk?si=CFnnCQ2geGtgroON

          Effective engine diagnostics start with a systematic approach to identify issues like 
          misfiring, stalling, or smoke. First, use an OBD2 scanner, plugged into the vehicle's port 
          (typically under the dashboard), to read diagnostic trouble codes (DTCs) such as P0300 
          (random misfire), P0171 (lean mixture), or P0172 (rich mixture).

          Visual inspections check for loose ignition wires, cracked vacuum hoses, oil or coolant 
          leaks, and spark plug conditions (e.g., black soot for rich mixtures, oil fouling for 
          burning oil). Listening with a mechanic's stethoscope or long screwdriver isolates noises 
          like knocking or tapping, pinpointing sources like lifters or bearings.

          In South Africa, dusty conditions can clog air filters, triggering MAF-related codes after 
          15,000 kilometres, while coastal moisture corrodes wiring, causing sensor faults. Learners 
          will practice these steps in virtual scenarios, documenting findings and correlating codes 
          with symptoms.

          Early diagnostics prevent escalation, such as catalytic converter failure (R10,000–R15,000) 
          or engine damage from ignored leaks (R30,000+). Mechanics mastering initial diagnostics 
          streamline repairs, reducing downtime and costs for clients driving common vehicles like 
          Toyota Corollas.

## Compression Testing

https://youtu.be/zCR6wahr9FU?si=N7RxoRd4JFJ_nkmM

          Compression testing evaluates cylinder health by measuring pressure (170–210 kPa for most 
          petrol engines) during cranking, diagnosing issues like worn piston rings, damaged valves, 
          or blown head gaskets. The process involves warming the engine, disabling fuel (remove pump 
          fuse) and ignition (disconnect coils), removing all spark plugs, and threading a compression 
          gauge into each cylinder's spark plug hole.

          Crank the engine 4–6 times per cylinder, recording readings. Healthy cylinders show 
          consistent pressures within 10–15% of each other; low readings (below 120 kPa) or high 
          variance suggest ring wear or valve issues. A "wet test" (adding oil to the cylinder) 
          confirms ring wear if pressure rises.

          In South Africa, high-mileage vehicles (100,000+ km) often suffer ring or valve wear due to 
          heat and poor oil maintenance, common in older models like Nissan Sentras. Learners will 
          simulate tests in virtual scenarios, comparing readings and performing wet tests to 
          differentiate causes.

          Ignoring low compression risks misfires, oil burning, or engine failure, costing 
          R15,000–R40,000. Mechanics mastering compression testing confirm internal engine health, 
          preventing catastrophic failures and ensuring accurate repairs.

## Fuel Pressure Testing

https://youtu.be/_oXLUqE4Sf0?si=tdtdfUXA9VSZhN8O

          Fuel pressure testing verifies the fuel system's ability to deliver consistent pressure 
          (3–4 bar for most petrol engines) to injectors, diagnosing issues like hard starting, 
          misfiring, or stalling. Using a fuel pressure gauge, connect to the fuel rail's Schrader 
          valve after relieving system pressure (remove fuel pump fuse and crank until the engine 
          stalls).

          Check pressure with the ignition on (pump priming), engine idling, and under light revving. 
          Low pressure (below 2.5 bar) indicates a weak pump (R3,000–R5,000 to replace), clogged 
          filter, or leaking line, while high pressure (above 4.5 bar) suggests a faulty regulator. 
          A rapid drop after shutdown points to leaking injectors or a failed check valve.

          In South Africa, poor fuel quality can clog filters after 20,000 kilometres, reducing 
          pressure and causing performance issues. Learners will simulate tests in virtual scenarios, 
          interpreting readings and checking for leaks.

          Neglecting low pressure risks engine starvation, leading to breakdowns or injector damage 
          (R2,000 each). Mechanics mastering this skill ensure reliable fuel delivery, critical for 
          vehicles like Ford Fiestas in stop-and-go traffic.

## Vacuum Testing

https://youtu.be/xxoCaNac2uE?si=5AkzY6eFgS5asdE9

          Vacuum testing measures intake manifold pressure (60–75 kPa at idle) to diagnose engine 
          health, identifying issues like vacuum leaks, burned valves, or exhaust restrictions. 
          Connect a vacuum gauge to a manifold port (not ported vacuum), warm the engine, and observe 
          readings at idle and under light acceleration.

          Steady readings below 57 kPa suggest worn rings or timing issues, rapid fluctuations 
          (3–5 kPa) indicate sticking valves, and drops under load point to clogged catalytic 
          converters. In South Africa, dust accumulation can block converters after 80,000 kilometres, 
          reducing vacuum and causing power loss.

          Learners will simulate tests in virtual scenarios, using smoke machines to locate leaks or 
          correlating readings with OBD2 codes like P0171. Ignoring vacuum issues risks misfires, 
          overheating, or converter damage (R10,000+).

          Mechanics mastering vacuum testing pinpoint faults accurately, ensuring efficient repairs 
          for vehicles like VW Polos. The AI voice tutor can explain gauge interpretation, leak 
          detection, or local dust impacts, enhancing diagnostics.

## Planning the Repair Strategy

          Prioritizing repairs involves analyzing diagnostic findings (OBD2 codes, visual inspections, 
          compression, vacuum, and fuel pressure tests) to address critical issues first, ensuring 
          safety and preventing further damage.

          Immediate repairs include fuel leaks (fire risk, R50,000+ in damages), misfires (catalytic 
          converter damage, R10,000+), and coolant leaks (engine seizure, R30,000–R50,000). 
          High-priority issues (within days) include faulty sensors (e.g., MAF, R2,000) or worn spark 
          plugs (R500).

          Medium-priority repairs (within weeks) address minor vacuum leaks or air filter clogs, while 
          low-priority tasks (e.g., cosmetic fixes) can wait for routine maintenance. In South Africa, 
          part availability can delay repairs, requiring mechanics to source OEM or quality aftermarket 
          parts early.

          Learners will practice prioritization in virtual scenarios, estimating costs (e.g., R20,000 
          for a head gasket vs. R500 for a filter) and creating timelines. Neglecting critical repairs 
          risks accidents or breakdowns, especially on long South African highways.

          Mechanics mastering this skill optimize repair efficiency, balancing safety and budgets for 
          clients with vehicles like Hyundai i20s. The AI voice tutor can guide learners through cost 
          estimation, part sourcing, or prioritization strategies, tailored to local supply challenges.

## Key Takeaways

          Identifying symptoms like misfiring, smoke, or noises, and using diagnostic tools (OBD2, 
          compression, vacuum, fuel pressure tests) ensures accurate engine issue detection. 
          Prioritizing repairs based on severity prevents damage, ensuring safety, reliability, and 
          cost efficiency.
    `
  }
};
