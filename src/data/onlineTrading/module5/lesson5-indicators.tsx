import React from 'react';

const Lesson5Indicators: React.FC = () => {
  return (
    <div className="lesson-content max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Indicators</h1>
      
      <div className="space-y-6">
        <section>
          <p className="mb-4">
            Technical indicators are mathematical tools derived from price and volume data, overlaid on charts to help traders analyse momentum, identify trends, detect overbought or oversold conditions, and generate potential buy or sell signals. South African traders commonly apply these indicators when analysing JSE-listed shares, rand forex pairs, or commodity contracts, as they filter out market noise, confirm patterns, and provide objective insights amid volatility driven by local factors like SARB decisions or global commodity shifts—enhancing decision-making in rand-denominated instruments.
          </p>
          
          <p className="mb-4">
            Here are the key indicators listed, with detailed explanations of their calculation, interpretation, and practical use:
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Moving Averages</h2>
          <p className="mb-4">
            Moving averages smooth out price data by calculating the average closing price over a specific number of periods, creating a line that follows the trend more steadily than raw prices. The Simple Moving Average (SMA) gives equal weight to all periods, while the Exponential Moving Average (EMA) prioritises recent prices for faster responsiveness. Common periods include 50-day for medium-term trends and 200-day for long-term direction; crossovers—such as a shorter MA crossing above a longer one (golden cross)—signal bullish momentum, while the reverse (death cross) suggests bearish shifts. In South African trading, moving averages act as dynamic support/resistance on JSE stock charts or rand pairs, helping traders ride trends in mining shares during commodity upswings or identify pullbacks in the rand for continuation entries, often combined with price action for stronger confirmation.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">RSI (Relative Strength Index)</h2>
          <p className="mb-4">
            The RSI is a momentum oscillator that measures the speed and change of price movements on a scale from 0 to 100, typically over 14 periods, by comparing average gains to average losses. Readings above 70 indicate overbought conditions where selling pressure may build, potentially leading to pullbacks, while below 30 suggests oversold states ripe for bounces as buying interest emerges. Divergences—when price makes new highs/lows but RSI fails to confirm—often foreshadow reversals. South African traders rely on RSI to gauge exhaustion in volatile rand forex trades during news events or in JSE equities after earnings rallies, using overbought signals to take profits in overextended uptrends or oversold readings to spot dip-buying opportunities in defensive rand assets.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">MACD (Moving Average Convergence Divergence)</h2>
          <p className="mb-4">
            MACD tracks the relationship between two exponential moving averages (usually 12-period and 26-period EMAs), displaying as a line with a signal line (9-period EMA of MACD) and a histogram showing the difference. Crossovers occur when the MACD line crosses above the signal for bullish signals or below for bearish ones, while histogram expansions indicate accelerating momentum and contractions suggest weakening. Divergences here also provide reversal clues. In rand-related markets, MACD excels at confirming trend strength on JSE indices during growth phases or spotting early shifts in rand pairs amid changing SARB policy expectations, allowing traders to enter momentum trades or exit fading positions with clear visual cues.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Bollinger Bands</h2>
          <p className="mb-4">
            Bollinger Bands consist of a middle band (typically a 20-period SMA) with upper and lower bands set two standard deviations away, creating a dynamic envelope that expands with volatility and contracts during calm periods. Prices touching or closing outside the bands signal potential overextension and reversals, while walks along the bands during strong trends show sustained momentum; a "squeeze" (narrow bands) often precedes breakouts. South African traders use Bollinger Bands to measure volatility in rand forex during uncertain periods or JSE resource stocks tied to commodity swings, buying near the lower band in uptrends for mean-reversion plays or watching for band expansions to capture explosive moves post-consolidation.
          </p>
        </section>

        <section>
          <p className="mb-4">
            These indicators work best in combination—such as using moving averages for trend direction and RSI/MACD for timing entries—empowering South African traders to navigate JSE equities, rand currency pairs, and local market nuances with greater precision, discipline, and risk-aware strategies.
          </p>
        </section>

        <section className="mt-8">
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://www.youtube.com/embed/xv_Zwf1-8L8"
              title="Technical Indicators"
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

export default Lesson5Indicators;
