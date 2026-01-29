import type { Lesson } from '@/types/course';

export const lesson1ElectricalPPE: Lesson = {
  id: 1,
  title: 'PPE for Electricians',
  duration: '50 min',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/loQ9Dbsy2ag',
    textContent: `
# PPE for Electricians 🧰

## Introduction to Electrical PPE

### Definition
Personal Protective Equipment (PPE) refers to specialized safety gear worn by electricians to minimize the risk of injury from electrical hazards. PPE includes items such as insulated gloves, arc-rated clothing, face shields, safety glasses, dielectric boots, and non-conductive hard hats.

### Key Components of Electrical PPE

**Insulated Gloves**
- Rubber gloves rated for specific voltages
- Class 0: up to 1000V
- Class 2: up to 17,000V

**Arc-Rated Clothing**
- Flame-resistant (FR) shirts, pants, coveralls, or suits
- Arc Thermal Performance Value (ATPV) rated
- Protection against arc flash heat

**Face Shields and Balaclavas**
- Arc-rated shields and hoods
- Protect face and neck from burns and arc flash light

**Safety Glasses**
- ANSI Z87.1-rated
- Shield eyes from debris, sparks, or intense light

**Dielectric Boots**
- Non-conductive footwear
- Prevent shocks through the feet

**Non-Conductive Hard Hats**
- Class E hard hats
- Protect against falling objects and electrical hazards

---

## Purpose of PPE

### Protection Against Specific Hazards

**Electric Shock**
- Prevents current from passing through the body
- Can cause cardiac arrest or neurological damage
- Example: Class 1 insulated gloves protect worker troubleshooting 2400V circuit

**Arc Flash**
- Shields against intense heat (up to 35,000°F)
- Protects from light from arc flash incidents
- Can cause severe burns or blindness
- Example: 40 cal/cm² arc flash suit for 13.8kV transformer maintenance

**Arc Blast**
- Guards against pressure waves, shrapnel, and noise
- Can cause physical trauma or hearing loss
- Example: Face shield and earplugs protect against debris and noise

**Burns**
- Prevents thermal burns from electrical faults or fires
- FR coveralls prevent skin burns during panel faults

---

## Regulatory Standards

### NFPA 70E (Standard for Electrical Safety)
- Published by National Fire Protection Association
- Details PPE requirements for arc flash and shock hazards
- Mandates arc flash risk assessments to calculate incident energy
- Determines PPE categories (1–4)
- Specifies approach boundaries
- Requires training on PPE selection, use, and maintenance

### OSHA 1910 Subpart I
- Requires employers to assess workplace hazards
- Provide appropriate PPE at no cost to employees
- PPE must be maintained, inspected, and replaced
- Training required on PPE use, limitations, and proper storage
- Enforces compliance through inspections and citations

### ASTM & ANSI Standards
- **ASTM F1506**: Arc-rated clothing requirements
- **ASTM F2413**: Dielectric footwear standards
- **ASTM D120**: Insulated gloves testing requirements
- **ANSI Z87.1**: Safety glasses impact standards
- **ANSI Z89.1**: Class E hard hats specifications

---

## PPE Maintenance and Inspection

### Routine Inspection
- Daily visual checks for cracks, tears, wear
- Rubber gloves: air inflation test before use
- Check arc-rated clothing for damage

### Storage
- Store in clean, dry environments
- Use glove bags or cases for sensitive gear
- Protect from ozone, chemicals, and sunlight

### Cleaning
- Mild soap and water
- Avoid harsh chemicals
- FR garments cleaned per manufacturer specs

---

## PPE Selection

### Hazard Risk Category (HRC) / Arc Flash PPE Categories
- **HRC 1**: Minimum 4 cal/cm²
- **HRC 2**: Minimum 8 cal/cm²
- **HRC 3**: Minimum 25 cal/cm²
- **HRC 4**: Minimum 40 cal/cm²

PPE is based on:
- Voltage levels
- Proximity to live parts
- Task duration and energy exposure

---

## Best Practices

- **"Test before you touch"** – Always verify de-energization
- Never wear metal jewelry or conductive items
- Use non-conductive ladders (fiberglass preferred)
- Always wear PPE even if task appears simple
- Attend regular PPE training and fit testing

---

## 💡 Key Takeaways

- PPE is the last line of defense—never a substitute for proper lockout/tagout
- Select PPE based on task, hazard, and environment
- Proper use, maintenance, and training are crucial
- Compliance with NFPA 70E and OSHA is mandatory
- Regular inspection prevents PPE failures
    `
  }
};

