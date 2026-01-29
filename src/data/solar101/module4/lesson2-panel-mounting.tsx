import type { Lesson } from '@/types/course';

const lesson: Lesson = {
  id: 2,
  title: 'Panel Mounting on Rooftops and Ground',
  duration: '30 minutes',
  type: 'video',
  videoUrl: 'https://youtu.be/0ECaC4vmDEU',
  content: `
# Panel Mounting on Rooftops and Ground 🏠

Panel mounting on rooftops and ground involves securing solar PV modules to structures that withstand environmental loads like wind, snow, and seismic activity, ensuring long-term stability and optimal energy capture. Rooftop systems leverage existing building surfaces for space efficiency, while ground-mounted arrays offer flexibility in orientation and easier maintenance, often boosting yields by 10-20% through customizable tilts. In 2025, with global solar installations projected at 655 GW—a 10% increase from 2024—trends emphasize lighter, modular aluminum racking for rooftops and AI-optimized trackers for ground setups, driving the PV mounting market toward $36.61 billion by 2029 as urban retrofits and agrivoltaics expand.

## Types of Mounting Systems

### 1. Rooftop Rail-Mounted Systems
Aluminum rails bolted to roof attachments with flashing to prevent leaks; clamps secure panels at fixed or adjustable angles. Suited for pitched roofs like asphalt shingles or metal seams.

### 2. Rooftop Ballasted Systems
Weight-based (concrete blocks) without penetration, ideal for flat commercial roofs; minimal structural impact but requires ballast calculations for wind uplift.

### 3. Ground Fixed-Tilt Mounts
Concrete or helical pile foundations with tilted frames for south-facing arrays; simple and cost-effective for residential yards, allowing latitude-optimized angles.

### 4. Ground Tracking Systems
Single- or dual-axis trackers that follow the sun, increasing output by 20-25%; motor-driven for utility-scale, with seasonal adjustments for bifacial panels.

## Best Practices

### Load and Site-Specific Design
Engineer for local codes (e.g., 110-150 mph wind zones); use software to model uplift on rooftops and soil tests for ground piles to avoid settling.

### Material and Compatibility Choices
Select recyclable aluminum over steel for 20% weight reduction; ensure clamps fit panel frames (e.g., 35-40mm mid/end clamps) and integrate with microinverters.

### Installation Sequencing
For rooftops, start with flashing to seal penetrations; ground systems require grading and shading avoidance—aim for 2-3 ft elevation to deter animals.

### Common Pitfalls to Avoid
- Inadequate flashing causing roof leaks (use pre-molded boots)
- Undersizing for snow loads (add 1.5x factor in northern climates)
- Ignoring tracker maintenance like lubrication, which can cut output by 15%

### Sustainability Tie-In
Opt for modular designs enabling easy decommissioning and recycling (90% material recovery in 2025 aluminum systems), supporting circular economy goals.

---

## Key Takeaways

✅ **Market Growth**: R549 billion in 2025, growing to R567 billion by 2029  
✅ **Rooftop Rails**: Cost R1.50-R6.00/W, 1-2 day residential install  
✅ **Ground Tracking**: 20-25% yield boost, motor-driven optimization  
✅ **Weight Reduction**: 20% lighter with aluminum vs. steel  
✅ **Recycling**: 90% material recovery in modular aluminum systems  
✅ **Global Installs**: 655 GW projected for 2025 (10% increase from 2024)  
  `
};

export default lesson;

