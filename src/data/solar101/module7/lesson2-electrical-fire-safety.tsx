import type { Lesson } from '@/types/course';

const lesson: Lesson = {
  id: 2,
  title: 'Electrical and Fire Safety Protocols',
  duration: '25 minutes',
  type: 'video',
  videoUrl: 'https://youtu.be/KhWlMqyPn5A',
  content: `
# Electrical and Fire Safety Protocols 🔥

Electrical and fire safety protocols are paramount in solar PV installations to mitigate risks like shocks, arcs, and thermal runaway, which contribute to 25% of industry incidents per OSHA data. In 2025, with UL 3741-compliant PV hazard control systems and a 20% rise in hybrid ESS deployments per SEIA, integrated smart monitoring is reducing response times by 50%, fostering safer operations amid 700 GW global capacity additions.

## Key Components

### Grounding and Bonding
Establish low-impedance paths (e.g., <1Ω resistance) via equipment grounding conductors; bond module frames and racking to ground rods per NEC 690.43.

### Lockout/Tagout (LOTO)
De-energize systems before work using disconnects and tags; verify zero voltage with testers for DC strings up to 1500V.

### Arc-Fault Mitigation
Deploy DC AFCIs to detect arcs within 2 seconds; incorporate rapid shutdown modules reducing voltage to <30V within 30 seconds per NEC 690.12.

### Emergency Response
Develop site plans with evacuation routes, AED locations, and spill kits; train on thermal runaway signs aligning with NFPA 855.

## Best Practices

- Conduct daily toolbox talks on LOTO and arc risks
- Use layered defenses: AFCIs plus thermal imaging
- Require annual NFPA 70E refreshers with PV modules
- Select low-VOC PPE and recyclable suppressants

---

## Key Takeaways

✅ **Incident Rate**: 25% from electrical/fire hazards  
✅ **Grounding**: <1Ω resistance required  
✅ **AFCI Response**: 2-second arc detection  
✅ **Rapid Shutdown**: <30V within 30 seconds (NEC 690.12)  
✅ **Response Improvement**: 50% faster with smart monitoring  
  `
};

export default lesson;

