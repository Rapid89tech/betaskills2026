import type { Lesson } from '@/types/course';

const lesson: Lesson = {
  id: 1,
  title: 'Personal Protective Equipment (PPE)',
  duration: '25 minutes',
  type: 'video',
  videoUrl: 'https://youtu.be/Qyy0Svl1kZI',
  content: `
# Personal Protective Equipment (PPE) 🦺

Personal Protective Equipment (PPE) is indispensable for solar PV installers and maintenance crews, shielding against hazards like falls from heights (accounting for 40% of incidents), electrical shocks up to 1000V DC, dust inhalation, and arc flashes that can exceed 8 cal/cm². Proper PPE selection and use, per OSHA 1910.132 and updated 2025 guidelines emphasizing arc-rated FR clothing for high-voltage strings, can reduce injury risks by 60-70%, ensuring compliance and worker safety amid a projected 700 GW of global installations.

## Key Components of PPE

### Head Protection
Hard hats with Class E rating (up to 20kV) to guard against falling tools or debris; include chin straps for windy rooftop work.

### Eye and Face Protection
ANSI Z87.1-certified safety glasses or goggles with side shields and UV/impact resistance; face shields for grinding or chemical handling in battery installs.

### Hand Protection
Insulated rubber gloves (ASTM D120 Class 0-2 for 1000V AC/1500V DC) to prevent shocks; cut-resistant for handling panels, with leather overgloves for grip.

### Fall Protection
Full-body harnesses with shock-absorbing lanyards and self-retracting lifelines (SRLs), rated for 5,000 lbs; dorsal D-rings for rooftop tie-offs per OSHA 1926.501.

### Body Protection
Arc-rated (ATPV 8-40 cal/cm²) FR clothing like shirts and pants for electrical tasks; high-visibility vests and respirators (NIOSH N95) for dusty or low-oxygen environments.

### Foot Protection
Steel/composite toe boots with electrical hazard (EH) rating (ASTM F2413) and slip-resistant soles for uneven roofs or trenches.

## Best Practices

- Conduct hazard assessments per OSHA 1910.132
- Fit-test annually, prioritizing adjustable designs
- Daily visual checks for tears or degradation
- Clean per manufacturer; store in ventilated lockers
- Mandate OSHA 10-hour courses with PV modules
- Choose recyclable materials for 30% waste reduction

---

## Key Takeaways

✅ **Fall Incidents**: 40% of solar installation accidents  
✅ **Injury Reduction**: 60-70% with proper PPE use  
✅ **Hard Hat Rating**: Class E up to 20kV  
✅ **Glove Rating**: ASTM D120 Class 0-2 for 1500V DC  
✅ **Harness Rating**: 5,000 lbs minimum  
✅ **Arc Clothing**: ATPV 8-40 cal/cm² for electrical work  
  `
};

export default lesson;

