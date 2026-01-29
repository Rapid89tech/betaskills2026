import type { Lesson } from '@/types/course';


export const lesson5ProjectSpecificConsiderations: Lesson = {
  id: 5,
  title: 'Project-Specific Considerations',
  content: (
    <div className="space-y-6">
      <div className="prose prose-lg max-w-none">
        <h2>Project-Specific Considerations</h2>
        
        <p>Each project type has unique requirements that AI can address:</p>
        
        <ul>
          <li><strong>Portfolio Website</strong>:
            <ul>
              <li><strong>AI Use</strong>: Generate visually appealing gallery layouts and draft project descriptions.</li>
              <li><strong>Challenge</strong>: Ensuring unique designs to stand out from template-based outputs.</li>
              <li><strong>Tool Suggestions</strong>: Wix ADI for design, ChatGPT for content, Canva Magic Studio for visuals.</li>
            </ul>
          </li>
          <li><strong>E-commerce Store</strong>:
            <ul>
              <li><strong>AI Use</strong>: Implement recommendation engines and optimize product search with NLP.</li>
              <li><strong>Challenge</strong>: Handling large-scale data for personalization without latency issues.</li>
              <li><strong>Tool Suggestions</strong>: Shopify with AI plugins, TensorFlow for recommendations, Algolia for search.</li>
            </ul>
          </li>
          <li><strong>Business Landing Page</strong>:
            <ul>
              <li><strong>AI Use</strong>: Create high-conversion CTAs and A/B test variations with AI.</li>
              <li><strong>Challenge</strong>: Aligning AI-generated content with brand voice and messaging.</li>
              <li><strong>Tool Suggestions</strong>: Unbounce for landing pages, Frase for SEO content, Hotjar for heatmaps.</li>
            </ul>
          </li>
          <li><strong>Web App with AI Features</strong>:
            <ul>
              <li><strong>AI Use</strong>: Integrate complex features like chatbots, predictive analytics, or content personalization.</li>
              <li><strong>Challenge</strong>: Ensuring scalability and security for AI-driven functionalities.</li>
              <li><strong>Tool Suggestions</strong>: React with GitHub Copilot, Dialogflow for chatbots, AWS for scalable hosting.</li>
            </ul>
          </li>
        </ul>

        <h3>Conclusion</h3>
        <p>AI transforms web development by automating planning, building, and deployment processes across various project types. From generating wireframes and code to optimizing user experiences and presenting data-driven insights, AI enhances efficiency and creativity. However, challenges like ensuring brand alignment, scalability, and quality control require human oversight. By combining AI tools with strategic planning and validation, developers can create robust, user-centric websites and web apps that meet diverse needs.</p>

        <h3>Additional Resources</h3>
        <ul>
          <li><strong>Tools</strong>: Figma, GitHub Copilot, Wix ADI, Dialogflow, Netlify, Hotjar</li>
          <li><strong>Tutorials</strong>: Courses on Coursera or Udemy for AI in web development, no-code platforms, and React</li>
          <li><strong>Communities</strong>: Join forums like Stack Overflow, Reddit's r/webdev, or Webflow's community for discussions and tips</li>
          <li><strong>Videos</strong>: Search for tutorials on YouTube for tools like Figma, Webflow, or TensorFlow for practical examples</li>
        </ul>

      </div>
    </div>
  )
};
