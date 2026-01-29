
import type { Course } from '@/types/course';

export const aiProgrammingCourse: Course = {
  id: 'ai-programming-course',
  title: "AI-Assisted Programming: Enhancing Software Development with Artificial Intelligence",
  description: "Master the integration of AI tools into your software development workflow. Learn to use GitHub Copilot, ChatGPT, and other AI assistants to enhance coding productivity, debugging, and documentation.",
  instructor: {
    name: "Dr. Sarah Chen",
    title: "AI Researcher & Software Engineer",
    bio: "AI researcher and software engineer with 10+ years of experience in machine learning and developer tools.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  },
  level: "intermediate",
  duration: "6 weeks (3-4 hours/week)",
  students: 1247,
  rating: 4.8,
  price: 500,
  currency: "ZAR",
  is_free: false,
  thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop",
  category: "Technology",
  learningObjectives: [
    "Understand how AI tools assist in software development",
    "Integrate AI coding assistants like GitHub Copilot, ChatGPT, Tabnine, etc., into their workflow",
    "Use AI to generate, debug, refactor, and document code",
    "Understand the limitations, ethics, and best practices of using AI in coding",
    "Build and deploy simple AI-based coding tools"
  ],
  modules: [
    {
      id: 1,
      title: "Week 1: Introduction to AI in Programming",
      description: "Learn the fundamentals of AI assistance in programming",
      lessons: [
        {
          id: 1,
          title: "Evolution of programming assistance tools",
          duration: "15:00",
          type: "video",
          content: {
            videoUrl: "https://www.youtube.com/embed/0-L1QnRxIcE",
            textContent: `
              <h2>Evolution of Programming Assistance Tools</h2>
              <p>The evolution of programming assistance tools reflects the journey from basic code editors to today's intelligent AI-powered assistants.</p>
              
              <h3>1. Text Editors and Syntax Highlighting (1970s–1980s)</h3>
              <ul>
                <li><strong>Early Tools:</strong> Programmers used basic text editors like Vi or Emacs</li>
                <li><strong>Assistance Provided:</strong> None beyond text editing</li>
                <li><strong>Advancement:</strong> Introduction of syntax highlighting—different colors for keywords, strings, and errors</li>
              </ul>

              <h3>2. Integrated Development Environments (IDEs) (1990s)</h3>
              <ul>
                <li><strong>Examples:</strong> Turbo Pascal, Visual Studio, Eclipse</li>
                <li><strong>New Features:</strong> Auto-completion (IntelliSense), Debuggers, Refactoring tools, Code navigation</li>
                <li><strong>Impact:</strong> Significantly reduced the need to memorize functions or search for errors manually</li>
              </ul>

              <h3>3. Static Code Analysis & Linters (2000s)</h3>
              <ul>
                <li><strong>Purpose:</strong> Automatically analyze code for potential bugs, stylistic errors, and security flaws</li>
                <li><strong>Examples:</strong> ESLint, Pylint, SonarQube</li>
                <li><strong>Benefits:</strong> Encouraged code quality and team-wide consistency in large codebases</li>
              </ul>

              <h3>4. Online Collaboration & Snippet Sharing (2010s)</h3>
              <ul>
                <li><strong>Platforms:</strong> Stack Overflow, GitHub Gists, JSFiddle</li>
                <li><strong>Evolutionary Shift:</strong> Developers started relying on community-shared snippets, documentation, and tutorials</li>
              </ul>

              <h3>5. AI-Powered Assistants (2020s–Present)</h3>
              <ul>
                <li><strong>Key Players:</strong> GitHub Copilot, ChatGPT, Tabnine, Amazon CodeWhisperer</li>
                <li><strong>Capabilities:</strong> Suggest complete code blocks, Explain and debug code, Refactor and optimize, Generate documentation and tests</li>
                <li><strong>Underlying Tech:</strong> Large Language Models (LLMs) trained on massive codebases</li>
              </ul>

              <h3>Summary Timeline</h3>
              <table class="border-collapse border border-gray-300">
                <thead>
                  <tr class="bg-gray-100">
                    <th class="border border-gray-300 p-2">Era</th>
                    <th class="border border-gray-300 p-2">Tool Type</th>
                    <th class="border border-gray-300 p-2">Assistance Provided</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border border-gray-300 p-2">1970s–1980s</td>
                    <td class="border border-gray-300 p-2">Text Editors</td>
                    <td class="border border-gray-300 p-2">Basic editing, no coding help</td>
                  </tr>
                  <tr>
                    <td class="border border-gray-300 p-2">1990s</td>
                    <td class="border border-gray-300 p-2">IDEs</td>
                    <td class="border border-gray-300 p-2">Auto-complete, debug, refactor tools</td>
                  </tr>
                  <tr>
                    <td class="border border-gray-300 p-2">2000s</td>
                    <td class="border border-gray-300 p-2">Linters & Analyzers</td>
                    <td class="border border-gray-300 p-2">Static analysis, quality enforcement</td>
                  </tr>
                  <tr>
                    <td class="border border-gray-300 p-2">2010s</td>
                    <td class="border border-gray-300 p-2">Online Snippets & Platforms</td>
                    <td class="border border-gray-300 p-2">Reusable code, peer help</td>
                  </tr>
                  <tr>
                    <td class="border border-gray-300 p-2">2020s</td>
                    <td class="border border-gray-300 p-2">AI Code Assistants</td>
                    <td class="border border-gray-300 p-2">Code generation, debugging, documentation</td>
                  </tr>
                </tbody>
              </table>
            `
          }
        },
        {
          id: 2,
          title: "Types of AI tools: autocompletion, code generation, static analysis",
          duration: "12:30",
          type: "video",
          content: {
            videoUrl: "https://www.youtube.com/embed/Kd0QGZMy_tA",
            textContent: `
              <h2>Types of AI Tools: Autocompletion, Code Generation, Static Analysis</h2>
              <p>Artificial Intelligence (AI) has significantly transformed the software development landscape. Among the various categories of AI tools used by developers, autocompletion, code generation, and static analysis stand out as vital components in modern development workflows.</p>
              
              <h3>1. Autocompletion</h3>
              <p><strong>Definition:</strong> Autocompletion tools help developers by predicting and suggesting the next word, function, variable, or code snippet as they type. These tools rely on context and learned patterns from large codebases to provide accurate suggestions.</p>
              
              <h4>Examples:</h4>
              <ul>
                <li><strong>GitHub Copilot:</strong> Uses OpenAI Codex to suggest lines or blocks of code</li>
                <li><strong>IntelliSense (Visual Studio):</strong> Offers keyword completion, method suggestions, and parameter info</li>
                <li><strong>TabNine:</strong> AI-powered autocompletion tool using deep learning models</li>
              </ul>

              <h4>Benefits:</h4>
              <ul>
                <li>Reduces typing effort</li>
                <li>Minimizes syntax and logical errors</li>
                <li>Increases coding speed</li>
                <li>Helps beginners understand API usage and coding patterns</li>
              </ul>

              <h4>Challenges:</h4>
              <ul>
                <li>Can sometimes provide irrelevant or incorrect suggestions</li>
                <li>Over-reliance may reduce understanding of core logic</li>
                <li>Privacy concerns if code is sent to external servers for analysis</li>
              </ul>

              <h3>2. Code Generation</h3>
              <p><strong>Definition:</strong> Code generation tools can create entire functions, classes, or even applications based on high-level descriptions or prompts. They transform natural language or partial code into functional software components.</p>
              
              <h4>Types:</h4>
              <ul>
                <li><strong>Template-based generation:</strong> Uses predefined templates for generating boilerplate code</li>
                <li><strong>AI-based generation:</strong> Leverages machine learning (especially large language models) to create unique and complex code</li>
              </ul>

              <h4>Examples:</h4>
              <ul>
                <li><strong>OpenAI Codex (used in Copilot):</strong> Generates code from natural language instructions</li>
                <li><strong>Amazon CodeWhisperer:</strong> Provides suggestions and generates code for AWS-related tasks</li>
                <li><strong>Sketch2Code (Microsoft):</strong> Converts hand-drawn UI sketches into HTML code</li>
              </ul>

              <h4>Benefits:</h4>
              <ul>
                <li>Speeds up prototyping and repetitive tasks</li>
                <li>Enhances productivity by reducing manual effort</li>
                <li>Assists non-programmers in developing simple applications</li>
              </ul>

              <h4>Challenges:</h4>
              <ul>
                <li>Generated code may not be optimized or secure</li>
                <li>May introduce bugs if misunderstood by the model</li>
                <li>Needs human validation for production readiness</li>
              </ul>

              <h3>3. Static Analysis</h3>
              <p><strong>Definition:</strong> Static analysis tools examine code without executing it, to detect potential errors, vulnerabilities, and code quality issues. AI enhances these tools by identifying complex patterns and predicting potential risks based on historical data.</p>
              
              <h4>Functionality Includes:</h4>
              <ul>
                <li>Syntax and semantic error detection</li>
                <li>Security vulnerability scanning</li>
                <li>Code style and standards enforcement</li>
                <li>Dead code detection</li>
                <li>Dependency and flow analysis</li>
              </ul>

              <h4>Examples:</h4>
              <ul>
                <li><strong>SonarQube:</strong> Detects bugs, code smells, and security vulnerabilities</li>
                <li><strong>DeepCode (by Snyk):</strong> AI-powered static analysis focusing on security</li>
                <li><strong>Codacy:</strong> Offers automated code reviews and analysis</li>
              </ul>

              <h4>Benefits:</h4>
              <ul>
                <li>Improves code quality before runtime</li>
                <li>Helps maintain consistency across large codebases</li>
                <li>Reduces cost of fixing bugs by catching them early</li>
                <li>Enhances security by flagging known vulnerabilities</li>
              </ul>

              <h4>Challenges:</h4>
              <ul>
                <li>Can produce false positives/negatives</li>
                <li>May slow down development pipelines if too strict</li>
                <li>Needs integration with CI/CD for maximum benefit</li>
              </ul>

              <h3>Summary Comparison Table</h3>
              <table class="border-collapse border border-gray-300">
                <thead>
                  <tr class="bg-gray-100">
                    <th class="border border-gray-300 p-2">Feature</th>
                    <th class="border border-gray-300 p-2">Autocompletion</th>
                    <th class="border border-gray-300 p-2">Code Generation</th>
                    <th class="border border-gray-300 p-2">Static Analysis</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border border-gray-300 p-2">Goal</td>
                    <td class="border border-gray-300 p-2">Assist while coding</td>
                    <td class="border border-gray-300 p-2">Automate code creation</td>
                    <td class="border border-gray-300 p-2">Detect issues in code</td>
                  </tr>
                  <tr>
                    <td class="border border-gray-300 p-2">Execution</td>
                    <td class="border border-gray-300 p-2">Real-time suggestions</td>
                    <td class="border border-gray-300 p-2">Generates blocks of code</td>
                    <td class="border border-gray-300 p-2">Analyzes code without running</td>
                  </tr>
                  <tr>
                    <td class="border border-gray-300 p-2">Use Case</td>
                    <td class="border border-gray-300 p-2">Faster typing, IDE help</td>
                    <td class="border border-gray-300 p-2">Function/class generation</td>
                    <td class="border border-gray-300 p-2">Quality and security checks</td>
                  </tr>
                  <tr>
                    <td class="border border-gray-300 p-2">AI Involvement</td>
                    <td class="border border-gray-300 p-2">Predict next tokens</td>
                    <td class="border border-gray-300 p-2">Natural language to code</td>
                    <td class="border border-gray-300 p-2">Pattern recognition, bug prediction</td>
                  </tr>
                  <tr>
                    <td class="border border-gray-300 p-2">Examples</td>
                    <td class="border border-gray-300 p-2">Copilot, TabNine</td>
                    <td class="border border-gray-300 p-2">Codex, CodeWhisperer</td>
                    <td class="border border-gray-300 p-2">SonarQube, DeepCode</td>
                  </tr>
                </tbody>
              </table>
            `
          }
        },
        {
          id: 3,
          title: "Overview of leading tools (Copilot, ChatGPT, Tabnine, Cody, CodeWhisperer)",
          duration: "18:45",
          type: "video",
          content: {
            videoUrl: "https://www.youtube.com/embed/gq507TbglYY",
            textContent: `
              <h2>Overview of Leading AI Developer Tools</h2>
              <p>As AI continues to revolutionize software development, several advanced tools have emerged to assist developers with code generation, autocompletion, debugging, and documentation. Among these, GitHub Copilot, ChatGPT, Tabnine, Cody (by Sourcegraph), and Amazon CodeWhisperer are leading the transformation of the coding experience.</p>
              
              <h3>1. GitHub Copilot</h3>
              <ul>
                <li><strong>Developed by:</strong> GitHub in collaboration with OpenAI</li>
                <li><strong>Powered by:</strong> OpenAI Codex (based on GPT models)</li>
                <li><strong>Functionality:</strong>
                  <ul>
                    <li>Autocompletes code in real time</li>
                    <li>Suggests full functions, loops, boilerplate code, and test cases</li>
                    <li>Supports multiple languages (JavaScript, Python, TypeScript, Go, Ruby, etc.)</li>
                    <li>Integrates with Visual Studio Code, JetBrains IDEs, Neovim, and others</li>
                  </ul>
                </li>
                <li><strong>Strengths:</strong> Highly contextual suggestions based on surrounding code, Handles complex function implementations, Frequently updated and deeply integrated with GitHub workflows</li>
                <li><strong>Limitations:</strong> Sometimes generates insecure or suboptimal code, Requires user verification and editing</li>
              </ul>

              <h3>2. ChatGPT (for Coding Assistance)</h3>
              <ul>
                <li><strong>Developed by:</strong> OpenAI</li>
                <li><strong>Powered by:</strong> GPT-4 / GPT-4.5 (with Pro version access)</li>
                <li><strong>Functionality:</strong>
                  <ul>
                    <li>Natural language interface for querying, debugging, explaining, or generating code</li>
                    <li>Can review and refactor code snippets</li>
                    <li>Used for pseudocode-to-code generation, algorithm explanation, and learning new languages</li>
                    <li>Plugins and custom GPTs can integrate ChatGPT with IDEs and other dev tools</li>
                  </ul>
                </li>
                <li><strong>Strengths:</strong> Powerful conversational interface, Supports multi-turn discussions and explanations, Excellent for learning and reasoning tasks</li>
                <li><strong>Limitations:</strong> Not directly embedded in IDEs (unless integrated manually), Less real-time than autocompletion tools</li>
              </ul>

              <h3>3. Tabnine</h3>
              <ul>
                <li><strong>Developed by:</strong> Tabnine</li>
                <li><strong>Powered by:</strong> Proprietary AI models (based on GPT and smaller models)</li>
                <li><strong>Functionality:</strong>
                  <ul>
                    <li>Local and cloud-based code autocompletion</li>
                    <li>Predicts the next line or token based on context</li>
                    <li>Supports multiple languages and frameworks</li>
                    <li>Strong focus on privacy with local model options</li>
                  </ul>
                </li>
                <li><strong>Strengths:</strong> Fast and lightweight, Offers both free and enterprise versions, Excellent for teams with privacy concerns</li>
                <li><strong>Limitations:</strong> Less intelligent on complex multi-line logic compared to Copilot or GPT, Limited reasoning capabilities</li>
              </ul>

              <h3>4. Cody (by Sourcegraph)</h3>
              <ul>
                <li><strong>Developed by:</strong> Sourcegraph</li>
                <li><strong>Powered by:</strong> LLMs (Claude, GPT-4, etc.) + Sourcegraph's code graph</li>
                <li><strong>Functionality:</strong>
                  <ul>
                    <li>Provides context-aware answers by referencing your entire codebase</li>
                    <li>Supports code navigation, refactoring, and high-quality code search</li>
                    <li>Great for large codebases and enterprise settings</li>
                  </ul>
                </li>
                <li><strong>Strengths:</strong> Deep understanding of codebase due to Sourcegraph's indexing, Very useful for onboarding, documentation generation, and large project maintenance, Highly accurate in referencing internal symbols and code patterns</li>
                <li><strong>Limitations:</strong> Requires integration with Sourcegraph, Maybe overkill for small projects</li>
              </ul>

              <h3>5. Amazon CodeWhisperer</h3>
              <ul>
                <li><strong>Developed by:</strong> Amazon Web Services (AWS)</li>
                <li><strong>Powered by:</strong> Proprietary ML models</li>
                <li><strong>Functionality:</strong>
                  <ul>
                    <li>Code suggestion and generation tailored to AWS environments</li>
                    <li>Helps write secure, efficient code using AWS APIs</li>
                    <li>Integrated with IDEs (VS Code, JetBrains) and AWS tooling</li>
                  </ul>
                </li>
                <li><strong>Strengths:</strong> Strong performance with AWS-specific tasks (e.g., Lambda, S3, DynamoDB), Free tier for individual users, Built-in security scans for detecting vulnerabilities</li>
                <li><strong>Limitations:</strong> Less effective for general-purpose development outside AWS, Smaller model context compared to GPT-4</li>
              </ul>

              <h3>Comparison Table</h3>
              <table class="border-collapse border border-gray-300">
                <thead>
                  <tr class="bg-gray-100">
                    <th class="border border-gray-300 p-2">Tool</th>
                    <th class="border border-gray-300 p-2">Best Use Case</th>
                    <th class="border border-gray-300 p-2">IDE Integration</th>
                    <th class="border border-gray-300 p-2">Context Awareness</th>
                    <th class="border border-gray-300 p-2">Strengths</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border border-gray-300 p-2">GitHub Copilot</td>
                    <td class="border border-gray-300 p-2">Real-time autocompletion</td>
                    <td class="border border-gray-300 p-2">✅ Yes</td>
                    <td class="border border-gray-300 p-2">✅ High</td>
                    <td class="border border-gray-300 p-2">Fast, deep IDE integration</td>
                  </tr>
                  <tr>
                    <td class="border border-gray-300 p-2">ChatGPT</td>
                    <td class="border border-gray-300 p-2">Code explanation & reasoning</td>
                    <td class="border border-gray-300 p-2">❌ (Manual)</td>
                    <td class="border border-gray-300 p-2">✅ Very High</td>
                    <td class="border border-gray-300 p-2">Conversational, multi-step logic</td>
                  </tr>
                  <tr>
                    <td class="border border-gray-300 p-2">Tabnine</td>
                    <td class="border border-gray-300 p-2">Lightweight autocompletion</td>
                    <td class="border border-gray-300 p-2">✅ Yes</td>
                    <td class="border border-gray-300 p-2">⚠️ Medium</td>
                    <td class="border border-gray-300 p-2">Fast, private, local options</td>
                  </tr>
                  <tr>
                    <td class="border border-gray-300 p-2">Cody</td>
                    <td class="border border-gray-300 p-2">Large codebase understanding</td>
                    <td class="border border-gray-300 p-2">✅ With Sourcegraph</td>
                    <td class="border border-gray-300 p-2">✅ High</td>
                    <td class="border border-gray-300 p-2">Project-scale code intelligence</td>
                  </tr>
                  <tr>
                    <td class="border border-gray-300 p-2">CodeWhisperer</td>
                    <td class="border border-gray-300 p-2">AWS-focused development</td>
                    <td class="border border-gray-300 p-2">✅ Yes</td>
                    <td class="border border-gray-300 p-2">⚠️ Moderate</td>
                    <td class="border border-gray-300 p-2">Optimized for AWS & secure code</td>
                  </tr>
                </tbody>
              </table>

              <h3>Conclusion</h3>
              <p>These leading AI coding tools each cater to different developer needs:</p>
              <ul>
                <li>Use <strong>GitHub Copilot</strong> for rapid, real-time coding inside your IDE</li>
                <li>Use <strong>ChatGPT</strong> for in-depth assistance, explanations, and flexible problem-solving</li>
                <li>Use <strong>Tabnine</strong> when you want privacy and fast completions on local devices</li>
                <li>Use <strong>Cody</strong> for understanding and navigating large, complex codebases</li>
                <li>Use <strong>CodeWhisperer</strong> if you're working heavily within AWS services and need secure suggestions</li>
              </ul>
            `
          }
        },
        {
          id: 4,
          title: "Hands-on: Setting up GitHub Copilot and ChatGPT for coding",
          duration: "20:00",
          type: "video",
          content: {
            videoUrl: "https://www.youtube.com/embed/98HKq-YQHl4",
            textContent: `
              <h2>Hands-on Activity: Setting up GitHub Copilot and ChatGPT for Coding</h2>
              <p>Artificial Intelligence tools like GitHub Copilot and ChatGPT have become essential aids in modern software development. This hands-on activity guides you through setting up both tools to enhance your coding productivity, from autocompletion to conversational code assistance.</p>
              
              <h3>1. Setting up GitHub Copilot</h3>
              <h4>What is GitHub Copilot?</h4>
              <p>GitHub Copilot is an AI-powered code completion tool developed by GitHub and OpenAI. It provides real-time code suggestions, entire functions, boilerplate code, and test cases directly inside your IDE.</p>
              
              <h4>Requirements:</h4>
              <ul>
                <li>A GitHub account (with Copilot access subscription or trial)</li>
                <li>A supported IDE such as Visual Studio Code, JetBrains IDEs, or Neovim</li>
              </ul>

              <h4>Step-by-Step Setup:</h4>
              <h5>Step 1: Get GitHub Copilot Access</h5>
              <ul>
                <li>Go to GitHub Copilot and sign up for a subscription or start a free trial</li>
                <li>Confirm your GitHub account has Copilot enabled</li>
              </ul>

              <h5>Step 2: Install GitHub Copilot Extension in IDE</h5>
              <p><strong>For Visual Studio Code:</strong></p>
              <ul>
                <li>Open VS Code</li>
                <li>Go to Extensions (Ctrl+Shift+X)</li>
                <li>Search for "GitHub Copilot"</li>
                <li>Click Install</li>
              </ul>
              
              <p><strong>For JetBrains IDEs (IntelliJ, PyCharm, etc.):</strong></p>
              <ul>
                <li>Use the JetBrains Marketplace to find and install the Copilot plugin</li>
              </ul>

              <h5>Step 3: Sign in to GitHub inside your IDE</h5>
              <ul>
                <li>After installing, open any code file</li>
                <li>When prompted, sign in with your GitHub credentials. This authenticates your Copilot usage</li>
              </ul>

              <h5>Step 4: Start Coding with GitHub Copilot</h5>
              <ul>
                <li>Begin typing code or comments describing what you want</li>
                <li>Copilot will provide suggestions inline; use Tab to accept or arrow keys to browse alternatives</li>
              </ul>

              <h4>Tips:</h4>
              <ul>
                <li>Review Copilot's suggestions carefully; some may be incorrect or insecure</li>
                <li>Use comments to guide Copilot for more accurate code generation</li>
                <li>Explore Copilot Labs (experimental features) if available</li>
              </ul>

              <h3>2. Setting up ChatGPT for Coding Assistance</h3>
              <h4>What is ChatGPT for Coding?</h4>
              <p>ChatGPT by OpenAI is a conversational AI that can generate, explain, debug, and refactor code based on natural language prompts. It is not embedded inside IDEs by default but can be integrated via plugins or used separately.</p>
              
              <h4>Requirements:</h4>
              <ul>
                <li>OpenAI account with access to ChatGPT (free or paid)</li>
                <li>Internet access to use the web interface or APIs</li>
                <li>(Optional) Plugins/extensions for IDE integration</li>
              </ul>

              <h4>Step-by-Step Setup:</h4>
              <h5>Step 1: Access ChatGPT</h5>
              <ul>
                <li>Visit chat.openai.com</li>
                <li>Log in or create a free OpenAI account</li>
                <li>For advanced coding assistance, subscribe to ChatGPT Plus to access GPT-4/4.5 models</li>
              </ul>

              <h5>Step 2: Use ChatGPT via Web Interface</h5>
              <p>Type your coding queries, e.g.:</p>
              <ul>
                <li>"Write a Python function to sort a list of numbers."</li>
                <li>"Explain this JavaScript snippet."</li>
                <li>"Find bugs in this C++ code."</li>
              </ul>
              <p>ChatGPT will respond with code snippets, explanations, or suggestions.</p>

              <h5>Step 3 (Optional): IDE Integration</h5>
              <ul>
                <li>For some IDEs (VS Code, JetBrains), install unofficial ChatGPT plugins/extensions from their marketplaces</li>
                <li>Authenticate with your OpenAI API key or ChatGPT credentials</li>
                <li>Use the plugin sidebar or commands to interact with ChatGPT without leaving your editor</li>
              </ul>

              <h4>Tips:</h4>
              <ul>
                <li>Use multi-turn conversations to refine or expand code outputs</li>
                <li>Experiment with prompt phrasing for best results</li>
                <li>Always validate generated code for correctness and security</li>
              </ul>

              <h3>3. Best Practices for Using GitHub Copilot and ChatGPT Together</h3>
              <ul>
                <li>Use GitHub Copilot for inline real-time autocompletion and code snippets while coding</li>
                <li>Use ChatGPT for more complex queries, understanding concepts, code review, or when you need explanations</li>
                <li>Combine Copilot's rapid suggestions with ChatGPT's reasoning to boost productivity</li>
                <li>Always review and test AI-generated code thoroughly before deployment</li>
              </ul>

              <h3>4. Troubleshooting Common Issues</h3>
              <table class="border-collapse border border-gray-300">
                <thead>
                  <tr class="bg-gray-100">
                    <th class="border border-gray-300 p-2">Issue</th>
                    <th class="border border-gray-300 p-2">Possible Solution</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border border-gray-300 p-2">GitHub Copilot not showing suggestions</td>
                    <td class="border border-gray-300 p-2">Check subscription status, re-login, restart IDE, update extension</td>
                  </tr>
                  <tr>
                    <td class="border border-gray-300 p-2">ChatGPT access denied or slow response</td>
                    <td class="border border-gray-300 p-2">Check OpenAI account status, internet connectivity, try GPT-4 subscription</td>
                  </tr>
                  <tr>
                    <td class="border border-gray-300 p-2">IDE plugin errors</td>
                    <td class="border border-gray-300 p-2">Verify plugin compatibility, update IDE and extensions, consult official docs</td>
                  </tr>
                </tbody>
              </table>

              <h3>5. Additional Resources</h3>
              <ul>
                <li>GitHub Copilot Documentation</li>
                <li>OpenAI ChatGPT FAQs</li>
                <li>YouTube tutorials for Copilot and ChatGPT integration</li>
                <li>Developer communities like Stack Overflow and GitHub Discussions</li>
              </ul>

              <h3>Summary</h3>
              <p>Setting up GitHub Copilot and ChatGPT involves creating accounts, installing extensions or using web interfaces, and authenticating your access. These tools together enable powerful AI-driven coding assistance that enhances productivity, learning, and code quality.</p>
            `
          }
        },
        {
          id: 5,
          title: "Week 1 Knowledge Check",
          duration: "10:00",
          type: "quiz",
          content: {
            questions: [
              {
                question: "Which AI tool is developed by GitHub in collaboration with OpenAI?",
                options: [
                  "Tabnine",
                  "Cody",
                  "GitHub Copilot",
                  "Amazon CodeWhisperer"
                ],
                correct: 2,
                explanation: "GitHub Copilot is developed by GitHub in collaboration with OpenAI and is powered by OpenAI Codex."
              },
              {
                question: "What powers GitHub Copilot's code generation capabilities?",
                options: [
                  "Amazon ML models",
                  "OpenAI Codex (GPT models)",
                  "Tabnine proprietary AI",
                  "Sourcegraph code graph"
                ],
                correct: 1,
                explanation: "GitHub Copilot is powered by OpenAI Codex, which is based on GPT models."
              },
              {
                question: "Which AI tool provides a natural language conversational interface for coding assistance?",
                options: [
                  "GitHub Copilot",
                  "ChatGPT",
                  "Tabnine",
                  "Cody"
                ],
                correct: 1,
                explanation: "ChatGPT provides a conversational interface for coding assistance, explanations, and problem-solving."
              },
              {
                question: "What is one main limitation of ChatGPT compared to tools like Copilot?",
                options: [
                  "Does not support multiple languages",
                  "Cannot generate code",
                  "Not directly embedded in IDEs by default",
                  "No conversational ability"
                ],
                correct: 2,
                explanation: "ChatGPT is not directly embedded in IDEs by default, unlike tools like GitHub Copilot."
              },
              {
                question: "Which tool is known for strong privacy features and offers local AI models for code completion?",
                options: [
                  "ChatGPT",
                  "Tabnine",
                  "Cody",
                  "Amazon CodeWhisperer"
                ],
                correct: 1,
                explanation: "Tabnine is known for its strong focus on privacy and offers local model options for code completion."
              },
              {
                question: "Cody by Sourcegraph is especially useful for:",
                options: [
                  "Small projects with simple code",
                  "Large codebases and enterprise environments",
                  "Writing AWS-specific code",
                  "Generating UI code from sketches"
                ],
                correct: 1,
                explanation: "Cody is particularly useful for large codebases and enterprise environments due to its deep codebase understanding."
              },
              {
                question: "Amazon CodeWhisperer is optimized for which environment?",
                options: [
                  "Google Cloud Platform",
                  "Microsoft Azure",
                  "AWS (Amazon Web Services)",
                  "On-premises servers"
                ],
                correct: 2,
                explanation: "Amazon CodeWhisperer is specifically optimized for AWS environments and services."
              },
              {
                question: "What is a best practice when using AI-generated code from Copilot or ChatGPT?",
                options: [
                  "Use it without changes",
                  "Trust it for secure applications immediately",
                  "Always review and test the code thoroughly",
                  "Copy and paste from Stack Overflow instead"
                ],
                correct: 2,
                explanation: "Always review and test AI-generated code thoroughly before using it in production applications."
              }
            ]
          }
        }
      ]
    },
    {
      id: 2,
      title: "Week 2: AI-Assisted Code Generation",
      description: "Master code generation with AI tools",
      lessons: [
        {
          id: 6,
          title: "Writing prompts for code generation",
          duration: "16:20",
          type: "video",
          content: {
            videoUrl: "https://www.youtube.com/embed/example6",
            textContent: `
              <h2>Writing Prompts for Code Generation</h2>
              <p>Learn how to write effective prompts for AI code generation tools to get the best results.</p>
              
              <h3>Key Principles for Effective Prompts</h3>
              <ul>
                <li>Be specific and clear in your requirements</li>
                <li>Provide context about the programming language and framework</li>
                <li>Include examples of expected input and output</li>
                <li>Specify any constraints or requirements</li>
              </ul>

              <h3>Examples of Good Prompts</h3>
              <h4>Example 1: Function Creation</h4>
              <p><strong>Good Prompt:</strong> "Write a Python function that takes a list of integers and returns the sum of all even numbers. Include error handling for non-integer values."</p>
              
              <h4>Example 2: API Integration</h4>
              <p><strong>Good Prompt:</strong> "Create a JavaScript function using fetch() to get user data from a REST API endpoint '/api/users/{id}'. Handle HTTP errors and return the user object or null if not found."</p>
            `
          }
        },
        {
          id: 7,
          title: "Building functions from specifications using AI",
          duration: "14:15",
          type: "video",
          content: {
            videoUrl: "https://www.youtube.com/embed/example7",
            textContent: `
              <h2>Building Functions from Specifications Using AI</h2>
              <p>Transform requirements into working code using AI assistance.</p>
              
              <h3>Step-by-Step Process</h3>
              <ol>
                <li>Analyze the specification thoroughly</li>
                <li>Break down complex requirements into smaller parts</li>
                <li>Use AI to generate initial code structure</li>
                <li>Refine and test the generated code</li>
                <li>Add error handling and edge cases</li>
              </ol>
            `
          }
        },
        {
          id: 8,
          title: "Code generation for different languages (Python, JavaScript, etc.)",
          duration: "19:30",
          type: "video",
          content: {
            videoUrl: "https://www.youtube.com/embed/example8",
            textContent: `
              <h2>Code Generation for Different Languages</h2>
              <p>Generate code across multiple programming languages with AI.</p>
              
              <h3>Language-Specific Considerations</h3>
              <h4>Python</h4>
              <ul>
                <li>Focus on Pythonic code style</li>
                <li>Use type hints for better code clarity</li>
                <li>Follow PEP 8 conventions</li>
              </ul>

              <h4>JavaScript</h4>
              <ul>
                <li>Consider ES6+ features</li>
                <li>Handle asynchronous operations properly</li>
                <li>Use modern syntax and best practices</li>
              </ul>
            `
          }
        },
        {
          id: 9,
          title: "Hands-on: Create a REST API using AI assistance",
          duration: "25:00",
          type: "assignment",
          content: {
            title: "Build REST API with AI",
            description: "Create a complete REST API using AI assistance",
            requirements: [
              "Design API endpoints for user management",
              "Implement CRUD operations for users",
              "Add proper error handling and validation",
              "Write comprehensive API documentation",
              "Include unit tests for all endpoints"
            ],
            deliverables: "Working REST API with complete documentation and tests",
            rubric: {
              "API Functionality": "All endpoints work correctly and handle edge cases",
              "Code Quality": "Clean, well-structured, and maintainable code",
              "Documentation": "Complete API documentation with examples",
              "Testing": "Comprehensive test coverage for all functionality"
            }
          }
        }
      ]
    },
    {
      id: 3,
      title: "Week 3: AI-Assisted Debugging and Refactoring",
      description: "Use AI to debug and improve existing code",
      lessons: [
        {
          id: 10,
          title: "Prompting AI to identify and fix bugs",
          duration: "17:45",
          type: "video",
          content: {
            videoUrl: "https://www.youtube.com/embed/example10",
            textContent: `
              <h2>Prompting AI to Identify and Fix Bugs</h2>
              <p>Learn techniques for using AI to identify and fix code bugs effectively.</p>
              
              <h3>Effective Debugging Prompts</h3>
              <ul>
                <li>Provide the complete code context</li>
                <li>Describe the expected vs actual behavior</li>
                <li>Include error messages and stack traces</li>
                <li>Mention the environment and dependencies</li>
              </ul>
            `
          }
        }
      ]
    },
    {
      id: 4,
      title: "Week 4: AI-Assisted Documentation and Testing",
      description: "Generate meaningful documentation and comprehensive tests",
      lessons: [
        {
          id: 11,
          title: "Generating meaningful docstrings and README files",
          duration: "15:30",
          type: "video",
          content: {
            videoUrl: "https://www.youtube.com/embed/example11",
            textContent: `
              <h2>Generating Meaningful Documentation</h2>
              <p>Learn how to use AI to create comprehensive documentation for your projects.</p>
            `
          }
        }
      ]
    },
    {
      id: 5,
      title: "Week 5: Building Custom AI Coding Tools",
      description: "Create your own AI-powered development tools",
      lessons: [
        {
          id: 12,
          title: "Basics of natural language processing in coding tools",
          duration: "20:00",
          type: "video",
          content: {
            videoUrl: "https://www.youtube.com/embed/example12",
            textContent: `
              <h2>NLP Basics for Coding Tools</h2>
              <p>Understand the fundamentals of natural language processing in the context of coding tools.</p>
            `
          }
        }
      ]
    },
    {
      id: 6,
      title: "Week 6: Ethics, Limitations & Real-World Applications",
      description: "Understand the ethical implications and limitations of AI in coding",
      lessons: [
        {
          id: 13,
          title: "Intellectual property and licensing concerns",
          duration: "18:15",
          type: "video",
          content: {
            videoUrl: "https://www.youtube.com/embed/example13",
            textContent: `
              <h2>IP and Licensing in AI-Generated Code</h2>
              <p>Explore the legal and ethical considerations when using AI-generated code in your projects.</p>
            `
          }
        },
        {
          id: 14,
          title: "Final Project: AI-assisted application",
          duration: "120:00",
          type: "assignment",
          content: {
            title: "Capstone Project: AI-Assisted Application",
            description: "Build and present a complete application using AI assistance throughout the development process",
            requirements: [
              "Use AI tools for initial code generation",
              "Implement AI-assisted debugging and refactoring",
              "Generate documentation using AI",
              "Create comprehensive tests with AI assistance",
              "Present your development process and learnings"
            ],
            deliverables: "Complete application with documentation, tests, and presentation",
            rubric: {
              "Application Functionality": "Working application that meets requirements",
              "AI Tool Usage": "Effective use of AI tools throughout development",
              "Code Quality": "Clean, maintainable, and well-documented code",
              "Presentation": "Clear presentation of process and learnings"
            }
          }
        }
      ]
    }
  ]
};
