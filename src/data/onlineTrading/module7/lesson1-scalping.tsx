import React from 'react';

const Lesson1Scalping: React.FC = () => {
  return (
    <div className="lesson-content max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Scalping</h1>
      
      <div className="space-y-6">
        <section>
          <p className="mb-4">
            Scalping captures tiny price movements in financial instruments through high-frequency trades executed within seconds to minutes, targeting small profits per position that accumulate through volume. This intensive strategy suits highly liquid markets with tight spreads like major forex pairs or large-cap stocks, requiring constant screen monitoring and rapid decision-making without hesitation.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Key Characteristics</h2>
          <p className="mb-4">
            Scalpers execute dozens to hundreds of trades daily, holding positions briefly to capture 5-10 pip moves in forex or small price ticks in stocks. Success depends on tight spreads minimizing transaction costs, high liquidity ensuring instant fills, and disciplined risk management with tight stop-losses protecting against adverse moves. The strategy demands full-time attention during active market hours, making it unsuitable for part-time traders.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Requirements and Challenges</h2>
          <p className="mb-4">
            Scalping requires fast execution platforms, low commission structures, and strong psychological discipline to avoid emotional decisions during rapid-fire trading. Traders must maintain focus for extended periods, managing stress from constant decision-making while adhering strictly to entry and exit rules. The cumulative effect of small wins can be significant, but transaction costs and slippage can quickly erode profits if not carefully managed.
          </p>
        </section>

        <section className="mt-8">
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://www.youtube.com/embed/wqOSKxlCcAY"
              title="Scalping Strategy"
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

export default Lesson1Scalping;
