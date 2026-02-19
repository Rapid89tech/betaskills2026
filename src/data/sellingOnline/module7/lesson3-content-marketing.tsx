
export default function Lesson3() {
  return (
    <div className="prose prose-lg max-w-none">
      <h1>Content Marketing</h1>

      <div className="video-container my-8">
        <iframe
          width="100%"
          height="500"
          src="https://www.youtube.com/embed/YhK_PGhdPe8"
          title="Content Marketing"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <h2>What content marketing does</h2>
      <p>
        Content marketing builds trust before the sale. It answers questions, demonstrates value, and brings
        consistent traffic without paying for every click.
      </p>

      <h2>High-performing content types</h2>
      <ul>
        <li>How-to videos and tutorials</li>
        <li>Before/after demos</li>
        <li>Product comparisons</li>
        <li>Customer stories and UGC</li>
        <li>Behind-the-scenes</li>
      </ul>

      <h2>One-week simple plan</h2>
      <ol>
        <li>1 educational post (solve a problem)</li>
        <li>1 proof post (review/results)</li>
        <li>1 offer post (what to buy + why now)</li>
      </ol>
    </div>
  );
}

