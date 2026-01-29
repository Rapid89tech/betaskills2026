import type { Lesson } from '@/types/course';

export const lesson1TroubleshootingBasics: Lesson = {
  id: 1,
  title: 'Electrical Troubleshooting Fundamentals',
  duration: '45 min',
  type: 'reading',
  content: {
    textContent: `
# Electrical Troubleshooting Fundamentals 🔍

## Systematic Troubleshooting Approach

### 1. Gather Information
- Talk to user/operator
- Document symptoms
- Note when problem occurs
- Check for recent changes
- Review maintenance history

### 2. Visual Inspection
- Look for obvious problems
- Check for burn marks
- Inspect for loose connections
- Look for damaged components
- Check indicator lights

### 3. Test and Measure
- Verify power supply
- Measure voltages
- Check continuity
- Test grounds
- Measure current draw

### 4. Analyze Results
- Compare to normal values
- Identify abnormalities
- Consider possible causes
- Prioritize likely issues

### 5. Repair or Replace
- Fix identified problem
- Replace faulty components
- Make necessary adjustments
- Document repairs

### 6. Test and Verify
- Restore power
- Test system operation
- Verify problem resolved
- Monitor for recurrence

---

## Common Electrical Problems

### No Power
- Check circuit breaker
- Verify power source
- Test for voltage at panel
- Check for tripped GFCI
- Inspect main disconnect

### Intermittent Operation
- Loose connections
- Faulty switch or relay
- Overheating components
- Vibration issues
- Environmental factors

### Overheating
- Overloaded circuit
- Poor connections
- Undersized conductors
- Inadequate ventilation
- Equipment malfunction

### Tripping Breakers
- Overload condition
- Short circuit
- Ground fault
- Faulty breaker
- Nuisance tripping

---

## Diagnostic Tools

- Multimeter (voltage, current, resistance)
- Voltage tester (contact and non-contact)
- Clamp meter (current measurement)
- Megohmmeter (insulation testing)
- Thermal imaging camera
- Circuit tracer
- Power quality analyzer

---

## Safety During Troubleshooting

- De-energize before testing when possible
- Use proper test equipment
- Wear appropriate PPE
- Follow LOTO procedures
- Test in proper sequence
- Never bypass safety devices
- Document voltage levels

---

## Documentation

- Record symptoms
- Note test results
- Document repairs made
- Update maintenance logs
- Take photos when helpful
- Create repair history

---

## 💡 Key Takeaways

- Systematic approach finds problems faster
- Visual inspection often reveals issues
- Proper testing confirms diagnosis
- Safety first during all troubleshooting
- Good documentation prevents repeat problems
- Experience improves troubleshooting skills
    `
  }
};

