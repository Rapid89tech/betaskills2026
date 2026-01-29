import type { Lesson } from '@/types/course';

export const lesson1SolarPowerSystems: Lesson = {
  id: 1,
  title: 'Solar Power Systems and Installation',
  duration: '50 min',
  type: 'reading',
  content: {
    textContent: `
# Solar Power Systems 🌞

## Solar PV System Components

### Solar Panels (PV Modules)
- Convert sunlight to DC electricity
- Rated in watts (typically 300-400W per panel)
- 25-30 year lifespan
- Series/parallel connections for desired voltage/current

### Inverters
- Convert DC from panels to AC for grid/home
- **String inverters**: Single unit for array
- **Microinverters**: One per panel
- **Power optimizers**: DC to DC conversion
- Monitor system performance

### Racking and Mounting
- Roof-mounted systems
- Ground-mounted systems
- Tracking systems (sun-following)
- Must withstand wind and weather loads

### Balance of System
- Combiner boxes
- Disconnect switches
- AC/DC disconnects
- Grounding equipment
- Monitoring systems

---

## Types of Solar Systems

### Grid-Tied Systems
- Connected to utility grid
- Net metering capability
- No battery storage
- Most common and cost-effective

### Off-Grid Systems
- Complete independence from utility
- Battery storage required
- Backup generator often included
- Sized for all loads

### Hybrid Systems
- Grid-connected with battery backup
- Best of both worlds
- Backup power during outages
- More expensive than grid-tied

---

## Installation Process

### 1. Site Assessment
- Roof condition and orientation
- Shading analysis
- Electrical service capacity
- Local codes and permits

### 2. System Design
- Calculate energy needs
- Size array and inverter
- Plan wire routing
- Design meets code

### 3. Installation
- Install racking/mounting
- Mount solar panels
- Run DC and AC wiring
- Install inverter and disconnects
- Connect to electrical service
- Install monitoring

### 4. Inspection and Commissioning
- Electrical inspection
- Utility interconnection approval
- System testing
- Customer training

---

## Electrical Requirements

### Code Compliance
- Follow NEC Article 690 (Solar PV Systems)
- Rapid shutdown requirements
- Proper labeling required
- Arc-fault protection (for rooftop systems)

### Wiring
- Use PV-rated wire
- Properly sized conductors
- UV-resistant for exposed runs
- Proper grounding essential

### Disconnects
- DC disconnect at array
- AC disconnect at inverter
- Service disconnect
- All labeled and accessible

---

## Safety Considerations

- Roof work hazards
- Arc flash in DC systems
- Rapid shutdown requirements
- Proper PPE for installation
- Lockout/tagout during maintenance
- String voltages can exceed 600V

---

## Maintenance

- Keep panels clean
- Inspect for damage
- Check connections annually
- Monitor performance
- Inverter software updates
- Verify grounding integrity

---

## 💡 Key Takeaways

- Solar installations require specialized knowledge
- NEC Article 690 governs solar PV
- Proper design critical for performance
- Safety training essential
- Growing field with good opportunities
- Certification available (NABCEP)
    `
  }
};

