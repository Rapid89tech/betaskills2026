import type { Lesson } from '@/types/course';

export const lesson3BenefitsOfHomeAutomation: Lesson = {
  id: 3,
  title: 'Benefits of Home Automation',
  duration: '50 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=NJBvAgMysow',
    textContent: `<div class="lesson-content">
<h1>Benefits of Home Automation</h1>
<p>Smart home technology offers significant advantages in convenience, security, energy efficiency, and quality of life.</p>
<h2>1. Convenience</h2>
<p>Centralized control, automated routines, and remote access simplify daily tasks.</p>
<h2>2. Security</h2>
<p>Proactive monitoring, smart locks, and integrated alarm systems enhance home security.</p>
<h2>3. Energy Efficiency</h2>
<p>Smart thermostats and automated lighting reduce energy consumption and costs.</p>
<h2>4. Accessibility</h2>
<p>Voice control and automated systems assist individuals with mobility challenges.</p>
<h2>5. Cost Savings</h2>
<p>Long-term savings through energy efficiency and preventive maintenance.</p>
</div>`
  }
};
