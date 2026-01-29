import type { Lesson } from '@/types/course';

export const lesson1MotorFundamentals: Lesson = {
  id: 1,
  title: 'Electric Motor Fundamentals',
  duration: '45 min',
  type: 'reading',
  content: {
    textContent: `
# Electric Motor Fundamentals ⚙️

## What is an Electric Motor?
An electric motor converts electrical energy into mechanical energy (rotation) using electromagnetic principles.

## Motor Components
- **Stator**: Stationary part with windings
- **Rotor**: Rotating part
- **Bearings**: Support rotation
- **Housing**: Protects internal components
- **Shaft**: Transfers mechanical power
- **Cooling fan**: Dissipates heat

## How Motors Work
- Electrical current creates magnetic field
- Magnetic field causes rotation
- Continuous rotation from alternating fields
- Speed depends on frequency and poles

## Motor Ratings
- **Horsepower (HP)**: Mechanical power output
- **Voltage**: Operating voltage (120V, 240V, 480V)
- **Current (FLA)**: Full load amps
- **RPM**: Revolutions per minute
- **Service factor**: Overload capability
- **Duty cycle**: Continuous or intermittent

## Motor Applications
- HVAC systems (fans, compressors)
- Pumps and conveyors
- Machine tools
- Elevators and escalators
- Industrial equipment

## Safety Considerations
- Proper overcurrent protection required
- Disconnect required within sight
- Grounding essential
- Overload protection necessary
- Follow NEC Article 430

## 💡 Key Points
- Motors are major electrical loads
- Require special protection
- Sizing critical for safety
- Understanding ratings essential
    `
  }
};

