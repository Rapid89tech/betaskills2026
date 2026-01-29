import type { Lesson } from '@/types/course';

export const lesson2KeyComponentsOfNLP: Lesson = {
  id: 2,
  title: 'Key Components of NLP',
  duration: '30 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=CMrHM8a3hqw',
    textContent: `<div class="lesson-content">

<h1>Key Components of NLP</h1>

<p><strong>NLP involves several components to process and analyze text data effectively. Each component addresses specific aspects of language processing.</strong></p>

<table>
  <thead>
    <tr>
      <th><strong>Component</strong></th>
      <th><strong>Description</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Text Preprocessing</strong></td>
      <td><strong>Cleaning and preparing raw text for analysis (e.g., removing punctuation).</strong></td>
    </tr>
    <tr>
      <td><strong>Tokenization</strong></td>
      <td><strong>Splitting text into smaller units (words, sentences, or subwords).</strong></td>
    </tr>
    <tr>
      <td><strong>Stop Words Removal</strong></td>
      <td><strong>Eliminating common words (e.g., "the," "is") that add little semantic value.</strong></td>
    </tr>
    <tr>
      <td><strong>Stemming</strong></td>
      <td><strong>Reducing words to their root form (e.g., "running" → "run").</strong></td>
    </tr>
    <tr>
      <td><strong>Lemmatization</strong></td>
      <td><strong>Reducing words to their base form using context (e.g., "better" → "good").</strong></td>
    </tr>
    <tr>
      <td><strong>POS Tagging</strong></td>
      <td><strong>Labeling words with their part of speech (e.g., noun, verb, adjective).</strong></td>
    </tr>
    <tr>
      <td><strong>Named Entity Recognition (NER)</strong></td>
      <td><strong>Identifying entities like names, locations, or dates in text.</strong></td>
    </tr>
    <tr>
      <td><strong>Dependency Parsing</strong></td>
      <td><strong>Analyzing grammatical structure to understand relationships between words.</strong></td>
    </tr>
    <tr>
      <td><strong>Sentiment Analysis</strong></td>
      <td><strong>Determining the emotional tone of text (e.g., positive, negative, neutral).</strong></td>
    </tr>
  </tbody>
</table>

<h2>Additional Components:</h2>
<ul>
  <li><strong>Word Sense Disambiguation</strong>: Resolving ambiguous words based on context (e.g., "bank" as a financial institution vs. a riverbank).</li>
  <li><strong>Coreference Resolution</strong>: Linking pronouns to their referents (e.g., "She" refers to "Alice").</li>
  <li><strong>Topic Modeling</strong>: Identifying themes or topics in a text corpus.</li>
</ul>

</div>`
  }
};
