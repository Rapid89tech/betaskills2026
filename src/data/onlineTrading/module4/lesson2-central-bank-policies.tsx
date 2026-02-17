import React from 'react';

const Lesson2CentralBankPolicies: React.FC = () => {
  return (
    <div className="lesson-content max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Central Bank Policies</h1>
      
      <div className="space-y-6">
        <section>
          <p className="mb-4">
            Central bank policies are the strategic actions and tools employed by institutions like the South African Reserve Bank (SARB) to achieve macroeconomic objectives such as price stability, sustainable economic growth, balanced employment, and financial system soundness. In South Africa, the SARB operates independently within a constitutional mandate to protect the value of the rand, primarily through an inflation-targeting framework that aims to keep consumer price inflation within a specific band. These policies profoundly influence financial markets by shaping borrowing costs, liquidity levels, currency strength, and investor sentiment, directly impacting rand-denominated assets on the Johannesburg Stock Exchange (JSE), bond yields, and forex trading activity.
          </p>
          
          <p className="mb-4">
            Here are the primary central bank policies and tools, with detailed explanations of their mechanisms, objectives, and market effects:
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Inflation Targeting</h2>
          <p className="mb-4">
            This is the cornerstone policy framework for the SARB, which publicly commits to maintaining consumer price inflation within a continuous target range. By announcing the target clearly, the central bank anchors public and market expectations, encouraging disciplined fiscal behaviour and wage negotiations. When inflation deviates—rising due to supply shocks like energy prices or falling during weak demand—the SARB adjusts other tools proactively. Successful targeting supports rand stability, fosters confidence in JSE equities and bonds, and attracts foreign investment inflows, while persistent misses can erode credibility and trigger rand volatility.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Interest Rate Policy</h2>
          <p className="mb-4">
            The SARB's Monetary Policy Committee (MPC) sets the key repurchase (repo) rate at regular scheduled meetings, influencing the entire structure of interest rates across the economy. Raising the repo rate increases borrowing costs for banks, which pass higher rates to consumers and businesses, cooling demand and curbing inflationary pressures; this typically strengthens the rand through capital attraction and favours fixed-income instruments like government bonds traded in rands. Lowering the rate stimulates lending, spending, and investment, supporting growth during slowdowns but potentially weakening the rand if it fuels inflation expectations—often boosting cyclical JSE sectors such as retail and property.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Open Market Operations</h2>
          <p className="mb-4">
            The SARB conducts daily and longer-term transactions in financial markets, primarily buying or selling government bonds and other securities in rands to manage liquidity in the banking system. When injecting liquidity (accommodative stance), it purchases securities, providing banks with excess reserves to lend more freely, which lowers short-term rates and supports credit creation. Conversely, draining liquidity by selling securities tightens conditions and pushes rates higher. These operations ensure smooth interbank functioning, stabilize money market rates in rands, and indirectly influence broader market conditions without dramatic policy shifts.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Foreign Exchange Interventions</h2>
          <p className="mb-4">
            The SARB occasionally intervenes in the forex market to accumulate reserves, counter disorderly rand movements, or address excessive volatility driven by external shocks like commodity price swings or global risk sentiment. Interventions involve buying or selling foreign currencies against the rand, often in spot or forward markets, to build buffers that enhance South Africa's creditworthiness. While not targeting a specific exchange rate level, these actions can temporarily support or pressure the rand, affecting import/export competitiveness and influencing rand-denominated commodity and equity pricing on the JSE.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Reserve Requirements and Other Prudential Tools</h2>
          <p className="mb-4">
            The SARB mandates that commercial banks hold minimum cash reserves as a percentage of their liabilities, influencing how much they can lend out. Adjusting these requirements upward restricts credit expansion to prevent overheating, while lowering them frees up funds for lending during stress periods. Additional macroprudential measures, such as countercyclical capital buffers, help mitigate systemic risks from excessive borrowing. These tools maintain financial stability, prevent asset bubbles that could disrupt JSE markets, and ensure the banking sector remains resilient amid rand fluctuations.
          </p>
        </section>

        <section>
          <p className="mb-4">
            Central bank policies are forward-looking and data-dependent, with clear communication through statements, press conferences, and forecasts guiding market expectations. For South African traders and investors, understanding SARB decisions is crucial for anticipating shifts in rand strength, interest-sensitive assets, and overall market direction in an interconnected global environment.
          </p>
        </section>

        <section className="mt-8">
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://www.youtube.com/embed/vUvIzshYyv8"
              title="Central Bank Policies"
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

export default Lesson2CentralBankPolicies;
