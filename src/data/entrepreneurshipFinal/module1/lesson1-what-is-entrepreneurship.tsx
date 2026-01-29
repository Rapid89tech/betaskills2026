import type { Lesson } from '@/types/course';

export const lesson1WhatIsEntrepreneurship: Lesson = {
  id: 1,
  title: 'What is Entrepreneurship?',
  duration: '15 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=pC5l5j2u9SQ',
    textContent: `<div class="lesson-content">

<h1>What is Entrepreneurship?</h1>

<div class="intro-section">
<p class="lead-text">Discover the art and science of creating value by solving real problems and building sustainable businesses.</p>

<div class="highlight-box">
<strong>💡 Core Truth:</strong> Entrepreneurship is about identifying real problems and creating solutions that people actually want and need.
</div>
</div>

<h2>The Entrepreneurial Process</h2>

<div class="definition-card">
<h3>📋 Definition</h3>
<p>Entrepreneurship is the <strong>process of identifying unmet needs</strong> or problems in the market, developing creative solutions, and organizing resources to launch and grow a sustainable business.</p>
</div>

<div class="impact-grid">
<div class="impact-item">
<h4>💼 Value Creation</h4>
<p>Build something meaningful from nothing</p>
</div>
<div class="impact-item">
<h4>🌍 Problem Solving</h4>
<p>Address real challenges in your community</p>
</div>
<div class="impact-item">
<h4>📈 Economic Growth</h4>
<p>Drive innovation and job creation</p>
</div>
</div>

<h2>Key Components of Entrepreneurship</h2>

<div class="components-section">

<h3>Opportunity Recognition</h3>
<div class="component-card">
<div class="component-icon">👁️</div>
<div class="component-content">
<h4>What It Means</h4>
<p>Spotting problems, gaps, or unmet needs in the market</p>
<h4>Why It's Critical</h4>
<p>Every successful business starts with identifying a real opportunity that others have missed</p>
<h4>Examples</h4>
<p>• Noticing long wait times at restaurants<br>• Seeing expensive solutions to simple problems<br>• Identifying underserved customer segments</p>
</div>
</div>

<h3>Innovation</h3>
<div class="component-card">
<div class="component-icon">⚡</div>
<div class="component-content">
<h4>What It Means</h4>
<p>Creating or improving products, services, or processes</p>
<h4>Why It's Critical</h4>
<p>Innovation differentiates your solution and creates competitive advantage</p>
<h4>Examples</h4>
<p>• Developing a faster delivery method<br>• Creating a more user-friendly interface<br>• Finding a cheaper production process</p>
</div>
</div>

<h3>Resource Management</h3>
<div class="component-card">
<div class="component-icon">⚙️</div>
<div class="component-content">
<h4>What It Means</h4>
<p>Organizing people, money, and tools effectively</p>
<h4>Why It's Critical</h4>
<p>Efficient resource use determines whether your business survives and thrives</p>
<h4>Examples</h4>
<p>• Building the right team<br>• Managing cash flow<br>• Optimizing operations</p>
</div>
</div>

<h3>Value Creation</h3>
<div class="component-card">
<div class="component-icon">💎</div>
<div class="component-content">
<h4>What It Means</h4>
<p>Providing something useful that people are willing to pay for</p>
<h4>Why It's Critical</h4>
<p>Value creation is what transforms an idea into a sustainable business</p>
<h4>Examples</h4>
<p>• Saving customers time<br>• Reducing their costs<br>• Solving their pain points</p>
</div>
</div>

<h3>Risk-Taking</h3>
<div class="component-card">
<div class="component-icon">🎯</div>
<div class="component-content">
<h4>What It Means</h4>
<p>Making decisions in uncertain situations</p>
<h4>Why It's Critical</h4>
<p>Calculated risks are necessary for breakthrough innovation and growth</p>
<h4>Examples</h4>
<p>• Investing in new technology<br>• Entering new markets<br>• Launching untested products</p>
</div>
</div>

</div>

<h2>The Entrepreneurial Impact</h2>

<div class="impact-section">
<div class="impact-card">
<h3>🏛️ Economic Growth</h3>
<p>Entrepreneurs create new industries, drive innovation, and generate wealth for entire communities.</p>
</div>

<div class="impact-card">
<h3>💼 Job Creation</h3>
<p>New businesses become employers, providing opportunities and livelihoods for others.</p>
</div>

<div class="impact-card">
<h3>🔬 Innovation</h3>
<p>Entrepreneurs push boundaries, developing new technologies and solutions that improve lives.</p>
</div>

<div class="impact-card">
<h3>🌍 Community Development</h3>
<p>Local businesses strengthen communities by addressing specific regional needs and challenges.</p>
</div>
</div>

<div class="mindset-section">
<h2>🧠 The Entrepreneurial Mindset</h2>
<div class="mindset-grid">
<div class="mindset-item">
<h4>🔥 Initiative</h4>
<p>Take action instead of waiting for permission</p>
</div>
<div class="mindset-item">
<h4>🎨 Creativity</h4>
<p>Find unique solutions to common problems</p>
</div>
<div class="mindset-item">
<h4>💪 Persistence</h4>
<p>Keep going when others give up</p>
</div>
<div class="mindset-item">
<h4>🧐 Market Understanding</h4>
<p>Deeply know your customers and industry</p>
</div>
</div>
</div>

<div class="key-takeaway">
<h3>🎯 Key Takeaway</h3>
<p>Entrepreneurship isn't just about starting a business—it's about creating meaningful solutions that solve real problems and add genuine value to people's lives. Success comes from understanding your market deeply and persistently working to serve it better.</p>
</div>

</div>

<style>
.lesson-content {
  max-width: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: #333;
  padding: 0;
  margin: 0;
}

.intro-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 1.5rem;
}

.lead-text {
  font-size: 1.25rem;
  font-weight: 400;
  margin-bottom: 1.5rem;
  text-align: center;
  color: white;
}

.highlight-box {
  background: rgba(255, 255, 255, 0.15);
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid #ffd700;
  backdrop-filter: blur(10px);
}

.definition-card {
  background: #f8f9ff;
  padding: 1.5rem;
  border-radius: 12px;
  border-left: 5px solid #4f46e5;
  margin: 1rem 0;
}

.definition-card h3 {
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.definition-card p {
  color: #1f2937;
  margin: 0;
}

.impact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.impact-item {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  text-align: center;
  border-top: 3px solid #10b981;
}

.impact-item h4 {
  margin: 0 0 0.5rem 0;
  color: #10b981;
  font-size: 1.1rem;
}

.components-section {
  background: #fafafa;
  padding: 1.5rem;
  border-radius: 12px;
  margin: 1.5rem 0;
}

.component-card {
  background: white;
  padding: 1rem;
  border-radius: 12px;
  margin: 1rem 0;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.component-icon {
  font-size: 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.component-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1f2937;
  font-size: 1.1rem;
}

.component-content p {
  margin: 0.5rem 0;
  color: #6b7280;
}

.impact-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.impact-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  border-top: 4px solid #f59e0b;
  transition: transform 0.2s ease;
}

.impact-card:hover {
  transform: translateY(-2px);
}

.impact-card h3 {
  margin: 0 0 1rem 0;
  color: #f59e0b;
  font-size: 1.2rem;
}

.mindset-section {
  background: #f0f9ff;
  padding: 2rem;
  border-radius: 12px;
  border: 2px dashed #0ea5e9;
  margin: 2rem 0;
}

.mindset-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.mindset-item {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid #0ea5e9;
  text-align: center;
}

.mindset-item h4 {
  margin: 0 0 0.5rem 0;
  color: #0ea5e9;
  font-size: 1.1rem;
}

.key-takeaway {
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  margin: 2rem 0;
  border: 3px solid #f59e0b;
}

.key-takeaway h3 {
  margin: 0 0 1rem 0;
  color: #92400e;
  font-size: 1.3rem;
}

.key-takeaway p {
  margin: 0;
  font-size: 1.1rem;
  color: #92400e;
  font-weight: 500;
}

hr {
  border: none;
  height: 2px;
  background: linear-gradient(90deg, transparent, #e5e7eb, transparent);
  margin: 2rem 0;
}

h1, h2, h3 {
  color: #1f2937;
}

h1 {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

h2 {
  font-size: 1.8rem;
  margin: 2rem 0 1rem 0;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 0.5rem;
}

h3 {
  font-size: 1.4rem;
  margin: 1.5rem 0 1rem 0;
}

@media (max-width: 768px) {
  .impact-grid,
  .impact-section,
  .mindset-grid {
    grid-template-columns: 1fr;
  }
  
  .component-card {
    flex-direction: column;
    text-align: center;
  }
  
  .component-icon {
    align-self: center;
  }
  
  .intro-section {
    padding: 1.5rem;
  }
  
  h1 {
    font-size: 2rem;
  }
}
</style>`
  }
};
