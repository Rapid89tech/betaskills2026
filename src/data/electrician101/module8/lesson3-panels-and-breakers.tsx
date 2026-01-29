import type { Lesson } from '@/types/course';

export const lesson3PanelsAndBreakers: Lesson = {
  id: 3,
  title: 'Electrical Panels and Circuit Breakers',
  duration: '50 min',
  type: 'reading',
  content: {
    textContent: `
# Electrical Panels and Circuit Breakers 🔲

## Types of Panels

### Main Service Panel
- First point of distribution
- Contains main disconnect
- Typically 100-400A residential
- 200-600A+ commercial

### Sub-Panels
- Fed from main panel
- Distributes power to specific areas
- No main disconnect required
- Must have separate ground and neutral bars

### Load Centers
- Residential distribution panels
- Circuit breakers for branch circuits
- Organized by circuits

## Circuit Breakers

### Types
- **Single-pole**: 120V circuits (15A, 20A, 30A)
- **Double-pole**: 240V circuits (20A-100A)
- **GFCI breakers**: Ground fault protection
- **AFCI breakers**: Arc fault protection
- **Tandem/Twin**: Two circuits in one space

### How Circuit Breakers Work
- Thermal-magnetic trip mechanism
- Overload trips thermal element
- Short circuit trips magnetic element
- Resets after trip
- Protects wiring from overcurrent

## Panel Installation

### Location Requirements
- Accessible location
- Minimum working space (3 ft x 3 ft x 6.5 ft)
- Proper height (eye level preferred)
- Well-lit area
- Not in bathrooms or clothes closets

### Installation Steps
1. Mount panel securely
2. Run service entrance conductors
3. Connect main lugs/breaker
4. Install ground and neutral bars
5. Run branch circuits
6. Connect breakers
7. Label all circuits
8. Test operation

## Panel Labeling

### Requirements
- Circuit number
- Area/room served
- Circuit type/load
- Clear and permanent
- Updated with changes

## Maintenance
- Visual inspections annually
- Check for overheating
- Tighten connections
- Test GFCI/AFCI breakers monthly
- Keep panel clean and dry

## Safety Considerations
- Never work in live panel
- Use proper PPE
- Turn off main before work
- Verify de-energization
- Watch for arc flash hazards

## 💡 Key Takeaways
- Panels are heart of electrical system
- Proper installation critical for safety
- Breakers protect wiring, not devices
- Clear labeling essential
- Regular maintenance prevents problems
    `
  }
};

