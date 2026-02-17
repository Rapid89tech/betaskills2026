import type { Lesson } from '@/types/course';

export const lesson8_1: Lesson = {
  id: 1,
  title: 'Practical Engine Diagnostics and Repair Procedures',
  duration: '120 min',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/BK8l_FgmuZw',
    textContent: `
# Practical Engine Diagnostics and Repair Procedures 🔧

Apply your knowledge through hands-on virtual simulations and step-by-step repair procedures. This lesson integrates all previous modules into practical diagnostic and repair scenarios.

---

## Diagnostic Workflow Overview 🔍

**Systematic Approach:**
* Gather customer complaint and symptoms
* Perform visual inspection
* Retrieve diagnostic trouble codes (DTCs)
* Analyze live data with scan tool
* Test components and systems
* Identify root cause
* Perform repairs
* Verify repair success
* Document all work

**Essential Tools:**
* OBD-II scan tool
* Multimeter
* Oscilloscope
* Pressure gauges
* Compression tester
* Refractometer
* Diagnostic software

---

## Practical Scenario 1: Engine Performance Issues 🚛

**Customer Complaint:**
* Loss of power under load
* Black smoke from exhaust
* Poor fuel economy
* Check engine light illuminated

**Diagnostic Steps:**

**1. Visual Inspection:**
* Check air filter for restrictions
* Inspect turbocharger for oil leaks
* Examine exhaust system for damage
* Look for fuel leaks or contamination
* Check intercooler for blockages

**2. Scan Tool Diagnosis:**
* Retrieve DTCs (P0234 - Turbo overboost, P0101 - MAF sensor)
* Monitor live data:
  - Boost pressure readings
  - MAF sensor voltage
  - Fuel pressure
  - EGR valve position
  - DPF backpressure

**3. Component Testing:**
* Test MAF sensor output with multimeter
* Check turbo wastegate operation
* Verify fuel pressure at rail
* Inspect intercooler for leaks
* Test boost pressure under load

**4. Root Cause Analysis:**
* Contaminated MAF sensor causing incorrect air readings
* ECU compensating with excess fuel
* Results in black smoke and poor economy
* Turbo overboost due to incorrect air-fuel calculations

**5. Repair Procedure:**
* Clean MAF sensor with approved cleaner
* Inspect and clean air intake system
* Check for air leaks post-MAF
* Clear DTCs and perform test drive
* Verify proper boost and fuel trim

**6. Verification:**
* Monitor live data during test drive
* Confirm no DTCs return
* Verify improved fuel economy
* Check for proper boost levels
* Ensure no smoke from exhaust

---

## Practical Scenario 2: DPF Regeneration Failure 🔥

**Customer Complaint:**
* DPF warning light illuminated
* Reduced engine power (limp mode)
* Frequent regeneration attempts
* Increased fuel consumption

**Diagnostic Steps:**

**1. Initial Assessment:**
* Check DPF warning lights and messages
* Review regeneration history in scan tool
* Check mileage since last successful regeneration
* Verify driving patterns (short trips vs highway)

**2. Scan Tool Analysis:**
* Retrieve DTCs (P2002 - DPF efficiency, P2458 - Regeneration duration)
* Check DPF soot load percentage
* Monitor differential pressure sensor readings
* Review exhaust temperature sensor data
* Check regeneration inhibit conditions

**3. System Testing:**
* Test differential pressure sensors
* Verify exhaust temperature sensors
* Check fuel injector operation
* Inspect DPF for physical damage
* Test EGR system operation

**4. Root Cause Identification:**
* Excessive soot accumulation (80% full)
* Failed passive regenerations due to short trips
* Interrupted active regenerations
* Possible sensor faults preventing regeneration

**5. Repair Actions:**
* Perform forced regeneration with scan tool
* Monitor exhaust temperatures during process
* Ensure regeneration completes successfully
* If unsuccessful, remove and clean DPF
* Replace faulty sensors if identified

**6. Post-Repair Verification:**
* Verify DPF soot load reduced to acceptable level
* Clear all DTCs
* Test drive to confirm normal operation
* Educate customer on proper driving habits
* Schedule follow-up inspection

---

## Practical Scenario 3: SCR System Malfunction 💧

**Customer Complaint:**
* DEF warning light illuminated
* Reduced engine power
* DEF consumption higher than normal
* Possible limp mode countdown

**Diagnostic Steps:**

**1. Visual Inspection:**
* Check DEF tank level
* Inspect DEF lines for leaks or crystallization
* Examine DEF injector for blockages
* Check for DEF quality issues
* Verify DEF heater operation (cold weather)

**2. Scan Tool Diagnosis:**
* Retrieve DTCs (P20EE - SCR efficiency, P203F - DEF quality)
* Monitor DEF dosing rates
* Check NOx sensor readings (upstream/downstream)
* Verify DEF pressure and temperature
* Review SCR catalyst efficiency

**3. DEF Quality Testing:**
* Use refractometer to test DEF concentration (should be 32.5%)
* Check for contamination or dilution
* Verify DEF is not expired
* Test for proper freeze point

**4. Component Testing:**
* Test DEF pump pressure and flow
* Check DEF injector spray pattern
* Verify NOx sensor operation
* Test DEF tank heater (if equipped)
* Inspect SCR catalyst for damage

**5. Repair Procedure:**
* Drain and replace contaminated DEF
* Clean or replace DEF injector
* Flush DEF lines if crystallized
* Replace faulty DEF pump if needed
* Clear DTCs and reset system

**6. Verification:**
* Monitor DEF dosing during test drive
* Verify NOx reduction efficiency
* Confirm proper DEF consumption rate
* Check for no warning lights
* Document DEF quality test results

---

## Practical Scenario 4: Cooling System Overheating 🌡️

**Customer Complaint:**
* Engine temperature gauge reading high
* Coolant warning light
* Loss of coolant
* Steam from engine compartment

**Diagnostic Steps:**

**1. Safety First:**
* Allow engine to cool completely
* Check coolant level when safe
* Inspect for visible leaks
* Look for coolant puddles under vehicle

**2. Visual Inspection:**
* Check radiator for damage or blockage
* Inspect hoses for cracks or soft spots
* Examine water pump for leaks
* Check thermostat housing
* Look for EGR cooler leaks
* Inspect head gasket for signs of failure

**3. System Testing:**
* Pressure test cooling system
* Test radiator cap pressure rating
* Check thermostat operation
* Verify water pump operation
* Test coolant quality with refractometer
* Check for combustion gases in coolant

**4. Root Cause Analysis:**
* Failed water pump bearing causing leak
* Restricted radiator reducing cooling capacity
* Thermostat stuck closed
* EGR cooler internal leak
* Head gasket failure (worst case)

**5. Repair Procedure:**
* Replace failed water pump
* Flush cooling system
* Install new thermostat
* Replace damaged hoses
* Refill with proper coolant mixture
* Bleed air from system

**6. Verification:**
* Run engine to operating temperature
* Monitor temperature gauge
* Check for leaks under pressure
* Verify proper coolant circulation
* Test drive under load
* Recheck coolant level after cooling

---

## Practical Scenario 5: Fuel System Issues ⛽

**Customer Complaint:**
* Hard starting (especially cold)
* Rough idle
* Loss of power
* White smoke from exhaust

**Diagnostic Steps:**

**1. Initial Checks:**
* Check fuel level and quality
* Inspect fuel filter for water or contamination
* Look for fuel leaks
* Check for air in fuel system
* Verify fuel tank vent operation

**2. Scan Tool Analysis:**
* Retrieve DTCs (P0087 - Fuel pressure low)
* Monitor fuel rail pressure
* Check injector balance rates
* Verify fuel pump operation
* Review fuel temperature

**3. Fuel System Testing:**
* Test fuel pressure at rail (should be 20,000-30,000 psi)
* Check fuel return flow
* Inspect fuel filter for restrictions
* Test for air leaks in supply lines
* Verify fuel pump output

**4. Injector Testing:**
* Perform injector balance test
* Check for excessive return flow
* Test injector resistance
* Monitor injector pulse width
* Look for mechanical issues

**5. Repair Actions:**
* Replace contaminated fuel filter
* Repair air leaks in fuel lines
* Replace failed fuel pump if needed
* Clean or replace faulty injectors
* Bleed air from fuel system
* Prime fuel system properly

**6. Post-Repair Verification:**
* Verify proper fuel pressure
* Check for smooth idle
* Test drive for power and performance
* Monitor for white smoke
* Confirm easy starting
* Check for fuel leaks

---

## Assignment: Create Diagnostic Plan 📋

**Task:**
Create a comprehensive diagnostic plan for a diesel engine with the following symptoms:
* Intermittent loss of power
* Occasional black smoke
* DPF warning light comes on periodically
* Fuel economy decreased by 15%

**Your Plan Should Include:**
1. Initial visual inspection checklist
2. Scan tool data to retrieve
3. Components to test and how
4. Possible root causes
5. Repair procedures for each cause
6. Verification steps
7. Customer education points

---

## Key Takeaways

* **Systematic Approach:** Follow diagnostic workflow from complaint to verification
* **Use All Tools:** Combine scan tool, multimeter, and visual inspection
* **Root Cause:** Don't just fix symptoms, identify underlying issues
* **Documentation:** Record all findings, tests, and repairs
* **Verification:** Always test drive and confirm repair success
* **Customer Education:** Explain issues and preventive measures

Hands-on practice with these scenarios prepares you for real-world diesel engine diagnostics and repairs.
    `
  }
};
