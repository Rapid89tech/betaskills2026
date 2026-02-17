import type { Lesson } from '@/types/course';

export const lesson8_2: Lesson = {
  id: 2,
  title: 'Understanding OBD-II Scanners and Diagnostic Codes',
  duration: '45 min',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/YGG9VLzeMk8',
    textContent: `
## Purpose and Functionality

https://youtu.be/YGG9VLzeMk8?si=GPO6W8LgOIZTcM59

          OBD-II (On-Board Diagnostics II), mandatory since 1996, monitors vehicle systems like engine 
          performance, emissions, and sensors, storing diagnostic trouble codes (DTCs) when faults occur, 
          such as P0301 (cylinder 1 misfire) or P0420 (catalytic converter issue).

          The system uses a 16-pin port under the dashboard, standard across petrol vehicles, enabling 
          mechanics to retrieve codes, view live data (e.g., RPM, coolant temperature), and check 
          readiness monitors for emissions compliance. In South Africa, where emissions tests are 
          increasingly enforced, OBD-II ensures compliance, avoiding fines (R5,000+).

          Learners will explore OBD-II in virtual simulations, connecting scanners and interpreting 
          codes like P0171 (lean mixture) caused by vacuum leaks, common in coastal areas due to 
          humidity-induced corrosion. Early code detection prevents issues like catalytic converter 
          failure (R10,000+) or misfires damaging engines (R20,000+).

          Mechanics mastering OBD-II reduce diagnostic time, enhancing workshop efficiency for vehicles 
          like VW Golfs. The AI voice tutor can explain code meanings, port locations, or local emissions 
          regulations, ensuring accurate use.

## OBD-II Scanner Operation

https://youtu.be/h9-6dkjMmQ4?si=tWxSLGd28x8Zey5u

          Using an OBD-II scanner involves locating the 16-pin port (under the dashboard), plugging in 
          a handheld or Bluetooth scanner with the ignition off, and turning the key to "ON" (engine 
          off) to power the scanner.

          Select "Read Codes" to retrieve DTCs like P0300 (random misfire) or P0455 (EVAP leak), then 
          view live data (e.g., O2 sensor voltage, fuel trim) or freeze-frame data to understand fault 
          conditions. After repairs, clear codes to check if they return, indicating unresolved issues.

          In South Africa, Bluetooth scanners with apps like Torque are popular due to affordability, 
          but handheld units offer robust code libraries. Learners will practice scanning in virtual 
          scenarios, interpreting codes and live data for a vehicle with a P0172 (rich mixture) code, 
          often caused by a faulty MAF sensor in dusty regions like Gauteng.

          Incorrect code clearing can mask issues, risking engine damage (R15,000+). Mechanics mastering 
          scanner use streamline diagnostics, saving clients time and money.

## Interpreting Data Beyond Codes

https://youtu.be/PavAKG2njiQ?si=MI6amPv-bIcTSrJl

          Beyond DTCs, OBD-II scanners provide live data (e.g., coolant temperature, MAF readings, fuel 
          trims) and freeze-frame data, capturing conditions when a code was set, like RPM or throttle 
          position during a misfire.

          Key parameters include short-term fuel trim (STFT, ideally near 0%), long-term fuel trim 
          (LTFT, indicating chronic issues), and O2 sensor voltage (fluctuating 0.1–0.9V). High positive 
          STFT (+10%) suggests vacuum leaks, common in South Africa's humid coastal areas, while negative 
          LTFT (-10%) indicates rich mixtures from leaking injectors.

          Learners will analyze data in virtual scenarios, diagnosing a P0171 code with high STFT, 
          pointing to a cracked vacuum hose. Freeze-frame data helps identify intermittent faults, like 
          misfires during acceleration, preventing catalytic damage (R10,000+).

          Readiness monitors confirm emissions system functionality, critical for South African compliance. 
          Mechanics mastering this skill detect subtle issues, improving fuel economy by 10–15% and 
          avoiding fines.
    `
  }
};
