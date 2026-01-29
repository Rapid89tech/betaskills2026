import lesson1DieselEngineTheory from './lesson1-diesel-engine-theory';
import lesson2DieselVsGasoline from './lesson2-diesel-vs-gasoline';
import lesson3EngineComponents from './lesson3-engine-components';
import lesson4TerminologyFunction from './lesson4-terminology-function';
import lesson5Quiz from './lesson5-quiz';

export const module1 = {
  id: 1,
  title: 'Introduction to Diesel Engines',
  description: 'Fundamentals of diesel engine operation, 4-stroke vs. 2-stroke cycles, differences from gasoline engines, and engine components',
  lessons: [
    lesson1DieselEngineTheory,
    lesson2DieselVsGasoline,
    lesson3EngineComponents,
    lesson4TerminologyFunction,
    lesson5Quiz
  ]
};

export default module1;