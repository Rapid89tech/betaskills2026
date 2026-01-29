import type { Lesson } from '@/types/course';

export const lesson1VoltageCurrentResistance: Lesson = {
  id: 1,
  title: 'Voltage, Current, Resistance, and Power',
  duration: '50 min',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/wmaobOy8r6I',
    textContent: `
# Voltage, Current, Resistance, and Power ⚡

## I. Voltage (V)

### Definition
Voltage, also called electric potential difference, is the force or pressure that drives electric charges (electrons) through a conductor. It represents the energy per unit charge available to move electrons, creating an electric current.

### Unit
**Volts (V)** - Named after Alessandro Volta

**Voltage Classifications:**
- **Low Voltage**: Below 600V (household and small commercial)
- **Medium Voltage**: 600V to 69,000V (industrial or utility)
- **High Voltage**: Above 69,000V (power transmission lines)

### Analogy
**Water Pressure in a Pipe** - Higher voltage drives more current, just as higher water pressure pushes more water through a pipe.

### Measurement
- Measured with a **Voltmeter** connected in parallel
- Use properly rated, calibrated voltmeter
- "Test before you touch" - always verify de-energization
- Non-contact voltage testers enhance safety

### Safety Considerations
- Higher voltages increase risk of shock, arc flash, and burns
- Even low voltages (50V AC or 120V DC) can be dangerous
- Ensure tools and PPE are rated for voltage being worked on
- Always check equipment labels or conduct arc flash risk assessment

---

## II. Current (I)

https://youtu.be/8Posj4WMo0o

### Definition
Current is the flow of electric charge (electrons) through a conductor. It quantifies the rate at which electrons move past a specific point in a circuit per second.

### Unit
**Amperes (A or amps)** - Named after André-Marie Ampère

**Current Classifications:**
- **Milliamps (mA)**: 1–100 mA (low-power devices, but can still be lethal)
- **Amps (A)**: 1–10 A or more (household and industrial systems)

### Analogy
**Flow Rate of Water** - Current is like the volume of water flowing through a pipe. Higher current = greater flow of charge.

### Measurement
- Measured with an **Ammeter** connected in series
- Clamp-on ammeters measure without breaking circuit (safer)
- Use properly rated ammeter

### Safety Considerations
- Current through body determines shock severity
- **6–10 mA**: Painful shocks, loss of muscle control
- **50+ mA**: Ventricular fibrillation, death
- Even milliamps can be hazardous in AC systems
- Use GFCIs to detect and interrupt small current leaks
- Wear insulated gloves and use insulated tools
- High-current systems increase arc flash risk

---

## III. Resistance (R)

https://youtu.be/FFHUoWFtab0

### Definition
Resistance is the opposition to the flow of electric current in a circuit or conductor. It restricts the amount of current that flows for a given voltage.

### Unit
**Ohms (Ω)** - Named after Georg Simon Ohm

Range: From milliohms (mΩ) in conductors to megaohms (MΩ) in insulators

### Analogy
**Narrowness or Roughness in a Pipe** - High resistance restricts flow, low resistance allows more flow.

### Factors Affecting Resistance
1. **Material Type**: Conductors (copper, aluminum) = low resistance; Insulators (rubber, glass) = high resistance
2. **Length**: Longer conductors = higher resistance
3. **Cross-Sectional Area**: Thicker conductors = lower resistance
4. **Temperature**: Higher temperature usually = higher resistance

### Measurement
- Measured with an **Ohmmeter** (part of multimeter)
- Circuit must be de-energized before measuring
- Use LOTO procedures before measuring

### Safety Considerations
- Human body resistance varies (1 kΩ to 100 kΩ)
- Wet skin drastically lowers resistance → increases current flow
- High resistance in circuits can cause overheating and fires
- Low resistance in unintended paths can cause arc flash
- Maintain equipment to prevent corrosion (increases resistance)

---

## IV. Power (P)

**VIDEO**: https://youtu.be/VSpB3HivkhY

### Definition
Power is the rate at which electrical energy is used, transferred, or converted in a circuit (heat, light, mechanical work).

### Unit
**Watts (W)** - Named after James Watt
- **Kilowatts (kW)**: 1 kW = 1,000 W
- **Megawatts (MW)**: 1 MW = 1,000,000 W

### Formula
Basic: **P = V × I**

Derived forms:
- **P = I² × R** (using Ohm's Law)
- **P = V² / R** (using Ohm's Law)

### Examples
- 60 W light bulb: Consumes 60 watts
- Industrial motor: May consume several kilowatts
- Arc flash incident: Can release thousands of watts

### Safety Considerations
- Higher power levels = greater hazard risks
- High power can cause severe arc flashes
- Use properly rated fuses, circuit breakers, conductors
- De-energize and LOTO before working on high-power systems
- Wear arc-rated PPE in high-power environments
- Regular inspections prevent power-related hazards

---

## Summary Table

| Quantity | Symbol | Unit | Description |
|----------|--------|------|-------------|
| Voltage | V | Volts (V) | Electric pressure pushing charges |
| Current | I | Amps (A) | Flow rate of electric charge |
| Resistance | R | Ohms (Ω) | Opposition to current flow |
| Power | P | Watts (W) | Rate of energy consumption/transfer |

---

## 💡 Key Takeaways

- Voltage causes current to flow through resistance
- Increasing voltage or decreasing resistance increases current
- Power depends on both voltage and current
- Understanding these quantities is essential for safe electrical work
- Proper measurements and calculations prevent hazards
    `
  }
};

