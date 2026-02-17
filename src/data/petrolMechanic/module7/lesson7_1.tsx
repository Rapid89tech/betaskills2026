import type { Lesson } from '@/types/course';

export const lesson7_1: Lesson = {
  id: 1,
  title: 'Recognizing Common Symptoms',
  duration: '75 min',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/5uStenDABHE',
    textContent: `
## Engine Misfiring

https://youtu.be/5uStenDABHE?si=54znvRyvU960BaIF

          Engine misfiring occurs when one or more cylinders fail to combust fuel properly, disrupting 
          the power stroke and causing noticeable shaking, jerking, or power loss, particularly at idle 
          or low speeds (below 1,500 RPM). Symptoms include a "coughing" or popping sound from the 
          exhaust, vibrations felt in the cabin, or a check engine light with codes like P0301 (cylinder 
          1 misfire) or P0300 (random misfire).

          Common causes include clogged fuel injectors (restricting fuel flow), weak fuel pressure 
          (below 3 bar due to a failing pump or clogged filter), faulty spark plugs or ignition coils, 
          or water-contaminated fuel, a frequent issue in South Africa due to inconsistent fuel quality 
          at rural stations.

          Misfires can overheat catalytic converters, leading to failures costing R10,000–R15,000 to 
          replace. In South Africa's hot climate, heat accelerates injector clogging after 20,000–30,000 
          kilometres, exacerbating misfires.

          Learners will use virtual simulations to diagnose misfires, practicing OBD2 scanner use to 
          read codes and inspecting components like spark plugs (checking for fouling) or injectors 
          (testing spray patterns). Early detection prevents severe damage, such as piston scoring or 
          converter clogging.

## Fuel Economy Issues

https://youtu.be/23MngtdOWMA?si=gSLZYBU5pZlCA19A

          Poor fuel economy is evident when a vehicle's efficiency drops significantly, such as from 
          12 km/L to 10 km/L, requiring more frequent refuelling without changes in driving habits. 
          Symptoms include dark exhaust smoke (indicating unburned fuel), a noticeable fuel smell 
          (suggesting leaks or over-fueling), or a check engine light with codes like P0172 (rich 
          mixture) or P0171 (lean mixture).

          Causes include leaking fuel injectors, a clogged air filter restricting airflow, a faulty 
          oxygen sensor (O2) causing improper fuel trim, or a malfunctioning mass airflow sensor (MAF) 
          disrupting the air-fuel ratio. In South Africa, low-quality fuel from unregulated stations 
          can clog injectors after 20,000 kilometres, reducing efficiency by up to 15%.

          Learners will practice diagnostics in virtual scenarios, using OBD2 scanners to identify 
          codes and inspecting air filters for dirt accumulation, common in dusty regions like Gauteng. 
          Addressing these issues restores mileage, saving clients R2,000–R3,000 annually on fuel for 
          a typical sedan.

          Neglecting poor economy risks carbon buildup, damaging catalytic converters (R10,000+) or 
          increasing emissions, which can lead to fines under South African regulations (R5,000+).

## Idling and Stalling Issues

https://youtu.be/mQ0u-3qPFDQ?si=ZdiMrGmHQMNUpvDS

          Rough idling manifests as a jittery or uneven engine operation at rest, with RPM fluctuating 
          between 600–1,000, often accompanied by sputtering noises or vibrations. Stalling occurs 
          unexpectedly at stoplights, during deceleration, or at low RPMs, requiring hard restarts.

          Causes include dirty fuel injectors causing uneven fuel delivery, vacuum leaks in intake 
          hoses (common in South Africa's humid coastal areas), a failing idle air control valve (IAC), 
          or a faulty throttle body. OBD2 codes like P0101 (MAF sensor) or P0507 (high idle) may appear.

          In South Africa, moisture from coastal regions like Durban can corrode sensors, exacerbating 
          issues after 30,000 kilometres. Learners will simulate diagnostics in virtual scenarios, 
          inspecting vacuum hoses for cracks and cleaning throttle bodies with carb cleaner.

          Neglecting these issues risks fuel pump strain (R3,000–R5,000 to replace) or sudden 
          breakdowns, stranding clients in remote areas. Mechanics mastering this skill ensure reliable 
          idling and starting, critical for client satisfaction in daily-driven vehicles like Hyundai i20s.

## Unusual Noises (Knocking, Tapping)

https://youtu.be/ZrWfYh_9TZo?si=JTwE9ihxX4gjLYZF

          Unusual engine noises provide critical clues to internal issues. Knocking or pinging, a 
          metallic sound during acceleration or under load (e.g., climbing hills), often results from 
          low-octane fuel (below 95, common in South Africa), incorrect ignition timing, or carbon 
          buildup in combustion chambers, risking piston damage (R20,000–R30,000).

          Tapping or clicking at idle may indicate worn valve lifters, low oil pressure (below 2 bar), 
          or faulty fuel injectors, producing excessive noise. Deep thumping suggests failing main or 
          connecting rod bearings, visible as metal shavings in oil during a drain.

          In South Africa's hot climate, oil degradation accelerates after 10,000 kilometres, worsening 
          lifter or bearing wear. Learners will use virtual stethoscopes to isolate noises in 
          simulations, correlating sounds to causes like timing issues (checked with a timing light) or 
          oil starvation (verified with a pressure gauge).

          Ignoring noises risks catastrophic failures, such as engine seizures costing R50,000+. 
          Mechanics mastering noise diagnostics prevent major repairs, ensuring engine longevity.

## Exhaust Smoke Analysis

https://youtu.be/4CT6j399QGw?si=oOoP6TjbcFXe2B50

          Exhaust smoke color is a key diagnostic indicator. Blue smoke signals oil burning in the 
          combustion chamber, caused by worn piston rings, valve seals, or a faulty PCV system, leading 
          to oil consumption and potential engine damage (R15,000–R25,000 for repairs).

          Black smoke indicates a rich fuel mixture (too much fuel, not enough air), often due to 
          clogged injectors, a faulty MAF sensor, or a failing fuel pressure regulator, triggering 
          codes like P0172.

          White smoke suggests coolant entering the cylinders, typically from a blown head gasket or 
          cracked cylinder head, costing R20,000–R40,000 to repair. In South Africa, coastal humidity 
          accelerates seal and gasket wear, increasing oil or coolant leaks after 80,000 kilometres.

          Learners will analyze smoke in virtual scenarios, linking colors to causes like injector 
          clogs (tested with a pulse tester) or gasket failures (confirmed with a compression test). 
          Ignoring smoke risks engine seizures, catalytic converter damage (R10,000+), or emissions 
          fines (R5,000+ under South African regulations).
    `
  }
};
