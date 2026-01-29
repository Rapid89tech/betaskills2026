import type { Lesson } from '@/types/course';

export const lesson3SeriesParallelCircuits: Lesson = {
  id: 3,
  title: 'Series and Parallel Circuits',
  duration: '45 min',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/gCniSIVC6K0',
    textContent: `
# Series and Parallel Circuits 🔌

## Introduction
Electrical circuits can be connected in different ways to control current and voltage. Two fundamental types are Series and Parallel circuits.

---

## Series Circuits

### Definition
Components connected end-to-end, so the same current flows through all components.

### Characteristics
- **Current (I)**: Same through all components
  - I_total = I₁ = I₂ = I₃
- **Voltage (V)**: Total voltage = sum of individual voltages
  - V_total = V₁ + V₂ + V₃
- **Resistance (R)**: Total resistance = sum of individual resistances
  - R_total = R₁ + R₂ + R₃

### Implications
- If one component fails (open circuit), entire circuit stops
- Adding more resistors increases total resistance
- Decreases total current

### Example
Three resistors 5Ω, 10Ω, and 15Ω in series:
- R_total = 5 + 10 + 15 = **30 Ω**

---

## Parallel Circuits

https://youtu.be/wKSeH_2dSMY

### Definition
Components connected across the same two points, so voltage across each is the same.

### Characteristics
- **Voltage (V)**: Same across each component
  - V_total = V₁ = V₂ = V₃
- **Current (I)**: Total current = sum of individual currents
  - I_total = I₁ + I₂ + I₃
- **Resistance (R)**: Total resistance less than smallest individual resistance
  - 1/R_total = 1/R₁ + 1/R₂ + 1/R₃

### For Two Resistors in Parallel
R_total = (R₁ × R₂) / (R₁ + R₂)

### Implications
- If one branch fails, current still flows through other branches
- Adding more resistors decreases total resistance
- Increases total current

### Example
Two resistors 6Ω and 3Ω in parallel:
- 1/R_total = 1/6 + 1/3 = 1/6 + 2/6 = 3/6
- R_total = 6/3 = **2 Ω**

---

## Comparison Table

| Property | Series Circuit | Parallel Circuit |
|----------|----------------|------------------|
| **Current** | Same through all | Splits among branches |
| **Voltage** | Splits across components | Same across all |
| **Resistance** | R_total = R₁ + R₂ + ... | 1/R_total = 1/R₁ + 1/R₂ + ... |
| **Failure** | One break stops all | One break doesn't affect others |

---

## Real-World Applications

### Series Circuits
- Christmas lights (older style)
- Battery banks (increases voltage)
- Voltage dividers

### Parallel Circuits
- Home wiring (outlets, lights)
- Battery banks (increases current capacity)
- Independent operation of multiple devices

---

## 💡 Key Takeaways

- Series circuits have single current path
- Parallel circuits have multiple current paths
- Home electrical systems use parallel wiring
- Understanding circuit types essential for troubleshooting
- Different calculations for series vs parallel
- Safety implications vary by circuit type
    `
  }
};

