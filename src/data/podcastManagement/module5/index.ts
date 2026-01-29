import type { Module } from '@/types/course';
import { lesson1UnderstandingPodcastHosting } from './lesson1-understanding-podcast-hosting';
import { lesson2SubmittingToPodcastDirectories } from './lesson2-submitting-to-podcast-directories';
import { lesson3RssFeedsAndDistribution } from './lesson3-rss-feeds-and-distribution';
import { lesson4WebsiteIntegrationAndEmbedding } from './lesson4-website-integration-and-embedding';
import { module5Quiz } from './quiz';

const module5: Module = {
  id: 5,
  title: '🌐 Module 5: Hosting & Distribution',
  description: 'Master the essential aspects of podcast hosting and distribution. Learn about podcast hosting services, submitting to podcast directories, RSS feeds and distribution, and website integration and embedding for comprehensive podcast distribution.',
  lessons: [
    lesson1UnderstandingPodcastHosting,
    lesson2SubmittingToPodcastDirectories,
    lesson3RssFeedsAndDistribution,
    lesson4WebsiteIntegrationAndEmbedding,
    module5Quiz
  ]
};

export default module5;
