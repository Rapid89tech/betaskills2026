import type { Lesson } from '@/types/course';

export const lesson5NLPApplications: Lesson = {
  id: 5,
  title: 'NLP Applications',
  duration: '25 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=k6f8MB4j8sI',
    textContent: `<div class="lesson-content">

<h1>NLP Applications</h1>

<p><strong>NLP powers a wide range of real-world applications by enabling machines to process and generate human language.</strong></p>

<table>
  <thead>
    <tr>
      <th><strong>Application</strong></th>
      <th><strong>Description</strong></th>
      <th><strong>Example</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Chatbots/Virtual Assistants</strong></td>
      <td><strong>Conversational AI for user interaction</strong></td>
      <td><strong>Siri, Alexa, customer support bots.</strong></td>
    </tr>
    <tr>
      <td><strong>Machine Translation</strong></td>
      <td><strong>Translating text between languages</strong></td>
      <td><strong>Google Translate, DeepL.</strong></td>
    </tr>
    <tr>
      <td><strong>Text Classification</strong></td>
      <td><strong>Assigning labels to text (e.g., spam, sentiment)</strong></td>
      <td><strong>Spam detection, sentiment analysis.</strong></td>
    </tr>
    <tr>
      <td><strong>Sentiment Analysis</strong></td>
      <td><strong>Determining emotional tone (positive, negative, neutral)</strong></td>
      <td><strong>Analyzing product reviews or tweets.</strong></td>
    </tr>
    <tr>
      <td><strong>Question Answering</strong></td>
      <td><strong>Providing precise answers to user queries</strong></td>
      <td><strong>Search engines, QA systems like Watson.</strong></td>
    </tr>
    <tr>
      <td><strong>Text Summarization</strong></td>
      <td><strong>Condensing long texts into concise summaries</strong></td>
      <td><strong>News summarization, document analysis.</strong></td>
    </tr>
    <tr>
      <td><strong>Speech-to-Text</strong></td>
      <td><strong>Converting spoken language to text</strong></td>
      <td><strong>Transcription services, voice assistants.</strong></td>
    </tr>
    <tr>
      <td><strong>Text Generation</strong></td>
      <td><strong>Creating human-like text</strong></td>
      <td><strong>AI writing tools, story generation.</strong></td>
    </tr>
  </tbody>
</table>

<h2>Emerging Applications:</h2>
<ul>
  <li><strong>Code Generation</strong>: Generating code from natural language prompts (e.g., GitHub Copilot).</li>
  <li><strong>Emotion Detection</strong>: Analyzing emotional states in text or speech.</li>
  <li><strong>Fake News Detection</strong>: Identifying misleading or false information.</li>
</ul>

</div>`
  }
};
