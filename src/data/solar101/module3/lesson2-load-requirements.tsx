import type { Lesson } from '@/types/course';

const lesson: Lesson = {
  id: 2,
  title: 'Determining Load Requirements',
  duration: '25 minutes',
  type: 'video',
  videoUrl: 'https://youtu.be/s5qlA1R2WrI',
  content: `
# Determining Load Requirements ⚡

Determining load requirements is a foundational step in designing solar photovoltaic (PV) systems, involving the calculation of a site's total energy consumption to ensure the system is sized correctly for reliable power delivery. This process accounts for daily, seasonal, and peak demands from appliances, lighting, and other loads, preventing under- or over-sizing that could lead to inefficiencies or high costs. In 2025, with rising electrification trends, accurate load assessment can optimize systems for net-zero goals, potentially reducing energy waste by 15-25% through targeted load management.

## Key Methods for Assessment

### 1. Appliance-by-Appliance Inventory
List all electrical devices, their rated wattage (or amperage at voltage), and average daily usage hours. Multiply to get watt-hours (Wh) per appliance, then sum for total daily kWh needs; include surge (startup) power, often 2-3x rated for motors like refrigerators.

### 2. Utility Bill Analysis
Review historical electricity bills to average monthly kWh usage, adjusting for seasonal peaks (e.g., air conditioning in summer). Convert to daily loads and factor in efficiency improvements from LED lighting or smart appliances.

### 3. On-Site Energy Audits
Use plug-in meters or professional audits to measure real-time consumption, identifying phantom loads (standby power) that can add 5-10% to totals. This method captures intermittent usage missed in estimates.

### 4. Load Profiling and Simulation
Employ software to model time-of-use patterns, incorporating demand-side management like load shifting (e.g., running high-draw appliances during peak solar hours) for off-grid or hybrid systems.

## Recommended Tools and Software

| **Tool/Software** | **Key Features** | **Ease of Use** | **Ideal For** | **Cost Model** |
|------------------|------------------|----------------|--------------|---------------|
| **PVWatts Calculator (NREL)** | Estimates production from loads; inputs daily kWh, basic bill import | High | Quick residential sizing | Free |
| **Aurora Solar** | AI-driven load profiling from bills; simulates hourly demands and offsets | High | Commercial proposals | Subscription |
| **OpenSolar** | Free end-to-end design with load calculators; auto-generates proposals | High | Installers and sales | Free |
| **HOMER Pro** | Advanced optimization for hybrid systems; detailed load dispatch modeling | Medium | Off-grid/microgrid design | Licensed |
| **Solargraf** | 3D modeling with load estimation; integrates weather data for seasonal loads | Medium | Utility-scale planning | Subscription |
| **PV Sketch** | Drag-and-drop load inputs; exports to CAD for integrated designs | High | Field technicians | Free/Paid add-ons |
| **RETScreen (now RETScreen Expert)** | Comprehensive energy audits; load calculations with financial analysis | Medium | Policy and large projects | Free |

These tools typically output metrics like peak demand (kW), average daily load (kWh), and load factor (ratio of average to peak), aiding in inverter and battery sizing.

## Best Practices

### Incorporate Safety Margins
Add 20-30% buffer for future loads like EV charging or home expansions, especially in 2025's growing smart home ecosystem.

### Distinguish Load Types
Separate continuous (e.g., lights), intermittent (e.g., fans), and surge loads; prioritize DC loads in off-grid setups to minimize inverter losses.

### Seasonal and Temporal Adjustments
Analyze usage across months using tools like bill data imports, accounting for variations up to 50% in heating/cooling-dominated regions.

### Common Pitfalls to Avoid
- Underestimating standby power
- Ignoring efficiency ratings (use nameplate vs. actual draw)
- Neglecting regulatory codes like NEC Article 690 for PV-specific calculations

### Integration with Broader Design
Pair load data with solar potential assessments for balanced systems, leveraging AI features in modern tools for automated optimizations.

By applying these methods and tools, solar projects can achieve precise sizing that boosts ROI by 10-20% through reduced excess capacity. For initial calculations, begin with free options like OpenSolar to build accurate baselines.

---

## Key Takeaways

✅ **Purpose**: Calculate total energy consumption for accurate system sizing  
✅ **Methods**: Appliance inventory, utility bill analysis, energy audits, load profiling  
✅ **Waste Reduction**: 15-25% energy waste reduction through targeted management  
✅ **Safety Margins**: Add 20-30% buffer for future loads (EV charging, expansions)  
✅ **ROI Improvement**: 10-20% better ROI through precise sizing  
✅ **Free Tools**: OpenSolar, PVWatts, RETScreen Expert  
  `
};

export default lesson;

