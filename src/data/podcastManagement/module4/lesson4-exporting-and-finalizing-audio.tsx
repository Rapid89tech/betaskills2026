import type { VideoLesson } from '@/types/course';

export const lesson4ExportingAndFinalizingAudio: VideoLesson = {
  id: 4,
  title: 'Exporting and Finalizing Audio',
  duration: '45 min',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/2Xz6JdVB08Q',
    textContent: `
# Exporting and Finalizing Audio

## Overview
Exporting and finalizing audio is the final step in podcast production. This lesson covers the process of preparing your edited audio for distribution, including format selection, quality settings, metadata, and best practices for ensuring your podcast sounds professional across all platforms.

## Understanding Audio Formats

### Common Podcast Formats

**MP3**
- **Compression**: Lossy compression
- **File size**: Small, efficient
- **Quality**: Good for most podcasts
- **Compatibility**: Universal support
- **Bit rates**: 128kbps minimum, 192kbps recommended

**AAC (Advanced Audio Coding)**
- **Compression**: More efficient than MP3
- **File size**: Smaller than MP3 at same quality
- **Quality**: Better quality than MP3
- **Compatibility**: Good support, especially Apple devices
- **Bit rates**: 128kbps minimum, 192kbps recommended

**WAV**
- **Compression**: Uncompressed
- **File size**: Large, inefficient for distribution
- **Quality**: Highest quality
- **Compatibility**: Universal support
- **Use**: Archival, further processing

**FLAC (Free Lossless Audio Codec)**
- **Compression**: Lossless compression
- **File size**: Smaller than WAV, larger than MP3
- **Quality**: Identical to original
- **Compatibility**: Good support
- **Use**: High-quality distribution

### Format Selection Guide

**For Podcast Distribution**
- **Primary**: MP3 or AAC
- **Quality**: 192kbps stereo or 128kbps mono
- **Reason**: Balance of quality and file size

**For Archival**
- **Primary**: WAV or FLAC
- **Quality**: 24-bit, 48kHz
- **Reason**: Preserve maximum quality

**For Further Processing**
- **Primary**: WAV
- **Quality**: 24-bit, 48kHz
- **Reason**: Maintain quality for additional editing

## Quality Settings

### Sample Rate
- **44.1kHz**: CD quality, standard for most content
- **48kHz**: Professional standard, better for video
- **96kHz**: High-end audio, rarely needed for podcasts
- **Recommendation**: 48kHz for professional podcasts

### Bit Depth
- **16-bit**: CD quality, sufficient for most podcasts
- **24-bit**: Professional standard, more dynamic range
- **32-bit**: High-end audio, rarely needed
- **Recommendation**: 24-bit for recording, 16-bit for distribution

### Bit Rate
- **64kbps**: Very low quality, not recommended
- **128kbps**: Minimum acceptable quality
- **192kbps**: Good quality, recommended
- **256kbps**: High quality, for music-heavy content
- **320kbps**: Maximum quality, rarely needed

### Channel Configuration
- **Mono**: Single channel, smaller file size
- **Stereo**: Two channels, better for music
- **Recommendation**: Mono for voice-only, stereo for music content

## Loudness Standards

### LUFS (Loudness Units Full Scale)
- **Target**: -16 LUFS for podcasts
- **Range**: -18 to -14 LUFS acceptable
- **Measurement**: Integrated loudness over entire episode
- **Tools**: Loudness meters, normalization plugins

### Peak Levels
- **Maximum**: -1dB true peak
- **Target**: -3dB to -1dB
- **Headroom**: Leave room for processing
- **Clipping**: Avoid at all costs

### Loudness Normalization
- **Purpose**: Ensure consistent levels across episodes
- **Method**: Measure current loudness, adjust to target
- **Tools**: Built-in normalization, third-party plugins
- **Process**: Apply after all other processing

## Export Settings by Platform

### Apple Podcasts
- **Format**: MP3 or AAC
- **Bit rate**: 192kbps stereo, 128kbps mono
- **Sample rate**: 44.1kHz or 48kHz
- **Loudness**: -16 LUFS
- **Metadata**: ID3 tags required

### Spotify
- **Format**: MP3 or AAC
- **Bit rate**: 192kbps stereo, 128kbps mono
- **Sample rate**: 44.1kHz or 48kHz
- **Loudness**: -16 LUFS
- **Metadata**: ID3 tags recommended

### YouTube
- **Format**: MP3 or AAC
- **Bit rate**: 192kbps stereo
- **Sample rate**: 44.1kHz or 48kHz
- **Loudness**: -16 LUFS
- **Video**: Separate video file required

### General Distribution
- **Format**: MP3
- **Bit rate**: 192kbps stereo, 128kbps mono
- **Sample rate**: 44.1kHz
- **Loudness**: -16 LUFS
- **Metadata**: ID3 tags recommended

## Metadata and Tagging

### ID3 Tags
- **Title**: Episode title
- **Artist**: Podcast name
- **Album**: Podcast name
- **Year**: Release year
- **Genre**: Podcast
- **Comment**: Episode description
- **Cover Art**: Episode artwork

### Advanced Metadata
- **Episode Number**: Sequential numbering
- **Season Number**: If applicable
- **Description**: Episode summary
- **Keywords**: Search terms
- **Language**: Audio language
- **Explicit**: Content warnings

### Metadata Tools
- **Built-in**: Most DAWs include basic tagging
- **Third-party**: Specialized tagging software
- **Batch processing**: Tag multiple files
- **Validation**: Check metadata accuracy

## Export Workflow

### Pre-Export Checklist
- [ ] All editing complete
- [ ] Audio levels checked
- [ ] Loudness normalized
- [ ] Metadata prepared
- [ ] Backup saved
- [ ] Quality settings confirmed

### Export Process
**1. Select format**
Choose appropriate format

**2. Set quality**
Configure bit rate and sample rate

**3. Apply normalization**
Set target loudness

**4. Add metadata**
Include episode information

**5. Export**
Create final file

**6. Verify**
Check exported file

### Post-Export Tasks
- **Listen**: Review exported file
- **Check levels**: Verify loudness and peaks
- **Test compatibility**: Play on different devices
- **Backup**: Save exported file
- **Archive**: Store for future reference

## Quality Control

### Listening Tests
- **Studio monitors**: Professional reference
- **Headphones**: Detailed listening
- **Car speakers**: Real-world testing
- **Mobile devices**: Common listening method
- **Different volumes**: Check at various levels

### Technical Checks
- **Loudness meter**: Verify target levels
- **Peak meter**: Check for clipping
- **Spectrum analyzer**: Identify frequency issues
- **Phase correlation**: Check stereo compatibility
- **File integrity**: Verify file is not corrupted

### Common Issues
- **Clipping**: Audio exceeding maximum level
- **Low levels**: Audio too quiet
- **Distortion**: Audio quality problems
- **Metadata errors**: Incorrect episode information
- **File corruption**: Damaged audio file

## File Management

### Naming Conventions
- **Format**: [PodcastName]_[EpisodeNumber]_[Date]_[Title]
- **Example**: MyPodcast_001_2024-01-15_Introduction.mp3
- **Consistency**: Use same format for all episodes
- **Descriptive**: Include relevant information
- **Compatible**: Avoid special characters

### Organization
- **Folder structure**: Organize by date or episode
- **Backup copies**: Keep multiple versions
- **Archive**: Store completed episodes
- **Version control**: Track different versions
- **Documentation**: Note export settings

### Storage Considerations
- **Local storage**: Primary working copies
- **Cloud backup**: Off-site storage
- **Archive storage**: Long-term preservation
- **Accessibility**: Easy to find and retrieve
- **Redundancy**: Multiple backup locations

## Platform-Specific Requirements

### Apple Podcasts
- **File size**: Maximum 500MB
- **Duration**: No specific limit
- **Format**: MP3, AAC, WAV, FLAC
- **Cover art**: 1400x1400 to 3000x3000 pixels
- **Metadata**: Required ID3 tags

### Spotify
- **File size**: Maximum 200MB
- **Duration**: No specific limit
- **Format**: MP3, AAC, WAV, FLAC
- **Cover art**: 300x300 to 3000x3000 pixels
- **Metadata**: Recommended ID3 tags

### YouTube
- **File size**: Maximum 256GB
- **Duration**: Maximum 12 hours
- **Format**: MP3, AAC, WAV, FLAC
- **Video**: Separate video file required
- **Metadata**: YouTube-specific requirements

### General RSS Feeds
- **File size**: Varies by hosting provider
- **Duration**: No specific limit
- **Format**: MP3, AAC, WAV, FLAC
- **Cover art**: Varies by platform
- **Metadata**: RSS feed requirements

## Troubleshooting Export Issues

### Common Problems
- **Export fails**: Check file size and format
- **Poor quality**: Verify bit rate and sample rate
- **Large file size**: Reduce bit rate or use compression
- **Metadata missing**: Check tagging settings
- **Compatibility issues**: Test on different platforms

### Solutions
- **Reduce quality**: Lower bit rate or sample rate
- **Change format**: Use different audio format
- **Check settings**: Verify export parameters
- **Update software**: Use latest version
- **Test export**: Try different settings

### Prevention
- **Regular testing**: Export test files
- **Documentation**: Record successful settings
- **Backup**: Keep multiple versions
- **Validation**: Check files after export
- **Quality control**: Listen to exported files

## Best Practices

### Quality First
- **Start high**: Record at highest quality
- **Maintain quality**: Minimize quality loss during processing
- **Export appropriately**: Match quality to distribution needs
- **Test thoroughly**: Verify quality on target platforms

### Consistency
- **Standardize settings**: Use same settings for all episodes
- **Create templates**: Save successful export configurations
- **Document process**: Record export workflow
- **Regular review**: Update settings as needed

### Efficiency
- **Batch processing**: Export multiple files
- **Automation**: Use scripts for repetitive tasks
- **Optimization**: Balance quality and file size
- **Time management**: Plan export time

### Future-Proofing
- **Archive originals**: Keep high-quality masters
- **Multiple formats**: Export in different formats
- **Metadata**: Include comprehensive information
- **Documentation**: Record all settings and decisions

## Conclusion
Exporting and finalizing audio is crucial for podcast distribution. Focus on quality, consistency, and compatibility across platforms. Remember that good export settings ensure your podcast sounds professional and reaches your audience effectively. Always test your exports and maintain high-quality masters for future use.
    `
  }
};
