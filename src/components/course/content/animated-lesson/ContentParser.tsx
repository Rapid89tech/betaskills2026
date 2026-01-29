// Parse content into sections for better animation
export const parseContent = (text: string) => {
  if (!text || text.trim() === '' || text.trim() === '#') {
    return [`# Welcome to Your Learning Journey

🎯 **Ready to dive into this essential topic!**

This lesson will provide you with comprehensive knowledge and practical skills that you can apply immediately.

## What You'll Learn:
- Core concepts and fundamental principles
- Real-world applications and examples  
- Professional techniques and best practices
- Hands-on skills for immediate use

## Key Benefits:
✅ **Practical Knowledge** - Apply what you learn right away
✅ **Professional Skills** - Build expertise employers value
✅ **Career Growth** - Advance your professional development
✅ **Confidence** - Master the fundamentals with confidence

💡 **Ready to begin?** Let's start this exciting learning experience!`];
  }

  // Split content into meaningful chunks for animation
  const lines = text.split('\n').filter(line => line.trim() !== '');
  const sections = [];
  let currentSection = '';
  
  for (const line of lines) {
    // Start new section on headers or after certain lengths
    if (line.startsWith('#') || line.startsWith('##') || line.startsWith('###')) {
      if (currentSection.trim()) {
        sections.push(currentSection.trim());
      }
      currentSection = line + '\n';
    } else if (line.startsWith('**') || line.startsWith('🎯') || line.startsWith('💡') || 
               line.startsWith('✅') || line.startsWith('🔧') || line.startsWith('⚡') ||
               line.startsWith('🛠️') || line.startsWith('📊') || line.startsWith('🌡️')) {
      // Keep related content together
      currentSection += line + '\n';
      
      // End section after important points
      if (currentSection.length > 300) {
        sections.push(currentSection.trim());
        currentSection = '';
      }
    } else {
      currentSection += line + '\n';
      
      // Break long sections
      if (currentSection.length > 500) {
        sections.push(currentSection.trim());
        currentSection = '';
      }
    }
  }
  
  if (currentSection.trim()) {
    sections.push(currentSection.trim());
  }
  
  return sections.length > 0 ? sections : [text];
};
