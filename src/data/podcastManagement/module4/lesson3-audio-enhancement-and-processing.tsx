import type { VideoLesson } from '@/types/course';

export const lesson3AudioEnhancementAndProcessing: VideoLesson = {
  id: 3,
  title: 'Audio Enhancement and Processing',
  duration: '50 min',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/3Xz6JdVB08Q',
    textContent: `
# Audio Enhancement and Processing

## Overview
Audio enhancement and processing are essential for creating professional-quality podcast content. This lesson covers advanced audio processing techniques including equalization, compression, noise reduction, and other effects to improve audio quality and clarity.

## Equalization (EQ)

### What is EQ?
Equalization is the process of adjusting the balance of frequencies in an audio signal. EQ allows you to boost or cut specific frequency ranges to improve clarity, reduce unwanted sounds, and enhance the overall quality of your audio.

### Types of EQ

**Graphic EQ**
- **Description**: Fixed frequency bands with adjustable levels
- **Best for**: Quick adjustments, live sound
- **Pros**: Simple to use, visual representation
- **Cons**: Limited precision, fixed frequencies

**Parametric EQ**
- **Description**: Adjustable frequency, bandwidth, and level
- **Best for**: Precise adjustments, professional audio
- **Pros**: Maximum control, precise frequency targeting
- **Cons**: More complex, requires knowledge

**High-Pass Filter**
- **Description**: Removes frequencies below a set point
- **Best for**: Removing rumble, wind noise
- **Frequency range**: 20Hz - 200Hz
- **Common settings**: 80Hz - 120Hz for voice

**Low-Pass Filter**
- **Description**: Removes frequencies above a set point
- **Best for**: Removing hiss, high-frequency noise
- **Frequency range**: 8kHz - 20kHz
- **Common settings**: 12kHz - 16kHz for voice

### Voice EQ Settings

**Male Voice**
- **High-pass filter**: 80Hz
- **Presence boost**: 2-4kHz (+3-6dB)
- **Air boost**: 8-12kHz (+2-4dB)
- **Low cut**: 60-80Hz

**Female Voice**
- **High-pass filter**: 100Hz
- **Presence boost**: 3-5kHz (+3-6dB)
- **Air boost**: 10-15kHz (+2-4dB)
- **Low cut**: 80-100Hz

**General Voice Enhancement**
- **Remove mud**: Cut 200-400Hz (-2-4dB)
- **Add clarity**: Boost 2-4kHz (+3-6dB)
- **Reduce sibilance**: Cut 6-8kHz (-2-3dB)
- **Add air**: Boost 10-15kHz (+2-4dB)

## Compression

### What is Compression?
Compression reduces the dynamic range of audio by making loud sounds quieter and quiet sounds louder. This creates more consistent levels and helps audio sound more professional.

### Compression Parameters

**Threshold**
- **Definition**: Level at which compression begins
- **Setting**: -20dB to -10dB for voice
- **Effect**: Lower threshold = more compression

**Ratio**
- **Definition**: Amount of compression applied
- **Settings**: 2:1 to 4:1 for voice
- **Effect**: Higher ratio = more aggressive compression

**Attack**
- **Definition**: How quickly compression responds
- **Settings**: 5-20ms for voice
- **Effect**: Faster attack = more aggressive compression

**Release**
- **Definition**: How quickly compression stops
- **Settings**: 50-200ms for voice
- **Effect**: Faster release = more natural sound

**Makeup Gain**
- **Definition**: Boosts overall level after compression
- **Setting**: Adjust to restore perceived loudness
- **Effect**: Increases average level without clipping

### Compression Techniques

**Voice Compression**
- **Threshold**: -20dB to -15dB
- **Ratio**: 2:1 to 3:1
- **Attack**: 10-15ms
- **Release**: 100-150ms
- **Makeup gain**: 3-6dB

**Music Compression**
- **Threshold**: -25dB to -20dB
- **Ratio**: 3:1 to 4:1
- **Attack**: 5-10ms
- **Release**: 50-100ms
- **Makeup gain**: 2-4dB

**Master Compression**
- **Threshold**: -15dB to -10dB
- **Ratio**: 1.5:1 to 2:1
- **Attack**: 20-30ms
- **Release**: 100-200ms
- **Makeup gain**: 1-3dB

## Noise Reduction

### Types of Noise

**Constant Noise**
- **Examples**: Air conditioning, computer fans
- **Solution**: Noise reduction plugins
- **Technique**: Capture noise profile, apply reduction

**Variable Noise**
- **Examples**: Traffic, people talking
- **Solution**: Noise gate, spectral editing
- **Technique**: Set threshold, use spectral tools

**Impulse Noise**
- **Examples**: Clicks, pops, coughs
- **Solution**: Spectral editing, manual removal
- **Technique**: Zoom in, edit individual sounds

### Noise Reduction Tools

**Noise Gate**
- **Purpose**: Remove sounds below threshold
- **Settings**: Threshold -30dB to -20dB
- **Attack**: 5-10ms
- **Release**: 50-100ms
- **Ratio**: 10:1 or higher

**Spectral Editing**
- **Purpose**: Remove specific frequencies
- **Technique**: Select frequency range, reduce level
- **Use**: Remove hum, hiss, specific noises
- **Caution**: Can affect desired audio

**Noise Reduction Plugins**
- **Examples**: iZotope RX, Adobe Audition
- **Technique**: Capture noise profile, apply reduction
- **Settings**: Start with 20-30% reduction
- **Quality**: Preserve audio quality

### Noise Reduction Workflow

**Step 1: Identify Noise**
- **Listen carefully**: Identify noise types
- **Analyze spectrum**: Use frequency analyzer
- **Mark sections**: Note problematic areas

**Step 2: Capture Profile**
- **Find noise-only section**: 2-5 seconds of noise
- **Capture profile**: Use noise reduction tool
- **Test reduction**: Apply to small section first

**Step 3: Apply Reduction**
- **Start conservative**: 20-30% reduction
- **Listen carefully**: Monitor for artifacts
- **Adjust settings**: Fine-tune as needed
- **Check quality**: Ensure audio still sounds natural

## Advanced Processing

### De-essing

**What is De-essing?**
De-essing reduces harsh "s" sounds (sibilance) that can be unpleasant to listen to.

**De-esser Settings**
- **Frequency**: 6-8kHz (sibilance range)
- **Threshold**: -20dB to -15dB
- **Ratio**: 3:1 to 5:1
- **Attack**: 1-5ms
- **Release**: 10-50ms

**De-essing Techniques**
- **Broadband**: Affects entire frequency range
- **Split-band**: Only affects sibilance frequencies
- **Multi-band**: Different settings for different frequencies

### Pitch Correction

**When to Use**
- **Slight pitch problems**: Minor corrections
- **Consistency**: Maintain consistent pitch
- **Professional sound**: Enhance vocal quality

**Pitch Correction Settings**
- **Correction amount**: 20-50%
- **Speed**: 10-30ms
- **Formant preservation**: Maintain vocal character
- **Natural sound**: Avoid robotic effect

### Time Stretching

**Applications**
- **Pacing adjustment**: Speed up or slow down content
- **Synchronization**: Align audio with video
- **Creative effects**: Create unique sounds

**Time Stretching Settings**
- **Algorithm**: Choose appropriate for content
- **Quality**: High quality for voice
- **Formant preservation**: Maintain vocal character
- **Tempo adjustment**: ±10% for natural sound

## Effects and Processing

### Reverb

**Types of Reverb**
- **Room reverb**: Small, intimate spaces
- **Hall reverb**: Large, spacious environments
- **Plate reverb**: Smooth, musical character
- **Spring reverb**: Vintage, character sound

**Reverb Settings for Voice**
- **Room size**: Small to medium
- **Decay time**: 0.5-1.5 seconds
- **Pre-delay**: 10-30ms
- **Wet/dry mix**: 10-20% wet

### Delay

**Types of Delay**
- **Slapback**: Short delay (50-150ms)
- **Echo**: Longer delay (200-500ms)
- **Tape delay**: Warm, analog character
- **Digital delay**: Clean, precise timing

**Delay Settings**
- **Time**: 50-200ms for voice
- **Feedback**: 10-30%
- **Mix**: 5-15%
- **Filtering**: Remove high frequencies

### Chorus and Modulation

**Chorus Effect**
- **Purpose**: Add thickness and movement
- **Settings**: Subtle for voice
- **Rate**: 0.5-2Hz
- **Depth**: 10-30%
- **Mix**: 5-15%

**Modulation Effects**
- **Flanger**: Sweeping filter effect
- **Phaser**: Phase cancellation effect
- **Tremolo**: Amplitude modulation
- **Vibrato**: Pitch modulation

## Mastering for Podcasts

### Loudness Standards

**LUFS (Loudness Units Full Scale)**
- **Target**: -16 LUFS for podcasts
- **Measurement**: Integrated loudness
- **Range**: -18 to -14 LUFS acceptable
- **Consistency**: Maintain across episodes

**Peak Levels**
- **Maximum**: -1dB true peak
- **Target**: -3dB to -1dB
- **Headroom**: Leave room for processing
- **Clipping**: Avoid at all costs

### Mastering Chain

**Step 1: EQ**
- **High-pass filter**: 20-30Hz
- **Low-pass filter**: 18-20kHz
- **Gentle adjustments**: ±2-3dB maximum

**Step 2: Compression**
- **Light compression**: 1.5:1 to 2:1 ratio
- **Threshold**: -15dB to -10dB
- **Attack**: 20-30ms
- **Release**: 100-200ms

**Step 3: Limiting**
- **Ceiling**: -1dB true peak
- **Release**: 50-100ms
- **Look-ahead**: 5-10ms
- **Oversampling**: 4x or higher

**Step 4: Dithering**
- **Type**: Triangular or noise-shaped
- **Bit depth**: 16-bit for distribution
- **Noise floor**: Below -60dB

### Export Settings

**Format**: MP3 or AAC
**Bit rate**: 128kbps minimum, 192kbps recommended
**Sample rate**: 44.1kHz or 48kHz
**Channels**: Stereo or mono
**Normalization**: Apply loudness normalization

## Quality Control

### Listening Tests

**Multiple Environments**
- **Studio monitors**: Professional reference
- **Headphones**: Detailed listening
- **Car speakers**: Real-world testing
- **Mobile devices**: Common listening method

**Frequency Response**
- **Low end**: Check for muddiness
- **Mid range**: Ensure clarity
- **High end**: Check for harshness
- **Overall balance**: Natural sound

### Common Problems

**Clipping**
- **Cause**: Levels too high
- **Solution**: Reduce gain, use compression
- **Prevention**: Monitor levels carefully

**Distortion**
- **Cause**: Over-processing
- **Solution**: Reduce effect amounts
- **Prevention**: Use subtle settings

**Phase Issues**
- **Cause**: Multiple processing chains
- **Solution**: Check phase correlation
- **Prevention**: Use mono-compatible processing

**Artifacts**
- **Cause**: Aggressive noise reduction
- **Solution**: Reduce processing amount
- **Prevention**: Conservative settings

## Best Practices

### Processing Order
**1. Noise reduction**
Remove unwanted sounds first

**2. EQ**
Shape frequency response

**3. Compression**
Control dynamic range

**4. Effects**
Add character and space

**5. Limiting**
Final level control

### Conservative Approach
- **Start subtle**: Use gentle settings
- **Listen carefully**: Monitor for problems
- **A/B comparison**: Compare with and without
- **Take breaks**: Fresh ears for evaluation

### Documentation
- **Save presets**: Store successful settings
- **Take notes**: Document processing decisions
- **Create templates**: Standardize workflow
- **Version control**: Keep multiple versions

## Conclusion
Audio enhancement and processing are essential for creating professional podcast content. Focus on understanding the tools and their effects, use conservative settings, and always prioritize audio quality over processing. Remember that good processing enhances the content without drawing attention to itself.
    `
  }
};
