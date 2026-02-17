export default function Lesson6() {
  return (
    <div className="prose prose-lg max-w-none">
      <h1>A/B Testing Basics</h1>
      
      <div className="video-container my-8">
        <iframe
          width="100%"
          height="500"
          src="https://www.youtube.com/embed/vV3g5VuSrIQ"
          title="A/B Testing Basics"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <p>
        A/B testing basics involve comparing two versions of something—such as an ad, email, product page, or social post—to see which performs better with your audience, using real data to guide decisions rather than guesses. This straightforward method helps refine what truly resonates, turning small experiments into meaningful improvements.
      </p>

      <h2>Define a Clear Hypothesis and Single Variable</h2>
      <p>
        Start each test with a specific question and prediction, while changing only one element—keeping images, targeting, and offers identical between versions. This isolation ensures you know exactly what caused differences. Keeping tests simple avoids confusion, allowing clear insights into preferences that directly inform refinements.
      </p>

      <h2>Choose Meaningful Metrics Aligned with Goals</h2>
      <p>
        Select key indicators based on what matters most—clicks or saves for awareness, add-to-cart rates for promotions, or messages for inquiries. Track these consistently across versions to compare performance objectively. This goal-oriented measurement provides actionable direction, ensuring efforts yield tangible progress toward sales or loyalty rather than vague vanity metrics.
      </p>

      <h2>Split Your Audience Evenly and Randomly</h2>
      <p>
        Divide traffic or recipients equally between versions to eliminate bias from timing or group differences, using platform tools that automate random assignment. This fairness creates trustworthy results; if one variant outperforms despite equal exposure, it confidently signals stronger appeal, allowing decisions that scale reliably across diverse followers.
      </p>

      <h2>Run Tests for Sufficient Time and Sample Size</h2>
      <p>
        Allow experiments to collect enough interactions—often days or weeks depending on traffic—before concluding, avoiding early stops that mislead due to fluctuations. Aim for volumes where differences feel reliable. This patience yields dependable outcomes, preventing premature shifts that waste resources on false positives and ensuring changes reflect true preferences.
      </p>

      <h2>Analyse Results Thoroughly and Document Learnings</h2>
      <p>
        After completion, compare metrics deeply—noting not just which version won but patterns and underlying reasons. Record findings clearly to reference in future tests. This reflective analysis compounds knowledge; applying lessons refines your approach consistently, maximising returns across campaigns by building on proven insights.
      </p>

      <h2>Start Small and Iterate Gradually</h2>
      <p>
        Begin with low-stakes tests—like boosting two variations with minimal budget—to learn safely before scaling winners across broader audiences. Build on successes sequentially, refining one element further based on prior results. This incremental approach protects resources while fostering a culture of continuous optimisation.
      </p>

      <h2>Apply Ethical Considerations</h2>
      <p>
        Ensure variations remain honest and respectful—avoid misleading claims—and disclose tests if impacting experiences significantly, prioritising buyer feelings of fairness. This integrity preserves relationships; customers appreciate transparency, responding better to genuine iterations that enhance their experience rather than feeling manipulated. Ethical testing sustains long-term credibility.
      </p>

      <div className="bg-blue-50 p-6 rounded-lg my-8">
        <h3 className="text-xl font-semibold mb-3">Key Takeaway</h3>
        <p>
          A/B testing basics empower sellers to make decisions rooted in real audience responses rather than assumptions, refining creatives and strategies that better capture the heart of your offerings. By embracing this iterative process with patience and ethics, you create content and experiences that continually improve, building a business where every adjustment delights buyers.
        </p>
      </div>
    </div>
  );
}
