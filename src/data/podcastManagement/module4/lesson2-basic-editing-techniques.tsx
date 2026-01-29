import type { VideoLesson } from '@/types/course';

export const lesson2BasicEditingTechniques: VideoLesson = {
  id: 2,
  title: 'Basic Editing Techniques',
  duration: '55 min',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/4Xz6JdVB08Q',
    textContent: `
# Basic Editing Techniques

## Overview
Basic editing techniques are the foundation of podcast production. This lesson covers essential editing skills including cutting, trimming, arranging, and basic audio processing to create professional-quality podcast episodes.

## Understanding the Timeline

### Timeline Basics
- **Playhead**: Shows current playback position
- **Tracks**: Horizontal rows for different audio sources
- **Regions**: Audio clips on tracks
- **Grid**: Helps align audio to specific time intervals
- **Snap**: Automatically aligns regions to grid or markers

### Navigation
- **Zoom**: Magnify timeline for detailed editing
- **Scroll**: Move through timeline horizontally
- **Markers**: Set reference points for important sections
- **Loop**: Repeat specific sections for editing
- **Transport**: Control playback and recording

## Selection and Navigation

### Selecting Audio
- **Click and drag**: Select time ranges
- **Double-click**: Select entire region
- **Shift+click**: Extend selection
- **Ctrl/Cmd+click**: Add to selection
- **Marquee tool**: Select specific areas

### Navigation Techniques
- **Spacebar**: Play/pause
- **Home/End**: Go to start/end of project
- **Arrow keys**: Move playhead by small increments
- **Shift+arrow**: Move playhead by larger increments
- **Number keys**: Jump to markers

## Cutting and Trimming

### Basic Cutting
- **Razor tool**: Cut audio at specific points
- **Split command**: Divide regions at playhead
- **Delete**: Remove selected audio
- **Backspace**: Remove selected audio
- **Undo**: Reverse last action

### Trimming Techniques
- **Edge trimming**: Adjust start/end points
- **Fade trimming**: Create smooth transitions
- **Crossfade**: Blend overlapping regions
- **Gap removal**: Eliminate silence between regions

### Advanced Cutting
- **Ripple edit**: Automatically close gaps
- **Slip edit**: Change content without changing timing
- **Slide edit**: Move content within region
- **Roll edit**: Adjust edit points between regions

## Copying and Pasting

### Basic Operations
- **Copy (Ctrl/Cmd+C)**: Duplicate selected audio
- **Paste (Ctrl/Cmd+V)**: Insert copied audio
- **Cut (Ctrl/Cmd+X)**: Remove and copy audio
- **Duplicate**: Create exact copy of region

### Advanced Copying
- **Repeat**: Create multiple copies
- **Paste special**: Paste with specific options
- **Paste at playhead**: Insert at current position
- **Paste to new track**: Create separate track

### Time and Pitch Manipulation
- **Time stretch**: Change duration without affecting pitch
- **Pitch shift**: Change pitch without affecting duration
- **Tempo change**: Adjust overall speed
- **Reverse**: Play audio backwards

## Arranging and Organizing

### Track Organization
- **Color coding**: Use colors to identify track types
- **Naming**: Give tracks descriptive names
- **Grouping**: Link related tracks together
- **Muting**: Temporarily disable tracks
- **Soloing**: Play only selected tracks

### Region Management
- **Moving**: Drag regions to new positions
- **Snapping**: Align to grid or markers
- **Locking**: Prevent accidental changes
- **Grouping**: Link multiple regions
- **Ungrouping**: Separate linked regions

### Project Structure
- **Intro section**: Opening music and introduction
- **Main content**: Primary audio content
- **Transitions**: Music or effects between sections
- **Outro section**: Closing remarks and music
- **Credits**: Episode information and acknowledgments

## Audio Processing Basics

### Volume Control
- **Gain adjustment**: Change overall volume
- **Fade in/out**: Gradual volume changes
- **Crossfade**: Smooth transition between regions
- **Normalization**: Adjust to target level
- **Compression**: Control dynamic range

### Equalization (EQ)
- **High-pass filter**: Remove low frequencies
- **Low-pass filter**: Remove high frequencies
- **Presence boost**: Enhance vocal clarity
- **Rumble reduction**: Remove unwanted low end
- **Sibilance control**: Reduce harsh "s" sounds

### Noise Reduction
- **Noise gate**: Remove quiet background sounds
- **Spectral editing**: Remove specific frequencies
- **Noise reduction**: Reduce constant background noise
- **De-essing**: Reduce sibilant sounds
- **Hum removal**: Eliminate electrical interference

## Working with Multiple Tracks

### Track Types
- **Voice tracks**: Primary spoken content
- **Music tracks**: Background music and transitions
- **Sound effect tracks**: Audio effects and ambiance
- **Interview tracks**: Guest audio
- **Master track**: Final mixed output

### Track Management
- **Adding tracks**: Create new audio tracks
- **Deleting tracks**: Remove unused tracks
- **Reordering**: Arrange tracks logically
- **Soloing**: Listen to individual tracks
- **Muting**: Disable specific tracks

### Mixing Basics
- **Level balancing**: Adjust relative volumes
- **Panning**: Position audio in stereo field
- **Effects**: Apply processing to tracks
- **Buses**: Route multiple tracks together
- **Master fader**: Control overall output

## Editing Workflow

### Pre-Editing Preparation
- **Import audio**: Bring files into project
- **Organize tracks**: Arrange logically
- **Set markers**: Mark important points
- **Check levels**: Ensure proper recording levels
- **Backup**: Save project before editing

### Editing Process
- **Rough cut**: Remove major problems
- **Fine cut**: Refine timing and content
- **Add music**: Insert background music
- **Add effects**: Apply audio processing
- **Mix**: Balance all elements

### Post-Editing Tasks
- **Final review**: Listen to complete episode
- **Export**: Create final audio file
- **Backup**: Save project and audio files
- **Archive**: Store for future reference
- **Documentation**: Note editing decisions

## Common Editing Tasks

### Removing Unwanted Content
- **Filler words**: Remove "um," "uh," "you know"
- **Long pauses**: Shorten or remove silence
- **Repetitions**: Eliminate repeated phrases
- **Off-topic content**: Remove irrelevant sections
- **Technical problems**: Fix audio issues

### Improving Flow
- **Smooth transitions**: Create natural connections
- **Pacing**: Adjust timing for engagement
- **Energy**: Maintain listener interest
- **Clarity**: Ensure clear communication
- **Coherence**: Maintain logical structure

### Adding Elements
- **Intro music**: Opening theme
- **Transition music**: Between sections
- **Sound effects**: Enhance storytelling
- **Outro music**: Closing theme
- **Credits**: Episode information

## Quality Control

### Listening Techniques
- **Full listen**: Review entire episode
- **Section review**: Focus on specific parts
- **Level monitoring**: Check audio levels
- **Frequency analysis**: Identify problems
- **Comparison**: Compare to reference material

### Common Issues
- **Clipping**: Audio exceeding maximum level
- **Noise**: Unwanted background sounds
- **Distortion**: Audio quality problems
- **Phase issues**: Track alignment problems
- **Timing**: Synchronization problems

### Fixing Problems
- **Clipping**: Reduce gain or use compression
- **Noise**: Apply noise reduction
- **Distortion**: Check gain staging
- **Phase**: Align tracks properly
- **Timing**: Adjust region positions

## Keyboard Shortcuts

### Essential Shortcuts
- **Spacebar**: Play/pause
- **Ctrl/Cmd+S**: Save project
- **Ctrl/Cmd+Z**: Undo
- **Ctrl/Cmd+Y**: Redo
- **Ctrl/Cmd+X**: Cut
- **Ctrl/Cmd+C**: Copy
- **Ctrl/Cmd+V**: Paste
- **Delete**: Remove selection

### Navigation Shortcuts
- **Home**: Go to start
- **End**: Go to end
- **Left/Right arrows**: Move playhead
- **Shift+arrows**: Move by larger increments
- **Ctrl/Cmd+Home**: Go to start
- **Ctrl/Cmd+End**: Go to end

### Editing Shortcuts
- **R**: Razor tool
- **V**: Move tool
- **M**: Marquee tool
- **Z**: Zoom tool
- **H**: Hand tool
- **S**: Split at playhead
- **J**: Join regions
- **F**: Fade tool

## Best Practices

### Organization
- **Consistent naming**: Use clear, descriptive names
- **Color coding**: Identify track types with colors
- **Regular saves**: Save work frequently
- **Backup copies**: Keep multiple versions
- **Clean workspace**: Remove unused elements

### Efficiency
- **Keyboard shortcuts**: Learn and use shortcuts
- **Templates**: Create project templates
- **Presets**: Save effect settings
- **Batch processing**: Group similar operations
- **Automation**: Use automated features

### Quality
- **Reference material**: Compare to professional content
- **Fresh ears**: Take breaks during editing
- **Multiple reviews**: Listen several times
- **Feedback**: Get input from others
- **Continuous improvement**: Learn from each project

## Conclusion
Basic editing techniques are essential for creating professional podcast content. Focus on mastering fundamental operations like cutting, trimming, and arranging before moving to advanced features. Remember that good editing enhances the listener experience and makes your content more engaging and professional.
    `
  }
};
