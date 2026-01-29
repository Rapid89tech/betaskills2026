import React from 'react';
import { Lesson } from '../../../types/course';

const LessonContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-red-600 mb-6">OBD2 Scanners and Code Readers</h1>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Key Features</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Understanding OBD2 Systems</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/BNnJTGvos3Q?si=aW5NpZ_7b3JdFnWJ</p>
            </div>
            <p className="text-gray-700 mb-4">
              OBD2 (On-Board Diagnostics, second generation) systems, mandatory on vehicles manufactured after 1996, monitor engine performance, emissions, and related components through a network of sensors and control modules. The system continuously checks over 100 parameters, including oxygen sensor readings (0.1–0.9 volts), fuel trim adjustments (+/-25%), catalyst efficiency (above 95%), and misfire detection (counts per 1,000 revolutions). When issues arise, the PCM (Powertrain Control Module) stores diagnostic trouble codes (DTCs) like P0171 (lean mixture), P0300 (random misfire), or P0420 (catalyst efficiency), illuminating the check engine light.
            </p>
            <p className="text-gray-700">
              In South Africa, OBD2 compliance varies by import regulations, with grey imports sometimes lacking full functionality, complicating diagnostics. Learners will explore virtual OBD2 systems, understanding how sensors like the MAF (mass airflow), MAP (manifold absolute pressure), and knock sensors communicate with the PCM. The AI voice tutor can explain sensor interactions, code categories (P0000–P3999 for powertrain, B0000–B3999 for body, etc.), or South African regulatory requirements. Mastering OBD2 fundamentals enables mechanics to diagnose complex issues efficiently, reducing guesswork and ensuring accurate repairs for vehicles like Toyota Corollas or Ford Fiestas, common in South African fleets. This knowledge is critical for emissions compliance, workshop efficiency, and maintaining customer trust in an increasingly computerized automotive landscape.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Types of OBD2 Scanners</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/gJAiuOCBz9Y?si=1R9MZoqNTcfBJoY2</p>
            </div>
            <p className="text-gray-700 mb-4">
              OBD2 scanners range from basic code readers (R500–R1,500) displaying DTCs and clearing codes, to professional scan tools (R15,000–R50,000) offering live data streaming, bidirectional controls, and advanced diagnostics. Basic scanners like the ELM327 Bluetooth adapter (R300) work with smartphone apps, suitable for DIY enthusiasts but limited to generic codes. Mid-range tools like the Autel AutoLink AL519 (R2,000) add live data and freeze-frame information, ideal for small workshops. Professional scanners like the Launch X431 (R25,000) provide manufacturer-specific codes, component activation, and programming capabilities essential for dealership-level diagnostics.
            </p>
            <p className="text-gray-700">
              In South Africa, budget constraints often drive mechanics toward basic scanners, but advanced tools justify their cost through efficiency and capability. Learners will compare scanner types in virtual demonstrations, learning when to use basic versus professional tools. The AI voice tutor can recommend scanners based on workshop size, budget, or specific vehicle brands common in South Africa, such as Toyota, VW, or Nissan. Understanding scanner capabilities prevents misdiagnoses, reduces repair time, and enhances customer satisfaction. For example, a professional scanner can perform injector coding after replacement, while basic tools cannot, making the investment critical for workshops handling modern vehicles with complex electronic systems.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Reading and Interpreting Codes</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/KGhqhMChcIc?si=O1BFGZTUfGdA7QWy</p>
            </div>
            <p className="text-gray-700 mb-4">
              Diagnostic codes follow a standardized format: the first character indicates the system (P = Powertrain, B = Body, C = Chassis, U = Network), the second shows generic (0) or manufacturer-specific (1), and the last three digits specify the fault. For example, P0171 indicates a generic powertrain code for "System Too Lean (Bank 1)," while P1234 would be manufacturer-specific. Common codes include P0300 (random misfire), P0420 (catalyst efficiency below threshold), P0171/P0174 (lean mixture), and P0401 (EGR flow insufficient). Each code includes freeze-frame data capturing engine conditions (RPM, load, temperature) when the fault occurred, aiding diagnosis.
            </p>
            <p className="text-gray-700">
              In South Africa, fuel quality issues often trigger lean mixture codes (P0171) due to clogged injectors, while dusty conditions cause MAF sensor faults (P0101). Learners will practice code interpretation in virtual scenarios, correlating codes with symptoms and freeze-frame data. The AI voice tutor can explain code meanings, suggest diagnostic steps, or provide context for South African-specific issues like fuel contamination. Mastering code interpretation prevents misdiagnoses, such as replacing an oxygen sensor for a P0130 code when the actual issue is a vacuum leak. This skill ensures accurate repairs, reduces customer costs, and builds workshop credibility, especially when dealing with complex codes on vehicles like BMW 3 Series or Mercedes C-Class, increasingly common in South African urban areas.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Live Data Monitoring</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/Vh2D8bwpgvc?si=UVLG5rxysDaGQd0N</p>
            </div>
            <p className="text-gray-700 mb-4">
              Live data monitoring displays real-time sensor readings, enabling mechanics to observe engine behavior under various conditions. Key parameters include short-term fuel trim (STFT, -10% to +10%), long-term fuel trim (LTFT, -25% to +25%), oxygen sensor voltages (0.1–0.9V), intake air temperature (IAT, ambient +10–20°C), and coolant temperature (ECT, 85–105°C). Abnormal readings, such as LTFT above +15% (indicating a lean condition) or oxygen sensors stuck at 0.45V (contaminated sensor), pinpoint specific faults. Monitoring during test drives reveals intermittent issues invisible during static tests.
            </p>
            <p className="text-gray-700">
              In South Africa's hot climate, IAT readings often exceed normal ranges, affecting fuel calculations and performance. Learners will practice live data analysis in virtual simulations, identifying patterns like misfire counts increasing under load or fuel trims fluctuating during acceleration. The AI voice tutor can guide interpretation of specific parameters, explain normal ranges for different engines, or correlate readings with environmental factors like altitude (Johannesburg at 1,750m affects MAP readings). Mastering live data monitoring enables precise diagnostics, such as distinguishing between a failing MAF sensor (erratic airflow readings) and a vacuum leak (high fuel trims), ensuring accurate repairs and preventing unnecessary part replacements on vehicles like Hyundai i20s or Kia Rios common in South African markets.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Bi-directional Controls</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/mfBdHR2Uk68?si=YhSCOOcRaU_5HrPC</p>
            </div>
            <p className="text-gray-700 mb-4">
              Bi-directional controls allow scan tools to command components directly, testing functionality without removing parts. Examples include cycling fuel injectors (listening for clicking sounds), activating the fuel pump (checking pressure and flow), operating cooling fans (verifying motor and relay function), and testing idle air control valves (observing RPM changes). These tests confirm component operation, isolate faults, and verify repairs. For instance, commanding an injector to pulse while monitoring fuel trims reveals if the injector responds properly or if the PCM's control circuit is faulty.
            </p>
            <p className="text-gray-700">
              In South Africa, bi-directional testing is crucial for diagnosing intermittent faults common in high-mileage vehicles or those exposed to harsh conditions. Learners will practice component activation in virtual workshops, observing responses and correlating with symptoms. The AI voice tutor can guide testing procedures, explain normal responses, or troubleshoot unexpected results. For example, activating cooling fans can diagnose overheating issues before they cause engine damage (R30,000+ for rebuilds). This capability reduces diagnostic time, confirms repairs, and prevents comebacks, especially important for workshops handling diverse vehicle brands where component access varies. Mastering bi-directional controls enhances diagnostic confidence and efficiency.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const lesson8_1: Lesson = {
  id: '8.1',
  title: 'OBD2 Scanners and Code Readers',
  content: LessonContent,
  duration: 90,
  objectives: [
    "Understand OBD2 system fundamentals and operation",
    "Compare different types of OBD2 scanners and their capabilities",
    "Master reading and interpreting diagnostic trouble codes",
    "Learn live data monitoring techniques and analysis",
    "Apply bi-directional controls for component testing"
  ],
  keyTerms: [
    "OBD2 system",
    "Diagnostic trouble codes",
    "Live data monitoring",
    "Bi-directional controls",
    "Fuel trim",
    "Freeze-frame data",
    "PCM communication",
    "Scanner types"
  ]
};