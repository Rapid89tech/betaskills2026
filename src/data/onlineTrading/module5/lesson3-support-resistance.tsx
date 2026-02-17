import React from 'react';

const Lesson3SupportResistance: React.FC = () => {
  return (
    <div className="lesson-content max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Support & Resistance</h1>
      
      <div className="space-y-6">
        <section>
          <p className="mb-4">
            Support and resistance are foundational concepts in technical analysis that identify key price levels where an asset's movement tends to pause, reverse, or accelerate due to the concentration of buying or selling interest. For South African traders analysing charts on the Johannesburg Stock Exchange (JSE) or forex pairs involving the rand, these levels act as invisible barriers shaped by market psychology, historical price action, and order clustering, helping predict potential turning points, set entry/exit targets, and manage risk in rand-denominated stocks, indices, or currency trades.
          </p>
          
          <p className="mb-4">
            Here are the key aspects of support and resistance, explained in detail:
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Support Levels</h2>
          <p className="mb-4">
            These are price zones below the current market level where buying interest is strong enough to prevent further declines, often causing prices to bounce upward as buyers perceive the asset as undervalued or "cheap." Support forms when previous lows align repeatedly, creating a floor that traders defend. In JSE mining shares during commodity downturns or the rand during periods of weakness, support levels frequently hold as institutional buyers step in, absorbing supply and stabilising prices—traders use these to place buy orders or protective stops just below, anticipating rebounds in rand-traded assets.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Resistance Levels</h2>
          <p className="mb-4">
            The opposite of support, resistance appears above the current price where selling pressure emerges to cap upward moves, as sellers view the asset as overvalued and take profits or initiate shorts. Multiple failed attempts to break higher reinforce resistance as a ceiling. On rand forex charts during strengthening phases or JSE blue-chips approaching all-time highs, resistance often triggers pullbacks; South African traders monitor these for sell signals, placing limit orders near the level to capture reversals or prepare for potential breakouts.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Horizontal Support and Resistance</h2>
          <p className="mb-4">
            These are straightforward flat lines drawn across previous swing highs (for resistance) or lows (for support) on a chart, representing static psychological barriers where prices have historically reversed. Their strength increases with the number of touches—three or more make them more reliable. In stable rand trading ranges or JSE sectors consolidating after earnings, horizontal levels guide range-bound strategies, with traders buying at support and selling at resistance until a decisive break shifts the structure.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Trendline Support and Resistance</h2>
          <p className="mb-4">
            Drawn by connecting rising lows in uptrends (support) or declining highs in downtrends (resistance), these dynamic lines slope with the trend and adjust as new data emerges. A break through a trendline signals weakening momentum. South African traders apply this to trending rand pairs influenced by SARB policy or JSE resource stocks riding commodity cycles, using bounces off trendline support for trend-continuation trades while watching for violations that might indicate reversals.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Psychological (Round Number) Levels</h2>
          <p className="mb-4">
            Prices often stall at round figures like whole numbers or significant milestones due to human tendency to place orders at these memorable points, amplifying order flow. In rand forex, levels like certain thresholds attract heavy activity from exporters or importers hedging, while JSE indices pausing at round milestones reflect broad market participation—traders treat these as enhanced support/resistance, combining them with other confirmations for higher-probability setups.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Role Reversal</h2>
          <p className="mb-4">
            Once broken, former support often transforms into new resistance (and vice versa), as traders who missed earlier opportunities reverse positions at the retest. This flip provides excellent risk-reward trades. For example, after a JSE stock breaks above long-held resistance, that level may support pullbacks, encouraging buys; similarly, a breached support in a weakening rand can resist rallies, prompting shorts on retests.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Breakouts and Breakdowns</h2>
          <p className="mb-4">
            When price decisively closes beyond support or resistance with increased volume, it signals potential strong moves—breakouts above resistance suggest bullish continuation, while breakdowns below support indicate bearish acceleration. False breaks (failed moves back into the range) trap traders and reverse sharply. South African users watch volume and candlestick confirmation during JSE openings or rand news events to validate breaks, avoiding premature entries in volatile conditions.
          </p>
        </section>

        <section>
          <p className="mb-4">
            Support and resistance levels empower South African traders to map out high-probability zones on charts, combine them with tools like moving averages or volume for confirmation, and structure trades with clear invalidation points—fostering disciplined approaches to navigating JSE equities, rand currency pairs, and broader market dynamics.
          </p>
        </section>

        <section className="mt-8">
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://www.youtube.com/embed/WtunB3RhqBk"
              title="Support & Resistance"
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

export default Lesson3SupportResistance;
