
import type { VideoLesson } from '@/types/course';

export const lesson1GainStaging: VideoLesson = {
  id: 16,
  title: 'Gain Staging Fundamentals',
  duration: '65 min',
  type: 'video',
  content: {
    videoUrl: 'https://example.com/gain-staging',
    textContent: `# 🎧 Gain Staging Fundamentals

## What Is Gain Staging?
Gain staging is the process of managing the level (volume) of audio signals throughout the signal chain to avoid distortion, noise, or loss of clarity.

**Goal:** Maintain optimal signal levels from recording to mixing to mastering — not too quiet (adds noise), not too loud (causes clipping).

## Why Is Gain Staging Important?
- Prevents Clipping (distortion from too-high levels)
- Avoids Noise Floor (from boosting low-level signals)
- Ensures Headroom (space before distortion point)
- Improves Mix Clarity (balanced levels feed processors better)
- Protects Speakers & Ears (from accidental volume spikes)

## Signal Flow and Gain Stages
A signal chain has multiple stages where gain can be adjusted:
| Stage           | Example                        |
|-----------------|-------------------------------|
| 1. Source       | Microphone, instrument, sample |
| 2. Preamp       | Audio interface or mixer gain knobs |
| 3. Input Level  | DAW track input meters         |
| 4. Insert FX    | EQ, compression, etc.          |
| 5. Fader        | Channel volume fader           |
| 6. Master Bus   | Final output meter             |
Each of these points is a gain stage — and must be managed.

## Ideal Level Guidelines
| Stage             | Recommended Peak         |
|-------------------|-------------------------|
| Recording         | -18 dBFS to -12 dBFS    |
| DAW Track Input   | ~-12 dBFS               |
| After EQ/FX       | Keep under -6 dBFS      |
| Master Output     | Target -6 dBFS before mastering |

## Common Gain Staging Mistakes
| Mistake                        | Result                  |
|-------------------------------|-------------------------|
| Setting input gain too high    | Clipping and distortion |
| Mixing tracks too low          | Excess noise when boosted |
| Overusing effects to fix gain  | Introduces artifacts    |
| Ignoring plugin input/output   | Inconsistent signal chain |
| Pushing master fader to 0 dB   | No headroom, distortion risk |

## How to Gain Stage Properly
1. **Set Input Gain (Preamp Stage):** Adjust microphone or instrument gain so peaks hit -18 dBFS to -12 dBFS.
2. **Normalize/Trim Audio Clips:** Use clip gain to ensure a consistent level before applying effects.
3. **Use Metering Tools:** Watch your track and plugin input/output meters.
4. **Adjust Plugin Levels:** Ensure plugins don't output louder than they input (unless intentional).
5. **Balance Using Faders (Mixing Stage):** Mix with your faders instead of cranking gain inside effects.
6. **Leave Headroom on the Master Bus:** Don't exceed -6 dBFS on the master fader before exporting for mastering.

**Tools That Assist with Gain Staging:**
- VU Meters: Simulate analog meters for gain targeting
- Peak Meters: Show max level; avoid 0 dBFS
- LUFS Meters: Measure perceived loudness (used for streaming/podcasts)
- Trim/Gain Plugins: Help adjust level at any stage
- Metering Suites: iZotope Insight, Waves VU Meter, Klanghelm VUMT

## Gain Staging in Podcasting & Voice
- Record voice at -16 to -12 dBFS
- Clean up with EQ/compression, then adjust output gain
- Use loudness normalization to target -16 LUFS (mono podcast standard)

## Gain Staging vs. Volume
| Term   | Meaning                        |
|--------|-------------------------------|
| Gain   | Input level (before processing)|
| Volume | Output level (after processing/fader) |
➡️ Gain affects the signal before it hits effects/plugins. Volume controls what the listener hears after processing.
`
  }
};
