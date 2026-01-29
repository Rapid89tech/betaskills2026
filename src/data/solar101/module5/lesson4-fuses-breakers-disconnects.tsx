import type { Lesson } from '@/types/course';

const lesson: Lesson = {
  id: 4,
  title: 'Fuses, Breakers, and Disconnects',
  duration: '20 minutes',
  type: 'video',
  videoUrl: 'https://youtu.be/z08PgVI60dA',
  content: `
# Fuses, Breakers, and Disconnects 🔒

Fuses, breakers, and disconnects are essential overcurrent and isolation devices in solar PV systems, safeguarding against faults like short circuits or ground arcs that could cause fires or equipment damage, while enabling safe maintenance. Fuses provide one-time protection by melting links, breakers offer resettable tripping via thermal or magnetic mechanisms, and disconnects allow manual circuit isolation per NEC 690. In 2025, with DC arc-fault circuit interrupter (AFCI) mandates expanding to all residential installs under updated UL 1699B and a 28% surge in U.S. PV capacity additions per SEIA, DC-rated hybrids are cutting response times to <10ms, enhancing safety in high-voltage strings up to 1500V.

## Key Components

### 1. Fuses
Semiconductor or gPV-rated for DC, with time-delay or fast-acting curves to handle inrush currents (2-3x Isc); placed in combiner boxes to protect strings individually, interrupting arcs without reignition.

### 2. Circuit Breakers
DC-rated thermal-magnetic or electronic types for main feeders and inverters; include AFCI/GFCI integration for multi-function protection, resettable for cost savings over fuses in frequent-fault scenarios.

### 3. Disconnect Switches
Load-break rated for PV (e.g., 600-1000V DC), with visible blade or rotary designs; required at arrays, inverters, and service entrances for lockout/tagout, supporting rapid shutdown per NEC 690.12.

### 4. Hybrid and Advanced Options
Modular combiner panels with fused breakers and auto-disconnects; 2025 smart versions with IoT monitoring for remote tripping, aligning with IEEE 1547 for grid resilience.

## Best Practices

### Sizing and Placement Guidelines
Rate fuses/breakers at 1.56x Isc for DC strings; place disconnects within 6 ft of arrays for accessibility, using weatherproof enclosures (NEMA 4X) in outdoor setups.

### Coordination and Selectivity
Ensure upstream breakers trip last via time-current curves; integrate AFCI for <50ms arc detection, reducing fire risks by 70% in shaded arrays.

### Testing and Maintenance Adjustments
Megger-test annually for continuity (>1MΩ insulation); label devices clearly and train on lockout procedures, adapting for 2025 high-temp derating (e.g., 0.8 factor at 50°C).

### Common Pitfalls to Avoid
- Using AC-rated devices on DC (causes welding)
- Oversizing for inrush ignoring continuous 125% factor
- Neglecting visible-break disconnects leading to live hazards

### Sustainability Tie-In
Choose recyclable polymer housings and low-energy trip units to lower embodied carbon by 15%; pair with VPP-enabled breakers for grid-stabilizing services under FERC Order 2222.

---

## Key Takeaways

✅ **AFCI Mandate**: All residential installs per UL 1699B updates  
✅ **Response Time**: <10ms with DC-rated hybrids  
✅ **Fuse Rating**: 1.56x Isc for DC strings  
✅ **Disconnect Placement**: Within 6 ft of arrays  
✅ **Fire Risk Reduction**: 70% with AFCI integration  
✅ **Capacity Growth**: 28% surge in U.S. PV additions  
  `
};

export default lesson;

