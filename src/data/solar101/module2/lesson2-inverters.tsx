import type { Lesson } from '@/types/course';

const lesson: Lesson = {
  id: 2,
  title: 'Inverters: String, Micro, and Hybrid',
  duration: '25 minutes',
  type: 'video',
  videoUrl: 'https://youtu.be/Vkszib57M0g',
  content: `
# Inverters: String, Micro, and Hybrid 🔌

As of October 2025, solar inverters—devices that convert DC electricity from panels to usable AC power—remain essential for PV systems, with the residential solar PV inverter market reaching $5.35 billion this year amid surging global installations. Among the primary types—string, micro, and hybrid—string inverters hold the largest share for their simplicity and cost-effectiveness, while microinverters grow rapidly (projected CAGR of 12.7% through 2035) for shaded roofs, and hybrids surge with battery integration, comprising about 20% of new setups.

## String Inverters

String inverters serve as centralized units for arrays of panels wired in series, offering a straightforward, budget-friendly entry into solar.

### How It Works
Panels connect in "strings" to send combined DC output to one inverter, which converts it to AC via maximum power point tracking (MPPT) for optimal voltage adjustment. Modern models include optimized variants with add-on power optimizers for better shading tolerance.

### Advantages
- **Lowest upfront costs** and simple installation, often $750-$1,250 for a typical system
- **High conversion efficiency** (95-98%), with reliable 10-15 year lifespan and easy centralized maintenance
- **Scalable** for large, uniform arrays without per-panel complexity

### Limitations
- **Shading or failure** in one panel drags down the entire string's output, potentially reducing yield by 20-30% in partial shade
- **System-level monitoring** limits diagnostics; expansions may require inverter upgrades

### Applications
Ideal for unshaded, south-facing residential rooftops or utility-scale farms with consistent conditions. Best for cost-focused users in sunny regions.

## Micro Inverters

Microinverters attach directly to individual panels, enabling independent operation for maximized performance in varied environments.

### How It Works
Each panel pairs with its own mini-inverter (e.g., 250-400W capacity) that performs DC-to-AC conversion and MPPT at the module level, bypassing string vulnerabilities and allowing real-time data per panel.

### Advantages
- **Panel-level optimization** boosts output 5-25% over strings in shaded or complex setups, with efficiencies matching 95%+ per unit
- **Longer lifespan** (15-25 years) and easier expansions; detailed monitoring aids troubleshooting
- **Safer during fires** (no high-voltage DC strings) and better for multi-orientation roofs

### Limitations
- **Higher costs** ($1,500-$3,000 total, 20-50% more than strings) due to one per panel, plus increased labor
- **More points of failure**, though warrantied; not ideal for very large uniform arrays where strings suffice

### Applications
Suited for urban homes with trees, chimneys, or east-west roofs; commercial buildings needing granular insights. Popular in Europe and California for shading-prone sites.

## Hybrid Inverters

Hybrid inverters multitask by handling solar conversion alongside battery storage, bridging grid-tied and off-grid capabilities.

### How It Works
They convert DC from panels to AC while managing battery charge/discharge via integrated DC-DC converters, syncing with the grid or switching to island mode during outages. Advanced models include smart load management.

### Advantages
- **Enables energy storage** for nighttime use or blackouts, optimizing self-consumption and reducing peak bills by 30-50%
- **Efficiency around 95-98%**, with future-proof design for adding batteries; supports net metering and time-of-use rates
- **Single-unit simplicity** cuts wiring needs compared to separate inverters and chargers

### Limitations
- **Highest upfront costs** (up to $3,000+ with batteries) and moderate installation complexity
- **Relies on compatible storage**; overkill for non-battery users, with potential efficiency dips during battery cycles

### Applications
Perfect for homes with unreliable grids, EV charging, or high evening loads; off-grid cabins or commercial sites prioritizing resilience. Growing in markets like Australia and Texas with battery incentives.

## Comparison Table

| **Aspect** | **String** | **Micro** | **Hybrid** |
|-----------|-----------|-----------|-----------|
| **How It Works** | Central unit for panel strings | Per-panel independent conversion | Integrated solar + battery management |
| **Efficiency** | 95-98% (system-level) | 95%+ (panel-level, +5-25% yield gain) | 95-98% (with storage optimization) |
| **Cost (System, USD)** | $750-$1,500 (low end) | $1,500-$3,000 (higher) | $2,000-$3,000+ (with batteries) |
| **Lifespan** | 10-15 years | 15-25 years | 10-20 years (battery-dependent) |
| **Best For** | Uniform, unshaded large arrays | Shaded/complex roofs, monitoring | Battery-integrated, resilient systems |
| **Market Trend (2025)** | Dominant (60%+ share) | Growing 12.7% CAGR | 20% of new installs, battery-driven |

---

## Key Takeaways

✅ **String Inverters**: Most cost-effective ($750-$1,500), 95-98% efficiency, best for uniform arrays  
✅ **Micro Inverters**: Panel-level optimization, 5-25% better yield in shade, 15-25 year lifespan  
✅ **Hybrid Inverters**: Battery integration, 30-50% peak bill reduction, future-proof design  
✅ **Market Share**: String dominates (60%+), Micro growing at 12.7% CAGR, Hybrid at 20% of new installs  
✅ **Selection**: Choose based on shading conditions, budget, and storage needs  
  `
};

export default lesson;

