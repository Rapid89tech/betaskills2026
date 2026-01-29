import { Lesson } from '@/types/course';

export const lesson3AudioInterfaceMixersPreamps: Lesson = {
  id: 3,
  title: 'Audio Interface, Mixers, Preamps',
  duration: '50 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/5wabpxVRFfM',
    videoUrl2: '',
    textContent: `# 📡 Module 2: Audio Technology and Signal Flow

## 🎚️ Audio Interface, Mixers, Preamps

<div style="display:flex;justify-content:center;margin:2rem 0;">
  <iframe width="900" height="506" src="https://www.youtube.com/embed/5wabpxVRFfM" frameborder="0" allowfullscreen style="border-radius:18px;box-shadow:0 8px 32px rgba(90,103,216,0.18);"></iframe>
</div>

<div style="background:linear-gradient(90deg,#e0e7ff 0%,#f0e6ff 100%);padding:1rem 2rem;border-radius:12px;margin-bottom:1.5rem;border-left:5px solid #667eea;">
  <b>🔑 Key Features:</b> <span style="color:#5a67d8">Core Audio Equipment</span>
</div>

<div style="font-size:1.1rem;line-height:1.8;color:#2d3748;">
  Understanding audio interfaces, mixers, and preamps is fundamental to professional audio production. These three components form the backbone of any recording or live sound system, each serving specific functions in the signal chain.
</div>

---

## 🎛️ Audio Interface

<div style="background:linear-gradient(90deg,#e0e7ff 0%,#f0e6ff 100%);padding:1rem 2rem;border-radius:12px;margin-bottom:1.5rem;border-left:5px solid #667eea;">
  <b>🔑 Key Features:</b> <span style="color:#5a67d8">ADC/DAC Conversion</span>
</div>

<div style="font-size:1.1rem;line-height:1.8;color:#2d3748;">
  An audio interface is a hardware device that connects microphones, instruments, and other audio sources to a computer. It converts analog signals to digital for recording and digital signals back to analog for playback.

  <strong>Main Functions:</strong><br>
  • <strong>Analog-to-Digital Conversion (ADC):</strong> Converts analog input signals into digital audio data<br>
  • <strong>Digital-to-Analog Conversion (DAC):</strong> Converts digital audio data back into analog signals for monitoring<br>
  • Provides inputs (mic, instrument, line) and outputs (monitors, headphones)<br>
  • Often includes built-in preamps for mic/instrument signal amplification<br>
  • Supplies phantom power (+48V) for condenser microphones<br>
  • Supports various connection protocols: USB, Thunderbolt, FireWire, PCIe
</div>

---

## 🎚️ Mixers

<div style="background:linear-gradient(90deg,#e0e7ff 0%,#f0e6ff 100%);padding:1rem 2rem;border-radius:12px;margin-bottom:1.5rem;border-left:5px solid #667eea;">
  <b>🔑 Key Features:</b> <span style="color:#5a67d8">Signal Combination and Control</span>
</div>

<div style="font-size:1.1rem;line-height:1.8;color:#2d3748;">
  A mixer is a device that takes multiple audio inputs and combines them into one or more outputs. It allows control of volume, tone, and effects on each input channel.

  <strong>Types of Mixers:</strong><br>
  • <strong>Analog Mixer:</strong> Uses physical knobs, faders, and switches<br>
  • <strong>Digital Mixer:</strong> Uses digital processing, offers presets, effects, and recallable settings<br>
  • <strong>Hybrid Mixer:</strong> Combines analog controls with digital processing

  <strong>Key Components:</strong><br>
  • <strong>Channels:</strong> Input strips for microphones or instruments<br>
  • <strong>Faders:</strong> Adjust channel volume<br>
  • <strong>EQ (Equalizer):</strong> Modify frequency response of each channel<br>
  • <strong>Aux Sends:</strong> Create separate mixes for monitors or effects<br>
  • <strong>Buses:</strong> Group several channels for collective control<br>
  • <strong>Master Section:</strong> Controls the final output level
</div>

---

## 🎛️ Preamps (Preamplifiers)

<div style="background:linear-gradient(90deg,#e0e7ff 0%,#f0e6ff 100%);padding:1rem 2rem;border-radius:12px;margin-bottom:1.5rem;border-left:5px solid #667eea;">
  <b>🔑 Key Features:</b> <span style="color:#5a67d8">Signal Amplification</span>
</div>

<div style="font-size:1.1rem;line-height:1.8;color:#2d3748;">
  A preamp is a device that boosts very low-level signals (like from microphones or guitars) to line level. It's essential for providing clean, noise-free amplification before processing or recording.

  <strong>Characteristics:</strong><br>
  • Provides gain (signal boost)<br>
  • Should have a low noise floor and high headroom<br>
  • Influences the tone and character of the sound<br>
  • Available as standalone units or built into mixers and audio interfaces<br>
  • Common types: Solid-state (clean, transparent) and Tube (warm, colored)
</div>

---

## 🔗 How They Work Together

<div style="background:linear-gradient(90deg,#e0e7ff 0%,#f0e6ff 100%);padding:1rem 2rem;border-radius:12px;margin-bottom:1.5rem;border-left:5px solid #667eea;">
  <b>🔑 Key Features:</b> <span style="color:#5a67d8">Signal Chain Integration</span>
</div>

<div style="font-size:1.1rem;line-height:1.8;color:#2d3748;">
  <strong>Preamp:</strong> Amplifies mic/instrument signal to line level (First stage after microphone or instrument)<br>
  <strong>Mixer:</strong> Combines and processes multiple signals (Mixes all input sources, applies EQ and effects)<br>
  <strong>Audio Interface:</strong> Converts analog signals to/from digital (Connects audio hardware to computer for recording/playback)

  In many modern setups, audio interfaces have built-in preamps and mixing functions. External mixers or preamps are used when more control or higher quality is needed.
</div>

---

<div style="text-align:center;margin:3rem 0 1rem 0;">
  <span style="font-size:2rem;font-weight:700;color:#764ba2;">🚀 Ready for the Next Level?</span>
  <p style="font-size:1.1rem;color:#4a5568;">You've mastered audio equipment fundamentals! Continue your journey to become a professional audio engineer.</p>
</div>
`
  }
}; 
