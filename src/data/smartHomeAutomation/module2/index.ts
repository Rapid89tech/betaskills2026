import type { Module } from '@/types/course';
import { lesson1DeviceTypesInSmartHomes } from './lesson1-device-types-in-smart-homes';
import { lesson2SmartHomeCommunicationProtocols } from './lesson2-smart-home-communication-protocols';
import { lesson3HubVsHublessSystems } from './lesson3-hub-vs-hubless-systems';
import { quiz } from './quiz';

export const module2: Module = {
  id: 2,
  title: 'Smart Home Architecture & Protocols',
  description: 'Understanding device types in smart homes, communication protocols, hub vs hubless systems, and control types for building effective smart home ecosystems.',
  lessons: [
    lesson1DeviceTypesInSmartHomes,
    lesson2SmartHomeCommunicationProtocols,
    lesson3HubVsHublessSystems,
    quiz
  ]
};
