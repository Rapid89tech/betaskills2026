import type { Lesson } from '@/types/course';

export const lesson5ArcFlashSafety: Lesson = {
  id: 5,
  title: 'Arc Flash Safety and Protection',
  duration: '45 min',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/U9iRmzyNKMs',
    textContent: `
# Arc Flash Safety and Protection 💥

## What is an Arc Flash?

An arc flash is a dangerous electrical explosion or discharge that occurs when current travels through air between conductors or from a conductor to ground.

### Characteristics
- Temperature: Up to 35,000°F (4x hotter than the sun's surface)
- Light: Intense ultraviolet and infrared radiation
- Sound: Can exceed 140 dB (instant hearing damage)
- Pressure: Explosive force can throw workers
- Duration: Milliseconds to seconds

---

## Causes of Arc Flash

- Equipment failure or malfunction
- Dust or corrosion on equipment
- Dropped tools on live parts
- Accidental contact with energized components
- Improper work procedures
- Inadequate maintenance
- Overloaded circuits

---

## Arc Flash Hazards

### Thermal Burns
- Severe skin burns from intense heat
- Can penetrate deep into tissue
- May require extensive medical treatment

### Blast Injuries
- Pressure wave throws workers
- Can cause broken bones, traumatic injuries
- Flying debris and shrapnel

### Vision Damage
- Intense light can cause temporary or permanent blindness
- UV radiation damage to eyes
- Flash burns to cornea

### Hearing Loss
- Extreme noise levels
- Can cause permanent hearing damage
- Requires immediate hearing protection

---

## Arc Flash Protection

### PPE Requirements by Category

**Category 1 (4 cal/cm²)**
- Arc-rated shirt and pants
- Safety glasses
- Hard hat
- Leather gloves

**Category 2 (8 cal/cm²)**
- AR shirt and pants (8 cal/cm² minimum)
- Arc flash suit hood or face shield
- Safety glasses
- Hard hat
- Leather gloves
- Hearing protection

**Category 3 (25 cal/cm²)**
- AR clothing system (25 cal/cm² minimum)
- Arc flash suit hood
- Safety glasses
- Hard hat
- Leather gloves over insulated gloves
- Hearing protection

**Category 4 (40 cal/cm²)**
- AR clothing system (40 cal/cm² minimum)
- Arc flash suit hood
- Safety glasses
- Hard hat
- Leather gloves over insulated gloves
- Hearing protection

---

## Arc Flash Risk Assessment

### Steps
1. Identify potential arc flash hazards
2. Calculate incident energy (cal/cm²)
3. Determine arc flash boundary
4. Select appropriate PPE category
5. Label equipment with arc flash warning labels
6. Update assessment when equipment changes

### Arc Flash Boundary
- Distance at which incident energy equals 1.2 cal/cm²
- Workers must wear minimum PPE at this boundary
- Area marked with warning labels
- Unauthorized personnel must stay outside boundary

---

## Prevention Strategies

- De-energize equipment whenever possible
- Use remote racking and switching
- Perform infrared inspections
- Maintain equipment properly
- Keep equipment clean and dry
- Use current-limiting devices
- Install arc flash detection systems
- Train workers on arc flash hazards

---

## Arc Flash Labels

Required information on equipment:
- Arc flash boundary distance
- Incident energy or PPE category
- Nominal voltage
- Limited or restricted approach boundaries
- Date of assessment

---

## Emergency Response

If arc flash occurs:
1. Call for medical help immediately
2. Turn off power if safe to do so
3. Do not touch victim until power is off
4. Begin first aid/CPR if trained
5. Treat for burns and shock
6. Document incident for investigation

---

## 💡 Critical Safety Points

- Arc flash can occur in milliseconds
- Always assume equipment is energized
- De-energization is the best protection
- Never work on live equipment without authorization
- Use proper PPE for the calculated hazard level
- Maintain equipment to prevent arc flash incidents
    `
  }
};

