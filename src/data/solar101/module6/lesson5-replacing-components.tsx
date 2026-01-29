import type { Lesson } from '@/types/course';

const lesson: Lesson = {
  id: 5,
  title: 'Replacing Faulty Components',
  duration: '25 minutes',
  type: 'video',
  videoUrl: 'https://youtu.be/p6BJvS3nrb0',
  content: `
# Replacing Faulty Components 🔄

Replacing faulty components in solar PV systems—such as panels, inverters, batteries, or charge controllers—is critical for restoring full capacity and minimizing downtime, which can cost R1,500-R7,500/day in lost production for residential setups. Prompt replacements preserve warranties (often 25 years for panels) and system efficiency, preventing cascading failures like string imbalances reducing yields by 10-20%. In 2025, with modular plug-and-play designs and a 35% increase in aftermarket parts per SEIA, AI-assisted diagnostics streamline swaps, cutting labor times by 50% and supporting the 700 GW global additions amid supply chain recoveries.

## Key Methods for Replacement

### 1. Fault Isolation and Preparation
Confirm the faulty component via monitoring data or tests (e.g., low Voc for panels); de-energize the system per lockout/tagout, documenting the issue with photos and serial numbers for warranty claims.

### 2. Safe Removal
Disconnect cables (torque MC4s reverse), unbolt mounts or racks, and lift components carefully—use suction cups for panels to avoid frame damage; for batteries, neutralize electrolytes if flooded types.

### 3. Installation of New Component
Match specs (e.g., Voc/Imp for panels, firmware for inverters); secure with proper torque (5-7 Nm for connectors), reconnect wiring, and apply sealants for weatherproofing.

### 4. Commissioning and Verification
Re-energize, test outputs with multimeters (e.g., continuity and insulation >1MΩ), and monitor for 24-48 hours via apps to confirm seamless integration and performance.

## Best Practices

- Always verify AHJ permits for swaps
- Use PPE and insulated tools for live risks
- Log serial numbers and test results in apps for traceability
- Opt for over-paneling compatible replacements (up to 133% for inverters)
- Source refurbished components from certified programs to cut e-waste by 40%

---

## Key Takeaways

✅ **Downtime Cost**: R1,500-R7,500/day for residential systems  
✅ **Labor Reduction**: 50% with AI-assisted diagnostics  
✅ **Aftermarket Growth**: 35% increase in parts availability  
✅ **Warranty**: 25 years typical for panels  
✅ **Recovery Time**: 100% output within days  
✅ **E-Waste Reduction**: 40% with refurbished components  
  `
};

export default lesson;

