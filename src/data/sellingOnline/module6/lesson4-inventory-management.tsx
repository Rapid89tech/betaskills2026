import type { Lesson } from '@/types/course';

export const lesson4InventoryManagement: Lesson = {
  id: 4,
  title: 'Inventory Management',
  duration: '45 min',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/0NOER-Lle-0',
    textContent: `
# Inventory Management

Effective inventory management balances having enough stock to meet demand without tying up excessive capital in unsold goods. Poor inventory control leads to stockouts that lose sales, or overstocking that drains cash flow and increases storage costs.

Smart inventory practices optimize your working capital, reduce waste, and ensure you can fulfill orders reliably.

## Understanding Inventory Basics

Inventory represents the products you have available to sell, whether physical goods in storage or digital products ready for delivery. For physical products, inventory management involves tracking quantities, locations, and values in rands throughout the supply chain.

Key metrics include stock levels, turnover rates, and reorder points. Understanding these fundamentals helps you make informed decisions about purchasing, pricing, and sales strategies.

### Key Inventory Terms

Stock on Hand: Current quantity available for sale

Reorder Point: Stock level that triggers new purchase order

Lead Time: Time between ordering and receiving new stock

Stock Turnover: How quickly inventory sells and is replaced

Dead Stock: Items that haven't sold in extended period

Safety Stock: Extra inventory buffer for unexpected demand or delays

Cost of Goods Sold (COGS): Direct costs of producing or purchasing inventory

### Inventory Metrics to Track
- Current stock levels by SKU
- Days of inventory remaining
- Stock turnover rate
- Stockout frequency
- Carrying costs in rands
- Shrinkage (loss, damage, theft)

## Tracking Stock Levels

Implement systems to monitor inventory in real-time, whether through spreadsheets for small operations or dedicated inventory management software as you scale.

Accurate tracking prevents overselling, identifies slow-moving items, and informs purchasing decisions. Regular stock counts verify system accuracy and catch discrepancies early before they become costly problems.

### Tracking Methods

Manual Spreadsheets: Simple for small inventory, requires discipline

Inventory Management Software: Automated tracking, integrates with sales channels

Point-of-Sale Systems: Real-time updates as sales occur

Barcode Scanning: Reduces errors, speeds up counting

Cloud-Based Systems: Access from anywhere, automatic backups

### What to Track
- Product name and SKU
- Quantity on hand
- Location (if multiple storage areas)
- Purchase cost in rands
- Selling price
- Supplier information
- Reorder point
- Last stock count date

## Setting Reorder Points

Determine the stock level at which you need to reorder each product, considering lead time from suppliers and average sales velocity.

Reorder points prevent stockouts by triggering purchases before you run out. Calculate by multiplying average daily sales by lead time in days, then add safety stock for buffer. Adjust based on seasonality, promotions, or changing demand patterns.

### Reorder Point Formula

Basic Formula: (Average Daily Sales x Lead Time) + Safety Stock

Example:
- Average daily sales: 5 units
- Supplier lead time: 10 days
- Safety stock: 10 units
- Reorder point: (5 x 10) + 10 = 60 units

### Factors Affecting Reorder Points
- Sales velocity (how fast items sell)
- Supplier reliability and lead time
- Seasonality and trends
- Storage capacity
- Cash flow availability
- Minimum order quantities
- Shipping time variability

## Managing Stock Turnover

Stock turnover measures how many times inventory is sold and replaced in a period. Higher turnover generally indicates efficient inventory management and strong sales, while low turnover suggests overstocking or weak demand.

Calculate turnover by dividing cost of goods sold by average inventory value. Aim for turnover rates appropriate to your industry—fast-moving consumer goods turn over quickly, while specialty items may turn slower but with higher margins.

### Stock Turnover Calculation

Formula: Cost of Goods Sold / Average Inventory Value

Example:
- Annual COGS: R120,000
- Average inventory value: R20,000
- Turnover rate: 120,000 / 20,000 = 6 times per year

### Improving Stock Turnover
- Identify and discount slow-moving items
- Adjust purchasing to match demand
- Improve product selection based on sales data
- Run promotions on excess stock
- Negotiate better supplier terms
- Optimize pricing strategies
- Reduce lead times

## Dealing with Slow-Moving and Dead Stock

Identify products that haven't sold within reasonable timeframes and take action to clear them. Slow-moving inventory ties up capital and storage space that could be used for better-selling items.

Strategies include discounting, bundling with popular products, donating for tax benefits, or returning to suppliers if possible. Learn from dead stock to improve future purchasing decisions and avoid repeating mistakes.

### Identifying Slow Movers

Age Analysis: Track how long items have been in stock

Sales Velocity: Compare sales rates across products

Turnover Comparison: Identify items below target turnover

Seasonal Review: Assess post-season remaining stock

### Clearing Strategies
- Flash sales or clearance discounts
- Bundle with popular items
- Offer as free gifts with purchase
- Donate to charity (tax deduction)
- Return to supplier (if agreement allows)
- Sell to liquidators
- Use in marketing giveaways

## Forecasting Demand

Use historical sales data, market trends, and seasonal patterns to predict future demand and plan inventory purchases accordingly.

Accurate forecasting reduces both stockouts and overstock situations. Consider factors like promotions, holidays, weather, and economic conditions. Start simple with basic trend analysis and refine your approach as you gather more data.

### Forecasting Methods

Historical Analysis: Review past sales patterns

Trend Analysis: Identify growth or decline trends

Seasonal Adjustment: Account for predictable seasonal variations

Market Research: Monitor industry trends and competitor activity

Customer Feedback: Listen to requests and preferences

### Forecasting Considerations
- Past sales data (at least 12 months ideal)
- Seasonal patterns (holidays, weather, events)
- Marketing campaigns and promotions
- New product launches
- Economic conditions
- Competitor actions
- Supply chain disruptions

## Optimizing Storage and Organization

Organize inventory logically to speed up picking, packing, and stock counts. Popular items should be easily accessible, while slow movers can be stored further away.

Use clear labeling, logical grouping, and proper shelving to maximize space and minimize errors. Good organization reduces fulfillment time, prevents damage, and makes stock management more efficient.

### Storage Best Practices

ABC Analysis: Prioritize storage by sales volume (A=high, B=medium, C=low)

FIFO Method: First In, First Out for perishables or dated items

Clear Labeling: Easy-to-read labels with SKU and description

Logical Grouping: Group similar or complementary items

Proper Shelving: Sturdy, appropriate for product size and weight

Climate Control: Protect temperature or humidity-sensitive items

Security: Prevent theft or unauthorized access

### Organization Tips
- Keep fast-movers near packing area
- Use bins or containers for small items
- Label shelves and locations clearly
- Maintain clear aisles for access
- Regular cleaning and maintenance
- Document storage locations in system
- Conduct regular audits

## Inventory Software and Tools

As your business grows, invest in inventory management software that automates tracking, integrates with sales channels, and provides reporting insights.

Tools range from simple apps for small businesses to comprehensive systems for larger operations. Look for features like multi-channel sync, low-stock alerts, reporting, and integration with your ecommerce platform and accounting software.

### Software Features to Consider

Real-Time Tracking: Automatic updates as sales occur

Multi-Channel Sync: Manage inventory across multiple platforms

Low-Stock Alerts: Notifications when reorder points reached

Reporting: Sales analysis, turnover rates, forecasting

Barcode Scanning: Mobile app for stock counts

Supplier Management: Track orders, lead times, costs

Integration: Connect with ecommerce, accounting, shipping tools

### Popular Inventory Tools
- Cin7: Comprehensive inventory and order management
- Unleashed: Cloud-based with strong reporting
- Zoho Inventory: Affordable for small businesses
- TradeGecko (QuickBooks Commerce): Integrates with QuickBooks
- Odoo: Open-source ERP with inventory module
- Excel/Google Sheets: Simple tracking for beginners

## Managing Supplier Relationships

Build strong relationships with reliable suppliers who provide quality products, fair pricing, and consistent delivery. Good supplier partnerships ensure steady inventory flow and may provide better terms as your volume grows.

Communicate regularly, pay on time, and treat suppliers as partners rather than just vendors. Diversify suppliers for critical items to reduce risk of disruptions.

### Supplier Management Tips

Evaluate Performance: Track delivery times, quality, communication

Negotiate Terms: Seek better pricing, payment terms, or minimums as you grow

Maintain Communication: Regular contact, forecast your needs

Diversify Sources: Multiple suppliers for key products reduces risk

Build Relationships: Personal connections lead to better service

Document Everything: Contracts, terms, order history

### Supplier Evaluation Criteria
- Product quality consistency
- Pricing competitiveness in rands
- Delivery reliability and lead times
- Minimum order quantities
- Payment terms
- Communication responsiveness
- Return or exchange policies
- Capacity to scale with your growth

Effective inventory management strikes the right balance between having enough stock to meet demand and minimizing capital tied up in unsold goods. By implementing these practices, you reduce costs, prevent lost sales, improve cash flow in rands, and create a more predictable, scalable operation that supports steady growth.
    `
  }
};
