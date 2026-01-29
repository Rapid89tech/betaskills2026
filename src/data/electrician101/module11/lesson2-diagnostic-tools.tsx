import type { Lesson } from '@/types/course';

export const lesson2DiagnosticTools: Lesson = {
  id: 2,
  title: 'Advanced Diagnostic Tools and Techniques',
  duration: '40 min',
  type: 'reading',
  content: {
    textContent: `
# Advanced Diagnostic Tools 🔬

## Essential Testing Equipment

### Digital Multimeter (DMM)
- **Measures**: Voltage, current, resistance, continuity
- **Features**: Auto-ranging, true RMS, data logging
- **Safety**: CAT III or CAT IV rated for electrical work
- **Uses**: Primary diagnostic tool for electricians

### Clamp Meter
- Measures current without breaking circuit
- Non-intrusive measurement
- AC and DC models available
- Useful for load verification

### Megohmmeter (Insulation Tester)
- Tests insulation resistance
- Applies high voltage (500V-5000V)
- Detects insulation breakdown
- Essential for preventive maintenance
- Never use on energized circuits

---

## Advanced Diagnostic Tools

### Thermal Imaging Camera
- Detects hot spots and temperature anomalies
- Identifies loose connections
- Overloaded circuits visible
- Preventive maintenance tool
- Non-contact measurement

### Power Quality Analyzer
- Measures voltage fluctuations
- Detects harmonics
- Analyzes power factor
- Records transients and sags
- Long-term monitoring capability

### Circuit Tracer
- Locate specific circuits in walls
- Find breakers for unlabeled circuits
- Trace wire paths
- Identify short circuits
- Saves time in troubleshooting

### Ground Resistance Tester
- Measures grounding system effectiveness
- Verifies ground rod resistance
- Ensures proper grounding
- Required for critical systems
- Three-point or clamp-on methods

---

## Specialized Test Equipment

### Motor Analyzers
- Test motor windings
- Measure insulation resistance
- Detect rotor/stator issues
- Evaluate motor health

### Phase Rotation Testers
- Verify three-phase rotation
- Prevent motor reverse rotation
- Quick visual indication
- Essential for motor installations

### Outlet Testers
- Verify wiring correctness
- Check for open ground
- Detect reversed polarity
- Test GFCI function

---

## Testing Procedures

### Voltage Testing
1. Set meter to voltage mode
2. Select AC or DC
3. Test meter on known source
4. Touch probes to test points
5. Read and record values

### Continuity Testing
1. De-energize circuit (LOTO)
2. Set meter to continuity mode
3. Touch probes to test points
4. Listen for beep or check display
5. Verify complete path

### Insulation Testing
1. De-energize and isolate circuit
2. Discharge capacitors
3. Select appropriate voltage
4. Apply test voltage
5. Read resistance (should be MΩ range)
6. Document results

---

## Interpreting Results

### Normal vs Abnormal
- Compare to specifications
- Check against previous readings
- Consider environmental factors
- Look for trends
- Document anomalies

### Common Issues Found
- High resistance = poor connections, corrosion
- Low insulation = deterioration, moisture
- Voltage drop = undersized wire, poor connections
- High current = overload, short circuit
- Imbalanced phases = load distribution problems

---

## Tool Maintenance

- Calibrate annually
- Replace batteries regularly
- Inspect for damage
- Clean and store properly
- Verify test leads not damaged
- Keep instruction manuals

---

## 💡 Key Takeaways

- Right tool makes diagnosis easier
- Invest in quality test equipment
- Learn to interpret readings correctly
- Regular calibration ensures accuracy
- Safety rated equipment required
- Documentation improves future troubleshooting
    `
  }
};

