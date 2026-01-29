import type { Lesson } from '@/types/course';

export const lesson4VectorizationTextToNumbers: Lesson = {
  id: 4,
  title: 'Vectorization (Text to Numbers)',
  duration: '30 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=wgfSDrqYMJ4',
    textContent: `<div class="lesson-content">

<h1>Vectorization (Text to Numbers)</h1>

<p><strong>NLP models require numerical inputs, so text must be converted into numerical representations through vectorization.</strong></p>

<h2>Techniques:</h2>

<h3>Bag of Words (BoW):</h3>
<ul>
  <li>Represents text as a sparse matrix of word counts or frequencies.</li>
  <li>Ignores word order and context.</li>
</ul>
<pre><code>from sklearn.feature_extraction.text import CountVectorizer
corpus = ["AI is smart", "AI is the future"]
vectorizer = CountVectorizer()
X = vectorizer.fit_transform(corpus)
print(X.toarray())  # Output: [[1, 1, 0], [1, 1, 1]]</code></pre>

<h3>TF-IDF (Term Frequency-Inverse Document Frequency):</h3>
<ul>
  <li>Weighs words based on their frequency in a document and rarity across documents.</li>
  <li>Highlights important, unique words.</li>
</ul>
<pre><code>from sklearn.feature_extraction.text import TfidfVectorizer
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(corpus)
print(X.toarray())</code></pre>

<h3>Word Embeddings:</h3>
<ul>
  <li>Dense vectors capturing semantic meaning (e.g., "king" and "queen" are close in vector space).</li>
  <li>Common models: Word2Vec, GloVe, FastText.</li>
  <li>Advanced: Contextual embeddings from transformers (e.g., BERT).</li>
</ul>
<pre><code>from gensim.models import Word2Vec
sentences = [["AI", "is", "smart"], ["AI", "is", "future"]]
model = Word2Vec(sentences, vector_size=100, window=5, min_count=1)
print(model.wv["AI"])  # Output: 100-dimensional vector</code></pre>

<h3>Transformer-Based Embeddings:</h3>
<ul>
  <li>Use pre-trained models like BERT for contextual representations.</li>
</ul>
<pre><code>from transformers import BertTokenizer, BertModel
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = BertModel.from_pretrained('bert-base-uncased')
inputs = tokenizer("AI is the future", return_tensors="pt")
outputs = model(**inputs)</code></pre>

<h2>Considerations:</h2>
<ul>
  <li><strong>BoW/TF-IDF</strong>: Simple but loses word order and context.</li>
  <li><strong>Word Embeddings</strong>: Capture semantics but may require fine-tuning.</li>
  <li><strong>Transformers</strong>: State-of-the-art for contextual understanding but computationally intensive.</li>
</ul>

</div>`
  }
};
