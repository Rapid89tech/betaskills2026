import type { Lesson } from '@/types/course';

const lesson: Lesson = {
  id: 4,
  title: 'Installing Inverters and Charge Controllers',
  duration: '30 minutes',
  type: 'video',
  videoUrl: 'https://youtu.be/a5Ux6Por40s',
  content: `
# Installing Inverters and Charge Controllers ⚙️

Installing inverters and charge controllers is a pivotal phase in solar PV systems, ensuring efficient DC-to-AC conversion and safe battery charging to prevent overvoltage or thermal runaway. Inverters handle power inversion with grid synchronization, while charge controllers manage solar input to batteries, boosting efficiency by 20-30% via MPPT tech. In 2025, with UL 1741 SB-compliant smart inverters enabling VPP participation and rising hybrid setups (up 35% per SEIA data), proper installation reduces failures by 40%, supporting seamless integration with home energy management systems amid 1.6 TW global PV capacity.

## Key Installation Methods and Components

### 1. Site Selection and Mounting
Position inverters indoors or shaded outdoors (e.g., garages for <40°C operation); use wall brackets for accessibility. For charge controllers, mount near batteries to minimize wire runs, ensuring ventilation to dissipate 5-10% heat losses.

### 2. Wiring and Grounding
Connect DC inputs from arrays to inverters/controllers with appropriately sized cables (e.g., 10 AWG for 20A strings); implement grounding per NEC 690, including equipment grounding conductors and surge protectors.

### 3. Configuration and Commissioning
Program MPPT ranges (e.g., 150-450V for strings) and battery profiles (lithium vs. lead-acid); test with multimeters for polarity and perform grid-tie sync checks before energizing.

### 4. Hybrid and Advanced Setups
For integrated hybrids, wire batteries directly to the inverter's charge stage; incorporate rapid shutdown modules for safety, verifying firmware updates for 2025 cybersecurity standards.

## Best Practices

### Thermal and Ventilation Management
Maintain 6-12 inches clearance around units; use fans for enclosed spaces to avoid derating (e.g., 1% loss per °C over 25°C).

### Cable and Connection Standards
Torque MC4 connectors to 5-7 Nm and use ferrules on stranded wire; label all circuits for troubleshooting, adhering to AHJ inspections.

### Testing and Monitoring
Conduct insulation resistance tests (>1MΩ) pre-startup; enable remote monitoring via apps for real-time fault detection, reducing downtime by 50%.

### Common Pitfalls to Avoid
- Mismatched DC voltages causing clipping (keep <90% MPPT max)
- Skipping arc-fault detection in inverters
- Improper battery fusing leading to hazards

### Sustainability Tie-In
Select inverters with >95% efficiency and recyclable enclosures; leverage smart features for demand response, cutting grid peaks and supporting 2025 net-zero mandates.

---

## Key Takeaways

✅ **Efficiency Boost**: MPPT technology provides 20-30% efficiency improvement  
✅ **Failure Reduction**: 40% fewer failures with proper installation  
✅ **VPP Integration**: UL 1741 SB compliance enables virtual power plant participation  
✅ **Hybrid Growth**: 35% increase in hybrid setups per SEIA data  
✅ **Testing**: >1MΩ insulation resistance required pre-startup  
✅ **Monitoring**: Remote apps reduce downtime by 50%  
  `
};

export default lesson;

