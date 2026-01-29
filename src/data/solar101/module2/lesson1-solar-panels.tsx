import type { Lesson } from '@/types/course';

const lesson: Lesson = {
  id: 1,
  title: 'Solar Panels: Monocrystalline, Polycrystalline, and Thin-Film',
  duration: '30 minutes',
  type: 'video',
  videoUrl: 'https://youtu.be/IUW5FZNxQmM',
  content: `
# Solar Panels: Monocrystalline, Polycrystalline, and Thin-Film 🌞

As of October 2025, solar panels remain the backbone of photovoltaic (PV) technology, with global installations surging to over 2.5 TW cumulative capacity amid record-low prices and efficiency gains. Among the dominant types—monocrystalline, polycrystalline, and thin-film—monocrystalline leads the market with a 41.6% share, valued at USD 7.12 billion this year, thanks to its superior performance in space-constrained setups. Polycrystalline, at USD 3.78 billion, offers budget-friendly alternatives, while thin-film, growing to $15.48 billion, excels in flexible applications despite lower efficiencies. These crystalline silicon-based (mono and poly) and non-crystalline (thin-film) variants differ in manufacturing, output, and suitability, influencing choices for residential, commercial, or off-grid use.

## Monocrystalline Solar Panels

Monocrystalline panels, made from a single continuous silicon crystal grown via the Czochralski process, deliver top-tier performance and aesthetics, making them the premium choice for high-output needs.

### How It Works
A pure silicon ingot is sliced into wafers, doped with impurities to create a p-n junction that generates electricity when sunlight hits it. This uniform structure minimizes electron recombination, boosting efficiency.

### Advantages
- **Highest efficiency** (15-22%), ideal for limited roof space—e.g., producing 320-375W per panel
- **Excellent low-light performance** and low degradation (as low as 0.3% annually), with lifespans up to 40 years
- **Sleek black appearance** enhances curb appeal; space-efficient for urban installs

### Limitations
- **Higher upfront costs** due to complex manufacturing, though prices have fallen to competitive levels in 2025
- **Less tolerant of high temperatures** compared to thin-film

### Applications
Rooftop residential systems, commercial buildings with space constraints, and high-end off-grid setups like RVs or boats. They dominate utility-scale farms in sunny regions for maximum yield.

## Polycrystalline Solar Panels

Polycrystalline panels, formed by melting silicon chunks and casting into blocks before slicing, provide a cost-effective balance of performance and affordability, though they're gradually losing ground to mono variants.

### How It Works
Multiple silicon crystals form during cooling, creating boundaries that slightly reduce electron flow. Still, the p-n junction converts sunlight to DC electricity effectively for most conditions.

### Advantages
- **Lower cost** than monocrystalline (often 10-20% cheaper), with efficiencies of 15-20%
- **Reliable 25-30 year lifespan** and solid output (250-350W per panel), suitable for larger arrays
- **Easier production** scales well for mass markets

### Limitations
- **Lower efficiency** requires more space; blue-speckled look may detract from aesthetics
- **Higher degradation rates** (0.5-0.7% annually) and poorer low-light performance

### Applications
Budget residential or commercial rooftops with ample space, ground-mounted utility projects, and emerging markets where cost trumps efficiency. They're common in mid-tier solar farms.

## Thin-Film Solar Panels

Thin-film panels deposit ultra-thin semiconductor layers (e.g., cadmium telluride or CIGS) onto substrates like glass or flexible materials, prioritizing portability over peak power.

### How It Works
Vapor deposition or sputtering applies microscopic layers to form the photovoltaic junction, absorbing light across a broader spectrum but with less intensity than crystalline types.

### Advantages
- **Lowest cost** and fastest production; efficiencies of 10-12%, but excel in high-heat (up to 10% better than crystalline) and diffuse light
- **Lightweight and flexible**, with minimal weight (under 10 kg/m²) for easy transport
- **Shorter payback** via quick installs; growing at a strong CAGR into 2025

### Limitations
- **Lowest efficiency** demands vast areas for equivalent output; shorter 20-25 year lifespan
- **Sensitive to moisture** and requires protective encapsulation; lower power density (100-200W per panel)

### Applications
Large-scale ground mounts, mobile homes, curved surfaces like building-integrated PV (BIPV), and portable chargers. Ideal for hot climates or shaded urban environments.

## Comparison Table

| **Aspect** | **Monocrystalline** | **Polycrystalline** | **Thin-Film** |
|-----------|-------------------|-------------------|--------------|
| **Efficiency** | 15-22% | 15-20% | 10-12% |
| **Power Output (per Panel)** | 320-375W+ | 250-350W | 100-200W |
| **Cost (USD/Watt, est.)** | $0.30-0.50 | $0.25-0.40 | $0.20-0.35 |
| **Lifespan** | 30-40 years | 25-30 years | 20-25 years |
| **Degradation Rate** | 0.3-0.5%/year | 0.5-0.7%/year | 0.5-1%/year |
| **Market Value (2025)** | USD 7.12 Bn (41.6% share) | USD 3.78 Bn | USD 15.48 Bn |
| **Best For** | Space-limited, high-output rooftops | Budget large arrays | Flexible, hot/shaded installs |

---

## Key Takeaways

✅ **Monocrystalline**: Highest efficiency (15-22%), 30-40 year lifespan, premium cost  
✅ **Polycrystalline**: Cost-effective (10-20% cheaper), 15-20% efficiency, blue-speckled  
✅ **Thin-Film**: Lightweight & flexible, 10-12% efficiency, best for high-heat conditions  
✅ **Market Leadership**: Monocrystalline leads with 41.6% market share (USD 7.12B)  
✅ **Selection Criteria**: Space availability, budget, and site conditions determine best choice  
  `
};

export default lesson;


