import type { Lesson } from '@/types/course';

export const lesson3MaterialTakeOffsAndWasteCalculations: Lesson = {
  id: 3,
  title: 'Material Take-Off and Waste Calculation',
  duration: '60 min',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/Q1gxQj109r4',
    textContent: `
# Material Take-Off and Waste Calculation 🧾

## Introduction

Material take-off (MTO) and waste calculation are critical for estimating material quantities, minimizing costs, and preventing delays in roofing projects. Precise MTO ensures accurate procurement, while waste calculation accounts for real-world inefficiencies, supporting sustainable construction.

Mastering these skills equips learners to plan efficiently and reduce waste, supported by course simulations and tutorials.

**YouTube Video: How to Run a Material Takeoff**

---

## Material Take-Off Overview

* **Definition**: MTO is the process of listing and quantifying all materials needed for a project based on blueprints, specifications, and site measurements.  
* **Purpose**:  
  * Estimate costs accurately for budgeting and bidding.  
  * Plan procurement to avoid shortages or overstocking.  
  * Ensure timely delivery and inventory control.  
  * Support sustainable practices by minimizing excess materials.

---

## Sources and Steps

* **Sources of Information**:  
  * Blueprints (roof plans, elevations, sections) for dimensions and material specs.  
  * Specifications for material types (e.g., 30-year asphalt shingles, 30-lb felt).  
  * Schedules listing components like flashing, vents, or fasteners.  
  * Site measurements to verify plan accuracy and account for field conditions.  
* **Steps for MTO**:  
  * Review blueprints and specifications to identify all required materials.  
  * List materials by category (e.g., roofing, flashing, fasteners).  
  * Measure quantities using scale rulers, digital tools, or site verification.  
  * Convert measurements to purchase units (e.g., sq ft to squares, linear ft to rolls).  
  * Apply waste factors (5–15%) to account for cuts, overlaps, and errors.  
  * Summarize in a take-off sheet, organized by trade or system.  
* **YouTube Video: Roofing Takeoffs**

---

## Units and Waste Factors

* **Units of Measurement**:  
  * Shingles: Squares (1 square = 100 sq ft).  
  * Lumber: Board feet (BF) or linear feet (LF).  
  * Concrete: Cubic yards (yd³).  
  * Electrical Wire/Piping: Linear feet (LF).  
  * Underlayment: Rolls or square feet.  
  * Fasteners: Pounds or boxes.  
* **Waste Factors**:  
  * **Asphalt Shingles**: 5–10% (cuts, overlaps).  
  * **Tile Roofing**: 10–15% (breakage, complex cuts).  
  * **Lumber/Drywall**: 10–15% (cutting errors, fitting).  
  * **Wire/Conduit**: 5–10% (slack, bends).  
  * **Concrete**: 5–10% (spillage, formwork).  
* **Factors Affecting Waste**:  
  * Roof complexity (e.g., multiple valleys, hips, or dormers).  
  * Installer skill level and experience.  
  * Weather conditions (e.g., wind scattering materials).  
  * Standard vs. custom material sizes, requiring more cuts.

---

## Example and Best Practices

* **Example Take-Off**:  
  * **Roof Area**: 1,300 sq ft, 6:12 pitch (slope factor 1.118).  
  * **Total Area**: 1,300 × 1.118 = 1,453.4 sq ft.  
  * **Shingles**: 1,453.4 ÷ 100 = 14.53 squares; with 10% waste = 15.98 → 16 squares.  
  * **Underlayment**: 1,453.4 sq ft + 10% = 1,598.74 sq ft → 2 rolls (800 sq ft each).  
  * **Nails**: 4 boxes + 5% = 4.2 boxes → 5 boxes.  
* **Best Practices**:  
  * ✅ Double-check measurements and scales to avoid errors.  
  * ✅ Cross-reference all drawings (roof plan, sections) for accuracy.  
  * ✅ Use digital take-off tools (e.g., PlanSwift, Bluebeam) for precision.  
  * ✅ Include accessories (flashing, vents, sealants) in the take-off.  
  * ✅ Apply realistic waste factors based on roof complexity and material type.  
  * ❌ Don't guess measurements or assume standard materials.  
  * ❌ Don't overlook small components like fasteners or drip edges.

MTO and waste calculation streamline procurement and reduce costs. Course tools help learners practice accurate take-offs for various roofing scenarios.
    `
  }
};
