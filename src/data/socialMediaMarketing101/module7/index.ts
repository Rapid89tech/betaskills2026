import type { Module } from '@/types/course';
import { lesson1KeyMetrics } from './lesson1-key-metrics';
import { lesson2PlatformAnalytics } from './lesson2-platform-analytics';
import { lesson3GoogleAnalytics } from './lesson3-google-analytics';
import { lesson4RoiReporting } from './lesson4-roi-reporting';
import { module7Quiz } from './quiz';

const module7: Module = {
  id: 7,
  title: '📊 Module 7: Analytics & Metrics',
  description: 'Master key metrics, platform analytics tools, Google Analytics integration, ROI measurement, and data-driven strategy adjustments',
  lessons: [
    lesson1KeyMetrics,
    lesson2PlatformAnalytics,
    lesson3GoogleAnalytics,
    lesson4RoiReporting,
    module7Quiz
  ]
};

export default module7;

