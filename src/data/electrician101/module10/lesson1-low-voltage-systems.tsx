import type { Lesson } from '@/types/course';

export const lesson1LowVoltageSystems: Lesson = {
  id: 1,
  title: 'Low Voltage Systems Overview',
  duration: '40 min',
  type: 'reading',
  content: {
    textContent: `
# Low Voltage Systems Overview 📡

## What are Low Voltage Systems?

### Definition
Low voltage systems typically operate at less than 50 volts and include communication, data, security, and control systems.

### Common Applications
- Telephone systems
- Data and network cabling
- Doorbell and intercom systems
- Security and surveillance cameras
- Access control systems
- Audio/video systems
- Fire alarm systems
- Building automation controls

---

## Advantages of Low Voltage

- Safer to work with (less shock hazard)
- Less strict code requirements
- Smaller, lighter cabling
- Easier to modify and expand
- Cost-effective for signal transmission
- Can use wireless alternatives

---

## Low Voltage vs Line Voltage

| Feature | Low Voltage | Line Voltage |
|---------|-------------|--------------|
| **Voltage** | <50V typically | 120V-480V |
| **Safety** | Lower shock risk | High shock risk |
| **Wiring** | Smaller gauge | Larger gauge |
| **Installation** | Less restrictive | Strict NEC codes |
| **Cost** | Lower material cost | Higher cost |
| **Applications** | Signals, controls | Power delivery |

---

## Low Voltage Wiring Types

### Category Cables (Cat5e, Cat6, Cat6a)
- Used for data and telecommunications
- Twisted pair copper conductors
- Different categories for different speeds
- **Cat5e**: Up to 1 Gbps
- **Cat6**: Up to 10 Gbps
- **Cat6a**: Up to 10 Gbps at longer distances

### Coaxial Cable
- Central conductor with shield
- Used for video, cable TV, internet
- RG-6 most common for residential

### Speaker Wire
- Two-conductor cable
- Various gauges (12-18 AWG common)
- Used for audio systems

### Thermostat Wire
- Multi-conductor (18-24 AWG)
- Controls HVAC systems
- Color-coded conductors

---

## Installation Considerations

- Separate from line voltage wiring
- Maintain 2" separation or use barrier
- Use proper cable types for application
- Label all terminations
- Test after installation
- Document cable runs

---

## Power Supplies

- Transform 120V to low voltage
- Plug-in transformers
- Hardwired power supplies
- Must be UL listed
- Proper amperage for load

---

## 💡 Key Takeaways

- Low voltage safer but still requires proper installation
- Many different systems and applications
- Follow manufacturer specifications
- Proper separation from line voltage critical
- Testing ensures proper operation
    `
  }
};

