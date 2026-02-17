import React from 'react';

const Lesson2Trends: React.FC = () => {
  return (
    <div className="lesson-content max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Trends (Uptrend, Downtrend, Sideways)</h1>
      
      <div className="space-y-6">
        <section>
          <p className="mb-4">
            Trends in financial markets refer to the general direction in which the price of an asset—such as a stock, currency pair, commodity, or index—is moving over a sustained period. Identifying trends is a core principle of technical analysis, helping South African traders on platforms linked to the Johannesburg Stock Exchange (JSE) or forex markets involving the rand to align their strategies with the prevailing momentum, avoid fighting the dominant flow, and improve timing for entries and exits. Trends reflect the underlying balance between buyers and sellers, influenced by economic data, investor sentiment, commodity cycles, or global events, and recognising them allows traders to apply the adage "the trend is your friend" for more consistent results in rand-denominated instruments.
          </p>
          
          <p className="mb-4">
            Here are the three primary types of trends, explained in detail:
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Uptrend</h2>
          <p className="mb-4">
            An uptrend occurs when prices consistently form a pattern of higher highs and higher lows over time, indicating that buyers are in control and pushing values upward with increasing strength. On a chart, this is often visualised by drawing a trendline connecting the rising lows, acting as dynamic support where prices tend to bounce. In South African markets, uptrends frequently appear in JSE resource stocks during commodity booms or in the rand against weaker currencies when positive local data like improving GDP or controlled inflation boosts confidence. Traders capitalise on uptrends by buying on pullbacks to support levels, adding to positions as new highs confirm momentum, and using trailing stops to lock in gains while letting winners run in rand-traded assets.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Downtrend</h2>
          <p className="mb-4">
            A downtrend is characterised by a series of lower highs and lower lows, showing that sellers dominate and drive prices steadily downward as bearish sentiment prevails. Trendlines are drawn along the declining highs to mark resistance, where attempted rallies often fail. For rand-related instruments, downtrends can emerge during periods of capital outflows from emerging markets, rand depreciation amid higher global interest rates, or weakness in JSE sectors hit by domestic challenges like energy constraints. Traders approach downtrends cautiously by short-selling at resistance bounces, waiting for breakdowns below support, or avoiding long positions altogether to prevent losses, while protective stops help manage the risk of sudden reversals.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Sideways (Ranging or Consolidation)</h2>
          <p className="mb-4">
            A sideways trend, also called a ranging or consolidation phase, happens when prices oscillate within a horizontal channel without making significant higher highs or lower lows, reflecting a balance between buyers and sellers with no clear directional bias. Support and resistance levels form the boundaries, and prices repeatedly test these zones before reversing. In South African contexts, sideways trends often develop in the rand during periods of stable SARB policy or in JSE blue-chip shares awaiting catalysts like earnings seasons or commodity price stabilisation. Traders exploit sideways markets through range-bound strategies—buying near support and selling near resistance—or prepare for potential breakouts by monitoring volume and momentum indicators, as prolonged consolidation frequently precedes strong trends in either direction.
          </p>
        </section>

        <section>
          <p className="mb-4">
            Understanding and correctly identifying these trends empowers South African traders to adapt strategies dynamically—riding momentum in directional moves, exercising patience in ranges, and using tools like moving averages or trendlines for confirmation—ultimately enhancing decision-making and risk management across JSE equities, rand forex pairs, and other local instruments.
          </p>
        </section>

        <section className="mt-8">
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://www.youtube.com/embed/1gOiHcbFygI"
              title="Trends"
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

export default Lesson2Trends;
