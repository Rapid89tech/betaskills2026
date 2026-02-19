
export default function Lesson1() {
  return (
    <div className="prose prose-lg max-w-none">
      <h1>Market Orders</h1>

      <p>
        A market order buys or sells immediately at the best available current price. It prioritizes execution
        speed over price control.
      </p>

      <h2>When to use market orders</h2>
      <ul>
        <li>Entering or exiting quickly (breakouts, news, fast moves)</li>
        <li>When liquidity is high and spreads are tight</li>
        <li>When you need certainty of being filled</li>
      </ul>

      <h2>Key risks</h2>
      <ul>
        <li>Slippage: you may get a worse price than expected in volatile markets</li>
        <li>Wide spreads in illiquid markets increase cost</li>
      </ul>

      <h2>Best practice</h2>
      <p>
        Use market orders in liquid sessions, avoid major announcements if you’re sensitive to slippage, and
        always size positions so unexpected price movement won’t break your risk plan.
      </p>
    </div>
  );
}

