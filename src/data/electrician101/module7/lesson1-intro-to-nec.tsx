import type { Lesson } from '@/types/course';

export const lesson1IntroToNEC: Lesson = {
  id: 1,
  title: 'Introduction to the National Electrical Code',
  duration: '45 min',
  type: 'reading',
  content: {
    textContent: `
# Introduction to the National Electrical Code (NEC) 📖

## What is the NEC?

### Definition
The National Electrical Code (NEC), also known as NFPA 70, is a set of standards for safe electrical installation and design in the United States.

### Purpose
- Protect people and property from electrical hazards
- Provide minimum safety standards
- Ensure consistent practices nationwide
- Prevent fires, shocks, and other electrical dangers

## History
- First published in 1897
- Updated every 3 years
- Current edition: NEC 2023 (or latest)
- Adopted by most US states and local jurisdictions

## NEC Structure

### Articles
Organized into 9 chapters:
1. **General** (Articles 90-110)
2. **Wiring and Protection** (Articles 200-285)
3. **Wiring Methods and Materials** (Articles 300-398)
4. **Equipment** (Articles 400-490)
5. **Special Occupancies** (Articles 500-590)
6. **Special Equipment** (Articles 600-695)
7. **Special Conditions** (Articles 700-770)
8. **Communications Systems** (Articles 800-840)
9. **Tables and Annexes**

### Key Articles
- **Article 110**: General requirements
- **Article 210**: Branch circuits
- **Article 220**: Load calculations
- **Article 250**: Grounding and bonding
- **Article 300**: Wiring methods
- **Article 310**: Conductors
- **Article 400**: Cords and cables
- **Article 430**: Motors

## How to Use the NEC
1. Understand the index and table of contents
2. Use the table of contents to find relevant articles
3. Read article titles and sections
4. Refer to tables for specific values
5. Check exceptions carefully
6. Consult annexes for guidance (not mandatory)

## Local Codes
- NEC is minimum standard
- Local jurisdictions may add requirements
- Always check local amendments
- Some areas have stricter rules
- Inspectors enforce local codes

## 💡 Key Takeaways
- NEC ensures electrical safety
- Updated every 3 years
- Minimum standards (can be exceeded)
- Local codes may be stricter
- Essential reference for all electricians
- Learn to navigate the code book efficiently
    `
  }
};

