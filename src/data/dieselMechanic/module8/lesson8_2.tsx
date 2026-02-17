import type { Lesson } from '@/types/course';

export const lesson8_2: Lesson = {
  id: 2,
  title: 'Maintenance Schedule Creation and Fleet Management',
  duration: '90 min',
  type: 'assignment',
  content: {
    title: 'Create a Comprehensive Maintenance Schedule',
    description: 'Apply your knowledge of maintenance intervals, fleet management, and preventive care to create a detailed maintenance schedule for a diesel fleet.',
    requirements: [
      'Create a 12-month maintenance schedule for a fleet of 10 diesel trucks',
      'Include all routine maintenance tasks (oil changes, filter replacements, coolant checks)',
      'Incorporate emissions system maintenance (DPF, SCR, EGR)',
      'Adjust intervals based on operating conditions (highway vs city, heavy loads)',
      'Include predictive maintenance strategies (oil analysis, coolant testing)',
      'Estimate costs for parts and labor',
      'Create a recordkeeping system for tracking maintenance',
      'Develop a system for monitoring vehicle performance metrics'
    ],
    deliverables: 'Submit a detailed maintenance schedule document including: 1) Monthly maintenance calendar for all 10 vehicles, 2) Cost breakdown and budget projections, 3) Recordkeeping templates, 4) Performance monitoring plan, 5) Contingency plans for unexpected repairs',
    rubric: {
      'Completeness (25%)': 'All required maintenance tasks included with proper intervals',
      'Accuracy (25%)': 'Intervals and procedures match manufacturer specifications and best practices',
      'Cost Analysis (20%)': 'Realistic cost estimates with detailed breakdown',
      'Organization (15%)': 'Clear, logical structure that is easy to follow and implement',
      'Recordkeeping System (15%)': 'Comprehensive tracking system with appropriate documentation'
    }
  }
};
