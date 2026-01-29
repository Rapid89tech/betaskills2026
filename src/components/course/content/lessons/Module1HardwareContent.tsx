
import React from 'react';
import HardwareHero from './module1/HardwareHero';
import ComponentOverview from './module1/ComponentOverview';
import CPUSection from './module1/CPUSection';
import RAMSection from './module1/RAMSection';
import MotherboardSection from './module1/MotherboardSection';
import PSUSection from './module1/PSUSection';
import GPUSection from './module1/GPUSection';
import StorageSection from './module1/StorageSection';
import IOPortsSection from './module1/IOPortsSection';
import HardwareSummary from './module1/HardwareSummary';
import QuizSection from './module1/QuizSection';
import CallToAction from './module1/CallToAction';

const Module1HardwareContent = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <HardwareHero />
      <ComponentOverview />
      <CPUSection />
      <RAMSection />
      <MotherboardSection />
      <PSUSection />
      <GPUSection />
      <StorageSection />
      <IOPortsSection />
      <HardwareSummary />
      <QuizSection />
      <CallToAction />
    </div>
  );
};

export default Module1HardwareContent;
