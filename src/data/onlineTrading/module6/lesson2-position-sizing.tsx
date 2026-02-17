import React from 'react';

const Lesson2PositionSizing: React.FC = () => {
  return (
    <div className="lesson-content max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Position Sizing</h1>
      
      <div className="space-y-6">
        <section>
          <p className="mb-4">
            Position sizing is the process of determining how much capital to allocate to a single trade or investment, based on account size, risk tolerance, and trade-specific factors like stop-loss distance. For South African traders active on the Johannesburg Stock Exchange (JSE) or in rand forex pairs, effective position sizing is a cornerstone of risk management that prevents any one losing trade from causing significant damage to overall capital, allowing consistent participation amid rand volatility driven by local events, commodity swings, or global sentiment shifts.
          </p>
          
          <p className="mb-4">
            Here are the key aspects of position sizing, explained in detail:
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Risk-Based Approach</h2>
          <p className="mb-4">
            The most widely used method ties position size directly to the amount of capital a trader is willing to risk on each trade, typically a small fixed percentage of the total account. This ensures that even a string of losses leaves enough capital to continue trading and recover. In rand-denominated accounts, traders set this risk limit conservatively to weather sudden rand weakening or JSE drawdowns, preserving longevity by treating each trade as part of a long-term series rather than an all-or-nothing bet.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Incorporating Stop-Loss Distance</h2>
          <p className="mb-4">
            Position size is calculated by dividing the predetermined risk amount by the distance between entry price and stop-loss level (in price terms), determining the number of shares or units to trade. A wider stop-loss requires a smaller position to keep risk constant, while tighter stops allow larger sizing. South African traders apply this rigorously on JSE equities or rand pairs, using technical levels like support or recent lows for stops—ensuring the setup's potential reward justifies the exposure without overleveraging during volatile periods.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Account Size Consideration</h2>
          <p className="mb-4">
            Larger accounts naturally permit bigger absolute positions while maintaining the same percentage risk, but the percentage rule scales proportionally to avoid emotional sizing decisions. Traders in South Africa start with modest accounts often funded in rands and grow them steadily by adhering to this discipline, preventing early blow-ups that could derail participation in local markets like JSE resource shares or currency trades.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Volatility Adjustment</h2>
          <p className="mb-4">
            Assets with higher volatility—such as rand forex pairs during SARB announcements or commodity-linked JSE stocks—require smaller positions to account for larger price swings that could hit stops prematurely. Tools like Average True Range (ATR) help quantify volatility and shrink sizing accordingly. This adjustment is crucial for South African traders navigating emerging market fluctuations, maintaining consistent risk across diverse instruments from stable bonds to erratic rand movements.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Diversification and Correlation Effects</h2>
          <p className="mb-4">
            Position sizing extends beyond single trades by considering overall portfolio exposure—reducing size in correlated positions (e.g., multiple mining shares on the JSE) to avoid compounded losses if a sector event impacts them simultaneously. Traders balance rand-based holdings across sectors like finance, resources, and retail, capping total risk in any theme to enhance resilience against localised shocks.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Psychological and Practical Benefits</h2>
          <p className="mb-4">
            Proper sizing reduces emotional stress by removing the temptation to overcommit on "sure things," fostering mechanical execution and better decision-making over time. In the South African context, where market access via online platforms has grown, disciplined sizing supports sustainable trading careers, turning potential pitfalls like rand depreciation events into manageable drawdowns rather than account-ending disasters.
          </p>
        </section>

        <section>
          <p className="mb-4">
            Mastering position sizing transforms trading from gambling into a professional risk-managed process, empowering South African participants to protect and grow rand-based capital steadily across JSE instruments, forex, and beyond—prioritising survival and consistency in unpredictable market conditions.
          </p>
        </section>

        <section className="mt-8">
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://www.youtube.com/embed/9UucETfb_lk"
              title="Position Sizing"
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

export default Lesson2PositionSizing;
