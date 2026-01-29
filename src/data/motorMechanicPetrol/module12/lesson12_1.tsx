import React from 'react';
import { Lesson } from '../../../types/course';

const LessonContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-red-600 mb-6">Setting Ignition Timing for Optimal Performance</h1>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Key Features</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Importance of Ignition Timing</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/R0kYSyfEeo8?si=k0ZTaE3or82tJdro</p>
            </div>
            <p className="text-gray-700 mb-4">
              Ignition timing determines when the spark plug fires, typically 5–15° before top dead center (BTDC), to ignite the air-fuel mixture for maximum combustion efficiency. Proper timing aligns peak cylinder pressure with the power stroke, delivering optimal horsepower (e.g., 80–100 kW in a 1.6L engine) and torque (120–150 Nm). In South Africa, high ambient temperatures (30–40°C) increase detonation risk if timing is too advanced, while retarded timing reduces power output by 10–20%, critical for vehicles like Toyota Corollas navigating long highways like the N1. Incorrect timing causes knocking, poor fuel economy (8–10 km/l vs. 12–15 km/l), overheating (above 90°C), and potential piston or valve damage (R20,000–R50,000). Timing also impacts emissions, with improper settings increasing CO and HC levels, failing South African roadworthy tests.
            </p>
            <p className="text-gray-700 mb-4">
              Learners will explore timing effects in virtual simulations, visualizing combustion pressure curves and spark timing impacts. For example, advancing timing by 2° can boost torque by 5–7 Nm but risks knock in low-octane fuel (common in rural South Africa). Mechanics mastering timing adjustments optimize performance, reduce fuel costs (R15–R20 per liter saved), and ensure compliance with local regulations. The AI voice tutor can explain knock detection, timing effects on emissions, or South African fuel quality issues (e.g., 95 RON vs. 91 RON), enhancing practical understanding.
            </p>
            <p className="text-gray-700">
              Learners will simulate setting timing on a VW Polo to 10° BTDC, observing power gains and ensuring no pinging during a virtual road test, critical for reliability in urban traffic or high-altitude regions like Pretoria. Practical scenarios include adjusting timing for a vehicle operating in Durban's humid conditions, where moisture affects combustion, or addressing knock in older engines using low-quality fuel, ensuring mechanics can adapt to diverse South African environments.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Types of Ignition Timing</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/Q1B07CMRljA?si=0dK-75t4cBGlzKKT</p>
            </div>
            <p className="text-gray-700 mb-4">
              Ignition timing varies by engine type and operating condition. Base timing (5–10° BTDC at idle, 600–900 RPM) is the static setting for older engines with distributors, adjusted manually to establish a baseline. Total timing (20–35° BTDC) incorporates mechanical advance (centrifugal weights in distributors) or vacuum advance (using manifold vacuum, 20–30 kPa) for higher RPMs (2000–4000 RPM). Modern engines employ ECU-controlled variable timing, adjusting dynamically via sensors like crankshaft position, knock, and throttle position, optimizing performance across loads. In South Africa, variable timing is vital for vehicles like Ford Fiestas in high-altitude areas (e.g., Johannesburg at 1753 m), where lower air density requires retarded timing to prevent knock.
            </p>
            <p className="text-gray-700 mb-4">
              Mechanical advance increases timing by 10–15° at 3000 RPM, while vacuum advance adds 5–10° under light loads, improving efficiency (12–15 km/l). Learners will explore timing types in virtual scenarios, comparing distributor-based systems (e.g., older VW Golfs) to ECU-controlled systems (e.g., Hyundai i20s). Misadjusted timing risks a 10–20% power loss or detonation, costing R5,000–R15,000 in repairs. Mechanics mastering timing types ensure versatility across vehicle ages, critical for South Africa's mix of old and new cars.
            </p>
            <p className="text-gray-700">
              The AI voice tutor can explain advance mechanisms, ECU mapping, or altitude effects, ensuring precision. Learners will simulate analyzing total timing at 3000 RPM on a Nissan Sentra, proposing adjustments for a 5% power gain, vital for reliability in rural areas with poor fuel quality. Scenarios include adapting timing for coastal humidity or high-altitude performance, addressing local challenges like inconsistent fuel octane ratings.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Tools and Equipment Needed</h3>
            <p className="text-gray-700 mb-4">
              Setting ignition timing requires precise tools: a timing light (basic or advance-capable) to visualize crankshaft marks, a distributor wrench (13–15mm) or socket set for adjustments, a service manual for specs (e.g., 8° BTDC for a 1.4L engine), chalk or marker to highlight timing marks, and a tachometer for RPM accuracy (600–4000 RPM). Modern engines need OBD-II scanners (e.g., Bosch KTS) and tuning software (HP Tuners, Cobb Accessport) for ECU adjustments. Optional tools include a vacuum gauge (20–30 kPa readings) for vacuum advance checks and a knock sensor monitor for real-time detonation detection.
            </p>
            <p className="text-gray-700 mb-4">
              In South Africa, dust from rural roads (e.g., R573) can contaminate sensors, requiring clean workspaces and filtered air tools. Learners will practice tool setup in virtual scenarios, selecting OEM-spec equipment for accuracy. Incorrect tools, like a non-calibrated timing light, risk misadjustments, causing knock or power loss (R2,000–R5,000). Mechanics mastering tool use ensure precise timing, critical for vehicles like Toyota Corollas in urban stop-and-go traffic.
            </p>
            <p className="text-gray-700">
              The AI voice tutor can explain timing light calibration, software interfaces, or dust mitigation strategies, ensuring reliability. Learners will simulate preparing tools for a Hyundai i20, verifying compatibility and practicing mark highlighting, enhancing workshop efficiency in South African conditions. Additional tools like a digital multimeter for sensor checks or a dyno for performance validation can refine tuning, particularly for high-performance vehicles in urban centers like Cape Town.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Steps to Adjust Ignition Timing</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/wifTHbb06_I?si=vJQK0BileYL4ieTE</p>
            </div>
            <p className="text-gray-700 mb-4">
              To adjust ignition timing, consult the service manual for specs (e.g., 8° BTDC at 800 RPM), warm the engine to 80–90°C, and disconnect vacuum advance (if applicable) to set base timing. Attach a timing light to the battery and cylinder 1 spark plug wire, aim at the harmonic balancer, and observe marks on the timing scale. Loosen the distributor hold-down bolt (10–15 Nm torque), rotate the distributor (clockwise to retard, counterclockwise to advance) until marks align, and tighten the bolt. Reconnect vacuum advance, verify total timing (20–35° BTDC at 3000 RPM), and road test for smooth acceleration and no knocking.
            </p>
            <p className="text-gray-700 mb-4">
              In South Africa, high-altitude tuning (e.g., Gauteng) may require retarding by 1–2° to avoid knock with 95 RON fuel, while coastal areas like Durban need slight advances for humidity. Learners will simulate adjustments on a VW Polo, ensuring 10° BTDC and no pinging. Errors like over-advancing risk detonation (R5,000–R15,000), while under-advancing reduces power (10–15%). Mechanics mastering this process optimize performance, saving clients R3,000+ in fuel and repairs.
            </p>
            <p className="text-gray-700">
              The AI voice tutor can guide learners through distributor rotation, knock detection, or local fuel adjustments, ensuring precision. Learners will practice on a Toyota Corolla, verifying timing stability during a virtual test drive, critical for South African highways like the N3, where consistent power is essential. Scenarios include adjusting for low-octane fuel or humid conditions, ensuring adaptability to local challenges.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const lesson12_1: Lesson = {
  id: '12.1',
  title: 'Setting Ignition Timing for Optimal Performance',
  content: LessonContent,
  duration: 90,
  objectives: [
    "Understand the critical importance of proper ignition timing",
    "Learn different types of ignition timing systems and their applications",
    "Master the tools and equipment needed for timing adjustments",
    "Apply systematic procedures for adjusting ignition timing",
    "Adapt timing settings for various environmental conditions"
  ],
  keyTerms: [
    "Ignition timing",
    "Base timing",
    "Total timing",
    "Mechanical advance",
    "Vacuum advance",
    "Timing light",
    "BTDC",
    "Detonation"
  ]
};