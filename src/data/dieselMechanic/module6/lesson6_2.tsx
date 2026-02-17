import type { Lesson } from '@/types/course';

export const lesson6_2: Lesson = {
  id: 2,
  title: 'Diagnosing Emissions-Related Issues',
  duration: '90 min',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/EMI8hKgpEcI',
    textContent: `
# Diagnosing Emissions-Related Issues 🔧

Learn to diagnose and troubleshoot common problems in diesel emissions systems, including DPF, EGR, and SCR issues. Master diagnostic techniques using scan tools, pressure tests, and visual inspections.

---

## Common DPF Problems 🚨

https://youtu.be/EMI8hKgpEcI

**Clogged or Blocked Filters:**

**Causes:**
* Frequent short trips prevent passive regeneration
* Low-speed driving insufficient for regeneration
* Failed active regenerations due to system faults
* Poor fuel or oil quality increasing soot production
* Interrupted regeneration cycles

**Symptoms:**
* Reduced engine power or limp mode
* Increased fuel consumption
* DPF warning lights illuminated
* Black smoke from exhaust
* Poor acceleration

**Diagnosis:**
* Use scan tool to retrieve DPF-related DTCs (P2002 - DPF efficiency below threshold)
* Monitor pressure differential sensors for backpressure
* High readings indicate filter restriction
* Physically inspect DPF for cracks or damage
* Check for excessive ash buildup
* Verify driving conditions and regeneration history

**Failed Regeneration Cycles:**

**Causes:**
* Malfunctioning exhaust temperature sensors
* Faulty EGR systems disrupting combustion
* Interrupted active regeneration cycles
* Frequent engine shutoffs during regeneration
* Low fuel levels preventing completion

**Symptoms:**
* Persistent DPF warning lights
* Incomplete regeneration attempts
* Excessive soot accumulation
* DTCs related to regeneration failures
* Reduced performance

**Diagnosis:**
* Check sensor readings with scan tool
* Compare exhaust temperature to OEM specifications
* Retrieve regeneration failure codes (P2458 - DPF regeneration duration)
* Inspect fuel injectors for proper operation
* Check EGR system for faults
* Perform forced regeneration and monitor completion

---

## EGR System Issues ♻️

https://youtu.be/15OMmy3AW0M

**Faulty EGR Valves:**

**Causes:**
* Carbon buildup from exhaust gases
* Electrical failures in actuator
* Mechanical sticking of valve
* Worn valve components
* Contaminated valve passages

**Symptoms:**
* Rough idling or engine misfires
* Increased NOx emissions
* Check engine lights
* DTCs like P0404 (EGR circuit performance)
* Poor acceleration

**Diagnosis:**
* Use scan tool to test EGR valve operation
* Command valve to open/close and monitor feedback
* Remove valve and inspect for carbon deposits
* Clean with EGR-specific cleaner or replace
* Test electrical connections with multimeter
* Verify voltage and continuity to actuator
* Check for related DTCs

**Clogged EGR Coolers:**

**Causes:**
* Soot and carbon accumulation over time
* High-mileage diesel engines
* Coolant contamination
* Poor maintenance history
* Excessive idling

**Symptoms:**
* Engine overheating
* Coolant leaks
* Reduced performance
* DTCs like P0401 (insufficient EGR flow)
* White smoke from exhaust

**Diagnosis:**
* Perform pressure test on EGR cooler
* Detect leaks or blockages in cooling passages
* Visually inspect for carbon deposits or corrosion
* Check for coolant residue
* Monitor coolant temperature with scan tool
* Verify EGR flow rates
* Check for exhaust gas leaks

---

## SCR System Problems 💧

https://youtu.be/i3n5VSAlUl4

**Injector Malfunctions:**

**Causes:**
* Contaminated or low-quality DEF
* Clogged injector nozzles
* Failing DEF pumps
* Crystallization in lines
* Electrical faults

**Symptoms:**
* Increased NOx emissions
* DEF usage warning lights
* Reduced fuel economy
* Limp mode activation
* DTCs like P20EE (SCR NOx catalyst efficiency)

**Diagnosis:**
* Use scan tool to check injector-related DTCs
* Monitor DEF dosing rates
* Measure DEF quality with refractometer (32.5% urea)
* Inspect injector lines and nozzles for blockages
* Check for crystallization or leaks
* Test DEF pump pressure and flow
* Verify adequate delivery to injector

**Catalyst Degradation:**

**Causes:**
* Prolonged exposure to extreme exhaust temperatures
* Sulfur poisoning from poor fuel quality
* Contamination from oil or coolant
* Physical damage from impacts
* Age-related deterioration

**Symptoms:**
* Higher NOx levels in emissions
* Reduced SCR efficiency
* Check engine lights
* DTCs like P20E8 (low DEF pressure)
* Failed emissions tests

**Diagnosis:**
* Use gas analyzer to measure NOx levels
* Compare before and after SCR catalyst
* Assess conversion efficiency
* Inspect catalyst with borescope
* Check for physical damage or melting
* Retrieve DTCs and monitor live data
* Check exhaust system for upstream issues

---

## Diagnostic Workflow 📋

**Step 1: Initial Assessment**
* Retrieve all DTCs with scan tool
* Document codes and freeze frame data
* Note customer complaints and symptoms
* Check service history
* Verify current emissions system status

**Step 2: Visual Inspection**
* Inspect DPF for physical damage
* Check EGR valve and cooler condition
* Examine SCR injector and lines
* Look for leaks or corrosion
* Verify DEF level and quality

**Step 3: Sensor Testing**
* Test pressure differential sensors
* Check exhaust temperature sensors
* Verify EGR position sensors
* Test DEF quality sensor
* Monitor all sensor readings with scan tool

**Step 4: System Testing**
* Perform DPF regeneration test
* Command EGR valve operation
* Test SCR injector dosing
* Monitor system responses
* Compare to manufacturer specifications

**Step 5: Component Testing**
* Pressure test EGR cooler
* Flow test DEF injector
* Analyze exhaust gases
* Test electrical circuits
* Verify component functionality

**Step 6: Repair and Verification**
* Address identified issues
* Clear DTCs after repairs
* Perform system relearn procedures
* Test drive vehicle
* Verify proper operation

---

## Advanced Diagnostic Techniques 🔬

**Pressure Testing:**
* Measure DPF backpressure
* Test EGR cooler integrity
* Check DEF system pressure
* Identify restrictions or leaks
* Compare to specifications

**Gas Analysis:**
* Measure NOx levels
* Check particulate matter
* Analyze exhaust composition
* Verify catalyst efficiency
* Confirm emissions compliance

**Electrical Testing:**
* Test sensor circuits
* Verify actuator operation
* Check wiring continuity
* Measure voltage and resistance
* Identify electrical faults

**Live Data Monitoring:**
* Track regeneration cycles
* Monitor EGR flow rates
* Observe DEF dosing
* Watch temperature trends
* Identify intermittent issues

---

## Common Diagnostic Trouble Codes 🚦

**DPF Codes:**
* P2002: DPF efficiency below threshold
* P2458: DPF regeneration duration
* P244A: DPF differential pressure too low
* P244B: DPF differential pressure too high
* P2463: DPF soot accumulation

**EGR Codes:**
* P0401: Insufficient EGR flow
* P0402: Excessive EGR flow
* P0404: EGR circuit range/performance
* P0405: EGR sensor circuit low
* P0406: EGR sensor circuit high

**SCR Codes:**
* P20E8: Low DEF pressure
* P20EE: SCR NOx catalyst efficiency
* P203F: DEF quality incorrect
* P204F: DEF system performance
* P2201: NOx sensor circuit

---

## Troubleshooting Tips 💡

**DPF Issues:**
* Check driving patterns for regeneration opportunities
* Verify fuel and oil quality
* Ensure sensors are accurate
* Monitor regeneration frequency
* Address underlying causes

**EGR Issues:**
* Clean valves and passages regularly
* Check for vacuum leaks
* Verify actuator operation
* Test cooler integrity
* Replace worn components

**SCR Issues:**
* Use only quality DEF
* Keep system clean
* Monitor dosing rates
* Check for crystallization
* Test catalyst efficiency

---

## Documentation and Reporting 📝

**Record Keeping:**
* Document all DTCs retrieved
* Note symptoms and conditions
* Record test results
* Track repairs performed
* Update service history

**Customer Communication:**
* Explain issues clearly
* Provide repair estimates
* Discuss preventive maintenance
* Educate on proper operation
* Set realistic expectations

**Follow-up:**
* Verify repairs resolved issues
* Schedule follow-up inspections
* Monitor system performance
* Address any recurring problems
* Maintain customer satisfaction

---

## Key Takeaways

* **DPF Diagnosis:** Monitor pressure sensors, check regeneration cycles, inspect for clogs
* **EGR Diagnosis:** Test valve operation, inspect for carbon buildup, check cooler integrity
* **SCR Diagnosis:** Verify DEF quality, test injector operation, analyze catalyst efficiency
* **Systematic Approach:** Follow diagnostic workflow from initial assessment to verification
* **Tools Required:** Scan tool, multimeter, pressure tester, gas analyzer, refractometer
* **Documentation:** Record all findings, repairs, and test results for future reference

Mastering emissions system diagnostics ensures accurate repairs, regulatory compliance, and optimal diesel engine performance.
    `
  }
};
