// Standardized minimal icons for course content
export const courseIcons = {
  // Learning objectives and goals
  objective: '•',
  goal: '•',
  outcome: '•',
  
  // Tools and equipment
  tool: '•',
  equipment: '•',
  wrench: '•',
  hammer: '•',
  
  // Processes and procedures
  process: '•',
  procedure: '•',
  step: '•',
  maintenance: '•',
  
  // Analysis and diagnosis
  analysis: '•',
  diagnosis: '•',
  inspection: '•',
  testing: '•',
  
  // Components and parts
  component: '•',
  part: '•',
  system: '•',
  
  // Best practices and tips
  tip: '•',
  practice: '•',
  guideline: '•',
  
  // Success and completion
  success: '•',
  complete: '•',
  check: '•',
  
  // Information and resources
  info: '•',
  resource: '•',
  reference: '•',
  
  // Default fallback
  default: '•'
};

// Function to get appropriate icon based on context
export const getCourseIcon = (context: string): string => {
  const lowerContext = context.toLowerCase();
  
  if (lowerContext.includes('objective') || lowerContext.includes('goal') || lowerContext.includes('outcome')) {
    return courseIcons.objective;
  }
  
  if (lowerContext.includes('tool') || lowerContext.includes('equipment') || lowerContext.includes('wrench') || lowerContext.includes('hammer')) {
    return courseIcons.tool;
  }
  
  if (lowerContext.includes('process') || lowerContext.includes('procedure') || lowerContext.includes('step') || lowerContext.includes('maintenance')) {
    return courseIcons.process;
  }
  
  if (lowerContext.includes('analysis') || lowerContext.includes('diagnosis') || lowerContext.includes('inspection') || lowerContext.includes('testing')) {
    return courseIcons.analysis;
  }
  
  if (lowerContext.includes('component') || lowerContext.includes('part') || lowerContext.includes('system')) {
    return courseIcons.component;
  }
  
  if (lowerContext.includes('tip') || lowerContext.includes('practice') || lowerContext.includes('guideline')) {
    return courseIcons.tip;
  }
  
  if (lowerContext.includes('success') || lowerContext.includes('complete') || lowerContext.includes('check')) {
    return courseIcons.success;
  }
  
  if (lowerContext.includes('info') || lowerContext.includes('resource') || lowerContext.includes('reference')) {
    return courseIcons.info;
  }
  
  return courseIcons.default;
};

// Function to replace emoji icons with minimal dots
export const replaceEmojiIcons = (content: string): string => {
  return content
    .replace(/🔧/g, '•')
    .replace(/⚡/g, '•')
    .replace(/🎯/g, '•')
    .replace(/✅/g, '•')
    .replace(/💡/g, '•')
    .replace(/📋/g, '•')
    .replace(/🛠️/g, '•')
    .replace(/🔍/g, '•')
    .replace(/⚙️/g, '•')
    .replace(/🔌/g, '•')
    .replace(/🔋/g, '•')
    .replace(/🧠/g, '•')
    .replace(/📱/g, '•')
    .replace(/🔘/g, '•')
    .replace(/🤖/g, '•')
    .replace(/🚀/g, '•')
    .replace(/💻/g, '•')
    .replace(/✨/g, '•')
    .replace(/🎉/g, '•')
    .replace(/🔧/g, '•')
    .replace(/⚙️/g, '•')
    .replace(/🔍/g, '•')
    .replace(/📋/g, '•')
    .replace(/🛠️/g, '•')
    .replace(/🎯/g, '•')
    .replace(/✅/g, '•')
    .replace(/💡/g, '•')
    .replace(/⚡/g, '•');
};
