import type { Lesson } from '@/types/course';


export const lesson2PlanWithAI: Lesson = {
  id: 2,
  title: 'Plan with AI (Wireframes, Content, Branding)',
  content: (
    <div className="space-y-6">
      <div className="prose prose-lg max-w-none">
        <h2>Plan with AI (Wireframes, Content, Branding)</h2>
        
        <p>The planning phase involves defining the project's structure, content, and visual identity. AI tools streamline this process by generating wireframes, drafting content, and suggesting branding elements based on project goals and user inputs.</p>
        
        <h3>Key Concepts</h3>
        <ul>
          <li><strong>AI-Generated Wireframes</strong>: Tools like Figma with AI plugins (e.g., Magician) or Uizard create wireframes based on text prompts or design preferences, outlining the site's layout and user flow.</li>
          <li><strong>Content Creation</strong>: AI models like ChatGPT or Jasper generate text for headers, descriptions, blogs, or product listings, tailored to the target audience and tone.</li>
          <li><strong>Branding Suggestions</strong>: AI platforms like Looka or Brandmark suggest logos, color schemes, and typography based on industry trends and user inputs.</li>
          <li><strong>User Persona Analysis</strong>: AI analyzes target audience data to recommend design and content strategies that resonate with users.</li>
          <li><strong>SEO Optimization</strong>: Tools like SurferSEO or Frase use AI to suggest keywords and content structures for better search engine rankings.</li>
        </ul>

        <h3>Workflow</h3>
        <ol>
          <li><strong>Define Goals</strong>: Specify the project type and objectives (e.g., showcase work for a portfolio, drive sales for an e-commerce store).</li>
          <li><strong>AI Wireframing</strong>: Input a prompt (e.g., "Create a wireframe for a portfolio website with a gallery and contact form") into a tool like Uizard to generate a layout.</li>
          <li><strong>Content Generation</strong>: Use AI to draft content (e.g., "Write a professional bio for a designer's portfolio") and refine it for tone and clarity.</li>
          <li><strong>Branding</strong>: Input business details into an AI branding tool to generate logos, color palettes, and typography suggestions.</li>
          <li><strong>Validation</strong>: Review AI outputs with stakeholders to ensure alignment with project vision and refine as needed.</li>
        </ol>

        <h3>Example</h3>
        <ul>
          <li><strong>Portfolio Website</strong>: AI generates a wireframe with a hero section, project gallery, and contact form. It drafts a bio and project descriptions, and suggests a minimalist color scheme.</li>
          <li><strong>E-commerce Store</strong>: AI creates a wireframe with product listings, a cart, and checkout pages. It generates product descriptions and suggests a vibrant, trustworthy brand palette.</li>
        </ul>

        <h3>Notes</h3>
        <ul>
          <li>Use collaborative tools like Figma for team feedback on AI-generated wireframes.</li>
          <li>Ensure AI-generated content aligns with brand voice by providing clear prompts (e.g., "Use a professional yet approachable tone").</li>
          <li>Validate SEO suggestions with tools like Google Keyword Planner for accuracy.</li>
        </ul>
      </div>
    </div>
  )
};
