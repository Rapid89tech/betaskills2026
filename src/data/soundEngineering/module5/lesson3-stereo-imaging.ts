
import type { VideoLesson } from '@/types/course';

export const lesson3StereoImaging: VideoLesson = {
  id: 18,
  title: 'Stereo Imaging Techniques',
  duration: '55 min',
  type: 'video',
  content: {
    videoUrl: 'https://example.com/stereo-imaging',
    textContent: `# 🎧 Stereo Imaging Techniques

## What Is Stereo Imaging?
Stereo Imaging refers to the perceived spatial location of audio within the stereo field — left, center, right — and the width and depth of a mix.

It determines where sounds appear to come from in a stereo environment and how wide or narrow your mix feels.

## The Stereo Field
The stereo field consists of three key dimensions:
| Dimension           | Description                                 |
|---------------------|---------------------------------------------|
| Left to Right       | Pan position — is the sound left, right, or center? |
| Front to Back      | Perceived distance — created by volume, EQ, and reverb |
| Top to Bottom      | Implied by frequency content (not true spatial height) |

## Key Stereo Imaging Techniques
### A. Panning
- Moves sounds between left and right speakers
- Creates separation and clarity
- Rule of thumb: Keep essential elements (like vocals, bass, kick) centered

### B. Stereo Widening
- Expands mix beyond the speakers
- Can be achieved via:
  - Doubling & panning
  - Stereo effects (chorus, delays)
  - Mid/Side processing
  - Dedicated stereo imaging plugins

### C. Mono Compatibility
- Ensures mix doesn't fall apart when summed to mono
- Important for broadcast, phones, smart speakers

### D. Reverb & Delay
- Reverb adds spatial depth; stereo reverbs create width
- Delays panned differently in each ear create movement

## Tools Used for Stereo Imaging
| Tool                | Purpose                                 |
|---------------------|-----------------------------------------|
| Panner              | Moves sound across stereo field         |
| Stereo Wideners     | Expand perceived width                  |
| Mid/Side EQ/Compression | Treat center vs. sides independently |
| Stereo Meters       | Visualize balance and phase issues      |
| Imaging Plugins     | iZotope Ozone Imager, Waves S1, etc.    |

## Use in Podcasts & Voice Production
- **Voice:** Usually centered for clarity and focus
- **Music bed/sound effects:** Can be panned or widened for immersion
- **Binaural and spatial audio:** Simulate full 3D placement with headphones

## Common Stereo Imaging Mistakes
| Mistake                  | Consequence                         |
|--------------------------|-------------------------------------|
| Excessive widening       | Phase cancellation, hollow sound    |
| Narrow mix               | Feels flat, lacks excitement        |
| Important sounds off-center | Distraction or imbalance         |
| Ignoring mono compatibility | Sounds disappear in mono playback |
| Using stereo FX on bass  | Can cause phase/clarity issues      |

## Practical Tips
- Start in mono to balance levels and EQ; switch to stereo to place sounds
- Keep low-end (kick, bass) in mono
- Use stereo widening sparingly and musically
- Check mix with a correlation meter to avoid phase issues
- Use automation to move elements subtly across stereo field over time

## Key Terms to Remember
| Term              | Definition                                 |
|-------------------|--------------------------------------------|
| Pan               | Left-to-right positioning in stereo field  |
| Width             | Perceived separation between left/right    |
| Depth             | Sense of front/back space in a mix         |
| Mid/Side (M/S)    | Processing center and side channels separately |
| Phase Cancellation| Loss of signal when stereo collapses to mono |`
  }
};
