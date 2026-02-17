import React from 'react';

const Lesson1CandlestickCharts: React.FC = () => {
  return (
    <div className="lesson-content max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Candlestick Charts</h1>
      
      <div className="space-y-6">
        <section>
          <p className="mb-4">
            Candlestick charts are a popular and visually intuitive way to display price movements of financial instruments such as stocks, forex pairs, commodities, and indices over a chosen time frame, from minutes to months. Widely used by South African traders on platforms connected to the Johannesburg Stock Exchange (JSE) or forex markets involving the rand, these charts originated in Japan centuries ago for rice trading and provide deeper insights into market sentiment, buyer-seller dynamics, and potential reversals compared to simple line or bar charts. Each "candlestick" represents the open, high, low, and close prices for a period, helping users spot trends, momentum shifts, and trading opportunities in rand-denominated assets or rand currency pairs.
          </p>
          
          <p className="mb-4">
            Here are the key components and elements of candlestick charts, explained in detail:
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">The Candle Body</h2>
          <p className="mb-4">
            This is the thick rectangular part of the candlestick that shows the range between the opening and closing prices for the time period. A longer body indicates strong directional pressure—buyers or sellers dominated decisively—while a shorter body suggests indecision or balance between the two sides. On JSE stock charts or rand forex pairs, traders watch body length to gauge conviction; for example, a series of long bodies in one direction signals a robust trend that might encourage holding positions in rand-traded shares.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Upper and Lower Shadows (Wicks)</h2>
          <p className="mb-4">
            These are the thin lines extending above and below the body, representing the highest and lowest prices reached during the period. Long shadows reveal that prices ventured far from the open/close but were pushed back, often signalling rejection of those extremes and potential exhaustion among buyers or sellers. In volatile rand markets influenced by commodity swings or SARB announcements, extended shadows can highlight intraday battles, helping South African traders identify support/resistance levels for entries or exits.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Bullish (Green or White) Candles</h2>
          <p className="mb-4">
            These form when the closing price is higher than the opening price, typically displayed in green or white, reflecting buying dominance and upward momentum. A bullish candle with a long body and short shadows suggests sustained buyer control, often encouraging continuation trades in rising JSE sectors like mining or financials. Traders in South Africa use clusters of bullish candles to confirm uptrends in rand-denominated instruments, building confidence for long positions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Bearish (Red or Black) Candles</h2>
          <p className="mb-4">
            Formed when the close is lower than the open, usually shown in red or black, these indicate seller control and downward pressure. Strong bearish candles with lengthy bodies warn of accelerating declines, prompting caution or short opportunities in overextended rand pairs or JSE equities during risk-off periods driven by global or local events.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Doji Candles</h2>
          <p className="mb-4">
            These occur when open and close prices are virtually identical, creating a very thin or cross-like body with varying shadows, symbolising market indecision after a trend. A doji following a strong move on a JSE chart might foreshadow reversal, especially if it appears at support/resistance zones in rand assets, alerting traders to prepare for potential shifts and tighten risk management.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Hammer and Inverted Hammer</h2>
          <p className="mb-4">
            The hammer has a small upper body with a long lower shadow (at least twice the body length) and little upper shadow, appearing after downtrends to suggest buyers rejected lower prices and a possible bullish reversal. An inverted hammer flips this pattern upside down. South African traders scanning JSE resource stocks often look for confirmed hammers (followed by bullish candles) as buy signals in rand-denominated shares recovering from sell-offs.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Engulfing Patterns</h2>
          <p className="mb-4">
            A bullish engulfing forms when a small bearish candle is followed by a larger bullish one that completely "engulfs" the prior body's range, indicating buyers overwhelmed sellers for a potential upside reversal. The bearish engulfing is the opposite. These powerful two-candle patterns frequently mark turning points in rand forex volatility or JSE index trends, providing high-probability setups when aligned with other indicators.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Morning Star and Evening Star</h2>
          <p className="mb-4">
            These three-candle reversal patterns signal major shifts—the morning star (bearish candle, small-bodied indecision, then strong bullish) appears at bottoms for bullish reversals, while the evening star reverses at tops. In South African markets, spotting a confirmed morning star during rand weakness might encourage buying dips in JSE blue-chips, capitalising on emerging strength.
          </p>
        </section>

        <section>
          <p className="mb-4">
            Candlestick charts excel at revealing psychological shifts through visual patterns, empowering South African traders to combine them with volume, support/resistance, or indicators for more reliable decisions across JSE equities, rand currency pairs, and beyond—ultimately enhancing timing, risk control, and profitability in dynamic market conditions.
          </p>
        </section>

        <section className="mt-8">
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://www.youtube.com/embed/AOz1YPOKvEs"
              title="Candlestick Charts"
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

export default Lesson1CandlestickCharts;
