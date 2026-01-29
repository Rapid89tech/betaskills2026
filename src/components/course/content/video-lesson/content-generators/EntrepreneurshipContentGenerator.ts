export const generateEntrepreneurshipContent = (title: string): string => {
  if (title.toLowerCase().includes('business') || title.toLowerCase().includes('entrepreneur')) {
    return `
# ${title}

## Learning Objectives:
- Develop entrepreneurial mindset and skills
- Learn business planning and strategy development
- Understand market analysis and customer needs
- Master financial planning and management

## Key Areas:
### Business Fundamentals
Learn the core principles of starting and running a successful business venture.

### Market Research
Understand how to identify opportunities and analyze market conditions.

### Financial Planning
Develop skills in budgeting, cash flow management, and financial forecasting.

### Growth Strategies
Learn how to scale your business and expand into new markets.

🚀 **Entrepreneurial Tip**: Success comes from solving real problems for real people.

💡 **Key Insight**: Every successful business starts with a clear understanding of customer needs.
    `;
  }

  return '';
};