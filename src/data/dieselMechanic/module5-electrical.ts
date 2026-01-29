import type { Module } from '@/types/course';

export const module5Electrical: Module = {
  id: 5,
  title: 'Electrical and Diagnostic Systems',
  description: 'Overview of diesel engine sensors, diagnostic tools, and electrical troubleshooting techniques',
  lessons: [
    {
      id: 19,
      title: 'Overview of Diesel Engine Sensors',
      duration: '60 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/watch?v=Everything-You-Need-To-Know-About-Widebands',
        textContent: `Understand the role of key sensors in diesel engines and how they influence performance and emissions:

## Oxygen Sensors (O2 Sensors)

### Purpose:
- Monitor oxygen levels in the exhaust to ensure proper air-fuel ratios
- Provide feedback to the ECU for adjusting fuel delivery and maintaining emissions compliance

### Types of Oxygen Sensors:
#### Narrowband Sensors
- Provide a binary signal (rich or lean)
- Simple feedback for basic fuel control

#### Wideband Sensors  
- Provide precise readings over a range, allowing finer control of air-fuel ratios
- Standard in modern diesel engines for precise emission control

### Common Issues:
- Contamination from oil or coolant leaks
- Slow response times due to aging
- Faulty wiring or connectors

## Mass Airflow (MAF) Sensors

### Purpose:
- Measure the volume and temperature of incoming air
- Help the ECU calculate the correct amount of fuel for optimal combustion

### Common Issues:
- Dirty or contaminated sensor elements
- Faulty readings due to cracks in the intake duct or leaks
- Incorrect voltage signals from damaged wiring

## Exhaust Gas Recirculation (EGR) Sensors

### Purpose:
- Monitor the position of the EGR valve and the amount of exhaust gas recirculated into the intake
- Help the ECU control NOx emissions by lowering combustion temperatures

### Common Issues:
- Clogged EGR passages causing incorrect sensor readings
- Stuck or malfunctioning EGR valves
- Sensor faults due to carbon buildup or electrical failures`
      }
    },
    {
      id: 20,
      title: 'Using Diagnostic Tools',
      duration: '60 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/watch?v=How-to-Use-an-OBD-II-Scan-Tool',
        textContent: `Learn to use diagnostic tools to identify electrical and performance issues:

## Scan Tools

### Purpose:
- Retrieve and clear diagnostic trouble codes (DTCs)
- View real-time data from sensors (live data stream)
- Perform system tests, such as injector balance or EGR function tests

### Features to Look For:
- Compatibility with the vehicle's make and model
- Ability to graph live data for better visualization
- Built-in troubleshooting guides for common faults

## Multimeters

### Purpose:
- Measure voltage, resistance, and continuity in electrical circuits
- Test the integrity of sensors, wiring, and connectors

### Typical Uses:
- Checking sensor reference voltage (e.g., 5V supply)
- Verifying ground connections
- Diagnosing open or short circuits

## Oscilloscopes

### Purpose:
- Visualize signal patterns and waveforms from sensors and actuators
- Diagnose intermittent faults or degraded signals that may not trigger a DTC

### Typical Applications:
- Checking the waveform of a crankshaft or camshaft position sensor
- Verifying injector pulse timing and duration
- Identifying noise or interference in communication lines`
      }
    },
    {
      id: 21,
      title: 'Interpreting DTCs and Creating a Diagnostic Plan',
      duration: '45 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/watch?v=Understanding-Diagnostic-Trouble-Codes',
        textContent: `Develop the ability to interpret diagnostic trouble codes and outline effective diagnostic plans:

## Understanding Diagnostic Trouble Codes (DTCs)

### What They Are:
- Codes stored by the ECU when it detects an issue outside normal operating parameters

### How to Retrieve DTCs:
- Connect a scan tool to the OBD-II port
- Record the code(s) and associated freeze-frame data

### Common Code Categories:
- **P codes:** Powertrain-related (e.g., P0101 – Mass Airflow Sensor Circuit Range/Performance)
- **U codes:** Network communication issues
- **C codes:** Chassis-related
- **B codes:** Body-related

## Developing a Diagnostic Plan

### Step 1: Understand the Code's Meaning
- Refer to the manufacturer's service manual or a reliable database
- Note the conditions under which the code was set

### Step 2: Gather Data and Verify Symptoms
- Look at freeze-frame data to see what conditions existed when the fault occurred
- Use live data streams to confirm the sensor's behavior

### Step 3: Perform Visual Inspections
- Check wiring, connectors, and physical damage to components
- Look for obvious leaks, corrosion, or loose connections

### Step 4: Test the Suspect Component
- Use a multimeter or oscilloscope to confirm that the sensor or actuator is functioning correctly

### Step 5: Replace or Repair as Necessary
- If the component is faulty, replace it and retest
- If wiring is damaged, repair and verify continuity

### Step 6: Clear Codes and Verify the Fix
- After completing repairs, clear the DTCs and run the engine to confirm the issue does not reoccur`
      }
    },
    {
      id: 22,
      title: 'CAN Bus Systems and Modern ECUs',
      duration: '45 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/watch?v=CAN-Bus-Explained-Simple-Intro',
        textContent: `Gain understanding of CAN bus systems and how modern engine control modules communicate:

## CAN Bus Basics

### What It Is:
- Controller Area Network (CAN) is a communication protocol that allows different electronic control units (ECUs) to share information efficiently

### How It Works:
- Multiple ECUs (e.g., engine control module, transmission control module) are connected on a common data bus
- Data is transmitted as digital signals in packets, reducing the need for complex wiring

### Advantages:
- Faster communication speeds
- Improved system integration and coordination
- Simplified diagnostic procedures

## Modern Engine Control Units (ECUs)

### Function:
- ECUs monitor and control various engine and vehicle systems
- They use sensor data to adjust fuel injection, ignition timing, boost pressure, and emissions controls

### Features of Modern ECUs:
- Adaptive learning to optimize performance over time
- Built-in diagnostics to detect and record faults
- Ability to communicate with scan tools for troubleshooting and updates

### Challenges:
- Increased complexity requires advanced diagnostic tools
- Software or firmware issues may require reprogramming`
      }
    },
    {
      id: 23,
      title: 'Practical Exercises in Diagnosing and Fixing Electrical Faults',
      duration: '60 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/watch?v=Automotive-Oscilloscope-Study-Course',
        textContent: `Practice diagnosing and resolving common electrical faults through hands-on scenarios:

## Simulated Diagnostic Scenarios

### Scenario 1: Faulty Mass Airflow Sensor Signal
- Connect a scan tool and observe live data
- Verify the sensor's voltage range with a multimeter
- Check for damaged wiring or a dirty sensor element

### Scenario 2: Intermittent EGR Position Sensor Code
- Use a multimeter to measure the sensor's resistance at various positions
- Test the signal pattern with an oscilloscope
- Inspect the EGR valve and passages for carbon buildup

### Scenario 3: No Communication with the ECU
- Verify power and ground to the ECU
- Check the CAN bus lines for proper resistance
- Inspect connectors and wiring for corrosion or loose pins

## Hands-On Testing Practice

### Practical Exercises:
- Practice retrieving and interpreting DTCs on a test engine or simulator
- Use a multimeter to test sensor voltage and resistance
- Record and analyze waveform data from an oscilloscope
- Create a diagnostic report based on findings, outlining the steps taken and the final solution

### Professional Tips:
- Always start with basic checks - power, ground, and connections
- Use multiple diagnostic methods to confirm findings
- Don't replace parts without proper testing
- Keep detailed records of diagnostic processes
- Verify repairs with road testing under various conditions`
      }
    },
    {
      id: 24,
      title: 'Module 5 Assessment: Electrical and Diagnostic Systems',
      duration: '45 min',
      type: 'quiz',
      content: {
        questions: [
          {
            question: 'What is the primary purpose of an oxygen sensor in a diesel engine?',
            options: [
              'To measure air pressure in the intake manifold',
              'To ensure proper air-fuel ratios by monitoring oxygen levels in the exhaust',
              'To control the engine coolant temperature',
              'To determine fuel injector pulse width'
            ],
            correct: 1,
            explanation: 'Oxygen sensors monitor oxygen levels in the exhaust to provide feedback to the ECU for maintaining proper air-fuel ratios and emissions compliance.'
          },
          {
            question: 'Which tool would you use to measure voltage at a sensor connector?',
            options: [
              'Scan tool',
              'Multimeter',
              'Oscilloscope',
              'Vacuum gauge'
            ],
            correct: 1,
            explanation: 'A multimeter is the primary tool for measuring voltage, resistance, and continuity in electrical circuits.'
          },
          {
            question: 'What does a P0101 diagnostic trouble code (DTC) typically indicate?',
            options: [
              'A malfunctioning oxygen sensor',
              'An issue with the mass airflow (MAF) sensor circuit',
              'A clogged EGR valve',
              'A short circuit in the starter motor'
            ],
            correct: 1,
            explanation: 'P0101 specifically indicates a Mass Airflow Sensor Circuit Range/Performance problem.'
          },
          {
            question: 'What is a key advantage of using an oscilloscope for diagnostics?',
            options: [
              'It automatically clears DTCs',
              'It provides real-time waveform data to identify intermittent faults',
              'It calculates fuel economy',
              'It replaces the need for multimeters and scan tools'
            ],
            correct: 1,
            explanation: 'Oscilloscopes visualize signal patterns and waveforms, making them excellent for diagnosing intermittent faults and signal quality issues.'
          },
          {
            question: 'What does the term CAN bus refer to?',
            options: [
              'A type of fuel injector',
              'A communication network used by vehicle control modules',
              'A specific kind of diagnostic trouble code',
              'A physical component that filters exhaust gases'
            ],
            correct: 1,
            explanation: 'CAN (Controller Area Network) bus is a communication protocol that allows different ECUs to share information efficiently.'
          },
          {
            question: 'Which of the following could cause a mass airflow (MAF) sensor to give incorrect readings?',
            options: [
              'A stuck open thermostat',
              'A dirty or contaminated sensor element',
              'A clogged fuel injector',
              'A weak battery'
            ],
            correct: 1,
            explanation: 'Dirty or contaminated MAF sensor elements are a common cause of incorrect airflow readings.'
          },
          {
            question: 'When interpreting DTCs, what information is most helpful to begin diagnosis?',
            options: [
              'The vehicle\'s fuel economy history',
              'Freeze-frame data and live data streams',
              'The age of the vehicle\'s tires',
              'The coolant level'
            ],
            correct: 1,
            explanation: 'Freeze-frame data shows the conditions when the fault occurred, and live data streams provide current system status for effective diagnosis.'
          },
          {
            question: 'Why is it important to clear DTCs after performing repairs?',
            options: [
              'To reduce the vehicle\'s fuel consumption',
              'To confirm that the problem is fixed and ensure no new codes appear',
              'To prevent the scan tool from overheating',
              'To reset the fuel trim values'
            ],
            correct: 1,
            explanation: 'Clearing DTCs after repair allows you to confirm the fix was successful and monitor for any new or returning codes.'
          }
        ]
      }
    }
  ]
};