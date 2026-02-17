import type { Lesson } from '@/types/course';

export const lesson8_1: Lesson = {
  id: 1,
  title: 'Using a Compression Tester to Evaluate Engine Health',
  duration: '45 min',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/zCR6wahr9FU',
    textContent: `
## Purpose and Importance

https://youtu.be/zCR6wahr9FU?si=7YW_VMN_dXjdC5gn

          Compression testing measures cylinder pressure during the compression stroke, assessing the 
          mechanical health of pistons, rings, valves, and head gaskets. Proper compression (typically 
          1172–1379 kPa for petrol engines) ensures efficient combustion, delivering optimal power and 
          fuel economy.

          Low or uneven compression indicates issues like worn piston rings, leaking valves, or a blown 
          head gasket, which can cause misfires, rough idling, or power loss, costing R15,000–R40,000 
          in repairs. In South Africa, high-mileage vehicles (100,000+ km) often suffer ring wear due 
          to heat and irregular oil changes, common in models like Toyota Corollas.

          Learners will explore compression's role in virtual simulations, visualizing how pressure 
          affects combustion. The test involves cranking the engine with a gauge in each cylinder's 
          spark plug hole, comparing results to manufacturer specs (found in service manuals). A wet 
          test (adding oil) differentiates ring wear from valve issues.

          Early detection prevents catastrophic failures like piston damage or engine seizures, saving 
          clients from expensive overhauls. Mechanics mastering this skill ensure accurate diagnostics, 
          enhancing reliability.

## Tools and Preparation

https://youtu.be/D-IXADJElq0?si=mI3g665_tPKbfRRS

          Compression testing requires a compression gauge (analog or digital, with a screw-in adapter), 
          spark plug socket, ratchet, and a fully charged battery to ensure consistent cranking. Optional 
          tools include a remote starter switch for solo testing.

          Preparation is critical: warm the engine to operating temperature (80–90°C) to account for 
          thermal expansion, then disable the fuel system (remove fuel pump fuse or relay) and ignition 
          (disconnect coils or wires) to prevent starting or fuel spray, a safety hazard in South 
          Africa's warm workshops.

          Remove all spark plugs to reduce cranking resistance and label ignition components for 
          reassembly. In South Africa, dusty conditions can contaminate spark plug wells, requiring 
          cleaning to avoid debris entering cylinders.

          Learners will practice setup in virtual scenarios, ensuring proper gauge threading to prevent 
          leaks, which can skew readings by 10–20%. A poorly charged battery can lower readings, leading 
          to misdiagnosis, while overtightening plugs risks thread damage (R2,000+ to repair).

## Compression Test Procedure

https://youtu.be/3VmmL0YAO14?si=W4k757i97I7COCrR

          To perform a compression test, thread the gauge into the first cylinder's spark plug hole, 
          ensuring a snug, leak-free fit. Fully depress the throttle pedal (if applicable) to maximize 
          airflow, then crank the engine for 5–7 seconds (4–6 revolutions) until the gauge stabilizes, 
          recording the maximum pressure in kPa.

          Repeat for each cylinder, ensuring consistent cranking speed. Typical petrol engine readings 
          range from 1172–1379 kPa, but check the service manual for specifics (e.g., 1241 kPa for a 
          Ford Fiesta). A variance exceeding 10–15% (e.g., 896 kPa vs. 1241 kPa) suggests issues like 
          worn rings or a damaged valve, while uniformly low readings indicate timing issues or engine 
          wear.

          In South Africa, high ambient temperatures accelerate ring wear after 80,000 km, especially 
          in stop-and-go urban traffic. Learners will simulate tests in virtual scenarios, comparing 
          readings and performing a wet test (adding 5 ml of oil) to confirm ring wear if pressure rises.

          Low compression risks misfires or oil burning, costing R15,000+ in repairs. Mechanics mastering 
          this skill pinpoint issues accurately, preventing unnecessary part replacements.

## Interpreting Results and Next Steps

https://youtu.be/dGCdSK8FfVQ?si=7p-mmQAeljaLP-Ip

          Interpreting compression test results involves comparing readings to manufacturer specs (e.g., 
          1172–1379 kPa for most petrol engines) and noting variances. A healthy engine shows consistent 
          pressures within 10–15%; for example, if cylinder 1 reads 1241 kPa, others should be 
          1055–1427 kPa.

          A single low cylinder (e.g., 896 kPa) suggests a localized issue like a burned valve or head 
          gasket leak, while uniformly low readings indicate timing issues or widespread wear. A wet 
          test (adding oil) differentiates ring wear (pressure rises) from valve or gasket issues 
          (pressure stays low).

          In South Africa, high-mileage vehicles often show low compression due to neglected oil changes, 
          accelerating wear after 100,000 km. Learners will analyze results in virtual scenarios, 
          recommending next steps like leak-down tests to pinpoint leaks (e.g., air escaping through 
          the intake or exhaust).

          Ignoring low compression risks engine failure (R30,000+), while accurate diagnostics save 
          costs by avoiding unnecessary repairs. Mechanics mastering this skill ensure reliable engines, 
          critical for clients in rural areas with limited repair access.
    `
  }
};
