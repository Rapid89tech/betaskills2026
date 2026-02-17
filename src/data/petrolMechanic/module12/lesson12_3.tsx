import type { Lesson } from '@/types/course';

export const lesson12_3: Lesson = {
  id: 3,
  title: 'Ensuring Proper Valve Clearances',
  duration: '60 min',
  type: 'video',
  content: {
    videoUrl: '',
    textContent: `
<div className="prose prose-lg max-w-none">
      <h1>Ensuring Proper Valve Clearances</h1>

## Importance of Valve Clearance

      <div className="video-container my-8">
        <iframe
          src="https://www.youtube.com/embed/7FqtjNnidkE"
          title="Importance of Valve Clearance"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full aspect-video rounded-lg shadow-lg"
        />
      </div>

        Valve clearance (0.15–0.30 mm typical) allows for thermal expansion, ensuring valves open/close correctly for optimal compression (800–1000 kPa) and power (e.g., 80 kW in a 1.4L engine).

        Too tight clearances (&lt;0.10 mm) cause valve burning or compression loss, while too loose (&gt;0.40 mm) lead to noise and wear. In South Africa, high-mileage vehicles (100,000+ km) like Nissan Sentras require checks every 30,000 km due to heat stress (30–40°C).

        Incorrect settings reduce power (10–15%) or cause valve damage (R10,000–R20,000), impacting reliability on long routes like the N4. Learners will explore clearance effects in virtual simulations, visualizing valve operation and compression.

        Proper settings ensure smooth idling (800 RPM) and low emissions, critical for roadworthy compliance. Mechanics mastering clearance adjustments maintain performance, saving clients R5,000+ in repairs.

        The AI voice tutor can explain clearance impacts, thermal effects, or local wear factors, enhancing understanding. Learners will simulate analyzing a noisy valvetrain on a Toyota Corolla, proposing adjustments for 0.20 mm intake clearance, vital for reliability in dusty rural areas.

## Tools and Equipment Needed

        Valve clearance adjustments require feeler gauges (0.10–1.00 mm), wrenches (10–13mm), screwdrivers (flathead or Phillips), a torque wrench (10–20 Nm), and a service manual for specs (e.g., 0.20 mm intake, 0.30 mm exhaust).

        Optional tools include a shim tool for bucket-type systems, a dial indicator for camshaft lift, and a magnet for shim removal. In South Africa, dust contamination from roads like the R34 necessitates clean workspaces and sealed toolkits.

        Cleaning supplies (degreaser, rags) ensure gasket surfaces are pristine. Learners will practice tool setup in virtual scenarios, selecting correct gauges and torque settings.

        Incorrect tools, like mismatched feeler gauges, risk improper settings (R2,000–R5,000). Mechanics mastering tool use ensure precise adjustments, critical for vehicles like VW Polos in urban traffic.

        The AI voice tutor can explain gauge selection, torque application, or dust prevention, ensuring accuracy. Learners will simulate preparing tools for a Ford Fiesta, verifying compatibility and practicing gasket cleaning, enhancing workshop efficiency in South African conditions.

## Checking and Adjusting Valve Clearance

        Consult the manual for specs (e.g., 0.20 mm intake, 0.30 mm exhaust, cold engine), remove the valve cover, and rotate the crankshaft to TDC for each cylinder (using a 17mm wrench). Measure clearance with a feeler gauge, ensuring slight drag at the correct spec.

        For screw-type systems, loosen the locknut, adjust the screw, and torque to 10–15 Nm. For shim-type systems, replace shims with correct thickness (e.g., 2.50 mm).

        Reassemble with a new valve cover gasket, torque bolts (8–12 Nm), and test for noise-free operation at 800 RPM. In South Africa, checks every 30,000 km prevent wear in high-heat conditions.

        Learners will simulate adjustments on a Hyundai i20, ensuring 0.25 mm exhaust clearance. Errors like overtightening cause valve damage (R5,000–R10,000).

        Mechanics mastering this skill ensure performance, saving clients R3,000+. The AI voice tutor can guide learners through TDC alignment, gauge use, or local maintenance schedules, ensuring precision.

        Learners will practice on a VW Polo, verifying noise-free operation in a virtual test, critical for reliability on South African routes like the N1. Scenarios include adjusting for worn shims or addressing noise in humid coastal areas, ensuring adaptability.

## Key Takeaways

        - Proper ignition timing ensures efficient combustion and optimal performance

        - Carburetor/injector tuning optimizes fuel delivery for power and economy

        - Correct valve clearances maintain compression and power

        - Regular tuning enhances overall engine performance and reliability

    </div>
    `
  }
};
