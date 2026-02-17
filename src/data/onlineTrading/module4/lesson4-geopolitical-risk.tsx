import React from 'react';

const Lesson4GeopoliticalRisk: React.FC = () => {
  return (
    <div className="lesson-content max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Geopolitical Risk</h1>
      
      <div className="space-y-6">
        <section>
          <p className="mb-4">
            Geopolitical risk refers to the potential disruptions to financial markets caused by political events, conflicts, tensions between countries, policy shifts, or unexpected international developments that create uncertainty for investors and traders. In South Africa, geopolitical risks are particularly significant due to the country's position as an emerging market heavily reliant on commodity exports, foreign investment flows, and global trade relationships, making the rand highly sensitive to external shocks and often leading to sharp movements on the Johannesburg Stock Exchange (JSE) as capital flees or returns based on perceived stability.
          </p>
          
          <p className="mb-4">
            Here are the key aspects of geopolitical risk and how they influence financial markets, explained in detail:
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Political Instability and Elections</h2>
          <p className="mb-4">
            Domestic or foreign elections, government changes, or internal unrest can introduce uncertainty about future policies, leading investors to reassess risk exposure. In South Africa, national elections or coalition shifts can spark rand volatility as markets price in potential changes to fiscal discipline, land reform, or labour laws. Globally, similar events in major economies trigger risk-off sentiment, prompting outflows from emerging market assets like JSE shares and rand-denominated bonds, as investors seek safer alternatives during periods of doubt.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">International Conflicts and Wars</h2>
          <p className="mb-4">
            Armed conflicts, such as those in resource-rich regions or involving major powers, disrupt supply chains, drive up energy and commodity prices, and heighten global uncertainty. For South Africa, conflicts affecting key trading partners or shipping routes can weaken export revenues from minerals like platinum and gold, pressuring the rand lower while boosting safe-haven demand for assets like government bonds traded in rands. Escalations often lead to broad sell-offs on the JSE, particularly in cyclical sectors, as fear dominates and liquidity dries up temporarily.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Trade Disputes and Sanctions</h2>
          <p className="mb-4">
            Tariffs, trade wars, or economic sanctions between countries can restrict access to markets, raise costs for importers and exporters, and alter global trade flows. South Africa, with its dependence on exports to China, Europe, and the US, faces rand depreciation when major economies impose barriers or when sanctions target commodity producers. These events ripple through the JSE, hitting companies with international exposure hardest, while potentially benefiting domestic-focused firms if import substitution rises.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Terrorism and Civil Unrest</h2>
          <p className="mb-4">
            Acts of terrorism or widespread protests in strategic locations can erode investor confidence overnight, triggering flight to quality away from riskier assets. In a South African context, regional instability in neighbouring countries or domestic service delivery protests can amplify perceptions of risk, causing the rand to weaken against major currencies and prompting defensive positioning in JSE blue-chip stocks or rand-denominated fixed-income instruments that are seen as more resilient.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Policy Shifts in Major Economies</h2>
          <p className="mb-4">
            Unexpected decisions by large central banks or governments, such as abrupt changes in alliances, regulatory overhauls, or withdrawal from international agreements, can reshape capital flows. Emerging markets like South Africa often bear the brunt through rand volatility, as foreign investors repatriate funds during heightened global tensions, leading to declines in JSE indices and increased borrowing costs for rand-based debt.
          </p>
        </section>

        <section>
          <p className="mb-4">
            Geopolitical risks are unpredictable and often escalate quickly, amplifying market volatility and testing portfolio resilience. South African traders monitor these developments closely through news sources and risk indicators, using tools like diversification, hedging with derivatives, or allocation to defensive rand assets to mitigate impacts and navigate periods of uncertainty effectively.
          </p>
        </section>

        <section className="mt-8">
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://www.youtube.com/embed/Mh5badECwgQ"
              title="Geopolitical Risk"
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

export default Lesson4GeopoliticalRisk;
