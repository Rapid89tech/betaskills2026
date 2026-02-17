import React from 'react';

const Lesson5ReadingEconomicCalendar: React.FC = () => {
  return (
    <div className="lesson-content max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Reading an Economic Calendar</h1>
      
      <div className="space-y-6">
        <section>
          <p className="mb-4">
            Reading an economic calendar is a fundamental skill for traders and investors, as it provides a scheduled overview of upcoming economic data releases, central bank announcements, speeches, and other events that can drive significant market movements. In South Africa, economic calendars are essential tools for anticipating volatility in the rand, shifts on the Johannesburg Stock Exchange (JSE), and changes in bond yields, helping participants prepare for high-impact news from local sources like Statistics South Africa (Stats SA) or the South African Reserve Bank (SARB), as well as global events that influence commodity prices or emerging market sentiment.
          </p>
          
          <p className="mb-4">
            Here are the key elements of an economic calendar and how to read and interpret them effectively, explained in detail:
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Event Name and Description</h2>
          <p className="mb-4">
            Each entry lists the specific indicator or announcement, such as "CPI YoY" for consumer price inflation or "SARB Interest Rate Decision." Reading this first gives context about what aspect of the economy is being measured—whether inflation, employment, growth, or monetary policy. For South African traders, local events like quarterly GDP releases or monthly unemployment figures directly signal domestic health, potentially strengthening or weakening the rand based on outcomes, while global events like US interest rate decisions can trigger broader risk sentiment affecting JSE-listed shares.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Date and Time</h2>
          <p className="mb-4">
            Events are scheduled with precise release times, usually in GMT/UTC or local time zones, and South African users often convert to South Africa Standard Time (SAST) for accuracy. Timing matters because releases during active trading hours can cause immediate rand fluctuations or gaps in JSE prices at open, while off-hours events might lead to delayed reactions. Traders mark these in advance to avoid being caught in sudden volatility, ensuring they are positioned or hedged before high-impact announcements.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Country or Currency Indicator</h2>
          <p className="mb-4">
            The calendar specifies the originating country, such as South Africa (ZAR), United States (USD), Eurozone (EUR), or China, helping users focus on relevance. Events tied to the rand—like SARB Monetary Policy Committee outcomes or trade balance data—have direct implications for local markets, often moving forex pairs involving the rand or influencing commodity-exposed JSE sectors. Global events from major economies indirectly affect South Africa through capital flows or commodity demand, prompting traders to monitor a mix for comprehensive risk assessment.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Importance or Impact Level</h2>
          <p className="mb-4">
            Many calendars use colour coding, stars, or labels (high, medium, low) to indicate potential market influence. High-impact events, such as SARB repo rate announcements or monthly CPI figures, routinely cause sharp rand swings and heightened JSE trading volume due to their direct bearing on monetary policy and inflation expectations. Medium or low-impact items might produce milder reactions, allowing traders to prioritise preparation—closing positions, setting stops, or avoiding new trades ahead of red-flagged events to manage risk effectively.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Previous Figure</h2>
          <p className="mb-4">
            This shows the outcome from the prior release, providing a benchmark for comparison and highlighting trends over time. For instance, if previous South African inflation was rising steadily, markets price in continuation unless disrupted. Traders use this to gauge whether the economy is accelerating or slowing, informing expectations for rand strength or weakness in advance of the new data.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Consensus Forecast</h2>
          <p className="mb-4">
            Compiled from economist surveys, this represents the market's average expectation for the upcoming figure. Reading the forecast helps understand what is already "priced in"—if the actual release matches, the rand and JSE often react mildly, but deviations create opportunities or risks. South African traders watch how forecasts align with SARB targets, as consistent beats or misses can shift policy outlooks and long-term rand trends.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Actual Release and Surprises</h2>
          <p className="mb-4">
            Once published, the actual figure appears, often in bold or colour-coded to show if it beat (better than forecast), missed (worse), or met expectations. A positive surprise, like lower-than-expected unemployment, typically bolsters the rand and lifts JSE equities by signalling robust growth, while negative surprises erode confidence and trigger defensive moves. Traders react quickly to these, as initial spikes can reverse if revisions follow or secondary effects emerge.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Revisions to Previous Data</h2>
          <p className="mb-4">
            Occasionally, past figures are adjusted in the new release, which can subtly alter interpretations and cause additional market adjustments. Savvy South African users note revisions, as upward tweaks to prior GDP might reinforce positive rand momentum, while downward ones amplify caution across local assets.
          </p>
        </section>

        <section>
          <p className="mb-4">
            By regularly consulting an economic calendar from reliable sources and cross-referencing elements like forecasts with current market pricing, South African traders build strategies around expected volatility—using tools like stop-loss orders in rand-denominated positions or focusing on event-driven opportunities to navigate announcements with greater discipline and insight.
          </p>
        </section>

        <section className="mt-8">
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://www.youtube.com/embed/hj0x7AnrQNU"
              title="Reading an Economic Calendar"
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

export default Lesson5ReadingEconomicCalendar;
