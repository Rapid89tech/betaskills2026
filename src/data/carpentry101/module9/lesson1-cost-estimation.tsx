import type { Lesson } from '@/types/course';

const lesson: Lesson = {
  id: 1,
  title: 'Cost Estimation and Project Budgeting',
  duration: '35 minutes',
  type: 'video',
  videoUrl: 'https://youtu.be/GXLu3Ye1JkA',
  content: `
# Cost Estimation and Project Budgeting in Carpentry 💰

Cost estimation and project budgeting are essential for ensuring carpentry projects are financially viable and completed within scope. These processes involve calculating material, labor, tool, and overhead costs, while accounting for contingencies and profit margins.

## Principles of Cost Estimation and Project Budgeting

### Accuracy
Precise calculations based on detailed measurements, material prices, and labor rates minimize cost overruns.

### Comprehensiveness
Include all direct costs (materials, labor) and indirect costs (overheads, contingencies) for realistic budgets.

### Market Relevance
Use current South African material and labor rates, adjusted for regional variations.

### Flexibility
Account for price fluctuations, project scope changes, and unforeseen challenges with contingency reserves.

### Profitability
Incorporate profit margins (typically 15–30%) to ensure business sustainability.

## Cost Estimation Components

### 1. Material Costs

Materials are a significant portion of carpentry project costs.

**Types**:
- **Solid Wood**: Hardwoods (oak, meranti) at R150–R300 per board meter; softwoods (pine) at R50–R100 per board meter
- **Engineered Wood**: Plywood (R300–R600 per 4x8 ft sheet, 18mm); MDF (R250–R500 per 4x8 ft sheet, 16mm)
- **Roofing Materials**: Asphalt shingles (R100–R200 per m²); metal roofing (R150–R350 per m²); cedar shakes (R400–R800 per m²)
- **Hardware**: Hinges (R20–R100 each), screws (R50–R150 per 100), drawer slides (R100–R300 per pair)
- **Finishes**: Water-based polyurethane (R200–R400 per liter); oil-based stain (R150–R300 per liter); exterior paint (R250–R500 per liter)

**Estimation Method**:
1. Create detailed cut list from project plans
2. Measure dimensions (m² for flooring, linear meters for trim)
3. Calculate material quantities (board meters for wood, m² for roofing)
4. Source prices from South African suppliers (Timbercity, Builders Warehouse)
5. Account for bulk discounts or delivery fees
6. Add 5–10% for waste (offcuts, defective boards)
7. Add 10% for price fluctuations

**Example**: For a 2x1m oak tabletop (2m², 25mm thick), estimate 0.05m³ of oak at R250/m³ = R12,500, plus 10% waste (R1,250) = R13,750

### 2. Labor Costs

Labor costs depend on skill level, project complexity, and regional rates.

**Rates** (South Africa):
- **General Carpenter**: R150–R250 per hour in urban areas (Johannesburg, Cape Town); R100–R180 in rural areas
- **Specialized Carpenter** (CNC operator, cabinet maker): R200–R350 per hour
- **Apprentice/Assistant**: R80–R150 per hour

**Estimation Method**:
1. Break down project into tasks (cutting, joinery, assembly, finishing)
2. Estimate hours per task based on experience
3. Multiply hours by regional labor rates
4. Include subcontractor costs if needed
5. Add 10–15% for unforeseen delays

**Example**: Building a kitchen cabinet (20 hours at R200/hour) = R4,000, plus 10% (R400) = R4,400

### 3. Tool and Equipment Costs

Tools and equipment may be owned or rented.

**Types**:
- **Owned Tools**: Table saw (R10,000–R30,000), CNC router (R50,000–R500,000), sander (R1,500–R5,000)
- **Rental Equipment**: Scaffolding (R500–R2,000 per week), laser cutter (R1,000–R3,000 per day), flooring nailer (R200–R500 per day)
- **Consumables**: Sandpaper (R50–R150 per pack), router bits (R200–R800 each), blades (R100–R300)

**Estimation Method**:
1. List required tools for project
2. Allocate costs for consumables or maintenance (blade sharpening R100–R200)
3. Include rental costs for specialized equipment
4. Amortize owned tool costs over multiple projects (R10,000 table saw ÷ 100 projects = R100/project)

**Example**: For roofing project, include R500 for blade replacements, R1,000 for scaffolding rental, R50 amortized saw cost = R1,550

### 4. Overhead Costs

Overheads cover indirect expenses to run a carpentry business.

**Types**:
- **Workspace**: Workshop rent (R5,000–R15,000/month in urban areas); utilities (R1,000–R3,000/month)
- **Transportation**: Fuel and vehicle maintenance (R500–R2,000 per project)
- **Insurance**: Liability or equipment insurance (R500–R2,000/month, prorated per project)
- **Administrative**: Software subscriptions (SketchUp R5,000/year), permits, licensing fees

**Estimation Method**:
1. Calculate monthly overheads
2. Prorate based on project duration (1/4 of monthly rent for 1-week project)
3. Add transportation costs based on distance (R10/km in Gauteng)
4. Include permit costs for construction (R1,000–R5,000)

**Example**: For 2-week cabinetry project, include R2,500 (workshop rent), R1,000 (fuel), R500 (insurance) = R4,000

### 5. Contingency and Profit

Contingencies and profit margins ensure financial flexibility and sustainability.

**Contingency**: Add 10–20% of total costs to cover unexpected expenses.

**Profit Margin**: Add 15–30% of total costs for profitability; higher for custom or high-risk projects.

**Estimation Method**:
1. Sum material, labor, tool, and overhead costs
2. Apply contingency percentage
3. Add profit margin to subtotal
4. Adjust based on market competition or project complexity

**Example**: For project with R20,000 (materials) + R10,000 (labor) + R2,000 (tools) + R4,000 (overheads) = R36,000, add 15% contingency (R5,400) = R41,400, then 20% profit (R8,280) = R49,680

## Project Budgeting Process

### 1. Scope Definition
Review project plans to identify tasks and requirements; confirm dimensions, materials, and finishes with client.

### 2. Cost Breakdown
- Create cut list for materials; source prices from local suppliers
- Estimate labor hours by task; apply regional rates
- List tool/equipment needs; include rental or consumable costs
- Calculate overheads based on project duration

### 3. Total Cost Calculation
- Sum material, labor, tool, and overhead costs
- Add 10–20% contingency and 15–30% profit margin

### 4. Client Quotation
- Present detailed quote in ZAR, itemizing major costs
- Include terms (e.g., 50% deposit, payment upon completion) and timeline

### 5. Monitoring and Adjustments
- Track expenses using budgeting software (Buildxact, Excel)
- Adjust for scope changes or price fluctuations
- Communicate with client

## Tools for Cost Estimation

**Measuring Tools**: Tape measure, laser measure (Bosch GLM 50 C, R2,000)

**Software**: CAD/CAM (SketchUp R5,000/year, Fusion 360 R7,000/year), Budgeting (Buildxact R2,000–R5,000/month, Excel)

**Calculators**: Online material calculators (Timbercity's board foot calculator)

**Supplier Quotes**: Obtain from local suppliers (Builders Warehouse, Cashbuild)

## Applications in Carpentry

**Furniture**: Estimating custom oak dining table (R15,000 oak + R5,000 labor + R500 tools + R1,000 overheads + 15% contingency + 20% profit = R29,555)

**Cabinetry**: Budgeting kitchen cabinets with MDF carcasses (R10,000 materials + R8,000 labor + R1,000 tools + R2,000 overheads + 15% contingency + 20% profit = R28,875)

**Construction**: Estimating house framing (R50,000 lumber + R20,000 labor + R3,000 tools + R5,000 overheads + 20% contingency + 20% profit = R109,200)

**Roofing**: Budgeting gable roof (R25,000 materials + R15,000 labor + R2,000 tools + R3,000 overheads + 20% contingency + 20% profit = R63,000)

## Best Practices

- Use detailed plans or CAD models for accurate cut lists
- Source prices from multiple South African suppliers
- Update quotes regularly to reflect market changes
- Break down costs by category for transparency
- Include waste factors (5–10%) and contingencies (10–20%)
- Present clear, itemized quotes in ZAR
- Track expenses in real-time using software
- Negotiate bulk discounts with suppliers

## Troubleshooting

**Cost Overruns**: Include 10–20% contingency; update supplier quotes.  
**Scope Creep**: Document changes; provide revised quotes.  
**Inaccurate Labor Estimates**: Consult industry standards; track hours.  
**Material Shortages**: Add 5–10% buffer; confirm supplier stock.  
**Client Disputes**: Provide detailed quotes; confirm scope in writing.

---

## Key Takeaways

✅ **Material Costs**: Oak R150–R300/m, Plywood R300–R600/sheet, add 5–10% waste  
✅ **Labor Rates**: R150–R350/hour (SA), higher for specialists  
✅ **Overheads**: Rent, utilities, transport, insurance, prorated  
✅ **Contingency**: 10–20% for unexpected expenses  
✅ **Profit Margin**: 15–30% for business sustainability  
✅ **Formula**: Materials + Labor + Tools + Overheads + Contingency + Profit  
  `
};

export default lesson;

