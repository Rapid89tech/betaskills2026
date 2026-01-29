import type { VideoLesson } from '@/types/course';

export const lesson1ScreenDiagnosis: VideoLesson = {
  id: 1,
  title: 'Diagnosing Screen Issues: Cracks, Unresponsive Touch, and More',
  duration: '65 minutes',
  type: 'video',
  content: {
    videoUrl: 'mTT8UgpbnOg',
    textContent: `## Diagnosing Screen Issues: Cracks, Unresponsive Touch, and More

Diagnosing screen issues is a foundational skill for smartphone repair technicians, as screens are the primary user interface and highly susceptible to damage due to their exposed position. Accurate diagnosis minimizes unnecessary part replacements, reduces repair costs, and enhances customer trust by ensuring precise solutions. A **screen assembly** integrates multiple layers: the **protective glass** (e.g., Corning Gorilla Glass Victus on Samsung Galaxy S23 or iPhone 14, designed for scratch and drop resistance), the **digitizer** (a capacitive layer detecting touch input, enabling gestures like swiping or pinching), and the **display panel** (LCD for budget devices like Motorola Moto G series or OLED/AMOLED for flagships like Google Pixel 8, rendering visuals). These layers are often laminated, meaning damage to one (e.g., cracked glass) typically requires replacing the entire assembly, especially in high-end devices where separating layers risks further damage.

**Cracked screens** show visible fractures, ranging from hairline cracks to spiderweb patterns, often resulting from drops or impacts (e.g., an iPhone 13 dropped face-down, showing cracks but retaining touch functionality). Diagnosis involves inspecting for glass shards, impact points, or compromised waterproof seals. Even if touch works, cracked screens risk worsening damage, as glass particles can infiltrate internals or impair digitizer performance. Recommend replacement to prevent user injury or further deterioration.

**Unresponsive touch/dead zones** occur when the screen fails to register touch entirely or in specific areas (e.g., a Samsung Galaxy A54 with an unresponsive bottom third after a drop). Causes include digitizer damage, loose flex cables, water exposure, or motherboard faults. Use diagnostic apps like **Touch Screen Test** (Android) or **Apple Configurator** (iOS) to map touch response, creating visual grids to identify dead zones. Boot in safe mode or perform a soft reset to rule out software glitches (e.g., an Android 14 bug causing touch lag). If software is not the issue, inspect flex cables or test with a replacement screen.

**Flickering/no display** manifests as a black screen, intermittent flickering, or distorted colors/lines (e.g., a Google Pixel 7 with a black screen but audible notifications). Causes include LCD/OLED failure, loose display connectors, or motherboard power delivery issues. Shine a flashlight at an angle to check for faint backlight activity, indicating a display fault. Connect a known-good screen to isolate the issue or use a multimeter to test connector voltages (e.g., 1.8V or 3.3V for display lines). If the screen remains blank, motherboard diagnostics may be needed.

**Ghost touch** occurs when the screen registers inputs without user interaction, such as random scrolling or typing (e.g., a Xiaomi 14 scrolling during calls). Causes include a faulty digitizer, static buildup, moisture under the glass, or software conflicts. Clean the screen with isopropyl alcohol, remove screen protectors, and test in safe mode to eliminate software causes. If persistent, replace the screen or check for moisture corrosion on connectors. For example, a water-exposed iPhone 12 exhibited ghost touch until the digitizer was replaced.

The **diagnostic process** is methodical to ensure accuracy:

1. **Visual inspection**: Examine the screen under a magnifying lamp for cracks, discoloration, dead pixels, or lifted edges. Check for signs of water damage (e.g., corrosion on flex cables) or battery swelling pressing against the screen (e.g., an iPhone SE 2020 with a lifted display).  
2. **Power cycling**: Restart the device to rule out temporary software glitches. For non-booting devices, connect to a charger or computer to check for boot signals (e.g., iTunes detecting an iPhone in DFU mode).  
3. **Diagnostic tools/apps**: Use apps like **Device Info HW** (Android) or built-in iOS diagnostics via Recovery Mode to test touch and display functionality. Multimeters measure voltage/continuity at screen connectors, while test screens confirm if the issue is screen-specific.  
4. **Flex cable checks**: Power off, open the device, and inspect digitizer/display cables for tears, bends, or looseness. Reseat connectors gently using tweezers (e.g., reseating a loose cable on a Samsung S22 fixed flickering).  
5. **Test screen swaps**: Temporarily connect a known-good screen to isolate faults. If the replacement works, the original screen is defective; if not, investigate motherboard or software issues (e.g., a Pixel 6 with no display required motherboard repair after a test screen failed).

**Key considerations** include:  
Removing screen protectors, as they can interfere with touch sensitivity (e.g., a thick tempered glass on a OnePlus 11 causing lag).  
Checking for **battery swelling**, which can lift screens or disrupt touch (e.g., a swollen battery in a Huawei P40).  
Assessing **moisture exposure**, as corrosion may not be immediately visible but can degrade connectors over time.  
Evaluating **software issues**, as updates or bugs (e.g., iOS 17 touch glitches) can mimic hardware faults—factory reset or safe mode testing helps.

**Tools** for diagnosis include multimeters (for electrical tests), magnifying lamps (for physical inspection), test screens (to isolate faults), plastic pry tools (for safe access), and diagnostic software. For example, diagnosing a Galaxy S23 with dead zones involved using Touch Screen Test to confirm digitizer failure, followed by a successful screen replacement. Mastering screen diagnosis ensures efficient, cost-effective repairs and builds a technician's reputation for reliability.`
  }
};
