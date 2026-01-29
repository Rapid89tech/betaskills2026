
import type { Module } from '@/types/course';

export const module7DesigningHumanCenteredAI: Module = {
  id: 7,
  title: 'Designing Human-Centered AI',
  description: 'Explore UX/UI design for AI applications, human-centered design principles, AI for well-being, and future human-AI collaboration scenarios.',
  lessons: [
    {
      id: 25,
      title: 'UX/UI for AI Applications',
      duration: '45 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/Rl5pZ7Cncyk',
        textContent: `
          <div class="lesson-content">
            <h2>🎨 UX/UI for AI Applications</h2>
            
            <div class="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-l-4 border-blue-500 p-6 rounded-r-xl mb-6 shadow-lg">
              <h3 class="font-bold text-blue-800 mb-3 flex items-center text-lg">
                <span class="text-3xl mr-3">🎯</span>
                Introduction
              </h3>
              <p class="text-blue-700 text-base">AI applications are increasingly embedded in daily software and devices. Designing effective user experiences (UX) and user interfaces (UI) for AI systems is critical to usability, trust, and adoption. The challenge lies in AI behaviors and outputs being complex, dynamic, and probabilistic, making UX/UI design more challenging than traditional software.</p>
            </div>

            <div class="mb-6 bg-blue-50 p-4 rounded-lg">
              <h4 class="font-semibold text-blue-800 mb-2">📺 Related Videos:</h4>
              <div class="space-y-1 text-sm text-blue-700">
                <p>📺 YOUTUBE: Understanding AI Applications in UX/UI - https://www.youtube.com/watch?v=zHAa-m16NGk</p>
                <p>📺 YOUTUBE: Key Principles of UX/UI for AI Applications - https://www.youtube.com/watch?v=uwNClNmekGU</p>
                <p>📺 YOUTUBE: Designing for Trust and User Confidence - https://www.youtube.com/watch?v=JvFt_-n8oj0</p>
                <p>📺 YOUTUBE: Case Studies and Examples - https://www.youtube.com/watch?v=H6VSNbvtdWk</p>
              </div>
            </div>

            <h3>🤖 Understanding AI Applications in UX/UI</h3>
            <ul class="space-y-3 mb-6">
              <li class="flex items-start">
                <div class="flex-shrink-0 w-2 h-2 rounded-full bg-blue-500 mr-3 mt-2"></div>
                <span>AI can power recommendations, predictions, natural language interfaces, personalization, automation, and more</span>
              </li>
              <li class="flex items-start">
                <div class="flex-shrink-0 w-2 h-2 rounded-full bg-blue-500 mr-3 mt-2"></div>
                <span>AI behaviors can be non-deterministic — outcomes may vary with inputs or over time due to learning</span>
              </li>
              <li class="flex items-start">
                <div class="flex-shrink-0 w-2 h-2 rounded-full bg-blue-500 mr-3 mt-2"></div>
                <span>User interaction with AI can be passive (e.g., receiving suggestions) or active (e.g., conversational agents)</span>
              </li>
            </ul>

            <div class="bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 border-l-4 border-green-500 p-6 rounded-r-xl mb-6 shadow-lg">
              <h3 class="font-bold text-green-800 mb-4 flex items-center text-lg">
                <span class="text-3xl mr-3">⚡</span>
                Key Principles of UX/UI for AI Applications
              </h3>
              <div class="grid md:grid-cols-2 gap-4">
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-green-700 mb-2">🔍 Transparency</h4>
                  <p class="text-green-600 text-sm">Clearly communicate how AI makes decisions or suggestions</p>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-green-700 mb-2">💡 Explainability</h4>
                  <p class="text-green-600 text-sm">Provide explanations for AI's outputs to foster user understanding and trust</p>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-green-700 mb-2">🎛️ Control</h4>
                  <p class="text-green-600 text-sm">Allow users to control AI behaviors and override or correct AI when needed</p>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-green-700 mb-2">📢 Feedback</h4>
                  <p class="text-green-600 text-sm">Provide timely and meaningful feedback on AI's status, decisions, or errors</p>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-green-700 mb-2">🔄 Consistency</h4>
                  <p class="text-green-600 text-sm">Maintain predictable interaction patterns despite AI's evolving behavior</p>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-green-700 mb-2">🛡️ Ethics and Privacy</h4>
                  <p class="text-green-600 text-sm">Design interfaces that respect user privacy and disclose data usage</p>
                </div>
              </div>
            </div>

            <h3>🤝 Designing for Trust and User Confidence</h3>
            <ul class="space-y-3 mb-6">
              <li class="flex items-start">
                <div class="flex-shrink-0 w-2 h-2 rounded-full bg-purple-500 mr-3 mt-2"></div>
                <span>Use explainable AI (XAI) techniques to demystify AI decisions</span>
              </li>
              <li class="flex items-start">
                <div class="flex-shrink-0 w-2 h-2 rounded-full bg-purple-500 mr-3 mt-2"></div>
                <span>Show confidence levels or uncertainty to avoid blind trust</span>
              </li>
              <li class="flex items-start">
                <div class="flex-shrink-0 w-2 h-2 rounded-full bg-purple-500 mr-3 mt-2"></div>
                <span>Enable user calibration — helping users set realistic expectations of AI capabilities</span>
              </li>
              <li class="flex items-start">
                <div class="flex-shrink-0 w-2 h-2 rounded-full bg-purple-500 mr-3 mt-2"></div>
                <span>Avoid "black-box" perceptions by providing interactive explanations or visualizations</span>
              </li>
            </ul>

            <div class="bg-gradient-to-r from-orange-50 via-red-50 to-pink-50 border-l-4 border-orange-500 p-6 rounded-r-xl mb-6 shadow-lg">
              <h3 class="font-bold text-orange-800 mb-4 flex items-center text-lg">
                <span class="text-3xl mr-3">🎮</span>
                Interaction Models in AI UX/UI
              </h3>
              <div class="space-y-4">
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-orange-700 mb-2">💬 Conversational Interfaces</h4>
                  <p class="text-orange-600 text-sm">Chatbots and voice assistants require natural, clear dialogue design</p>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-orange-700 mb-2">⭐ Recommendation Systems</h4>
                  <p class="text-orange-600 text-sm">Design how suggestions appear and how users can provide feedback</p>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-orange-700 mb-2">🤖 Automation and Assistance</h4>
                  <p class="text-orange-600 text-sm">Design smooth transitions between AI autonomy and human control</p>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-orange-700 mb-2">🔄 Adaptive Interfaces</h4>
                  <p class="text-orange-600 text-sm">UI adapts based on user behavior or context, requiring dynamic but coherent designs</p>
                </div>
              </div>
            </div>

            <h3>⚠️ Challenges Specific to AI UX/UI</h3>
            <ul class="space-y-3 mb-6">
              <li class="flex items-start">
                <div class="flex-shrink-0 w-2 h-2 rounded-full bg-red-500 mr-3 mt-2"></div>
                <span><strong>Handling Uncertainty:</strong> AI outputs may have confidence scores or probabilities; communicate these effectively</span>
              </li>
              <li class="flex items-start">
                <div class="flex-shrink-0 w-2 h-2 rounded-full bg-red-500 mr-3 mt-2"></div>
                <span><strong>Error Management:</strong> Design graceful handling of AI mistakes and user corrections</span>
              </li>
              <li class="flex items-start">
                <div class="flex-shrink-0 w-2 h-2 rounded-full bg-red-500 mr-3 mt-2"></div>
                <span><strong>User Education:</strong> Help users understand AI limitations and how to interact with it properly</span>
              </li>
              <li class="flex items-start">
                <div class="flex-shrink-0 w-2 h-2 rounded-full bg-red-500 mr-3 mt-2"></div>
                <span><strong>Data Privacy:</strong> Transparently communicate how user data is collected, used, and protected</span>
              </li>
              <li class="flex items-start">
                <div class="flex-shrink-0 w-2 h-2 rounded-full bg-red-500 mr-3 mt-2"></div>
                <span><strong>Bias and Fairness:</strong> Detect and communicate potential AI biases affecting user experience</span>
              </li>
            </ul>

            <div class="bg-gradient-to-r from-gray-50 via-slate-50 to-zinc-50 border-l-4 border-gray-500 p-6 rounded-r-xl mb-6 shadow-lg">
              <h3 class="font-bold text-gray-800 mb-4 flex items-center text-lg">
                <span class="text-3xl mr-3">🛠️</span>
                Tools and Techniques
              </h3>
              <ul class="space-y-2 text-gray-700">
                <li><strong>Explainability Tools:</strong> Visualizations, natural language explanations, and interactive elements</li>
                <li><strong>User Testing with AI:</strong> Evaluate user understanding, trust, and interaction with AI features</li>
                <li><strong>Prototyping AI Behavior:</strong> Simulate AI responses to test UX before full backend implementation</li>
                <li><strong>Feedback Loops:</strong> Mechanisms for users to give feedback on AI accuracy or relevance</li>
              </ul>
            </div>

            <div class="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border-l-4 border-indigo-500 p-6 rounded-r-xl mb-6 shadow-lg">
              <h3 class="font-bold text-indigo-800 mb-4 flex items-center text-lg">
                <span class="text-3xl mr-3">📋</span>
                Case Studies and Examples
              </h3>
              <div class="grid md:grid-cols-2 gap-4">
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-indigo-700 mb-2">Google's Smart Compose</h4>
                  <p class="text-indigo-600 text-sm">Predictive typing with suggestions and undo options</p>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-indigo-700 mb-2">Amazon Recommendations</h4>
                  <p class="text-indigo-600 text-sm">Transparent filtering, user ratings, and "why this?" explanations</p>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-indigo-700 mb-2">AI Chatbots</h4>
                  <p class="text-indigo-600 text-sm">Providing fallback options and human escalation paths when AI fails</p>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-indigo-700 mb-2">Autonomous Vehicles</h4>
                  <p class="text-indigo-600 text-sm">Interfaces showing AI decisions, status, and allowing user intervention</p>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-r from-teal-50 via-cyan-50 to-blue-50 border-l-4 border-teal-500 p-6 rounded-r-xl mb-6 shadow-lg">
              <h3 class="font-bold text-teal-800 mb-3 flex items-center text-lg">
                <span class="text-3xl mr-3">🌟</span>
                Summary
              </h3>
              <ul class="text-teal-700 space-y-2">
                <li>• UX/UI for AI applications is a growing field that requires balancing AI complexity with user clarity</li>
                <li>• Key design goals include transparency, explainability, control, and ethical considerations</li>
                <li>• Successful AI UX/UI fosters trust, effective interaction, and safe adoption</li>
                <li>• Ongoing research and user-centric design are critical as AI evolves</li>
              </ul>
            </div>

            <div class="bg-gradient-to-r from-yellow-50 via-amber-50 to-orange-50 border-l-4 border-yellow-500 p-6 rounded-r-xl shadow-lg">
              <h3 class="font-bold text-yellow-800 mb-3 flex items-center text-lg">
                <span class="text-3xl mr-3">💭</span>
                Discussion Questions
              </h3>
              <ul class="text-yellow-700 space-y-2">
                <li>• How can UX/UI designers best communicate AI uncertainty without overwhelming users?</li>
                <li>• What strategies help users maintain appropriate trust levels in AI systems?</li>
                <li>• How should user control be balanced with AI automation in interface design?</li>
                <li>• In what ways can explainability be integrated seamlessly into everyday AI applications?</li>
                <li>• What ethical issues arise specifically in AI UX/UI design, and how can they be addressed?</li>
              </ul>
            </div>
          </div>
        `
      }
    },
    {
      id: 26,
      title: 'Principles of Human-Centered Design (HCD)',
      duration: '50 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/COTOz4XsLpM',
        textContent: `
          <div class="lesson-content">
            <h2>👥 Principles of Human-Centered Design (HCD)</h2>
            
            <div class="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-l-4 border-blue-500 p-6 rounded-r-xl mb-6 shadow-lg">
              <h3 class="font-bold text-blue-800 mb-3 flex items-center text-lg">
                <span class="text-3xl mr-3">🎯</span>
                Introduction
              </h3>
              <p class="text-blue-700 text-base"><strong>Human-Centered Design (HCD)</strong> is a design philosophy and process that prioritizes the needs, behaviors, and experiences of end users throughout the design and development of products, systems, or services. The goal is to create solutions that are useful, usable, and desirable by deeply understanding users.</p>
            </div>

            <div class="bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 border-l-4 border-green-500 p-6 rounded-r-xl mb-6 shadow-lg">
              <h3 class="font-bold text-green-800 mb-4 flex items-center text-lg">
                <span class="text-3xl mr-3">⚡</span>
                Core Principles of Human-Centered Design
              </h3>
              
              <div class="space-y-4">
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-green-700 mb-2">🎯 Focus on Users and Their Needs</h4>
                  <ul class="text-green-600 text-sm space-y-1">
                    <li>• Design begins with a clear understanding of users' needs, contexts, motivations, and pain points</li>
                    <li>• Involves user research techniques such as interviews, observations, surveys, and ethnographic studies</li>
                    <li>• Recognizes users as experts of their own experiences</li>
                  </ul>
                </div>
                
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-green-700 mb-2">❤️ Empathy and Understanding</h4>
                  <ul class="text-green-600 text-sm space-y-1">
                    <li>• Designers strive to deeply empathize with users, seeing the world from their perspective</li>
                    <li>• Helps uncover explicit and implicit user requirements</li>
                    <li>• Empathy drives compassion and more meaningful design outcomes</li>
                  </ul>
                </div>
                
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-green-700 mb-2">🤝 Involve Users Throughout the Process</h4>
                  <ul class="text-green-600 text-sm space-y-1">
                    <li>• Engage users early and continuously to gather feedback, validate assumptions, and iterate designs</li>
                    <li>• Co-design or participatory design approaches involve users as active collaborators</li>
                    <li>• Testing prototypes with real users is essential</li>
                  </ul>
                </div>
                
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-green-700 mb-2">🔄 Iterative Design and Prototyping</h4>
                  <ul class="text-green-600 text-sm space-y-1">
                    <li>• Design is a cyclical process of creating, testing, learning, and refining</li>
                    <li>• Early prototypes (low-fidelity wireframes, mockups) allow quick experimentation and failure</li>
                    <li>• Iteration improves usability and alignment with user needs</li>
                  </ul>
                </div>
                
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-green-700 mb-2">🌍 Contextual Awareness</h4>
                  <ul class="text-green-600 text-sm space-y-1">
                    <li>• Designs should account for the environment, culture, and context in which users operate</li>
                    <li>• Considers physical, social, and technological constraints or enablers</li>
                    <li>• Avoids one-size-fits-all solutions</li>
                  </ul>
                </div>
                
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-green-700 mb-2">👨‍👩‍👧‍👦 Multidisciplinary Collaboration</h4>
                  <ul class="text-green-600 text-sm space-y-1">
                    <li>• HCD involves cross-functional teams including designers, developers, domain experts, and users</li>
                    <li>• Diverse perspectives lead to richer understanding and innovation</li>
                  </ul>
                </div>
                
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-green-700 mb-2">♿ Usability and Accessibility</h4>
                  <ul class="text-green-600 text-sm space-y-1">
                    <li>• Products should be easy to learn, efficient to use, and minimize errors</li>
                    <li>• Accessibility ensures inclusiveness for users with varying abilities and disabilities</li>
                    <li>• Standards and guidelines (e.g., WCAG) guide accessible design</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-r from-purple-50 via-pink-50 to-rose-50 border-l-4 border-purple-500 p-6 rounded-r-xl mb-6 shadow-lg">
              <h3 class="font-bold text-purple-800 mb-4 flex items-center text-lg">
                <span class="text-3xl mr-3">🔄</span>
                The Human-Centered Design Process
              </h3>
              <div class="grid md:grid-cols-2 gap-4">
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-purple-700 mb-2">💡 Inspiration</h4>
                  <p class="text-purple-600 text-sm">Understand the problem and users through research and empathy</p>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-purple-700 mb-2">🧠 Ideation</h4>
                  <p class="text-purple-600 text-sm">Generate a wide range of ideas and possible solutions</p>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-purple-700 mb-2">🛠️ Implementation</h4>
                  <p class="text-purple-600 text-sm">Develop prototypes, test with users, and refine solutions</p>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-purple-700 mb-2">🔁 Iteration</h4>
                  <p class="text-purple-600 text-sm">Repeat testing and refinement until optimal fit is achieved</p>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-r from-orange-50 via-amber-50 to-yellow-50 border-l-4 border-orange-500 p-6 rounded-r-xl mb-6 shadow-lg">
              <h3 class="font-bold text-orange-800 mb-4 flex items-center text-lg">
                <span class="text-3xl mr-3">🛠️</span>
                Tools and Methods in HCD
              </h3>
              <div class="space-y-3">
                <div class="bg-white p-3 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-orange-700 mb-1">👤 User Personas</h4>
                  <p class="text-orange-600 text-sm">Fictional characters representing key user groups to guide design</p>
                </div>
                <div class="bg-white p-3 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-orange-700 mb-1">🗺️ Journey Mapping</h4>
                  <p class="text-orange-600 text-sm">Visualizing user experiences step-by-step to identify pain points</p>
                </div>
                <div class="bg-white p-3 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-orange-700 mb-1">🔍 Contextual Inquiry</h4>
                  <p class="text-orange-600 text-sm">Observing and interviewing users in their environment</p>
                </div>
                <div class="bg-white p-3 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-orange-700 mb-1">📐 Wireframing and Prototyping</h4>
                  <p class="text-orange-600 text-sm">Creating models of the design for testing</p>
                </div>
                <div class="bg-white p-3 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-orange-700 mb-1">🧪 Usability Testing</h4>
                  <p class="text-orange-600 text-sm">Observing users as they interact with prototypes or products</p>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-r from-cyan-50 via-teal-50 to-emerald-50 border-l-4 border-cyan-500 p-6 rounded-r-xl mb-6 shadow-lg">
              <h3 class="font-bold text-cyan-800 mb-3 flex items-center text-lg">
                <span class="text-3xl mr-3">✅</span>
                Benefits of Human-Centered Design
              </h3>
              <ul class="text-cyan-700 space-y-2">
                <li>• Higher user satisfaction and adoption</li>
                <li>• Reduced development costs by catching issues early</li>
                <li>• Increased innovation through user insights</li>
                <li>• Products that better fit real-world needs and contexts</li>
                <li>• Ethical design focused on user well-being and inclusivity</li>
              </ul>
            </div>

            <div class="bg-gradient-to-r from-red-50 via-pink-50 to-rose-50 border-l-4 border-red-500 p-6 rounded-r-xl mb-6 shadow-lg">
              <h3 class="font-bold text-red-800 mb-3 flex items-center text-lg">
                <span class="text-3xl mr-3">⚠️</span>
                Challenges in HCD
              </h3>
              <ul class="text-red-700 space-y-2">
                <li>• Balancing diverse user needs and conflicting requirements</li>
                <li>• Time and resource investment for thorough user research</li>
                <li>• Overcoming organizational resistance to iterative and user-driven processes</li>
                <li>• Avoiding biases in user research and interpretation</li>
              </ul>
            </div>

            <div class="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border-l-4 border-indigo-500 p-6 rounded-r-xl mb-6 shadow-lg">
              <h3 class="font-bold text-indigo-800 mb-4 flex items-center text-lg">
                <span class="text-3xl mr-3">📋</span>
                Case Studies / Examples
              </h3>
              <div class="space-y-3">
                <div class="bg-white p-3 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-indigo-700 mb-1">IDEO's Design Thinking</h4>
                  <p class="text-indigo-600 text-sm">Popularized user-centered, iterative design methods</p>
                </div>
                <div class="bg-white p-3 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-indigo-700 mb-1">Apple's Product Design</h4>
                  <p class="text-indigo-600 text-sm">Emphasis on intuitive, human-friendly interfaces</p>
                </div>
                <div class="bg-white p-3 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-indigo-700 mb-1">Healthcare Devices</h4>
                  <p class="text-indigo-600 text-sm">Designed with patient needs and usability foremost</p>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-r from-teal-50 via-cyan-50 to-blue-50 border-l-4 border-teal-500 p-6 rounded-r-xl mb-6 shadow-lg">
              <h3 class="font-bold text-teal-800 mb-3 flex items-center text-lg">
                <span class="text-3xl mr-3">🌟</span>
                Summary
              </h3>
              <ul class="text-teal-700 space-y-2">
                <li>• Human-Centered Design places users at the core of the design process</li>
                <li>• Empathy, iteration, and user involvement are key to successful outcomes</li>
                <li>• The approach leads to more effective, ethical, and meaningful products and services</li>
                <li>• Despite challenges, HCD is essential for sustainable innovation and user satisfaction</li>
              </ul>
            </div>

            <div class="bg-gradient-to-r from-yellow-50 via-amber-50 to-orange-50 border-l-4 border-yellow-500 p-6 rounded-r-xl shadow-lg">
              <h3 class="font-bold text-yellow-800 mb-3 flex items-center text-lg">
                <span class="text-3xl mr-3">💭</span>
                Discussion Questions
              </h3>
              <ul class="text-yellow-700 space-y-2">
                <li>• How can designers balance conflicting needs of different user groups?</li>
                <li>• In what ways can empathy be cultivated and maintained throughout a project?</li>
                <li>• How does human-centered design differ from traditional design approaches?</li>
                <li>• What ethical responsibilities do designers have when conducting user research?</li>
                <li>• How can HCD be adapted for rapidly evolving technologies like AI?</li>
              </ul>
            </div>
          </div>
        `
      }
    },
    {
      id: 27,
      title: 'AI for Enhancing Well-Being and Connection',
      duration: '40 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/K3m7VuS3Dw0',
        textContent: `
          <div class="lesson-content">
            <h2>💚 AI for Enhancing Well-Being and Connection</h2>
            
            <div class="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-l-4 border-blue-500 p-6 rounded-r-xl mb-6 shadow-lg">
              <h3 class="font-bold text-blue-800 mb-3 flex items-center text-lg">
                <span class="text-3xl mr-3">🎯</span>
                Introduction
              </h3>
              <p class="text-blue-700 text-base">AI technologies are increasingly used to improve human well-being, mental health, and social connection. From mental health chatbots to social robots, AI offers new tools to support emotional, psychological, and social needs. Addressing well-being and connection through AI can help mitigate loneliness, mental illness, and social isolation—major contemporary challenges.</p>
            </div>

            <div class="bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 border-l-4 border-green-500 p-6 rounded-r-xl mb-6 shadow-lg">
              <h3 class="font-bold text-green-800 mb-3 flex items-center text-lg">
                <span class="text-3xl mr-3">🧠</span>
                Understanding Well-Being and Social Connection
              </h3>
              <div class="space-y-3">
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-green-700 mb-2">💚 Well-Being</h4>
                  <p class="text-green-600 text-sm">A holistic concept including emotional, mental, and physical health, life satisfaction, and resilience</p>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-green-700 mb-2">🤝 Social Connection</h4>
                  <p class="text-green-600 text-sm">The sense of belonging, interpersonal relationships, and social support networks that contribute to overall well-being</p>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-green-700 mb-2">⚠️ Challenges</h4>
                  <p class="text-green-600 text-sm">Modern lifestyles, urbanization, and pandemics have increased social isolation and mental health issues</p>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 border-l-4 border-purple-500 p-6 rounded-r-xl mb-6 shadow-lg">
              <h3 class="font-bold text-purple-800 mb-4 flex items-center text-lg">
                <span class="text-3xl mr-3">🤖</span>
                Types of AI Applications Supporting Well-Being and Connection
              </h3>
              
              <div class="space-y-4">
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-purple-700 mb-2">💬 Mental Health Chatbots and Virtual Therapists</h4>
                  <ul class="text-purple-600 text-sm space-y-1">
                    <li>• AI-powered conversational agents (e.g., Woebot, Wysa) provide cognitive behavioral therapy (CBT), emotional support, and crisis intervention</li>
                    <li>• Accessible 24/7, reducing stigma and barriers to mental health care</li>
                    <li>• Use natural language processing (NLP) to engage users empathetically</li>
                  </ul>
                </div>
                
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-purple-700 mb-2">🤖 Social Robots and Companions</h4>
                  <ul class="text-purple-600 text-sm space-y-1">
                    <li>• Robots like Paro (therapeutic seal) and ElliQ (companion for elderly) offer social interaction, comfort, and cognitive stimulation</li>
                    <li>• Provide companionship especially for isolated or elderly populations</li>
                    <li>• Can reduce feelings of loneliness and anxiety</li>
                  </ul>
                </div>
                
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-purple-700 mb-2">📱 Personalized Well-Being Platforms</h4>
                  <ul class="text-purple-600 text-sm space-y-1">
                    <li>• AI algorithms analyze user data (e.g., mood tracking, activity levels) to provide tailored recommendations for exercise, mindfulness, sleep, and nutrition</li>
                    <li>• Apps like Headspace or Calm integrate AI to adapt content to user preferences</li>
                  </ul>
                </div>
                
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-purple-700 mb-2">📱 AI in Social Media and Networking</h4>
                  <ul class="text-purple-600 text-sm space-y-1">
                    <li>• AI curates content, connects users with shared interests, and facilitates support communities</li>
                    <li>• Enhances social bonding but also raises concerns about echo chambers and privacy</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-r from-orange-50 via-amber-50 to-yellow-50 border-l-4 border-orange-500 p-6 rounded-r-xl mb-6 shadow-lg">
              <h3 class="font-bold text-orange-800 mb-4 flex items-center text-lg">
                <span class="text-3xl mr-3">⚙️</span>
                Mechanisms by Which AI Enhances Connection and Well-Being
              </h3>
              <div class="grid md:grid-cols-2 gap-4">
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-orange-700 mb-2">♿ Accessibility</h4>
                  <p class="text-orange-600 text-sm">AI provides scalable, affordable support beyond traditional healthcare systems</p>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-orange-700 mb-2">🎯 Personalization</h4>
                  <p class="text-orange-600 text-sm">Tailors interventions to individual needs and contexts</p>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-orange-700 mb-2">⏰ Consistency</h4>
                  <p class="text-orange-600 text-sm">Available anytime, offering continuous support</p>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-orange-700 mb-2">🎮 Engagement</h4>
                  <p class="text-orange-600 text-sm">Interactive, conversational AI promotes sustained use and adherence</p>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-orange-700 mb-2">📊 Monitoring</h4>
                  <p class="text-orange-600 text-sm">AI can detect early signs of distress or social withdrawal through behavioral data</p>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-r from-cyan-50 via-teal-50 to-emerald-50 border-l-4 border-cyan-500 p-6 rounded-r-xl mb-6 shadow-lg">
              <h3 class="font-bold text-cyan-800 mb-3 flex items-center text-lg">
                <span class="text-3xl mr-3">✅</span>
                Benefits of AI for Well-Being and Connection
              </h3>
              <ul class="text-cyan-700 space-y-2">
                <li>• Reduces barriers to accessing mental health and social support</li>
                <li>• Mitigates loneliness and social isolation</li>
                <li>• Empowers self-management of health through feedback and education</li>
                <li>• Supports caregivers and healthcare providers with additional tools</li>
                <li>• Fosters community building and social inclusion</li>
              </ul>
            </div>

            <div class="bg-gradient-to-r from-red-50 via-pink-50 to-rose-50 border-l-4 border-red-500 p-6 rounded-r-xl mb-6 shadow-lg">
              <h3 class="font-bold text-red-800 mb-3 flex items-center text-lg">
                <span class="text-3xl mr-3">⚠️</span>
                Ethical and Practical Challenges
              </h3>
              <ul class="text-red-700 space-y-2">
                <li>• <strong>Privacy and Data Security:</strong> Sensitive health and social data must be protected</li>
                <li>• <strong>Emotional Authenticity:</strong> Risks of users forming attachments to non-human agents that may lack genuine empathy</li>
                <li>• <strong>Dependence:</strong> Over-reliance on AI might reduce human-to-human interactions</li>
                <li>• <strong>Bias and Inequality:</strong> AI systems must be inclusive and avoid reinforcing social disparities</li>
                <li>• <strong>Transparency:</strong> Users should understand AI capabilities and limitations</li>
              </ul>
            </div>

            <div class="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border-l-4 border-indigo-500 p-6 rounded-r-xl mb-6 shadow-lg">
              <h3 class="font-bold text-indigo-800 mb-4 flex items-center text-lg">
                <span class="text-3xl mr-3">📋</span>
                Case Studies and Examples
              </h3>
              <div class="grid md:grid-cols-2 gap-4">
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-indigo-700 mb-2">Woebot</h4>
                  <p class="text-indigo-600 text-sm">A chatbot providing CBT techniques to help manage anxiety and depression</p>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-indigo-700 mb-2">Paro Robot</h4>
                  <p class="text-indigo-600 text-sm">Therapeutic robot used in elder care to provide comfort and reduce agitation</p>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-indigo-700 mb-2">Replika</h4>
                  <p class="text-indigo-600 text-sm">AI companion designed for emotional support and social interaction</p>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-indigo-700 mb-2">AI in Telehealth</h4>
                  <p class="text-indigo-600 text-sm">Platforms integrating AI triage and monitoring to support remote mental health care</p>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-r from-teal-50 via-cyan-50 to-blue-50 border-l-4 border-teal-500 p-6 rounded-r-xl mb-6 shadow-lg">
              <h3 class="font-bold text-teal-800 mb-3 flex items-center text-lg">
                <span class="text-3xl mr-3">🌟</span>
                Summary
              </h3>
              <ul class="text-teal-700 space-y-2">
                <li>• AI offers promising tools to enhance human well-being and foster social connection</li>
                <li>• Applications range from chatbots and robots to personalized platforms and social media</li>
                <li>• Benefits include accessibility, personalization, and continuous support</li>
                <li>• Challenges remain in privacy, ethics, emotional authenticity, and avoiding over-dependence</li>
                <li>• Responsible design and deployment are key to maximizing positive impact</li>
              </ul>
            </div>

            <div class="bg-gradient-to-r from-yellow-50 via-amber-50 to-orange-50 border-l-4 border-yellow-500 p-6 rounded-r-xl shadow-lg">
              <h3 class="font-bold text-yellow-800 mb-3 flex items-center text-lg">
                <span class="text-3xl mr-3">💭</span>
                Discussion Questions
              </h3>
              <ul class="text-yellow-700 space-y-2">
                <li>• How can AI balance providing emotional support while encouraging human relationships?</li>
                <li>• What ethical safeguards are necessary to protect users' privacy and emotional health?</li>
                <li>• Can AI truly understand and respond to complex human emotions?</li>
                <li>• How might AI tools be designed to serve marginalized or vulnerable populations?</li>
                <li>• What role should healthcare professionals play alongside AI well-being technologies?</li>
              </ul>
            </div>
          </div>
        `
      }
    },
    {
      id: 28,
      title: 'The Future of Human-AI Relations',
      duration: '55 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/ZfXz3APsLpM',
        textContent: `
          <div class="lesson-content">
            <h2>🚀 The Future of Human-AI Relations</h2>
            
            <div class="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-l-4 border-blue-500 p-6 rounded-r-xl mb-6 shadow-lg">
              <h3 class="font-bold text-blue-800 mb-3 flex items-center text-lg">
                <span class="text-3xl mr-3">🔄</span>
                Co-evolution of Humans and Machines
              </h3>
              <p class="text-blue-700 text-base"><strong>Co-evolution</strong> refers to the dynamic, reciprocal process where humans and machines influence and shape each other's development over time. With rapid advances in AI, robotics, and computing, humans and machines are increasingly intertwined in a symbiotic relationship.</p>
            </div>

            <div class="bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 border-l-4 border-green-500 p-6 rounded-r-xl mb-6 shadow-lg">
              <h3 class="font-bold text-green-800 mb-4 flex items-center text-lg">
                <span class="text-3xl mr-3">📚</span>
                Historical Perspective
              </h3>
              <div class="space-y-3">
                <div class="bg-white p-3 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-green-700 mb-1">🛠️ Early Tools and Machines</h4>
                  <p class="text-green-600 text-sm">Humans created tools (e.g., stone tools, the wheel) that enhanced capabilities and transformed societies</p>
                </div>
                <div class="bg-white p-3 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-green-700 mb-1">🏭 Industrial Revolution</h4>
                  <p class="text-green-600 text-sm">Mechanization reshaped labor, economy, and human lifestyles</p>
                </div>
                <div class="bg-white p-3 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-green-700 mb-1">💻 Digital Revolution</h4>
                  <p class="text-green-600 text-sm">Computers and the internet accelerated human-machine interdependence</p>
                </div>
                <div class="bg-white p-3 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-green-700 mb-1">🤖 AI and Robotics Era</h4>
                  <p class="text-green-600 text-sm">Machines now exhibit autonomy, learning, and adaptation, further blending roles</p>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 border-l-4 border-purple-500 p-6 rounded-r-xl mb-6 shadow-lg">
              <h3 class="font-bold text-purple-800 mb-4 flex items-center text-lg">
                <span class="text-3xl mr-3">🧬</span>
                Dimensions of Human-Machine Co-evolution
              </h3>
              
              <div class="space-y-4">
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-purple-700 mb-2">💪 Physical Augmentation</h4>
                  <p class="text-purple-600 text-sm mb-2">Prosthetics, exoskeletons, brain-computer interfaces enhance human physical abilities</p>
                  <p class="text-purple-500 text-xs"><strong>Examples:</strong> Cochlear implants, robotic limbs, neural implants</p>
                </div>
                
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-purple-700 mb-2">🧠 Cognitive Augmentation</h4>
                  <p class="text-purple-600 text-sm mb-2">AI systems assist or extend human cognitive functions such as memory, decision-making, and creativity</p>
                  <p class="text-purple-500 text-xs"><strong>Examples:</strong> AI assistants, recommendation systems, decision support tools</p>
                </div>
                
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-purple-700 mb-2">👥 Social and Cultural Evolution</h4>
                  <p class="text-purple-600 text-sm mb-2">Machines influence communication, social norms, and cultural practices</p>
                  <p class="text-purple-500 text-xs"><strong>Example:</strong> Social media algorithms shape information flow and social interactions</p>
                </div>
                
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-purple-700 mb-2">💼 Economic and Labor Impact</h4>
                  <p class="text-purple-600 text-sm">Automation and AI change the nature of work, skills demand, and economic structures. New job roles emerge; some traditional roles decline</p>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-r from-orange-50 via-amber-50 to-yellow-50 border-l-4 border-orange-500 p-6 rounded-r-xl mb-6 shadow-lg">
              <h3 class="font-bold text-orange-800 mb-4 flex items-center text-lg">
                <span class="text-3xl mr-3">🔄</span>
                Mechanisms of Co-evolution
              </h3>
              <div class="space-y-3">
                <div class="bg-white p-3 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-orange-700 mb-1">🔄 Feedback Loops</h4>
                  <p class="text-orange-600 text-sm">Human use and adaptation of machines lead to machine redesign and innovation, which in turn changes human behavior</p>
                </div>
                <div class="bg-white p-3 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-orange-700 mb-1">🤝 Mutual Adaptation</h4>
                  <p class="text-orange-600 text-sm">Humans learn to work with machines; machines evolve based on human needs and data</p>
                </div>
                <div class="bg-white p-3 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-orange-700 mb-1">📚 Cultural Transmission</h4>
                  <p class="text-orange-600 text-sm">Knowledge about machines and their use is passed across generations, shaping societies</p>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-r from-gray-50 via-slate-50 to-zinc-50 border-l-4 border-gray-500 p-6 rounded-r-xl mb-6 shadow-lg">
              <h3 class="font-bold text-gray-800 mb-4 flex items-center text-lg">
                <span class="text-3xl mr-3">🧠</span>
                 Philosophical Perspectives on Consciousness and Self
               </h3>
               
               <div class="mb-4 bg-blue-50 p-3 rounded-lg">
                 <p class="text-sm text-blue-700">📺 YOUTUBE: Philosophical Perspectives on Consciousness and Self - https://www.youtube.com/watch?v=OWByyjMtHHA</p>
               </div>
              
              <div class="space-y-4">
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-gray-700 mb-2">🔍 Defining Consciousness</h4>
                  <ul class="text-gray-600 text-sm space-y-1">
                    <li>• <strong>Phenomenal Consciousness:</strong> Subjective experience or "what it feels like" to be aware (also called qualia)</li>
                    <li>• <strong>Access Consciousness:</strong> The aspects of consciousness available for reasoning, reporting, and control of behavior</li>
                    <li>• <strong>Levels of Consciousness:</strong> From minimal awareness (e.g., wakefulness) to higher-order reflective consciousness</li>
                  </ul>
                </div>
                
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-gray-700 mb-2">💭 Philosophical Theories</h4>
                  <div class="grid md:grid-cols-2 gap-3">
                    <div class="border-l-2 border-gray-300 pl-3">
                      <h5 class="font-medium text-gray-600 mb-1">Dualism</h5>
                      <p class="text-gray-500 text-xs">Mind and body are distinct substances; consciousness is non-physical</p>
                    </div>
                    <div class="border-l-2 border-gray-300 pl-3">
                      <h5 class="font-medium text-gray-600 mb-1">Physicalism</h5>
                      <p class="text-gray-500 text-xs">Consciousness arises entirely from physical brain processes</p>
                    </div>
                    <div class="border-l-2 border-gray-300 pl-3">
                      <h5 class="font-medium text-gray-600 mb-1">Functionalism</h5>
                      <p class="text-gray-500 text-xs">Mental states are defined by their functional roles, not by physical substrate</p>
                    </div>
                    <div class="border-l-2 border-gray-300 pl-3">
                      <h5 class="font-medium text-gray-600 mb-1">Panpsychism</h5>
                      <p class="text-gray-500 text-xs">Consciousness is a fundamental and ubiquitous feature of the universe</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-r from-cyan-50 via-teal-50 to-emerald-50 border-l-4 border-cyan-500 p-6 rounded-r-xl mb-6 shadow-lg">
              <h3 class="font-bold text-cyan-800 mb-4 flex items-center text-lg">
                <span class="text-3xl mr-3">🤝</span>
                 Human-AI Collaboration Scenarios
               </h3>
               
               <div class="mb-4 bg-cyan-50 p-3 rounded-lg">
                 <p class="text-sm text-cyan-700">📺 YOUTUBE: Human-AI Collaboration Scenarios - https://www.youtube.com/watch?v=ai0rHB3NhLE</p>
               </div>
              
              <div class="space-y-4">
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-cyan-700 mb-2">📊 Decision Support Systems</h4>
                  <p class="text-cyan-600 text-sm mb-2">AI assists humans by analyzing large data sets, generating insights, and suggesting options. Humans retain final decision-making authority.</p>
                  <p class="text-cyan-500 text-xs"><strong>Examples:</strong> Medical diagnosis aids, financial risk analysis, legal research tools</p>
                </div>
                
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-cyan-700 mb-2">🎨 Augmented Creativity</h4>
                  <p class="text-cyan-600 text-sm mb-2">AI systems generate ideas, drafts, or designs that humans refine or build upon. Collaboration enhances innovation and artistic expression.</p>
                  <p class="text-cyan-500 text-xs"><strong>Examples:</strong> AI-assisted writing, music composition, graphic design tools</p>
                </div>
                
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-cyan-700 mb-2">🚗 Autonomous Agents with Human Oversight</h4>
                  <p class="text-cyan-600 text-sm mb-2">AI systems perform tasks independently but humans supervise and intervene as needed.</p>
                  <p class="text-cyan-500 text-xs"><strong>Examples:</strong> Autonomous vehicles with driver monitoring, industrial robots with human supervisors</p>
                </div>
                
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-cyan-700 mb-2">🤖 Co-robots (Cobots)</h4>
                  <p class="text-cyan-600 text-sm mb-2">Robots designed to work safely alongside humans in shared physical spaces.</p>
                  <p class="text-cyan-500 text-xs"><strong>Examples:</strong> Manufacturing assembly lines, warehouse logistics, surgical robots</p>
                </div>
                
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-cyan-700 mb-2">📚 Interactive Learning and Training</h4>
                  <p class="text-cyan-600 text-sm mb-2">AI tutors adapt to learners' needs, providing personalized feedback and encouragement. Humans guide AI's adaptation and set learning goals.</p>
                  <p class="text-cyan-500 text-xs"><strong>Examples:</strong> Language learning apps, professional skills simulators</p>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border-l-4 border-indigo-500 p-6 rounded-r-xl mb-6 shadow-lg">
              <h3 class="font-bold text-indigo-800 mb-4 flex items-center text-lg">
                <span class="text-3xl mr-3">🎯</span>
                Design Principles for Effective Collaboration
              </h3>
              <div class="grid md:grid-cols-2 gap-4">
                <div class="bg-white p-3 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-indigo-700 mb-1">👥 Human-Centered Design</h4>
                  <p class="text-indigo-600 text-sm">AI systems tailored to human needs and workflows</p>
                </div>
                <div class="bg-white p-3 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-indigo-700 mb-1">🔄 Adaptive Interaction</h4>
                  <p class="text-indigo-600 text-sm">Systems adjust behavior based on user expertise and context</p>
                </div>
                <div class="bg-white p-3 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-indigo-700 mb-1">🧠 Shared Mental Models</h4>
                  <p class="text-indigo-600 text-sm">Humans and AI maintain aligned understanding of goals and status</p>
                </div>
                <div class="bg-white p-3 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-indigo-700 mb-1">📢 Feedback Mechanisms</h4>
                  <p class="text-indigo-600 text-sm">Continuous feedback for error correction and learning</p>
                </div>
                <div class="bg-white p-3 rounded-lg shadow-sm">
                  <h4 class="font-semibold text-indigo-700 mb-1">🔀 Flexibility</h4>
                  <p class="text-indigo-600 text-sm">Allow human override and control where needed</p>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-r from-teal-50 via-cyan-50 to-blue-50 border-l-4 border-teal-500 p-6 rounded-r-xl mb-6 shadow-lg">
              <h3 class="font-bold text-teal-800 mb-3 flex items-center text-lg">
                <span class="text-3xl mr-3">🌟</span>
                Summary
              </h3>
              <ul class="text-teal-700 space-y-2">
                <li>• Human-AI collaboration transforms how tasks are done across sectors</li>
                <li>• Successful collaboration depends on leveraging the strengths of both humans and AI</li>
                <li>• Addressing technical, social, and ethical challenges is key to maximizing benefits</li>
                <li>• Designing for collaboration requires focus on trust, transparency, and adaptability</li>
                <li>• Co-evolution represents a fundamental shift in human-machine relationships</li>
              </ul>
            </div>

            <div class="bg-gradient-to-r from-yellow-50 via-amber-50 to-orange-50 border-l-4 border-yellow-500 p-6 rounded-r-xl shadow-lg">
              <h3 class="font-bold text-yellow-800 mb-3 flex items-center text-lg">
                <span class="text-3xl mr-3">💭</span>
                Discussion Questions
              </h3>
              <ul class="text-yellow-700 space-y-2">
                <li>• What are the most promising domains for human-AI collaboration?</li>
                <li>• How can we design AI to better support human decision-making and creativity?</li>
                <li>• What ethical issues arise from shared decision-making between humans and AI?</li>
                <li>• How do we maintain human agency and control in collaborative settings?</li>
                <li>• How does the co-evolution of humans and machines challenge traditional notions of human identity?</li>
                <li>• Can machines ever have consciousness or a self?</li>
              </ul>
            </div>
          </div>
        `
      }
    },
    {
      id: 33,
      title: 'AI and Human Relations Certification',
      duration: '10 min',
      type: 'certificate',
      content: {
        title: 'AI and Human Relations Professional Certificate',
        description: 'Congratulations on completing the AI and Human Relations course! You have gained comprehensive knowledge in artificial intelligence fundamentals, human-AI collaboration, ethical implications, and designing human-centered AI systems.',
        certificateText: 'You are now certified in AI and Human Relations and equipped to navigate the complex intersection of artificial intelligence and human interaction in professional and personal contexts.'
      }
    }
  ]
};
