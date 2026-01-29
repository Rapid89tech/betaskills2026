
export const generateMechanicContent = (title: string): string => {
  const lowerTitle = title.toLowerCase();
  
  // Comprehensive Motor Mechanic Petrol Engine content
  if (lowerTitle.includes('petrol') || lowerTitle.includes('engine') || lowerTitle.includes('motor') || 
      lowerTitle.includes('mechanic') || lowerTitle.includes('automotive') || lowerTitle.includes('car')) {
    
    if (lowerTitle.includes('introduction') || lowerTitle.includes('fundamentals') || lowerTitle.includes('basic')) {
      return `
# ${title}

🚗 **Welcome to Professional Petrol Engine Mechanics Training**

## 🎯 Learning Objectives
- Master the four-stroke engine cycle and combustion principles
- Identify and understand key engine components and their functions
- Develop diagnostic skills for troubleshooting engine problems
- Learn proper maintenance procedures and safety protocols

## 🔧 Essential Engine Knowledge

### The Four-Stroke Engine Cycle
Understanding how petrol engines convert fuel into motion through four distinct phases:

**1. Intake Stroke (Suck)**
- Piston moves down, creating vacuum
- Intake valve opens, drawing air-fuel mixture
- Foundation for proper combustion

**2. Compression Stroke (Squash)** 
- Both valves close, piston moves up
- Air-fuel mixture compressed to 1/10th original volume
- Higher compression = more power output

**3. Power Stroke (Bang)**
- Spark plug ignites compressed mixture
- Explosion forces piston down
- Only stroke that produces power

**4. Exhaust Stroke (Blow)**
- Exhaust valve opens, piston pushes up
- Burnt gases expelled from cylinder
- Prepares for next intake cycle

### 🛠️ Critical Engine Components

**Cylinder Block & Head**
- Houses pistons and provides mounting structure
- Contains coolant passages for temperature control
- Sealed by head gasket under high pressure

**Piston Assembly**
- Converts combustion pressure to mechanical force
- Connected to crankshaft via connecting rod
- Equipped with rings for compression sealing

**Valve Train System**
- Camshaft controls precise valve timing
- Intake valves allow fuel mixture entry
- Exhaust valves enable waste gas removal

**Fuel & Ignition Systems**
- Fuel injectors deliver precise fuel amounts
- Spark plugs provide ignition timing
- ECU controls entire fuel management

💡 **Pro Mechanic Tip**: Engine timing is everything - even small deviations can cause major performance issues.

🎯 **Real-World Application**: Modern engines operate with tolerances measured in thousandths of an inch - precision is critical for professional repair work.

✅ **Mastery Checkpoint**: You'll understand how each component contributes to overall engine performance and reliability.
`;
    }
    
    if (lowerTitle.includes('fuel') || lowerTitle.includes('injection') || lowerTitle.includes('carburetor')) {
      return `
# ${title}

⛽ **Advanced Fuel System Technology & Diagnostics**

## 🎯 Learning Objectives
- Master modern fuel injection systems and components
- Understand fuel mixture ratios and their effects on performance
- Learn diagnostic procedures for fuel system problems
- Develop skills in fuel system maintenance and repair

## 🔬 Fuel System Architecture

### Modern Fuel Injection Systems
Advanced electronic systems that precisely control fuel delivery:

**Port Fuel Injection (PFI)**
- Injectors spray fuel into intake ports
- Good mixing with incoming air
- Reliable and cost-effective technology

**Direct Injection (DI)**
- Fuel injected directly into combustion chamber
- Higher compression ratios possible
- Improved fuel economy and power output

**Dual Injection Systems**
- Combines port and direct injection
- Optimizes performance across all operating conditions
- Reduces emissions while maintaining power

### ⚖️ Air-Fuel Ratio Management

**Stoichiometric Ratio (14.7:1)**
- Perfect balance for complete combustion
- Monitored by oxygen sensors
- Maintained by ECU for optimal efficiency

**Rich Mixture (12:1 - 13:1)**
- Extra fuel for cooling and power
- Used during acceleration and cold starts
- Can cause carbon buildup if excessive

**Lean Mixture (15:1 - 16:1)**
- Less fuel for economy
- Higher combustion temperatures
- Risk of engine knock and valve damage

### 🔧 Essential Fuel Components

**High-Pressure Fuel System**
- Electric fuel pump delivers 40-60 PSI
- Fuel rail distributes to all injectors
- Pressure regulator maintains consistency

**Fuel Management Electronics**
- ECU calculates injection timing and duration
- Mass airflow sensor measures air intake
- Throttle position sensor indicates driver demand

**Filtration & Quality Control**
- Fuel filter removes contaminants
- Water separator protects injection system
- Fuel quality affects system longevity

🔧 **Diagnostic Expertise**: Modern fuel systems require scan tools and pressure testing equipment for proper diagnosis.

💡 **Professional Insight**: Fuel system problems often present as performance issues - systematic testing is essential for accurate diagnosis.

✅ **Technical Mastery**: You'll diagnose fuel delivery problems and understand the relationship between fuel quality and engine performance.
`;
    }
    
    if (lowerTitle.includes('ignition') || lowerTitle.includes('spark') || lowerTitle.includes('coil')) {
      return `
# ${title}

⚡ **Ignition System Technology & Performance Optimization**

## 🎯 Learning Objectives
- Master ignition timing and spark delivery systems
- Understand different ignition system types and components
- Learn diagnostic techniques for ignition problems
- Develop skills in ignition system maintenance and tuning

## 🔥 Ignition System Fundamentals

### Spark Generation Process
Converting low voltage to high-voltage spark at precisely the right moment:

**Primary Circuit (12V)**
- Battery supplies power to ignition coil
- ECU controls switching for timing
- Current flow creates magnetic field

**Secondary Circuit (30,000V+)**
- Coil transforms voltage for spark generation
- High voltage travels to spark plugs
- Spark jumps gap to ignite mixture

### ⚙️ Modern Ignition Technologies

**Distributorless Ignition (DIS)**
- Eliminates mechanical distributor
- Coil-on-plug or coil-near-plug design
- Computer-controlled timing for all cylinders

**Coil-on-Plug Systems**
- Individual coil for each cylinder
- Maximum spark energy delivery
- Eliminates spark plug wires

**Variable Timing Systems**
- ECU adjusts timing based on conditions
- Optimizes for performance or economy
- Prevents knock under all loads

### 🔧 Critical Ignition Components

**Ignition Coils**
- Step-up transformers for voltage multiplication
- Primary and secondary windings
- Heat dissipation critical for longevity

**Spark Plugs**
- Electrode gap determines spark characteristics
- Heat range matched to engine requirements
- Platinum/iridium for extended life

**Ignition Control Module**
- Processes sensor inputs for timing decisions
- Controls coil charging and firing
- Protects system from damage

### ⚡ Timing & Performance Factors

**Base Timing Settings**
- Initial timing set at idle conditions
- Foundation for all timing calculations
- Critical for proper engine operation

**Advance Mechanisms**
- Centrifugal advance for RPM response
- Vacuum advance for load conditions
- Electronic systems provide infinite variability

🔧 **Diagnostic Excellence**: Ignition problems can mimic fuel system issues - proper testing equipment and procedures are essential.

💡 **Performance Tuning**: Advanced timing control can optimize power output while maintaining reliability and emissions compliance.

✅ **Expert Knowledge**: You'll understand how ignition timing affects engine performance, fuel economy, and emissions output.
`;
    }
    
    if (lowerTitle.includes('cooling') || lowerTitle.includes('radiator') || lowerTitle.includes('thermostat')) {
      return `
# ${title}

🌡️ **Engine Cooling System Technology & Thermal Management**

## 🎯 Learning Objectives
- Master cooling system operation and heat transfer principles
- Understand component functions and failure modes
- Learn diagnostic procedures for cooling problems
- Develop skills in cooling system maintenance and repair

## 🔄 Cooling System Operation

### Heat Transfer Principles
Managing the tremendous heat generated by combustion:

**Combustion Heat Generation**
- Peak temperatures reach 4,000°F (2,200°C)
- Only 30% of fuel energy becomes useful work
- Remaining 70% becomes waste heat

**Heat Removal Methods**
- Liquid cooling transfers heat to radiator
- Air flow removes heat from coolant
- Thermostat regulates operating temperature

### 🛠️ Essential Cooling Components

**Engine Block & Head Passages**
- Water jackets surround cylinders and valves
- Coolant flow designed for even heat distribution
- Freeze plugs prevent block damage

**Radiator & Heat Exchanger**
- Tube and fin construction maximizes surface area
- Cross-flow or down-flow designs
- Pressure cap increases boiling point

**Water Pump & Circulation**
- Centrifugal pump driven by engine
- Impeller design affects flow characteristics
- Bearing failure causes leaks and noise

**Thermostat & Temperature Control**
- Wax pellet or electronic operation
- Opens at predetermined temperature
- Allows engine to reach operating temperature quickly

### 🌡️ Cooling System Diagnostics

**Temperature Monitoring**
- Coolant temperature sensor provides ECU feedback
- Temperature gauge indicates system health
- Overheating warning prevents engine damage

**Pressure Testing**
- System pressure reveals leaks and weak points
- Radiator cap testing ensures proper pressure
- Cooling system flushing removes contamination

**Flow Testing**
- Restricted flow causes hot spots
- Thermostat testing verifies operation
- Water pump efficiency affects cooling capacity

### 💧 Coolant Technology

**Ethylene Glycol Coolants**
- 50/50 mix with water for optimal protection
- Corrosion inhibitors protect metal components
- Service life typically 3-5 years

**Extended Life Coolants**
- Organic acid technology (OAT)
- Longer service intervals (5+ years)
- Specific formulations for different metals

🔧 **Professional Diagnosis**: Cooling system problems can cause catastrophic engine damage - early detection and proper repair are critical.

💡 **Maintenance Excellence**: Regular coolant service prevents expensive repairs and ensures reliable operation in all conditions.

✅ **Technical Expertise**: You'll diagnose cooling system problems and understand the relationship between cooling efficiency and engine longevity.
`;
    }
    
    if (lowerTitle.includes('diagnostic') || lowerTitle.includes('troubleshoot') || lowerTitle.includes('problem')) {
      return `
# ${title}

🔍 **Advanced Engine Diagnostics & Troubleshooting**

## 🎯 Learning Objectives
- Master systematic diagnostic procedures and methodologies
- Learn to use professional diagnostic equipment effectively
- Understand engine data interpretation and analysis
- Develop skills in complex problem-solving techniques

## 🛠️ Professional Diagnostic Approach

### Systematic Diagnostic Process
Professional mechanics follow proven procedures to identify problems efficiently:

**Initial Assessment**
- Customer complaint analysis and verification
- Visual inspection for obvious problems
- Preliminary testing to narrow possibilities

**Data Gathering**
- Scan tool connection for diagnostic codes
- Live data monitoring during operation
- Performance testing under various conditions

**Analysis & Verification**
- Code interpretation and root cause analysis
- Component testing to confirm diagnosis
- Repair verification and system testing

### 📊 Diagnostic Equipment Mastery

**OBD-II Scan Tools**
- Reads diagnostic trouble codes (DTCs)
- Monitors live sensor data streams
- Performs component activation tests

**Oscilloscopes & Graphing Meters**
- Voltage and current waveform analysis
- Timing relationship verification
- Sensor signal quality assessment

**Pressure & Vacuum Testing**
- Engine compression testing
- Fuel pressure and volume testing
- Intake manifold vacuum analysis

### 🔧 Engine Performance Analysis

**Compression Testing**
- Cylinder pressure indicates internal condition
- Wet vs. dry testing reveals specific problems
- Compression ratio calculations

**Vacuum Testing**
- Manifold vacuum indicates engine health
- Vacuum patterns reveal specific problems
- Vacuum gauge interpretation skills

**Emissions Testing**
- Exhaust gas analysis for combustion efficiency
- Lambda sensor functionality verification
- Catalytic converter efficiency testing

### 💻 Electronic System Diagnostics

**Engine Control Module (ECM)**
- Parameter identification (PID) monitoring
- Fuel trim analysis and interpretation
- Ignition timing verification

**Sensor Testing & Calibration**
- Mass airflow sensor operation
- Throttle position sensor calibration
- Oxygen sensor response testing

**Actuator Testing**
- Fuel injector operation and pattern testing
- Ignition coil performance verification
- Idle air control valve function

🔧 **Diagnostic Excellence**: Modern engines require sophisticated testing equipment and systematic procedures for accurate problem identification.

💡 **Problem-Solving Skills**: Complex problems often have multiple contributing factors - methodical testing reveals the complete picture.

✅ **Professional Competency**: You'll develop the analytical skills and technical knowledge to diagnose the most challenging engine problems efficiently.
`;
    }
    
    if (lowerTitle.includes('maintenance') || lowerTitle.includes('service') || lowerTitle.includes('oil')) {
      return `
# ${title}

🔧 **Preventive Maintenance & Service Excellence**

## 🎯 Learning Objectives
- Master preventive maintenance schedules and procedures
- Learn proper service techniques and quality standards
- Understand component replacement intervals and criteria
- Develop customer service and documentation skills

## 📋 Maintenance Planning & Scheduling

### Service Interval Development
Establishing maintenance schedules based on manufacturer specifications and operating conditions:

**Manufacturer Recommendations**
- Factory service schedules for optimal reliability
- Severe service conditions requiring shorter intervals
- Warranty considerations and compliance requirements

**Operating Condition Factors**
- Stop-and-go city driving increases service needs
- Highway driving generally easier on components
- Environmental conditions affect service requirements

### 🛠️ Essential Service Procedures

**Engine Oil Service**
- Oil quality analysis and viscosity selection
- Filter replacement and system inspection
- Proper disposal and environmental compliance

**Air Filtration System**
- Air filter inspection and replacement criteria
- Intake system cleaning and maintenance
- Mass airflow sensor cleaning procedures

**Fuel System Maintenance**
- Fuel filter replacement intervals
- Fuel injector cleaning and testing
- Fuel system additive recommendations

**Ignition System Service**
- Spark plug inspection and replacement
- Ignition wire and coil testing
- Timing verification and adjustment

### 🔍 Inspection & Quality Control

**Visual Inspection Procedures**
- Belt and hose condition assessment
- Fluid leak detection and source identification
- Corrosion and wear pattern analysis

**Performance Testing**
- Engine idle quality and smoothness
- Acceleration response and power output
- Emissions compliance verification

**Documentation & Communication**
- Service record maintenance and tracking
- Customer communication and education
- Warranty compliance documentation

### ⚙️ Component Replacement Guidelines

**Wear Pattern Recognition**
- Normal vs. abnormal wear indicators
- Component life expectancy factors
- Replacement timing optimization

**Quality Parts Selection**
- OEM vs. aftermarket part considerations
- Part number verification and compatibility
- Warranty coverage and customer protection

🔧 **Service Excellence**: Proper maintenance prevents expensive repairs and ensures reliable vehicle operation throughout its service life.

💡 **Customer Education**: Helping customers understand maintenance importance builds trust and ensures continued service relationships.

✅ **Professional Standards**: You'll master the skills needed to provide comprehensive maintenance services that meet or exceed industry standards.
`;
    }
    
    if (lowerTitle.includes('electrical') || lowerTitle.includes('wiring') || lowerTitle.includes('battery')) {
      return `
# ${title}

⚡ **Automotive Electrical Systems & Diagnostics**

## 🎯 Learning Objectives
- Master automotive electrical principles and circuit analysis
- Understand modern vehicle electrical architecture
- Learn diagnostic techniques for electrical problems
- Develop skills in electrical system repair and maintenance

## 🔌 Electrical System Fundamentals

### Basic Electrical Principles
Understanding the foundation of automotive electrical systems:

**Ohm's Law Applications**
- Voltage, current, and resistance relationships
- Power calculations and circuit analysis
- Troubleshooting using electrical measurements

**Circuit Types & Analysis**
- Series circuits and voltage drops
- Parallel circuits and current division
- Complex circuits with mixed configurations

### 🔋 Power Supply Systems

**Battery Technology**
- Lead-acid battery construction and operation
- Battery testing procedures and maintenance
- AGM and gel battery characteristics

**Charging System Operation**
- Alternator construction and principles
- Voltage regulation and load response
- Belt-driven vs. gear-driven systems

**Starting System Components**
- Starter motor operation and testing
- Solenoid function and diagnostics
- Ignition switch and safety circuits

### 🧠 Electronic Control Systems

**Engine Control Module (ECM)**
- Microprocessor operation and programming
- Input sensor signal processing
- Output device control strategies

**Network Communication**
- CAN bus protocol and operation
- Module communication diagnostics
- Network fault isolation techniques

**Sensor Technology**
- Analog vs. digital sensor types
- Signal conditioning and processing
- Sensor calibration procedures

🔧 **Diagnostic Tools**: Modern electrical diagnosis requires digital multimeters, oscilloscopes, and specialized scan tools.

💡 **Safety First**: Electrical work requires proper safety procedures to prevent injury and component damage.

✅ **Expert Skills**: You'll master electrical troubleshooting techniques used by professional automotive technicians.
`;
    }
    
    if (lowerTitle.includes('brake') || lowerTitle.includes('abs') || lowerTitle.includes('stopping')) {
      return `
# ${title}

🛑 **Brake System Technology & Safety**

## 🎯 Learning Objectives
- Master hydraulic brake system principles and operation
- Understand ABS and electronic brake control systems
- Learn brake inspection and diagnostic procedures
- Develop skills in brake service and repair techniques

## 🔧 Hydraulic Brake Fundamentals

### Pascal's Law Application
Understanding how brake systems multiply force:

**Hydraulic Advantage**
- Small force applied creates large braking force
- Brake fluid transmits pressure equally
- Master cylinder to brake caliper operation

**System Components**
- Master cylinder and brake fluid reservoir
- Brake lines and flexible hoses
- Brake calipers and wheel cylinders

### 🚗 Modern Brake Technologies

**Anti-Lock Brake Systems (ABS)**
- Wheel speed sensor monitoring
- Hydraulic modulator operation
- Electronic control unit functions

**Electronic Stability Control (ESC)**
- Vehicle dynamics monitoring
- Individual wheel brake application
- Engine torque management integration

**Brake Assist Systems**
- Emergency braking detection
- Hydraulic pressure amplification
- Collision avoidance integration

### 🔍 Brake Inspection Procedures

**Visual Inspection**
- Brake pad thickness measurement
- Rotor surface condition assessment
- Brake line and hose inspection

**Performance Testing**
- Brake pedal feel evaluation
- Stopping distance measurement
- ABS function verification

**Fluid Analysis**
- Brake fluid moisture content testing
- Contamination detection
- Service interval requirements

🔧 **Safety Critical**: Brake systems are safety-critical components requiring precise service procedures and quality parts.

💡 **Professional Standards**: Brake work must meet strict safety standards and manufacturer specifications.

✅ **Life-Saving Skills**: You'll master brake system service techniques that ensure vehicle and passenger safety.
`;
    }

    if (lowerTitle.includes('transmission') || lowerTitle.includes('gearbox') || lowerTitle.includes('clutch')) {
      return `
# ${title}

⚙️ **Transmission Systems & Driveline Technology**

## 🎯 Learning Objectives
- Master manual and automatic transmission operation
- Understand clutch systems and torque converters
- Learn transmission diagnostic procedures
- Develop skills in driveline service and repair

## 🔧 Manual Transmission Systems

### Gear Train Principles
Understanding how gears multiply torque and change speed:

**Gear Ratios & Torque Multiplication**
- Input to output speed relationships
- Torque multiplication through gear reduction
- Synchronizer operation for smooth shifting

**Clutch System Operation**
- Friction disc and pressure plate function
- Release bearing and hydraulic actuation
- Clutch adjustment and replacement procedures

### 🏎️ Automatic Transmission Technology

**Torque Converter Operation**
- Fluid coupling principles
- Torque multiplication and lockup
- Stall speed and performance characteristics

**Planetary Gear Sets**
- Sun gear, ring gear, and planet carrier
- Gear ratio combinations through band/clutch control
- Electronic shift control systems

**Hydraulic Control Systems**
- Valve body operation and oil flow
- Governor and throttle valve functions
- Electronic pressure control solenoids

### 🔍 Transmission Diagnostics

**Fluid Analysis**
- ATF condition and contamination assessment
- Metal particle detection and analysis
- Service interval requirements

**Performance Testing**
- Shift quality and timing evaluation
- Stall speed testing procedures
- Road test diagnostic procedures

**Electronic Diagnostics**
- Transmission control module scanning
- Solenoid function testing
- Adaptive learning procedures

🔧 **Precision Work**: Transmission repair requires precise measurements and adherence to manufacturer specifications.

💡 **Complex Systems**: Modern transmissions integrate mechanical, hydraulic, and electronic control systems.

✅ **Advanced Skills**: You'll master transmission service techniques for both manual and automatic systems.
`;
    }
  }

  // Enhanced content for other automotive topics
  if (lowerTitle.includes('safety') || lowerTitle.includes('workshop')) {
    return `
# ${title}

🦺 **Workshop Safety & Professional Standards**

## 🎯 Learning Objectives
- Master automotive workshop safety procedures
- Understand hazard identification and risk management
- Learn proper tool usage and maintenance
- Develop professional work habits and standards

## ⚠️ Safety Fundamentals

### Personal Protective Equipment (PPE)
Essential protection for automotive work:

**Eye Protection**
- Safety glasses for impact protection
- Face shields for grinding operations
- Chemical splash protection requirements

**Hand Protection**
- Cut-resistant gloves for sharp components
- Chemical-resistant gloves for solvents
- Heat-resistant gloves for exhaust work

**Respiratory Protection**
- Dust masks for brake service
- Respirators for paint and chemical work
- Ventilation requirements for enclosed spaces

### 🔧 Tool Safety & Maintenance

**Hand Tool Safety**
- Proper tool selection for each task
- Regular inspection for wear and damage
- Safe storage and organization

**Power Tool Operations**
- Electrical safety and grounding
- Guards and safety devices
- Proper maintenance procedures

**Lifting Equipment**
- Vehicle lift inspection and operation
- Jack and jack stand safety procedures
- Load capacity and weight distribution

### 🏭 Workshop Organization

**Housekeeping Standards**
- Clean work area maintenance
- Proper waste disposal procedures
- Emergency equipment accessibility

**Fire Prevention**
- Flammable material storage
- Hot work procedures
- Fire extinguisher types and locations

**Environmental Compliance**
- Fluid disposal regulations
- Air quality management
- Waste stream segregation

🦺 **Safety First**: A safe workshop protects both technicians and customers while maintaining professional standards.

💡 **Professional Image**: Clean, organized shops reflect quality workmanship and attention to detail.

✅ **Industry Standards**: You'll master safety procedures required in professional automotive facilities.
`;
  }

  return '';
};
