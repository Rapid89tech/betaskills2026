import type { Lesson } from '@/types/course';

export const lesson2MotorTypes: Lesson = {
  id: 2,
  title: 'Types of Electric Motors',
  duration: '40 min',
  type: 'reading',
  content: {
    textContent: `
# Types of Electric Motors 🔄

## AC Motors

### Single-Phase Motors
- Used in residential and light commercial
- 120V or 240V operation
- Types:
  - **Split-phase**: Starting and running windings
  - **Capacitor-start**: Better starting torque
  - **Permanent split-capacitor**: Quieter operation
  - **Shaded-pole**: Simple, low-cost, low power

### Three-Phase Motors
- Used in commercial and industrial
- 208V, 240V, 480V, 600V
- More efficient than single-phase
- Types:
  - **Squirrel-cage induction**: Most common, reliable
  - **Wound-rotor**: Variable speed capability
  - **Synchronous**: Constant speed, power factor correction

## DC Motors
- Used where precise speed control needed
- Battery or rectified AC power
- Types:
  - **Series**: High starting torque
  - **Shunt**: Constant speed
  - **Compound**: Combination characteristics
  - **Permanent magnet**: Simple, efficient

## Special Purpose Motors
- **Servo motors**: Precise position control
- **Stepper motors**: Incremental movement
- **Brushless DC**: High efficiency, long life
- **Universal motors**: Run on AC or DC

## Motor Selection Factors
- Power requirements (HP)
- Voltage available
- Speed requirements
- Starting torque needed
- Duty cycle
- Environment (indoor/outdoor, hazardous)

## 💡 Key Points
- Motor type depends on application
- Three-phase more efficient for large loads
- Understand motor nameplate data
- Match motor to power source
    `
  }
};

