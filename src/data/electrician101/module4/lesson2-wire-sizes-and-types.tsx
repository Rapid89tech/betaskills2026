import type { Lesson } from '@/types/course';

export const lesson2WireSizesAndTypes: Lesson = {
  id: 2,
  title: 'Wire Sizes and American Wire Gauge (AWG)',
  duration: '40 min',
  type: 'reading',
  content: {
    textContent: `
# Wire Sizes and American Wire Gauge (AWG) 📏

## American Wire Gauge (AWG)

### Overview
- Standard system for wire diameter measurement
- Lower number = thicker wire
- Higher number = thinner wire

### Common Wire Sizes
- **14 AWG**: 15A circuits (lighting, outlets)
- **12 AWG**: 20A circuits (kitchens, bathrooms)
- **10 AWG**: 30A circuits (water heaters, dryers)
- **8 AWG**: 40-50A circuits (ranges, large appliances)
- **6 AWG**: 55A circuits (sub-panels, large loads)

## Ampacity
- Maximum current a wire can safely carry
- Based on wire size, insulation type, and installation method
- Must follow NEC ampacity tables
- Factors affecting ampacity:
  - Wire material (copper vs aluminum)
  - Temperature rating
  - Number of conductors in conduit
  - Ambient temperature

## Wire Colors (US Standard)
- **Black**: Hot (line voltage)
- **Red**: Hot (second hot in 240V)
- **Blue**: Hot (three-way switches)
- **White**: Neutral
- **Green/Bare**: Ground

## Voltage Drop
- Resistance in long wire runs causes voltage loss
- Maximum allowed: 3% for branch circuits
- Calculate based on wire length, size, and load
- Use larger wire for long distances

## 💡 Key Takeaways
- Proper wire sizing prevents overheating
- Follow NEC ampacity tables
- Consider voltage drop in calculations
- Use correct wire colors for safety
    `
  }
};

