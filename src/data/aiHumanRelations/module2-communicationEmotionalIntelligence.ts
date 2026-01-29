
import type { Module } from '@/types/course';

export const module2CommunicationEmotionalIntelligence: Module = {
  id: 2,
  title: 'Communication and Emotional Intelligence',
  description: 'Explore AI in conversational interfaces, emotional detection, and the role of AI in therapy and mental health applications',
  lessons: [
    {
      id: 6,
      title: 'AI in Conversational Interfaces (Chatbots & Virtual Assistants)',
      duration: '35 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/tio8-1a0_KQ',
        textContent: `
          <div class="space-y-6">
            <h2 class="text-2xl font-bold text-blue-800 mb-4">AI in Conversational Interfaces (Chatbots & Virtual Assistants)</h2>
            
            <div class="bg-blue-50 p-4 rounded-lg">
              <h3 class="font-semibold text-blue-800 mb-2">Definition:</h3>
              <p class="text-blue-700 text-sm">
                Conversational interfaces are user interfaces that enable interaction between humans and machines through natural language, either text or voice. AI powers these systems to interpret, process, and respond to human communication effectively.
              </p>
            </div>

            <div class="bg-green-50 p-4 rounded-lg">
              <h3 class="font-semibold text-green-800 mb-2">Purpose:</h3>
              <p class="text-green-700 text-sm">
                To make digital systems more intuitive, efficient, and human-like in interaction—improving user engagement, support, and productivity.
              </p>
            </div>

            <h3 class="text-xl font-bold text-gray-800 mt-6 mb-4">Evolution of Conversational Interfaces</h3>
            
            <YouTubeVideoRenderer videoId="aijeWvQv6lE" title="Evolution of Conversational Interfaces" />
            
            <div class="overflow-x-auto">
              <table class="w-full text-sm border-collapse border border-gray-300">
                <thead>
                  <tr class="bg-gray-200">
                    <th class="border border-gray-300 p-2 text-left">Era</th>
                    <th class="border border-gray-300 p-2 text-left">Development</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="bg-white">
                    <td class="border border-gray-300 p-2 font-semibold">1960s</td>
                    <td class="border border-gray-300 p-2">ELIZA: First chatbot mimicking a psychotherapist (Joseph Weizenbaum)</td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="border border-gray-300 p-2 font-semibold">2000s</td>
                    <td class="border border-gray-300 p-2">Rule-based customer service bots & IVR systems</td>
                  </tr>
                  <tr class="bg-white">
                    <td class="border border-gray-300 p-2 font-semibold">2010s</td>
                    <td class="border border-gray-300 p-2">Rise of voice-based virtual assistants: Siri (2011), Alexa (2014), Google Assistant (2016)</td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="border border-gray-300 p-2 font-semibold">2020s</td>
                    <td class="border border-gray-300 p-2">AI-powered chatbots with NLP, sentiment analysis, and multi-language support</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 class="text-xl font-bold text-gray-800 mt-6 mb-4">Core Technologies Behind AI Conversational Interfaces</h3>
            
            <div class="space-y-4">
              <div class="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                <h4 class="font-semibold text-purple-800 mb-2">Natural Language Processing (NLP)</h4>
                <p class="text-purple-700 text-sm mb-2">Enables machines to understand, interpret, and generate human language.</p>
                <div class="text-purple-700 text-sm">
                  <strong>Key tasks:</strong>
                  <ul class="list-disc list-inside mt-1 space-y-1">
                    <li>Tokenization</li>
                    <li>Part-of-speech tagging</li>
                    <li>Named Entity Recognition</li>
                    <li>Sentiment analysis</li>
                    <li>Text generation</li>
                  </ul>
                </div>
              </div>

              <div class="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                <h4 class="font-semibold text-green-800 mb-2">Machine Learning (ML)</h4>
                
                <YouTubeVideoRenderer videoId="LXUFvufm4tY" title="Machine Learning (ML)" />
                <p class="text-green-700 text-sm mb-2">Allows chatbots/assistants to learn from interactions and improve responses over time.</p>
                <div class="text-green-700 text-sm">
                  <strong>Used in:</strong>
                  <ul class="list-disc list-inside mt-1 space-y-1">
                    <li>Intent recognition</li>
                    <li>Entity extraction</li>
                    <li>Response ranking</li>
                  </ul>
                </div>
              </div>

              <div class="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                <h4 class="font-semibold text-orange-800 mb-2">Speech Recognition & Synthesis (for voice assistants)</h4>
                
                <YouTubeVideoRenderer videoId="fpzxjZh3jf4" title="Speech Recognition & Synthesis (for voice assistants)" />
                <p class="text-orange-700 text-sm">
                  <strong>Automatic Speech Recognition (ASR):</strong> Converts speech to text<br>
                  <strong>Text-to-Speech (TTS):</strong> Converts AI responses to spoken words
                </p>
              </div>

              <div class="bg-teal-50 p-4 rounded-lg border-l-4 border-teal-500">
                <h4 class="font-semibold text-teal-800 mb-2">Dialog Management</h4>
                
                <YouTubeVideoRenderer videoId="FhDj_-QTIEE" title="Dialog Management" />
                <p class="text-teal-700 text-sm">Controls the flow of conversation. Ensures context retention, turn-taking, and logical transitions.</p>
              </div>
            </div>

            <h3 class="text-xl font-bold text-gray-800 mt-6 mb-4">Types of Conversational AI Systems</h3>
            
            <div class="grid md:grid-cols-3 gap-4">
              <div class="border rounded-lg p-4">
                <h4 class="font-semibold text-red-600 mb-2">Rule-Based Chatbots</h4>
                <ul class="text-sm text-gray-700 space-y-1">
                  <li>• Predefined responses using if-then logic</li>
                  <li>• Limited to specific use-cases</li>
                  <li>• Lack contextual awareness</li>
                </ul>
              </div>
              <div class="border rounded-lg p-4">
                <h4 class="font-semibold text-blue-600 mb-2">AI-Powered Chatbots</h4>
                <ul class="text-sm text-gray-700 space-y-1">
                  <li>• Use NLP and ML for dynamic responses</li>
                  <li>• Context-aware interactions</li>
                  <li>• Examples: ChatGPT, Meta's BlenderBot</li>
                </ul>
              </div>
              <div class="border rounded-lg p-4">
                <h4 class="font-semibold text-green-600 mb-2">Virtual Assistants</h4>
                
                <YouTubeVideoRenderer videoId="M2C-yFocLu0" title="Virtual Assistants" />
                <ul class="text-sm text-gray-700 space-y-1">
                  <li>• Combine speech, vision, planning</li>
                  <li>• Task performance capabilities</li>
                  <li>• Examples: Siri, Alexa, Google Assistant</li>
                </ul>
              </div>
            </div>

            <h3 class="text-xl font-bold text-gray-800 mt-6 mb-4">Applications of Conversational AI</h3>
            
            <div class="overflow-x-auto">
              <table class="w-full text-sm border-collapse border border-gray-300">
                <thead>
                  <tr class="bg-gray-200">
                    <th class="border border-gray-300 p-2 text-left">Domain</th>
                    <th class="border border-gray-300 p-2 text-left">Application</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="bg-white">
                    <td class="border border-gray-300 p-2 font-semibold">Customer Service</td>
                    <td class="border border-gray-300 p-2">24/7 support, order tracking, FAQs</td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="border border-gray-300 p-2 font-semibold">Healthcare</td>
                    <td class="border border-gray-300 p-2">Symptom checkers, mental health chatbots (e.g., Woebot)</td>
                  </tr>
                  <tr class="bg-white">
                    <td class="border border-gray-300 p-2 font-semibold">E-commerce</td>
                    <td class="border border-gray-300 p-2">Product recommendations, shopping assistance</td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="border border-gray-300 p-2 font-semibold">Banking</td>
                    <td class="border border-gray-300 p-2">Balance inquiries, fraud alerts, payment help</td>
                  </tr>
                  <tr class="bg-white">
                    <td class="border border-gray-300 p-2 font-semibold">Smart Homes</td>
                    <td class="border border-gray-300 p-2">Voice-activated controls for lights, appliances, etc.</td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="border border-gray-300 p-2 font-semibold">Education</td>
                    <td class="border border-gray-300 p-2">Virtual tutors, AI teaching assistants</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="grid md:grid-cols-2 gap-4 mt-6">
              <div class="bg-green-50 p-4 rounded-lg">
                <h4 class="font-semibold text-green-800 mb-2">Advantages:</h4>
                <ul class="text-green-700 text-sm space-y-1">
                  <li>• Availability: Operate 24/7 without fatigue</li>
                  <li>• Scalability: Handle thousands simultaneously</li>
                  <li>• Cost-efficiency: Reduce support team needs</li>
                  <li>• Consistency: Deliver uniform information</li>
                  <li>• Accessibility: Voice interfaces assist disabilities</li>
                </ul>
              </div>
              <div class="bg-red-50 p-4 rounded-lg">
                <h4 class="font-semibold text-red-800 mb-2">Limitations:</h4>
                <ul class="text-red-700 text-sm space-y-1">
                  <li>• Understanding context in complex conversations</li>
                  <li>• Accents and language diversity challenges</li>
                  <li>• Bias and misinformation risks</li>
                  <li>• Privacy concerns with sensitive data</li>
                  <li>• Limited emotional intelligence</li>
                </ul>
              </div>
            </div>

            <div class="bg-gray-100 p-4 rounded-lg mt-6">
              <h4 class="font-semibold text-gray-800 mb-2">Future Trends:</h4>
              <p class="text-gray-700 text-sm">
                Emotion-aware interfaces • Multimodal interactions (voice, text, gestures, visuals) • Hyper-personalization • AR/VR integration • Continuous learning capabilities
              </p>
            </div>
          </div>
        `
      }
    },
    {
      id: 7,
      title: 'Can AI Detect and Express Emotions?',
      duration: '30 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/egJ8oOqz4GE',
        textContent: `
          <div class="space-y-6">
            <h2 class="text-2xl font-bold text-blue-800 mb-4">Can AI Detect and Express Emotions?</h2>
            
            <div class="bg-blue-50 p-4 rounded-lg">
              <h3 class="font-semibold text-blue-800 mb-2">Affective Computing Definition:</h3>
              <p class="text-blue-700 text-sm">
                Affective computing is the branch of artificial intelligence that deals with the recognition, interpretation, and simulation of human emotions by machines.
              </p>
            </div>

            <div class="bg-green-50 p-4 rounded-lg">
              <h3 class="font-semibold text-green-800 mb-2">Purpose:</h3>
              <p class="text-green-700 text-sm">
                To enable more natural, empathetic, and effective interaction between humans and machines.
              </p>
            </div>

            <h3 class="text-xl font-bold text-gray-800 mt-6 mb-4">How Can AI Detect Emotions?</h3>
            
            <div class="space-y-4">
              <div class="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                <h4 class="font-semibold text-purple-800 mb-2">Facial Recognition</h4>
                <p class="text-purple-700 text-sm mb-2">AI analyzes facial expressions using computer vision.</p>
                <ul class="text-purple-700 text-sm space-y-1">
                  <li>• Based on Facial Action Coding System (FACS)</li>
                  <li>• Identifies emotions like happiness, anger, sadness</li>
                  <li>• Tools: Microsoft Azure Face API, Affectiva</li>
                </ul>
              </div>

              <div class="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                <h4 class="font-semibold text-orange-800 mb-2">Speech Analysis</h4>
                <p class="text-orange-700 text-sm mb-2">AI detects emotions from tone, pitch, speed, and pauses in speech (prosodic features).</p>
                <div class="text-orange-700 text-sm">
                  <strong>Examples:</strong>
                  <ul class="list-disc list-inside mt-1 space-y-1">
                    <li>Calm voice → relaxed</li>
                    <li>High pitch + fast pace → excitement or anxiety</li>
                  </ul>
                </div>
              </div>

              <div class="bg-teal-50 p-4 rounded-lg border-l-4 border-teal-500">
                <h4 class="font-semibold text-teal-800 mb-2">Text Analysis (Sentiment Analysis)</h4>
                <p class="text-teal-700 text-sm mb-2">AI uses Natural Language Processing (NLP) to interpret emotions in written communication.</p>
                <div class="text-teal-700 text-sm">
                  <strong>Analyzes:</strong>
                  <ul class="list-disc list-inside mt-1 space-y-1">
                    <li>Word choice</li>
                    <li>Syntax</li>
                    <li>Emojis</li>
                    <li>Punctuation</li>
                  </ul>
                </div>
              </div>

              <div class="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-500">
                <h4 class="font-semibold text-indigo-800 mb-2">Physiological Signals (Biometric Data)</h4>
                
                <YouTubeVideoRenderer videoId="AN51HaVtWxk" title="Physiological Signals (Biometric Data)" />
                <p class="text-indigo-700 text-sm mb-2">Wearable sensors detect:</p>
                <ul class="text-indigo-700 text-sm space-y-1">
                  <li>• Heart rate</li>
                  <li>• Skin conductance</li>
                  <li>• Eye movement</li>
                  <li>• Brain activity (EEG)</li>
                </ul>
                <p class="text-indigo-700 text-sm mt-2">Used in health, gaming, and driver monitoring systems.</p>
              </div>
            </div>

            <h3 class="text-xl font-bold text-gray-800 mt-6 mb-4">Accuracy and Challenges in Emotion Detection</h3>
            
            <div class="overflow-x-auto">
              <table class="w-full text-sm border-collapse border border-gray-300">
                <thead>
                  <tr class="bg-gray-200">
                    <th class="border border-gray-300 p-2 text-left">Challenge</th>
                    <th class="border border-gray-300 p-2 text-left">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="bg-white">
                    <td class="border border-gray-300 p-2 font-semibold">Ambiguity of expressions</td>
                    <td class="border border-gray-300 p-2">Same expression may reflect different emotions in different cultures or contexts</td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="border border-gray-300 p-2 font-semibold">Mixed emotions</td>
                    <td class="border border-gray-300 p-2">People often feel multiple emotions at once, hard to isolate</td>
                  </tr>
                  <tr class="bg-white">
                    <td class="border border-gray-300 p-2 font-semibold">Data privacy</td>
                    <td class="border border-gray-300 p-2">Emotion detection often requires sensitive personal data</td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="border border-gray-300 p-2 font-semibold">Cultural differences</td>
                    <td class="border border-gray-300 p-2">Expressions of emotions vary across cultures; training data may be biased</td>
                  </tr>
                  <tr class="bg-white">
                    <td class="border border-gray-300 p-2 font-semibold">Deception</td>
                    <td class="border border-gray-300 p-2">People may hide or fake emotions—hard for AI to detect intent</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 class="text-xl font-bold text-gray-800 mt-6 mb-4">Can AI Express Emotions?</h3>
            
            <div class="space-y-4">
              <div class="bg-yellow-50 p-4 rounded-lg">
                <h4 class="font-semibold text-yellow-800 mb-2">Text-Based Responses</h4>
                <p class="text-yellow-700 text-sm mb-2">AI generates responses with emotional tone using sentiment-aware language models.</p>
                <div class="text-yellow-700 text-sm">
                  <strong>Examples:</strong>
                  <ul class="list-disc list-inside mt-1 space-y-1">
                    <li>Neutral: "I understand."</li>
                    <li>Empathetic: "I'm really sorry to hear that. I hope things get better soon."</li>
                  </ul>
                </div>
              </div>

              <div class="bg-pink-50 p-4 rounded-lg">
                <h4 class="font-semibold text-pink-800 mb-2">Voice Modulation</h4>
                <p class="text-pink-700 text-sm">AI-generated voices can include variations in tone, pace, and inflection to simulate emotion.</p>
                <p class="text-pink-700 text-sm mt-1">Example: Soft tone for sympathy, cheerful tone for celebration.</p>
              </div>

              <div class="bg-cyan-50 p-4 rounded-lg">
                <h4 class="font-semibold text-cyan-800 mb-2">Avatars and Robotics</h4>
                
                <YouTubeVideoRenderer videoId="uXv1TEHX3CY" title="Avatars and Robotics" />
                <p class="text-cyan-700 text-sm">AI avatars and social robots use gestures, facial expressions, and postures to simulate empathy.</p>
                <p class="text-cyan-700 text-sm mt-1">Example: Pepper robot by SoftBank can smile, frown, and make eye contact.</p>
              </div>
            </div>

            <h3 class="text-xl font-bold text-gray-800 mt-6 mb-4">Applications of Emotionally Intelligent AI</h3>
            
            <div class="overflow-x-auto">
              <table class="w-full text-sm border-collapse border border-gray-300">
                <thead>
                  <tr class="bg-gray-200">
                    <th class="border border-gray-300 p-2 text-left">Field</th>
                    <th class="border border-gray-300 p-2 text-left">Use Case</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="bg-white">
                    <td class="border border-gray-300 p-2 font-semibold">Customer Support</td>
                    <td class="border border-gray-300 p-2">Empathetic bots that de-escalate angry customers</td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="border border-gray-300 p-2 font-semibold">Mental Health</td>
                    <td class="border border-gray-300 p-2">AI therapists (e.g., Woebot, Wysa) offer emotional support</td>
                  </tr>
                  <tr class="bg-white">
                    <td class="border border-gray-300 p-2 font-semibold">Education</td>
                    <td class="border border-gray-300 p-2">Adaptive tutors responding to student frustration or confusion</td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="border border-gray-300 p-2 font-semibold">Entertainment & Gaming</td>
                    <td class="border border-gray-300 p-2">Games that adapt based on player emotions</td>
                  </tr>
                  <tr class="bg-white">
                    <td class="border border-gray-300 p-2 font-semibold">Marketing</td>
                    <td class="border border-gray-300 p-2">Ads tailored to emotional responses of users</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="bg-red-100 p-4 rounded-lg mt-6">
              <h4 class="font-semibold text-red-800 mb-2">Ethical Considerations:</h4>
              <ul class="text-red-700 text-sm space-y-1">
                <li>• <strong>Consent:</strong> Should users know their emotions are being tracked?</li>
                <li>• <strong>Bias:</strong> Emotion detection models may favor certain groups over others</li>
                <li>• <strong>Manipulation:</strong> Risks of using emotion detection to manipulate consumer behavior</li>
                <li>• <strong>Mental Health Risk:</strong> Misinterpreting emotional states can have serious consequences</li>
                <li>• <strong>Data security:</strong> Emotional data is highly personal and must be protected</li>
              </ul>
            </div>

            <div class="bg-blue-100 p-4 rounded-lg mt-4">
              <h4 class="font-semibold text-blue-800 mb-2">The Future of Emotional AI:</h4>
              <p class="text-blue-700 text-sm">
                More multimodal systems • Emotionally adaptive AI • Personalization based on user patterns • Integration into daily life through wearables, cars, smart homes
              </p>
            </div>
          </div>
        `
      }
    },
    {
      id: 8,
      title: 'Limitations and Risks of AI in Emotional Contexts',
      duration: '25 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/nRAz_ej8sxg',
        textContent: `
          <div class="space-y-6">
            <h2 class="text-2xl font-bold text-blue-800 mb-4">Limitations and Risks of AI in Emotional Contexts</h2>
            
            <div class="bg-red-50 p-4 rounded-lg">
              <h3 class="font-semibold text-red-800 mb-2">Introduction:</h3>
              <p class="text-red-700 text-sm">
                AI systems are increasingly used in emotion-aware applications—from chatbots and virtual assistants to mental health tools and marketing. However, using AI in emotional contexts brings several limitations and ethical, technical, and societal risks that must be critically examined.
              </p>
            </div>

            <h3 class="text-xl font-bold text-gray-800 mt-6 mb-4">Key Limitations of AI in Emotional Contexts</h3>
            
            <div class="space-y-4">
              <div class="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                <h4 class="font-semibold text-yellow-800 mb-2">Lack of Genuine Emotion</h4>
                <ul class="text-yellow-700 text-sm space-y-1">
                  <li>• AI does not feel emotions—it only simulates or analyzes them based on data</li>
                  <li>• Emotional expression from AI is programmed, not experienced</li>
                  <li>• Impacts trust, authenticity, and relational depth in human-AI interaction</li>
                </ul>
              </div>

              <div class="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                <h4 class="font-semibold text-orange-800 mb-2">Context Insensitivity</h4>
                <ul class="text-orange-700 text-sm space-y-1">
                  <li>• Emotions are highly contextual, shaped by culture, background, and situation</li>
                  <li>• AI may misinterpret sarcasm, irony, or cultural nuances in emotional expression</li>
                  <li>• Example: A smile might mean joy in one culture and discomfort in another</li>
                </ul>
              </div>

              <div class="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                <h4 class="font-semibold text-purple-800 mb-2">Limited Multimodal Understanding</h4>
                <ul class="text-purple-700 text-sm space-y-1">
                  <li>• Advanced systems attempt to use multiple inputs (voice + facial expressions), but integration is often incomplete</li>
                  <li>• Emotion ambiguity: Same expression (e.g., crying) can signal joy or sorrow</li>
                  <li>• Noise, lighting, poor audio quality, or masked faces reduce accuracy</li>
                </ul>
              </div>

              <div class="bg-teal-50 p-4 rounded-lg border-l-4 border-teal-500">
                <h4 class="font-semibold text-teal-800 mb-2">Data Limitations and Bias</h4>
                
                <YouTubeVideoRenderer videoId="U-5PsgyGolY" title="Cultural and demographic bias" />
                
                <ul class="text-teal-700 text-sm space-y-1">
                  <li>• Emotion recognition models are trained on specific datasets, often lacking diversity</li>
                  <li>• Cultural and demographic bias: Misclassifying emotions based on skin tone, age, or gender</li>
                  <li>• Example: An angry Black face being misread more frequently than a white face</li>
                </ul>
              </div>
            </div>

            <h3 class="text-xl font-bold text-gray-800 mt-6 mb-4">Key Risks of Emotional AI</h3>
            
            <div class="space-y-4">
              <div class="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                <h4 class="font-semibold text-red-800 mb-2">Misdiagnosis and Emotional Harm</h4>
                <ul class="text-red-700 text-sm space-y-1">
                  <li>• Mental health tools may wrongly assess emotional states, leading to incorrect advice</li>
                  <li>• False positives/negatives in detecting depression, anxiety, or suicidal intent can have serious consequences</li>
                </ul>
              </div>

              <div class="bg-pink-50 p-4 rounded-lg border-l-4 border-pink-500">
                <h4 class="font-semibold text-pink-800 mb-2">Manipulation and Exploitation</h4>
                <ul class="text-pink-700 text-sm space-y-1">
                  <li>• Emotion detection can be used to manipulate user behavior, especially in:</li>
                  <li>• Marketing: Showing ads when users are emotionally vulnerable</li>
                  <li>• Politics: Influencing voters based on emotional profiling</li>
                  <li>• Raises concerns about autonomy and consent</li>
                </ul>
              </div>

              <div class="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-500">
                <h4 class="font-semibold text-indigo-800 mb-2">Loss of Privacy</h4>
                <ul class="text-indigo-700 text-sm space-y-1">
                  <li>• Emotion data is highly sensitive and intimate</li>
                  <li>• Sources: facial expressions, voice tone, heart rate, etc.</li>
                  <li>• Risks: Unauthorized surveillance, data misuse by corporations/governments, breaches leading to emotional profiling</li>
                </ul>
              </div>

              <div class="bg-cyan-50 p-4 rounded-lg border-l-4 border-cyan-500">
                <h4 class="font-semibold text-cyan-800 mb-2">Overreliance and Emotional Dependency</h4>
                <ul class="text-cyan-700 text-sm space-y-1">
                  <li>• People may become emotionally attached to AI systems that appear empathetic</li>
                  <li>• Risk of replacing human-to-human interaction with AI companionship</li>
                  <li>• Particularly concerning for vulnerable groups (children, elderly, mentally ill)</li>
                </ul>
              </div>

              <div class="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-500">
                <h4 class="font-semibold text-amber-800 mb-2">Ethical and Moral Ambiguity</h4>
                <ul class="text-amber-700 text-sm space-y-1">
                  <li>• Can a machine ethically respond to grief, trauma, or distress?</li>
                  <li>• Moral misjudgment: AI responding inappropriately to serious emotional events</li>
                  <li>• Lack of moral intuition can lead to cold, robotic, or even harmful responses</li>
                </ul>
              </div>

              <div class="bg-slate-50 p-4 rounded-lg border-l-4 border-slate-500">
                <h4 class="font-semibold text-slate-800 mb-2">Informed Consent and Transparency Issues</h4>
                
                <YouTubeVideoRenderer videoId="U-5PsgyGolY" title="Informed Consent and Transparency Issues" />
                <ul class="text-slate-700 text-sm space-y-1">
                  <li>• Users often don't know their emotions are being analyzed</li>
                  <li>• Terms of service may obscure emotional data collection</li>
                  <li>• Raises concerns over informed consent and user autonomy</li>
                </ul>
              </div>
            </div>

            <h3 class="text-xl font-bold text-gray-800 mt-6 mb-4">Real-World Examples</h3>
            
            <div class="overflow-x-auto">
              <table class="w-full text-sm border-collapse border border-gray-300">
                <thead>
                  <tr class="bg-gray-200">
                    <th class="border border-gray-300 p-2 text-left">Case</th>
                    <th class="border border-gray-300 p-2 text-left">Risk Involved</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="bg-white">
                    <td class="border border-gray-300 p-2 font-semibold">Facebook Emotion Study (2014)</td>
                    <td class="border border-gray-300 p-2">Emotional manipulation of users without consent</td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="border border-gray-300 p-2 font-semibold">HireVue AI Interviews</td>
                    <td class="border border-gray-300 p-2">Emotion detection in hiring—criticized for bias and accuracy</td>
                  </tr>
                  <tr class="bg-white">
                    <td class="border border-gray-300 p-2 font-semibold">AI Therapists like Woebot</td>
                    <td class="border border-gray-300 p-2">Helpful for some, but not a substitute for licensed professionals</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 class="text-xl font-bold text-gray-800 mt-6 mb-4">How to Mitigate These Risks</h3>
            
            <div class="overflow-x-auto">
              <table class="w-full text-sm border-collapse border border-gray-300">
                <thead>
                  <tr class="bg-gray-200">
                    <th class="border border-gray-300 p-2 text-left">Strategy</th>
                    <th class="border border-gray-300 p-2 text-left">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="bg-white">
                    <td class="border border-gray-300 p-2 font-semibold">Human-in-the-loop</td>
                    <td class="border border-gray-300 p-2">Ensure AI responses are supervised or validated by humans</td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="border border-gray-300 p-2 font-semibold">Bias audits</td>
                    <td class="border border-gray-300 p-2">Regularly test systems for demographic fairness</td>
                  </tr>
                  <tr class="bg-white">
                    <td class="border border-gray-300 p-2 font-semibold">Data minimization</td>
                    <td class="border border-gray-300 p-2">Collect only essential emotional data</td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="border border-gray-300 p-2 font-semibold">Explainability</td>
                    <td class="border border-gray-300 p-2">Make AI decision processes transparent</td>
                  </tr>
                  <tr class="bg-white">
                    <td class="border border-gray-300 p-2 font-semibold">Ethical design principles</td>
                    <td class="border border-gray-300 p-2">Center user rights, safety, and dignity in system design</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="bg-gray-100 p-4 rounded-lg mt-6">
              <h4 class="font-semibold text-gray-800 mb-2">Summary:</h4>
              <p class="text-gray-700 text-sm">
                AI in emotional contexts holds promise for improved interaction and support, but faces significant technical, ethical, and societal challenges. Limitations include lack of true emotion, context blindness, and data bias. Risks involve emotional manipulation, privacy invasion, overdependence, and misjudgment. A multi-stakeholder approach—involving technologists, ethicists, regulators, and users—is essential to ensure safe and responsible use.
              </p>
            </div>
          </div>
        `
      }
    },
    {
      id: 9,
      title: 'AI Tools in Therapy and Mental Health',
      duration: '40 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/p1VpvSDNLJ8',
        textContent: `
          <div class="space-y-6">
            <h2 class="text-2xl font-bold text-blue-800 mb-4">AI Tools in Therapy and Mental Health</h2>
            
            <div class="bg-blue-50 p-4 rounded-lg">
              <h3 class="font-semibold text-blue-800 mb-2">Introduction:</h3>
              <p class="text-blue-700 text-sm">
                Artificial Intelligence (AI) is playing a growing role in mental health care, from early diagnosis to digital therapy and patient support. These tools aim to increase access, affordability, and personalization of mental health services, especially in underserved areas or populations.
              </p>
            </div>

            <h3 class="text-xl font-bold text-gray-800 mt-6 mb-4">Types of AI Tools in Mental Health</h3>
            
            <YouTubeVideoRenderer videoId="eOqzSTcgdrc" title="Types of AI Tools in Mental Health" />
            
            <div class="space-y-4">
              <div class="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                <h4 class="font-semibold text-green-800 mb-2">Chatbots and Virtual Therapists</h4>
                <p class="text-green-700 text-sm mb-2"><strong>Examples:</strong> Woebot, Wysa, Tess, Replika</p>
                <ul class="text-green-700 text-sm space-y-1">
                  <li>• Use natural language processing (NLP) to simulate conversation</li>
                  <li>• Deliver CBT (Cognitive Behavioral Therapy) principles</li>
                  <li>• Offer 24/7 support for stress, anxiety, depression, and emotional regulation</li>
                </ul>
                <div class="mt-2">
                  <strong class="text-green-800">Benefits:</strong>
                  <ul class="text-green-700 text-sm space-y-1 mt-1">
                    <li>• Anonymous interaction</li>
                    <li>• Scalable and low-cost</li>
                    <li>• Reduces stigma by avoiding human contact</li>
                  </ul>
                </div>
              </div>

              <div class="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                <h4 class="font-semibold text-purple-800 mb-2">Sentiment and Emotion Analysis</h4>
                
                <YouTubeVideoRenderer videoId="AjAr9X3i2I0" title="Sentiment and Emotion Analysis" />
                <ul class="text-purple-700 text-sm space-y-1">
                  <li>• Analyzes text, voice, or facial data to detect emotional state</li>
                  <li>• Used in screening and monitoring mood over time</li>
                  <li>• Tools can alert clinicians to early signs of: Depression, Anxiety, Suicidal ideation</li>
                </ul>
              </div>

              <div class="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                <h4 class="font-semibold text-orange-800 mb-2">AI-Driven Mental Health Apps</h4>
                
                <YouTubeVideoRenderer videoId="zUTrPctBjJY" title="AI-Driven Mental Health Apps" />
                <p class="text-orange-700 text-sm mb-2"><strong>Examples:</strong> Youper, Mindstrong, Ginger</p>
                <ul class="text-orange-700 text-sm space-y-1">
                  <li>• Apps with integrated AI for personalized therapy plans</li>
                  <li>• Mood tracking and journaling features</li>
                  <li>• Use user input and behavior data to adapt content and recommend coping strategies</li>
                </ul>
              </div>

              <div class="bg-teal-50 p-4 rounded-lg border-l-4 border-teal-500">
                <h4 class="font-semibold text-teal-800 mb-2">Predictive Analytics and Risk Assessment</h4>
                <ul class="text-teal-700 text-sm space-y-1">
                  <li>• AI models trained to predict: Suicide risk, Self-harm likelihood, Hospitalization needs</li>
                  <li>• Used in clinical settings (e.g., emergency rooms, psychiatric hospitals)</li>
                </ul>
              </div>

              <div class="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-500">
                <h4 class="font-semibold text-indigo-800 mb-2">VR and AR Therapies with AI Integration</h4>
                <ul class="text-indigo-700 text-sm space-y-1">
                  <li>• Virtual reality (VR) tools enhanced by AI for: Phobia treatment, PTSD exposure therapy, Social anxiety scenarios</li>
                  <li>• AI personalizes the experience and adjusts based on user feedback</li>
                </ul>
              </div>

              <div class="bg-pink-50 p-4 rounded-lg border-l-4 border-pink-500">
                <h4 class="font-semibold text-pink-800 mb-2">Digital Companions and Emotional Support AI</h4>
                <ul class="text-pink-700 text-sm space-y-1">
                  <li>• AI avatars that simulate empathetic interaction</li>
                  <li>• Not clinical tools but offer emotional companionship (e.g., Replika)</li>
                  <li>• Used by people with loneliness, autism, or social anxiety</li>
                </ul>
              </div>
            </div>

            <h3 class="text-xl font-bold text-gray-800 mt-6 mb-4">Benefits of AI in Therapy and Mental Health</h3>
            
            <div class="overflow-x-auto">
              <table class="w-full text-sm border-collapse border border-gray-300">
                <thead>
                  <tr class="bg-gray-200">
                    <th class="border border-gray-300 p-2 text-left">Benefit</th>
                    <th class="border border-gray-300 p-2 text-left">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="bg-white">
                    <td class="border border-gray-300 p-2 font-semibold">Accessibility</td>
                    <td class="border border-gray-300 p-2">Reduces barriers (cost, stigma, location) to therapy access</td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="border border-gray-300 p-2 font-semibold">Scalability</td>
                    <td class="border border-gray-300 p-2">AI can support millions simultaneously—ideal for large populations</td>
                  </tr>
                  <tr class="bg-white">
                    <td class="border border-gray-300 p-2 font-semibold">Consistency</td>
                    <td class="border border-gray-300 p-2">No emotional fatigue or variation between sessions</td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="border border-gray-300 p-2 font-semibold">Early Detection</td>
                    <td class="border border-gray-300 p-2">Identifies subtle behavioral changes for proactive intervention</td>
                  </tr>
                  <tr class="bg-white">
                    <td class="border border-gray-300 p-2 font-semibold">Personalization</td>
                    <td class="border border-gray-300 p-2">Adapts to user preferences, language, and emotional patterns over time</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 class="text-xl font-bold text-gray-800 mt-6 mb-4">Limitations and Challenges</h3>
            
            <div class="space-y-4">
              <div class="bg-red-50 p-4 rounded-lg">
                <h4 class="font-semibold text-red-800 mb-2">Lack of Human Empathy and Intuition</h4>
                <ul class="text-red-700 text-sm space-y-1">
                  <li>• AI cannot replicate the emotional attunement and therapeutic presence of a human therapist</li>
                  <li>• May miss non-verbal cues, sarcasm, or deep trauma disclosures</li>
                </ul>
              </div>

              <div class="bg-orange-50 p-4 rounded-lg">
                <h4 class="font-semibold text-orange-800 mb-2">Diagnostic Inaccuracy</h4>
                <ul class="text-orange-700 text-sm space-y-1">
                  <li>• Risk of false positives or negatives in emotion detection and mental health screening</li>
                  <li>• Over-reliance can lead to incorrect self-assessment or false reassurance</li>
                </ul>
              </div>

              <div class="bg-purple-50 p-4 rounded-lg">
                <h4 class="font-semibold text-purple-800 mb-2">Data Privacy and Security Concerns</h4>
                <ul class="text-purple-700 text-sm space-y-1">
                  <li>• Mental health data is highly sensitive</li>
                  <li>• Concerns over: Third-party data sharing, Consent clarity, Data breaches</li>
                </ul>
              </div>

              <div class="bg-yellow-50 p-4 rounded-lg">
                <h4 class="font-semibold text-yellow-800 mb-2">Ethical and Legal Issues</h4>
                <ul class="text-yellow-700 text-sm space-y-1">
                  <li>• Who is accountable for AI-generated advice?</li>
                  <li>• Can chatbots legally intervene in crises?</li>
                  <li>• Blurred lines between clinical tools and consumer products</li>
                </ul>
              </div>

              <div class="bg-teal-50 p-4 rounded-lg">
                <h4 class="font-semibold text-teal-800 mb-2">Digital Divide</h4>
                <ul class="text-teal-700 text-sm space-y-1">
                  <li>• Access to AI tools requires smartphones, internet, and digital literacy</li>
                  <li>• May exclude older adults, low-income users, or those in rural areas</li>
                </ul>
              </div>
            </div>

            <h3 class="text-xl font-bold text-gray-800 mt-6 mb-4">Case Studies / Real-World Applications</h3>
            
            <div class="overflow-x-auto">
              <table class="w-full text-sm border-collapse border border-gray-300">
                <thead>
                  <tr class="bg-gray-200">
                    <th class="border border-gray-300 p-2 text-left">Tool/App</th>
                    <th class="border border-gray-300 p-2 text-left">Key Features</th>
                    <th class="border border-gray-300 p-2 text-left">Outcome</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="bg-white">
                    <td class="border border-gray-300 p-2 font-semibold">Woebot</td>
                    <td class="border border-gray-300 p-2">CBT-based chatbot, mood tracking</td>
                    <td class="border border-gray-300 p-2">Studies show reduced depression and anxiety symptoms</td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="border border-gray-300 p-2 font-semibold">Mindstrong</td>
                    <td class="border border-gray-300 p-2">Smartphone behavior analysis</td>
                    <td class="border border-gray-300 p-2">Predicts relapse in mental health disorders</td>
                  </tr>
                  <tr class="bg-white">
                    <td class="border border-gray-300 p-2 font-semibold">Ginger</td>
                    <td class="border border-gray-300 p-2">On-demand mental health coaching + AI triage</td>
                    <td class="border border-gray-300 p-2">Scales care and matches users with support based on AI insights</td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="border border-gray-300 p-2 font-semibold">Ellie (DARPA-funded)</td>
                    <td class="border border-gray-300 p-2">Virtual human for PTSD screening in veterans</td>
                    <td class="border border-gray-300 p-2">Successfully elicits more truthful responses than human therapists</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="bg-green-100 p-4 rounded-lg mt-6">
              <h4 class="font-semibold text-green-800 mb-2">Guidelines for Responsible Use - Best Practices:</h4>
              <ul class="text-green-700 text-sm space-y-1">
                <li>• Involve clinicians in AI system design</li>
                <li>• Conduct bias audits and ongoing validation</li>
                <li>• Ensure data transparency and consent</li>
                <li>• Limit AI to support, not replace, human care</li>
                <li>• Comply with HIPAA, GDPR, and other health data regulations</li>
              </ul>
            </div>

            <div class="bg-blue-100 p-4 rounded-lg mt-4">
              <h4 class="font-semibold text-blue-800 mb-2">Future Directions:</h4>
              <p class="text-blue-700 text-sm">
                Hybrid models combining AI tools and human therapists • Emotionally adaptive systems that adjust tone or content in real time • AI used for population-level mental health monitoring • Potential use in preventive care and peer support networks
              </p>
            </div>

            <div class="bg-gray-100 p-4 rounded-lg mt-4">
              <h4 class="font-semibold text-gray-800 mb-2">Summary:</h4>
              <p class="text-gray-700 text-sm">
                AI in mental health is not a substitute, but a supplement to traditional therapy. It offers scalable, low-cost, and accessible support, especially for mild-to-moderate issues. However, it must be used with caution, transparency, and human oversight to avoid ethical, emotional, and clinical pitfalls.
              </p>
            </div>
          </div>
        `
      }
    },
    {
      id: 10,
      title: 'Module 2 Quiz: Communication and Emotional Intelligence',
      duration: '15 min',
      type: 'quiz',
      content: {
        questions: [
          {
            question: 'What is the primary purpose of AI-powered conversational interfaces?',
            options: [
              'To replace human communication',
              'To store large data sets',
              'To enable intuitive and efficient human-machine interaction',
              'To build websites automatically'
            ],
            correct: 2,
            explanation: 'AI-powered conversational interfaces are designed to make digital systems more intuitive, efficient, and human-like in interaction, improving user engagement, support, and productivity.'
          },
          {
            question: 'Which early chatbot developed in the 1960s simulated a psychotherapist?',
            options: [
              'Siri',
              'ELIZA',
              'Woebot',
              'Replika'
            ],
            correct: 1,
            explanation: 'ELIZA, developed by Joseph Weizenbaum in the 1960s, was one of the first chatbots and simulated a psychotherapist using simple pattern matching.'
          },
          {
            question: 'What core technology enables conversational interfaces to understand and generate human language?',
            options: [
              'Image recognition',
              'Data mining',
              'Natural Language Processing (NLP)',
              'Blockchain'
            ],
            correct: 2,
            explanation: 'Natural Language Processing (NLP) is the core technology that enables machines to understand, interpret, and generate human language in conversational interfaces.'
          },
          {
            question: 'Which of the following tasks is not typically associated with NLP in conversational AI?',
            options: [
              'Named Entity Recognition',
              'Image segmentation',
              'Tokenization',
              'Sentiment analysis'
            ],
            correct: 1,
            explanation: 'Image segmentation is a computer vision task, not an NLP task. NLP focuses on language-related tasks like tokenization, named entity recognition, and sentiment analysis.'
          },
          {
            question: 'What is a key difference between rule-based and AI-powered chatbots?',
            options: [
              'Rule-based bots can speak multiple languages',
              'AI-powered bots use if-then logic exclusively',
              'Rule-based bots cannot learn or adapt',
              'AI-powered bots are only used in gaming'
            ],
            correct: 2,
            explanation: 'Rule-based chatbots use predefined if-then logic and cannot learn or adapt, while AI-powered chatbots use machine learning to improve and adapt their responses over time.'
          },
          {
            question: 'Which virtual assistant was introduced in 2014?',
            options: [
              'Google Assistant',
              'Alexa',
              'Siri',
              'Bixby'
            ],
            correct: 1,
            explanation: 'Amazon\'s Alexa was introduced in 2014, while Siri came in 2011, Google Assistant in 2016, and Bixby later.'
          },
          {
            question: 'What does Dialog Management do in a conversational AI system?',
            options: [
              'Designs the user interface',
              'Controls the visual layout of apps',
              'Manages the flow and context of a conversation',
              'Stores all user data permanently'
            ],
            correct: 2,
            explanation: 'Dialog Management controls the flow of conversation, ensuring context retention, turn-taking, and logical transitions in conversational AI systems.'
          },
          {
            question: 'Which of the following is not a common challenge in conversational AI?',
            options: [
              '24/7 availability',
              'Understanding long contextual threads',
              'Accents and dialect recognition',
              'Bias in training data'
            ],
            correct: 0,
            explanation: '24/7 availability is actually an advantage of conversational AI, not a challenge. The challenges include understanding context, accent recognition, and bias in training data.'
          },
          {
            question: 'Why are conversational interfaces useful in healthcare?',
            options: [
              'They replace doctors entirely',
              'They improve hardware performance',
              'They provide symptom checkers and mental health support',
              'They handle medical billing'
            ],
            correct: 2,
            explanation: 'Conversational interfaces in healthcare are useful for providing symptom checkers, mental health support, and patient assistance, but they supplement rather than replace medical professionals.'
          },
          {
            question: 'Which ethical principle requires that users be informed they are interacting with a bot?',
            options: [
              'Scalability',
              'Transparency',
              'Dialog Management',
              'Personalization'
            ],
            correct: 1,
            explanation: 'Transparency is the ethical principle that requires users to know when they are interacting with a bot rather than a human, ensuring informed consent and trust.'
          }
        ]
      }
    }
  ]
};
