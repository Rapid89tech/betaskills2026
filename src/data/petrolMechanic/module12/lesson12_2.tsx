import type { Lesson } from '@/types/course';

export const lesson12_2: Lesson = {
  id: 2,
  title: 'Tuning Carburetors or Recalibrating Fuel Injectors',
  duration: '75 min',
  type: 'video',
  content: {
    videoUrl: '',
    textContent: `
<div className="prose prose-lg max-w-none">
      <h1>Tuning Carburetors or Recalibrating Fuel Injectors</h1>

## Tuning Carburetors

      <div className="video-container my-8">
        <iframe
          src="https://www.youtube.com/embed/Z1_bL7yHwgw"
          title="Tuning Carburetors"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full aspect-video rounded-lg shadow-lg"
        />
      </div>

        Carburetors mix air and fuel for combustion, targeting a 14.7:1 ratio at idle (600–900 RPM) and under load. Poor tuning causes rough idle, black smoke (rich mixture, &lt;12:1), backfiring (lean, &gt;15:1), or hesitation, reducing fuel economy (8–10 km/l vs. 12–15 km/l).

        Tools include screwdrivers (flathead for mixture screws), a vacuum gauge (20–25 kPa for optimal idle), and a tachometer. Adjust idle mixture screws (1/8-turn increments) for highest vacuum or smoothest idle, set idle speed screw to spec (e.g., 800 RPM), and verify choke opens fully at 80°C.

        Main jets or power valves may need replacement for high-RPM performance (3000–5000 RPM). In South Africa, dust from rural roads clogs jets after 20,000 km, and poor fuel quality (91 RON) requires leaner settings.

        Learners will simulate tuning a VW Polo carburetor, achieving 800 RPM and 22 kPa vacuum. Errors like over-rich mixtures cause carbon buildup (R2,000–R5,000), while lean settings risk misfires.

        Mechanics mastering tuning restore efficiency, saving clients R3,000+ in fuel and repairs. The AI voice tutor can explain mixture ratios, jet sizing, or dust mitigation, ensuring accuracy.

        Learners will practice on a classic VW Golf, adjusting for smooth acceleration in a virtual test, critical for urban reliability. Scenarios include tuning for high-altitude performance or addressing clogged jets from dusty environments, ensuring adaptability to South African conditions like those in the Karoo.

## Recalibrating Fuel Injectors

      <div className="video-container my-8">
        <iframe
          src="https://www.youtube.com/embed/99uLyZK8OOU"
          title="Recalibrating Fuel Injectors"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full aspect-video rounded-lg shadow-lg"
        />
      </div>

        Fuel injectors deliver precise fuel amounts (e.g., 350 cc/min) into the combustion chamber or intake manifold, controlled by the ECU. Clogs, mismatches, or wear cause misfires, poor economy (10–12 km/l vs. 15 km/l), hesitation, or high emissions (failing South African e-Natis tests).

        Tools include a fuel pressure gauge (250–350 kPa), OBD-II scanner for fuel trim data (±10% ideal), ultrasonic cleaner, and tuning software (e.g., Hondata). Check pressure, inspect spray patterns (fine mist, not dripping), clean injectors ultrasonically, and adjust fuel maps for consistent delivery.

        In South Africa, poor fuel quality clogs injectors after 50,000 km, especially in coastal areas with high humidity. Learners will simulate recalibrating a Ford Fiesta's injectors, ensuring 300 kPa and balanced trims.

        Errors like mismatched injectors cause engine damage (R10,000–R20,000). Mechanics mastering recalibration optimize performance, saving clients R5,000+ in fuel and repairs.

        The AI voice tutor can explain trim adjustments, cleaning techniques, or local fuel quality issues, ensuring precision. Learners will practice on a Hyundai i20, verifying spray patterns in a virtual flow bench, critical for highway performance on routes like the N2.

        Scenarios include recalibrating for aftermarket turbo installations or addressing fuel contamination, ensuring reliability in South African urban and rural settings.

    </div>
    `
  }
};
