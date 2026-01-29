import type { Lesson } from '@/types/course';

const lesson: Lesson = {
  id: 5,
  title: 'Wiring and Grounding',
  duration: '25 minutes',
  type: 'video',
  videoUrl: 'https://youtu.be/LmI_bC16X2Y',
  content: `
# Wiring and Grounding 🔌

Wiring and grounding form the backbone of solar PV systems, ensuring safe power transmission, fault protection, and regulatory compliance while minimizing voltage drops that can sap 5-10% of output. Proper DC wiring from panels to inverters, AC connections to loads or the grid, and robust grounding to earth prevent hazards like arcs or shocks, with grounding specifically reducing electric shock risks by connecting all metal components. In 2025, NEC 2023 Article 690 updates emphasize rapid shutdown and unearthed DC systems, alongside rising adoption of monitored smart wiring for predictive maintenance, aligning with a 15% growth in U.S. PV installs per SEIA data.

## Key Components and Methods

### 1. DC Wiring Fundamentals
Use PV wire (90°C wet-rated, UV-resistant) for strings, sized via NEC ampacity tables (e.g., 1.56x Isc); series for voltage, parallel for current, with fuses on positives.

### 2. AC Wiring and Interconnects
THWN-2 or USE cables from inverters to panels/loads, incorporating disconnects and breakers; hybrid systems require bidirectional metering for net energy flow.

### 3. Grounding Systems
Equipment grounding conductors (EGC) bond frames, racking, and enclosures to a central ground rod (8 ft copper-clad); functional grounding for inverters, with clamps ensuring low-impedance paths.

### 4. Cable Management Techniques
Secure runs in conduits or clips to avoid abrasion, routing along module bottoms for UV shielding and burying DC cables at 18-24 inches with protection against damage.

## Best Practices

### Sizing and Protection Guidelines
Calculate voltage drop <3% using AWG charts; use quality conduits with proper bend radii to reduce stress, and secure fittings for outdoor durability.

### Installation Sequencing
Bond grounding at the combiner box, running EGC back to the main panel; penetrate structures via sealed bushings to prevent water ingress.

### Testing and Compliance Adjustments
Verify continuity with ohmmeters (<1 ohm bonds) and insulation resistance (>1MΩ); adapt for unearthed systems per 2025 IET recommendations, burying cables deeply for mechanical protection.

### Common Pitfalls to Avoid
- Undersizing wires causing overheating
- Loose MC4 connections leading to arcs
- Skipping ground rods at remote arrays, which can violate NEC and raise shock risks

### Sustainability Tie-In
Choose recyclable copper alternatives and long-life PV wire to cut waste by 20%; integrate smart sensors for fault detection, supporting 2025 green grid resilience.

---

## Key Takeaways

✅ **Voltage Drop Target**: <3% for optimal performance  
✅ **PV Wire**: 90°C wet-rated, UV-resistant for outdoor use  
✅ **Grounding**: <1 ohm bond resistance required  
✅ **Insulation**: >1MΩ resistance minimum  
✅ **NEC 2023**: Article 690 updates for rapid shutdown  
✅ **Waste Reduction**: 20% less with recyclable copper alternatives  
  `
};

export default lesson;

