import type { Lesson } from '@/types/course';

export const lesson7SentimentAnalysisExample: Lesson = {
  id: 7,
  title: 'Sentiment Analysis Example',
  duration: '25 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=5HQCNAsSO-s',
    textContent: `<div class="lesson-content">

<h1>Sentiment Analysis Example</h1>

<p><strong>Sentiment analysis determines the emotional tone of text, often used for analyzing reviews or social media.</strong></p>

<h2>Example Code:</h2>
<pre><code>from textblob import TextBlob

# Sample text
text = "I love programming with Python!"

blob = TextBlob(text)

# Get sentiment
sentiment = blob.sentiment
print(f"Polarity: {sentiment.polarity:.2f}, Subjectivity: {sentiment.subjectivity:.2f}")

# Output: Polarity: 0.50, Subjectivity: 0.60</code></pre>

<h2>Explanation:</h2>
<ul>
  <li><strong>Polarity</strong>: Ranges from -1 (negative) to 1 (positive). A score of 0.50 indicates positive sentiment.</li>
  <li><strong>Subjectivity</strong>: Ranges from 0 (objective) to 1 (subjective). A score of 0.60 suggests moderate subjectivity.</li>
</ul>

<h2>Advanced Example with Hugging Face:</h2>
<pre><code>from transformers import pipeline

classifier = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")
result = classifier("I love programming with Python!")
print(result)  # Output: [{'label': 'POSITIVE', 'score': 0.999}]</code></pre>

<h2>Use Cases:</h2>
<ul>
  <li>Analyzing customer feedback for products or services.</li>
  <li>Monitoring social media sentiment for brand reputation.</li>
  <li>Detecting emotions in user-generated content.</li>
</ul>

</div>`
  }
};
