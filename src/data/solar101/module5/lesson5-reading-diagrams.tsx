import type { Lesson } from '@/types/course';

const lesson: Lesson = {
  id: 5,
  title: 'Reading Electrical Diagrams',
  duration: '20 minutes',
  type: 'video',
  videoUrl: 'https://youtu.be/GHhcyH99inE',
  content: `
# Reading Electrical Diagrams 📋

Reading electrical diagrams is a core skill for solar PV installers and designers, enabling accurate interpretation of schematics, wiring layouts, and one-line drawings to ensure safe, compliant installations and quick troubleshooting. These diagrams visualize circuits, components, and connections using standardized symbols, preventing miswiring that could cause 20-30% of field errors and faults. In 2025, with AR-enhanced diagrams via apps like Autodesk's BIM 360 and a 30% uptick in hybrid PV-storage projects per SEIA, digital-native reading tools are reducing interpretation time by 40%, supporting complex integrations like VPPs and high-voltage DC strings in a market hitting 2.2 TW global capacity.

## Key Concepts

### 1. Types of Diagrams
**Single-line diagrams (SLDs)** show simplified power flow (e.g., panels to inverter to grid); **detailed wiring diagrams** illustrate point-to-point connections; **ladder diagrams** depict control logic for relays and switches in charge controllers.

### 2. Standard Symbols and Notations
IEC/IEEE icons for components—e.g., wavy line for AC source, circle with cross for fuses, rectangle for inverters; lines represent conductors (solid for hot, dashed for ground), with annotations like "10 AWG PV Wire" or voltage ratings.

### 3. Reading Flow and Interpretation
Start at the source (PV array), trace paths to loads (batteries/inverter), note branches for parallels, and check grounds/disconnects; use legends for scales and revisions, identifying polarities (+/- for DC) to avoid reverse feeds.

### 4. Troubleshooting Applications
Cross-reference with multimeter readings; in solar, focus on DC arcs (squiggly lines in breakers) or shading mismatches in string diagrams, ensuring NEC 690 compliance for rapid shutdown paths.

## Best Practices

### Interpretation Guidelines
Scan for revisions (latest sheet first), trace circuits clockwise from power source, and verify scales (e.g., 1:1 for wiring); use color-coding (red for AC, black for DC) for clarity.

### Integration with Installs
Pair diagrams with site photos in apps for as-built updates; simulate flows in tools like ETAP to predict voltage drops before wiring.

### Training and Updates
Practice with NABCEP sample diagrams annually; adapt for 2025 unearthed DC systems by noting floating neutrals in schematics.

### Common Pitfalls to Avoid
- Ignoring ground symbols leading to shock risks
- Misreading dashed lines as optional (they're often neutrals)
- Outdated revisions causing code violations like missing AFCIs

### Sustainability Tie-In
Leverage digital diagrams to minimize paper waste (80% reduction) and enable remote audits, aligning with 2025 LEED v5 for efficient, low-impact PV lifecycle management.

---

## Key Takeaways

✅ **Error Reduction**: Prevents 20-30% of field miswiring errors  
✅ **Diagram Types**: SLDs, wiring diagrams, ladder diagrams  
✅ **Standard Symbols**: IEC/IEEE icons for components  
✅ **AR Tools**: 40% faster interpretation with digital apps  
✅ **Paper Waste**: 80% reduction with digital diagrams  
✅ **Market Growth**: Supporting 2.2 TW global PV capacity  
  `
};

export default lesson;

