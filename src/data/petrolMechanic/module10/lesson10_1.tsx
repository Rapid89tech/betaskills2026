import type { Lesson } from '@/types/course';

export const lesson10_1: Lesson = {
  id: 1,
  title: 'Diagnosing Overheating Issues',
  duration: '60 min',
  type: 'video',
  content: {
    videoUrl: '',
    textContent: `
<div className="prose prose-lg max-w-none">
      <h1>Diagnosing Overheating Issues</h1>

      <div className="video-container my-8">
        <iframe
          src="https://www.youtube.com/embed/8KAszximKhw"
          title="Common Causes of Overheating"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full aspect-video rounded-lg shadow-lg"
        />
      </div>

## Common Causes of Overheating

        Overheating can damage engines, costing R20,000–R50,000 in repairs. Common causes include low coolant levels from leaks (hoses, radiator, heater core) or evaporation, often seen in South Africa's high temperatures (30–40°C).

        A stuck-closed thermostat (failing to open at 85–90°C) blocks coolant flow, while a stuck-open one delays warm-up, reducing efficiency. Failing water pumps cause leaks or poor circulation, evident from whining noises or drips.

        Clogged radiators (internal corrosion or external debris) reduce heat transfer, and faulty fans (electric or clutch-driven) impair airflow, especially at idle. In South Africa, dust clogs radiator fins after 20,000 km, exacerbating overheating in stop-and-go traffic.

        Learners will explore causes in virtual simulations, visualizing coolant flow and fan operation. Ignoring issues risks head gasket failure (R15,000+). Mechanics mastering this knowledge prevent catastrophic damage, ensuring reliability for vehicles like Toyota Corollas.

        The AI voice tutor can explain local climate impacts, leak sources, or fan types, enhancing understanding. Learners will simulate identifying a clogged radiator, proposing solutions to save clients costly repairs, critical in rural areas with limited workshop access.

## Signs of Overheating

        Overheating manifests as a rising temperature gauge (above 90°C), coolant boiling (steam from the hood), or overflow tank bubbling, indicating pressure buildup or head gasket issues.

        Power loss, knocking sounds (pre-ignition), or discolored coolant (rusty or oily) signal problems, with white exhaust smoke suggesting head gasket failure. Persistent leaks under the vehicle or a sweet coolant smell indicate hose or radiator issues, common in South Africa's coastal humidity.

        Learners will practice identifying symptoms in virtual scenarios, correlating steam with low coolant or knocking with overheating. Ignoring signs risks engine seizure (R50,000+). Mechanics mastering symptom recognition diagnose issues early, saving clients R5,000–R20,000.

        The AI voice tutor can explain symptom causes, head gasket diagnostics, or local environmental factors, ensuring precision. Learners will simulate diagnosing a vehicle with steam and a P0128 code (coolant temperature below thermostat range), proposing repairs for vehicles like VW Polos, ensuring reliability in urban or rural South African conditions.

## Diagnostic Steps

      <div className="video-container my-8">
        <iframe
          src="https://www.youtube.com/embed/l04NOlfOumk"
          title="Overheating Diagnostic Procedure"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full aspect-video rounded-lg shadow-lg"
        />
      </div>

        Diagnosing overheating starts with checking coolant levels and condition (rusty or oily indicates corrosion or contamination) when the engine is cool.

        Test the thermostat by feeling the upper radiator hose (hot at 85–90°C if open) or submerging it in 90°C water to verify opening. Inspect hoses for cracks or leaks, and check the radiator for debris or uneven cooling (using an infrared thermometer).

        Verify fan operation (electric fans activate at 95°C) and listen for water pump noises (whining or grinding). Check belt tension (10–15 mm deflection). In South Africa, dust and heat accelerate hose degradation after 5 years.

        Learners will practice diagnostics in virtual scenarios, using a pressure tester to detect leaks (e.g., 100 kPa drop). Misdiagnosis risks unnecessary repairs (R2,000+). Mechanics mastering diagnostics ensure accurate fixes, critical for vehicles like Ford Fiestas.

        The AI voice tutor can guide learners through pressure testing, thermostat checks, or local wear factors, ensuring precision. Learners will simulate diagnosing a low coolant issue, proposing repairs to prevent breakdowns on South African highways.

    </div>
    `
  }
};
