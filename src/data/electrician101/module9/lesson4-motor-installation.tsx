import type { Lesson } from '@/types/course';

export const lesson4MotorInstallation: Lesson = {
  id: 4,
  title: 'Motor Installation and Troubleshooting',
  duration: '40 min',
  type: 'reading',
  content: {
    textContent: `
# Motor Installation and Troubleshooting 🔧

## Motor Installation Steps

### 1. Planning
- Read motor nameplate
- Verify power source matches requirements
- Calculate wire and protection sizes
- Plan conduit routes

### 2. Mounting
- Secure to stable foundation
- Proper alignment
- Level installation
- Vibration isolation if needed

### 3. Electrical Connections
- Size conductors per NEC 430
- Install disconnect (within sight)
- Connect to starter or controller
- Install overcurrent protection
- Connect equipment ground
- Terminate per manufacturer specs

### 4. Control Wiring
- Run control circuits
- Connect start/stop buttons
- Wire overload relays
- Install pilot lights
- Test control logic

### 5. Testing
- Verify voltage at motor
- Check rotation direction
- Test overload settings
- Measure running current
- Check for abnormal noise/vibration

## Motor Nameplate Information
- Manufacturer and model
- Horsepower (HP)
- Voltage and phase
- Full load amps (FLA)
- RPM
- Service factor
- Frame size
- Duty rating
- Temperature rise
- Code letter (starting KVA)

## Motor Troubleshooting

### Motor Won't Start
- Check power supply
- Verify fuses/breakers
- Test start button/circuit
- Check overload relay
- Inspect connections
- Test starter contactor

### Motor Runs Then Stops
- Overload relay tripping
- Thermal protection
- Voltage drop issues
- Mechanical binding

### Motor Runs Hot
- Overloaded
- Poor ventilation
- Single-phasing (3-phase motor)
- Worn bearings
- Misaligned coupling

### Abnormal Noise
- Bearing failure
- Misalignment
- Loose mounting
- Internal damage

## Maintenance
- Regular visual inspections
- Lubricate bearings per schedule
- Check and tighten connections
- Keep motor clean
- Monitor temperature
- Test insulation resistance annually

## 💡 Key Takeaways
- Proper installation ensures long motor life
- Nameplate provides critical information
- Systematic troubleshooting finds problems
- Regular maintenance prevents failures
- Always follow NEC requirements
    `
  }
};

