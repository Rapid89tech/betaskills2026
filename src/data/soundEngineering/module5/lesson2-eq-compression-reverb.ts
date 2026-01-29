
import type { VideoLesson } from '@/types/course';

export const lesson2EqCompressionReverb: VideoLesson = {
  id: 17,
  title: 'EQ, Compression, and Reverb',
  duration: '75 min',
  type: 'video',
  content: {
    videoUrl: 'https://example.com/eq-compression-reverb',
    textContent: `# 🎚️ EQ, Compression, and Reverb

## EQ (Equalization)
### A. What is EQ?
EQ (Equalization) is the process of adjusting the balance of frequency content in an audio signal. It helps shape tone, correct imbalances, and create space in a mix.

### B. Frequency Ranges
| Range        | Frequency      | Typical Sounds           |
|--------------|---------------|-------------------------|
| Sub-bass     | 20–60 Hz      | Rumble, power           |
| Bass         | 60–250 Hz     | Kick drum, bass guitar  |
| Low mids     | 250–500 Hz    | Warmth, muddiness       |
| Mids         | 500 Hz–2 kHz  | Boxiness, clarity       |
| Upper mids   | 2–5 kHz       | Presence, edge          |
| Highs        | 5–10 kHz      | Air, brightness         |
| Brilliance   | 10–20 kHz     | Sparkle, shimmer        |

### C. Common EQ Types
- High-pass filter (HPF): Cuts low frequencies
- Low-pass filter (LPF): Cuts high frequencies
- Bell (Peak): Boosts or cuts a specific frequency
- Shelf (High/Low): Raises or lowers a full range
- Notch: Cuts a very narrow band (e.g., hum)

### D. EQ Tips
- Cut mud at 250–400 Hz
- Reduce harshness at 2.5–4 kHz
- Boost presence around 3–6 kHz
- High-pass voice tracks below 80–100 Hz
- Don't boost and cut the same frequencies in different tracks

## Compression
### A. What is Compression?
Compression reduces the dynamic range of an audio signal. It makes loud parts quieter and quiet parts louder to create a more consistent and controlled sound.

### B. Key Compression Controls
| Control      | Function                        |
|--------------|---------------------------------|
| Threshold    | Level where compression starts  |
| Ratio        | How much compression is applied |
| Attack       | How quickly compression kicks in|
| Release      | How quickly it stops after signal drops |
| Knee         | How smoothly compression is applied |
| Make-up Gain | Boosts output to compensate for loss |

### C. Types of Compression
- Vocal Compression: Adds consistency and intimacy
- Parallel Compression: Mixes dry + compressed signal for punch
- Multiband Compression: Compresses by frequency range
- Sidechain Compression: Duck one track (e.g., music) when another plays (e.g., voice)

### D. Compression Tips
- Use fast attack for controlling peaks
- Use slower attack for punchiness
- Avoid over-compression (can sound squashed or lifeless)
- Always match input and output levels for fair comparison

## Reverb
### A. What is Reverb?
Reverb simulates the reflections of sound in a physical space (room, hall, plate, etc.), adding a sense of depth, distance, and natural space.

### B. Common Reverb Types
| Type        | Character                |
|-------------|--------------------------|
| Room        | Small, intimate, natural |
| Hall        | Large, lush, ambient     |
| Plate       | Smooth, metallic, vocals |
| Spring      | Boingy, vintage, guitars |
| Convolution | Uses real-world impulse responses |

### C. Reverb Controls
| Control     | Purpose                                 |
|-------------|-----------------------------------------|
| Pre-delay   | Delay before reverb starts (adds clarity)|
| Decay time  | How long reverb tail lasts              |
| Wet/Dry mix | Balance between dry and wet signal      |
| Size        | Simulates the physical size of the space|
| Damping     | Controls high-frequency rolloff         |

### D. Reverb Tips
- Use short reverb for clarity (podcast, speech)
- Use longer reverb for dramatic or ambient feel
- Pre-delay helps keep vocals upfront
- Avoid clutter: use one or two shared reverb buses
- High-pass the reverb return to avoid mud in low frequencies

## How These Tools Work Together
| Tool        | Main Function                | When to Use                        |
|-------------|-----------------------------|------------------------------------|
| EQ          | Shapes tone by boosting/cutting frequencies | To fix or enhance specific frequency areas |
| Compression | Controls volume dynamics     | To smooth vocals or control peaks  |
| Reverb      | Adds spatial depth and realism | To place sounds in a virtual space |

**Order in signal chain matters:**
EQ → Compression → Reverb (most common)
But can change creatively depending on desired effect
`
  }
};
