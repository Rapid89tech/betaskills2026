import type { Lesson } from '@/types/course';

const lesson: Lesson = {
  id: 1,
  title: 'Properties of Wood: Hardwood vs. Softwood, Grain, Moisture',
  duration: '35 minutes',
  type: 'video',
  videoUrl: 'https://youtu.be/X7nBK1Xpc9o',
  // @ts-ignore - content as string is supported pattern used across course lessons
  content: `
# Properties of Wood in Carpentry 🌳

Understanding the properties of wood is essential for carpenters working in construction, cabinetry, furniture making, or roofing. Wood's characteristics—such as whether it is hardwood or softwood, its grain pattern, and its moisture content—directly influence its suitability for specific projects, workability, and durability.

## Hardwood vs. Softwood

Wood is classified into two main categories based on its botanical characteristics and physical properties.

### Hardwood

**Definition**: Hardwoods come from deciduous trees (those that lose their leaves seasonally), such as oak, maple, cherry, walnut, and mahogany.

**Characteristics**:
- **Density and Hardness**: Generally denser and harder, more resistant to wear and damage. Measured on the Janka hardness scale (oak: ~1,200 lbf; maple: ~1,450 lbf)
- **Grain**: Often has complex, attractive grain patterns
- **Color**: Varies widely, from light (maple) to dark (walnut), often deepening with age
- **Cost**: Typically more expensive due to slower growth

**Uses**:
- Furniture making (tables, chairs, cabinets) due to durability and aesthetics
- High-end cabinetry and trim work for visible surfaces
- Flooring, as hardwoods withstand heavy foot traffic

**Advantages**:
- Durable and long-lasting
- Takes stains and finishes well
- Resistant to dents and scratches

**Disadvantages**:
- Harder to cut, shape, or nail
- More expensive and heavier

### Softwood

**Definition**: Softwoods come from coniferous trees (evergreens with needles or scales), such as pine, cedar, fir, spruce, and redwood.

**Characteristics**:
- **Density and Hardness**: Less dense and softer, with lower Janka ratings (pine: ~380–690 lbf; cedar: ~350 lbf)
- **Grain**: Typically straighter and less complex
- **Color**: Often lighter, ranging from pale yellow (pine) to reddish-brown (cedar)
- **Cost**: Generally more affordable and widely available

**Uses**:
- Construction framing (studs, joists, rafters) due to affordability
- Roofing and exterior applications (cedar for shingles)
- Budget-friendly furniture or secondary components

**Advantages**:
- Easier to cut, shape, and fasten
- Lightweight, reducing strain during handling
- Cost-effective for large-scale projects

**Disadvantages**:
- Less durable and more prone to dents and scratches
- May not take fine finishes as well as hardwoods

### Selection Guidelines
- Choose **hardwoods** for projects requiring durability, strength, or visual appeal
- Opt for **softwoods** for structural work, cost-sensitive projects, or where ease of workability is key
- Consider **engineered wood** (plywood, MDF) for specific applications

## Wood Grain

Grain refers to the texture, pattern, and direction of wood fibers, influencing both aesthetics and workability.

### Types of Grain

**Straight Grain**: Fibers run parallel, common in softwoods. Easy to cut and plane, with a uniform look.

**Interlocked Grain**: Fibers twist or spiral, common in hardwoods like mahogany. Creates striking patterns but can be challenging to work.

**Wavy or Curly Grain**: Undulating patterns, as in curly maple, add visual interest but require careful planing.

**Burl Grain**: Irregular, knotty patterns from tree growths, used for decorative veneers.

**End Grain**: Exposed fiber ends (on board ends), absorbent and prone to splitting, requiring careful treatment.

### Uses
- **Straight-grain wood**: Ideal for structural components (beams, studs)
- **Figured grains**: Prized for furniture and cabinetry aesthetics
- **End grain**: Often sealed or capped to prevent moisture absorption

### Best Practices
- Cut and plane with the grain to minimize tear-out
- Use sharp tools for figured or interlocked grains
- Select grain patterns that match aesthetic goals
- Seal end grain with glue or finish to prevent cracking

## Moisture Content

Moisture content (MC) is the amount of water in wood, affecting its stability, strength, and workability.

### Key Concepts

**Green Wood**: Freshly cut wood with high MC (30–200%), prone to shrinking and warping as it dries.

**Kiln-Dried Wood**: Dried in a controlled environment to 6–12% MC, ideal for indoor furniture or cabinetry.

**Air-Dried Wood**: Naturally dried to 12–20% MC, suitable for outdoor or less precise applications.

**Equilibrium Moisture Content (EMC)**: The MC at which wood stabilizes in a given environment (8–12% indoors in temperate regions).

### Effects of Moisture

**Shrinkage and Expansion**: Wood shrinks as it loses moisture and expands as it absorbs it, affecting joint fit and structural stability.

**Warping**: Uneven drying can cause cupping, bowing, or twisting.

**Decay**: High MC (above 20%) promotes fungal growth and rot.

**Strength**: Lower MC increases strength and hardness but can make wood brittle if overly dry.

### Uses
- **Kiln-dried wood (6–8% MC)**: For furniture and cabinetry indoors
- **Air-dried wood (12–15% MC)**: For outdoor projects like decking
- **Green wood**: For specific traditional applications where shrinkage is accounted for

### Best Practices
- Measure MC with a moisture meter before use
- Acclimate wood to the project environment (store indoors for a week)
- Seal wood surfaces with finishes to reduce moisture absorption
- Store wood off the ground in a dry, well-ventilated area
- Allow for wood movement in joinery (floating panels, expansion gaps)

## General Considerations for Carpentry

### Project-Specific Selection
- **Construction**: Softwoods like pine or fir for framing; MC of 15–19%
- **Cabinetry**: Hardwoods like cherry or maple; low MC (6–8%)
- **Furniture**: Hardwoods with attractive grain (walnut, oak); kiln-dried
- **Roofing**: Weather-resistant softwoods like cedar; air-dried

### Sustainability
- Choose responsibly sourced wood (FSC-certified)
- Use reclaimed or recycled wood, checking MC and condition

### Tool Interaction
- Hardwoods require sharper tools and more power
- Figured grains need careful handling with sharp blades
- High-MC wood can dull tools faster

## Why Wood Properties Matter

Understanding wood's properties allows carpenters to select the right material for each project, ensuring durability, functionality, and aesthetic quality. Hardwoods and softwoods serve distinct purposes, while grain and moisture content influence workability and long-term performance. By choosing appropriate wood and handling it correctly, carpenters can minimize waste, prevent structural issues, and create high-quality, lasting work.

---

## Key Takeaways

✅ **Hardwoods**: Deciduous trees, denser, more expensive, ideal for furniture  
✅ **Softwoods**: Coniferous trees, lighter, affordable, ideal for construction  
✅ **Grain Types**: Straight (easy), Interlocked (challenging), Figured (decorative)  
✅ **Moisture Content**: Kiln-dried (6–12%), Air-dried (12–20%), Green (30–200%)  
✅ **MC Effects**: Shrinkage, expansion, warping, decay, strength  
✅ **Acclimation**: Store wood in project environment before use  
  `
};

export default lesson;

