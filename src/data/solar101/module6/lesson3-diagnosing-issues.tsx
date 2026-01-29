import type { Lesson } from '@/types/course';

const lesson: Lesson = {
  id: 3,
  title: 'Diagnosing Common Issues (Shading, Inverter Faults, Battery Failure)',
  duration: '30 minutes',
  type: 'video',
  videoUrl: 'https://youtu.be/-yKeISmwU1s',
  content: `
# Diagnosing Common Issues 🔧

Diagnosing common issues in solar PV systems—such as shading reducing yields by up to 30%, inverter faults causing 20% of downtime, and battery failures leading to 15-25% capacity loss—is crucial for rapid resolution, minimizing revenue impacts, and upholding warranties. In 2025, with AI anomaly detection in monitoring platforms and a 32% rise in hybrid storage per SEIA, integrated diagnostics are standard, enabling predictive fixes that cut O&M costs by 40% amid 2.5 TW global PV deployments.

## Key Methods for Diagnosis

### Shading Issues
Visually inspect for tree growth or new obstructions using solar pathfinders; measure string currents with clamps to identify low-output panels (e.g., <80% of peers); employ thermal imaging for uneven heating hotspots.

### Inverter Faults
Review error codes via LCD displays or apps (e.g., E001 for ground faults); test DC input voltages against MPPT ranges; monitor AC output waveforms for clipping or harmonics exceeding 5% THD.

### Battery Failure
Check state-of-charge (SoC) via BMS logs for imbalances (>10% variance); measure internal resistance with testers (rising >20% signals degradation); inspect for swelling or leaks in lithium packs.

## Best Practices

- Start with non-invasive monitoring (apps first), then escalate to hands-on tests
- Document with photos/videos for warranty claims, targeting <24-hour resolutions
- De-energize before invasive tests; leverage remote firmware flashes for inverters
- Prioritize non-destructive tools to minimize downtime emissions

---

## Key Takeaways

✅ **Shading Impact**: Up to 30% yield reduction  
✅ **Inverter Downtime**: 20% of system downtime  
✅ **Battery Loss**: 15-25% capacity degradation  
✅ **Cost Reduction**: 40% O&M savings with AI diagnostics  
✅ **Resolution Target**: <24 hours with proper tools  
✅ **On-Site Resolution**: 80% of issues resolved  
  `
};

export default lesson;

