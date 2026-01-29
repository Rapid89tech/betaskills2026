
import { Module } from '@/types/course';

export const module9ReadingPlansAndEstimating: Module = {
  id: 9,
  title: 'Reading Plans and Estimating Materials',
  description: 'Learn to read blueprints and roof plans, calculate roof pitch and area, perform material take-offs, calculate waste factors, and create accurate cost estimates for tiling projects.',
  lessons: [
    {
      id: 45,
      title: 'Reading Blueprints and Roof Plans',
      duration: '45 minutes',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        textContent: `
# Reading Blueprints and Roof Plans

## Introduction
Blueprints and roof plans are critical tools in construction and roofing work. They communicate design intent, measurements, materials, and methods to be followed. Understanding how to read and interpret these documents ensures accuracy, safety, and code compliance on-site.

## What is a Blueprint?
A blueprint is a scaled technical drawing that shows how a building or component is to be constructed. It includes:
- Architectural layout
- Structural details
- Electrical, plumbing, and HVAC systems
- Roof plans and elevations

Blueprints are drawn to scale and use symbols, notes, and dimensions to convey information.

## Key Components of Blueprints

| Component | Description |
|-----------|-------------|
| Title Block | Contains project name, address, designer/architect, date, drawing number, scale |
| Revision Block | Shows changes made to the drawing and their dates |
| Legend | Defines the symbols used throughout the blueprint |
| Scale | Ratio of drawing size to real-world size (e.g., 1/4" = 1'-0") |
| North Arrow | Indicates orientation for layout and sunlight planning |
| Notes | Provide additional specifications or special instructions |

## Types of Drawings Found in Blueprints
- **Site Plan**: Layout of the building and surrounding land
- **Floor Plan**: Overhead view showing walls, doors, windows, and rooms
- **Elevation Drawings**: Side views of the building showing exterior appearance
- **Section Drawings**: Cutaway views that show structural elements
- **Roof Plan**: Top-down view of the roofing structure including slopes, penetrations, and drainage

## Understanding Roof Plans
A roof plan is a specific type of blueprint that illustrates:
- Roof shape and slope
- Ridges, valleys, hips, and gables
- Drainage (gutters, downspouts)
- Roof penetrations (vents, chimneys, skylights)
- Roof material types and installation methods

## Symbols and Notations in Roof Plans

| Symbol | Meaning |
|--------|---------|
| 🔺 | Roof slope or pitch indicator |
| 🔘 | Roof vent or pipe penetration |
| ⚫ | Skylight |
| ▲ or ▽ | Ridge (up) or valley (down) |
| --- // --- | Gutter/downspout |
| → | Direction of slope |

Roof pitch is often written as a ratio (e.g., 4:12), meaning 4 inches of rise for every 12 inches of horizontal run.

## Interpreting Dimensions and Scale
- Dimensions are usually given in feet and inches (e.g., 12'-6")
- Scales vary (common: 1/4" = 1'-0")—check the title block
- Use a scale ruler to convert drawing measurements to actual size

## Common Roof Design Elements

| Element | Description |
|---------|-------------|
| Ridge | The highest point where two sloping roofs meet |
| Valley | Where two roof sections slope inward |
| Hip | External angle formed by intersecting roof slopes |
| Gable | Triangular section formed by two roof slopes |
| Eave | The edge of the roof that overhangs the walls |

## Reading Construction Notes and Schedules
Blueprints often include notes such as:
- "Install ice and water shield 36" above eaves."
- "Use 30-lb felt underlayment on all sloped areas."
- "Ventilation: Ridge vent 2" continuous."

Material Schedules may list:
- Roofing material types (e.g., asphalt shingles, TPO, metal)
- Fastener specifications
- Flashing details

## Best Practices for Reading Roof Plans

**✅ Do:**
- Cross-reference with other views (floor plans, sections)
- Confirm scale and dimensions before measuring
- Clarify unfamiliar symbols using the legend
- Take notes or mark up a printed copy during site work

**❌ Don't:**
- Assume standard materials—check notes and schedules
- Ignore pitch and drainage details—they affect performance
- Work from memory—always verify from the actual drawings

## Legal and Safety Relevance
- Accurate interpretation of plans ensures code compliance (IBC, IRC)
- Errors can lead to structural issues, water damage, or failed inspections
- Roof plans guide safe installation of fall protection and anchor systems

## Conclusion
Reading blueprints and roof plans is a fundamental skill for anyone working in construction or roofing. It ensures proper material use, safety, efficiency, and project success. Mastering blueprint literacy empowers you to make informed decisions and avoid costly mistakes.

### Quote to Remember
"Measure twice, build once—read the plan before you raise your hand."
        `
      }
    },
    {
      id: 46,
      title: 'Calculating Roof Pitch and Area',
      duration: '40 minutes',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        textContent: `
# Calculating Roof Pitch and Area

## Introduction
Accurate roof pitch and area calculations are essential for material estimation, drainage design, and safety planning in roofing and construction projects. Understanding these concepts helps ensure efficiency, code compliance, and proper installation practices.

## What Is Roof Pitch?
Roof pitch is the measure of the steepness or slope of a roof, typically expressed as a ratio of rise to run.
- **Rise**: The vertical height the roof increases over a given distance
- **Run**: The horizontal distance over which the rise occurs (commonly 12 inches)

**📐 Pitch format:**
Example: 4:12 pitch means the roof rises 4 inches for every 12 inches of horizontal run.

## Types of Roof Pitch

| Pitch Type | Slope Ratio | Description |
|------------|-------------|-------------|
| Flat | 0:12 – 2:12 | Low slope, usually membrane roofs |
| Low-Slope | 2:12 – 4:12 | Requires special waterproofing |
| Conventional | 4:12 – 9:12 | Common for residential roofs |
| Steep-Slope | >9:12 | High pitch, better drainage |

## How to Measure Roof Pitch

### A. Using a Level and Tape Measure
1. Place a level horizontally on the roof
2. Mark 12 inches from one end of the level (the run)
3. Measure vertically from the 12-inch mark down to the roof surface (the rise)
4. Express the rise over 12 to determine pitch

### B. Using a Speed Square
- Align the pivot point with the roof edge and read the angle or pitch directly

### C. Using a Roof Pitch App or Digital Tool
- Use a smartphone inclinometer or roofing calculator for fast, accurate pitch readings

## Why Roof Pitch Matters
- **Drainage**: Steeper pitches shed water faster
- **Material Suitability**: Some materials aren't suitable for low-slope roofs
- **Safety**: Higher pitches require enhanced fall protection
- **Aesthetics**: Influences the look and character of a building

## Calculating Roof Area

### Step-by-step for a gable roof:

**A. Measure Building Footprint**
- Measure the length and width of the building
- Example: 40 ft (length) × 30 ft (width) = 1,200 sq ft footprint

**B. Find the Slope Factor (Pitch Multiplier)**
Use a slope factor table or the formula:
🧮 **Slope Factor = √(rise² + run²) ÷ run**

| Pitch (Rise:12) | Slope Factor |
|-----------------|--------------|
| 3:12 | 1.031 |
| 4:12 | 1.054 |
| 6:12 | 1.118 |
| 9:12 | 1.25 |
| 12:12 | 1.414 |

**C. Calculate Total Roof Area**
🧮 **Roof Area = Building Footprint × Slope Factor**

**📌 Example:**
1,200 sq ft × 1.118 (for 6:12 pitch) = 1,341.6 sq ft of roof surface

## Calculating Area for Complex Roofs
For hip, valley, or multiple-slope roofs:
1. Break into sections (rectangles, triangles)
2. Calculate each section's area using pitch
3. Add together for the total roof area

**✏️ Pro Tip:** Always add 10–15% waste factor for overlaps, cuts, and flashing.

## Material Estimation Based on Area
Roofing materials are sold by:
- **Squares**: 1 square = 100 sq ft
- **Bundles**: 3 bundles of shingles typically = 1 square

**📌 To find required materials:**
- Roof area (e.g., 1,341 sq ft) ÷ 100 = 13.41 squares
- Add 10% = 14.75 → Round up to 15 squares

## Tools for Roof Pitch and Area Calculation

| Tool | Purpose |
|------|---------|
| Level & tape | Manual pitch measurement |
| Speed square | Fast angle or pitch check |
| Roof calculator app | Automatic pitch & area estimate |
| Laser measure | Accurate distance measuring |
| Drone w/ software | Aerial measurement & modeling |

## Safety and Legal Considerations
- High-pitch roofs require fall protection (guardrails, PFAS, lifelines)
- Material loads must match structural limits based on roof slope
- Local codes may specify minimum or maximum allowable pitch

## Conclusion
Calculating roof pitch and area accurately is essential for estimating materials, planning labor, ensuring safety, and maintaining code compliance. With the right tools and methods, you can reduce waste, improve productivity, and build roofs that last.

### Pro Tip
"The pitch tells the story. The area finishes the plan."
        `
      }
    },
    {
      id: 47,
      title: 'Material Take-Off and Waste Calculation',
      duration: '50 minutes',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        textContent: `
# Material Take-Off and Waste Calculation

## Introduction
Material take-off (MTO) and waste calculation are critical steps in project planning and cost estimation. They ensure that the correct quantity of materials is ordered, reducing delays, excess inventory, and cost overruns.

## What is Material Take-Off (MTO)?
Material Take-Off (MTO) is the process of listing and quantifying all materials needed for a construction project based on drawings and specifications.

**🔍 Purpose:**
- Estimate costs
- Plan procurement and delivery
- Prevent shortages or over-ordering

## Sources of Take-Off Information
- **Blueprints and plans**: Floor plans, roof plans, electrical schematics
- **Specifications**: Technical data about materials
- **Schedules**: Lists such as door/window schedules, fixture schedules
- **Site measurements**: Field verification of actual dimensions

## Basic Steps in Performing a Material Take-Off

1. **Review the project drawings**
2. **Identify materials by location** (roof, floor, walls, etc.)
3. **List each material type**
   - e.g., asphalt shingles, concrete blocks, conduit, wire, fasteners
4. **Measure quantities**
   - Use scale rulers or software to extract dimensions
5. **Convert to purchase units**
   - e.g., square feet to bundles or rolls
6. **Apply waste factors**
   - Account for cuts, errors, and overlaps
7. **Summarize in a take-off sheet**
   - Organize by trade or system (roofing, electrical, framing, etc.)

## Units of Measurement

| Material Type | Unit |
|---------------|------|
| Shingles | Squares (100 sq ft) |
| Lumber | Board feet (BF) or linear feet (LF) |
| Concrete | Cubic yards (yd³) |
| Electrical wire | Linear feet (LF) |
| Piping | Linear feet (LF) |
| Roofing underlayment | Rolls or square feet |
| Nails/screws | Pounds, boxes |

## Common Take-Off Examples

### A. Roofing Take-Off Example
- **Roof Area**: 1,300 sq ft
- **Shingle Coverage**: 1 square = 100 sq ft
- **Required**: 13 squares
- **Waste (10%)**: 13 × 0.10 = 1.3 squares → Round to 15 squares

### B. Electrical Conduit
- **Run length**: 60 ft
- **Add 10% for slack and bends**: 60 × 1.10 = 66 ft
- **Purchase**: 10-ft sticks → 66 ÷ 10 = 7 sticks

## Understanding Waste Calculation
Waste refers to the material lost or unusable due to cutting, fitting, overlap, or error.

### Typical Waste Percentages:

| Material Type | Waste Factor |
|---------------|--------------|
| Asphalt shingles | 5–10% |
| Tile roofing | 10–15% |
| Lumber | 5–10% |
| Drywall | 10–15% |
| Wire/conduit | 5–10% |
| Concrete | 5–10% |

**🔎 Factors affecting waste:**
- Roof complexity (valleys, hips)
- Installer skill level
- Weather and handling
- Standard vs. custom sizes

## Tips for Accurate Material Take-Off

**✅ Do:**
- Double-check scale and units
- Cross-reference all drawings
- Label materials clearly
- Use digital take-off tools for accuracy
- Always add an appropriate waste factor

**❌ Don't:**
- Guess measurements
- Forget accessories (flashing, connectors, fasteners)
- Underestimate waste for complex areas

## Material Take-Off Sheet Format (Sample)

| Item | Description | Qty Needed | Unit | Waste % | Total Qty |
|------|-------------|------------|------|---------|-----------|
| Asphalt Shingles | 3-tab, 25-year | 13 | Sq | 10% | 15 Sq |
| Underlayment | 36" roll | 1,300 | SqFt | 10% | 1,430 SqFt |
| Nails | Roofing nails | 4 | Boxes | 5% | 4.2 Boxes |
| Ridge Vents | 2 ft sections | 24 | LF | 5% | 25.2 LF |

## Benefits of Proper Take-Off and Waste Estimation
- Saves money by preventing over-ordering
- Prevents delays due to shortages
- Improves inventory control
- Supports sustainable construction (less waste)
- Helps in contractor bidding and project planning

## Conclusion
Material take-off and waste calculation are foundational skills in construction and roofing. Mastering them ensures cost-effective, efficient, and high-quality work. Use consistent methods, allow for waste, and always verify measurements to avoid costly mistakes.

### Pro Tip
"A good estimate builds confidence. A great one saves your project."
        `
      }
    },
    {
      id: 48,
      title: 'Cost Estimation and Budgeting',
      duration: '45 minutes',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        textContent: `
# Cost Estimation and Budgeting

## Introduction
Cost estimation and budgeting are essential processes in construction and project management. They help determine how much a project will cost, allocate resources, and ensure financial control throughout the project life cycle.

## What is Cost Estimation?
Cost estimation is the process of forecasting the total cost of a construction project based on drawings, specifications, labor, materials, and other resources.

**🔍 Purpose of Cost Estimation:**
- Determine project feasibility
- Establish budgets
- Aid in bidding and negotiations
- Prevent cost overruns

## Types of Cost Estimates

| Type | Purpose | Accuracy Level |
|------|---------|----------------|
| Preliminary (ROM) | Early-stage planning | ±25%–40% |
| Square Foot Estimate | Based on cost per unit area (e.g., $/sq ft) | ±15%–25% |
| Assemblies Estimate | Groups elements together (e.g., roof system) | ±10%–20% |
| Detailed Estimate | Line-by-line breakdown with take-off | ±5%–10% (most accurate) |
| Bid Estimate | Submitted to client for contract | Must be very accurate |

## What is Budgeting?
A budget is a detailed financial plan that allocates costs to different phases and components of a project, serving as a control tool during execution.

**🔐 Purpose of Budgeting:**
- Set financial boundaries
- Manage cash flow
- Monitor progress and control expenses
- Identify cost variances early

## Components of a Construction Cost Estimate

| Cost Category | Description |
|---------------|-------------|
| Direct Costs | Materials, labor, equipment |
| Indirect Costs | Permits, insurance, site supervision |
| Overhead | Office expenses, admin, utilities |
| Profit Margin | Contractor's expected return |
| Contingency | Buffer for unexpected costs (5–15%) |

## Steps in Cost Estimation
1. Review the project scope and drawings
2. Perform quantity take-offs (MTO)
3. Determine unit prices for materials and labor
4. Calculate direct costs
5. Include indirect, overhead, and contingency costs
6. Summarize total estimate
7. Review and adjust for accuracy

## Budgeting Techniques

| Technique | Description |
|-----------|-------------|
| Top-down | Estimate total cost first, then break down by category |
| Bottom-up | Estimate each item/component and sum for total |
| Historical data | Use past projects as benchmarks |
| Parametric | Use statistical models (e.g., $100 per sq ft) |

## Factors Affecting Cost Estimates
- Material prices
- Labor rates
- Project location
- Weather and site conditions
- Design complexity
- Schedule constraints
- Market conditions (inflation, demand)

## Using Software for Estimation and Budgeting

| Tool/Software | Use Case |
|---------------|----------|
| Microsoft Excel | Custom spreadsheets and templates |
| PlanSwift | Digital take-offs from blueprints |
| Buildertrend | Project management and cost tracking |
| RSMeans Data | Industry-standard pricing database |
| ProEst / Sage | Advanced construction estimating tools |

## Managing Budget During Construction
- Track actual costs vs. budget
- Use change orders for scope changes
- Maintain cost logs and reports
- Review and approve invoices carefully
- Update forecast as project progresses

## Cost Control Techniques

**✅ Best Practices:**
- Accurate initial estimate
- Clear contract scope
- Regular progress tracking
- Early detection of overruns
- Contingency planning

**❌ Avoid:**
- Underestimating labor or material needs
- Ignoring small overruns (they add up)
- Failing to update the budget during execution

## Example: Roofing Budget Breakdown

| Item | Quantity | Unit Cost | Total Cost |
|------|----------|-----------|------------|
| Shingles (15 sq) | 1,500 SF | $2.50/SF | $3,750 |
| Underlayment | 1,430 SF | $0.30/SF | $429 |
| Nails (4 boxes) | 4 | $25 | $100 |
| Labor (2 workers, 2 days) | 32 hrs | $35/hr | $1,120 |
| Dumpster rental | 1 | $300 | $300 |
| Contingency (10%) | – | – | $570 |
| **Total** | | | **$6,269** |

## Conclusion
Cost estimation and budgeting are essential for successful project planning, execution, and financial control. Accurate estimates prevent surprises, and a solid budget keeps the project on track. Combined, they ensure profitability and client satisfaction.

### Pro Tip
"Measure twice, estimate once — but monitor always."
        `
      }
    },
    {
      id: 49,
      title: 'Material Take-Off and Cost Estimation Quiz',
      duration: '20 minutes',
      type: 'quiz',
      content: {
        questions: [
          {
            question: 'What is the main purpose of a Material Take-Off (MTO)?',
            options: [
              'To decorate blueprints',
              'To analyze labor productivity',
              'To list and quantify materials needed for a project',
              'To design structural layouts'
            ],
            correct: 2,
            explanation: 'Material Take-Off (MTO) is the process of listing and quantifying all materials needed for a construction project based on drawings and specifications.'
          },
          {
            question: 'Which of the following is NOT typically a source of take-off information?',
            options: [
              'Specifications',
              'Elevation schedules',
              'Site measurements',
              'Advertising brochures'
            ],
            correct: 3,
            explanation: 'Advertising brochures are not used for material take-off. Take-off information comes from blueprints, specifications, schedules, and site measurements.'
          },
          {
            question: 'If a roofing area is 1,300 sq ft and one square of shingles covers 100 sq ft, how many squares are needed with 10% waste added?',
            options: [
              '13',
              '14',
              '15',
              '16'
            ],
            correct: 2,
            explanation: '1,300 ÷ 100 = 13 squares needed. With 10% waste: 13 × 1.10 = 14.3, which rounds up to 15 squares.'
          },
          {
            question: 'Which unit is used to measure electrical wire during take-off?',
            options: [
              'Cubic yards',
              'Board feet',
              'Linear feet',
              'Pounds'
            ],
            correct: 2,
            explanation: 'Electrical wire is measured in linear feet (LF) during material take-off.'
          },
          {
            question: 'What is the purpose of applying a waste factor during material take-off?',
            options: [
              'To increase contractor profit',
              'To account for potential material losses and cuts',
              'To reduce material cost',
              'To estimate labor hours'
            ],
            correct: 1,
            explanation: 'Waste factors account for material losses due to cutting, fitting, overlap, errors, and handling during installation.'
          },
          {
            question: 'Which of the following materials typically has the highest waste factor?',
            options: [
              'Asphalt shingles',
              'Wire',
              'Drywall',
              'Concrete'
            ],
            correct: 2,
            explanation: 'Drywall typically has a waste factor of 10-15%, which is higher than most other materials due to cutting and fitting requirements.'
          },
          {
            question: 'True or False: Digital take-off tools can improve accuracy and reduce manual errors in quantity estimation.',
            options: [
              'True',
              'False'
            ],
            correct: 0,
            explanation: 'True. Digital take-off tools provide more accurate measurements and calculations, reducing human error in quantity estimation.'
          },
          {
            question: 'True or False: You should guess measurements when drawings are unclear, as it speeds up the estimation process.',
            options: [
              'True',
              'False'
            ],
            correct: 1,
            explanation: 'False. Guessing measurements can lead to significant errors in material quantities and costs. Always clarify unclear drawings before proceeding.'
          },
          {
            question: 'What percentage contingency is typically added to construction estimates?',
            options: [
              '1-3%',
              '5-15%',
              '20-25%',
              '30-40%'
            ],
            correct: 1,
            explanation: 'Contingency of 5-15% is typically added to construction estimates to buffer for unexpected costs and changes.'
          },
          {
            question: 'Which type of cost estimate has the highest accuracy level?',
            options: [
              'Preliminary (ROM)',
              'Square Foot Estimate',
              'Assemblies Estimate',
              'Detailed Estimate'
            ],
            correct: 3,
            explanation: 'Detailed estimates have the highest accuracy (±5-10%) because they include line-by-line breakdowns with complete material take-offs.'
          }
        ]
      }
    }
  ]
};
