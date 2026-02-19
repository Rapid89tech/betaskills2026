
export default function Lesson2() {
  return (
    <div className="prose prose-lg max-w-none">
      <h1>Branding and Positioning</h1>

      <div className="video-container my-8">
        <iframe
          width="100%"
          height="500"
          src="https://www.youtube.com/embed/YhK_PGhdPe8"
          title="Branding and Positioning"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <h2>What is positioning?</h2>
      <p>
        Positioning is the clear reason a customer should choose you over alternatives. It answers:
        “Who is this for?” and “Why is this better for me?”
      </p>

      <h2>Core brand building blocks</h2>
      <ul>
        <li>Audience: the specific customer you serve</li>
        <li>Promise: the outcome you deliver</li>
        <li>Proof: reviews, results, quality, guarantees</li>
        <li>Personality: tone of voice and style</li>
      </ul>

      <h2>Simple positioning statement</h2>
      <p>
        For <strong>[target customer]</strong> who want <strong>[desired outcome]</strong>,
        our <strong>[product/category]</strong> provides <strong>[unique benefit]</strong>
        unlike <strong>[alternatives]</strong>.
      </p>
    </div>
  );
}

