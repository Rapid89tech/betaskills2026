import React from 'react';
import { Lesson } from '../../../types/course';

const LessonContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-red-600 mb-6">Ensuring Proper Valve Clearances</h1>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Key Features</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Importance of Valve Clearance</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/7FqtjNnidkE?si=u8VrvRe-ouuwEHoA</p>
            </div>
            <p className="text-gray-700 mb-4">
              Valve clearance (0.15–0.30 mm typical) allows for thermal expansion, ensuring valves open/close correctly for optimal compression (800–1000 kPa) and power (e.g., 80 kW in a 1.4L engine). Too tight clearances (&lt;0.10 mm) cause valve burning or compression loss, while too loose (&gt;0.40 mm) lead to noise and wear. In South Africa, high-mileage vehicles (100,000+ km) like Nissan Sentras require checks every 30,000 km due to heat stress (30–40°C). Incorrect settings reduce power (10–15%) or cause valve damage (R10,000–R20,000), impacting reliability on long routes like the N4.
            </p>
            <p className="text-gray-700 mb-4">
              Learners will explore clearance effects in virtual simulations, visualizing valve operation and compression. Proper settings ensure smooth idling (800 RPM) and low emissions, critical for roadworthy compliance. Mechanics mastering clearance adjustments maintain performance, saving clients R5,000+ in repairs.
            </p>
            <p className="text-gray-700">
              The AI voice tutor can explain clearance impacts, thermal effects, or local wear factors, enhancing understanding. Learners will simulate analyzing a noisy valvetrain on a Toyota Corolla, proposing adjustments for 0.20 mm intake clearance, vital for reliability in dusty rural areas. Scenarios include addressing valve noise in high-altitude conditions or wear from poor maintenance, ensuring adaptability to South African challenges.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Tools and Equipment Needed</h3>
            <p className="text-gray-700 mb-4">
              Valve clearance adjustments require feeler gauges (0.10–1.00 mm), wrenches (10–13mm), screwdrivers (flathead or Phillips), a torque wrench (10–20 Nm), and a service manual for specs (e.g., 0.20 mm intake, 0.30 mm exhaust). Optional tools include a shim tool for bucket-type systems, a dial indicator for camshaft lift, and a magnet for shim removal. In South Africa, dust contamination from roads like the R34 necessitates clean workspaces and sealed toolkits. Cleaning supplies (degreaser, rags) ensure gasket surfaces are pristine.
            </p>
            <p className="text-gray-700">
              Learners will practice tool setup in virtual scenarios, selecting correct gauges and torque settings. Incorrect tools, like mismatched feeler gauges, risk improper settings (R2,000–R5,000). Mechanics mastering tool use ensure precise adjustments, critical for vehicles like VW Polos in urban traffic. The AI voice tutor can explain gauge selection, torque application, or dust prevention, ensuring accuracy. Learners will simulate preparing tools for a Ford Fiesta, verifying compatibility and practicing gasket cleaning, enhancing workshop efficiency in South African conditions. Additional tools like an inspection mirror aid visibility in tight engine bays, common in compact cars.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Checking and Adjusting Valve Clearance</h3>
            <p className="text-gray-700 mb-4">
              Consult the manual for specs (e.g., 0.20 mm intake, 0.30 mm exhaust, cold engine), remove the valve cover, and rotate the crankshaft to TDC for each cylinder (using a 17mm wrench). Measure clearance with a feeler gauge, ensuring slight drag at the correct spec. For screw-type systems, loosen the locknut, adjust the screw, and torque to 10–15 Nm. For shim-type systems, replace shims with correct thickness (e.g., 2.50 mm). Reassemble with a new valve cover gasket, torque bolts (8–12 Nm), and test for noise-free operation at 800 RPM.
            </p>
            <p className="text-gray-700 mb-4">
              In South Africa, checks every 30,000 km prevent wear in high-heat conditions. Learners will simulate adjustments on a Hyundai i20, ensuring 0.25 mm exhaust clearance. Errors like overtightening cause valve damage (R5,000–R10,000). Mechanics mastering this skill ensure performance, saving clients R3,000+.
            </p>
            <p className="text-gray-700">
              The AI voice tutor can guide learners through TDC alignment, gauge use, or local maintenance schedules, ensuring precision. Learners will practice on a VW Polo, verifying noise-free operation in a virtual test, critical for reliability on South African routes like the N1. Scenarios include adjusting for worn shims or addressing noise in humid coastal areas, ensuring adaptability.
            </p>
          </div>
        </div>

        <div className="mt-8 bg-yellow-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Conclusion and Q&A</h3>
          <h4 className="text-lg font-semibold text-red-700 mb-3">Activities</h4>
          <div className="space-y-3">
            <div>
              <h5 className="font-semibold text-gray-700">Recap Key Points:</h5>
              <p className="text-gray-700">
                Proper ignition timing ensures efficient combustion, carburetor/injector tuning optimizes fuel delivery, and correct valve clearances maintain compression and power, enhancing overall engine performance and reliability.
              </p>
            </div>
            <div>
              <h5 className="font-semibold text-gray-700">Interactive Q&A Session:</h5>
              <p className="text-gray-700">
                Learners engage in live Zoom Q&A, discussing timing adjustments, mixture tuning, or clearance settings. Instructors share cases like fixing a rich carburetor causing black smoke or correcting tight valves in a high-mileage engine. The AI voice tutor answers questions on South African-specific challenges, such as tuning for low-octane fuel or dust-related clogs, ensuring practical solutions.
              </p>
            </div>
            <div>
              <h5 className="font-semibold text-gray-700">Practice Assignments:</h5>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Measure base timing with a timing light on a virtual engine and document adjustments, including specs and outcomes (500 words).</li>
                <li>Tune a virtual carburetor, adjusting idle mixture and speed to achieve 800 RPM and 22 kPa vacuum (500 words).</li>
                <li>Measure valve clearances on a sample engine, proposing adjustments for 0.20 mm intake and 0.30 mm exhaust (500 words).</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-gray-700">Outcome:</h5>
              <p className="text-gray-700">
                Participants will master tuning ignition timing, carburetors or injectors, and valve clearances, optimizing engine performance, improving fuel efficiency, and preventing failures (R10,000–R50,000). These skills enhance workshop capabilities, ensuring reliability and client trust in South African urban centers like Johannesburg and rural areas like Limpopo, addressing local challenges like heat, dust, and fuel quality.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const lesson12_3: Lesson = {
  id: '12.3',
  title: 'Ensuring Proper Valve Clearances',
  content: LessonContent,
  duration: 90,
  objectives: [
    "Understand the critical importance of proper valve clearance",
    "Learn proper tools and equipment for valve clearance adjustment",
    "Master the procedures for checking and adjusting valve clearance",
    "Apply correct specifications for different valve systems",
    "Develop maintenance scheduling for valve clearance checks"
  ],
  keyTerms: [
    "Valve clearance",
    "Feeler gauge",
    "Thermal expansion",
    "TDC alignment",
    "Shim adjustment",
    "Screw-type adjustment",
    "Valve cover gasket",
    "Compression optimization"
  ]
};