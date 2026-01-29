import type { Lesson } from '@/types/course';

const lesson: Lesson = {
  id: 3,
  title: 'Electrical Connections (Series vs. Parallel)',
  duration: '25 minutes',
  type: 'video',
  videoUrl: 'https://youtu.be/Jq2jaO5L13o',
  content: `
# Electrical Connections (Series vs. Parallel) 🔌

Electrical connections in solar PV arrays determine how panels are wired—series (end-to-end for added voltage), parallel (side-by-side for added current), or hybrids—to optimize system performance, match inverter inputs, and minimize losses from shading or mismatches. Series setups boost voltage for efficient long-distance transmission and higher MPPT tracking, while parallel enhances current and fault tolerance; improper choices can cut yields by 10-20%. In 2025, with module voltages rising to 60-70V and rapid shutdown mandates under NEC 690.12, series-parallel hybrids dominate 40% of installs for resilient, high-efficiency strings, enabling 5-10% better performance in diverse climates.

## Key Configurations

### 1. Series Wiring
Connects positive to negative terminals across panels, summing voltages (e.g., 4x 40V panels = 160V) while current stays constant. 

**Pros**: 
- Reduces wiring losses (I²R)
- Suits high-voltage inverters

**Cons**: 
- Shading one panel impacts the string via bypass diodes

### 2. Parallel Wiring
Links positives together and negatives together, summing currents (e.g., 4x 10A panels = 40A) at fixed voltage. 

**Pros**: 
- Independent panel operation for better partial shading tolerance

**Cons**: 
- Higher current needs thicker cables
- Lower inverter efficiency at low voltages

### 3. Series-Parallel Hybrid
Groups panels in series strings then parallels strings (e.g., 2 strings of 4 panels). Balances voltage/current for large arrays; ideal for rooftops with varied shading, using combiners for safe aggregation.

## Best Practices

### Inverter Matching Guidelines
Size series strings to fit MPPT ranges (e.g., 200-600V); limit to 80% of max Voc at cold temps (-20°C derate); use parallel for low-voltage systems under 150V.

### Shading and Mismatch Mitigation
Incorporate bypass/blocking diodes in modules; prefer series-parallel for uneven roofs, reducing losses to <5% with optimizers like Tigo.

### Safety and Code Adjustments
Fuse parallels at 1.56x Isc per NEC; ground midpoints in series for rapid shutdown; test with multimeters pre-commissioning.

### Common Pitfalls to Avoid
- Exceeding Voc causing inverter shutdowns
- Ignoring temperature coefficients (add 0.3%/°C)
- Skimping on UV-rated MC4 connectors leading to failures

### Sustainability Tie-In
Optimize hybrids to minimize copper use (20% less wiring), supporting 2025 circular economy standards for recyclable components and lower embodied carbon.

---

## Key Takeaways

✅ **Series**: Sums voltage, reduces wiring losses, needs bypass diodes  
✅ **Parallel**: Sums current, better shade tolerance, requires thicker cables  
✅ **Hybrid**: 40% of 2025 installs, 5-10% better performance  
✅ **NEC 690.12**: Rapid shutdown mandates for series strings  
✅ **Module Voltage**: Rising to 60-70V in 2025  
✅ **Copper Savings**: 20% less wiring with optimized hybrids  
  `
};

export default lesson;

