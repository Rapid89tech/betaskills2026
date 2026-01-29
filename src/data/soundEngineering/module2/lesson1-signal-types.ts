import { VideoLesson } from '@/types/course';

export const lesson1SignalTypes: VideoLesson = {
  id: 4,
  title: 'Signal Types – Analog vs Digital',
  duration: '60 min',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/qfm0qVHK_Ps',
    textContent: `
<h1>📡 Lecture Notes: Signal Types – Analog vs Digital</h1>

<h2>1. Introduction to Signals</h2>
<div style="margin-bottom:1rem;">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/qfm0qVHK_Ps" title="Introduction to Signals" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
<p>
A signal is a function that conveys information about a phenomenon. Signals can be electrical, acoustic, optical, or mechanical, used to transmit data or sound. In audio and communications, signals represent sound waves or data streams.
</p>

<h2>2. What is an Analog Signal?</h2>
<div style="margin-bottom:1rem;">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/PhHc6sSIF8c" title="What is an Analog Signal?" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
<strong>Definition:</strong> An analog signal is a continuous signal that varies smoothly over time and can take any value within a range.<br>
<strong>Characteristics:</strong>
<ul>
  <li>Continuous in both time and amplitude.</li>
  <li>Represents information as fluctuations in voltage, current, or another physical quantity.</li>
  <li>Closely mimics the original sound wave or physical phenomenon.</li>
</ul>
<strong>Examples:</strong>
<ul>
  <li>Human voice captured by a microphone produces analog electrical signals.</li>
  <li>Vinyl records, cassette tapes store analog audio.</li>
  <li>Analog radios and televisions use analog signals.</li>
</ul>
<strong>Waveform:</strong> Smooth, continuous waveform that changes fluidly.

<h2>3. What is a Digital Signal?</h2>
<div style="margin-bottom:1rem;">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/TaoQfzIvdPo" title="What is a Digital Signal?" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
<strong>Definition:</strong> A digital signal represents information using discrete (binary) values, typically 0s and 1s.<br>
<strong>Characteristics:</strong>
<ul>
  <li>Discrete in both time and amplitude.</li>
  <li>Converts continuous analog signals into a series of samples at specific intervals (sampling).</li>
  <li>Each sample is quantized into a finite number of amplitude levels.</li>
  <li>Enables error detection and correction during transmission.</li>
</ul>
<strong>Examples:</strong>
<ul>
  <li>CDs, MP3s, and streaming audio files store sound digitally.</li>
  <li>Digital phones, computers, and modern broadcasting use digital signals.</li>
</ul>
<strong>Waveform:</strong> Step-like or square waveform with defined high and low levels.

<h2>4. Key Differences Between Analog and Digital Signals</h2>
<table border="1" cellpadding="6" style="border-collapse: collapse; margin-bottom: 1rem;">
  <thead>
    <tr style="background: #f3f4f6;">
      <th>Aspect</th>
      <th>Analog Signal</th>
      <th>Digital Signal</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Nature</td>
      <td>Continuous waveform</td>
      <td>Discrete binary values</td>
    </tr>
    <tr>
      <td>Values</td>
      <td>Infinite possible values</td>
      <td>Limited finite values (usually 0 & 1)</td>
    </tr>
    <tr>
      <td>Noise Sensitivity</td>
      <td>More susceptible to noise and distortion</td>
      <td>Less affected by noise, more robust</td>
    </tr>
    <tr>
      <td>Signal Processing</td>
      <td>Complex, requires analog circuitry</td>
      <td>Easier with computers and DSP</td>
    </tr>
    <tr>
      <td>Storage</td>
      <td>Requires physical medium (tape, vinyl)</td>
      <td>Stored in digital media (hard drives, SSDs)</td>
    </tr>
    <tr>
      <td>Transmission</td>
      <td>Prone to degradation over distance</td>
      <td>Can be regenerated to maintain quality</td>
    </tr>
    <tr>
      <td>Bandwidth Usage</td>
      <td>Requires less bandwidth</td>
      <td>Requires higher bandwidth</td>
    </tr>
  </tbody>
</table>

<h2>5. Analog to Digital Conversion (ADC)</h2>
<div style="margin-bottom:1rem;">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/-R4SNrdLSEI" title="Analog to Digital Conversion" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
<strong>Process:</strong>
<ul>
  <li>Analog signals are converted to digital via sampling and quantization.</li>
  <li><strong>Sampling Rate:</strong> How many samples are taken per second (measured in Hertz, e.g., 44.1 kHz for CDs).</li>
  <li><strong>Bit Depth:</strong> Number of bits used to represent each sample (e.g., 16-bit, 24-bit). Higher bit depth = better dynamic range.</li>
  <li><strong>Nyquist Theorem:</strong> To accurately represent a signal digitally, the sampling rate must be at least twice the highest frequency component in the signal.</li>
</ul>

<h2>6. Digital to Analog Conversion (DAC)</h2>
<div style="margin-bottom:1rem;">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/RWsNZIrdNHg" title="Digital to Analog Conversion" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
<p>Converts digital samples back into a continuous analog waveform for playback or processing. DAC quality affects audio fidelity.</p>

<h2>7. Advantages and Disadvantages</h2>
<table border="1" cellpadding="6" style="border-collapse: collapse; margin-bottom: 1rem;">
  <thead>
    <tr style="background: #f3f4f6;">
      <th></th>
      <th>Analog Signal</th>
      <th>Digital Signal</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Advantages</td>
      <td>
        <ul>
          <li>Natural, smooth sound</li>
          <li>Simple to generate</li>
          <li>Low latency</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Noise resistant</li>
          <li>Easily stored & copied</li>
          <li>Easy to process & manipulate</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Disadvantages</td>
      <td>
        <ul>
          <li>Susceptible to noise & degradation</li>
          <li>Difficult to store long-term</li>
          <li>Less flexible processing</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Requires ADC & DAC hardware</li>
          <li>Quantization introduces small errors</li>
          <li>More bandwidth needed</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

<h2>8. Applications</h2>
<strong>Analog Signals:</strong>
<ul>
  <li>Microphones, vinyl records, analog radio, traditional telephony.</li>
</ul>

<strong>Digital Signals:</strong>
<ul>
  <li>Digital audio workstations (DAWs), streaming platforms, smartphones, digital broadcasting.</li>
</ul>

<h2>9. Summary</h2>

<p>
Analog signals are continuous and closely mimic real-world phenomena but are prone to noise. Digital signals use discrete values, enabling robust transmission, storage, and processing. Most modern audio and communication systems use digital signals due to their flexibility and quality preservation. Understanding both is essential for audio engineering, telecommunications, and signal processing careers.
</p>
<p>The audio industry is competitive, with freelancers facing income variability, but the creative satisfaction of crafting unique soundscapes is unparalleled. The course's online format supports learners in overcoming challenges through community support and practical training. Virtual group projects and forums.</p>
`
  }
};