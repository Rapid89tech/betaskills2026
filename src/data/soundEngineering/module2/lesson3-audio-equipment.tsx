import { Lesson } from '@/types/course';

export const lesson3AudioEquipment: Lesson = {
  id: 'lesson3-audio-equipment',
  title: '🎚️ Audio Interface, Mixers, Preamps',
  description: 'Understanding audio interfaces, mixers, and preamplifiers and their roles in audio systems',
  duration: '55 minutes',
  type: 'lesson',
  content: `
# 🎚️ Audio Interface, Mixers, Preamps

---

## 1. <span style="color:#5a67d8;font-weight:700">Audio Interface</span>

<div style="display:flex;justify-content:center;margin:2rem 0;">
  <iframe width="900" height="506" src="https://www.youtube.com/embed/5wabpxVRFfM" frameborder="0" allowfullscreen style="border-radius:18px;box-shadow:0 8px 32px rgba(90,103,216,0.18);"></iframe>
</div>

A hardware device that connects microphones, instruments, and other audio sources to a computer. Converts analog signals to digital for recording and digital signals back to analog for playback.

**Main Functions:**
- <b>ADC</b>: Converts analog input signals into digital audio data
- <b>DAC</b>: Converts digital audio data back into analog signals for monitoring
- Provides inputs (mic, instrument, line) and outputs (monitors, headphones)
- Often includes built-in preamps for mic/instrument signal amplification
- Supplies phantom power (+48V) for condenser microphones
- Supports USB, Thunderbolt, FireWire, PCIe

<div style="display:flex;justify-content:center;margin:2rem 0;">
  <iframe width="900" height="506" src="https://www.youtube.com/embed/example" frameborder="0" allowfullscreen style="border-radius:18px;box-shadow:0 8px 32px rgba(90,103,216,0.18);"></iframe>
</div>

**Why Use an Audio Interface?**
- Better audio quality than a computer's built-in sound card
- Lower latency (delay) for real-time monitoring
- Allows multi-channel recording

---

## 2. <span style="color:#5a67d8;font-weight:700">Mixers</span>

<div style="display:flex;justify-content:center;margin:2rem 0;">
  <iframe width="900" height="506" src="https://www.youtube.com/embed/EZr6M6jE3Iw?pp=ygUPVFlQRVMgT0YgTUlYRVJT" frameborder="0" allowfullscreen style="border-radius:18px;box-shadow:0 8px 32px rgba(90,103,216,0.18);"></iframe>
</div>

A device that takes multiple audio inputs and combines them into one or more outputs. Allows control of volume, tone, and effects on each input channel.

**Types of Mixers:**
- <b>Analog Mixer</b>: Uses physical knobs, faders, and switches.
- <b>Digital Mixer</b>: Uses digital processing, offers presets, effects, and recallable settings.
- <b>Hybrid Mixer</b>: Combines analog controls with digital processing.

<div style="display:flex;justify-content:center;margin:2rem 0;">
  <iframe width="900" height="506" src="https://www.youtube.com/embed/example" frameborder="0" allowfullscreen style="border-radius:18px;box-shadow:0 8px 32px rgba(90,103,216,0.18);"></iframe>
</div>

**Key Components:**
- <b>Channels</b>: Input strips for microphones or instruments
- <b>Faders</b>: Adjust channel volume
- <b>EQ (Equalizer)</b>: Modify frequency response of each channel
- <b>Aux Sends</b>: Create separate mixes for monitors or effects
- <b>Buses</b>: Group several channels for collective control
- <b>Master Section</b>: Controls the final output level

**Use Cases:**
- Live sound reinforcement
- Studio recording
- Broadcast and podcast production

---

## 3. <span style="color:#5a67d8;font-weight:700">Preamps (Preamplifiers)</span>

<div style="display:flex;justify-content:center;margin:2rem 0;">
  <iframe width="900" height="506" src="https://www.youtube.com/embed/7UGEvcXlRlw" frameborder="0" allowfullscreen style="border-radius:18px;box-shadow:0 8px 32px rgba(90,103,216,0.18);"></iframe>
</div>

A device that boosts very low-level signals (like from microphones or guitars) to line level. Essential for providing clean, noise-free amplification before processing or recording.

**Characteristics:**
- Provides gain (signal boost)
- Should have a low noise floor and high headroom
- Influences the tone and character of the sound
- Available as standalone units or built into mixers and audio interfaces
- Common types: Solid-state (clean, transparent) and Tube (warm, colored)

---

## 4. <span style="color:#5a67d8;font-weight:700">How They Work Together</span>

<div style="display:flex;justify-content:center;margin:2rem 0;">
  <iframe width="900" height="506" src="https://www.youtube.com/embed/EP9zVernOwg" frameborder="0" allowfullscreen style="border-radius:18px;box-shadow:0 8px 32px rgba(90,103,216,0.18);"></iframe>
</div>

<table>
  <tr>
    <th>Device</th>
    <th>Function</th>
    <th>Role in Signal Chain</th>
  </tr>
  <tr>
    <td><b>Preamp</b></td>
    <td>Amplifies mic/instrument signal to line level</td>
    <td>First stage after microphone or instrument</td>
  </tr>
  <tr>
    <td><b>Mixer</b></td>
    <td>Combines and processes multiple signals</td>
    <td>Mixes all input sources, applies EQ and effects</td>
  </tr>
  <tr>
    <td><b>Audio Interface</b></td>
    <td>Converts analog signals to/from digital</td>
    <td>Connects audio hardware to computer for recording/playback</td>
  </tr>
</table>

In many modern setups, audio interfaces have built-in preamps and mixing functions. External mixers or preamps are used when more control or higher quality is needed.

---

## 5. <span style="color:#5a67d8;font-weight:700">Summary</span>

<div style="display:flex;justify-content:center;margin:2rem 0;">
  <iframe width="900" height="506" src="https://www.youtube.com/embed/example" frameborder="0" allowfullscreen style="border-radius:18px;box-shadow:0 8px 32px rgba(90,103,216,0.18);"></iframe>
</div>

- <b>Audio Interface</b>: Converts signals between analog and digital, connects to a computer
- <b>Mixer</b>: Combines, controls, and processes multiple audio signals
- <b>Preamplifier</b>: Boosts low-level signals to line level cleanly

---

## 🚀 <span style="color:#764ba2;font-weight:700">Key Takeaways</span>

1. <b>Audio interfaces</b> bridge analog and digital audio worlds  
2. <b>Mixers</b> combine and control multiple audio sources  
3. <b>Preamps</b> provide clean amplification for low-level signals  
4. <b>Different mixer types</b> serve different applications (analog, digital, hybrid)  
5. <b>Integration</b> between these devices creates complete audio systems  
6. <b>Quality of each component</b> affects overall audio quality  
7. <b>Modern interfaces</b> often include built-in preamps and mixing functions  
8. <b>Understanding signal flow</b> helps optimize equipment setup  
9. <b>Equipment selection</b> depends on specific needs and budget  
10. <b>Proper setup and calibration</b> ensures optimal performance  

---
`
};

export default lesson3AudioEquipment;
