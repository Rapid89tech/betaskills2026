import type { VideoLesson } from '@/types/course';

export const lesson3HardwareVariations: VideoLesson = {
  id: 3,
  title: 'Recognizing Variations in Hardware Between Different Brands and Models',
  duration: '45 minutes',
  type: 'video',
  content: {
    videoUrl: 'Z7iBFklVU_I',
    textContent: `## Recognizing Variations in Hardware Between Different Brands and Models

Hardware variations across smartphone brands and models significantly impact repair approaches, requiring technicians to adapt to diverse designs, components, and repairability levels. **Apple** devices prioritize minimalistic, proprietary designs with pentalobe screws, Secure Enclave-paired components (e.g., Touch ID, Face ID), and heavy adhesive, complicating repairs. **Android** manufacturers like Samsung, Xiaomi, Huawei, or Google vary widely—Samsung uses AMOLED displays and modular layouts, while Xiaomi emphasizes cost-effective components. **Internal layouts** differ: iPhones have vertical designs with L-shaped batteries, while Androids often place motherboards at the top and batteries below. **Modularity** ranges from repair-friendly Fairphones to adhesive-heavy Huawei flagships. **Connectors** vary—Apple's FPC connectors are delicate, while Samsung uses ribbon cables or coaxial antenna lines. **Batteries** in iPhones use pull-tab adhesives, while Androids may have simpler glue or soldered connectors. **Cameras** range from single-lens budget models to complex periscope systems in Huawei or Samsung flagships. **Fingerprint sensors** may be physical, in-display (optical/ultrasonic), or absent in gesture-based devices. **Displays** differ—Apple's Retina OLEDs versus Samsung's Dynamic AMOLED or budget LCDs—affecting repair costs and techniques. The **Right to Repair** movement (e.g., Apple's Self Service Repair, Samsung's iFixit partnership) improves part access, but proprietary restrictions persist. Technicians must study brand-specific guides, use model-appropriate tools, and understand repairability to ensure efficient, damage-free repairs and meet customer expectations across diverse devices.`
  }
};
