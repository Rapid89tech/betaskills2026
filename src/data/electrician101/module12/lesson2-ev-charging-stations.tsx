import type { Lesson } from '@/types/course';

export const lesson2EVChargingStations: Lesson = {
  id: 2,
  title: 'EV Charging Station Installation',
  duration: '45 min',
  type: 'reading',
  content: {
    textContent: `
# EV Charging Stations 🚗⚡

## Types of EV Chargers

### Level 1 Charging
- Uses standard 120V outlet
- 3-5 miles of range per hour
- No special installation required
- Included with most EVs
- Slowest charging option

### Level 2 Charging
- 240V dedicated circuit
- 25-30 miles of range per hour
- Most common for home installation
- Requires professional installation
- 16-80 amp circuits typical

### DC Fast Charging (Level 3)
- Commercial/public installations
- 480V three-phase power
- 60-100+ miles in 20 minutes
- Complex and expensive
- Specialized equipment required

---

## Level 2 Charger Installation

### Planning
- Verify electrical service capacity
- Determine charger location
- Calculate wire size and circuit requirements
- Check local codes and permits
- Utility rebates/incentives available

### Electrical Requirements
- Dedicated 240V circuit
- Typically 40-50 amp breaker
- 6 or 8 AWG wire
- GFCI protection required in some areas
- Must follow NEC Article 625

### Installation Steps
1. Install circuit breaker in panel
2. Run wire from panel to charger location
3. Install junction box or disconnect
4. Mount charger on wall or post
5. Make electrical connections
6. Test operation
7. Register with utility if required

---

## Code Requirements (NEC Article 625)

### Key Provisions
- Overcurrent protection required
- Ground-fault protection
- Disconnecting means
- Ventilation if in enclosed space
- Proper cable management
- Listed equipment only

### Outdoor Installation
- Weatherproof enclosure (NEMA 3R minimum)
- Proper height (avoid snow accumulation)
- Protected from vehicle impact
- Adequate lighting
- ADA accessibility if commercial

---

## Load Management

### Service Capacity
- Verify panel can handle additional load
- May require service upgrade
- Calculate total continuous load
- Consider future expansion

### Load Sharing
- Smart chargers can share circuits
- Load management systems
- Time-of-use optimization
- Utility demand response programs

---

## Commercial Installations

### Considerations
- Multiple charging stations
- ADA accessibility requirements
- Payment systems integration
- Network connectivity
- Signage and striping
- Maintenance access

### Power Requirements
- Higher power demands
- May need transformer upgrade
- Three-phase distribution
- Demand charges considerations

---

## Smart Features

- WiFi/cellular connectivity
- Usage monitoring and tracking
- Scheduling and timers
- Load management
- Mobile app control
- RFID access control

---

## Maintenance

- Inspect cables regularly
- Check connections
- Keep unit clean
- Software/firmware updates
- Test safety features
- Document usage and issues

---

## 💡 Key Takeaways

- EV charger market growing rapidly
- Level 2 most common for residential
- Proper sizing critical
- Code compliance required
- Good opportunity for electricians
- Additional certifications available
    `
  }
};

