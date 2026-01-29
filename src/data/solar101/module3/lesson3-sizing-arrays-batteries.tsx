import type { Lesson } from '@/types/course';

const lesson: Lesson = {
  id: 3,
  title: 'Sizing PV Arrays and Battery Banks',
  duration: '30 minutes',
  type: 'video',
  videoUrl: 'https://youtu.be/6Q3PXfOwFcI',
  content: `
# Sizing PV Arrays and Battery Banks 📐

Sizing PV arrays and battery banks is essential for creating efficient, reliable solar energy systems, ensuring they meet energy demands without excess costs or performance shortfalls. PV array sizing determines the number and configuration of panels based on solar resource and load, while battery bank sizing calculates storage capacity for autonomy during low-production periods. In 2025, with lithium-ion battery prices dropping over 15% year-over-year, hybrid systems integrating oversized PV with scalable batteries are enabling 90%+ self-consumption rates, supporting resilient microgrids amid increasing grid instability.

## Key Methods for Assessment

### 1. Peak Sun Hours (PSH) Method for PV Arrays
Calculate required array capacity as total daily load (kWh) divided by (PSH × system efficiency × derating factor, typically 0.75-0.85 for losses). This ensures panels produce enough under average conditions, with oversizing by 10-20% for cloudy days.

### 2. Autonomy Days Approach for Battery Banks
Determine bank capacity as (daily load × desired autonomy days, e.g., 2-3) divided by (depth of discharge, DoD, like 50% for lead-acid or 80% for lithium × voltage × efficiency, ~90%). This balances cost and reliability for off-grid setups.

### 3. Simulation-Based Iterative Sizing
Use hourly load profiles and weather data to model energy balance, adjusting PV tilt/azimuth and battery C-rate (discharge speed) via software to minimize levelized cost of energy (LCOE).

### 4. Economic Optimization
Factor in incentives like the ITC (30% in 2025) and payback periods; hybrid sizing tools optimize PV-battery ratios for net billing, targeting 5-7 year ROIs.

## Recommended Tools and Software

| **Tool/Software** | **Key Features** | **Ease of Use** | **Ideal For** | **Cost Model** |
|------------------|------------------|----------------|--------------|---------------|
| **PVsyst** | Detailed PV sizing with shading/battery dispatch; meteorological database | Medium | Stand-alone/hybrid systems | Licensed |
| **Aurora Solar** | AI-optimized array/battery sizing; 3D proposals with LCOE calculations | High | Residential/commercial | Subscription |
| **OpenSolar** | Free end-to-end sizing; auto-PV/battery configs from loads and site data | High | Installers and proposals | Free |
| **HOMER Pro** | Microgrid optimization; multi-objective PV-battery-inverter sizing | Medium | Off-grid/remote sites | Licensed |
| **HelioScope** | Utility-scale PV layout; basic battery storage modeling with yield forecasts | Medium | Large commercial arrays | Subscription |
| **PV*SOL** | 3D visualization for array sizing; integrated battery cycle analysis | High | Educational/detailed sims | Licensed |
| **System Advisor Model (SAM, NREL)** | Free techno-economic modeling; PV-battery dispatch for policy analysis | Medium | Research/feasibility | Free |

These tools output key metrics like array kWp, battery kWh, and energy yield (kWh/kWp), often with sensitivity analyses for variable inputs.

## Best Practices

### Oversizing Guidelines
Size PV arrays 20-30% above load needs for battery charging; limit battery DoD to extend lifespan (e.g., 5,000+ cycles for lithium in 2025 models).

### Efficiency and Loss Accounting
Apply derating factors for temperature (0.8-0.9), soiling, and wiring; use MPPT controllers to boost harvest by 20-30%.

### Seasonal and Scalability Adjustments
Model worst-case months (e.g., winter PSH <3) and modular designs for future additions like EVs, ensuring 80%+ round-trip efficiency.

### Common Pitfalls to Avoid
- Ignoring inverter clipping (size array <1.2x inverter rating)
- Underestimating battery thermal management
- Overlooking codes like UL 9540 for energy storage

### Sustainability Tie-In
Prioritize recyclable batteries and bifacial PV for 10-15% extra yield, aligning with 2025 ESG reporting for green financing.

By leveraging these methods and tools, solar installations can achieve 15-25% better performance and lower LCOE, enhancing energy independence. For starters, try free options like OpenSolar or SAM to prototype your system sizing.

---

## Key Takeaways

✅ **PSH Method**: Daily load ÷ (PSH × efficiency × derating) for array sizing  
✅ **Autonomy Days**: 2-3 days typical for off-grid battery sizing  
✅ **Lithium Prices**: Dropped 15%+ year-over-year in 2025  
✅ **Self-Consumption**: Hybrid systems achieving 90%+ self-consumption rates  
✅ **Oversizing**: 20-30% above load for optimal battery charging  
✅ **Performance Gains**: 15-25% better performance with proper sizing  
  `
};

export default lesson;

