import type { Lesson } from '@/types/course';

export const lesson1ReadingBlueprints: Lesson = {
  id: 1,
  title: 'Reading Electrical Blueprints',
  duration: '50 min',
  type: 'reading',
  content: {
    textContent: `
# Reading Electrical Blueprints 📐

## Introduction
Electrical blueprints are technical drawings that show the design, layout, and specifications of electrical systems in buildings.

## Types of Electrical Drawings
- **Site plans**: Overall property layout with electrical service
- **Floor plans**: Room layouts with electrical devices
- **Power plans**: Circuits, panels, and distribution
- **Lighting plans**: Light fixtures and switching
- **Single-line diagrams**: Power distribution overview
- **Schematic diagrams**: Detailed circuit connections
- **Detail drawings**: Close-up views of complex installations

## Blueprint Components
- **Title block**: Project information, dates, revisions
- **Legend/Symbol key**: Explains all symbols used
- **Scale**: Drawing scale (e.g., 1/4" = 1')
- **Notes**: Special instructions and specifications
- **Schedules**: Lists of panels, circuits, fixtures

## Reading Steps
1. Review title block and notes
2. Study legend and symbols
3. Identify electrical service entrance
4. Trace main panels and sub-panels
5. Follow branch circuits
6. Note special requirements
7. Check for revisions and updates

## Common Information Found
- Outlet and switch locations
- Light fixture positions
- Panel locations and sizes
- Circuit numbers and loads
- Wire sizes and types
- Conduit routes
- Special equipment

## 💡 Key Points
- Always read notes and specifications
- Understand scale and dimensions
- Check for latest revisions
- Cross-reference with other trades
- Ask questions if unclear
    `
  }
};

