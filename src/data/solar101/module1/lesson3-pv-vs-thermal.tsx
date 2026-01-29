import type { Lesson } from '@/types/course';

const lesson: Lesson = {
  id: 3,
  title: 'Types of Solar Technologies: PV vs. Thermal',
  duration: '30 minutes',
  type: 'video',
  videoUrl: 'https://youtu.be/EVwU6PkARqE',
  content: `
# Types of Solar Technologies: PV vs. Thermal 🔆

Solar energy technologies are broadly categorized into two main types: photovoltaic (PV) systems, which convert sunlight directly into electricity, and solar thermal systems, which capture the sun's heat for heating or power generation. These approaches differ fundamentally in their mechanisms, applications, and suitability, with PV dominating residential and grid-scale electricity production, while thermal excels in heat-specific uses. As of 2025, PV installations continue to surge globally—reaching over 100 GW in India alone this year—driven by falling costs and policy support, whereas thermal systems, though mature, see slower adoption outside niche industrial heating. Understanding their differences helps in selecting the right technology for residential, commercial, or utility needs.

## Photovoltaic (PV) Systems

PV technology harnesses the photovoltaic effect, where sunlight's photons excite electrons in semiconductor materials to generate electricity. It's the most widespread solar tech, powering everything from homes to massive solar farms.

### How It Works
Solar panels consist of cells (often silicon-based) that absorb sunlight, creating a flow of direct current (DC) electricity. An inverter converts this to alternating current (AC) for home or grid use, with optional batteries for storage. Key components include panels, inverters, charge controllers, and mounting structures.

### Types
- **Monocrystalline**: High-efficiency (18-22%), space-efficient, but costlier; ideal for rooftops
- **Polycrystalline**: Mid-range efficiency (15-18%), more affordable, but requires more space
- **Thin-Film**: Flexible and lightweight (10-13% efficiency), best for large-scale or curved surfaces, though less efficient

### Advantages
- Versatile for electricity generation, reducing bills by up to 70-90% with batteries
- Long lifespan (25-40 years), low maintenance (cleaning every 2-3 years), and scalable from small setups to utility-scale
- Performs in diffuse light, covering ~50% of UK winter electricity needs

### Limitations
- Higher upfront costs (e.g., £10,300 for a 4.5 kWp UK system with battery)
- Space-intensive (e.g., 480 sq ft for whole-home) and intermittent without storage
- Efficiency drops gradually over time (15-22% overall)

### Applications
Residential rooftops for appliances and EV charging; commercial grids; off-grid remote sites like satellites or rural pumps. In 2025, PV supports rising electrification from heat pumps and EVs, with over 1.6 million UK homes equipped.

## Solar Thermal Systems

Solar thermal focuses on capturing heat rather than electricity, using collectors to absorb sunlight and transfer warmth via fluids. It's particularly effective for direct heating but less common for power generation outside concentrated setups.

### How It Works
Collectors (flat-plate or evacuated-tube) heat a fluid like water-glycol mix, which circulates to a storage tank or heat exchanger for use. In advanced forms like concentrating solar power (CSP), mirrors focus sunlight to superheat fluids (up to 400°C) for steam turbines.

### Types
- **Flat-Plate Collectors**: Simple, insulated boxes with dark absorbers; good for moderate climates
- **Evacuated-Tube Collectors**: Vacuum-sealed tubes minimize heat loss; superior in cold or cloudy areas
- **Concentrating Solar Power (CSP)**: Parabolic troughs or towers for utility-scale electricity via steam

### Advantages
- High heat conversion efficiency (50-70% for low-temp systems; up to 90% in CSP heat capture)
- Cost-effective for heating (e.g., 60% of hot water needs), with lower upfront costs than PV
- Integrates with existing boilers; reduces emissions in heat-heavy processes

### Limitations
- Limited to heating (not electricity without CSP); poor winter performance (25% of needs in UK)
- Shorter lifespan (20-30 years) and higher maintenance (annual inspections, fluid checks)
- Relies on direct sunlight; harder to retrofit and less versatile

### Applications
Residential hot water and space heating; industrial processes like drying or pasteurization; large CSP plants for grid power in sunny deserts. Total UK installations stand at ~43,000 as of late 2024, mostly for water heating.

## PV vs. Thermal: A Comparison

While both are renewable and emission-free in operation, PV and thermal serve distinct roles. PV's electricity focus makes it more adaptable to modern grids, whereas thermal shines in heat-specific efficiency. Below is a side-by-side overview based on 2025 data:

| **Aspect** | **Photovoltaic (PV)** | **Solar Thermal** |
|------------|----------------------|-------------------|
| **Primary Output** | Electricity (DC to AC) | Heat (for water/space or steam in CSP) |
| **Efficiency** | 15-22% (up to 40% in advanced cells) | 50-70% for heat; 14-20% if converted to electricity |
| **Cost (UK Example)** | £4,000-£10,300 for 4-4.5 kWp system | £3,000-£6,000 for typical hot water setup |
| **Lifespan** | 25-40 years | 20-30 years |
| **Maintenance** | Low (occasional cleaning) | Moderate (annual checks, fluid testing) |
| **Space Needs** | Higher (e.g., 45 m² for home system) | Lower (more roof-efficient) |
| **Best For** | Electricity, EVs, appliances; versatile | Hot water, industrial heating; niche power |
| **2025 Trends** | Rapid growth (26% UK increase); storage integration | Declining residential installs; industrial hybrids |

Hybrids like photovoltaic-thermal (PVT) panels combine both, yielding ~15% electricity + 40% heat efficiency for dual benefits.

---

## Summary

In summary, PV is the go-to for most users in 2025 due to its scalability, longevity, and alignment with electrification trends, powering 25% of India's electricity mix this year. Thermal remains valuable for cost-effective heating in sunny or industrial settings, with emerging hybrids bridging gaps. Choosing depends on needs—electricity favors PV, heat favors thermal—for optimal renewable integration.

---

## Key Takeaways

✅ **PV Systems**: Convert sunlight to electricity; 15-22% efficiency, 25-40 year lifespan  
✅ **Solar Thermal**: Capture heat for water/space heating; 50-70% efficiency for heat  
✅ **PV Advantages**: Versatile, long lifespan, low maintenance  
✅ **Thermal Advantages**: High heat efficiency, lower upfront costs  
✅ **Applications**: PV for electricity needs, thermal for heating needs  
✅ **Hybrids (PVT)**: Combine both technologies for dual benefits  
  `
};

export default lesson;

