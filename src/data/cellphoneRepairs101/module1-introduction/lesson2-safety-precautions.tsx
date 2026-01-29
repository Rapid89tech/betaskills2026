import type { VideoLesson } from '@/types/course';

export const lesson2SafetyPrecautions: VideoLesson = {
  id: 2,
  title: 'Basic Safety Precautions and Handling Sensitive Components',
  duration: '40 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=oMfpIZZIXqs',
    textContent: `## Basic Safety Precautions and Handling Sensitive Components

Safety is a cornerstone of smartphone repair, protecting technicians, devices, and customer data. Electrostatic discharge (ESD) poses a significant risk, as even a small static shock can destroy sensitive components like logic boards, integrated circuits, or flex cables. To mitigate this, technicians must use anti-static wrist straps, grounding mats, and anti-static bags for storing parts. Personal safety measures include powering off devices and disconnecting batteries before repairs, wearing protective eyewear and gloves, and working in a well-ventilated area, especially when using chemicals like isopropyl alcohol or soldering flux. A clean, organized workstation with ESD-safe surfaces, adequate lighting, and a fire extinguisher is essential. Tools like soldering irons and heat guns require precise temperature control to avoid damaging components or causing burns, and chemicals must be stored in labeled containers and disposed of according to regulations.

Handling delicate components demands meticulous care. Flex cables, connectors, and chips are prone to damage from excessive force, heat, or improper handling. Technicians should use non-conductive plastic tools, apply gentle pressure, and handle components by their edges to avoid touching circuits. Proper reassembly is critical—double-checking connections and ensuring no screws or parts are misplaced prevents costly errors. Customer data privacy is equally important; technicians must avoid accessing personal data unless necessary and obtain explicit consent for data-related tasks, such as backups or resets. A professional approach to safety builds trust, enhances repair quality, and minimizes risks like device damage or legal liabilities. By maintaining a safe workspace and adhering to best practices, technicians lay the foundation for a reliable, efficient, and reputable repair business.`
  }
};
