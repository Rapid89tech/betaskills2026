import type { Lesson } from '@/types/course';

export const lesson12_1: Lesson = {
  id: 1,
  title: 'Setting Ignition Timing for Optimal Performance',
  duration: '75 min',
  type: 'video',
  content: {
    videoUrl: '',
    textContent: `
<div className="prose prose-lg max-w-none">
      <h1>Setting Ignition Timing for Optimal Performance</h1>

## Importance of Ignition Timing

      <div className="video-container my-8">
        <iframe
          src="https://www.youtube.com/embed/R0kYSyfEeo8"
          title="Importance of Ignition Timing"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full aspect-video rounded-lg shadow-lg"
        />
      </div>

        Ignition timing determines when the spark plug fires, typically 5–15° before top dead center (BTDC), to ignite the air-fuel mixture for maximum combustion efficiency. Proper timing aligns peak cylinder pressure with the power stroke, delivering optimal horsepower (e.g., 80–100 kW in a 1.6L engine) and torque (120–150 Nm).

        In South Africa, high ambient temperatures (30–40°C) increase detonation risk if timing is too advanced, while retarded timing reduces power output by 10–20%, critical for vehicles like Toyota Corollas navigating long highways like the N1.

        Incorrect timing causes knocking, poor fuel economy (8–10 km/l vs. 12–15 km/l), overheating (above 90°C), and potential piston or valve damage (R20,000–R50,000). Timing also impacts emissions, with improper settings increasing CO and HC levels, failing South African roadworthy tests.

        Learners will explore timing effects in virtual simulations, visualizing combustion pressure curves and spark timing impacts. For example, advancing timing by 2° can boost torque by 5–7 Nm but risks knock in low-octane fuel (common in rural South Africa).

        Mechanics mastering timing adjustments optimize performance, reduce fuel costs (R15–R20 per liter saved), and ensure compliance with local regulations. The AI voice tutor can explain knock detection, timing effects on emissions, or South African fuel quality issues (e.g., 95 RON vs. 91 RON), enhancing practical understanding.

        Learners will simulate setting timing on a VW Polo to 10° BTDC, observing power gains and ensuring no pinging during a virtual road test, critical for reliability in urban traffic or high-altitude regions like Pretoria.

## Types of Ignition Timing

      <div className="video-container my-8">
        <iframe
          src="https://www.youtube.com/embed/Q1B07CMRljA"
          title="Types of Ignition Timing"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full aspect-video rounded-lg shadow-lg"
        />
      </div>

        Ignition timing varies by engine type and operating condition. Base timing (5–10° BTDC at idle, 600–900 RPM) is the static setting for older engines with distributors, adjusted manually to establish a baseline.

        Total timing (20–35° BTDC) incorporates mechanical advance (centrifugal weights in distributors) or vacuum advance (using manifold vacuum, 20–30 kPa) for higher RPMs (2000–4000 RPM).

        Modern engines employ ECU-controlled variable timing, adjusting dynamically via sensors like crankshaft position, knock, and throttle position, optimizing performance across loads. In South Africa, variable timing is vital for vehicles like Ford Fiestas in high-altitude areas (e.g., Johannesburg at 1753 m), where lower air density requires retarded timing to prevent knock.

        Mechanical advance increases timing by 10–15° at 3000 RPM, while vacuum advance adds 5–10° under light loads, improving efficiency (12–15 km/l). Learners will explore timing types in virtual scenarios, comparing distributor-based systems (e.g., older VW Golfs) to ECU-controlled systems (e.g., Hyundai i20s).

        Misadjusted timing risks a 10–20% power loss or detonation, costing R5,000–R15,000 in repairs. Mechanics mastering timing types ensure versatility across vehicle ages, critical for South Africa's mix of old and new cars.

## Tools and Equipment Needed

        Setting ignition timing requires precise tools: a timing light (basic or advance-capable) to visualize crankshaft marks, a distributor wrench (13–15mm) or socket set for adjustments, a service manual for specs (e.g., 8° BTDC for a 1.4L engine), chalk or marker to highlight timing marks, and a tachometer for RPM accuracy (600–4000 RPM).

        Modern engines need OBD-II scanners (e.g., Bosch KTS) and tuning software (HP Tuners, Cobb Accessport) for ECU adjustments. Optional tools include a vacuum gauge (20–30 kPa readings) for vacuum advance checks and a knock sensor monitor for real-time detonation detection.

        In South Africa, dust from rural roads (e.g., R573) can contaminate sensors, requiring clean workspaces and filtered air tools. Learners will practice tool setup in virtual scenarios, selecting OEM-spec equipment for accuracy.

        Incorrect tools, like a non-calibrated timing light, risk misadjustments, causing knock or power loss (R2,000–R5,000). Mechanics mastering tool use ensure precise timing, critical for vehicles like Toyota Corollas in urban stop-and-go traffic.

## Steps to Adjust Ignition Timing

      <div className="video-container my-8">
        <iframe
          src="https://www.youtube.com/embed/wifTHbb06_I"
          title="Steps to Adjust Ignition Timing"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full aspect-video rounded-lg shadow-lg"
        />
      </div>

        To adjust ignition timing, consult the service manual for specs (e.g., 8° BTDC at 800 RPM), warm the engine to 80–90°C, and disconnect vacuum advance (if applicable) to set base timing.

        Attach a timing light to the battery and cylinder 1 spark plug wire, aim at the harmonic balancer, and observe marks on the timing scale. Loosen the distributor hold-down bolt (10–15 Nm torque), rotate the distributor (clockwise to retard, counterclockwise to advance) until marks align, and tighten the bolt.

        Reconnect vacuum advance, verify total timing (20–35° BTDC at 3000 RPM), and road test for smooth acceleration and no knocking. In South Africa, high-altitude tuning (e.g., Gauteng) may require retarding by 1–2° to avoid knock with 95 RON fuel, while coastal areas like Durban need slight advances for humidity.

        Learners will simulate adjustments on a VW Polo, ensuring 10° BTDC and no pinging. Errors like over-advancing risk detonation (R5,000–R15,000), while under-advancing reduces power (10–15%).

        Mechanics mastering this process optimize performance, saving clients R3,000+ in fuel and repairs. The AI voice tutor can guide learners through distributor rotation, knock detection, or local fuel adjustments, ensuring precision.

    </div>
    `
  }
};
