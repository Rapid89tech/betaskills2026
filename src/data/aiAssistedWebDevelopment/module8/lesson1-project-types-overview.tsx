import type { Lesson } from '@/types/course';


export const lesson1ProjectTypesOverview: Lesson = {
  id: 1,
  title: 'Project Types Overview',
  content: (
    <div className="space-y-6">
      <div className="prose prose-lg max-w-none">
        <h2>Project Types Overview</h2>
        
        <p>Each project type serves distinct purposes, and AI can be tailored to meet their specific needs. Below is an overview of the project types and their objectives:</p>
        
        <ul>
          <li><strong>Portfolio Website</strong>: A platform to showcase personal or professional work, such as art, design, writing, or coding projects. It emphasizes visual appeal, intuitive navigation, and storytelling to highlight achievements.</li>
          <li><strong>E-commerce Store</strong>: An online shop for selling products or services, requiring features like product listings, shopping carts, payment gateways, and personalized user experiences.</li>
          <li><strong>Business Landing Page</strong>: A single-page site designed to promote a business, product, or service, focusing on lead generation, conversions, and clear calls-to-action (CTAs).</li>
          <li><strong>Web App with AI Features</strong>: A dynamic, interactive application with AI-driven functionalities like chatbots, recommendation systems, or predictive analytics, prioritizing user engagement and scalability.</li>
        </ul>

        <h3>Benefits of AI in Web Development</h3>
        <ul>
          <li>Automates repetitive tasks like code generation, content creation, and testing.</li>
          <li>Enhances user experience through personalization and data-driven design.</li>
          <li>Accelerates prototyping and iteration, reducing time-to-market.</li>
          <li>Enables non-technical users to contribute via AI-assisted tools.</li>
        </ul>

        <h3>Challenges</h3>
        <ul>
          <li><strong>Alignment with Goals</strong>: AI outputs must align with project-specific requirements (e.g., brand identity, target audience).</li>
          <li><strong>Scalability</strong>: AI-driven features may require robust infrastructure for large-scale deployment.</li>
          <li><strong>Quality Control</strong>: Human oversight is needed to ensure AI-generated code, content, or designs meet standards.</li>
          <li><strong>Cost and Learning Curve</strong>: Some AI tools require subscriptions or technical knowledge for optimal use.</li>
        </ul>
      </div>
    </div>
  )
};
