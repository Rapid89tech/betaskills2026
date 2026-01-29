
import type { Module } from '@/types/course';

export const module1FoundationsOfAI: Module = {
  id: 1,
  title: 'Foundations of AI and Human Interaction',
  description: 'Learn the fundamentals of artificial intelligence, its history, types, and how it interacts with humans',
  lessons: [
    {
      id: 1,
      title: 'What is AI? Types and Capabilities',
      duration: '25 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/ad79nYk2keg',
        textContent: `
## 🤖 Introduction to Artificial Intelligence (AI)

### 📺 Educational Videos

<YouTubeVideoRenderer videoId="TZmVLNGUX4M" title="Introduction to Artificial Intelligence (AI)" />

🎯 **Definition of AI:** Artificial Intelligence (AI) is a branch of computer science that focuses on creating systems capable of performing tasks that typically require human intelligence. These tasks include reasoning, learning, problem-solving, perception, language understanding, and decision-making.

## 📚 Historical Background

<YouTubeVideoRenderer videoId="zExHlzp6p-4" title="Historical Background" />

🎯 **Key Characteristics of AI:**
- 👁️ **Perception** (e.g., vision, speech)
- 🧠 **Reasoning** (logical inference)
- 📖 **Learning** from data
- 🌍 **Interaction** with the environment
- ⚡ **Autonomy** in decision-making

🎯 **Historical Milestones:**
- ⏰ **1950**: Alan Turing proposes the Turing Test
- 🏷️ **1956**: Term "Artificial Intelligence" coined
- 🔬 **1980s-2000s**: Expert systems emerge
- 🚀 **2010s-Present**: Deep learning revolution

## 🤖 Types of AI

<YouTubeVideoRenderer videoId="nZ7c9ScclKs" title="Types of AI" />

### 🎯 Narrow AI (Weak AI)
AI systems designed to perform a single specific task.

**Examples:** Siri, Alexa, Google Translate, Spam filters
**Limitations:** Cannot perform tasks outside its specific domain.

### 🧠 General AI (Strong AI)

<YouTubeVideoRenderer videoId="LhLyOWoUnDI" title="General AI (Strong AI)" />

Theoretical AI that can perform any intellectual task a human can do.

**Characteristics:** Full cognitive abilities, flexible and adaptable
**Status:** Still under research; not yet achieved

### ⚡ Super AI

<YouTubeVideoRenderer videoId="c4c6P3Y790c" title="Super AI" />

Hypothetical AI that surpasses human intelligence in all aspects.

**Potential:** Problem-solving beyond human capacity, creative thinking
**Status:** Exists only in theory; significant ethical concerns

### 🔍 Self-Aware AI

<YouTubeVideoRenderer videoId="2FM-dM8NTWE" title="Self-Aware AI" />

### 🎓 Expert Systems

<YouTubeVideoRenderer videoId="baNa-6JXbbk" title="Expert Systems" />

## 🌍 Real-World Applications of AI

<YouTubeVideoRenderer videoId="tHHHYRLXGi4" title="Real-World Applications of AI" />

🎯 **Core Capabilities of AI:**
- 🤖 **Machine Learning (ML)**: Systems that learn from data and improve over time
- 💬 **Natural Language Processing**: Enables AI to understand and generate human language
- 👁️ **Computer Vision**: AI systems that interpret and understand visual inputs
- 🦾 **Robotics**: Integration of AI with mechanical systems

🎯 **Real-World Applications:**
- 🏥 **Healthcare** diagnostics
- 💰 **Financial** fraud detection
- 🚗 **Autonomous** vehicles
- 🎬 **Entertainment** recommendations
- 💬 **Customer service** chatbots
- 🏭 **Manufacturing** optimization
        `
      }
    },
    {
      id: 2,
      title: 'Human-AI Interaction: History and Evolution',
      duration: '30 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/6Zwrng_rQNY',
        textContent: `
## 🤝 Human-AI Interaction: History and Evolution

### 📺 Educational Videos

## 📜 Historical Timeline of Human-AI Interaction

<YouTubeVideoRenderer videoId="5gGIPkzCTqI" title="Historical Timeline of Human-AI Interaction" />

🎯 **Definition:** Human-AI Interaction refers to the ways in which humans and artificial intelligence systems communicate, collaborate, and influence each other.

### 💻 Interface-Centered Interaction (1980s–1990s)

<YouTubeVideoRenderer videoId="HuxHprgVB_E" title="Interface-Centered Interaction (1980s–1990s)" />

🎯 **Key developments:**
- 🖥️ **Focus** on Human-Computer Interaction (HCI)
- 🎨 **Graphical** user interfaces (GUIs) and usability
- 🗣️ **Early** natural language processing improvements
- 🤖 **AI-powered** industrial robotics emerges

### 🌐 Web and Data-Driven AI (2000s)

<YouTubeVideoRenderer videoId="GSQj27ps854" title="Web and Data-Driven AI (2000s)" />

🎯 **Key developments:**
- 🔍 **Rise** of search engines and recommender systems
- 🎯 **AI-driven** personalization (Google, Amazon)
- 🎤 **Speech** interfaces and voice recognition
- 👁️ **Indirect** interaction through behavior tracking

### 🤖 Intelligent Agents and Assistants (2010s–Present)

<YouTubeVideoRenderer videoId="NdX2LtB8Xmk" title="Intelligent Agents and Assistants (2010s–Present)" />

🎯 **Key developments:**
- 📱 **Mainstream** AI assistants (Siri, Alexa, Google Assistant)
- 🗣️ **Voice-based** interaction becomes popular
- 💬 **Chatbots** in customer service and education
- 📱 **AI curates** social media content

### 🌟 Embodied AI and Multimodal Interfaces (2020s–Present)

<YouTubeVideoRenderer videoId="VTd2AG-lEIM" title="Embodied AI and Multimodal Interfaces (2020s–Present)" />

🎯 **Key developments:**
- 🏠 **Smart homes** and autonomous vehicles
- 🤹 **Multimodal** interaction (speech, gesture, touch)
- 😊 **Emotion AI** and affective computing
- ❤️ **Enhanced** empathy and personalization

## 📊 Dimensions of Human-AI Interaction

<YouTubeVideoRenderer videoId="-ofd4ew25aI" title="Dimensions of Human-AI Interaction" />

🎯 **Core Dimensions:**
- 💬 **Communication**: Voice, text, visual cues, haptics
- 🎮 **Control**: Manual vs. autonomous systems
- 🔍 **Trust & Transparency**: Explainable AI helps users understand decisions
- 🤝 **Collaboration**: Humans and AI working together creatively

## 🚧 Key Challenges in Human-AI Interaction

<YouTubeVideoRenderer videoId="F3ClCAFeMuQ" title="Key Challenges in Human-AI Interaction" />

🎯 **Evolution of Human Roles:**
From Programmer/Tester → Operator → Passive User → Conversational Partner → Collaborative Partner
        `
      }
    },
    {
      id: 3,
      title: 'Differences Between Human and Machine Intelligence',
      duration: '20 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/FN4RzzSjd3c',
        textContent: `
          <div class="space-y-6">
            <h2 class="text-2xl font-bold text-blue-800 mb-4">Differences Between Human and Machine Intelligence</h2>
            
            <div class="grid md:grid-cols-2 gap-4 mb-6">
              <div class="bg-green-50 p-4 rounded-lg">
                <h3 class="font-semibold text-green-800 mb-2">Human Intelligence</h3>
                <p class="text-green-700 text-sm">The cognitive ability of humans to learn, reason, solve problems, adapt to new situations, and understand complex concepts through emotion, experience, and consciousness.</p>
              </div>
              <div class="bg-blue-50 p-4 rounded-lg">
                <h3 class="font-semibold text-blue-800 mb-2">Machine Intelligence</h3>
                <p class="text-blue-700 text-sm">The ability of machines to simulate human-like intelligence by processing data, identifying patterns, and making decisions based on algorithms and models.</p>
              </div>
            </div>

            <h3 class="text-xl font-bold text-gray-800 mb-4">Core Differences Comparison</h3>
            
            <div class="overflow-x-auto">
              <table class="w-full text-sm border-collapse border border-gray-300">
                <thead>
                  <tr class="bg-gray-200">
                    <th class="border border-gray-300 p-2 text-left">Aspect</th>
                    <th class="border border-gray-300 p-2 text-left">Human Intelligence</th>
                    <th class="border border-gray-300 p-2 text-left">Machine Intelligence</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="bg-white">
                    <td class="border border-gray-300 p-2 font-semibold">Origin</td>
                    <td class="border border-gray-300 p-2">Biological, evolved through evolution</td>
                    <td class="border border-gray-300 p-2">Artificial, created by humans</td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="border border-gray-300 p-2 font-semibold">Learning</td>
                    <td class="border border-gray-300 p-2">Experiential, emotional, contextual</td>
                    <td class="border border-gray-300 p-2">Data-driven, algorithmic</td>
                  </tr>
                  <tr class="bg-white">
                    <td class="border border-gray-300 p-2 font-semibold">Thinking</td>
                    <td class="border border-gray-300 p-2">Intuitive, abstract, creative</td>
                    <td class="border border-gray-300 p-2">Logical, rule-based, statistical</td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="border border-gray-300 p-2 font-semibold">Memory</td>
                    <td class="border border-gray-300 p-2">Limited but associative</td>
                    <td class="border border-gray-300 p-2">Vast, precise, non-associative</td>
                  </tr>
                  <tr class="bg-white">
                    <td class="border border-gray-300 p-2 font-semibold">Emotions</td>
                    <td class="border border-gray-300 p-2">Has genuine emotions and empathy</td>
                    <td class="border border-gray-300 p-2">Can simulate emotion based on input</td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="border border-gray-300 p-2 font-semibold">Consciousness</td>
                    <td class="border border-gray-300 p-2">Self-aware with subjective experience</td>
                    <td class="border border-gray-300 p-2">No consciousness or awareness</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="grid md:grid-cols-2 gap-4 mt-6">
              <div class="bg-green-50 p-4 rounded-lg">
                <h4 class="font-semibold text-green-800 mb-2">Human Intelligence Strengths:</h4>
                <ul class="text-green-700 text-sm space-y-1">
                  <li>• Emotional understanding and empathy</li>
                  <li>• Ethical reasoning</li>
                  <li>• Creative and original thinking</li>
                  <li>• Flexibility in uncertain situations</li>
                  <li>• Understanding context and nuance</li>
                </ul>
              </div>
              <div class="bg-blue-50 p-4 rounded-lg">
                <h4 class="font-semibold text-blue-800 mb-2">Machine Intelligence Strengths:</h4>
                <ul class="text-blue-700 text-sm space-y-1">
                  <li>• Speed and accuracy in computation</li>
                  <li>• Handling large volumes of data</li>
                  <li>• Consistency without fatigue</li>
                  <li>• High performance in narrow tasks</li>
                  <li>• 24/7 operation capability</li>
                </ul>
              </div>
            </div>

            <h3 class="text-xl font-bold text-gray-800 mt-6 mb-4">Areas of Convergence and Collaboration</h3>
            
            <div class="space-y-3">
              <div class="bg-purple-50 p-3 rounded-lg">
                <h4 class="font-semibold text-purple-800">Human-in-the-loop systems</h4>
                <p class="text-purple-700 text-sm">Combine human judgment with machine efficiency</p>
              </div>
              <div class="bg-orange-50 p-3 rounded-lg">
                <h4 class="font-semibold text-orange-800">Augmented intelligence</h4>
                <p class="text-orange-700 text-sm">AI enhances human decision-making rather than replacing it</p>
              </div>
              <div class="bg-teal-50 p-3 rounded-lg">
                <h4 class="font-semibold text-teal-800">Collaborative creativity</h4>
                <p class="text-teal-700 text-sm">Humans guide AI-generated content in writing, design, and art</p>
              </div>
            </div>

            <div class="bg-gray-100 p-4 rounded-lg mt-6">
              <h4 class="font-semibold text-gray-800 mb-2">Key Takeaway:</h4>
              <p class="text-gray-700 text-sm">The goal is not to replace human intelligence but to build AI systems that complement and support human capabilities, combining the best of both worlds.</p>
            </div>
          </div>
        `
      }
    },
    {
      id: 4,
      title: 'Overview of AI Applications in Human Relations',
      duration: '35 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/gWmRkYsLzB4',
        textContent: `
## 🌟 Overview of AI Applications in Human Relations

### 📺 Educational Videos

## 🔑 Key Domains of AI in Human Relations

<YouTubeVideoRenderer videoId="-F2NZhT4Tuc" title="Key Domains of AI in Human Relations" />

🎯 **Definition:** Artificial Intelligence in human relations refers to the use of intelligent systems and technologies to enhance, automate, or support interpersonal interactions and human resource functions in organizations and society.

### 💬 Communication and Collaboration

<YouTubeVideoRenderer videoId="3px-wOHsrLQ" title="Communication and Collaboration" />

### 📚 Learning and Development (L&D)

<YouTubeVideoRenderer videoId="qO8D_xZZ0rk" title="Learning and Development (L&D)" />

### 🌈 Diversity, Equity, and Inclusion (DEI)

<YouTubeVideoRenderer videoId="qGTbGOXCnPo" title="Diversity, Equity, and Inclusion (DEI)" />

## 🏢 Human Resource Management (HRM)
🎯 **Key Applications:**
- 👥 **Recruitment and Hiring**: AI screens resumes, assesses candidate fit, schedules interviews
- 🎓 **Employee Onboarding**: Virtual assistants help orientation and personalized training
- 📈 **Performance Management**: Predictive analytics for productivity and engagement
- 💚 **Employee Well-being**: AI monitors sentiment and offers support

## 💬 Communication and Collaboration Tools
🎯 **Key Applications:**
- 🤖 **Virtual Assistants & Chatbots**: Customer service, HR queries, administrative support
- 📅 **Meeting Management**: AI scheduling, email prioritization, calendar management
- 🌍 **Translation Services**: Breaking language barriers in multinational teams

## 📚 Learning and Development (L&D)
🎯 **Key Applications:**
- 🎯 **Personalized Learning**: AI assesses skill gaps and recommends tailored courses
- 🤝 **AI Coaching**: Virtual mentorship and career development guidance

## 🌈 Diversity, Equity, and Inclusion (DEI)
🎯 **Key Applications:**
- ⚖️ **Bias Detection**: AI audits hiring and promotion practices
- ♿ **Accessibility Support**: Tools like speech-to-text for employees with disabilities

## 🏥 AI in Human-Centered Fields

### 🩺 Healthcare Applications

<YouTubeVideoRenderer videoId="IzTpuucqim0" title="AI assists doctors in communicating diagnoses or treatment plans" />

🎯 **AI assists doctors in communicating diagnoses or treatment plans**
- 🤝 **AI companions** for mental health
- 🧠 **Virtual therapy** assistants
- 💬 **Communication aids** for doctors

### 🎓 Education Applications

<YouTubeVideoRenderer videoId="EERBXrsWAOo" title="Virtual teaching assistants provide 24/7 support" />

🎯 **Virtual teaching assistants provide 24/7 support**
- 🤖 **Intelligent tutoring** systems
- 👨‍🏫 **Virtual teaching** assistants
- 📈 **Personalized learning** paths

### 🏛️ Social Services Applications

<YouTubeVideoRenderer videoId="9NPDyphg4xM" title="Chatbots guide citizens through social benefit programs" />

🎯 **Chatbots guide citizens through social benefit programs**
- 📋 **Case management** assistance
- 💰 **Benefit program** guidance
- 🤝 **Community support** systems

### ♿ Accessibility and Inclusion

<YouTubeVideoRenderer videoId="EERBXrsWAOo" title="Better accessibility and inclusion in the workplace" />

🎯 **Better accessibility and inclusion in the workplace**

## 🌍 Real-World Examples

<YouTubeVideoRenderer videoId="GAhxxa2AWGY" title="Real-World Examples" />

## 🔮 Future Trends

<YouTubeVideoRenderer videoId="1217Kvqs54k" title="Future Trends" />

🎯 **Benefits:**
- ⚡ **Increased efficiency** and reduced admin burden
- 🎯 **Enhanced personalization**
- 😊 **Improved employee** experience
- 📊 **Data-driven insights**
- ♿ **Better accessibility** and inclusion

🎯 **Challenges:**
- ⚖️ **Bias** in AI algorithms
- 🔒 **Privacy** concerns
- 🔍 **Lack of transparency**
- 🤖 **Over-reliance** on automation
- 💔 **Loss of human** touch

🎯 **Real-World Examples:**
**HireVue:** AI video interview analysis • **Pymetrics:** Neuroscience-based candidate matching • **Replika:** AI companion for emotional support • **Talla:** HR workflow automation

🎯 **Future Trends:**
Emotion AI for detecting human feelings • AI-mediated conflict resolution • Digital twins of employees • AI ethics officers in organizations
        `
      }
    },
    {
      id: 5,
      title: 'Module 1 Quiz: Foundations of AI and Human Interaction',
      duration: '15 min',
      type: 'quiz',
      content: {
        questions: [
          {
            question: 'What is the key difference between Narrow AI and General AI?',
            options: [
              'Narrow AI can learn autonomously, while General AI cannot',
              'Narrow AI performs one specific task; General AI can perform any intellectual task like a human',
              'General AI is already widely used; Narrow AI is still theoretical',
              'General AI is based on rules, while Narrow AI is emotion-driven'
            ],
            correct: 1,
            explanation: 'Narrow AI (Weak AI) is designed for specific tasks like voice assistants or spam filters, while General AI (Strong AI) would theoretically be able to perform any intellectual task that a human can do.'
          },
          {
            question: 'Who proposed the Turing Test, and what was its main purpose?',
            options: [
              'John McCarthy – to simulate emotional intelligence',
              'Alan Turing – to assess if a machine can mimic human conversation',
              'Marvin Minsky – to build conscious machines',
              'Joseph Weizenbaum – to create expert systems'
            ],
            correct: 1,
            explanation: 'Alan Turing proposed the Turing Test in 1950 as a way to determine if a machine could exhibit intelligent behavior equivalent to, or indistinguishable from, that of a human through conversation.'
          },
          {
            question: 'Which of the following is an example of a Reactive Machine in AI functionality?',
            options: [
              'Siri',
              'Deep Blue',
              'ChatGPT',
              'Replika'
            ],
            correct: 1,
            explanation: 'Deep Blue, IBM\'s chess-playing computer, is a classic example of a Reactive Machine - it responds to specific inputs (chess moves) with pre-programmed responses but has no memory or learning capability.'
          },
          {
            question: 'Which AI capability allows systems to understand and process human language?',
            options: [
              'Machine Learning',
              'Computer Vision',
              'Robotics',
              'Natural Language Processing'
            ],
            correct: 3,
            explanation: 'Natural Language Processing (NLP) is the AI capability that enables systems to understand, interpret, and generate human language, powering applications like chatbots and translation services.'
          },
          {
            question: 'Which major challenge in Human-AI interaction involves users placing too much or too little faith in AI outputs?',
            options: [
              'Privacy',
              'Trust',
              'Explainability',
              'Accessibility'
            ],
            correct: 1,
            explanation: 'Trust is a major challenge in Human-AI interaction, where users may either over-trust AI systems (automation bias) or under-trust them, both of which can lead to suboptimal outcomes.'
          },
          {
            question: 'Which type of AI is purely theoretical and involves self-awareness and consciousness?',
            options: [
              'Limited Memory AI',
              'Narrow AI',
              'Super AI',
              'Reactive AI'
            ],
            correct: 2,
            explanation: 'Super AI is a theoretical form of artificial intelligence that would surpass human intelligence in all aspects, including self-awareness and consciousness. It currently exists only in theory.'
          },
          {
            question: 'How does human creativity differ from machine creativity?',
            options: [
              'Both rely on datasets to produce art',
              'Human creativity is original; AI creativity is pattern-based',
              'AI shows more emotional depth in creativity',
              'Humans can\'t match AI\'s creative speed'
            ],
            correct: 1,
            explanation: 'Human creativity is driven by original thought, emotion, and experience, while AI creativity is based on recognizing and recombining patterns from training data, lacking true originality.'
          },
          {
            question: 'In what area does AI assist HR managers by predicting turnover and recommending training?',
            options: [
              'Recruitment',
              'Performance Management',
              'Onboarding',
              'Payroll'
            ],
            correct: 1,
            explanation: 'Performance Management is where AI uses predictive analytics to assess employee productivity, engagement, risk of turnover, and suggest appropriate training or development opportunities.'
          },
          {
            question: 'Which of the following is NOT a benefit of using AI in human relations?',
            options: [
              'Enhanced personalization',
              'Improved engagement',
              'Guaranteed fairness',
              'Reduced administrative burden'
            ],
            correct: 2,
            explanation: 'While AI can help reduce bias and improve fairness, it cannot guarantee fairness. AI systems can perpetuate or amplify existing biases present in training data or algorithms.'
          },
          {
            question: 'What is the main purpose of Emotion AI in human-AI interaction?',
            options: [
              'To simulate human learning',
              'To predict market behavior',
              'To detect and respond to human emotions',
              'To replace human mentors'
            ],
            correct: 2,
            explanation: 'Emotion AI (Affective Computing) is designed to recognize, interpret, and respond to human emotions through facial expressions, voice patterns, or text analysis to create more empathetic and personalized interactions.'
          }
        ]
      }
    }
  ]
};
