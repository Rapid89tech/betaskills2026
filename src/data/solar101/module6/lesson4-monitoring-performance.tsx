import type { Lesson } from '@/types/course';

const lesson: Lesson = {
  id: 4,
  title: 'Monitoring Performance (Meters, Apps, Software)',
  duration: '25 minutes',
  type: 'video',
  videoUrl: 'https://youtu.be/oZiBqPApLgY',
  content: `
# Monitoring Performance 📊

Monitoring performance in solar PV systems tracks energy production, consumption, and efficiency in real-time, identifying issues like underperformance or faults to sustain 90-95% capacity over 25 years and optimize ROI through data-driven adjustments. In 2025, with global solar installations surging 64% in the first half to 380 GW added, AI-integrated monitoring is essential for the 655 GW annual growth, reducing O&M costs by 30-40% via predictive alerts amid rising hybrid and VPP integrations.

## Key Methods for Monitoring

### Hardware Meters
Deploy revenue-grade bidirectional meters (e.g., CT clamps or revenue meters) at inverters and main panels to log kWh flows, irradiance, and voltage; essential for net metering verification and baseline data.

### Mobile Apps
User-friendly interfaces for on-the-go dashboards showing SoC, yield forecasts, and alerts; integrate with inverters for push notifications on anomalies like 10% yield drops.

### Cloud-Based Software
Scalable platforms aggregating data from multiple sites, using ML for fault classification and weather correlations; support API exports for third-party analytics.

### Advanced Analytics
Leverage IoT sensors for granular module-level data, generating custom reports on PR (performance ratio) and LCOE; edge computing enables offline processing for remote sites.

## Best Practices

- Install meters at key points; calibrate annually to ±0.5%
- Set thresholds (e.g., PR <80%) for automated emails
- Review monthly trends against TMY data
- Use AI for predictive maintenance
- Opt for low-power IoT meters to minimize system losses

---

## Key Takeaways

✅ **Capacity Maintenance**: 90-95% over 25 years  
✅ **Cost Reduction**: 30-40% O&M savings  
✅ **Market Growth**: 655 GW annual additions projected  
✅ **Data Accuracy**: 98% with proper monitoring  
✅ **Calibration**: Annual ±0.5% accuracy required  
✅ **Yield Optimization**: 15-20% self-consumption improvement  
  `
};

export default lesson;

