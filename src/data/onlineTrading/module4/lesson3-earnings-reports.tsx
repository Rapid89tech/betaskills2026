import React from 'react';

const Lesson3EarningsReports: React.FC = () => {
  return (
    <div className="lesson-content max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Earnings Reports (Stocks)</h1>
      
      <div className="space-y-6">
        <section>
          <p className="mb-4">
            Earnings reports are the official financial updates that publicly listed companies release on a regular schedule to disclose their performance over a specific period, typically a quarter or a full year. For stocks traded on the Johannesburg Stock Exchange (JSE), these reports are among the most closely watched events because they reveal how well a company is actually performing, often causing sharp movements in share prices denominated in rands as investors react to the results and reassess the stock's value.
          </p>
          
          <p className="mb-4">
            Here are the key components and aspects of earnings reports that matter most for stock investors and traders, explained in detail:
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Revenue (Top-Line Figures)</h2>
          <p className="mb-4">
            This is the total income a company generates from its core business activities before any expenses are deducted. Strong revenue growth signals expanding sales, successful products or services, and effective market demand, which often drives positive sentiment and upward pressure on the stock price in rands. Weak or declining revenue, however, raises concerns about slowing business or competitive challenges, frequently leading to sell-offs on the JSE as investors question future profitability.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Earnings Per Share (EPS)</h2>
          <p className="mb-4">
            EPS is calculated by dividing the company's net profit by the number of outstanding shares and is one of the most scrutinized metrics. It shows how much profit is attributable to each share, making it easy to compare performance across companies and periods. When actual EPS exceeds analysts' expectations (an "earnings beat"), it typically triggers buying interest and lifts the share price in rands, while a "miss" can cause significant drops as it suggests the company is less profitable than anticipated.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Profit Margins</h2>
          <p className="mb-4">
            These include gross, operating, and net margins, which measure how efficiently a company turns revenue into profit after accounting for costs like production, overheads, and taxes. Improving margins indicate better cost control, pricing power, or operational efficiency, boosting investor confidence and supporting higher valuations on the JSE. Shrinking margins, often due to rising input costs or competitive pressures, can signal trouble ahead and lead to downward revisions in stock pricing in rands.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Balance Sheet Highlights</h2>
          <p className="mb-4">
            Earnings reports often include updates on key balance sheet items such as cash reserves, debt levels, and working capital. A strong cash position provides flexibility for growth or dividends, while low or manageable debt reduces risk—both positive for rand-denominated stock stability. High debt or dwindling cash can alarm investors, especially in a higher interest-rate environment, prompting sales and price declines on the JSE.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Forward Guidance and Outlook</h2>
          <p className="mb-4">
            Companies frequently provide their own projections for future revenue, earnings, or strategic initiatives. Upbeat guidance that signals confidence in continued growth can spark rallies in the stock price in rands, as it shapes positive expectations. Cautious or downgraded guidance, even if current results are solid, often leads to immediate negative reactions as traders adjust for potentially slower future performance.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Management Commentary and Conference Calls</h2>
          <p className="mb-4">
            Alongside the numbers, executives offer explanations during results presentations or live conference calls, discussing challenges, achievements, and strategy. Clear, confident commentary reassures the market and can amplify positive price moves in rands, while evasive answers or admissions of difficulties often fuel scepticism and selling pressure on the JSE.
          </p>
        </section>

        <section>
          <p className="mb-4">
            Earnings reports create periods of heightened volatility known as "earnings season," when multiple JSE-listed companies release results in quick succession. Savvy South African traders prepare by studying consensus forecasts, historical performance, and sector trends to anticipate reactions, positioning themselves to capitalise on beats or protect against misses in rand-traded stocks. Understanding these reports is essential for making informed investment decisions and managing risk in equity markets.
          </p>
        </section>

        <section className="mt-8">
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://www.youtube.com/embed/4VHBLuCtXhU"
              title="Earnings Reports"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-96 rounded-lg shadow-lg"
            ></iframe>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Lesson3EarningsReports;
