import type { Lesson } from '@/types/course';

const lesson: Lesson = {
  id: 1,
  title: 'Basic Electrical Theory (Volts, Amps, Watts, Ohms)',
  duration: '25 minutes',
  type: 'video',
  videoUrl: 'https://youtu.be/KqckpPH0mPs',
  content: `
# Basic Electrical Theory (Volts, Amps, Watts, Ohms) ⚡

Basic electrical theory underpins solar PV system design, providing the foundation for calculating power flows, sizing components, and optimizing efficiency to avoid losses that can reach 10-15% from mismatches. Volts measure potential difference, amps quantify current flow, watts represent power output, and ohms denote resistance—together enabling Ohm's Law (V = I × R) and power formulas (P = V × I) for precise array and inverter matching. In 2025, with high-voltage modules (up to 70V) and smart grids demanding <1% harmonic distortion, grasping these concepts supports AI-optimized designs, reducing installation errors by 20% per NABCEP reports and accelerating the shift to 2 TW global PV capacity.

## Key Concepts

### 1. Volts (V)
The unit of electrical potential or "pressure" driving current through a circuit. In solar, panel Voc (open-circuit voltage) typically ranges 30-50V; strings add voltages for efficient MPPT tracking (e.g., 300-600V), but cold temps can boost Voc by 20%, requiring derating to prevent inverter damage.

### 2. Amps (A)
Measures current, the flow rate of electrons. Modules produce 8-12A Imp (maximum power current); parallel strings sum amps for higher capacity, but high currents demand thicker wires to limit drops (<3%).

### 3. Watts (W)
Power as the product of volts and amps (P = V × I), indicating energy delivery rate. A 400W panel at 40V delivers 10A; system sizing targets kW totals matching loads, with efficiencies >20% in 2025 PERC/HJT cells boosting yields.

### 4. Ohms (Ω)
Resistance opposing current flow, causing I²R losses in wires (e.g., 0.5Ω run drops 2% at 10A). Grounding minimizes impedance (<1Ω) for safety; tools calculate based on material (copper at 1.68×10⁻⁸ Ω·m) and length.

## Best Practices

### Application Guidelines
Always use STC (25°C, 1000 W/m²) ratings for calcs, derating 10-15% for real-world temps; apply P = V × I × PF (power factor ~1 for DC) in AC legs.

### Integration with Design
Pair concepts for stringing (sum V, match I to MPPT); test circuits with multimeters to verify <5% variance from theory.

### Safety Adjustments
Limit Voc to 80% of inverter max; calculate grounding resistance annually, targeting <5Ω in moist soils per IEEE 80.

### Common Pitfalls to Avoid
- Confusing AC/DC (e.g., RMS vs. peak V)
- Ignoring temperature coeffs (0.3-0.5%/°C for V)
- Overlooking reactive power in grid-tied setups causing >10% losses

### Sustainability Tie-In
Optimize low-resistance designs to cut copper use by 15%, aligning with 2025 RE100 goals for efficient, low-carbon PV deployments.

---

## Key Takeaways

✅ **Ohm's Law**: V = I × R (fundamental relationship)  
✅ **Power Formula**: P = V × I  
✅ **Voc Range**: 30-50V typical for panels  
✅ **Cold Weather**: Voc can boost 20% in cold temps  
✅ **Wire Losses**: I²R losses, keep <3% voltage drop  
✅ **Grounding**: <1Ω impedance for safety  
  `
};

export default lesson;

