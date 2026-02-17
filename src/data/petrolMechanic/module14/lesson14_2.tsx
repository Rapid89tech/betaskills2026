import type { Lesson } from '@/types/course';

export const lesson14_2: Lesson = {
  id: 2,
  title: 'Diagnosing Catalytic Converter and Oxygen Sensor Issues',
  duration: '90 min',
  type: 'video',
  content: {
    videoUrl: '',
    textContent: `
<div className="prose prose-lg max-w-none">
      <h1>Diagnosing Catalytic Converter and Oxygen Sensor Issues</h1>

## Role of the Catalytic Converter

      <div className="video-container my-8">
        <iframe
          src="https://www.youtube.com/embed/lJiznlz5buc"
          title="Role of the Catalytic Converter"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full aspect-video rounded-lg shadow-lg"
        />
      </div>

        Catalytic converters reduce HC, CO, and NOx by 90%, converting them into CO2, H2O, and N2 via a ceramic honeycomb coated with platinum, palladium, and rhodium.

        In South Africa, where urban smog (e.g., Johannesburg) contributes to 10,000 annual respiratory cases, converters are critical for compliance with SANS 20083 (CO &lt;1.0 g/km). They operate at 400–600°C, requiring proper engine tuning to avoid overheating.

        Clogging from carbon deposits reduces power by 10–15% (e.g., 80 kW to 70 kW), while overheating from rich mixtures (12:1) or misfires melts the substrate, costing R10,000–R30,000 to replace.

        Oil or coolant contamination (e.g., from head gasket leaks) poisons catalysts, reducing efficiency by 50%. Learners will simulate converter operation, observing pollutant reduction.

        Faulty converters fail emissions tests, incurring fines (R2,000–R5,000). Mechanics mastering converter maintenance ensure compliance and performance, saving clients R10,000+.

## Diagnosing Catalytic Converter Issues

      <div className="video-container my-8">
        <iframe
          src="https://www.youtube.com/embed/rGdsQ9jLz0I"
          title="Diagnosing Catalytic Converter Issues"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full aspect-video rounded-lg shadow-lg"
        />
      </div>

        Symptoms of a failing converter include reduced acceleration (e.g., 0–100 km/h in 12s vs. 10s), rattling noises from broken substrates, P0420/P0430 codes, or a rotten egg smell (sulfur from rich mixtures).

        Test backpressure with a gauge (&lt;10 kPa normal; &gt;20 kPa indicates clogs). Measure temperatures with an infrared thermometer: outlet should be 30–50°C hotter than inlet (e.g., 450°C vs. 400°C).

        OBD-II data showing similar upstream/downstream O2 sensor readings (0.1–0.9V) indicates inefficiency. In South Africa, poor fuel quality accelerates clogging after 50,000 km, and dusty roads (e.g., R34) contaminate exhausts.

        Learners will simulate diagnostics on a Ford Fiesta, analyzing P0420 data. Misdiagnosis risks unnecessary replacements (R10,000+). Mechanics mastering diagnostics save clients R5,000–R15,000.

## Role of Oxygen Sensors

      <div className="video-container my-8">
        <iframe
          src="https://www.youtube.com/embed/x8ldQArMOLU"
          title="Role of Oxygen Sensors"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full aspect-video rounded-lg shadow-lg"
        />
      </div>

        Oxygen sensors measure exhaust oxygen content, sending 0.1–0.9V signals to the ECU to maintain a 14.7:1 air-fuel ratio, reducing HC and CO by 80%. Upstream sensors adjust fuel delivery; downstream sensors monitor converter efficiency.

        In South Africa, high-mileage vehicles (100,000+ km) like Nissan Sentras suffer sensor degradation, increasing emissions by 20% (e.g., CO to 1.2%). Contamination from oil or soot (common with 91 RON fuel) or faulty heater circuits (10–20 ohms spec) causes slow response, triggering P0130–P0167 codes.

        Faulty sensors reduce economy (8–10 km/l vs. 12–15 km/l) and damage converters (R10,000+). Learners will simulate sensor operation, observing voltage swings.

        Mechanics mastering sensor maintenance ensure compliance, saving clients R3,000–R10,000. The AI voice tutor can explain sensor signals, contamination risks, or local fuel issues, enhancing understanding.

## Diagnosing Oxygen Sensor Issues

      <div className="video-container my-8">
        <iframe
          src="https://www.youtube.com/embed/z2GZENewSC8"
          title="Diagnosing Oxygen Sensor Issues"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full aspect-video rounded-lg shadow-lg"
        />
      </div>

        Symptoms include poor economy (8–10 km/l), rough idling, P0130–P0167 codes, or failed emissions tests (HC &gt;0.1 g/km). Test voltage with a multimeter (0.1–0.9V oscillation) or scan tool for slow response (&lt;1s cycle).

        Check heater circuit resistance (10–20 ohms). Live data showing flatlined readings (e.g., 0.4V constant) indicates failure. In South Africa, dust (e.g., Limpopo) and humidity (80% in Durban) accelerate sensor fouling after 60,000 km.

        Learners will simulate diagnostics on a Toyota Corolla, analyzing P0171 data. Misdiagnosis risks converter damage (R10,000+). Mechanics mastering diagnostics ensure efficiency, saving clients R3,000+.

## Preventative Measures

        Use 95 RON fuel from reputable stations to avoid contamination. Replace O2 sensors every 60,000–100,000 km, as per manufacturer specs. Address misfires or oil leaks (e.g., from worn valve seals) promptly to protect converters and sensors.

        In South Africa, dusty roads require air filter checks every 5,000 km, and humid conditions necessitate corrosion-resistant sensors. Regular OBD-II scans (every 5,000 km) detect early issues.

        Learners will simulate preventative plans for a Nissan Sentra, ensuring emissions compliance. Neglecting measures risks fines (R2,000–R5,000). Mechanics mastering prevention save clients R5,000+.

## Key Takeaways

        - Emissions standards (SANS 20083) limit pollutants, protecting health and ensuring compliance

        - Catalytic converters and oxygen sensors reduce emissions by 90%

        - Regular diagnostics prevent costly failures and ensure roadworthy compliance

        - Proper maintenance enhances performance, economy (12–15 km/l), and environmental impact

    </div>
    `
  }
};
