import { Lesson } from '@/types/course';

export const lesson2SignalFlowDiagrams: Lesson = {
  id: 2,
  title: 'Signal Flow Diagrams',
  duration: '40 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/zDouGdDtGoI',
    videoUrl2: '',
    textContent: `# 📡 Module 2: Audio Technology and Signal Flow

## 📊 Signal Flow Diagrams

<div style="display:flex;justify-content:center;margin:2rem 0;">
  <iframe width="900" height="506" src="https://www.youtube.com/embed/zDouGdDtGoI" frameborder="0" allowfullscreen style="border-radius:18px;box-shadow:0 8px 32px rgba(90,103,216,0.18);"></iframe>
</div>

<div style="background:linear-gradient(90deg,#e0e7ff 0%,#f0e6ff 100%);padding:1rem 2rem;border-radius:12px;margin-bottom:1.5rem;border-left:5px solid #667eea;">
  <b>🔑 Key Features:</b> <span style="color:#5a67d8">Visual Signal Routing</span>
</div>

<div style="font-size:1.1rem;line-height:1.8;color:#2d3748;">
  A Signal Flow Diagram (SFD) is a graphical representation that shows the path an audio or electrical signal takes from the input source through various processing stages to the output destination. It helps visualize and understand how signals move through an audio system or electronic circuit.

  Signal flow diagrams are essential for troubleshooting audio and electrical problems, providing clear understanding of signal routing and processing, enabling efficient setup and reconfiguration of equipment, and assisting in teaching and documentation of complex systems.
</div>

---

## 🎚️ Basic Components in Signal Flow Diagrams

<div style="background:linear-gradient(90deg,#e0e7ff 0%,#f0e6ff 100%);padding:1rem 2rem;border-radius:12px;margin-bottom:1.5rem;border-left:5px solid #667eea;">
  <b>🔑 Key Features:</b> <span style="color:#5a67d8">Source, Processor, Mixer, Output</span>
</div>

<div style="font-size:1.1rem;line-height:1.8;color:#2d3748;">
  <strong>Source:</strong> The origin of the signal (microphone, instrument, line input)<br>
  <strong>Processor:</strong> Any device or module that alters the signal (preamps, compressors, EQs)<br>
  <strong>Mixer:</strong> Combines multiple signals and routes them to outputs<br>
  <strong>Output:</strong> Final destination of the signal (speakers, recorders, headphones)<br>
  <strong>Paths/Lines:</strong> Represent signal cables or signal routes<br>
  <strong>Nodes:</strong> Points where signals split or join
</div>

---

## 📐 Reading and Creating Signal Flow Diagrams

<div style="background:linear-gradient(90deg,#e0e7ff 0%,#f0e6ff 100%);padding:1rem 2rem;border-radius:12px;margin-bottom:1.5rem;border-left:5px solid #667eea;">
  <b>🔑 Key Features:</b> <span style="color:#5a67d8">Step-by-Step Process</span>
</div>

<div style="font-size:1.1rem;line-height:1.8;color:#2d3748;">
  1. <strong>Identify all input sources and outputs</strong><br>
  2. <strong>Map out all devices and processing units</strong> signal passes through<br>
  3. <strong>Draw lines showing signal routes and directions</strong><br>
  4. <strong>Include signal types and levels</strong> (mic, line, insert points)<br>
  5. <strong>Use standardized symbols and clear labels</strong><br>
  6. <strong>Verify flow matches actual system operation</strong>
</div>

---

<div style="text-align:center;margin:3rem 0 1rem 0;">
  <span style="font-size:2rem;font-weight:700;color:#764ba2;">🚀 Ready for the Next Level?</span>
  <p style="font-size:1.1rem;color:#4a5568;">You've mastered signal flow diagrams! Continue your journey to become a professional audio engineer.</p>
</div>
`
  }
}; 
