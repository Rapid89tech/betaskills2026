import type { Lesson } from '@/types/course';

export const lesson2EstimatingPricing: Lesson = {
  id: 2,
  title: 'Estimating and Pricing Projects in Rands',
  duration: '65 min',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/v4kYFIQAqy4',
    textContent: `
# Estimating and Pricing Projects in Rands

Project estimation and pricing are critical for ensuring profitability, resource allocation, and client satisfaction in South Africa, where the South African Rand (ZAR) is the currency. Accurate estimates help avoid underbidding (leading to losses) or overbidding (losing contracts). Below, I'll break this down into key components, with a focus on Rand-based calculations.

## 1. Key Principles of Project Estimation

### Scope Definition

* Start with a detailed project scope, including deliverables, timelines, and requirements. Use tools like Work Breakdown Structure (WBS) to decompose the project into tasks.

### Cost Categories

* **Direct Costs**: Labor, materials, equipment (e.g., developer salaries at R500–R1,200/hour, concrete at R1,500/m³).
* **Indirect Costs**: Overhead (office rent, utilities ~10–20% of direct costs), insurance, and contingencies (5–15% buffer for risks).
* **Fixed vs. Variable**: Fixed costs (e.g., software licenses) remain constant; variable (e.g., travel) scale with project size.

### Time Estimation Techniques

* **Top-Down**: Use historical data or expert judgment (e.g., parametric models like lines of code for software: R10,000–R50,000 per 1,000 LOC).
* **Bottom-Up**: Sum task estimates using PERT (Program Evaluation and Review Technique): Expected Time = (Optimistic + 4×Most Likely + Pessimistic)/6.
* **Three-Point Estimation**: Account for uncertainty, e.g., task cost range R10,000–R20,000 with most likely R15,000.

### Rand-Specific Factors

* **Inflation**: South Africa's CPI averages 4–6% annually; adjust estimates using SARB data (e.g., add 5% for 2025 projects).
* **Exchange Rates**: For imported materials (e.g., electronics), hedge against USD/ZAR volatility (currently ~R17–R18/USD).
* **VAT**: Add 15% VAT on taxable supplies, but exclude from cost estimates if client pays it separately.
* **Eskom Load Shedding**: Factor in 5–10% extra for generators/diesel (R20–R30/liter).

## 2. Pricing Strategies

* **Cost-Plus Pricing**: Total Cost + Markup (20–50% for profit). Example: R100,000 costs + 30% = R130,000.
* **Value-Based Pricing**: Charge based on client value (e.g., a marketing campaign yielding R1M ROI priced at R200,000 vs. cost-based R100,000).
* **Time and Materials (T&M)**: Bill hourly/daily in Rands (e.g., R800/hour for consultants) with caps.
* **Fixed-Price**: Quote a lump sum in ZAR, including risks; use for well-defined scopes.
* **Competitive Pricing**: Benchmark against market rates (e.g., construction: R5,000–R15,000/m² for residential builds; IT: R300,000–R2M for app development).
* **Profit Margins**: Aim for 15–30% net; construction often 10–20%, tech 25–40%. Calculate as (Revenue - Costs)/Revenue.

## 3. Step-by-Step Estimation Process in Rands

1. **Gather Data**: Review past projects (e.g., from ERP systems) and adjust for scope changes.

2. **Estimate Resources**:
   * Labor: Hours × Rate (e.g., 500 hours × R600/hour = R300,000).
   * Materials: Quantity × Unit Price (e.g., 10 tons steel × R15,000/ton = R150,000).

3. **Add Overheads and Risks**: Direct Costs × 1.15 (overhead) + 10% contingency.

4. **Convert to Total Estimate**: Sum all, apply pricing strategy.

5. **Sensitivity Analysis**: Model scenarios (e.g., +10% material costs due to rand depreciation).

6. **Document and Quote**: Use contracts specifying ZAR payments, escalation clauses (e.g., tied to CPI), and milestones.

## Example Calculation Table (Hypothetical Software Project)

| Component | Quantity/Rate | Subtotal (ZAR) |
|-----------|---------------|----------------|
| Labor (Dev Team) | 400 hours × R800/hr | 320,000 |
| Materials (Servers) | 2 units × R50,000 | 100,000 |
| Overhead (15%) | 420,000 × 0.15 | 63,000 |
| Contingency (10%) | 483,000 × 0.10 | 48,300 |
| Subtotal Costs | - | 531,300 |
| Markup (25%) | 531,300 × 0.25 | 132,825 |
| Total Price | - | 664,125 |
| +15% VAT | - | 764,744 |

## 4. Tools and Best Practices

* **Software**: Use MS Project, Primavera, or free tools like Trello for tracking; Excel for Rand calculations with formulas (e.g., =SUM(B2:B10)*1.15 for overhead).
* **Rand Conversion**: For international bids, use real-time rates from SARB or apps like XE.com.
* **Risk Mitigation**: Include clauses for rand fluctuations (e.g., USD peg) and regular reviews.
* **Legal/Compliance**: Adhere to B-BBEE for tenders; quote excluding VAT unless specified.
* **Common Pitfalls**: Underestimating scope creep (add 20% buffer); ignoring black swan events like policy changes (e.g., NERSA tariffs).

## 5. Advanced Tips for Rand-Based Projects

* **Benchmarking**: Reference Stats SA data for sector averages (e.g., construction inflation at 6.5% in 2024).
* **Scenario Planning**: Use Monte Carlo simulations in tools like @Risk for probabilistic estimates.
* **Client Negotiation**: Present tiered pricing (e.g., Basic: R500k, Premium: R800k) to upsell.
* **Sustainability**: Factor green costs (e.g., solar backups at R100,000/kW) for ESG compliance.
    `
  }
};

