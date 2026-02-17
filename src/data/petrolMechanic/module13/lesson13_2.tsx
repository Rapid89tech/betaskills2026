import type { Lesson } from '@/types/course';

export const lesson13_2: Lesson = {
  id: 2,
  title: 'Selecting the Right Fuel Grade and Additives',
  duration: '45 min',
  type: 'video',
  content: {
    videoUrl: '',
    textContent: `
<div className="prose prose-lg max-w-none">
      <h1>Selecting the Right Fuel Grade and Additives</h1>

## Fuel Grade and Octane Ratings

      <div className="video-container my-8">
        <iframe
          src="https://www.youtube.com/embed/ltjVT1wyUuw"
          title="Fuel Grade and Octane Ratings"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full aspect-video rounded-lg shadow-lg"
        />
      </div>

        Octane ratings (91–95 RON in South Africa) measure fuel's resistance to knocking, critical for high-compression engines (10:1, e.g., Ford Fiesta ST) or turbocharged vehicles (100–150 kPa boost).

        Higher octane (95 RON) ensures stable combustion under high pressures (800–1000 kPa), preventing pre-ignition that damages pistons or valves (R15,000–R30,000). Standard engines (8:1 compression, e.g., Toyota Corolla 1.4L) run efficiently on 93 RON, but performance-tuned or high-altitude vehicles (e.g., Johannesburg, 1753 m) require 95 RON to avoid knock.

        Knock reduces power by 10–15% and economy (8–10 km/l vs. 12–15 km/l). In South Africa, rural stations often supply inconsistent 91 RON fuel, increasing detonation risk in hot climates (30–40°C).

        Learners will explore octane effects in virtual simulations, visualizing combustion stability with 93 vs. 95 RON. Using lower-than-recommended octane triggers knock sensors (P0325 code), failing emissions tests, while higher octane offers no benefit unless tuned for it (e.g., ECU remap for 95 RON).

        Mechanics mastering fuel selection optimize performance, saving clients R2,000–R5,000 in fuel and repairs.

## Role of Fuel Additives

      <div className="video-container my-8">
        <iframe
          src="https://www.youtube.com/embed/FwX5iIXz0jA"
          title="Role of Fuel Additives"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full aspect-video rounded-lg shadow-lg"
        />
      </div>

        Fuel additives enhance performance and protect components. Detergent additives (e.g., Techron, Liqui Moly) clean injectors, valves, and combustion chambers, restoring spray patterns and improving economy by 1–2 km/l (e.g., 12 km/l to 14 km/l).

        Octane boosters raise RON by 2–6 points, reducing knock in tuned engines when 95 RON is unavailable, common in rural South Africa (e.g., Limpopo). Fuel system conditioners remove water, preventing tank corrosion (R5,000+ repairs), critical in humid coastal areas like Durban (80% humidity).

        Performance enhancers claim 3–5% power gains but require reputable brands to avoid O2 sensor fouling (R2,000–R3,000). In South Africa, poor fuel quality accelerates injector clogs after 50,000 km, reducing power by 10%.

        Learners will simulate additive effects, observing injector cleaning in a virtual flow bench. Overuse risks carbon buildup or sensor damage (R2,000–R5,000). Mechanics mastering additives maintain efficiency, saving clients R3,000+.

## Best Practices for Fuel and Additives

      <div className="video-container my-8">
        <iframe
          src="https://www.youtube.com/embed/IZMKcbC0rTs"
          title="Best Practices for Fuel and Additives"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full aspect-video rounded-lg shadow-lg"
        />
      </div>

        Source fuel from reputable stations (e.g., Engen, Shell) to avoid contaminants, critical in South Africa's rural areas where 91 RON fuel may contain impurities. Match octane to specs (93 RON for standard engines, 95 RON for turbocharged).

        Use additives like injector cleaners every 10,000 km (300 ml per 60L tank) to maintain spray patterns. Monitor economy (km/l) and power (kW) to validate additive effects, using OBD-II scanners for fuel trim data (±10% ideal).

        Avoid overuse, which clogs injectors or fouls plugs (R1,000–R3,000). In South Africa, dusty conditions require clean fuel filters every 15,000 km to complement additives.

        Learners will simulate fuel and additive plans, tracking economy gains for a VW Polo. Incorrect practices reduce efficiency or trigger DTCs (e.g., P0171). Mechanics mastering best practices optimize combustion, saving clients R2,000+.

    </div>
    `
  }
};
