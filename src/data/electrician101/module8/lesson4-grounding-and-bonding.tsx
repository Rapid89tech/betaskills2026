import type { Lesson } from '@/types/course';

export const lesson4GroundingAndBonding: Lesson = {
  id: 4,
  title: 'Grounding and Bonding Systems',
  duration: '45 min',
  type: 'reading',
  content: {
    textContent: `
# Grounding and Bonding Systems ⚡🔗

## Difference Between Grounding and Bonding

### Grounding
- Connection to earth
- Provides path to ground for fault current
- Stabilizes voltage
- Protects against lightning

### Bonding
- Connecting metal parts together
- Creates low-impedance path
- Ensures all metal at same potential
- Allows proper circuit breaker operation

## Grounding Electrode System

### Types of Electrodes
- **Ground rods**: 8-10 feet, copper-clad steel
- **Metal water pipes**: 10 feet minimum underground
- **Concrete-encased electrode (Ufer)**: In foundation
- **Ground rings**: Buried around building perimeter
- **Metal building frame**: If effectively grounded

### Installation
- Two ground rods minimum if one rod >25 ohms
- Rods minimum 6 feet apart
- Drive full depth
- Connect with clamps
- Use proper conductor size

## Equipment Grounding

### Purpose
- Provides fault current path
- Allows breakers to trip
- Protects people from shock
- Required for all metal enclosures

### Equipment Grounding Conductor
- Green or bare wire
- Sized per NEC Table 250.122
- Continuous path to ground
- Bonded at service only

## Grounding Electrode Conductor (GEC)
- Connects panel to grounding electrode
- Sized per NEC Table 250.66
- Copper, aluminum, or copper-clad aluminum
- Protected from physical damage

## Bonding Requirements

### What Must Be Bonded
- Metal water pipes
- Metal gas pipes
- Metal ducts and conduit
- Structural steel
- Metal equipment enclosures
- Separately derived systems

### Bonding Methods
- Bonding jumpers
- Bonding bushings
- Locknuts and grounding bushings
- Welding or exothermic connections

## Main Bonding Jumper
- Connects neutral to ground at service
- ONE location only (service disconnect)
- Allows fault current to return to source
- Critical safety component

## System vs Equipment Grounding
- **System grounding**: Grounded conductor (neutral)
- **Equipment grounding**: Non-current carrying metal parts
- Keep separate except at service
- Ground and neutral separated in sub-panels

## Testing Grounding Systems
- Measure ground resistance
- Should be below 25 ohms
- Test continuity of grounding path
- Verify bonding connections

## 💡 Key Takeaways
- Grounding and bonding save lives
- Proper installation prevents shock hazards
- Follow NEC Article 250 precisely
- Never bond ground and neutral in sub-panels
- Test systems after installation
- Maintain grounding system integrity
    `
  }
};

