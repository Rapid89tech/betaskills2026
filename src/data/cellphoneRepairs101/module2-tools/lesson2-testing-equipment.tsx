import type { VideoLesson } from '@/types/course';

export const lesson2TestingEquipment: VideoLesson = {
  id: 2,
  title: 'Testing and Diagnostic Equipment',
  duration: '50 minutes',
  type: 'video',
  content: {
    videoUrl: 'A7uQALjl6WE',
    textContent: `## Testing and Diagnostic Equipment

### Multimeters

Digital multimeters (DMMs) are indispensable for diagnosing electrical issues in smartphone repair, measuring parameters like **voltage**, **current**, **resistance**, **continuity**, and **diode function**. They are used to test battery health (e.g., confirming 3.7–4.2V for lithium-ion batteries), detect short circuits on motherboards, verify charging port functionality, or check component integrity like fuses or capacitors. For instance, if a device fails to power on, a multimeter in continuity mode can identify a broken trace or shorted power IC by testing connections across the board. **ESD-safe probes** are critical to avoid damaging sensitive circuits, and technicians must calibrate the multimeter regularly for accuracy. Auto-ranging multimeters simplify use for beginners, while manual-ranging models offer precision for advanced diagnostics. When probing, technicians should use light, precise touches to avoid slipping and shorting adjacent pins. Multimeters are also useful for testing cable continuity or verifying USB charger output. Investing in a reliable model from brands like Fluke or Uni-T ensures durability and accuracy. Proficiency with multimeters enables technicians to move beyond guesswork, pinpointing issues with precision and enhancing repair success rates, which builds credibility and customer trust.

### Power Supply Testers

Power supply testers, or DC power supplies with integrated ammeter and voltmeter displays, are advanced diagnostic tools that simulate battery input to test motherboard functionality. By connecting to the battery terminals, they deliver controlled voltage (typically 3.7–4.2V for smartphones) and monitor current draw to diagnose issues like short circuits, dead CPUs, or faulty power management ICs (PMICs). For example, a normal boot sequence might show a brief current spike (0.5–1A) followed by a steady draw (0.1–0.3A), while a short circuit causes an immediate high draw (>2A), and no draw indicates a dead board. These testers are critical for troubleshooting devices that fail to power on, even with a known-good battery. Adjustable voltage and current limits prevent damage during testing, and digital displays provide real-time feedback. Technicians must ensure proper polarity and secure connections to avoid false readings or board damage. Models with short-circuit protection and USB output testing add versatility. Regular calibration and maintenance, such as checking probe integrity, ensure reliability. Mastery of power supply testers allows technicians to perform board-level diagnostics with confidence, reducing unnecessary part replacements and improving repair efficiency.

### Microscopes

Microscopes, such as **stereo** or **digital** models, are essential for board-level smartphone repairs, where components like ICs, capacitors, or solder joints are too small for the naked eye. Offering **10x–100x magnification**, microscopes enable technicians to inspect for cracked solder joints, lifted pads, corrosion, or microscopic damage from water or drops. **Stereo microscopes** provide 3D depth perception, ideal for micro-soldering tasks like reballing ICs or replacing connectors, while **digital microscopes** with monitor displays allow recording for documentation or training. Adjustable LED ring lights or fiber-optic lighting ensure clear visibility, and stable focusing mechanisms prevent image drift during delicate work. For example, when repairing a Samsung motherboard, a microscope can reveal a hairline crack in a solder joint causing a charging issue. Technicians must maintain clean lenses and calibrate focus regularly to ensure accuracy. High-quality models from brands like AmScope or Andonstar balance cost and performance. Proficiency with microscopes elevates repair precision, enabling technicians to tackle complex tasks like trace repair or chip replacement, enhancing repair quality and establishing expertise in advanced diagnostics.`
  }
};
