import React from 'react';
import { Lesson } from '../../../types/course';

const LessonContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-red-600 mb-6">Multimeters and Electrical Testing</h1>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Key Features</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Basic Multimeter Functions</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/bF3OyQ3HwfU?si=wWDbJG9KxEFT2LJ6</p>
            </div>
            <p className="text-gray-700 mb-4">
              Multimeters measure voltage (DC and AC), current (amperage), and resistance (ohms), essential for automotive electrical diagnostics. DC voltage testing verifies battery condition (12.6V at rest, 14.4V charging), sensor outputs (TPS 0.5–4.5V, IAT 0.5–4.8V), and circuit integrity. Current testing measures draw from components like fuel pumps (6–10A), cooling fans (15–25A), or parasitic drain (below 50mA when parked). Resistance testing checks component integrity, such as spark plug wires (5,000–15,000 ohms), fuel injectors (12–16 ohms), or temperature sensors (varying with temperature: ECT 2,500 ohms at 20°C, 300 ohms at 80°C).
            </p>
            <p className="text-gray-700">
              In South Africa, electrical issues are common due to moisture (coastal areas), heat (inland regions), and dust, affecting connections and sensors. Learners will practice measurements in virtual scenarios, learning proper probe placement and range selection. The AI voice tutor can guide troubleshooting, explain readings, or address environmental impacts on electrical systems. For example, corroded connections from Cape Town's salt air may show high resistance (above 1 ohm), causing voltage drops and component malfunction. Mastering multimeter basics enables accurate electrical diagnostics, preventing misdiagnoses and ensuring reliable repairs on vehicles like VW Polos or Toyota Yaris, where electrical faults can cause driveability issues or no-start conditions.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Testing Sensors and Actuators</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/X3KNH_jlPZ0?si=S2fKKHIoLEzVH6d3</p>
            </div>
            <p className="text-gray-700 mb-4">
              Sensor testing verifies proper operation and signal integrity. Temperature sensors (ECT, IAT) change resistance predictably: ECT drops from 2,500 ohms (cold) to 300 ohms (hot), while IAT increases with temperature. Throttle position sensors (TPS) produce a smooth voltage sweep from 0.5V (closed) to 4.5V (wide open), with no dead spots or jumps. Mass airflow sensors output voltage proportional to airflow (0.6V at idle, 2.5V at 2,500 RPM). Oxygen sensors switch between 0.1V (lean) and 0.9V (rich) rapidly when warmed up. Actuator testing includes fuel injectors (12–16 ohms resistance, audible clicking when pulsed), ignition coils (primary 0.5–2 ohms, secondary 5,000–15,000 ohms), and idle air control valves (varying resistance as they move).
            </p>
            <p className="text-gray-700">
              In South Africa, sensor contamination from dust and fuel impurities is common, affecting accuracy and lifespan. Learners will practice sensor testing in virtual workshops, learning to identify failed components versus wiring issues. The AI voice tutor can explain sensor specifications, guide testing procedures, or troubleshoot unusual readings. For example, a MAF sensor reading 5V at idle indicates contamination or failure, requiring cleaning or replacement. This skill prevents unnecessary part replacements, such as swapping an oxygen sensor when the issue is a wiring fault, saving customers money and building workshop credibility on popular vehicles like Nissan Almeras or Ford Fiestas.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Circuit Troubleshooting</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/l69MnWSQEgY?si=Y4kRs4fPmgH9cCzb</p>
            </div>
            <p className="text-gray-700 mb-4">
              Circuit troubleshooting identifies opens (broken connections), shorts (unwanted connections), and high resistance (corroded or damaged wiring). Voltage drop testing measures resistance in live circuits: battery to starter should show less than 0.5V drop, while charging circuits should maintain 13.8–14.4V at the battery. Continuity testing verifies complete circuits when powered off, using the ohm function to check for breaks. Load testing applies controlled resistance to verify circuit capacity, such as checking if a charging circuit can maintain voltage under full electrical load (lights, A/C, etc.).
            </p>
            <p className="text-gray-700">
              In South Africa, wiring damage from rodents (common in rural areas) or corrosion from coastal salt affects circuit integrity. Learners will practice systematic troubleshooting in virtual scenarios, learning to isolate faults efficiently. The AI voice tutor can guide diagnostic sequences, explain voltage drop limits, or address local challenges like baboon damage to engine wiring in Western Cape regions. For instance, a no-start condition might result from a corroded ground connection showing 2V drop instead of proper 0.1V, causing insufficient starter operation. Mastering circuit troubleshooting reduces diagnostic time, prevents comebacks, and ensures reliable repairs essential for customer satisfaction.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Oscilloscope Basics</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/xaELqAo4kkQ?si=9DEKz6Ln2eA3tGe7</p>
            </div>
            <p className="text-gray-700 mb-4">
              Oscilloscopes display electrical signals over time, revealing patterns invisible to multimeters. Automotive applications include analyzing ignition patterns (spark duration, peak voltage, burn time), fuel injector pulse width (1–20 milliseconds depending on load), sensor waveforms (crankshaft position sensors producing square waves), and communication signals (CAN bus high-speed data). The scope shows signal amplitude (voltage), frequency (cycles per second), and timing relationships between components. For example, a healthy ignition coil produces a sharp spike to 25,000V, followed by a controlled burn phase lasting 1–2 milliseconds.
            </p>
            <p className="text-gray-700">
              In South Africa, scope diagnostics are particularly valuable for intermittent faults common in high-mileage vehicles or those subjected to extreme conditions. Learners will explore basic scope operation in virtual demonstrations, learning to capture and interpret waveforms. The AI voice tutor can explain pattern recognition, trigger settings, or scope applications for specific symptoms. For example, a misfire might show irregular ignition patterns or weak spark duration, pinpointing failing coils or plugs. While advanced, scope knowledge enhances diagnostic capability, especially for complex electrical issues on modern vehicles where traditional testing methods may miss intermittent problems affecting performance or emissions compliance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const lesson8_2: Lesson = {
  id: '8.2',
  title: 'Multimeters and Electrical Testing',
  content: LessonContent,
  duration: 90,
  objectives: [
    "Master basic multimeter functions for automotive diagnostics",
    "Learn proper techniques for testing sensors and actuators",
    "Develop skills in systematic circuit troubleshooting",
    "Understand oscilloscope basics for advanced diagnostics",
    "Apply electrical testing to real-world automotive problems"
  ],
  keyTerms: [
    "Multimeter functions",
    "Voltage testing",
    "Current measurement",
    "Resistance testing",
    "Sensor diagnostics",
    "Circuit troubleshooting",
    "Voltage drop testing",
    "Oscilloscope waveforms"
  ]
};