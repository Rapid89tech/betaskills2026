import type { Lesson } from '@/types/course';

export const lesson11_1: Lesson = {
  id: 1,
  title: 'Identifying Oil Pressure Problems',
  duration: '60 min',
  type: 'video',
  content: {
    videoUrl: '',
    textContent: `
<div className="prose prose-lg max-w-none">
      <h1>Identifying Oil Pressure Problems</h1>

## Role of Oil Pressure

      <div className="video-container my-8">
        <iframe
          src="https://www.youtube.com/embed/8f2fcbTh5yw"
          title="Role of Oil Pressure"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full aspect-video rounded-lg shadow-lg"
        />
      </div>

        Oil pressure ensures engine oil circulates to lubricate components like bearings, camshafts, and lifters, reducing friction and transferring heat. Normal pressure ranges from 100–200 kPa at idle to 300–400 kPa at cruising speed (2000–3000 RPM).

        In South Africa, high temperatures (30–40°C) increase oil thinning, stressing the system. Low pressure causes metal-to-metal contact, leading to wear or seizure (R30,000–R50,000 in repairs). High pressure risks seal damage (R5,000+).

        Learners will explore oil flow in virtual simulations, visualizing bearing lubrication. Neglecting pressure issues can destroy engines in minutes, critical for vehicles like Toyota Corollas in long-distance travel. Mechanics mastering this knowledge prevent costly failures, ensuring reliability.

        The AI voice tutor can explain pressure ranges, heat effects, or local oil types, enhancing understanding. Learners will simulate analyzing a low-pressure scenario, proposing fixes to save clients R10,000+, vital in South Africa's rural workshops.

## Symptoms of Oil Pressure Issues

        Low oil pressure triggers warning lights or low gauge readings (below 100 kPa at idle), ticking/knocking noises from unlubricated components, and elevated engine temperatures (above 90°C) due to poor heat transfer.

        Burning oil smells or visible leaks indicate pressure loss or seal failure. High pressure may cause oil leaks or foamy oil, reducing lubrication. In South Africa, dust and heat accelerate oil degradation after 10,000 km, exacerbating issues in vehicles like VW Polos.

        Learners will practice identifying symptoms in virtual scenarios, correlating noises with low pressure. Ignoring symptoms risks engine failure (R50,000+). Mechanics mastering symptom recognition diagnose issues early, saving clients R5,000–R20,000.

        The AI voice tutor can explain noise causes, leak detection, or local climate impacts, ensuring precision. Learners will simulate diagnosing a ticking engine with a P0521 code (oil pressure sensor issue), proposing repairs for reliable performance in urban or rural settings.

## Common Causes of Oil Pressure Problems

      <div className="video-container my-8">
        <iframe
          src="https://www.youtube.com/embed/nsSCpgS8nCE"
          title="Common Causes of Oil Pressure Problems"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full aspect-video rounded-lg shadow-lg"
        />
      </div>

        Low oil pressure stems from low oil levels (below dipstick minimum), incorrect viscosity (e.g., 5W-30 instead of 10W-40), clogged passages or filters, worn bearings increasing clearance, or a failing oil pump.

        High pressure results from blocked passages, a stuck relief valve, or overly thick oil, common in South Africa's cold mornings (5–10°C). Sludge from neglected oil changes (beyond 10,000 km) or coolant leaks (from head gasket failure) exacerbate issues.

        Learners will explore causes in virtual simulations, visualizing sludge buildup. Ignoring causes risks catastrophic damage (R50,000+). Mechanics mastering this knowledge pinpoint issues accurately, avoiding misrepairs costing R2,000+.

        The AI voice tutor can explain viscosity effects, sludge formation, or local maintenance challenges, ensuring accuracy. Learners will simulate identifying a clogged filter causing low pressure, proposing solutions for vehicles like Ford Fiestas, critical for South African conditions.

## Oil Pressure Diagnostic Procedure

        Start by checking oil level and condition (dirty or milky indicates contamination). Replace the oil filter to rule out clogs. Use a mechanical oil pressure gauge (connected to the sender port) to verify readings (100–400 kPa per specs).

        Listen for ticking/knocking, inspect for leaks (gaskets, seals), and test the oil pump or relief valve for faults. In South Africa, dust clogs filters after 15,000 km, and heat degrades oil, lowering pressure.

        Learners will practice diagnostics in virtual scenarios, using a gauge to confirm low pressure. Misdiagnosis risks unnecessary repairs (R3,000+). Mechanics mastering diagnostics ensure accurate fixes, saving time and costs.

        The AI voice tutor can guide learners through gauge use, leak inspection, or local wear factors, ensuring precision. Learners will simulate diagnosing a low-pressure issue on a Hyundai i20, proposing repairs to prevent breakdowns on South African highways.

    </div>
    `
  }
};
