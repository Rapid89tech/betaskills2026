import type { Lesson } from '@/types/course';

export const lesson2Conduits: Lesson = {
  id: 2,
  title: 'Conduits (EMT, PVC, Flexible Metal)',
  duration: '40 min',
  type: 'reading',
  content: {
    textContent: `
# Electrical Conduits 🔩

## Introduction
Electrical conduits are protective tubing systems used to route and shield electrical wiring from physical damage, moisture, corrosion, and interference.

---

## Types of Conduits

### 1. EMT (Electrical Metallic Tubing)
- Also known as "thin-wall" conduit
- Made of galvanized steel or aluminum
- Lightweight and easy to bend
- **Applications**: Indoor commercial/industrial installations
- **Advantages**: Cost-effective, easy to work with
- **Limitations**: Not waterproof, requires fittings for moisture protection

### 2. PVC (Polyvinyl Chloride) Conduit
- Non-metallic plastic conduit
- **Schedule 40**: Standard wall thickness
- **Schedule 80**: Thicker walls for exposed areas
- Corrosion-resistant, waterproof
- **Applications**: Underground installations, wet locations, outdoor use
- **Advantages**: Doesn't corrode, insulates, economical
- **Limitations**: Can become brittle in cold, not suitable for high temperatures

### 3. Flexible Metal Conduit (FMC)
- Also called "Greenfield" or "Flex"
- Spiral-wound metal strips
- **Applications**: Motor connections, tight spaces, vibration areas
- **Advantages**: Flexible, easy to route around obstacles
- **Limitations**: Requires separate ground in some cases

### 4. Liquid-Tight Flexible Metal Conduit (LFMC)
- FMC with waterproof jacket
- **Applications**: Wet locations, outdoor motors, underground
- **Advantages**: Waterproof and flexible
- **Common sizes**: 1/2", 3/4", 1", 1-1/4"

### 5. Rigid Metal Conduit (RMC)
- Heavy-duty galvanized steel
- Threaded connections
- **Applications**: Outdoor exposed installations, industrial
- **Advantages**: Maximum protection, grounding path
- **Limitations**: Expensive, difficult to install

## Conduit Sizing
- Must allow wire to fill conduit no more than 40% (3+ wires) or 53% (2 wires)
- Common sizes: 1/2", 3/4", 1", 1-1/4", 1-1/2", 2"
- Use NEC conduit fill tables

## Installation Tips
- Support conduit every 10 feet (EMT)
- Use proper bending techniques
- Deburr cut ends
- Use correct fittings for location type
- Maintain proper burial depth for underground

## 💡 Key Points
- Match conduit type to environment
- Follow NEC fill requirements
- Proper support prevents sagging
- Use right fittings for wet/dry locations
    `
  }
};

