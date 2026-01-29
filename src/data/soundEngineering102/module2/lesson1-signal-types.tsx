import { Lesson } from '@/types/course';

interface VideoSection {
  id: string;
  title: string;
  videoUrl: string;
  keyFeatures: string;
  description: string;
}

interface LessonConfig {
  id: number;
  title: string;
  duration: string;
  type: 'video' | 'audio' | 'text' | 'interactive';
  sections: VideoSection[];
}

// Helper: Convert YouTube URL to embed
const getEmbedUrl = (url: string) => {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
};

const lessonConfig: LessonConfig = {
  id: 1,
  title: 'Signal Types – Analog vs Digital',
  duration: '45 minutes',
  type: 'video',
  sections: [
    {
      id: 'introduction',
      title: 'Introduction to Signals',
      videoUrl: 'https://youtu.be/qfm0qVHK_Ps',
      keyFeatures: 'Signal Fundamentals',
      description: `A signal is a function that conveys information about a phenomenon. Signals can be electrical, acoustic, optical, or mechanical, used to transmit data or sound. In audio and communications, signals represent sound waves or data streams.

Understanding signals is fundamental to audio engineering. Whether working with analog equipment or digital systems, engineers must comprehend how signals carry information and how they can be processed, transmitted, and stored. The course provides comprehensive coverage of both analog and digital signal types, preparing learners for modern audio production environments.`
    },
    {
      id: 'analog-signal',
      title: 'What is an Analog Signal?',
      videoUrl: 'https://youtu.be/PhHc6sSIF8c',
      keyFeatures: 'Continuous Waveform',
      description: `An analog signal is a continuous signal that varies smoothly over time and can take any value within a range. It is continuous in both time and amplitude, representing information as fluctuations in voltage, current, or another physical quantity, and closely mimics the original sound wave or physical phenomenon.

Examples include human voice captured by a microphone producing analog electrical signals, vinyl records and cassette tapes storing analog audio, and analog radios and televisions using analog signals. The waveform is smooth and continuous, changing fluidly over time. Understanding analog signals is crucial for working with vintage equipment, understanding signal flow, and appreciating the characteristics that make analog audio unique.`
    },
    {
      id: 'digital-signal',
      title: 'What is a Digital Signal?',
      videoUrl: 'https://youtu.be/TaoQfzIvdPo',
      keyFeatures: 'Discrete Binary Values',
      description: `A digital signal represents information using discrete (binary) values, typically 0s and 1s. It is discrete in both time and amplitude, converts continuous analog signals into a series of samples at specific intervals (sampling), and each sample is quantized into a finite number of amplitude levels.

Digital signals enable error detection and correction during transmission. Examples include CDs, MP3s, and streaming audio files storing sound digitally, and digital phones, computers, and modern broadcasting using digital signals. The waveform is step-like or square with defined high and low levels. Digital signals form the foundation of modern audio production, offering advantages in storage, processing, and transmission.`
    },
    {
      id: 'key-differences',
      title: 'Key Differences Between Analog and Digital Signals',
      videoUrl: '',
      keyFeatures: 'Comparison Table',
      description: `Analog signals are continuous waveforms with infinite possible values, more susceptible to noise and distortion, require complex analog circuitry for processing, and are stored on physical media like tape or vinyl. They are prone to degradation over distance and require less bandwidth.

Digital signals use discrete binary values with limited finite values, are less affected by noise and more robust, easier to process with computers and DSP, and are stored in digital media like hard drives and SSDs. They can be regenerated to maintain quality, require higher bandwidth, and offer superior error correction capabilities.`
    },
    {
      id: 'adc',
      title: 'Analog to Digital Conversion (ADC)',
      videoUrl: 'https://youtu.be/-R4SNrdLSEI',
      keyFeatures: 'Sampling and Quantization',
      description: `Analog signals are converted to digital via sampling and quantization. The sampling rate determines how many samples are taken per second (measured in Hertz, e.g., 44.1 kHz for CDs). Bit depth is the number of bits used to represent each sample (e.g., 16-bit, 24-bit), with higher bit depth providing better dynamic range.

The Nyquist Theorem states that to accurately represent a signal digitally, the sampling rate must be at least twice the highest frequency component in the signal. This fundamental principle ensures that digital audio can faithfully reproduce analog signals without aliasing or distortion. Understanding ADC is essential for setting up recording systems and ensuring optimal audio quality.`
    },
    {
      id: 'dac',
      title: 'Digital to Analog Conversion (DAC)',
      videoUrl: 'https://youtu.be/RWsNZIrdNHg',
      keyFeatures: 'Playback Conversion',
      description: `DAC converts digital samples back into a continuous analog waveform for playback or processing. The quality of the DAC significantly affects audio fidelity, making it a critical component in any digital audio system.

DACs are found in audio interfaces, CD players, smartphones, and any device that plays digital audio. The conversion process involves reconstructing the original analog waveform from discrete digital samples, requiring precise timing and high-quality components. Understanding DAC operation helps engineers choose appropriate equipment and troubleshoot playback issues.`
    },
    {
      id: 'advantages-disadvantages',
      title: 'Advantages and Disadvantages',
      videoUrl: '',
      keyFeatures: 'Pros and Cons Analysis',
      description: `Analog signals offer natural, smooth sound, are simple to generate, and have low latency. However, they are susceptible to noise and degradation, difficult to store long-term, and less flexible for processing.

Digital signals are noise resistant, easily stored and copied, and easy to process and manipulate. However, they require ADC and DAC hardware, quantization introduces small errors, and they need more bandwidth. Understanding these trade-offs helps engineers choose the right approach for specific applications and optimize system performance.`
    },
    {
      id: 'applications',
      title: 'Applications',
      videoUrl: '',
      keyFeatures: 'Real-World Uses',
      description: `Analog signals are used in microphones, vinyl records, analog radio, and traditional telephony. These applications benefit from analog's natural characteristics and historical significance.

Digital signals are used in digital audio workstations (DAWs), streaming platforms, smartphones, and digital broadcasting. These applications leverage digital's reliability, flexibility, and processing capabilities. Modern audio production typically combines both types, using analog for capture and processing, then converting to digital for storage and distribution.`
    },
    {
      id: 'summary',
      title: 'Summary',
      videoUrl: '',
      keyFeatures: 'Key Takeaways',
      description: `Analog signals are continuous and closely mimic real-world phenomena but are prone to noise. Digital signals use discrete values, enabling robust transmission, storage, and processing. Most modern audio and communication systems use digital signals due to their flexibility and quality preservation.

Understanding both signal types is essential for audio engineering, telecommunications, and signal processing careers. The course provides hands-on experience with both analog and digital systems, ensuring learners can work effectively in diverse audio production environments. This knowledge forms the foundation for advanced topics in audio technology and signal processing.`
    }
  ]
};

const generateLesson = (config: LessonConfig): Lesson => {
  let textContent = `# 📡 Module 2: Audio Technology and Signal Flow

## 📊 Signal Types – Analog vs Digital

`;

  config.sections.forEach((section, idx) => {
    textContent += `---

## ${idx + 1}. <span style="color:#5a67d8;font-weight:700">${section.title}</span>

${section.videoUrl ? `
<div style="display:flex;justify-content:center;margin:2rem 0;">
  <iframe width="900" height="506" src="${getEmbedUrl(section.videoUrl)}" frameborder="0" allowfullscreen style="border-radius:18px;box-shadow:0 8px 32px rgba(90,103,216,0.18);"></iframe>
</div>
` : ''}

<div style="background:linear-gradient(90deg,#e0e7ff 0%,#f0e6ff 100%);padding:1rem 2rem;border-radius:12px;margin-bottom:1.5rem;border-left:5px solid #667eea;">
  <b>🔑 Key Features:</b> <span style="color:#5a67d8">${section.keyFeatures}</span>
</div>

<div style="font-size:1.1rem;line-height:1.8;color:#2d3748;">
  ${section.description}
</div>

`;
  });

  textContent += `
---

<div style="text-align:center;margin:3rem 0 1rem 0;">
  <span style="font-size:2rem;font-weight:700;color:#764ba2;">🚀 Ready for the Next Level?</span>
  <p style="font-size:1.1rem;color:#4a5568;">You've mastered signal types! Continue your journey to become a professional audio engineer.</p>
</div>
`;

  return {
    id: config.id,
    title: config.title,
    duration: config.duration,
    type: config.type,
    content: {
      videoUrl: config.sections[0]?.videoUrl || '',
      videoUrl2: 'https://www.youtube.com/watch?v=wh5wdmjPur8',
      textContent
    }
  };
};

export const lesson1SignalTypes: Lesson = generateLesson(lessonConfig);
export { generateLesson, type LessonConfig, type VideoSection };
export default lesson1SignalTypes; 
