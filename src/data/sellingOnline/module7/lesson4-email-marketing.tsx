
export default function Lesson4() {
  return (
    <div className="prose prose-lg max-w-none">
      <h1>Email Marketing Basics</h1>

      <div className="video-container my-8">
        <iframe
          width="100%"
          height="500"
          src="https://www.youtube.com/embed/YhK_PGhdPe8"
          title="Email Marketing Basics"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <h2>Why email still works</h2>
      <p>
        Email is direct, measurable, and you own the audience. It’s great for launches, promos, and repeat
        purchases.
      </p>

      <h2>Build your list (permission-based)</h2>
      <ul>
        <li>Offer a lead magnet (discount, guide, checklist)</li>
        <li>Use popups or embedded forms</li>
        <li>Collect emails at checkout</li>
      </ul>

      <h2>Starter automations</h2>
      <ol>
        <li>Welcome series (3 emails)</li>
        <li>Abandoned cart reminders</li>
        <li>Post-purchase follow-up + review request</li>
      </ol>
    </div>
  );
}

