import React from 'react';

const Lesson2DayTrading: React.FC = () => {
  return (
    <div className="lesson-content max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Day Trading</h1>
      
      <div className="space-y-6">
        <section>
          <p className="mb-4">
            Day trading involves opening and closing all positions within a single trading day, avoiding overnight exposure to gap risk from after-hours news or events. This active strategy captures intraday price movements in stocks, forex pairs, or futures, typically holding positions from minutes to hours while monitoring charts and news catalysts throughout market sessions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Strategy Approach</h2>
          <p className="mb-4">
            Day traders analyze technical patterns, support and resistance levels, and volume indicators to identify short-term opportunities during active market hours. They capitalize on volatility from economic releases, earnings announcements, or momentum shifts, using tools like moving averages, RSI, and MACD for timing entries and exits. The strategy eliminates overnight risk but requires full-day commitment and rapid decision-making skills.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Risk Management</h2>
          <p className="mb-4">
            Successful day trading demands strict risk controls including position sizing based on account percentage, tight stop-losses to limit losses, and profit targets or trailing stops to secure gains. Traders must manage multiple positions simultaneously while maintaining emotional discipline to avoid revenge trading after losses or overconfidence after wins. Transaction costs from frequent trading require careful monitoring to ensure profitability.
          </p>
        </section>

        <section className="mt-8">
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://www.youtube.com/embed/Hl4vW5Q0FGk"
              title="Day Trading Strategy"
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

export default Lesson2DayTrading;
