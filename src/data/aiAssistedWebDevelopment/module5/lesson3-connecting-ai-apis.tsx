import type { Lesson } from '@/types/course';

export const lesson3ConnectingAIAPIs: Lesson = {
  id: 3,
  title: 'Connecting AI APIs (OpenAI, HuggingFace, etc.)',
  duration: '40 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/L9VRxKT-hXc',
    textContent: `<div class="lesson-content">

<h1>Connecting AI APIs (OpenAI, HuggingFace, etc.)</h1>

<p><strong>Purpose</strong>: Integrate AI APIs to add advanced functionalities like chatbots or recommendation systems to web applications.</p>

<h2>Details</h2>

<h3>OpenAI API</h3>
<ul>
  <li><strong>Functionality</strong>: Adds natural language processing (e.g., chatbots, text generation) via models like GPT-4.</li>
  <li><strong>Integration</strong>:
    <ul>
      <li>Prompt AI to generate API integration code (e.g., "Integrate OpenAI API into Node.js for a chatbot").</li>
      <li>Example Output:
        <pre><code>const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);
async function getChatResponse(prompt) {
  const response = await openai.createChatCompletion({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }]
  });
  return response.data.choices[0].message.content;
}</code></pre>
      </li>
      <li>Example Use: Add a customer support chatbot to a Flask-based e-commerce site.</li>
    </ul>
  </li>
  <li><strong>Access</strong>: Available via api.openai.com (requires API key, pay-per-use pricing).</li>
</ul>

<h3>HuggingFace API</h3>
<ul>
  <li><strong>Functionality</strong>: Provides models for recommendation systems, text classification, or image processing.</li>
  <li><strong>Integration</strong>:
    <ul>
      <li>Prompt AI to generate integration code (e.g., "Add HuggingFace recommendation API to Django").</li>
      <li>Example Output:
        <pre><code>import requests
def get_recommendation(text):
    response = requests.post(
        'https://api-inference.huggingface.co/models/distilbert-base-uncased',
        headers={'Authorization': f'Bearer {HUGGINGFACE_API_KEY}'},
        json={'inputs': text}
    )
    return response.json()</code></pre>
      </li>
      <li>Example Use: Recommend products based on user input in a Node.js app.</li>
    </ul>
  </li>
  <li><strong>Access</strong>: Available via huggingface.co (free tier, paid plans for advanced models).</li>
</ul>

<h3>Other APIs</h3>
<ul>
  <li><strong>Google Cloud Natural Language</strong>: For sentiment analysis or entity recognition.</li>
  <li><strong>Microsoft Azure Cognitive Services</strong>: For text-to-speech or image analysis.</li>
  <li><strong>Grok API (xAI)</strong>: For conversational AI, accessible via x.ai/api (contact xAI for details).</li>
</ul>

<h3>Practical Examples</h3>
<ul>
  <li>A developer uses ChatGPT to integrate OpenAI's API into a Flask app, creating a chatbot for a travel site.</li>
  <li>A team uses Claude to add HuggingFace's recommendation model to a Node.js e-commerce API, suggesting products based on user searches.</li>
  <li>A freelancer uses Grok to generate code for a Django app with a sentiment analysis feature via Google Cloud API.</li>
</ul>

<h2>Tools</h2>
<ul>
  <li><strong>AI Assistants</strong>: ChatGPT, Claude, Grok for API integration code.</li>
  <li><strong>API Clients</strong>: Postman, Insomnia for testing API endpoints.</li>
  <li><strong>Dependencies</strong>: openai (Node.js), requests (Python), axios for HTTP requests.</li>
</ul>

<h2>Best Practices</h2>
<ul>
  <li>Secure API keys in environment variables (e.g., .env with OPENAI_API_KEY).</li>
  <li>Test API integrations in a sandbox environment to avoid rate limits or costs.</li>
  <li>Use AI to generate error handling (e.g., try/catch for API failures).</li>
  <li>Monitor API usage with tools like OpenAI's dashboard or HuggingFace's inference logs.</li>
</ul>

</div>`
  }
};
