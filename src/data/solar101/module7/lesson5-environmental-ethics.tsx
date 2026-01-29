import type { Lesson } from '@/types/course';

const lesson: Lesson = {
  id: 5,
  title: 'Environmental and Ethical Practices',
  duration: '20 minutes',
  type: 'reading',
  content: `
# Environmental and Ethical Practices 🌍

Environmental and ethical practices in solar PV systems focus on minimizing ecological impacts across the lifecycle—from raw material extraction to end-of-life recycling—while ensuring fair labor, supply chain transparency, and community benefits, potentially recovering 90% of materials and cutting embodied carbon by 50% through circular strategies. In 2025, with global PV waste reaching 4-14% of generation and the UFLPA adding 37 PRC entities to its ban list for forced labor risks in polysilicon, frameworks like the IEA-PVPS sustainability review and EU carbon footprint rules are accelerating adoption.

## Key Components

### Lifecycle Assessment (LCA) and Recycling
Evaluate cradle-to-grave impacts using ISO 14040 standards; prioritize recycling of silicon, glass, and metals targeting 95% recyclability.

### Supply Chain Due Diligence
Audit for forced labor, especially in Xinjiang polysilicon (80% global supply); implement traceability from mining to module assembly per UFLPA.

### Biodiversity and Site Management
Design agrivoltaic or floating systems to enhance habitats, reducing land use by 70%; conduct EIAs for utility-scale projects.

### Ethical Labor and Community Engagement
Enforce fair wages and no-child-labor policies per ILO conventions; involve locals via FPIC for equitable benefits.

## Best Practices

- Conduct annual LCAs using IEA tools
- Source 100% UFLPA-compliant polysilicon
- Embed biodiversity plans in EIAs
- Partner with locals for 20% job quotas
- Use third-party verifiers for ISO 14001
- Prioritize circular designs for 80% waste diversion

---

## Key Takeaways

✅ **Material Recovery**: 90% potential through recycling  
✅ **Carbon Reduction**: 50% via circular strategies  
✅ **PV Waste**: 4-14% of generation globally  
✅ **Supply Risk**: UFLPA adds 37 entities to ban list  
✅ **Recyclability Target**: 95% for panels  
✅ **Job Quotas**: 20% local employment recommended  
  `
};

export default lesson;

