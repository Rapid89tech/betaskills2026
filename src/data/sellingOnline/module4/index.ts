import type { Module } from '@/types/course';
import { lesson1EcommercePlatforms } from './lesson1-ecommerce-platforms';
import { lesson2Marketplaces } from './lesson2-marketplaces';
import { lesson3SocialCommerce } from './lesson3-social-commerce';
import { quiz4 } from './quiz4';

export const module4: Module = {
  id: 4,
  title: 'Platforms and Channels',
  description: 'Learn about different online selling platforms including ecommerce websites, marketplaces, and social commerce channels to choose the best fit for your business.',
  lessons: [
    lesson1EcommercePlatforms,
    lesson2Marketplaces,
    lesson3SocialCommerce
  ],
  quiz: quiz4
};
