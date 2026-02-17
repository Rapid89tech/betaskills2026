import React from 'react';

const Lesson4ChartPatterns: React.FC = () => {
  return (
    <div className="lesson-content max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Chart Patterns</h1>
      
      <div className="space-y-6">
        <section>
          <p className="mb-4">
            Chart patterns such as Head and Shoulders, Double Top/Bottom, and Triangles are recognisable formations that appear on price charts, helping technical traders identify potential reversals or continuations in trends. South African traders frequently apply these patterns when analysing JSE-listed shares, rand forex pairs, or commodity contracts, as they reflect shifts in market psychology between buyers and sellers—often providing high-probability setups when confirmed by volume, breakouts, or alignment with support/resistance levels in rand-denominated instruments.
          </p>
          
          <p className="mb-4">
            Here are the key patterns listed, with detailed explanations of their structure, identification, implications, and practical application:
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Head and Shoulders</h2>
          <p className="mb-4">
            This is a reliable reversal pattern that signals the end of an uptrend and the potential start of a downtrend, resembling a human silhouette with a left shoulder, head, and right shoulder. It forms with three peaks: the left shoulder (a high after an uptrend), a higher peak (the head), and a lower right shoulder, connected by a neckline drawn across the lows between them. Volume typically peaks on the left shoulder, declines during the head, and weakens further on the right shoulder, with a decisive breakout below the neckline on expanding volume confirming the bearish reversal. In South African markets, this pattern often appears in overextended JSE resource stocks after commodity rallies or in strengthening rand pairs nearing tops—traders measure a price target by projecting the height from head to neckline downward from the breakout point, using it to set profit objectives while placing stops above the right shoulder for risk control.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Double Top and Double Bottom</h2>
          <p className="mb-4">
            These are classic reversal patterns that indicate exhaustion in the prevailing trend, with the Double Top marking the end of an uptrend and the Double Bottom signalling the end of a downtrend. A Double Top forms two roughly equal highs separated by a trough, resembling an "M" shape, with the neckline at the intervening low; confirmation comes on a close below the neckline with rising volume, projecting a downside target equal to the pattern height subtracted from the breakout. Conversely, a Double Bottom creates two similar lows with a peak in between (like a "W"), confirming bullish reversal on a breakout above the neckline. South African traders spot these in JSE sectors during prolonged trends—such as banking shares stalling after rate hikes or mining stocks bottoming amid rand weakness—offering clear risk-reward setups by entering on confirmed breaks and targeting measured moves while monitoring for false breakdowns that trap early participants.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Triangles</h2>
          <p className="mb-4">
            Triangle patterns represent periods of consolidation where price volatility narrows into a coiled shape, often acting as continuation patterns within existing trends but occasionally reversing if at major turning points. They form through converging trendlines connecting lower highs and higher lows (symmetrical triangle for neutral bias), rising lows with flat tops (ascending triangle for bullish accumulation), or falling highs with flat bottoms (descending triangle for bearish distribution). Breakouts occur in the direction of the prior trend, typically in the latter half of the pattern, with volume contracting inside and expanding on the break for validation; targets are measured by adding/subtracting the triangle's base height to/from the breakout point. In rand-related charts or JSE indices, ascending triangles frequently build during uptrends supported by positive SARB outlooks, while symmetrical ones consolidate amid uncertainty—traders in South Africa wait for decisive closes beyond the trendlines to avoid whipsaws, combining with momentum indicators for stronger conviction in volatile local conditions.
          </p>
        </section>

        <section>
          <p className="mb-4">
            These patterns empower South African traders to anticipate shifts with structured frameworks, enhancing timing on JSE equities or rand instruments by emphasising confirmation signals like volume surges or candlestick closes—promoting disciplined entries, predefined targets, and robust risk management for navigating trend changes effectively.
          </p>
        </section>

        <section className="mt-8">
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://www.youtube.com/embed/aRlWle9smww"
              title="Chart Patterns"
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

export default Lesson4ChartPatterns;
