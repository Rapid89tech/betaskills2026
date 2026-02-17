import type { Lesson } from '@/types/course';

export const lesson2_2: Lesson = {
  id: 2,
  title: 'Mechanical Fuel Injectors',
  duration: '75 min',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/6QrTpx5J9FU',
    textContent: `
# Mechanical Fuel Injectors 🔧

https://youtu.be/6QrTpx5J9FU

Traditional injectors relying on fuel pressure for operation, commonly found in older diesel equipment.

---

## Operation: Fuel Pressure-Driven Injection 💉

Mechanical diesel injectors use fuel pressure to actuate a needle valve, opening and closing to deliver fuel into the cylinder without electronic control.

**How They Work:**
* Fuel pressure: 2,000-5,000 psi
* Spring-loaded needle valve
* Pressure lifts needle to spray fuel
* No electronic control (no ECM)
* Mechanical timing based on pump speed

**Combustion Process:**

Fuel is injected into compressed air (500-600 psi) at 700-900°F, igniting spontaneously to drive the piston. This produces 300-500 lb-ft torque in older diesels.

**Mechanism:**

A spring holds the needle valve closed until fuel pressure overcomes it, releasing fuel at precise moments. The fuel pump generates pressure, determining injection timing and volume based on engine speed.

---

## Advantages: Simplicity and Durability 🌾

**Design Simplicity:**
* Fewer components (no electronics)
* Lower production costs (20-30% less)
* Simple repairs: $200-$500
* Easy to maintain
* No specialized diagnostic tools needed

**High Durability:**
* Robust steel and spring components
* Withstand harsh conditions
* Last 300,000+ miles with proper care
* Ideal for dusty, rugged environments
* Resistant to vibration and heat

**Cost-Effectiveness:**
* Injectors cost $100-$300 each
* 50% less than electronic units
* Repairs: $200-$500 vs. $1,500
* Lower maintenance costs
* Suitable for low-budget operations

**Ideal Applications:**
* Agricultural machinery (tractors)
* Stationary generators
* Older construction equipment
* Mining machinery
* Industrial equipment

---

## Disadvantages: Limited Precision 😕

**Imprecise Timing:**
* Fixed mechanical timing
* Cannot adjust dynamically
* Reduces efficiency by 5-10%
* Increases fuel consumption
* Higher emissions

**Higher Emissions:**
* 10-20% higher NOx and PM
* Fails modern emission standards
* Non-compliant with 2025 EPA
* Restricted to unregulated markets
* Environmental concerns

**Inefficient Combustion:**
* Inconsistent fuel spray
* Reduces power by 5-10%
* Lower fuel economy (15 MPG vs. 20 MPG)
* Uneven atomization
* More fuel waste

**Non-Adaptive Performance:**
* Cannot adjust to varying loads
* Fixed fuel volumes
* Wastes 5-10% fuel under varying conditions
* Unsuitable for modern standards
* Limited to steady-state applications

---

## Maintenance Requirements 🛠️

**Nozzle Cleaning:**
* Clean every 50,000 miles or 2,000 hours
* Prevents clogs from fuel contaminants
* Restores even spray pattern
* Ultrasonic cleaning recommended
* Extends life to 300,000 miles

**Spring Tension Checks:**
* Check every 50,000 miles
* Ensures proper pressure response (2,000-5,000 psi)
* Replace worn springs ($300)
* Maintains injection accuracy
* Prevents uneven delivery

**Filter Maintenance:**
* Replace fuel filters every 15,000 miles
* Prevents nozzle clogs
* Removes dirt and water
* Use OEM filters (e.g., WIX)
* Critical for injector longevity

**Diagnostic Procedures:**
* Spray pattern inspection with pop-testers
* Leak detection (visual and pressure tests)
* Pressure loss diagnosis
* Check for uneven sprays
* Test every 50,000 miles

---

## Applications and Limitations ⚠️

**Common Applications:**
* Pre-1990s tractors (John Deere, etc.)
* Stationary generators (Caterpillar)
* Older bulldozers and excavators
* Industrial pumps
* Vintage diesel equipment

**Historical Context:**
* Dominant pre-1990s
* Replaced by electronic systems post-1990s
* Still found in legacy equipment
* Used in unregulated markets
* Suitable for rural/developing regions

**Limitations:**
* Cannot meet 2025 EPA standards
* High NOx and PM emissions
* Fixed timing reduces efficiency
* Unsuitable for modern fleets
* Restricted to unregulated applications

**Fuel Quality Sensitivity:**
* Sensitive to contaminated fuel
* Requires robust filtration
* Dirt or water clogs nozzles
* Proper fuel storage essential
* High-cetane fuel recommended

---

## Key Takeaways

* **Simple Design:** Fewer components, lower costs, easy maintenance
* **Durable:** Last 300,000+ miles in rugged conditions
* **Limited Precision:** Fixed timing, higher emissions, inefficient combustion
* **Legacy Use:** Found in pre-1990s equipment and unregulated markets
* **Maintenance Critical:** Regular nozzle cleaning, spring checks, and filter changes essential

Mechanical fuel injectors remain viable for older equipment where simplicity and durability outweigh emission concerns, but they cannot meet modern efficiency or environmental standards.
    `
  }
};
