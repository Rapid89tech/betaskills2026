import { Lesson } from '@/types/course';

export const lesson1TypesOfMicrophones: Lesson = {
  id: 'lesson1-types-of-microphones',
  title: '🎙️ Types of Microphones',
  description: 'Understanding different microphone types, their characteristics, and applications',
  duration: '50 minutes',
  type: 'lesson',
  content: `
# 🎙️ Types of Microphones

---

## 1. <span style="color:#5a67d8;font-weight:700">Introduction to Microphones</span>

A microphone (mic) is a transducer that converts sound (acoustic energy) into electrical signals. It captures audio from voices, instruments, or environments for recording, amplification, or broadcasting.

---

## 2. <span style="color:#5a67d8;font-weight:700">Microphone Classifications</span>

<div style="display:flex;justify-content:center;margin:2rem 0;">
  <iframe width="900" height="506" src="https://www.youtube.com/embed/example" frameborder="0" allowfullscreen style="border-radius:18px;box-shadow:0 8px 32px rgba(90,103,216,0.18);"></iframe>
</div>

Microphones are commonly classified by:
- <b>Transducer Type</b>: How they convert sound
- <b>Polar Pattern</b>: Directionality of sound pickup
- <b>Application/Design</b>: Usage or physical design

---

## 3. <span style="color:#5a67d8;font-weight:700">By Transducer Type</span>

### A. Dynamic Microphones

<div style="display:flex;justify-content:center;margin:2rem 0;">
  <iframe width="900" height="506" src="https://www.youtube.com/embed/Ofq6FrI6dd4" frameborder="0" allowfullscreen style="border-radius:18px;box-shadow:0 8px 32px rgba(90,103,216,0.18);"></iframe>
</div>

Use a moving coil and magnetic field to generate signal.

**Features:**
- No external power needed
- Handles high SPL (sound pressure levels)
- Less sensitive to quiet, subtle sounds

**Examples:** Shure SM58 (vocals), Shure SM57 (instruments)

**Use Cases:** Live performances, drums, guitar amps, vocals (live)

---

### B. Condenser Microphones

<div style="display:flex;justify-content:center;margin:2rem 0;">
  <iframe width="900" height="506" src="https://www.youtube.com/embed/omOTBD19P4I" frameborder="0" allowfullscreen style="border-radius:18px;box-shadow:0 8px 32px rgba(90,103,216,0.18);"></iframe>
</div>

Use a capacitor (electrostatic) element to detect sound. Require phantom power (+48V) or battery.

**Features:**
- High sensitivity and wide frequency response
- Better for capturing detail and nuance
- More fragile than dynamic mics

**Examples:** Audio-Technica AT2020, Neumann U87

**Use Cases:** Studio vocals, acoustic instruments, podcasting, broadcasting

---

### C. Ribbon Microphones

<div style="display:flex;justify-content:center;margin:2rem 0;">
  <iframe width="900" height="506" src="https://www.youtube.com/embed/sE8cp7usjXo" frameborder="0" allowfullscreen style="border-radius:18px;box-shadow:0 8px 32px rgba(90,103,216,0.18);"></iframe>
</div>

Use a thin metal ribbon suspended in a magnetic field.

**Features:**
- Natural, vintage sound with smooth high frequencies
- Very delicate and sensitive to handling and wind

**Examples:** Royer R-121, AEA R84

**Use Cases:** Studio recording, vocals, brass, strings, guitar cabinets

---

## 4. <span style="color:#5a67d8;font-weight:700">By Polar Pattern (Directionality)</span>

### A. Omnidirectional

<div style="display:flex;justify-content:center;margin:2rem 0;">
  <iframe width="900" height="506" src="https://www.youtube.com/embed/AdOx7t-J2ek" frameborder="0" allowfullscreen style="border-radius:18px;box-shadow:0 8px 32px rgba(90,103,216,0.18);"></iframe>
</div>

Picks up sound equally from all directions.

**Use Cases:** Room mics, lavaliers for interviews, classical music recording

---

### B. Cardioid

<div style="display:flex;justify-content:center;margin:2rem 0;">
  <iframe width="900" height="506" src="https://www.youtube.com/embed/keBa2ocQInI" frameborder="0" allowfullscreen style="border-radius:18px;box-shadow:0 8px 32px rgba(90,103,216,0.18);"></iframe>
</div>

Picks up mostly from the front, rejects sound from the back. Most common pattern.

**Use Cases:** Studio vocals, live sound, voice-over

---

### C. Supercardioid / Hypercardioid

<div style="display:flex;justify-content:center;margin:2rem 0;">
  <iframe width="900" height="506" src="https://www.youtube.com/embed/nTFeedjmJxQ" frameborder="0" allowfullscreen style="border-radius:18px;box-shadow:0 8px 32px rgba(90,103,216,0.18);"></iframe>
</div>

Tighter front pickup than cardioid, slightly more rear sensitivity. Better side rejection.

**Use Cases:** Noisy environments, stage miking

---

### D. Bidirectional (Figure-8)

<div style="display:flex;justify-content:center;margin:2rem 0;">
  <iframe width="900" height="506" src="https://www.youtube.com/embed/example" frameborder="0" allowfullscreen style="border-radius:18px;box-shadow:0 8px 32px rgba(90,103,216,0.18);"></iframe>
</div>

Picks up sound from front and back, rejects sides.

**Use Cases:** Duets, interviews (face-to-face), Blumlein stereo technique

---

## 5. <span style="color:#5a67d8;font-weight:700">Specialty Microphones</span>

### A. Lavalier Microphones

<div style="display:flex;justify-content:center;margin:2rem 0;">
  <iframe width="900" height="506" src="https://www.youtube.com/embed/mUlB0lLXZNM" frameborder="0" allowfullscreen style="border-radius:18px;box-shadow:0 8px 32px rgba(90,103,216,0.18);"></iframe>
</div>

Small, clip-on mics for voice capture, usually omnidirectional.

**Used in:** Film, broadcasting, theater

---

### B. Shotgun Microphones

<div style="display:flex;justify-content:center;margin:2rem 0;">
  <iframe width="900" height="506" src="https://www.youtube.com/embed/h3LSEnI3ko0" frameborder="0" allowfullscreen style="border-radius:18px;box-shadow:0 8px 32px rgba(90,103,216,0.18);"></iframe>
</div>

Highly directional with narrow pickup angle, uses interference tube to reject off-axis sound.

**Use Cases:** Film and TV production, field recording

---

### C. USB Microphones

<div style="display:flex;justify-content:center;margin:2rem 0;">
  <iframe width="900" height="506" src="https://www.youtube.com/embed/sDjr1G0uqRc" frameborder="0" allowfullscreen style="border-radius:18px;box-shadow:0 8px 32px rgba(90,103,216,0.18);"></iframe>
</div>

Built-in analog-to-digital converter and USB output, plug-and-play with computers.

**Use Cases:** Podcasting, home studios, streaming

---

### D. Boundary Microphones (PZM)

<div style="display:flex;justify-content:center;margin:2rem 0;">
  <iframe width="900" height="506" src="https://www.youtube.com/embed/PLM70P1xrEA" frameborder="0" allowfullscreen style="border-radius:18px;box-shadow:0 8px 32px rgba(90,103,216,0.18);"></iframe>
</div>

Placed on flat surfaces; pick up ambient sound.

**Use Cases:** Conferences, stage floors

---

## 6. <span style="color:#5a67d8;font-weight:700">Microphone Selection Considerations</span>

<table>
  <tr>
    <th>Factor</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><b>Source Type</b></td>
    <td>Voice, drums, strings, ambient, etc.</td>
  </tr>
  <tr>
    <td><b>Environment</b></td>
    <td>Studio, live stage, noisy field, etc.</td>
  </tr>
  <tr>
    <td><b>Budget</b></td>
    <td>Cost and durability</td>
  </tr>
  <tr>
    <td><b>Sound Quality</b></td>
    <td>Detail, warmth, frequency response</td>
  </tr>
  <tr>
    <td><b>Pickup Pattern</b></td>
    <td>Directionality and isolation needs</td>
  </tr>
</table>

---

## 7. <span style="color:#5a67d8;font-weight:700">Summary Table</span>

<table>
  <tr>
    <th>Type</th>
    <th>Power Needed</th>
    <th>Sensitivity</th>
    <th>Durability</th>
    <th>Common Use</th>
  </tr>
  <tr>
    <td>Dynamic</td>
    <td>No</td>
    <td>Low</td>
    <td>High</td>
    <td>Live vocals, drums</td>
  </tr>
  <tr>
    <td>Condenser</td>
    <td>Yes (+48V)</td>
    <td>High</td>
    <td>Moderate</td>
    <td>Studio vocals, acoustic</td>
  </tr>
  <tr>
    <td>Ribbon</td>
    <td>No (some yes)</td>
    <td>Medium-High</td>
    <td>Low</td>
    <td>Studio instruments</td>
  </tr>
  <tr>
    <td>Lavalier</td>
    <td>Yes (battery or phantom)</td>
    <td>Medium</td>
    <td>Moderate</td>
    <td>Interviews, film</td>
  </tr>
  <tr>
    <td>Shotgun</td>
    <td>Yes</td>
    <td>High</td>
    <td>High</td>
    <td>Film, field recording</td>
  </tr>
</table>

---

## 8. <span style="color:#5a67d8;font-weight:700">Conclusion</span>

<div style="display:flex;justify-content:center;margin:2rem 0;">
  <iframe width="900" height="506" src="https://www.youtube.com/embed/example" frameborder="0" allowfullscreen style="border-radius:18px;box-shadow:0 8px 32px rgba(90,103,216,0.18);"></iframe>
</div>

Understanding microphone types helps in choosing the right mic for optimal sound quality, appropriate application, and maximum performance in different recording environments.

**Tip:** Always match mic type and pattern to the sound source and setting.

---

## 🚀 <span style="color:#764ba2;font-weight:700">Key Takeaways</span>

1. <b>Microphones are transducers</b> that convert acoustic energy to electrical signals  
2. <b>Dynamic mics</b> are rugged and don't need power, ideal for live use  
3. <b>Condenser mics</b> are sensitive and detailed, perfect for studio recording  
4. <b>Ribbon mics</b> provide vintage character but are delicate  
5. <b>Polar patterns</b> determine directionality and isolation capabilities  
6. <b>Specialty mics</b> serve specific applications (lavalier, shotgun, USB, boundary)  
7. <b>Selection depends on</b> source type, environment, budget, and quality needs  
8. <b>Understanding mic characteristics</b> helps optimize recording quality  
9. <b>Proper mic selection</b> is crucial for professional audio production  
10. <b>Different applications</b> require different microphone types and patterns  

---
`
};

export default lesson1TypesOfMicrophones;
