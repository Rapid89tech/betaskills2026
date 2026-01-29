import type { Lesson } from '@/types/course';

const lesson: Lesson = {
  id: 4,
  title: 'National and International Standards (IEC, SANS, NRS)',
  duration: '20 minutes',
  type: 'reading',
  content: `
# National and International Standards ⚖️

National and international standards for solar PV systems establish benchmarks for safety, performance, grid compatibility, and durability, ensuring reliable installations and reducing risks like fire hazards by up to 50%. IEC provides global harmonization, while SANS and NRS focus on South Africa's wiring and grid integration needs. In 2025, updates like IEC TS 62804-1 for module durability and NRS 097-2-1:2024 for small-scale embedded generation support the 20 GW+ annual PV additions in Africa.

## Key Standards

### IEC Standards (International)
- **IEC 61215:2021**: Crystalline silicon module design qualification
- **IEC 62109**: Safety for PV power converters
- **IEC TS 62804-1:2025**: Extended UV/thermal cycling tests

### SANS Standards (South African National)
- **SANS 10142-1:2024**: Wiring of premises with PV-specific DC protections
- **SANS 10142-1-2**: Embedded generator wiring
- **SANS 61215**: Aligns with IEC for panel qualification

### NRS Standards (South African Grid Regulatory)
- **NRS 097-2-1:2024**: SSEG interface requirements up to 100kW
- **NRS 048-2:2007**: Voltage/frequency limits
- **NRS 052-3:2008**: Off-grid solar home systems

## Best Practices

- Align IEC for exports, SANS for wiring, NRS for grid-tie
- Certify components pre-install via accredited labs
- Review annually via SABS/NERSA alerts
- Conduct gap analyses for hybrids
- Use digital twins for virtual compliance testing

---

## Key Takeaways

✅ **Risk Reduction**: Up to 50% reduction in fire hazards  
✅ **Global Coverage**: IEC for international harmonization  
✅ **SA Specific**: SANS for wiring, NRS for grid integration  
✅ **Recent Updates**: IEC TS 62804-1:2025, NRS 097-2-1:2024  
✅ **Cost Savings**: 15-20% lower soft costs with compliance  
  `
};

export default lesson;

