import type { Lesson } from '@/types/course';

export const lesson4ACvsDC: Lesson = {
  id: 4,
  title: 'AC vs DC Power',
  duration: '40 min',
  type: 'reading',
  content: {
    textContent: `
# AC vs DC Power ⚡🔋

## Introduction

Understanding the difference between Alternating Current (AC) and Direct Current (DC) is fundamental for electricians.

---

## Direct Current (DC)

### Definition
Current flows in one direction only, from positive to negative terminal.

### Sources
- Batteries
- Solar panels
- DC power supplies
- Vehicle electrical systems

### Characteristics
- Constant polarity
- Steady voltage and current
- Easier to store (batteries)
- Lower transmission efficiency over long distances

### Applications
- Electronics and digital devices
- Automotive systems
- Renewable energy systems (solar, wind)
- Battery-powered tools
- LED lighting

---

## Alternating Current (AC)

### Definition
Current periodically reverses direction, typically in a sinusoidal wave pattern.

### Sources
- Power grid (utility companies)
- Generators
- Alternators
- Most power plants

### Characteristics
- Periodically changing polarity
- Characterized by frequency (Hz)
- **50 Hz** in most of the world
- **60 Hz** in North America and parts of South America
- Efficient for long-distance transmission
- Can be easily transformed (stepped up/down)

### Applications
- Household power (wall outlets)
- Commercial buildings
- Industrial equipment
- Motors and appliances
- Power distribution networks

---

## Key Differences

| Feature | AC | DC |
|---------|----|----|
| **Direction** | Changes periodically | Constant one direction |
| **Voltage** | Varies sinusoidally | Constant |
| **Transmission** | Efficient over long distances | Less efficient |
| **Transformation** | Easy with transformers | Requires converters |
| **Storage** | Difficult | Easy (batteries) |
| **Safety** | More dangerous (can't let go) | Causes muscular contraction |
| **Common Use** | Power grid, home outlets | Batteries, electronics |

---

## Frequency

### Definition
Rate at which AC current changes direction, measured in Hertz (Hz)

### Standard Frequencies
- **50 Hz**: Europe, Asia, Africa, Australia
- **60 Hz**: North America, parts of South America

### Importance
- Affects motor speed
- Influences transformer design
- Critical for equipment compatibility
- Different equipment for different frequencies

---

## AC Waveform Parameters

### Peak Voltage
- Maximum voltage in AC cycle
- Important for insulation requirements

### RMS (Root Mean Square)
- Effective voltage for AC
- Used for calculations
- 120 V AC (RMS) = 170 V peak

### Period
- Time for one complete cycle
- Period = 1 / Frequency

---

## Safety Considerations

### AC Hazards
- More dangerous than DC at same voltage
- Can cause muscular tetanus (can't let go)
- Heart fibrillation more likely
- Transformer shock potential

### DC Hazards
- Can cause sustained muscle contraction
- Burns at contact points
- Electrolysis effects
- Still potentially lethal

### Both Require
- Proper lockout/tagout
- Appropriate PPE
- Voltage testing before work
- Respect for all voltage levels

---

## Conversion Between AC and DC

### AC to DC (Rectification)
- Used in power supplies
- Diodes and rectifier circuits
- Smoothing capacitors

### DC to AC (Inversion)
- Used in solar systems, UPS
- Inverter circuits
- Creates AC from DC sources

---

## 💡 Key Takeaways

- AC and DC have different characteristics and applications
- Most power grids use AC for efficiency
- Electronics typically use DC
- Understanding both is essential for electricians
- Different safety considerations for each
- Always verify which type you're working with
- Use appropriate test equipment for AC vs DC
    `
  }
};

