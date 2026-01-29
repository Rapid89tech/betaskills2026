import type { Module } from '@/types/course';
import { lesson1CuttingThreadingAndJoiningPipes } from './lesson1-cutting-threading-and-joining-pipes';
import { lesson2SolderingAndBrazingCopperPipes } from './lesson2-soldering-and-brazing-copper-pipes';
import { lesson3InstallingPvcAndPexPiping } from './lesson3-installing-pvc-and-pex-piping';
import { lesson4UsingPipeFittingsValvesAndConnectors } from './lesson4-using-pipe-fittings-valves-and-connectors';
import { module5Quiz } from './quiz';

const module5: Module = {
  id: 5,
  title: '🔧 Module 5: Pipe Installation and Fittings',
  description: 'Master cutting, threading, joining, soldering, brazing, and installing PVC/PEX piping with proper fittings and valves',
  lessons: [
    lesson1CuttingThreadingAndJoiningPipes,
    lesson2SolderingAndBrazingCopperPipes,
    lesson3InstallingPvcAndPexPiping,
    lesson4UsingPipeFittingsValvesAndConnectors,
    module5Quiz
  ]
};

export default module5; 