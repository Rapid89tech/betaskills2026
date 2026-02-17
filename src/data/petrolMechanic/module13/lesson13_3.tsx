import type { Lesson } from '@/types/course';

export const lesson13_3: Lesson = {
  id: 3,
  title: 'Monitoring Engine Performance with Advanced Diagnostic Equipment',
  duration: '45 min',
  type: 'video',
  content: {
    videoUrl: '',
    textContent: `
<div className="prose prose-lg max-w-none">
      <h1>Monitoring Engine Performance with Advanced Diagnostic Equipment</h1>

## Importance of Performance Monitoring

        Regular monitoring detects issues like misfires, knock, or sensor failures before they cause damage (R10,000–R50,000), ensuring peak efficiency (12–15 km/l), power (80–100 kW), and emissions (CO &lt;0.5%) for South African roadworthy compliance.

        Early detection of low fuel pressure (below 250 kPa), lean mixtures (&gt;15:1), or advanced timing (beyond 35° BTDC) prevents piston or valve damage. In South Africa, high temperatures (30–40°C in Durban) and dusty roads (e.g., R34 in KwaZulu-Natal) stress engines, requiring checks every 5,000 km.

        Monitoring optimizes fuel trims (±10%), timing (5–35° BTDC), and coolant temperature (80–90°C), preventing breakdowns on long routes like the N4. Learners will explore monitoring in virtual simulations, analyzing live data for a Toyota Corolla (e.g., P0301 misfire code).

        Neglecting monitoring risks catastrophic failures, especially in high-altitude areas like Pretoria (1753 m). Mechanics mastering monitoring save clients R5,000–R15,000 by preventing failures.

## Key Diagnostic Tools

        OBD-II scanners (e.g., Bosch KTS) retrieve DTCs (e.g., P0301) and live data (fuel trims, timing, O2 sensor readings). Wideband air-fuel ratio gauges monitor mixtures (14.7:1 ideal), critical for tuning turbo engines like Hyundai i20s (100 kPa boost).

        Performance data loggers record RPM, boost (50–150 kPa), and intake temperature (20–40°C), identifying trends over 1000 km. Digital vacuum/boost gauges ensure manifold pressure (20–30 kPa) and turbo operation.

        Infrared thermometers detect hot spots (e.g., 100°C+ in exhaust manifolds), indicating clogs. In South Africa, dust fouls sensors after 10,000 km, requiring clean connections.

        Learners will simulate tool use, analyzing a P0172 rich code on a Nissan Sentra. Incorrect tools risk misdiagnosis (R2,000–R5,000). Mechanics mastering tools optimize performance, ensuring reliability for VW Polos.

## Best Practices for Monitoring Performance

        Scan for DTCs every 5,000 km using OBD-II tools, even without warning lights. Monitor parameters: fuel trims (±10%), air-fuel ratio (14.7:1), timing (5–35° BTDC), coolant temperature (80–90°C), and boost (50–150 kPa).

        Log data in a spreadsheet, comparing to specs (e.g., 300 kPa fuel pressure). Conduct visual inspections for worn belts or clogged filters, critical in South Africa's dusty Karoo.

        After upgrades (e.g., turbo), verify performance with dyno tests or live data. Respond to warning signs like knocking or high exhaust temperatures (600°C+). In South Africa, high-altitude tuning requires leaner mixtures (14.5:1).

        Learners will simulate monitoring a VW Polo, logging data for 10,000 km. Neglecting practices risks failures (R10,000+). Mechanics mastering monitoring ensure efficiency, saving clients R3,000+.

## Key Takeaways

        - High-quality performance parts enhance durability and power

        - Optimal fuel grades and additives ensure clean combustion

        - Advanced diagnostics maintain efficiency and prevent costly failures

        - Regular monitoring optimizes power, economy, and reliability

    </div>
    `
  }
};
