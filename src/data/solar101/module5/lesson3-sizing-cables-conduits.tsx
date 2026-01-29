import type { Lesson } from '@/types/course';

const lesson: Lesson = {
  id: 3,
  title: 'Sizing Cables and Conduits',
  duration: '25 minutes',
  type: 'video',
  videoUrl: 'https://youtu.be/W9fAgunlQeg',
  content: `
# Sizing Cables and Conduits 📏

Sizing cables and conduits is vital for solar PV systems to ensure safe current carrying capacity, minimize voltage drops (target <3% for DC runs), and protect against environmental hazards like heat or moisture, preventing overheating that could lead to failures or fires. Cables must handle peak currents with derating factors, while conduits provide mechanical and thermal protection, sized per NEC fill limits to avoid congestion. In 2025, with DC voltages climbing to 1500V in utility-scale projects and a 25% rise in hybrid installs per SEIA, AI-enhanced sizing tools are cutting material waste by 15%, supporting the U.S. goal of 50 GW annual additions amid supply chain optimizations.

## Key Methods for Sizing

### 1. Ampacity-Based Cable Sizing
Use NEC Table 310.15(B)(16) for conductor ampacity (e.g., 10 AWG copper at 30A), multiplied by 1.25x for continuous loads and derated for ambient temps (>30°C reduces by 0.58 factor) or bundling.

### 2. Voltage Drop Calculations
Limit drops to 2-3% via formula VD = (2 × L × I × R)/1000 (for single-phase), where L=length, I=current, R=resistance; select larger AWG (e.g., 6 vs. 10) for runs >50 ft.

### 3. Conduit Fill Determination
Per NEC Chapter 9, max 40% fill for 3+ conductors (e.g., EMT conduit 1" holds ~4x 10 AWG wires); calculate cross-sectional area using tables for trade sizes.

### 4. Environmental and System Adjustments
Factor in wet locations (THWN-2 insulation), UV exposure (PV wire), and future-proofing for EVs; use software for iterative sizing in high-irradiance zones.

## Best Practices

### Sizing Guidelines
Always apply 125% safety factor for inverters; prefer copper for <100 ft runs, aluminum for longer with 1.6x size adjustment to maintain conductivity.

### Integration with Design
Pair with string calcs for balanced I/V; use color-coded wires (black for +, white for -) and pull boxes every 100 ft for conduit ease.

### Derating and Inspection Adjustments
Reduce ampacity 14% for 40-45°C roofs; verify with thermal imaging post-install, adapting for 2025 seismic zones with flexible conduits.

### Common Pitfalls to Avoid
- Overfilling conduits causing heat buildup (stick to 53% max for 1-2 wires)
- Ignoring circular mil area for mixed gauges
- Using indoor wire outdoors leading to degradation

### Sustainability Tie-In
Opt for recyclable PVC-free conduits and low-embodied-carbon cables to cut lifecycle emissions by 20%, aligning with 2025 IRA bonuses for green materials.

---

## Key Takeaways

✅ **Voltage Drop**: Target <3% for DC runs  
✅ **Ampacity Factor**: 1.25x for continuous loads  
✅ **Conduit Fill**: Max 40% for 3+ conductors  
✅ **Temperature Derating**: 14% reduction at 40-45°C  
✅ **Material Waste**: 15% reduction with AI-enhanced sizing tools  
✅ **Lifecycle Emissions**: 20% reduction with recyclable materials  
  `
};

export default lesson;

