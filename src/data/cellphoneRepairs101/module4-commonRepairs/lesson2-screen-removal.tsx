import type { VideoLesson } from '@/types/course';

export const lesson2ScreenRemoval: VideoLesson = {
  id: 2,
  title: 'Safely Removing a Broken Screen',
  duration: '60 minutes',
  type: 'video',
  content: {
    videoUrl: 'E0qAowF0MK4',
    textContent: `## Safely Removing a Broken Screen

Safely removing a broken screen is a critical repair skill, as improper techniques can damage flex cables, connectors, the frame, or internal components like the motherboard, cameras, or sensors. Precision and caution preserve the device for successful replacement, ensuring safety for both the technician and the device.

**Required tools** include:  
**Heat gun/heating pad**: Softens adhesive holding the screen (e.g., iFixit's iOpener for iPhone 15 or a QianLi heating pad for Samsung Galaxy S24). Operates at 80–100°C to avoid damaging delicate OLEDs.  
**Plastic pry tools/spudgers**: Non-conductive tools like nylon or fiberglass spudgers prevent scratches or shorts (e.g., used to pry open a Google Pixel 8 without damaging its frame).  
**Suction cup tool**: Creates a lifting gap for prying (e.g., heavy-duty suction cups for the curved edges of a Galaxy S23 Ultra).  
**Precision screwdrivers**: Phillips #000, Pentalobe P2 (Apple), or Torx T3 (Android) to remove housing screws (e.g., Pentalobe for iPhone 14 back glass).  
**Tweezers**: ESD-safe, fine-tip tweezers handle delicate flex cables or connectors (e.g., disconnecting a Xiaomi 14's display cable).  
**ESD mat/wrist strap**: Grounds the technician to prevent electrostatic discharge, critical for protecting motherboards.  
**Plastic cards/shim tools**: Thin cards or guitar picks slide under screens to break adhesive bonds (e.g., used on OnePlus 12).  
**Magnifying lamp (optional)**: Enhances visibility for inspecting connectors or shards.

**Safety precautions** include:  
**Power off the device**: Ensure no current flows to avoid shorts or damage during disassembly.  
**Disconnect the battery**: Prevents accidental power surges that could fry circuits (e.g., a shorted iPhone 13 motherboard from skipping this step).  
**Dust-free workspace**: Minimizes contaminants entering the device, which could affect sensors or cameras.  
**Safety glasses**: Protect against glass shards from shattered screens (e.g., a cracked Galaxy A34).  
**Avoid metal tools**: Metal tools risk shorting circuits or scratching internals; use plastic only.  
**Ventilated area**: Heat guns produce fumes from adhesives, requiring good airflow.

**Preparation** involves:  
Assessing the screen type: OLEDs (e.g., iPhone 14 Pro's Super Retina XDR) are more fragile than LCDs (e.g., Motorola Moto G Power), requiring gentler handling and less heat.  
Device construction: Determine access method—front-access for iPhones, back-access for some Xiaomi or Oppo models (e.g., Oppo Find X6 back glass removal).  
Damage level: Shattered screens need packing tape or plastic film to contain glass shards, preventing injury or debris spread (e.g., a severely cracked Pixel 7 Pro).  
Screen bonding: Fused assemblies (glass + digitizer + display) are common in flagships, making glass-only repairs complex and risky for beginners.

**Removal process**:

1. **Remove back cover/screws**: Use precision screwdrivers to remove housing screws (e.g., Pentalobe screws on iPhone 15). Pry open back panels with plastic tools if needed (e.g., Samsung S24's glass back).  
2. **Disconnect battery**: Locate the battery connector and use a plastic spudger to disconnect it safely, preventing power flow (e.g., iPhone 13's battery connector under a metal shield).  
3. **Heat screen edges**: Apply heat at 80–100°C for 1–2 minutes using a heat gun or heating pad, moving in circular motions to soften adhesive (e.g., heating a Galaxy S23's AMOLED edges).  
4. **Use suction cup/pry tool**: Attach a suction cup to lift a small gap, then insert a plastic pick or card to slide along edges, breaking adhesive (e.g., starting at the bottom of an iPhone 14).  
5. **Detach screen connectors**: Lift the screen gently, avoiding tension on flex cables. Use tweezers to disconnect LCD and digitizer cables under shields or tape (e.g., Samsung S22's multi-cable stack).  
6. **Clean residual adhesive**: Remove leftover glue from the frame with isopropyl alcohol and a microfiber cloth, ensuring a clean surface for the new screen (e.g., cleaning a Pixel 8 frame).

**Tips for difficult removals**:  
Shattered screens without suction grip require tape to create a lifting surface.  
OLEDs (e.g., iPhone 15 Pro) need minimal heat (80°C) and thin pry tools to avoid burn marks or bending.  
Fused screens are best replaced as a full assembly to avoid damaging layers during separation.

**Common mistakes to avoid**:  
Excessive heat: Can warp frames or damage internals (e.g., overheating a Huawei Mate 50's display).  
Metal tools: Risk shorting circuits or scratching motherboards.  
Forcing the screen: Can crack frames or tear flex cables (e.g., forcing an iPhone 12 screen damaged its Face ID module).  
Skipping battery disconnection: Risks power surges.

**Post-removal inspection**: Check the motherboard, flex cables, and frame for damage or corrosion. For example, removing a Galaxy S24 Ultra's cracked screen revealed a damaged proximity sensor cable, requiring additional repair. This skill ensures safe, damage-free screen removal, setting the stage for high-quality replacements and customer satisfaction.`
  }
};
