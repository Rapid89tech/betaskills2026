import type { Module } from '@/types/course';

export const module4Turbochargers: Module = {
  id: 4,
  title: 'Turbochargers and Air Management',
  description: 'Master turbocharger operation, diagnostics, and air intake system maintenance',
  lessons: [
    {
      id: 13,
      title: 'How Turbochargers Enhance Engine Performance',
      duration: '60 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/lrCwmpjR77U',
        textContent: `
## What Is a Turbocharger?

A turbocharger is a device that increases engine efficiency and power output by forcing more air into the combustion chamber. It is driven by exhaust gases that spin a turbine connected to a compressor, which compresses intake air before it enters the engine.

## Key Benefits of Turbochargers

### Increased Airflow
- By compressing air, a turbocharger allows more oxygen into the cylinders
- Enables more fuel to be burned and produces more power
- **Critical for diesel engines** due to their slower-burning fuel characteristics

### Improved Efficiency
- Modern turbocharged engines can achieve higher fuel efficiency
- Extract additional energy from the exhaust stream
- **25-40% better fuel economy** compared to naturally aspirated engines

### Better Power-to-Weight Ratio
- Turbochargers allow smaller engines to produce power equivalent to larger engines
- Reduces vehicle weight and improves overall performance
- **Essential for heavy-duty applications** where weight matters

## How Turbochargers Work

### Exhaust Gas Energy
- Exhaust gases leave the combustion chamber and pass through the turbine side
- Spin the turbocharger at **high speeds (often over 100,000 RPM)**
- Convert waste heat energy into mechanical energy

### Compression of Intake Air
- The turbine is connected to a compressor wheel
- As the turbine spins, the compressor wheel draws in and compresses fresh air
- Delivers air to the engine at a **higher pressure (boost)**

### Intercooling Process
- Compressed air heats up during compression
- Passes through a charge air cooler (intercooler) to lower temperature
- **Cooler air is denser**, improving combustion efficiency

## Applications and Importance

### Heavy-Duty Applications
- Common in diesel engines to compensate for slower-burning diesel fuel
- Used in heavy-duty trucks, construction equipment, and performance cars
- **Improves both power output and fuel economy**

### Performance Benefits
- Increases torque at lower RPMs
- Better acceleration and hill-climbing ability
- **Reduced emissions** through more complete combustion

## Turbocharger Components

### Turbine Housing
- Contains the turbine wheel and exhaust gas passages
- Made from heat-resistant materials
- **Withstands temperatures up to 1000°C**

### Compressor Housing
- Houses the compressor wheel and intake air passages
- Designed for optimal airflow and pressure build-up
- **Aluminum construction** for weight reduction

### Center Housing (CHRA)
- Contains bearings and oil passages
- Supports both turbine and compressor wheels
- **Critical for turbocharger reliability**

## Maintenance Considerations

### Oil Quality
- Turbochargers require clean, high-quality oil
- Oil changes must be performed at recommended intervals
- **Synthetic oils preferred** for high-temperature stability

### Warm-up and Cool-down
- Allow engine to warm up before heavy loading
- Let engine idle for 2-3 minutes after hard operation
- **Prevents oil coking** in turbocharger bearings

### Air Filtration
- Clean air filters essential for turbocharger longevity
- Dirt and debris can damage compressor blades
- **Replace filters more frequently** in dusty conditions
        `
      }
    },
    {
      id: 14,
      title: 'Diagnosing Turbocharger Issues',
      duration: '60 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/x4AK2BJ0FPY',
        textContent: `
## Common Turbocharger Problems

### Excessive Oil Consumption
- **Oil leaks** can occur in the turbocharger's seals
- Oil enters intake or exhaust systems
- Causes may include worn seals, blocked oil return lines, or excessive crankcase pressure

#### Symptoms:
- Blue smoke from exhaust
- Oil in intake piping
- Rapid oil level drop
- **Oil-soaked air filter**

### Loss of Power
- If the turbo isn't generating enough boost, engine feels sluggish
- Lack of acceleration and reduced performance
- Potential causes include damaged turbine blades, worn bearings, or stuck wastegate

#### Symptoms:
- Poor acceleration
- Black smoke under load
- Lower than normal boost pressure
- **Engine feels "flat" at higher RPMs**

### Turbo Lag
- Delay between pressing accelerator and feeling boost
- Common in larger turbochargers requiring more exhaust flow
- Can indicate restrictions in intake/exhaust systems

#### Symptoms:
- Delayed power delivery
- Poor response at low RPMs
- **Excessive time to build boost pressure**

## Diagnostic Steps

### Check Boost Pressure
- Use boost gauge or diagnostic tool to verify turbo pressure
- Compare readings to manufacturer specifications
- **Normal boost pressure: 15-30 PSI** depending on engine

#### Testing Procedure:
- Connect boost gauge to intake manifold
- Perform full-throttle acceleration test
- Monitor peak boost pressure
- **Check for boost leaks** if pressure is low

### Inspect for Oil Leaks
- Remove intake piping and look for oil residue
- Check turbo housing and exhaust side for leakage
- **Oil should not be present** in intake system

#### Inspection Points:
- Turbocharger seals
- Oil feed and return lines
- Crankcase ventilation system
- **Air filter housing**

### Examine Turbocharger Components
- Inspect turbine and compressor wheels for damage
- Check wastegate or variable geometry mechanism function
- **Look for bent or broken blades**

#### Visual Inspection:
- Remove intake and exhaust connections
- Check wheel movement (should spin freely)
- Look for scoring or wear on wheel surfaces
- **Check for shaft play** (excessive movement indicates wear)

### Listen for Unusual Noises
- **Whining or grinding** sounds indicate worn bearings
- Hissing or whistling may suggest air leaks
- Rattling can indicate loose or damaged components

#### Sound Diagnosis:
- Engine idling: Should be relatively quiet
- Under load: Smooth whooshing sound normal
- **Any grinding or metal-on-metal noise** requires immediate attention

### Test Oil Supply and Drain Lines
- Ensure turbo receives adequate oil flow
- Check that return line is not blocked
- **Oil starvation** is a major cause of turbo failure

#### Oil System Check:
- Verify oil pressure at turbo feed line
- Check oil return line for restrictions
- Inspect oil quality and change interval
- **Clean oil passages** if contaminated

## Advanced Diagnostic Techniques

### Boost Leak Testing
- Pressurize intake system to locate leaks
- Use soap solution to identify leak points
- **Even small leaks** can significantly affect performance

### Exhaust Back Pressure Testing
- High back pressure can damage turbocharger
- Check for restrictions in exhaust system
- **Normal back pressure: less than 3 PSI** at rated power

### Oil Analysis
- Send oil samples for laboratory analysis
- Can detect bearing wear metals
- **Early warning** of turbocharger problems
        `
      }
    },
    {
      id: 15,
      title: 'Air Filters and Intake System Maintenance',
      duration: '45 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/MS9JgSwuTQw',
        textContent: `
## Importance of Clean Intake Air

### Critical for Engine Performance
- Clean air is essential for efficient combustion
- Contaminants like dust and debris can damage turbocharger blades
- **Poor airflow reduces boost pressure** and increases engine wear

### Impact on Turbocharger
- Dirty air can erode compressor wheel blades
- Debris can cause imbalance and bearing failure
- **Clean air extends turbocharger life** significantly

## Air Filter Maintenance

### Types of Air Filters

#### Paper Filters
- **Disposable** and must be replaced at regular intervals
- Most common type in diesel applications
- Provide excellent filtration efficiency
- **Cannot be cleaned** - replacement only

#### Foam or Cotton Gauze Filters
- **Reusable** filters requiring periodic cleaning
- Can be washed and re-oiled
- Higher initial cost but longer service life
- **Popular in performance applications**

### Cleaning and Replacement Intervals

#### Standard Conditions
- Replace paper filters every **15,000-30,000 miles**
- Clean reusable filters every **10,000-15,000 miles**
- Follow manufacturer recommendations

#### Severe Conditions
- **Dusty or off-road environments** require more frequent service
- Construction sites, mining operations
- Replace/clean filters **2-3 times more frequently**

#### Service Indicators
- Visual inspection of filter element
- Restriction gauge readings
- **Engine performance degradation**

### Filter Inspection Techniques

#### Visual Inspection
- Check for tears or holes in filter media
- Look for oil contamination
- **Replace if damaged** regardless of mileage

#### Light Test
- Hold filter up to light source
- Filter should show even light transmission
- **Dark spots indicate** clogging

#### Restriction Testing
- Use vacuum gauge on intake side
- Maximum restriction: **20-25 inches H2O**
- Replace filter if restriction exceeds limits

## Intake System Inspections and Cleaning

### Check for Obstructions
- Ensure air intake ducts are clear of debris
- Remove leaves, nests, or foreign objects
- **Check for damaged** or collapsed intake hoses

#### Common Blockages
- Leaves and vegetation
- Small animals or nests
- Ice formation in cold weather
- **Road debris** and mud

### Inspect and Clean the Intercooler
- Remove intercooler for thorough cleaning
- Wash with mild solvent or soapy water
- **Dry thoroughly** before reinstalling

#### Cleaning Procedure
- Remove intercooler from vehicle
- Flush with cleaning solution
- Use compressed air to remove debris
- **Inspect for internal damage**

### Examine Turbo Inlet and Outlet Connections
- Look for oil buildup or dirt accumulation
- Check for loose clamps causing leaks
- **Tighten all connections** to specification

#### Connection Points
- Turbocharger inlet pipe
- Intercooler connections
- Intake manifold joints
- **All hose clamps and couplers**

### Avoid Over-Oiling Filters
- Over-oiling reusable filters can cause problems
- Excess oil travels into turbo and intake system
- **Can damage mass airflow sensors**

#### Proper Oiling Technique
- Use only recommended filter oil
- Apply thin, even coating
- Allow oil to penetrate filter media
- **Remove excess oil** before installation

## Intake System Maintenance Schedule

### Daily Checks
- Visual inspection of air filter indicator
- Check for loose or damaged intake components
- **Monitor for unusual noises**

### Weekly Inspections
- Check air filter restriction gauge
- Inspect intake ducting for damage
- **Look for signs of air leaks**

### Monthly Service
- Remove and inspect air filter
- Clean reusable filters if necessary
- **Check intercooler for oil buildup**

### Annual Maintenance
- Complete intake system cleaning
- Replace all intake hoses and clamps
- **Pressure test entire intake system**

## Performance Benefits of Proper Maintenance

### Improved Engine Performance
- Maximum airflow to turbocharger
- Optimal boost pressure development
- **Better fuel economy**

### Extended Component Life
- Reduced turbocharger wear
- Cleaner combustion chambers
- **Lower maintenance costs**

### Emission Compliance
- Proper air-fuel ratios
- Complete combustion
- **Reduced particulate emissions**
        `
      }
    },
    {
      id: 16,
      title: 'Charge Air Coolers and Air Intake Efficiency',
      duration: '30 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/lqLwKxTHQaM',
        textContent: `
## What Is a Charge Air Cooler?

### Definition and Purpose
- Also known as an **intercooler**, it's a heat exchanger
- Designed to cool compressed air before it enters the engine
- Located between turbocharger and engine intake manifold
- **Reduces intake air temperature**, increasing air density

### How It Works
- Compressed air from turbocharger is hot (often 200-300°F)
- Air passes through intercooler core
- **Heat is transferred** to ambient air or coolant
- Cooled air (closer to ambient temperature) enters engine

## Benefits of Intercooling

### Improved Combustion Efficiency
- **Cooler, denser air** allows more oxygen into cylinder
- Results in better fuel burn and increased power
- Typical power increase: **10-20%** with effective intercooling

### Lower Exhaust Gas Temperatures (EGT)
- Reduced intake air temperature helps keep EGTs within safe limits
- **Prolongs turbocharger life** and exhaust system components
- Prevents thermal stress and component failure

### Enhanced Reliability
- Maintaining consistent intake air temperature prevents detonation
- **Reduces stress** on internal engine components
- Improves engine longevity and reliability

### Fuel Economy Benefits
- More efficient combustion leads to better fuel economy
- **Reduced fuel consumption** at same power output
- Environmental benefits through lower emissions

## Types of Charge Air Coolers

### Air-to-Air Intercoolers
- Use ambient air to cool compressed charge air
- **Most common type** in truck applications
- Simple design with no coolant connections
- Mounted in front of radiator for maximum airflow

#### Advantages:
- Simple installation and maintenance
- No coolant requirements
- **Excellent cooling efficiency** at highway speeds

#### Disadvantages:
- Less effective at low speeds or idle
- Larger size requirements
- **Heat soak** during extended idle periods

### Air-to-Water Intercoolers
- Use engine coolant or separate coolant loop
- **More compact design** than air-to-air
- Consistent cooling regardless of vehicle speed
- Common in marine and stationary applications

#### Advantages:
- Compact size
- Consistent cooling performance
- **Better packaging** in tight spaces

#### Disadvantages:
- More complex system
- Additional coolant requirements
- **Higher maintenance** needs

## Intercooler Design Considerations

### Core Construction
- **Tube and fin design** for maximum heat transfer
- Aluminum construction for weight and corrosion resistance
- Fin density optimized for airflow and heat transfer

### Pressure Drop
- Balance between cooling efficiency and pressure loss
- **Minimize pressure drop** while maximizing heat transfer
- Typical pressure drop: 1-3 PSI through intercooler

### Sizing and Placement
- Size determined by engine airflow requirements
- **Placement critical** for effective cooling
- Consider airflow, packaging, and plumbing requirements

## Maintenance of Charge Air Coolers

### Inspect for Leaks
- Check intercooler and hoses for air or oil leakage
- Use pressure test to confirm system integrity
- **Even small leaks** can significantly reduce performance

#### Leak Detection Methods:
- Visual inspection for oil stains
- Soap solution test under pressure
- **Pressure decay testing**
- Listen for hissing sounds

### Clean the Core
- Remove intercooler periodically for cleaning
- Flush to remove dirt, oil residue, or sludge
- **External cleaning** also important for heat transfer

#### Cleaning Procedure:
- Remove intercooler from vehicle
- Flush internally with degreasing solution
- Clean external fins with compressed air
- **Inspect for damage** during cleaning

### Ensure Proper Mounting and Connections
- Check that clamps and couplings are secure
- Verify proper mounting bracket condition
- **Any loose connections** can cause boost leaks

#### Connection Points:
- Turbocharger outlet to intercooler inlet
- Intercooler outlet to intake manifold
- All mounting brackets and supports
- **Hose clamps and couplers**

## Performance Optimization

### Temperature Monitoring
- Monitor intake air temperature after intercooler
- **Target temperature**: within 50°F of ambient
- Higher temperatures indicate cooling system problems

### Airflow Considerations
- Ensure adequate airflow through intercooler
- Remove debris from external fins
- **Check fan operation** if equipped

### System Pressure Testing
- Verify intercooler can handle boost pressures
- Test for internal leaks or restrictions
- **Maximum test pressure**: 150% of operating boost

## Troubleshooting Common Issues

### Poor Cooling Performance
- Check for blocked external fins
- Verify adequate airflow
- **Internal contamination** may require cleaning

### Pressure Leaks
- Pressure test entire system
- Check all connections and clamps
- **Replace damaged components** immediately

### Oil Contamination
- Indicates turbocharger seal problems
- Clean intercooler thoroughly
- **Address root cause** at turbocharger
        `
      }
    },
    {
      id: 17,
      title: 'Module 4 Quiz: Turbochargers and Air Management',
      duration: '15 min',
      type: 'quiz',
      content: {
        questions: [
          {
            question: 'What is the main function of a turbocharger in a diesel engine?',
            options: [
              'To reduce engine oil consumption',
              'To improve air-fuel mixture quality at low RPM',
              'To compress air entering the engine, increasing power output',
              'To decrease exhaust emissions without changing power'
            ],
            correct: 2,
            explanation: 'A turbocharger compresses intake air to increase the amount of oxygen available for combustion, directly increasing power output.'
          },
          {
            question: 'Which component of a turbocharger is spun by exhaust gases?',
            options: [
              'The compressor wheel',
              'The turbine wheel',
              'The intercooler core',
              'The wastegate'
            ],
            correct: 1,
            explanation: 'The turbine wheel is spun by exhaust gases, which in turn drives the compressor wheel to compress intake air.'
          },
          {
            question: 'What is a common symptom of excessive turbo lag?',
            options: [
              'Immediate power response after pressing the accelerator',
              'A delay in power delivery until the engine reaches higher RPM',
              'Decreased engine oil pressure',
              'Reduced coolant temperature at idle'
            ],
            correct: 1,
            explanation: 'Turbo lag is characterized by a delay between accelerator input and power delivery, as the turbocharger needs time to build boost pressure.'
          },
          {
            question: 'What can cause excessive oil consumption in a turbocharger?',
            options: [
              'Blocked intercooler passages',
              'Worn or damaged turbo seals',
              'An overfilled coolant reservoir',
              'Faulty air filters'
            ],
            correct: 1,
            explanation: 'Worn or damaged turbo seals allow oil to leak into the intake or exhaust systems, causing excessive oil consumption.'
          },
          {
            question: 'Why is it important to keep air filters clean?',
            options: [
              'To ensure the turbocharger can generate maximum boost pressure',
              'To maintain proper ignition timing',
              'To lower the temperature of engine oil',
              'To keep the fuel injectors from clogging'
            ],
            correct: 0,
            explanation: 'Clean air filters ensure unrestricted airflow to the turbocharger, allowing it to generate maximum boost pressure and operate efficiently.'
          },
          {
            question: 'How does a charge air cooler (intercooler) improve engine performance?',
            options: [
              'By increasing the speed of the turbocharger\'s turbine',
              'By cooling compressed air, increasing air density and combustion efficiency',
              'By reducing the need for oil changes',
              'By eliminating the need for a wastegate'
            ],
            correct: 1,
            explanation: 'An intercooler cools the compressed air from the turbocharger, making it denser and providing more oxygen for combustion, improving efficiency.'
          },
          {
            question: 'What is the most likely cause of oil leaks around the turbocharger?',
            options: [
              'Excessive coolant pressure',
              'Clogged air filters',
              'Damaged or worn turbo seals',
              'Incorrect fuel injector timing'
            ],
            correct: 2,
            explanation: 'Damaged or worn turbo seals are the most common cause of oil leaks around the turbocharger, allowing oil to escape into the intake or exhaust systems.'
          },
          {
            question: 'When should you inspect and clean an intercooler?',
            options: [
              'Every time you change the air filter',
              'Periodically or when oil buildup is observed in the intake system',
              'Only after the engine overheats',
              'Never, as intercoolers are sealed and self-cleaning'
            ],
            correct: 1,
            explanation: 'Intercoolers should be inspected and cleaned periodically or when oil buildup is observed, as contamination can reduce cooling efficiency.'
          }
        ]
      }
    }
  ]
};