import type { Lesson } from '@/types/course';

export const lesson2NECRequirements: Lesson = {
  id: 2,
  title: 'Key NEC Requirements',
  duration: '50 min',
  type: 'reading',
  content: {
    textContent: `
# Key NEC Requirements 📋

## Branch Circuit Requirements (Article 210)

### Outlet Spacing
- **Dwelling units**: Outlet every 12 feet along walls
- **Kitchen counters**: Outlet every 4 feet
- **Bathrooms**: At least one outlet near sink
- **Outdoor**: At least one outlet front and back

### GFCI Protection Required
- Bathrooms (all outlets)
- Kitchens (countertop outlets)
- Outdoors
- Garages and unfinished basements
- Crawl spaces and below grade
- Wet locations

### AFCI Protection Required
- All 15A and 20A branch circuits in dwelling units
- Bedrooms, living rooms, hallways
- Kitchens, dining rooms, family rooms

## Grounding (Article 250)

### Grounding Electrode System
- Ground rods (minimum 8 feet)
- Metal water pipes
- Concrete-encased electrodes
- Ground rings

### Bonding Requirements
- Bond all metal parts
- Equipment grounding conductors
- Main bonding jumper at service
- System bonding jumper

## Conductor Sizing (Article 310)

### Ampacity Tables
- Table 310.15(B)(16) most commonly used
- Based on conductor material, insulation, temperature
- Adjustment factors for multiple conductors
- Correction factors for ambient temperature

### Minimum Sizes
- **14 AWG**: Minimum for branch circuits (15A)
- **12 AWG**: 20A circuits
- **10 AWG**: 30A circuits
- Larger sizes for higher currents

## Working Space (Article 110)

### Clear Working Space
- Minimum 3 feet width
- Minimum 3-6.5 feet depth (varies by voltage)
- Minimum 6.5 feet height
- Illumination required
- No storage in working space

## Load Calculations (Article 220)

### General Lighting
- 3 VA per square foot (dwelling units)
- Additional loads for specific equipment
- Demand factors for large installations

### Required Circuits
- **Small appliance**: Minimum 2 circuits (kitchen)
- **Laundry**: Minimum 1 circuit
- **Bathroom**: Minimum 1 circuit

## 💡 Key Takeaways
- NEC specifies exact requirements
- Must follow minimum standards
- Grounding and GFCI critical for safety
- Proper working space required
- Load calculations prevent overloads
    `
  }
};

