import { Module } from '../../../types/course';
import lesson1DieselEngineSensors from './lesson1-diesel-engine-sensors';
import lesson2DiagnosticTools from './lesson2-diagnostic-tools';
import lesson3CANBusECUs from './lesson3-can-bus-ecus';
import lesson4PracticalElectricalDiagnostics from './lesson4-practical-electrical-diagnostics';
import lesson5Quiz from './lesson5-quiz';

export const module5: Module = {
  id: 5,
  title: 'Electrical and Diagnostic Systems',
  description: 'This comprehensive module covers electrical and diagnostic systems in diesel engines. Students will explore diesel engine sensors, master diagnostic tools usage, understand CAN bus systems and ECUs, and gain practical experience in diagnosing and fixing electrical faults through hands-on exercises.',
  lessons: [
    lesson1DieselEngineSensors,
    lesson2DiagnosticTools,
    lesson3CANBusECUs,
    lesson4PracticalElectricalDiagnostics,
    lesson5Quiz,
  ],
};