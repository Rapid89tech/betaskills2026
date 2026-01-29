import type { Lesson } from '@/types/course';

export const lesson4CostEstimationAndBudgeting: Lesson = {
  id: 4,
  title: 'Cost Estimation and Budgeting',
  duration: '60 min',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/Q1gxQj109r4',
    textContent: `
# Cost Estimation and Budgeting 🧾

## Introduction


Cost estimation and budgeting are critical for planning and managing roofing projects, ensuring financial control, profitability, and client satisfaction. Accurate estimates prevent cost overruns, while budgets guide resource allocation throughout the project.

Mastering these skills equips learners to create reliable financial plans, supported by course simulations and tutorials.

---

## Cost Estimation Overview

* **Definition**: Forecasting the total cost of a project based on materials, labor, equipment, and other expenses, derived from blueprints and specifications.  
* **Purpose**:  
  * Assess project feasibility and profitability.  
  * Support competitive bidding and contract negotiations.  
  * Prevent cost overruns and ensure resource availability.  
  * Provide clients with transparent cost projections.  
* **Types of Estimates**:  
  * **Preliminary (ROM)**: Early-stage estimate with ±25–40% accuracy, used for initial planning.  
  * **Square Foot Estimate**: Based on cost per unit area (e.g., $100/sq ft), ±15–25% accuracy.  
  * **Assemblies Estimate**: Groups components (e.g., roof system), ±10–20% accuracy.  
  * **Detailed Estimate**: Line-by-line breakdown from MTO, ±5–10% accuracy, used for final bids.  
  * **Bid Estimate**: Highly accurate estimate submitted to clients, incorporating all costs.

---

## Budgeting Overview

* **Definition**: A financial plan allocating costs to project phases and components, used to manage cash flow and monitor expenses.  
* **Purpose**:  
  * Set financial boundaries to prevent overspending.  
  * Track actual costs against estimates to identify variances.  
  * Ensure timely payments for materials, labor, and subcontractors.  
  * Maintain project profitability and client trust.

---

## Components and Steps

* **Cost Components**:  
  * **Direct Costs**: Materials (e.g., shingles, flashing), labor (e.g., roofing crew), equipment (e.g., lifts, tools).  
  * **Indirect Costs**: Permits, insurance, site supervision, temporary facilities (e.g., porta-potties).  
  * **Overhead**: Office expenses, administrative staff, utilities, marketing.  
  * **Profit Margin**: Contractor's expected return, typically 10–20% of total costs.  
  * **Contingency**: Buffer for unexpected costs (e.g., weather delays, price increases), typically 5–15%.  
* **Steps for Estimation**:  
  * Review project scope, blueprints, and specifications to understand requirements.  
  * Perform MTO to quantify materials, labor hours, and equipment needs.  
  * Determine unit prices using supplier quotes, RSMeans data, or historical records.  
  * Calculate direct costs (materials + labor + equipment).  
  * Add indirect costs, overhead, profit, and contingency.  
  * Summarize and review for accuracy, adjusting for market or site conditions.

---

## Budgeting Techniques and Tools

* **Techniques**:  
  * **Top-Down**: Estimate total cost first, then allocate to categories, useful for preliminary budgets.  
  * **Bottom-Up**: Sum individual item costs from MTO, ideal for detailed budgets.  
  * **Historical Data**: Use past project costs as benchmarks, adjusting for inflation or site differences.  
  * **Parametric**: Apply statistical models (e.g., $120/sq ft for residential roofing) for quick estimates.  
* **Tools**:  
  * **Microsoft Excel**: Custom spreadsheets for manual calculations and cost tracking.  
  * **PlanSwift/Bluebeam**: Digital take-off and estimation software for accuracy.  
  * **Buildertrend**: Project management with integrated cost tracking.  
  * **RSMeans Data**: Industry-standard pricing for materials and labor.  
  * **ProEst/Sage**: Advanced estimating tools for complex projects.

---

## Example and Best Practices

* **Example Budget**:  
  * **Project**: 1,500 sq ft gable roof, 6:12 pitch.  
  * **Items**:  
    * Shingles: 16 squares × $250/square = $4,000.  
    * Underlayment: 1,600 sq ft × $0.30/sq ft = $480.  
    * Nails: 5 boxes × $25 = $125.  
    * Labor: 40 hrs × $35/hr = $1,400.  
    * Dumpster: 1 × $300 = $300.  
    * Contingency (10%): $620.  
    * **Total**: $6,925.  
* **Best Practices**:  
  * ✅ Create accurate initial estimates using detailed MTO and current pricing.  
  * ✅ Define clear contract scope to avoid disputes or scope creep.  
  * ✅ Track costs regularly with software or logs to monitor variances.  
  * ✅ Use change orders for scope changes, updating budgets accordingly.  
  * ✅ Plan contingencies for weather, price fluctuations, or delays.  
  * ❌ Don't underestimate labor or material costs, as small errors accumulate.  
  * ❌ Don't ignore indirect costs like permits or supervision.  
  * ❌ Don't fail to update budgets as the project progresses.

Cost estimation and budgeting ensure financial success. Course simulations help learners practice creating accurate estimates and budgets for roofing projects.
    `
  }
};
