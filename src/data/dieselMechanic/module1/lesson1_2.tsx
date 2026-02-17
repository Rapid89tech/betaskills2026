import type { Lesson } from '@/types/course';

export const lesson1_2: Lesson = {
  id: 2,
  title: 'The Two-Stroke Diesel Cycle',
  duration: '90 min',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/gOTB7fV526o',
    textContent: `
# The Two-Stroke Diesel Cycle ⚙️

https://youtu.be/gOTB7fV526o

A 2-stroke diesel engine completes combustion in two strokes, enhancing power output. This design eliminates the need for separate intake and exhaust strokes, boosting power output for a given engine size.

---

## Compression Stroke 🛠️

The piston moves upward, compressing air to high pressures and temperatures, followed by fuel injection and combustion to initiate the power phase.

**Compression Specifications:**
* Pressure: 400-600 psi
* Temperature: 800-1,000°F
* Compression ratios: 12:1 to 18:1
* Slightly lower than four-stroke diesels
* Optimized for rapid cycles

**How It Works:**

The compression stroke is the foundation of the two-stroke diesel's efficiency, preparing air for combustion in half the time of a four-stroke engine. High compression generates the heat needed for fuel ignition, delivering 20% more power per cycle.

**Fuel Injection Precision:**

Fuel is injected at peak compression (near top dead center, TDC) via high-pressure injectors (up to 25,000 psi), igniting instantly to start combustion. Precise timing is controlled by the engine control module (ECM).

**Maintenance Focus:**
* Regular compression tests every 40,000 miles or 1,000 hours
* Injector cleaning every 80,000 miles
* ECM updates via technical service bulletins
* Monitor compression trends with telematics
* OEM injectors last 150,000 miles

**Forced Induction:**

Most two-stroke diesels use forced induction (turbochargers or superchargers) to pre-compress air, increasing density and enabling more fuel combustion for higher power output (30-40% increase).

Monthly boost pressure checks and regular intercooler cleaning (every 50,000 miles) extend turbo life to 250,000 miles.

---

## Power Stroke 💪

The piston moves downward, driven by combustion, delivering power to the crankshaft while simultaneously drawing in fresh air for the next cycle.

**Combustion and Power Delivery:**
* Combustion expands gases
* Piston forced downward
* Crankshaft rotates
* Mechanical energy produced
* High torque for heavy loads

**Dual Functionality:**

Unlike four-stroke engines, the two-stroke power stroke integrates air intake, doubling cycle frequency. As the piston descends, intake ports open, drawing in air via forced induction.

This dual role enhances cycle speed and boosts power-to-weight ratios by 20% over four-stroke engines, critical for marine and industrial applications.

**Performance Optimization:**

Combustion efficiency drives high torque, ideal for moving large vessels or machinery. ECMs optimize combustion timing, improving fuel economy by 5%.

**Maintenance Requirements:**
* Regular injector maintenance
* Use high-cetane fuel
* Oil changes every 10,000 miles with 15W-40 oil
* Bearing inspections every 100,000 miles
* Monitor vibration with diagnostic tools

**Port Timing:**

This requires precise port timing, controlled by the crankshaft. Misaligned ports reduce airflow, cutting efficiency by 10%. Regular port inspections (every 50,000 miles) prevent issues.

---

## Exhaust and Intake (Scavenging) 🌪️

Near the bottom of the power stroke, ports open, allowing fresh air to push out exhaust gases in a process called scavenging, preparing for the next cycle.

**Scavenging Process:**
* Fresh air pressurized by turbo/blower
* Enters through intake ports
* Pushes exhaust gases out
* Exhaust exits through exhaust ports
* All in a single stroke

**Why Scavenging Matters:**

Scavenging is unique to two-stroke diesels, combining exhaust and intake in one motion. Pressurized air (20-30 psi from turbochargers) forces out gases, reducing backpressure and enabling rapid cycles.

This process boosts power-to-weight ratios by 20% over four-stroke engines, critical for marine applications.

**Port Design:**

Intake and exhaust ports, located in the cylinder walls, are precisely positioned to open near BDC (bottom dead center). Intake ports open slightly before exhaust ports to maximize fresh air intake.

Wear or carbon buildup misaligns ports, reducing efficiency by 5-10%.

**Maintenance Focus:**
* Port cleaning every 40,000-50,000 miles
* Turbo maintenance for effective scavenging
* Monitor timing with diagnostic tools
* Check for carbon buildup
* Ensure proper port alignment

**Emission Control:**

Effective scavenging minimizes residual exhaust, reducing NOx and particulates. EGR (Exhaust Gas Recirculation) recycles gases to lower emissions, while SCR systems use DEF to neutralize NOx.

Regular DEF refills (every 10,000 miles) and EGR cleaning (every 100,000 miles) ensure compliance with 2025 IMO and EPA standards.

---

## Applications 🏭

Two-stroke diesel engines are used in large industrial and marine applications due to their high power-to-weight ratios and compact design.

**Marine Propulsion:**

Two-stroke diesels power large vessels (e.g., cargo ships, tankers) due to their high torque and efficiency in low-RPM, high-load conditions.

Marine two-stroke diesels, like those from MAN or Wärtsilä, deliver up to 100,000 hp, ideal for propelling massive ships. Their compact design saves space in engine rooms.

These engines achieve 50% thermal efficiency, reducing fuel costs by 10% compared to four-stroke alternatives.

**Industrial Power Generation:**

Used in power plants and large generators, two-stroke diesels provide reliable, high-output energy for industrial facilities.

Their high power-to-weight ratio reduces installation costs, and rapid cycles ensure quick startup. These engines support grid stability, with 40% fuel efficiency over gas turbines.

**Heavy Machinery:**

Applications in mining equipment and locomotives benefit from the compact size and power efficiency of two-stroke diesels.

Two-stroke diesels power heavy machinery like mining excavators and locomotives, offering 20-30% better power-to-weight ratios than four-stroke engines. Compact designs fit tight spaces, and high torque handles extreme loads.

---

## Key Takeaways

* **Compression Stroke:** Compresses air and injects fuel for combustion
* **Power Stroke:** Combustion drives piston down while drawing in fresh air
* **Scavenging:** Fresh air pushes out exhaust gases in one motion
* **Applications:** Marine propulsion, industrial power, heavy machinery

The 2-stroke diesel cycle offers a streamlined approach to power generation, completing a cycle in one crankshaft revolution. Commonly used in marine and industrial applications, 2-stroke engines excel in scenarios requiring high power density but may demand frequent maintenance due to increased wear.
    `
  }
};
