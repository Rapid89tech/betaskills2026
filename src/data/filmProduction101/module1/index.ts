import type { Module } from '@/types/course';
import { lesson1WhatIsFilmProduction } from './lesson1-what-is-film-production';
import { lesson2OverviewOfFilmIndustry } from './lesson2-overview-of-film-industry';
import { lesson3RolesResponsibilitiesFilmSet } from './lesson3-roles-responsibilities-film-set';
import { lesson4TypesOfFilms } from './lesson4-types-of-films';
import { lesson5HistoryOfCinema } from './lesson5-history-of-cinema';
import { module1Quiz } from './quiz';

const module1: Module = {
  id: 1,
  title: '🎬 Module 1: Introduction to Film Production',
  description: 'Learn film production fundamentals, industry overview, key roles, film types, and the history of cinema',
  lessons: [
    lesson1WhatIsFilmProduction,
    lesson2OverviewOfFilmIndustry,
    lesson3RolesResponsibilitiesFilmSet,
    lesson4TypesOfFilms,
    lesson5HistoryOfCinema,
    module1Quiz
  ]
};

export default module1;
