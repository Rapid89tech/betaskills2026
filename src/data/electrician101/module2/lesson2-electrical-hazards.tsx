import type { Lesson } from '@/types/course';

export const lesson2ElectricalHazards: Lesson = {
  id: 2,
  title: 'Types of Electrical Hazards',
  duration: '35 min',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/FrbogNJ2mC0',
    textContent: `
# Types of Electrical Hazards ⚡⚠️

## Main Electrical Hazards

### 1. Electric Shock
- Direct contact with energized conductors
- Can cause cardiac arrest, burns, or death
- Prevention: De-energize circuits, use insulated tools and gloves

### 2. Arc Flash
- Sudden release of energy due to a fault
- Temperatures up to 35,000°F
- Intense light and heat
- Prevention: Arc flash rated PPE, maintain safe distances

### 3. Arc Blast
- Pressure wave and flying debris caused by arc flash
- Can cause physical trauma and hearing damage
- Sound levels exceeding 140 dB
- Prevention: Full PPE, hearing protection, maintain barriers

### 4. Fire and Burns
- Due to hot surfaces, arc flashes, or faulty equipment
- Electrical fires can spread rapidly
- Prevention: FR clothing, proper circuit protection, regular inspections

### 5. Hearing Damage
- Resulting from arc blast or noisy environments
- Prolonged exposure to 85 dB+ causes permanent damage
- Prevention: Earplugs, earmuffs, dual protection in high-risk areas

---

## PPE for Each Hazard

- **Shock**: Insulated gloves, non-conductive footwear
- **Arc Flash**: Arc-rated clothing, face shield, balaclava
- **Arc Blast**: Face shield, earplugs, protective clothing
- **Burns**: FR clothing, insulated gloves
- **Hearing**: Earplugs and/or earmuffs (NRR 25-33 dB)

---

## 💡 Safety Reminder

Always assess hazards before beginning work and wear appropriate PPE for the specific risks identified.
    `
  }
};

