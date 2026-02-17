import type { Lesson } from '@/types/course';

export const lesson3_3: Lesson = {
  id: 3,
  title: 'Cooling System Components and Operation',
  duration: '60 min',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/4FfcjERUtUw?si=99d-GgIyz7EpbYGA',
    textContent: `
# Cooling System Components and Operation

This lesson covers the major parts of a diesel engine cooling system and what to check when diagnosing overheating.

## Key components

- Radiator
- Water pump
- Thermostat
- Hoses and clamps
- Cooling fan and fan clutch
- Coolant passages

## Common symptoms

- Overheating under load
- Coolant loss / leaks
- Poor cabin heat (where applicable)
- Coolant contamination

## Basic checks

- Inspect for leaks and damaged hoses
- Verify coolant level and mixture
- Test thermostat operation
- Check fan operation
- Pressure test the system
    `
  }
};
