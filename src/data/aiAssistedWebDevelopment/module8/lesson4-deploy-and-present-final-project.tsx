import type { Lesson } from '@/types/course';


export const lesson4DeployAndPresentFinalProject: Lesson = {
  id: 4,
  title: 'Deploy & Present Final Project',
  content: (
    <div className="space-y-6">
      <div className="prose prose-lg max-w-none">
        <h2>Deploy & Present Final Project</h2>
        
        <p>Deployment involves hosting the website or web app on a server, ensuring scalability and performance. Presentation entails showcasing the project to stakeholders or users, using AI to enhance demos and provide data-driven insights.</p>
        
        <h3>Key Concepts</h3>
        <ul>
          <li><strong>Hosting and Deployment</strong>: AI tools like Netlify's AI features or Vercel optimize deployment by suggesting hosting configurations and automating scaling.</li>
          <li><strong>Performance Optimization</strong>: AI analyzes site performance (e.g., load times, resource usage) and suggests improvements like image compression or lazy loading.</li>
          <li><strong>Cross-Browser Testing</strong>: AI tools like BrowserStack with AI integrations ensure the site works across different browsers and devices.</li>
          <li><strong>Presentation with AI Insights</strong>: AI generates visualizations (e.g., heatmaps, user flow diagrams) to demonstrate the project's value to stakeholders.</li>
          <li><strong>Post-Deployment Monitoring</strong>: AI monitors user interactions and site performance, suggesting updates or fixes.</li>
        </ul>

        <h3>Workflow</h3>
        <ol>
          <li><strong>Hosting Setup</strong>: Choose a hosting platform (e.g., Netlify, AWS Amplify) and use AI to configure settings like domain setup or CDN usage.</li>
          <li><strong>Final Testing</strong>: Run AI-driven tests for cross-browser compatibility and performance, addressing any issues.</li>
          <li><strong>Deployment</strong>: Deploy the site or app to the hosting platform, ensuring scalability for AI-driven features (e.g., real-time recommendations).</li>
          <li><strong>Presentation Preparation</strong>: Use AI to generate analytics dashboards or heatmaps to showcase user engagement and project success.</li>
          <li><strong>Stakeholder Demo</strong>: Present the project with AI-generated insights, highlighting key features and performance metrics.</li>
        </ol>

        <h3>Example</h3>
        <ul>
          <li><strong>E-commerce Store</strong>: Deploy the store on Shopify with AI-optimized product recommendations. Present to stakeholders with an AI-generated heatmap showing user clicks on product listings.</li>
          <li><strong>Web App with AI Features</strong>: Deploy on Vercel with a chatbot integrated via Dialogflow. Use AI to create a demo dashboard showing user interaction metrics.</li>
        </ul>

        <h3>Notes</h3>
        <ul>
          <li>Use platforms like Netlify or Vercel for seamless deployment of static sites or web apps.</li>
          <li>Monitor AI-driven features post-deployment to ensure scalability (e.g., chatbot response times under high traffic).</li>
          <li>Use tools like Google Analytics or Hotjar for AI-enhanced post-deployment insights.</li>
        </ul>
      </div>
    </div>
  )
};
