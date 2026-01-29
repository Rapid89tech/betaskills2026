import type { Lesson } from '@/types/course';

const lesson: Lesson = {
  id: 5,
  title: 'Mounting Structures and Cabling',
  duration: '25 minutes',
  type: 'video',
  videoUrl: 'https://youtu.be/BcDJC_lzRsU',
  content: `
# Mounting Structures and Cabling 🏗️

As of October 2025, mounting structures and cabling form the unsung backbone of solar PV systems, ensuring stability, efficiency, and safety amid record installations exceeding 380 GW in the first half of the year. The global solar PV mounting systems market, valued at USD 29.16 billion this year, is projected to reach USD 37.89 billion by 2029 at a 6.8% CAGR, driven by innovations in lightweight materials and tracking tech. Meanwhile, the solar cable market grows from $1.12 billion in 2025 at a rapid pace, fueled by demands for UV-resistant, high-voltage conductors to handle larger arrays.

## Mounting Structures

Mounting structures secure panels against wind, snow, and seismic loads, with roof and ground types leading 80% of deployments for their adaptability.

### 1. Roof-Mounted Structures

**How It Works**: Rails or clamps affix panels to rooftops via penetrating (screws into rafters) or non-penetrating (ballasted with weights) methods, often at fixed tilts matching local latitude for optimal sun capture. Aluminum extrusions provide the frame, with torque tubes for stability.

**Advantages**:
- **Space-efficient** for urban homes, adding 10-15% yield via optimal angles; non-penetrating avoids leaks
- **Lower land costs** and quicker installs (1-2 days for residential); integrates with BIPV trends
- **Cost-effective** at $0.10-0.20/W, with 25+ year durability in corrosion-resistant alloys

**Limitations**:
- **Roof weight limits** (up to 4-5 psf) and potential shading from vents; penetrating risks waterproofing failures
- **Higher upfront engineering** for sloped or composite roofs; less scalable than ground

**Applications**: Residential and commercial rooftops in dense areas; ideal for 5-50 kW systems where land is scarce.

### 2. Ground-Mounted Structures

**How It Works**: Fixed-tilt racks or single/dual-axis trackers elevate panels on steel/aluminum frames driven into soil via helical piles or concrete footings, rotating via motors to follow the sun for 20-40% extra output.

**Advantages**:
- **Superior access** for cleaning/maintenance and higher yields in sunny, open sites; trackers boost ROI in high-irradiance zones
- **Scalable for utility farms** (100 kW+); adjustable for seasonal tilts without disassembly
- **Resilient to extreme weather** with galvanized coatings, lasting 30+ years

**Limitations**:
- **Higher costs** ($0.15-0.30/W) and land use (5-10 acres/MW); permitting delays for large arrays
- **Vulnerable to flooding or soil erosion**; trackers add mechanical complexity and energy draw (1-2% of output)

**Applications**: Utility-scale solar farms in deserts or agrivoltaics blending panels with crops; off-grid sites needing elevation.

## Cabling

Solar cabling transmits power with minimal losses, emphasizing insulation against UV, heat, and moisture, with DC and AC types handling distinct segments of the system.

### 3. DC Cabling

**How It Works**: Single-conductor wires (e.g., PV wire or USE-2, 600-2000V rated) connect panels in series/parallel to inverters, using MC4 connectors for quick, waterproof joins; copper cores ensure low resistance.

**Advantages**:
- **High flexibility** and UV/ozone resistance for outdoor runs up to 100m with <3% loss; flame-retardant sheathing meets UL 4703 standards
- **Cost-efficient** at $0.50-1.00/ft, supporting bifurcated designs for modern high-power modules
- **Easy to bundle** in conduits, reducing installation time

**Limitations**:
- **Voltage drop in long runs** requires thicker gauges (10-6 AWG); potential arc risks without proper fusing
- **Copper theft vulnerability**; aluminum alternatives save 30% cost but need larger sizes for equivalent conductivity

**Applications**: Panel-to-inverter strings in residential or farm arrays; essential for off-grid where reliability trumps aesthetics.

### 4. AC Cabling

**How It Works**: Multi-conductor cables (e.g., THWN-2 or USE, 600V) link inverters to meters or panels, often in armored conduits for protection; transformers step up voltage for grid export.

**Advantages**:
- **Safer lower voltages** (120-480V) reduce shock risks; compatible with standard building codes for indoor/outdoor use
- **Durable in conduits** against rodents/heat, with efficiencies near 99% over short distances
- **Versatile for hybrid systems** integrating batteries or EVs

**Limitations**:
- **Higher losses in unbalanced loads**; requires grounding and surge protection
- **More rigid than DC**, complicating retrofits; costs $0.75-1.50/ft for armored types

**Applications**: Inverter-to-grid ties in grid-tied homes or commercial buildings; utility interties for large exports.

## Comparison Table

| **Aspect** | **Roof-Mounted** | **Ground-Mounted** | **DC Cabling** | **AC Cabling** |
|-----------|-----------------|-------------------|---------------|---------------|
| **Cost ($/W or /ft)** | $0.10-0.20/W | $0.15-0.30/W | $0.50-1.00/ft | $0.75-1.50/ft |
| **Efficiency/Yield Boost** | Baseline (fixed tilt) | +20-40% (with tracking) | <3% loss over 100m | Near 99% short runs |
| **Lifespan** | 25+ years | 30+ years | 25-30 years | 20-30 years |
| **Installation Time** | 1-2 days (residential) | 3-7 days (per MW) | Quick (plug-and-play) | Moderate (conduits) |
| **Best For** | Urban rooftops, space-limited | Farms, high-output sites | Outdoor panel strings | Indoor grid ties |
| **Market Trend (2025)** | 60% residential share | Utility growth (40% additions) | 70% of cabling volume | Rising with hybrids |

---

## Key Takeaways

✅ **Mounting Market**: USD 29.16 billion in 2025, growing to USD 37.89 billion by 2029  
✅ **Roof Mounting**: $0.10-0.20/W, 1-2 day residential install, 25+ year lifespan  
✅ **Ground Mounting**: 20-40% yield boost with tracking, 30+ year lifespan  
✅ **DC Cabling**: UV-resistant, <3% loss, $0.50-1.00/ft, essential for panel strings  
✅ **AC Cabling**: 99% efficiency, $0.75-1.50/ft, safer lower voltages  
  `
};

export default lesson;

