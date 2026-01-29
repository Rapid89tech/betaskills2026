import type { Module } from '@/types/course';
import { lesson1RouterSetupAndIpAddressing } from './lesson1-router-setup-and-ip-addressing';
import { lesson2DeviceDiscoveryAndPairing } from './lesson2-device-discovery-and-pairing';
import { lesson3WiFiRangeExtendersAndMeshNetworks } from './lesson3-wifi-range-extenders-and-mesh-networks';
import { lesson4TroubleshootingConnectivityIssues } from './lesson4-troubleshooting-connectivity-issues';
import { lesson5BandwidthAndDataUsage } from './lesson5-bandwidth-and-data-usage';
import { quiz } from './quiz';

export const module3: Module = {
  id: 3,
  title: 'Networking & Connectivity for Smart Homes',
  description: 'Understanding router setup, IP addressing, device discovery and pairing, Wi-Fi range extenders, mesh networks, troubleshooting, and bandwidth management for reliable smart home connectivity.',
  lessons: [
    lesson1RouterSetupAndIpAddressing,
    lesson2DeviceDiscoveryAndPairing,
    lesson3WiFiRangeExtendersAndMeshNetworks,
    lesson4TroubleshootingConnectivityIssues,
    lesson5BandwidthAndDataUsage,
    quiz
  ]
};
