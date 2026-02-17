import type { Lesson } from '@/types/course';

export const lesson1_3: Lesson = {
  id: 3,
  title: 'Petrol vs Diesel Engines: Key Differences',
  duration: '90 min',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/Pu7g3uIG6Zo?si=uhwqwaTajW2B4bLX',
    textContent: `
# Petrol vs Diesel Engines: Key Differences 🔧

## Overview

Petrol and diesel engines both convert fuel into mechanical energy, but they do it in different ways. Understanding these differences helps you diagnose performance issues, choose the right maintenance approach, and explain repairs clearly to customers.

## Combustion Method

### Petrol (Spark-Ignition)

- Uses **spark plugs** to ignite an air-fuel mixture.
- Air and fuel are typically mixed before entering the cylinder (port fuel injection) or injected directly (direct injection).

### Diesel (Compression-Ignition)

- Uses **high compression** to heat air until it ignites injected diesel fuel.
- Diesel fuel is injected at high pressure near the end of the compression stroke.

## Compression Ratio

- **Petrol:** Usually lower (often around 8:1 to 12:1).
- **Diesel:** Higher (often around 14:1 to 22:1).

Higher compression in diesel engines improves efficiency but increases component stress—so diesel components are built heavier.

## Torque and Power Characteristics

- **Diesel engines** typically produce more **low-end torque**, making them ideal for heavy loads.
- **Petrol engines** often rev higher and can provide smoother acceleration at higher RPM.

## Fuel System and Injection Pressure

- **Diesel** systems use very high injection pressures and precise injector control.
- **Petrol** systems generally operate at lower pressures (though modern GDI systems can be high-pressure too).

## Maintenance Differences (Common Focus Areas)

### Petrol

- Spark plugs and ignition coils
- Fuel injectors and intake carbon buildup (especially GDI)
- Sensors affecting air-fuel ratio (MAF, O2 sensors)

### Diesel

- Fuel filtration and water contamination
- High-pressure fuel pump and injectors
- Turbocharger and intercooler systems
- Emissions systems (EGR, DPF)

## Key Takeaways

- **Petrol:** spark ignition, lower compression, smoother high-RPM operation
- **Diesel:** compression ignition, higher compression, strong low-end torque, heavier-duty design

This foundation will help you understand why diagnostics and repair procedures differ between petrol and diesel powertrains.
    `
  }
};
