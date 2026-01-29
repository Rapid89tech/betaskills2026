import { VideoLesson } from '@/types/course';

export const lesson1WhatIsEntrepreneurship: VideoLesson = {
  id: 1,
  title: 'What is Entrepreneurship?',
  duration: '45 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=pC5l5j2u9SQ',
    textContent: `
<div style="max-width: 800px; margin: 0 auto; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; line-height: 1.7; color: #374151;">
  <h1 style="font-size: 2.5rem; font-weight: 700; color: #1f2937; margin-bottom: 1.5rem; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
    Module 1: What is Entrepreneurship?
  </h1>

  <div style="display:flex;justify-content:center;margin:2rem 0;">
    <iframe width="900" height="506" src="https://www.youtube.com/embed/pC5l5j2u9SQ" frameborder="0" allowfullscreen style="border-radius:18px;box-shadow:0 8px 32px rgba(90,103,216,0.18);"></iframe>
  </div>

  <div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); padding: 2rem; border-radius: 16px; margin: 2rem 0; border-left: 4px solid #667eea;">
    <p style="font-size: 1.2rem; font-weight: 500; color: #1f2937; margin: 0; line-height: 1.6;">
      Entrepreneurship is the <strong style="color: #667eea;">process of identifying a need</strong>, developing a solution, and organizing resources to launch and grow a business. Entrepreneurs are the <strong style="color: #667eea;">change-makers</strong> who drive innovation, create jobs, and contribute to economic development.
    </p>
  </div>

  <div style="background: white; padding: 2rem; border-radius: 16px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); margin: 2rem 0;">
    <h2 style="font-size: 1.5rem; font-weight: 600; color: #1f2937; margin-bottom: 1.5rem; display: flex; align-items: center;">
      <span style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 0.5rem 1rem; border-radius: 8px; margin-right: 1rem; font-size: 1rem;">🔹</span>
      Characteristics of Successful Entrepreneurs
    </h2>
    
    <div style="overflow-x: auto;">
      <table style="width: 100%; border-collapse: collapse; margin: 1rem 0;">
        <thead>
          <tr style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
            <th style="padding: 1rem; text-align: left; border-radius: 8px 0 0 0;">Trait</th>
            <th style="padding: 1rem; text-align: left; border-radius: 0 8px 0 0;">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 1rem; font-weight: 600; color: #667eea;">Vision</td>
            <td style="padding: 1rem;">The ability to see future possibilities and trends</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 1rem; font-weight: 600; color: #667eea;">Risk-taking</td>
            <td style="padding: 1rem;">Willingness to take calculated risks</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 1rem; font-weight: 600; color: #667eea;">Resilience</td>
            <td style="padding: 1rem;">Ability to bounce back from setbacks</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 1rem; font-weight: 600; color: #667eea;">Creativity</td>
            <td style="padding: 1rem;">Innovative thinking and problem-solving</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 1rem; font-weight: 600; color: #667eea;">Passion</td>
            <td style="padding: 1rem;">Deep belief in the business and its purpose</td>
          </tr>
          <tr>
            <td style="padding: 1rem; font-weight: 600; color: #667eea;">Leadership</td>
            <td style="padding: 1rem;">Inspiring and managing others effectively</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div style="background: white; padding: 2rem; border-radius: 16px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); margin: 2rem 0;">
    <h2 style="font-size: 1.5rem; font-weight: 600; color: #1f2937; margin-bottom: 1.5rem; display: flex; align-items: center;">
      <span style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 0.5rem 1rem; border-radius: 8px; margin-right: 1rem; font-size: 1rem;">🔹</span>
      Benefits of Becoming an Entrepreneur
    </h2>
    
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin: 1rem 0;">
      <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); padding: 1.5rem; border-radius: 12px; border-left: 4px solid #0ea5e9;">
        <h3 style="font-size: 1.1rem; font-weight: 600; color: #0c4a6e; margin-bottom: 0.5rem;">Independence</h3>
        <p style="color: #374151; margin: 0;">Be your own boss</p>
      </div>
      <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); padding: 1.5rem; border-radius: 12px; border-left: 4px solid #22c55e;">
        <h3 style="font-size: 1.1rem; font-weight: 600; color: #166534; margin-bottom: 0.5rem;">Financial potential</h3>
        <p style="color: #374151; margin: 0;">Unlimited income opportunity</p>
      </div>
      <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 1.5rem; border-radius: 12px; border-left: 4px solid #f59e0b;">
        <h3 style="font-size: 1.1rem; font-weight: 600; color: #92400e; margin-bottom: 0.5rem;">Flexibility</h3>
        <p style="color: #374151; margin: 0;">Set your own hours and lifestyle</p>
      </div>
      <div style="background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%); padding: 1.5rem; border-radius: 12px; border-left: 4px solid #a855f7;">
        <h3 style="font-size: 1.1rem; font-weight: 600; color: #7c3aed; margin-bottom: 0.5rem;">Impact</h3>
        <p style="color: #374151; margin: 0;">Solve real problems and serve communities</p>
      </div>
      <div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); padding: 1.5rem; border-radius: 12px; border-left: 4px solid #ef4444;">
        <h3 style="font-size: 1.1rem; font-weight: 600; color: #991b1b; margin-bottom: 0.5rem;">Legacy</h3>
        <p style="color: #374151; margin: 0;">Build something that lasts beyond you</p>
      </div>
    </div>
  </div>

  <div style="background: white; padding: 2rem; border-radius: 16px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); margin: 2rem 0;">
    <h2 style="font-size: 1.5rem; font-weight: 600; color: #1f2937; margin-bottom: 1.5rem; display: flex; align-items: center;">
      <span style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 0.5rem 1rem; border-radius: 8px; margin-right: 1rem; font-size: 1rem;">🔹</span>
      Challenges Entrepreneurs Face
    </h2>
    
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem; margin: 1rem 0;">
      <div style="background: #fef2f2; padding: 1.5rem; border-radius: 12px; border-left: 4px solid #ef4444;">
        <p style="color: #374151; margin: 0; font-weight: 500;">Financial uncertainty and startup costs</p>
      </div>
      <div style="background: #fef2f2; padding: 1.5rem; border-radius: 12px; border-left: 4px solid #ef4444;">
        <p style="color: #374151; margin: 0; font-weight: 500;">Legal and compliance risks</p>
      </div>
      <div style="background: #fef2f2; padding: 1.5rem; border-radius: 12px; border-left: 4px solid #ef4444;">
        <p style="color: #374151; margin: 0; font-weight: 500;">Long work hours, especially in the early stages</p>
      </div>
      <div style="background: #fef2f2; padding: 1.5rem; border-radius: 12px; border-left: 4px solid #ef4444;">
        <p style="color: #374151; margin: 0; font-weight: 500;">Market competition</p>
      </div>
      <div style="background: #fef2f2; padding: 1.5rem; border-radius: 12px; border-left: 4px solid #ef4444;">
        <p style="color: #374151; margin: 0; font-weight: 500;">Emotional ups and downs</p>
      </div>
    </div>
  </div>

  <div style="background: white; padding: 2rem; border-radius: 16px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); margin: 2rem 0;">
    <h2 style="font-size: 1.5rem; font-weight: 600; color: #1f2937; margin-bottom: 1.5rem; display: flex; align-items: center;">
      <span style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 0.5rem 1rem; border-radius: 8px; margin-right: 1rem; font-size: 1rem;">🔹</span>
      The Startup Ecosystem
    </h2>
    
    <p style="color: #374151; margin-bottom: 1.5rem; font-size: 1.1rem;">
      The startup ecosystem refers to the <strong style="color: #667eea;">network of individuals and institutions</strong> that support entrepreneurship. It includes:
    </p>
    
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1rem 0;">
      <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); padding: 1rem; border-radius: 8px; text-align: center;">
        <p style="color: #0c4a6e; font-weight: 600; margin: 0;">Incubators and accelerators</p>
      </div>
      <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); padding: 1rem; border-radius: 8px; text-align: center;">
        <p style="color: #166534; font-weight: 600; margin: 0;">Investors (VCs, angels)</p>
      </div>
      <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 1rem; border-radius: 8px; text-align: center;">
        <p style="color: #92400e; font-weight: 600; margin: 0;">Mentors and advisors</p>
      </div>
      <div style="background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%); padding: 1rem; border-radius: 8px; text-align: center;">
        <p style="color: #7c3aed; font-weight: 600; margin: 0;">Government agencies and grant programs</p>
      </div>
      <div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); padding: 1rem; border-radius: 8px; text-align: center;">
        <p style="color: #991b1b; font-weight: 600; margin: 0;">Coworking spaces and tech hubs</p>
      </div>
      <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); padding: 1rem; border-radius: 8px; text-align: center;">
        <p style="color: #0c4a6e; font-weight: 600; margin: 0;">Online platforms and communities</p>
      </div>
    </div>
  </div>

  <div style="background: white; padding: 2rem; border-radius: 16px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); margin: 2rem 0;">
    <h2 style="font-size: 1.5rem; font-weight: 600; color: #1f2937; margin-bottom: 1.5rem; display: flex; align-items: center;">
      <span style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 0.5rem 1rem; border-radius: 8px; margin-right: 1rem; font-size: 1rem;">🔹</span>
      Case Study Examples
    </h2>
    
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin: 1rem 0;">
      <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); padding: 1.5rem; border-radius: 12px; border-left: 4px solid #0ea5e9;">
        <h3 style="font-size: 1.2rem; font-weight: 600; color: #0c4a6e; margin-bottom: 0.5rem;">Sara Blakely (Spanx)</h3>
        <p style="color: #374151; margin: 0;">Turned $5,000 into a billion-dollar business through creativity and determination</p>
      </div>
      <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); padding: 1.5rem; border-radius: 12px; border-left: 4px solid #22c55e;">
        <h3 style="font-size: 1.2rem; font-weight: 600; color: #166534; margin-bottom: 0.5rem;">Elon Musk</h3>
        <p style="color: #374151; margin: 0;">Founded companies in multiple industries (PayPal, Tesla, SpaceX) through innovation and bold vision</p>
      </div>
      <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 1.5rem; border-radius: 12px; border-left: 4px solid #f59e0b;">
        <h3 style="font-size: 1.2rem; font-weight: 600; color: #92400e; margin-bottom: 0.5rem;">Local Entrepreneurs</h3>
        <p style="color: #374151; margin: 0;">Highlight small businesses in your area that are making an impact</p>
      </div>
    </div>
  </div>

  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem; border-radius: 16px; margin: 2rem 0; text-align: center;">
    <h3 style="color: white; font-size: 1.3rem; font-weight: 600; margin-bottom: 1rem;">🎥 Recommended Video</h3>
    <p style="color: white; margin: 0; font-size: 1.1rem;">
      📺 <a href="https://www.youtube.com/watch?v=pC5l5j2u9SQ" style="color: #fbbf24; text-decoration: none; font-weight: 600;">What is Entrepreneurship? | 10 shared characteristics of entrepreneurs | From A Business Professor</a>
    </p>
  </div>
</div>
`
  }
}; 