import type { Lesson } from '@/types/course';

export const lesson2OhmsLaw: Lesson = {
  id: 2,
  title: 'Ohm\'s Law and Power Law',
  duration: '45 min',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/HsLLq6Rm5tU',
    textContent: `
# Ohm's Law and Power Law 📐

## I. Ohm's Law

### Formula
**V = I × R**

Where:
- V = Voltage (Volts)
- I = Current (Amperes)
- R = Resistance (Ohms)

### Rearranged Forms
- **To Find Current**: I = V / R
- **To Find Resistance**: R = V / I

### Applications
- Circuit design and analysis
- Troubleshooting electrical problems
- Safety assessments
- Equipment selection

### Safety Implications
- Explains why low resistance (wet skin, short circuits) results in high currents
- Helps predict shock severity
- Essential for safe circuit design

https://youtu.be/Wxdr8W3b_Kc

---

## II. Power Law

### Basic Formula
**P = V × I**

Where:
- P = Power (Watts)
- V = Voltage (Volts)
- I = Current (Amperes)

### Derived Forms
- **P = I² × R** (using Ohm's Law)
- **P = V² / R** (using Ohm's Law)

### Applications
- Calculate energy consumption
- Component selection (wires, fuses, breakers)
- Safety assessments
- Arc flash risk calculations
- Load management

### Safety Considerations
- High power = greater hazard risks
- Circuits with kilowatts+ pose arc flash risks
- Use proper overcurrent protection
- De-energize before working on high-power circuits
- Wear arc-rated PPE per NFPA 70E

---

## Summary Table

| Law | Formula | Variables | Use |
|-----|---------|-----------|-----|
| **Ohm's Law** | V = I × R | Voltage, Current, Resistance | Calculate V, I, or R |
| **Power Law** | P = V × I | Power, Voltage, Current | Calculate power consumption |
| **Derived** | P = I² × R<br>P = V² / R | Power, Current/Voltage, Resistance | Alternate power calculations |

---

## Practical Examples

### Example 1: Ohm's Law
Resistor: R = 10 Ω, Current: I = 2 A
- V = I × R = 2 × 10 = **20 V**

### Example 2: Power Law
Using same values:
- P = I² × R = 2² × 10 = 4 × 10 = **40 W**
- Or: P = V × I = 20 × 2 = **40 W**

---

## 💡 Tips
- Always check units before calculations
- Use Ohm's Law to find missing values
- Use Power Law to calculate energy consumption and heat
- Remember derived forms simplify complex calculations
- Apply these laws in every electrical calculation
    `
  }
};

