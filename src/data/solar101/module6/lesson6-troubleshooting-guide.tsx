import type { Lesson } from '@/types/course';

const lesson: Lesson = {
  id: 6,
  title: 'Comprehensive Troubleshooting Guide',
  duration: '20 minutes',
  type: 'reading',
  content: `
# Comprehensive Troubleshooting Guide 🛠️

A comprehensive troubleshooting guide for solar PV systems provides systematic approaches to identify and resolve common issues ranging from low power output to complete system failures. Effective troubleshooting can restore 95%+ system performance within hours, preventing extended downtimes that compound losses.

## Common Issues and Solutions

### Low Power Output
**Symptoms**: System producing less than expected yield  
**Causes**: Shading, soiling, panel degradation, inverter clipping  
**Solutions**: 
- Clean panels
- Trim vegetation
- Check string voltages
- Verify inverter sizing

### System Not Producing
**Symptoms**: Zero output despite sunlight  
**Causes**: Tripped breakers, inverter faults, grid disconnection  
**Solutions**:
- Reset breakers
- Check error codes
- Verify grid connection
- Test DC input voltage

### Battery Not Charging
**Symptoms**: Battery SoC not increasing  
**Causes**: Charge controller failure, BMS lockout, wiring issues  
**Solutions**:
- Test charge controller output
- Check BMS status
- Verify cable connections
- Measure battery voltage

### Inverter Errors
**Symptoms**: Fault codes, shutdown, erratic behavior  
**Causes**: Voltage/frequency deviations, ground faults, overheating  
**Solutions**:
- Reference error code manual
- Test grounding resistance
- Improve ventilation
- Check firmware updates

## Systematic Troubleshooting Process

1. **Gather Information**: Review monitoring data, check weather conditions, note recent changes
2. **Visual Inspection**: Look for obvious damage, loose connections, signs of overheating
3. **Electrical Testing**: Measure voltages, currents, resistances at key points
4. **Isolate Components**: Test subsystems individually to narrow down the fault
5. **Implement Solution**: Address the root cause, not just symptoms
6. **Verify Fix**: Monitor for 24-48 hours to confirm resolution
7. **Document**: Record issue, solution, and preventive measures

## Prevention Strategies

- Schedule regular maintenance
- Implement real-time monitoring
- Train staff on early warning signs
- Maintain spare parts inventory
- Document all system changes

---

## Key Takeaways

✅ **Performance Recovery**: 95%+ within hours with proper troubleshooting  
✅ **Systematic Approach**: 7-step process for reliable resolution  
✅ **Prevention**: Regular maintenance prevents 70% of issues  
✅ **Documentation**: Essential for warranty claims and future reference  
✅ **Monitoring**: Real-time alerts enable proactive intervention  
  `
};

export default lesson;

