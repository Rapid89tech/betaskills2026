import type { Lesson } from '@/types/course';

const lesson: Lesson = {
  id: 4,
  title: 'System Configuration (Grid-Tied, Off-Grid, Hybrid)',
  duration: '25 minutes',
  type: 'video',
  videoUrl: 'https://youtu.be/3RFmuP1g_vo',
  content: `
# System Configuration (Grid-Tied, Off-Grid, Hybrid) 🔄

System configuration refers to selecting the architecture for a solar PV installation—grid-tied (directly connected to the utility grid for net metering), off-grid (standalone with full battery storage for remote or unreliable grid areas), or hybrid (grid-connected with batteries for backup and energy arbitrage). This choice impacts reliability, costs, and scalability; for instance, hybrids can reduce outage impacts by 80-90% during events like storms. In 2025, with virtual power plants (VPPs) and bidirectional EV charging on the rise, hybrid configs are surging 25% in adoption, enabling grid services revenue while ensuring resilience.

## Key Methods for Assessment

### 1. Site and Needs Evaluation
Analyze grid availability, outage frequency (e.g., via utility data), load criticality, and location remoteness. Grid-tied suits urban areas with stable grids; off-grid for cabins; hybrids for all with backup needs.

### 2. Reliability and Autonomy Analysis
Calculate required autonomy (e.g., 24-72 hours) using historical weather/outage data. Tools model blackout risks, prioritizing hybrids in regions with >5 outages/year.

### 3. Economic and Incentive Modeling
Compare levelized cost of energy (LCOE) across configs, factoring rebates like the extended ITC (up to 40% for hybrids in 2025) and net metering policies. Hybrids often yield 10-15% better ROI via peak shaving.

### 4. Performance Simulation
Run hourly energy flow models to test export/import, battery cycling, and self-consumption rates, optimizing for goals like 70%+ offset in grid-tied setups.

## Recommended Tools and Software

| **Tool/Software** | **Key Features** | **Ease of Use** | **Ideal For** | **Cost Model** |
|------------------|------------------|----------------|--------------|---------------|
| **HOMER Pro** | Multi-config optimization; grid/off-grid/hybrid dispatch with VPP modeling | Medium | Microgrids and hybrids | Licensed |
| **Aurora Solar** | AI-assisted config selection; net metering and battery arbitrage simulations | High | Residential proposals | Subscription |
| **PVsyst** | Detailed yield/loss for all configs; export to grid-tie inverters | Medium | Engineering analysis | Licensed |
| **OpenSolar** | Free hybrid/grid-tie workflows; auto-config based on loads and incentives | High | Sales and installers | Free |
| **SAM (NREL)** | Techno-economic configs; policy-driven hybrid sizing with dispatch rules | Medium | Research and feasibility | Free |
| **HelioScope** | Utility-scale grid-tie layouts; basic hybrid add-ons for storage | Medium | Commercial arrays | Subscription |
| **RETScreen Expert** | Config comparisons with financials; off-grid autonomy calculators | Medium | International projects | Free |

These tools output metrics like self-consumption ratio, outage mitigation percentage, and payback period, often with scenario comparisons for decision-making.

## Best Practices

### Config Selection Guidelines
- **Grid-Tied**: For low-cost offsets in reliable grids
- **Off-Grid**: For total independence (add 20-50% extra capacity)
- **Hybrids**: For flexibility, sizing batteries at 1-2 days' load

### Integration and Scalability
Ensure compatibility with smart inverters (e.g., SunSpec standards) and future-proof for EVs; hybrids benefit from 95%+ efficient AC-coupled setups in 2025.

### Regulatory and Safety Adjustments
Verify local codes (e.g., NEC 705 for interconnections) and incentives; model worst-case scenarios like extended blackouts for off-grid.

### Common Pitfalls to Avoid
- Overlooking export limits in grid-tied (cap at 100-120% of load)
- Under-sizing batteries in hybrids for deep cycles
- Ignoring maintenance in off-grid (e.g., annual electrolyte checks)

### Sustainability Tie-In
Favor hybrids for grid support via VPPs, reducing fossil fuel peaker plants; aim for 80%+ renewable penetration to meet 2025 decarbonization targets.

By selecting the optimal configuration with these methods and tools, projects can cut energy costs by 20-40% and enhance resilience. For quick starts, use free tools like OpenSolar or SAM to compare configs against your site specifics.

---

## Key Takeaways

✅ **Grid-Tied**: Direct grid connection, net metering, lowest cost  
✅ **Off-Grid**: Complete independence, requires battery storage, 20-50% extra capacity  
✅ **Hybrid**: Best of both worlds, 80-90% outage mitigation, 25% adoption surge  
✅ **VPP Integration**: Enabling grid services revenue in 2025  
✅ **ITC Incentive**: Up to 40% for hybrids in 2025  
✅ **Cost Savings**: 20-40% reduction with optimal configuration  
  `
};

export default lesson;

