import React from 'react';

const Lesson4DrawdownManagement: React.FC = () => {
  return (
    <div className="lesson-content max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Drawdown Management</h1>
      
      <div className="space-y-6">
        <section>
          <p className="mb-4">
            Drawdown management refers to the strategies and disciplines traders employ to monitor, limit, and recover from periods when an account's equity declines from its peak level, ensuring that temporary losses do not spiral into irreversible damage. For South African traders engaging with JSE-listed shares or rand forex pairs, effective drawdown management is essential in a market often characterised by rand volatility from commodity cycles, SARB policy surprises, or global risk shifts—helping maintain emotional stability, preserve capital for future opportunities, and sustain long-term participation without forced pauses.
          </p>
          
          <p className="mb-4">
            Here are the key aspects of drawdown management, explained in detail:
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding and Measuring Drawdown</h2>
          <p className="mb-4">
            Drawdown is tracked as the percentage drop from the highest account equity point to the lowest during a losing streak or market downturn, distinguishing between absolute (total decline) and relative (peak-to-trough percentage). South African traders regularly calculate this on their platforms to quantify pain points—recognising that even profitable strategies experience drawdowns, but excessive ones signal over-risking or strategy flaws, prompting reviews before rand movements exacerbate losses in JSE positions or currency trades.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Setting Predefined Drawdown Limits</h2>
          <p className="mb-4">
            Establishing hard rules, such as pausing trading after a certain percentage decline from peak equity or reducing activity until recovery, acts as a circuit breaker to prevent emotional escalation. In rand-based accounts, traders might enforce daily, weekly, or overall limits tailored to personal tolerance—halting new trades during deep drawdowns from rand depreciation events to avoid compounding errors and allow objective reassessment away from JSE volatility.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Adjusting Position Sizing Dynamically</h2>
          <p className="mb-4">
            During drawdowns, scaling down position sizes proportionally to reduced equity maintains consistent risk per trade while lowering absolute exposure, easing pressure as the account rebuilds. South African traders implement this by recalculating sizes based on current equity rather than peak levels—protecting against amplified losses in volatile rand pairs or JSE sectors, gradually ramping up only as equity recovers to reinforce conservative habits.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Diversification to Mitigate Concentrated Drawdowns</h2>
          <p className="mb-4">
            Spreading risk across uncorrelated assets, such as combining JSE equities from different sectors with rand-denominated bonds or selective forex exposure, cushions against single-source declines like a mining sector slump impacting resource-heavy portfolios. This approach limits the depth of any one drawdown, providing breathing room for other positions to perform and offset losses amid South African market idiosyncrasies.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Recovery Planning and Realistic Expectations</h2>
          <p className="mb-4">
            Recovery focuses on steady, compounded gains rather than aggressive revenge trading, acknowledging that larger drawdowns require disproportionately higher returns to regain peaks—emphasising patience and adherence to proven strategies. Traders in rand environments plan recoveries by sticking to high-probability setups on JSE charts or rand trends, avoiding overtrading during fragile periods post-SARB announcements to rebuild equity methodically without new setbacks.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Psychological Resilience and Journaling</h2>
          <p className="mb-4">
            Managing the mental toll involves treating drawdowns as normal business costs, using trade journals to analyse causes objectively and detach emotions from outcomes. South African traders build resilience by reviewing past drawdowns from local events like rand flashes, reinforcing discipline through routines like breaks or mentorship—transforming frustrating periods into learning opportunities that strengthen future performance across JSE instruments and beyond.
          </p>
        </section>

        <section>
          <p className="mb-4">
            Effective drawdown management turns inevitable setbacks into controlled phases, empowering South African traders to protect rand-based capital, emerge stronger from challenges, and pursue sustainable success in dynamic JSE and forex landscapes.
          </p>
        </section>

        <section className="mt-8">
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://www.youtube.com/embed/9yqJjM5oUfM"
              title="Drawdown Management"
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

export default Lesson4DrawdownManagement;
