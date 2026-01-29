import type { Lesson } from '@/types/course';

export const lesson3MotorControls: Lesson = {
  id: 3,
  title: 'Motor Control Systems and VFDs',
  duration: '50 min',
  type: 'reading',
  content: {
    textContent: `
# Motor Control Systems ⚡🎛️

## Motor Starters

### Manual Starters
- Simple on/off control
- Thermal overload protection
- Fractional to 10 HP
- Push-button operation

### Magnetic Starters
- Remote control capability
- Electromagnetic contactor
- Overload relay protection
- Available in various sizes
- Three-phase and single-phase

## Motor Control Components

### Contactors
- Electromagnetic switches
- Control high current loads
- Rated by voltage and current
- Normally open or normally closed

### Overload Relays
- Protect motor from overload
- Thermal or electronic types
- Trip at 115-125% of FLA
- Manual or automatic reset

### Control Transformers
- Step down voltage for control circuits
- Typically 120V or 24V secondary
- Isolates control from power

## Variable Frequency Drives (VFDs)

### What is a VFD?
- Controls motor speed by varying frequency
- Also called inverter or AC drive
- Provides soft start
- Energy savings through speed control

### VFD Components
- Rectifier: Converts AC to DC
- DC bus: Filters and stores DC
- Inverter: Converts DC back to variable frequency AC
- Control board: Manages operation

### VFD Benefits
- Energy savings (20-50%)
- Reduced mechanical stress
- Soft starts reduce current surge
- Precise speed control
- Extends motor life

### VFD Applications
- HVAC systems (variable air flow)
- Pumps (variable flow)
- Conveyors (variable speed)
- Fans and blowers
- Machine tools

## Programming VFDs
- Set motor parameters (HP, voltage, FLA)
- Configure ramp times (accel/decel)
- Set minimum/maximum speeds
- Configure protection settings
- Input/output programming

## Control Circuits
- Start/stop buttons
- Selector switches
- Pilot lights
- Control relays
- Timers and counters

## Safety Considerations
- Disconnect required for motor
- Overcurrent protection mandatory
- Proper wire sizing
- Ground all metal parts
- Lock out during maintenance

## 💡 Key Points
- Motor controls protect motors and operators
- VFDs save energy and reduce wear
- Proper sizing critical for safety
- Follow NEC Article 430
- Lockout before servicing
    `
  }
};

