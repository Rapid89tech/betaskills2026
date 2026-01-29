import { Module } from '@/types/course';

const broadcastingModule3: Module = {
  id: 3,
  title: 'Recording & Production Workflow',
  description: 'Master the technical aspects of podcast recording, including equipment selection, recording best practices, and production workflow optimization.',
  lessons: [
    {
      id: 6,
      title: 'Choosing Recording Tools and Software',
      duration: '60 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/whL_nS46lRQ',
        textContent: `
# Choosing Recording Tools and Software

**YOUTUBE LINK:** https://youtu.be/whL_nS46lRQ

High-quality audio is non-negotiable in podcasting. Poor sound can make even the best content unlistenable. Choosing the right tools and software sets the foundation for professional sound quality, efficient workflow, and an enjoyable experience for both host and listener.

## Essential Recording Tools:

### Microphones:
- **Dynamic Mic**: Durable, isolates voice well - ideal for live, untreated rooms
- **Condenser Mic**: Crisp, sensitive to detail - perfect for studio setups
- **USB Mic**: Plug-and-play, easy - great for beginners
- **XLR Mic**: Pro-grade, needs interface - for high-quality setups

### Popular Models:
- USB: Blue Yeti, Samson Q2U, Audio-Technica ATR2100x
- XLR: Shure SM7B, Rode PodMic, Electro-Voice RE20

### Audio Interfaces:
Essential for XLR microphones to convert analog to digital signals.

### Recording Software (DAWs):
- **Audacity**: Free, beginner-friendly, cross-platform
- **GarageBand**: Simple, music-friendly, Mac-exclusive
- **Adobe Audition**: Professional tools, advanced effects
- **Reaper**: Low-cost, highly customizable
- **Hindenburg Journalist**: Built for spoken-word audio

## Remote Recording Tools:
- **Riverside.fm**: Local HD recording, video + audio, stable
- **Zencastr**: Records separate tracks, free tier available
- **SquadCast**: Studio-quality audio, good for pros
- **Zoom**: Easy to use, widely popular (lower audio quality)

## Best Practices:
- Start simple - don't over-invest early
- Prioritize audio quality - your voice is the product
- Test before you commit - try free versions or demos
- Match tools to your workflow - avoid complicated tools if you want simplicity
- Plan for scalability - support future growth
        `
      }
    },
    {
      id: 7,
      title: 'Recording Best Practices',
      duration: '45 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/dWF9EfWpDr8',
        textContent: `
# Recording Best Practices

**YOUTUBE LINK:** https://youtu.be/dWF9EfWpDr8

To ensure professional, clear, and high-quality audio recordings for your podcast by following best practices before, during, and after recording.

## Pre-Recording Preparation:

### Prepare Your Content:
- Create an outline or script for your episode
- Practice your tone, pacing, and transitions
- Prepare thoughtful questions for interviews
- Share questions with guests in advance

### Test Your Gear:
- Verify microphone connection and software recognition
- Conduct a soundcheck to review volume levels
- Record a short test clip and listen back
- Ensure stable internet for remote recordings

### Choose the Right Environment:
- Select a quiet, sound-treated room
- Use carpets, curtains, or acoustic foam panels
- Avoid rooms with hard surfaces or background noise
- Test the space with a short recording

### Adjust Recording Settings:
- Record in WAV or 320kbps MP3 format
- Set mic input levels between -6dB and -12dB
- Choose mono for voice-only podcasts
- Use 44.1 kHz/16-bit settings for standard podcast audio

## During Recording:

### Maintain Consistent Distance (6–12 inches):
- Position yourself about a fist's length away from the mic
- Practice speaking at this distance during rehearsals
- Use a mic stand or boom arm to keep positioning steady

### Use a Pop Filter or Foam Windscreen:
- Place 2–4 inches from the mic to disperse air bursts
- Reduces plosives from letters like "p" and "b"
- Affordable ($10-$30) and compatible with most mics

### Monitor with Headphones:
- Use closed-back headphones to catch issues in real-time
- Monitor audio levels and detect background noise
- Ensure real-time feedback for immediate adjustments

### Record a Backup:
- Use a second device or app as a safety net
- Implement local recordings for remote interviews
- Test the secondary device before recording

## Post-Recording Practices:

### Review Immediately:
- Check for dropouts, noise, or mistakes
- Listen through closed-back headphones
- Re-record critical parts if needed

### Organize Your Files:
- Label recordings with consistent format
- Backup files to cloud storage or external drive
- Use clear naming conventions

### Normalize Audio Levels:
- Ensure consistent volume across voices
- Target -16 LUFS for podcasts
- Apply compression to tame peaks

### Clean Up Audio:
- Remove long pauses, filler words, or noises
- Apply EQ to boost vocal frequencies
- Use noise reduction to eliminate background hiss
        `
      }
    }
  ]
};

export default broadcastingModule3; 