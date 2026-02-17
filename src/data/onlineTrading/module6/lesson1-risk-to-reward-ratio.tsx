import React from 'react';

const Lesson1RiskToRewardRatio: React.FC = () => {
  return (
    <div className="lesson-content max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Risk-to-Reward Ratio</h1>
      
      <div className="space-y-6">
        <section>
          <p className="mb-4">
            Risk-to-reward ratio is a fundamental risk management concept in trading that measures the potential profit of a trade against the potential loss, helping traders evaluate whether a setup is worth pursuing based on expected outcomes. For South African traders operating on the Johannesburg Stock Exchange (JSE) or in rand forex pairs, maintaining a favourable risk-to-reward ratio ensures long-term sustainability by prioritising setups where potential gains meaningfully outweigh risks, even if not every trade wins—protecting capital amid local volatility from factors like SARB policy shifts or commodity fluctuations.
          </p>
          
          <p className="mb-4">
            Here are the key aspects of risk-to-reward ratio, explained in detail:
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Definition and Purpose</h2>
          <p className="mb-4">
            The ratio compares the amount a trader is willing to lose if a trade goes wrong (risk) to the anticipated profit if it succeeds (reward), expressed as risk:reward (e.g., 1:2 means risking one unit to potentially gain two). Its primary purpose is to enforce discipline by filtering out low-quality trades, promoting consistency over chasing high win rates. In South African markets, where rand movements can amplify losses during emerging market sell-offs, a strong ratio acts as a safety net, allowing traders to remain profitable overall despite inevitable losing trades on JSE equities or currency pairs.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Calculation Method</h2>
          <p className="mb-4">
            To determine the ratio, identify the entry price, stop-loss level (risk distance below/above entry for longs/shorts), and take-profit target (reward distance). Subtract entry from stop-loss for risk per share/unit, and take-profit from entry for reward, then divide reward by risk. South African traders apply this on platforms showing rand pricing—ensuring the setup meets a minimum threshold like 1:2 before executing, adjusting position sizes so the rand risk aligns with account tolerance while targeting realistic levels based on support/resistance or patterns.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Ratios and Benchmarks</h2>
          <p className="mb-4">
            Traders often aim for ratios of 1:2 or better (risking one part for at least two in reward), with 1:3 considered excellent for higher-conviction setups allowing fewer winners to yield profits. Lower ratios like 1:1 demand very high win rates to break even, which is challenging in volatile rand environments. In JSE trading, a 1:2 ratio on a resource stock breakout might involve tight stops below recent support, targeting prior highs—balancing conservatism with ambition to compound gains over time.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Integration with Win Rate and Expectancy</h2>
          <p className="mb-4">
            A favourable ratio complements win rate to produce positive expectancy (average profit per trade). Even with a 40% win rate, a 1:3 ratio can generate strong returns, as winners outweigh losers significantly. South African traders use this to withstand drawdowns from rand depreciation events or JSE corrections, focusing on process over individual outcomes—calculating expectancy to refine strategies for local market conditions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Practical Application in Trade Planning</h2>
          <p className="mb-4">
            Before entering any position, predefined stop-loss and take-profit levels establish the ratio upfront, preventing emotional adjustments mid-trade. In rand forex during SARB announcements or JSE earnings plays, traders scan for setups aligning with trends or patterns offering asymmetric reward—scaling position sizes inversely to risk distance to maintain consistent rand exposure across varying ratios.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Advantages and Limitations</h2>
          <p className="mb-4">
            Strong ratios enhance capital preservation, reduce psychological stress, and support compounding, turning trading into a probabilistic business. However, overly ambitious rewards may lower hit rates if targets are unrealistic, or tight stops get hit by normal rand noise—requiring balance through backtesting on historical JSE charts or demo accounts to calibrate for personal style and market realities.
          </p>
        </section>

        <section>
          <p className="mb-4">
            Mastering risk-to-reward ratio equips South African traders with a professional edge, fostering disciplined execution across JSE instruments, rand pairs, and beyond—prioritising high-quality opportunities that stack odds in favour of long-term success despite market uncertainties.
          </p>
        </section>

        <section className="mt-8">
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://www.youtube.com/embed/aKZsireNBIM"
              title="Risk-to-Reward Ratio"
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

export default Lesson1RiskToRewardRatio;
