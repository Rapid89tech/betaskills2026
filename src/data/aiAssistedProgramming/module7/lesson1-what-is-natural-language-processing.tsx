import type { Lesson } from '@/types/course';

export const lesson1WhatIsNaturalLanguageProcessing: Lesson = {
  id: 1,
  title: 'What is Natural Language Processing?',
  duration: '25 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=fLvJ8VdHLA0',
    textContent: `<div class="lesson-content">

<h1>What is Natural Language Processing?</h1>

<p><strong>Natural Language Processing (NLP) is a branch of Artificial Intelligence (AI) that focuses on enabling machines to understand, interpret, and generate human language. It combines computational linguistics, machine learning, and deep learning to process text and speech data, making it possible for computers to communicate with humans in natural language.</strong></p>

<h2>Key Characteristics:</h2>
<ul>
  <li><strong>Text Understanding</strong>: Analyzes and comprehends the meaning of written text.</li>
  <li><strong>Language Generation</strong>: Creates human-like text responses or content.</li>
  <li><strong>Context Awareness</strong>: Understands context, sarcasm, and nuances in language.</li>
  <li><strong>Multilingual Support</strong>: Processes multiple languages and dialects.</li>
</ul>

<h2>Challenges:</h2>
<ul>
  <li><strong>Ambiguity</strong>: Human language is complex, with sarcasm, idioms, or context-dependent meanings.</li>
  <li><strong>Multilingualism</strong>: Handling diverse languages and dialects requires robust models.</li>
  <li><strong>Data Requirements</strong>: Advanced NLP models need large, high-quality datasets.</li>
  <li><strong>Bias</strong>: Models can inherit biases from training data, affecting fairness.</li>
</ul>

<h2>Applications:</h2>
<ul>
  <li><strong>Chatbots and Virtual Assistants</strong>: Powering conversational AI like Siri, Alexa, or customer support bots.</li>
  <li><strong>Machine Translation</strong>: Translating languages (e.g., Google Translate).</li>
  <li><strong>Sentiment Analysis</strong>: Analyzing opinions in reviews or social media.</li>
  <li><strong>Text Summarization</strong>: Condensing articles or documents.</li>
  <li><strong>Question Answering</strong>: Providing precise answers to queries (e.g., search engines, QA systems).</li>
  <li><strong>Speech Recognition</strong>: Converting speech to text (e.g., transcription services).</li>
</ul>

</div>`
  }
};
