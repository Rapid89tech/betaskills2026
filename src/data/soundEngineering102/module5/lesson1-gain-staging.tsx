import { Lesson } from '@/types/course';

export const lesson1GainStaging: Lesson = {
  id: 1,
  title: 'Gain Staging',
  duration: '45 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/HH9Kcv7yEkc',
    videoUrl2: '',
    textContent: `# 🎚️ Module 5: Mixing Principles

## 🎧 Gain Staging

<div style="display:flex;justify-content:center;margin:2rem 0;">
  <iframe width="900" height="506" src="https://www.youtube.com/embed/HH9Kcv7yEkc" frameborder="0" allowfullscreen style="border-radius:18px;box-shadow:0 8px 32px rgba(90,103,216,0.18);"></iframe>
</div>

<div style="background:linear-gradient(90deg,#e0e7ff 0%,#f0e6ff 100%);padding:1rem 2rem;border-radius:12px;margin-bottom:1.5rem;border-left:5px solid #667eea;">
  <b>🔑 Key Features:</b> <span style="color:#5a67d8">Signal Level Management</span>
</div>

<div style="font-size:1.1rem;line-height:1.8;color:#2d3748;">
  Gain staging is the process of managing the level (volume) of audio signals throughout the signal chain to avoid distortion, noise, or loss of clarity. The goal is to maintain optimal signal levels from recording to mixing to mastering—not too quiet (adds noise), not too loud (causes clipping).
</div>

---

## 📈 Signal Flow and Gain Stages

<div style="background:linear-gradient(90deg,#e0e7ff 0%,#f0e6ff 100%);padding:1rem 2rem;border-radius:12px;margin-bottom:1.5rem;border-left:5px solid #667eea;">
  <b>🔑 Key Features:</b> <span style="color:#5a67d8">Multiple Processing Stages</span>
</div>

<div style="font-size:1.1rem;line-height:1.8;color:#2d3748;">
  A signal chain has multiple stages where gain can be adjusted:<br>
  <strong>Source:</strong> Microphone, instrument, sample<br>
  <strong>Preamp:</strong> Audio interface or mixer gain knobs<br>
  <strong>Input Level:</strong> DAW track input meters<br>
  <strong>Insert Effects:</strong> EQ, compression, etc.<br>
  <strong>Fader:</strong> Channel volume fader<br>
  <strong>Master Bus:</strong> Final output meter
</div>

---

## 📊 Ideal Level Guidelines

<div style="background:linear-gradient(90deg,#e0e7ff 0%,#f0e6ff 100%);padding:1rem 2rem;border-radius:12px;margin-bottom:1.5rem;border-left:5px solid #667eea;">
  <b>🔑 Key Features:</b> <span style="color:#5a67d8">Optimal Signal Levels</span>
</div>

<div style="font-size:1.1rem;line-height:1.8;color:#2d3748;">
  <strong>Recording:</strong> -18 dBFS to -12 dBFS (digital meters)<br>
  <strong>DAW Track Input:</strong> ~-12 dBFS<br>
  <strong>After EQ/FX:</strong> Keep under -6 dBFS<br>
  <strong>Master Output:</strong> Target -6 dBFS before mastering<br>
  <strong>Note:</strong> In analog systems, engineers aim for 0 VU, while in digital systems, the ceiling is 0 dBFS (Full Scale).
</div>

---

## ⚠️ Common Gain Staging Mistakes

<div style="background:linear-gradient(90deg,#e0e7ff 0%,#f0e6ff 100%);padding:1rem 2rem;border-radius:12px;margin-bottom:1.5rem;border-left:5px solid #667eea;">
  <b>🔑 Key Features:</b> <span style="color:#5a67d8">Avoiding Common Errors</span>
</div>

<div style="font-size:1.1rem;line-height:1.8;color:#2d3748;">
  <strong>Setting input gain too high:</strong> Clipping and distortion<br>
  <strong>Mixing tracks too low:</strong> Excess noise when boosted<br>
  <strong>Overusing effects to fix gain:</strong> Introduces artifacts<br>
  <strong>Ignoring plugin input/output gain:</strong> Inconsistent signal chain<br>
  <strong>Pushing master fader to 0 dB:</strong> No headroom, distortion risk
</div>

---

<div style="text-align:center;margin:3rem 0 1rem 0;">
  <span style="font-size:2rem;font-weight:700;color:#764ba2;">🚀 Ready for the Next Level?</span>
  <p style="font-size:1.1rem;color:#4a5568;">You've mastered gain staging! Continue your journey to become a professional audio engineer.</p>
</div>
`
  }
}; 
