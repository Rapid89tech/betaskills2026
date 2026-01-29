import { Lesson } from '@/types/course';

export const lesson2PickupPatterns: Lesson = {
  id: 'lesson2-pickup-patterns',
  title: '🎤 Pickup Patterns (Polar Patterns)',
  description: 'Understanding microphone pickup patterns and their applications',
  duration: '45 minutes',
  type: 'lesson',
  content: `# 🎤 Pickup Patterns (Polar Patterns)

## 1. What Are Pickup Patterns?

**YouTube Video**: [Understanding Pickup Patterns](https://youtu.be/36E5JZbtvfY)
<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 20px 0;">
  <iframe 
    src="https://www.youtube.com/embed/36E5JZbtvfY" 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" 
    allowfullscreen>
  </iframe>
</div>

**Definition**: Pickup patterns (or polar patterns) describe how a microphone responds to sound from different directions—i.e., where it "hears" sound the most and where it rejects it.

**Importance**: Crucial in selecting the right microphone for a specific recording situation. Helps manage sound isolation, feedback control, and room acoustics.

## 2. Types of Pickup Patterns

### 🎯 A. Omnidirectional

**YouTube Video**: [Omnidirectional Pattern](https://youtu.be/XNu5H2qJ-hc)
<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 20px 0;">
  <iframe 
    src="https://www.youtube.com/embed/XNu5H2qJ-hc" 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" 
    allowfullscreen>
  </iframe>
</div>

**Description**: Picks up sound equally well from all directions (360°). No rejection areas.

**Characteristics**:
- Natural and open sound
- High ambient noise pickup

**Use Cases**:
- Room/ambience recording
- Group conversations
- Lavalier mics in broadcast

**Diagram**: 🟢 (Perfect circle around the mic)

### 🎯 B. Cardioid

**YouTube Video**: [Cardioid Pattern](https://youtu.be/rfI_YwvtmEk)
<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 20px 0;">
  <iframe 
    src="https://www.youtube.com/embed/rfI_YwvtmEk" 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" 
    allowfullscreen>
  </iframe>
</div>

**Description**: Picks up sound primarily from the front, rejects sound from the rear.

**Characteristics**:
- Good background noise rejection
- Named "cardioid" due to its heart-shaped pattern

**Use Cases**:
- Studio vocals
- Live vocals
- Podcasts and streaming

**Diagram**: 🧡 (Heart-shaped pattern with wide front lobe)

### 🎯 C. Supercardioid

**YouTube Video**: [Supercardioid Pattern](https://youtu.be/xDUOZGLFmvA)
<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 20px 0;">
  <iframe 
    src="https://www.youtube.com/embed/xDUOZGLFmvA" 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" 
    allowfullscreen>
  </iframe>
</div>

**Description**: Tighter front pickup than cardioid, small rear lobe (picks up a little from the back).

**Characteristics**:
- Better side noise rejection
- Slightly more sensitive to rear noise than cardioid

**Use Cases**:
- Noisy live stages
- Isolating vocals or instruments in close setups

**Diagram**: 🔶 (Narrower front with small back pickup)

### 🎯 D. Hypercardioid

**YouTube Video**: [Hypercardioid Pattern](https://youtu.be/VPol1hiXtrM)
<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 20px 0;">
  <iframe 
    src="https://www.youtube.com/embed/VPol1hiXtrM" 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" 
    allowfullscreen>
  </iframe>
</div>

**Description**: Even narrower front pickup angle than supercardioid, larger rear lobe.

**Characteristics**:
- Extremely focused directionality
- More susceptible to rear pickup than supercardioid

**Use Cases**:
- Isolating sound in very loud environments
- Drum overheads, stage monitors

**Diagram**: 🔺 (Very narrow front with significant rear sensitivity)

### 🎯 E. Bidirectional (Figure-8)

**YouTube Video**: [Bidirectional Pattern](https://youtu.be/IgG9p0aO9Eg)
<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 20px 0;">
  <iframe 
    src="https://www.youtube.com/embed/IgG9p0aO9Eg" 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" 
    allowfullscreen>
  </iframe>
</div>

**Description**: Picks up sound from the front and back, rejects sound from the sides.

**Characteristics**:
- Excellent side rejection
- Very natural room sound when used properly

**Use Cases**:
- Duets or interviews (face-to-face)
- Stereo miking (Blumlein, mid-side techniques)

**Diagram**: 🟢🟢 (Two circles front and back)

### 🎯 F. Shotgun (Lobar)

**YouTube Video**: [Shotgun Pattern](https://youtu.be/HagyNPzc-zs)
<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 20px 0;">
  <iframe 
    src="https://www.youtube.com/embed/HagyNPzc-zs" 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" 
    allowfullscreen>
  </iframe>
</div>

**Description**: Extremely directional pickup with a narrow acceptance angle. Uses an interference tube to cancel off-axis sounds.

**Characteristics**:
- Best at long-distance sound isolation
- Rejection of side and ambient noise

**Use Cases**:
- Film and TV production
- Field recording, nature recording

**Diagram**: 🎯 (Tight forward beam, very little side pickup)

## 3. Visual Comparison of Patterns

| Pattern | Front Pickup | Side Rejection | Rear Pickup | Best For |
|---------|--------------|----------------|-------------|----------|
| Omnidirectional | Yes | No | Yes | Natural sound, ambiance |
| Cardioid | Yes | Moderate | No | Studio vocals, podcasts |
| Supercardioid | Yes (narrow) | High | Slight | Stage performance, film |
| Hypercardioid | Yes (tighter) | Very high | More than super | Loud environments, drums |
| Bidirectional | Yes (front & back) | Very high | Yes | Interviews, stereo miking |
| Shotgun | Yes (focused) | Extremely high | Minimal | Film, long-range vocal pickup |

## 4. Choosing the Right Pickup Pattern

| Scenario | Recommended Pattern |
|----------|-------------------|
| Solo vocal in studio | Cardioid |
| Noisy environment | Supercardioid |
| Group discussion (1 mic) | Omnidirectional |
| Film set (distant sound) | Shotgun |
| Interview (2 people, face-to-face) | Bidirectional |
| Live concert (drum overheads) | Hypercardioid |

## 5. Multi-Pattern Microphones

**YouTube Video**: [Multi-Pattern Microphones](https://youtu.be/U2M0ofizDc8)
<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 20px 0;">
  <iframe 
    src="https://www.youtube.com/embed/U2M0ofizDc8" 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" 
    allowfullscreen>
  </iframe>
</div>

Some condenser mics offer switchable polar patterns, allowing users to choose between cardioid, omnidirectional, bidirectional, and sometimes super/hypercardioid.

**Examples**:
- AKG C414
- Blue Yeti

These mics are versatile for multiple recording applications.

## 6. Summary

**YouTube Video**: [Summary of Microphone Polar Patterns](https://youtu.be/example)
<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 20px 0;">
  <iframe 
    src="https://www.youtube.com/embed/example" 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" 
    allowfullscreen>
  </iframe>
</div>

Pickup patterns determine how a mic captures sound from different directions. Choosing the correct pattern can improve audio quality, reduce noise, and enhance focus on the intended source. Understanding these patterns is essential for mic placement, studio setup, and live sound engineering.

## Key Takeaways

1. **Pickup patterns** determine microphone directionality and sensitivity
2. **Omnidirectional** picks up sound equally from all directions
3. **Cardioid** rejects rear sound, most common for vocals
4. **Supercardioid** provides tighter front pickup and better side rejection
5. **Hypercardioid** offers maximum directionality for loud environments
6. **Bidirectional** picks up front and back, rejects sides
7. **Shotgun** provides extremely focused pickup for distant sources
8. **Pattern selection** depends on recording environment and isolation needs
9. **Multi-pattern mics** offer flexibility for different applications
10. **Understanding patterns** is crucial for optimal microphone placement
  `
};

export default lesson2PickupPatterns; 
