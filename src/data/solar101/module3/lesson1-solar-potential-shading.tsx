import type { Lesson } from '@/types/course';

const lesson: Lesson = {
  id: 1,
  title: 'Assessing Solar Potential and Shading',
  duration: '30 minutes',
  type: 'video',
  videoUrl: 'https://youtu.be/UTgre4il4Fo',
  content: `
# Assessing Solar Potential and Shading 🌤️

Assessing solar potential involves evaluating the amount of sunlight a site receives over time, which is critical for optimizing solar energy systems, architectural designs, and urban planning. Shading analysis complements this by identifying obstructions like trees, buildings, or terrain that block sunlight, potentially reducing energy output by up to 20-30% in unshaded vs. shaded scenarios. Accurate assessment ensures maximum efficiency, cost savings, and compliance with building codes.

## Key Methods for Assessment

### 1. Site Surveys and Manual Observations
Conduct on-site visits using tools like a solar pathfinder or sun angle calculator to measure real-time shading patterns. This method tracks shadows at different times of day and year, accounting for seasonal variations in solar elevation.

### 2. Digital Modeling and Simulation
Use 3D modeling software to simulate sunlight paths based on latitude, longitude, and local topography. Techniques include ray-tracing for precise shadow casting and irradiance mapping to quantify solar exposure in kWh/m² annually.

### 3. Remote Sensing and GIS Analysis
Leverage satellite imagery and geographic information systems (GIS) to analyze large-scale rooftop potential. For instance, tools can calculate solar radiation on surfaces by integrating elevation data and weather patterns.

### 4. AI-Driven Predictive Analysis
Emerging AI tools process LiDAR data and historical weather to forecast shading impacts, identifying optimal panel orientations with minimal human input.

## Recommended Tools and Software

| **Tool/Software** | **Key Features** | **Ease of Use** | **Ideal For** | **Cost Model** |
|------------------|------------------|----------------|--------------|---------------|
| **PVWatts Calculator (NREL)** | Free online tool for estimating annual solar production; basic shading inputs | High | Quick site feasibility | Free |
| **HelioScope** | Advanced 3D shading simulations; horizon and obstacle modeling | Medium | Commercial solar projects | Subscription |
| **Aurora Solar** | AI-powered shade reports with SAV (Solar Access Value) and TSRF metrics | High | Residential assessments | Subscription |
| **ArcGIS Pro** | GIS-based rooftop irradiance mapping; integrates DEM for terrain shading | Medium | Urban planning | Licensed |
| **Google SketchUp + Plugins** | 3D visualization with solar path extensions; exportable shadow studies | High | Architectural design | Free/Paid add-ons |
| **SurgePV** | Real-time shadow analysis for PV arrays; performance predictions | Medium | Installation optimization | Subscription |
| **Pilkington Sun Angle Calculator** | Simple solar geometry calculations for window/facade shading | High | Building envelope design | Free |

These tools often output metrics like Total Solar Resource Fraction (TSRF), which measures unshaded fraction over a year, or Solar Access Values (SAV) for hourly precision.

## Best Practices

### Seasonal and Temporal Analysis
Evaluate shading across solstices (e.g., December for winter minimums) using 15-minute intervals to capture peak-hour losses.

### Data Integration
Combine tools—start with free GIS overviews, then refine with site-specific simulations for accuracy within 5%.

### Common Pitfalls to Avoid
- Over-relying on single-day observations
- Ignoring future growth of vegetation
- Neglecting microclimates like urban heat islands

### Sustainability Tie-In
In 2025, integrate assessments with net-zero goals by prioritizing south-facing orientations (in the Northern Hemisphere) and tilt angles of 20-40° for balanced annual yield.

By incorporating these expanded methods and tools, projects can achieve 10-15% higher solar yields through proactive shading mitigation. For hands-on implementation, start with free resources like PVWatts for initial estimates.

---

## Key Takeaways

✅ **Shading Impact**: Can reduce energy output by 20-30%  
✅ **Manual Tools**: Solar pathfinder for real-time shading patterns  
✅ **Digital Modeling**: 3D simulations for precise shadow casting  
✅ **TSRF Metric**: Measures unshaded fraction over a year  
✅ **AI Tools**: Process LiDAR data for optimal panel orientation  
✅ **Yield Improvement**: 10-15% higher output through shading mitigation  
  `
};

export default lesson;

