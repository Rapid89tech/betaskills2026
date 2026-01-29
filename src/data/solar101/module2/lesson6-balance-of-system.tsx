import type { Lesson } from '@/types/course';

const lesson: Lesson = {
  id: 6,
  title: 'Balance of System (BOS)',
  duration: '20 minutes',
  type: 'video',
  videoUrl: 'https://youtu.be/4XgTTp7hwV4',
  content: `
# Balance of System (BOS) ⚙️

As of October 2025, the solar PV Balance of System (BOS) market is valued at USD 67.12 billion, projected to reach USD 117.39 billion by 2030 at a CAGR of 11.7%, driven by surging installations, tech advancements, and policy incentives like the U.S. IRA extensions. BOS encompasses all non-PV module components that ensure safe, efficient power conversion and structural integrity, including inverters, mounting structures, cabling, charge controllers, batteries, switches, and monitoring systems—collectively accounting for 40-50% of total system costs.

## Structural BOS

Structural BOS provides mechanical support and optimization, focusing on durability against environmental stresses like wind (up to 150 mph ratings) and seismic activity.

### How It Works
Frames, racks, and trackers secure panels at optimal angles (e.g., 25-35° latitude-based tilts), using aluminum/steel alloys with corrosion-resistant coatings. Fixed-tilt systems hold steady, while single-axis trackers rotate east-west via motors for 20-30% yield boosts.

### Key Components
- **Mounting Structures**: Roof (penetrating/ballasted) and ground (fixed/tilted) racks; non-penetrating options avoid leaks
- **Trackers**: Single/dual-axis for utility farms, adding 25-40% output in high-DNI areas
- **Other Hardware**: Clamps, rails, and grounding lugs for assembly

### Advantages
- **Enhances energy capture**; trackers recoup costs in 1-2 years via higher production
- **Modular designs** speed installs (e.g., 1 MW/day for ground mounts); 25-30 year warranties
- **Integrates agrivoltaics** for dual land use

### Limitations
- **Higher costs** for trackers ($0.20-0.35/W); soil-dependent for ground types
- **Wind/snow loads** require site-specific engineering

### Applications
Residential rooftops for space savings; utility farms in deserts for scale. In 2025, ground-mount BOS leads utility growth at 40% of additions.

## Electrical BOS

Electrical BOS handles power flow, conversion, and protection, minimizing losses (target <2%) through efficient components.

### How It Works
DC from panels routes via cabling to controllers/inverters for regulation and AC conversion, with batteries for storage and monitoring for real-time oversight. Surge protectors and fuses safeguard against faults.

### Key Components
- **Inverters and Controllers**: String/micro/hybrid inverters; PWM/MPPT controllers for battery charging
- **Cabling and Wiring**: UV-resistant DC/AC cables with MC4 connectors; junction boxes for connections
- **Batteries and Monitoring**: Lithium-ion/flow storage; IoT sensors for performance tracking

### Advantages
- **Boosts system uptime** to 99% with smart features like remote diagnostics
- **Scalable efficiencies** (95-99% for MPPT); batteries enable 50-70% self-consumption
- **Cost drops**: Electrical BOS now <30% of total via standardized modules

### Limitations
- **Interoperability issues** in hybrids; cabling losses in long runs (>100m)
- **Maintenance for batteries** (e.g., BMS checks); higher upfront for advanced monitoring

### Applications
Grid-tied homes for net metering; off-grid RVs with compact electrical kits. Hybrids dominate 2025 residential installs at 25% share.

## Comparison Table

| **Aspect** | **Structural BOS** | **Electrical BOS** |
|-----------|-------------------|-------------------|
| **Key Components** | Mounts, trackers, hardware | Inverters, cabling, batteries, controllers |
| **Cost Share (% of Total BOS)** | 30-40% | 50-60% |
| **Efficiency Impact** | +20-40% yield via orientation | 95-99% conversion, <2% losses |
| **Lifespan** | 25-30 years | 10-20 years (batteries shortest) |
| **Installation Complexity** | Moderate (site prep) | High (wiring/grounding) |
| **Market Trend (2025)** | Tracker growth (35% CAGR) | Hybrid/smart surge (12% share rise) |
| **Best For** | Utility-scale, agrivoltaics | Residential, storage-integrated |

---

## Key Takeaways

✅ **BOS Market**: USD 67.12 billion in 2025, projected USD 117.39 billion by 2030 (11.7% CAGR)  
✅ **Cost Share**: BOS accounts for 40-50% of total system costs  
✅ **Structural BOS**: 30-40% of BOS cost, includes mounts and trackers  
✅ **Electrical BOS**: 50-60% of BOS cost, includes inverters and cabling  
✅ **Efficiency Gains**: Trackers add 20-40% yield, MPPT controllers 95-99% efficiency  
✅ **Market Trends**: Tracker growth at 35% CAGR, hybrid systems at 25% of residential installs  
  `
};

export default lesson;

