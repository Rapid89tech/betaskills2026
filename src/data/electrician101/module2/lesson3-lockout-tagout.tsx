import type { Lesson } from '@/types/course';

export const lesson3LockoutTagout: Lesson = {
  id: 3,
  title: 'Lockout/Tagout (LOTO) Procedures',
  duration: '45 min',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/7nptmUT71s8',
    textContent: `
# Lockout/Tagout (LOTO) Procedures 🔒

## What is Lockout/Tagout (LOTO)?

Lockout/Tagout (LOTO) is a safety procedure designed to ensure that machines, equipment, and electrical systems are completely de-energized and cannot be accidentally started or energized during maintenance, repair, or servicing activities.

---

## Purpose of LOTO

- Prevent accidental energization of equipment
- Protect workers from electric shock
- Prevent arc flash incidents
- Eliminate unexpected equipment startup
- Ensure safe maintenance and repair operations
- Comply with OSHA 29 CFR 1910.147

---

## LOTO Process Steps

### 1. Preparation
- Identify all energy sources (electrical, mechanical, hydraulic, pneumatic)
- Notify affected personnel of the lockout
- Review equipment-specific procedures

### 2. Shutdown
- Turn off equipment using normal shutdown procedures
- Use control switches, buttons, or panels
- Verify equipment has stopped completely

### 3. Isolation
- Disconnect all energy sources
- Open circuit breakers or disconnect switches
- Close valves, remove fuses
- Block mechanical parts

### 4. Lockout/Tagout Application
- Apply locks to energy-isolating devices
- Attach tags with worker information and date
- Each worker applies their own lock
- Use standardized locks and tags

### 5. Stored Energy Release
- Discharge capacitors
- Release hydraulic/pneumatic pressure
- Block springs or moving parts
- Allow equipment to cool

### 6. Verification
- Test equipment to confirm de-energization
- Use voltage meters or test equipment
- Attempt to start equipment (should not start)
- Verify zero energy state

### 7. Work Performance
- Perform maintenance or repair work
- Maintain awareness of other energy sources
- Keep equipment locked out throughout work

### 8. Restoration
- Remove tools and materials
- Replace guards and safety devices
- Notify affected personnel
- Remove locks and tags (only by person who applied them)
- Restore energy and test equipment

---

## Key LOTO Components

### Locks
- Durable, standardized locks
- Unique keys for each worker
- Cannot be removed without key or cutting
- Red color standard for visibility

### Tags
- Clearly identify who locked out equipment
- Include date, time, and reason
- Warning: "Do Not Operate"
- Durable, weather-resistant material

### Group Lockout
- Multiple workers on same equipment
- Lockout box or hasp for multiple locks
- Each worker applies individual lock
- Last worker to finish removes last lock

---

## OSHA Requirements

- Employer must establish LOTO program
- Written procedures for equipment
- Training for affected and authorized employees
- Annual inspections of LOTO procedures
- Documentation of training and inspections

---

## 💡 Critical Safety Points

- **Never remove another worker's lock or tag**
- Always test equipment after lockout
- Don't assume equipment is de-energized
- Use proper test equipment
- Follow procedures exactly—no shortcuts
- When in doubt, get supervision

Remember: LOTO saves lives! It's your most important safety procedure.
    `
  }
};

