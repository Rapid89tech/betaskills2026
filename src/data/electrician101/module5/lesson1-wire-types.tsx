import type { Lesson } from '@/types/course';

export const lesson1WireTypes: Lesson = {
  id: 1,
  title: 'Types of Wire (THHN, NM-B, UF-B, MC)',
  duration: '45 min',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/_AApboO3aj0',
    textContent: `
# Types of Wire 🔌

## Common Wire Types

### 1. THHN (Thermoplastic High Heat-resistant Nylon-coated)
- **Conductor**: Copper or aluminum
- **Rated for**: 600 volts, dry/damp locations, 90°C
- **Applications**: Conduit wiring, panels, motor controls
- **Label Example**: THHN 12 AWG Cu 600V

### 2. THWN/THWN-2
- Similar to THHN but water-resistant
- THWN-2 rated 90°C in wet and dry locations
- **Applications**: Outdoor conduit, underground raceways, wet environments

### 3. NM-B (Non-Metallic Sheathed Cable - Romex®)
- Contains multiple conductors (2 or 3 + ground)
- PVC jacket, rated 600V, 90°C
- **Applications**: Residential indoor wiring, walls, ceilings, dry areas
- **Label**: NM-B 12/2 w/ Ground

### 4. UF-B (Underground Feeder)
- Solid thermoplastic jacket
- Moisture, sunlight, and corrosion-resistant
- Can be direct buried
- **Applications**: Outdoor wiring, underground circuits, garden lighting
- **Gray sheath** for easy identification

### 5. MC Cable (Metal-Clad Cable)
- Conductors surrounded by metallic armor
- Offers mechanical protection
- Fire-resistant
- **Applications**: Commercial buildings, hospitals, industrial spaces

### 6. AC Cable (Armored Cable/BX)
- Similar to MC with bonding strip
- Paper or fabric insulation in older versions
- **Applications**: Older commercial systems, dry indoor locations

### 7. MTW (Machine Tool Wire)
- Flexible copper wire
- Oil, water, and flame-resistant
- **Applications**: Internal wiring of machines and control panels

## Color Coding
- **White sheath**: 14 AWG NM-B
- **Yellow sheath**: 12 AWG NM-B
- **Orange sheath**: 10 AWG NM-B
- **Gray sheath**: UF-B

## Code Considerations
- Follow NEC for allowable uses
- Don't use NM-B in wet or exposed areas
- Use conduit for THHN/THWN wires
- Size wires properly for ampacity and voltage drop

## 💡 Key Takeaways
- Choose right wire for environment
- Comply with electrical codes
- Ensure safe, long-lasting installations
- Wire type affects safety and performance
    `
  }
};

