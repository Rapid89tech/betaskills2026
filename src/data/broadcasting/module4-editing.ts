import { Module } from '@/types/course';

const broadcastingModule4: Module = {
  id: 4,
  title: 'Audio Editing Essentials',
  description: 'Learn the fundamentals of audio editing, including cutting, mixing, and enhancing your podcast audio for professional-quality results.',
  lessons: [
    {
      id: 8,
      title: 'Introduction to Audio Editing',
      duration: '50 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/R_mDWE83TfI',
        textContent: `
# Introduction to Audio Editing

**YOUTUBE LINK:** https://youtu.be/R_mDWE83TfI

Audio editing is the process of manipulating and enhancing recorded audio to create a polished, professional podcast episode. This involves cutting out unwanted parts, adjusting levels, adding effects, and ensuring consistent quality throughout your episode.

## Basic Editing Concepts:

### Cutting and Trimming:
- Remove long pauses, filler words, and mistakes
- Trim silence at the beginning and end of clips
- Cut out background noise and interruptions
- Maintain natural flow and pacing

### Level Adjustment:
- Normalize audio levels across all speakers
- Balance volume between different segments
- Ensure consistent loudness throughout the episode
- Apply compression to control dynamic range

### Audio Enhancement:
- Apply EQ to improve vocal clarity
- Use noise reduction to eliminate background hiss
- Add subtle reverb for depth (if appropriate)
- Enhance overall audio quality

## Popular Editing Software:

### Free Options:
- **Audacity**: Powerful, cross-platform, open-source
- **GarageBand**: Mac-exclusive, user-friendly interface
- **OcenAudio**: Lightweight, fast processing

### Professional Options:
- **Adobe Audition**: Industry-standard, advanced features
- **Reaper**: Affordable, highly customizable
- **Hindenburg Journalist**: Built specifically for spoken word
- **Pro Tools**: Industry standard for professional studios

## Essential Editing Techniques:

### 1. Noise Reduction:
- Sample a quiet section to create a noise profile
- Apply noise reduction to the entire recording
- Use spectral editing for precise noise removal

### 2. Equalization (EQ):
- Cut low frequencies below 80Hz to remove rumble
- Boost frequencies around 2-5kHz for vocal clarity
- Add warmth around 100-300Hz if needed

### 3. Compression:
- Control dynamic range and prevent clipping
- Set appropriate threshold and ratio values
- Use makeup gain to restore overall level

### 4. Fade In/Out:
- Smooth transitions between segments
- Professional start and end to episodes
- Crossfade between different audio clips

## Workflow Tips:

1. **Organize your project**: Use clear naming conventions
2. **Save frequently**: Prevent loss of work
3. **Listen on different devices**: Ensure compatibility
4. **Take breaks**: Fresh ears catch more issues
5. **Export in appropriate format**: MP3 for distribution, WAV for archiving
        `
      }
    }
  ]
};

export default broadcastingModule4; 