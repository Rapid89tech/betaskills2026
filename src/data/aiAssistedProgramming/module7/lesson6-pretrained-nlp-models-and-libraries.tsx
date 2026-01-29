import type { Lesson } from '@/types/course';

export const lesson6PretrainedNLPModelsAndLibraries: Lesson = {
  id: 6,
  title: 'Pretrained NLP Models and Libraries',
  duration: '25 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=zeSuYShnmic',
    textContent: `<div class="lesson-content">

<h1>Pretrained NLP Models and Libraries</h1>

<p><strong>Modern NLP relies on powerful libraries and pre-trained models to simplify development and achieve state-of-the-art performance.</strong></p>

<table>
  <thead>
    <tr>
      <th><strong>Library</strong></th>
      <th><strong>Description</strong></th>
      <th><strong>Use Case</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>NLTK</strong></td>
      <td><strong>Classic tools for preprocessing, POS tagging, etc.</strong></td>
      <td><strong>Educational purposes, basic NLP tasks.</strong></td>
    </tr>
    <tr>
      <td><strong>spaCy</strong></td>
      <td><strong>Fast, production-ready NLP library</strong></td>
      <td><strong>Tokenization, NER, dependency parsing.</strong></td>
    </tr>
    <tr>
      <td><strong>Transformers (Hugging Face)</strong></td>
      <td><strong>Pre-trained models like BERT, GPT, RoBERTa</strong></td>
      <td><strong>Fine-tuning for NLP tasks, embeddings.</strong></td>
    </tr>
    <tr>
      <td><strong>TextBlob</strong></td>
      <td><strong>Simple API for sentiment analysis, POS tagging</strong></td>
      <td><strong>Quick prototyping, sentiment analysis.</strong></td>
    </tr>
    <tr>
      <td><strong>Gensim</strong></td>
      <td><strong>Topic modeling and word embeddings (e.g., Word2Vec)</strong></td>
      <td><strong>Document similarity, topic extraction.</strong></td>
    </tr>
    <tr>
      <td><strong>Flair</strong></td>
      <td><strong>Contextual string embeddings and NER</strong></td>
      <td><strong>High-accuracy NER and classification.</strong></td>
    </tr>
  </tbody>
</table>

<h2>Pre-trained Models:</h2>
<ul>
  <li><strong>BERT</strong>: Bidirectional transformer for contextual understanding.</li>
  <li><strong>GPT</strong>: Generative model for text generation and completion.</li>
  <li><strong>RoBERTa/T5</strong>: Optimized transformers for specific tasks like translation or summarization.</li>
</ul>

<h2>Example with Hugging Face:</h2>
<pre><code>from transformers import pipeline
classifier = pipeline("sentiment-analysis")
result = classifier("I love programming with Python!")
print(result)  # Output: [{'label': 'POSITIVE', 'score': 0.999}]</code></pre>

</div>`
  }
};
