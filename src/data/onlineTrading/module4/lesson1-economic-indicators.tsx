import React from 'react';

const Lesson1EconomicIndicators: React.FC = () => {
  return (
    <div className="lesson-content max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Economic Indicators</h1>
      
      <div className="space-y-6">
        <section>
          <p className="mb-4">
            Economic indicators are critical statistics that measure the performance and health of an economy, providing valuable signals to investors, traders, policymakers, and businesses. In South Africa, these indicators directly influence financial markets by affecting the strength of the rand, movements on the Johannesburg Stock Exchange (JSE), borrowing costs, consumer confidence, and overall investment strategies. Traders and institutions closely watch releases from sources like Statistics South Africa (Stats SA) and the South African Reserve Bank (SARB) to anticipate market reactions, adjust portfolios, and manage risks tied to rand-denominated assets.
          </p>
          
          <p className="mb-4">
            Here are the key economic indicators listed, with detailed explanations of their meaning, calculation, and impact:
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">GDP (Gross Domestic Product)</h2>
          <p className="mb-4">
            GDP represents the total monetary value of all final goods and services produced within South Africa's borders over a specific period, usually reported quarterly and annually. It serves as the broadest measure of economic activity and growth, capturing contributions from sectors such as mining, manufacturing, agriculture, finance, and services. A rising GDP signals expansion, boosting investor confidence, strengthening the rand against other currencies, and often driving gains in JSE-listed shares, particularly in cyclical sectors like resources and retail. Conversely, contracting GDP indicates recessionary pressures, which can weaken the rand, increase market volatility, and prompt defensive positioning in safer assets like government bonds traded in rands.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Inflation (CPI - Consumer Price Index)</h2>
          <p className="mb-4">
            The CPI tracks the average change in prices paid by urban consumers for a basket of goods and services, including food, housing, transport, healthcare, and recreation, with Stats SA publishing the figure monthly. It measures the rate at which the purchasing power of the rand is eroding; moderate inflation is generally healthy as it encourages spending and investment, while high inflation erodes savings value and can trigger SARB interventions. Traders monitor CPI closely because unexpected rises often lead to expectations of tighter monetary policy, pressuring rand-denominated bond yields higher and potentially weighing on equity markets, whereas low or falling inflation may support looser policy, benefiting growth-sensitive JSE sectors and stabilizing the rand in forex markets.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Interest Rates</h2>
          <p className="mb-4">
            These are the benchmark rates set by the SARB, primarily the repurchase (repo) rate, which influences borrowing costs across the economy for loans, mortgages, and corporate financing in rands. The SARB adjusts rates to control inflation and support growth; higher rates make borrowing more expensive, curbing spending and inflation but potentially slowing economic activity, strengthening the rand through capital inflows, and favoring fixed-income investments like rand-denominated bonds over equities on the JSE. Lower rates reduce borrowing costs, stimulate spending and investment, weaken the rand to boost exports, and typically lift stock market performance, especially in rate-sensitive sectors such as property and consumer goods.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Unemployment</h2>
          <p className="mb-4">
            This indicator reflects the percentage of the labour force that is actively seeking work but unable to find it, with Stats SA releasing quarterly figures that include both narrow (official) and expanded rates accounting for discouraged workers. High unemployment signals weak economic demand, reduced consumer spending power, and social challenges, which can depress the rand, dampen corporate earnings on the JSE, and lead to cautious market sentiment favoring defensive assets. Improving unemployment indicates stronger job creation and income growth, enhancing consumer confidence, supporting retail and services sectors, and contributing to rand appreciation and broader market rallies.
          </p>
        </section>

        <section>
          <p className="mb-4">
            These indicators are interconnected—strong GDP growth can reduce unemployment but risk higher inflation, prompting interest rate adjustments by the SARB. For South African traders and investors, understanding their releases and implications is essential for navigating market volatility, protecting rand-based portfolios, and identifying opportunities in a dynamic economic environment.
          </p>
        </section>

        <section className="mt-8">
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://www.youtube.com/embed/F_WYiVESz1A"
              title="Economic Indicators"
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

export default Lesson1EconomicIndicators;
