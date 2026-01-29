import type { Lesson } from '@/types/course';

export const lesson2DataAndNetworking: Lesson = {
  id: 2,
  title: 'Data Cabling and Networking',
  duration: '45 min',
  type: 'reading',
  content: {
    textContent: `
# Data Cabling and Networking 💻

## Structured Cabling Systems

### Components
- Horizontal cabling (workstation to telecom room)
- Backbone cabling (between telecom rooms)
- Work area outlets
- Patch panels
- Cable management
- Telecommunications rooms

---

## Cable Types

### Category Cables
- **Cat5e**: 100 MHz, up to 1 Gbps, 100m max
- **Cat6**: 250 MHz, up to 10 Gbps at 55m
- **Cat6a**: 500 MHz, up to 10 Gbps at 100m
- **Cat7/8**: Higher performance for data centers

### Fiber Optic
- Single-mode: Long distance (km), laser light
- Multi-mode: Short distance (300-550m), LED light
- Immune to electromagnetic interference
- Higher bandwidth than copper

---

## Installation Standards

### TIA/EIA-568
- Commercial building telecommunications cabling standard
- Specifies cable types, distances, terminations
- Pin/pair assignments (T568A or T568B)

### Best Practices
- Maintain minimum bend radius (4x cable diameter)
- Don't exceed pulling tension
- Avoid kinks and sharp bends
- Support cables properly
- Test all cable runs

---

## Termination

### RJ45 Connectors
- 8-position modular connector
- T568A or T568B wiring schemes
- Use proper crimping tool
- Test after termination

### Patch Panels
- Centralized termination point
- 110-punch down blocks
- Krone or 66 blocks for phone
- Proper cable management

---

## Testing

### Cable Testers
- Continuity testing
- Wire map verification
- Length measurement
- Performance certification

### Certification Testing
- Attenuation
- Near-end crosstalk (NEXT)
- Return loss
- Propagation delay

---

## Network Equipment

- Switches and routers
- Patch panels
- Cable management systems
- Racks and cabinets
- Power over Ethernet (PoE) devices

---

## 💡 Key Takeaways

- Structured cabling requires careful planning
- Follow TIA/EIA standards
- Proper termination critical for performance
- Testing ensures reliability
- Documentation essential for maintenance
    `
  }
};

