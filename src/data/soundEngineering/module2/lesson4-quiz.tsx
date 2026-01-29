import { Lesson } from '@/types/course';

export const lesson4Quiz: Lesson = {
  id: 'lesson4-quiz',
  title: '✅ Quiz: Module 2 – Audio Technology and Signal Flow',
  description: 'Test your understanding of analog vs digital signals, signal flow, and audio equipment',
  duration: '30 minutes',
  type: 'quiz',
  content: `# ✅ Quiz: Module 2 – Audio Technology and Signal Flow

## Instructions
This quiz covers analog vs digital signals, signal flow diagrams, and audio equipment. Read each question carefully and select the best answer. You have 30 minutes to complete this quiz.

---

## Question 1
**Which of the following best describes an analog signal?**

A. A signal that uses only 1s and 0s  
B. A continuous signal that can take on any value within a range  
C. A signal that is immune to noise  
D. A series of fixed step-like values  

**Answer**: B

**Explanation**: An analog signal is continuous and can take any value within a range, unlike digital signals which use discrete values.

---

## Question 2
**What is the main benefit of digital signals over analog signals?**

A. They require less bandwidth  
B. They are more natural sounding  
C. They are more resistant to noise and degradation  
D. They cannot be copied easily  

**Answer**: C

**Explanation**: Digital signals are more resistant to noise and degradation because they use discrete values that can be regenerated and error-corrected.

---

## Question 3
**According to the Nyquist Theorem, to accurately digitize a sound, the sampling rate must be:**

A. Equal to the lowest frequency in the signal  
B. Lower than the signal's highest frequency  
C. Twice the highest frequency in the signal  
D. Unrelated to the signal's frequency  

**Answer**: C

**Explanation**: The Nyquist Theorem states that the sampling rate must be at least twice the highest frequency component in the signal to accurately represent it digitally.

---

## Question 4
**What is the primary function of an audio interface?**

A. To amplify microphone signals  
B. To convert between analog and digital signals  
C. To mix multiple audio sources  
D. To add effects to audio signals  

**Answer**: B

**Explanation**: An audio interface's primary function is to convert analog signals to digital (ADC) and digital signals back to analog (DAC).

---

## Question 5
**Which component in a signal flow diagram represents the origin of the audio signal?**

A. Processor  
B. Source  
C. Output  
D. Mixer  

**Answer**: B

**Explanation**: The source represents the origin of the audio signal, such as a microphone, instrument, or line input.

---

## Question 6
**What is the main purpose of a preamplifier?**

A. To convert digital signals to analog  
B. To boost low-level signals to line level  
C. To mix multiple audio sources  
D. To add reverb effects  

**Answer**: B

**Explanation**: A preamplifier boosts very low-level signals (like from microphones) to line level for further processing.

---

## Question 7
**Which type of mixer uses physical knobs and faders?**

A. Digital mixer  
B. Analog mixer  
C. Hybrid mixer  
D. Virtual mixer  

**Answer**: B

**Explanation**: Analog mixers use physical knobs, faders, and switches for control, unlike digital mixers which use digital processing.

---

## Question 8
**What does ADC stand for in audio technology?**

A. Audio Digital Converter  
B. Analog to Digital Converter  
C. Audio Data Compression  
D. Analog Dynamic Control  

**Answer**: B

**Explanation**: ADC stands for Analog to Digital Converter, which converts analog signals into digital data.

---

## Question 9
**In signal flow diagrams, what do arrows typically represent?**

A. Power connections  
B. Signal direction  
C. Equipment placement  
D. Cable types  

**Answer**: B

**Explanation**: Arrows in signal flow diagrams indicate the direction of signal flow from input to output.

---

## Question 10
**Which of the following is NOT a common connection protocol for audio interfaces?**

A. USB  
B. Thunderbolt  
C. HDMI  
D. FireWire  

**Answer**: C

**Explanation**: HDMI is primarily used for video and audio transmission to displays, not for audio interfaces. USB, Thunderbolt, and FireWire are common audio interface connection protocols.

---

## Question 11
**What is the purpose of phantom power in audio interfaces?**

A. To power the interface itself  
B. To provide power to condenser microphones  
C. To boost signal levels  
D. To convert analog to digital  

**Answer**: B

**Explanation**: Phantom power (+48V) is provided by audio interfaces to power condenser microphones, which require external power to operate.

---

## Question 12
**Which component in a mixer allows you to create separate mixes for monitors or effects?**

A. Faders  
B. EQ  
C. Aux Sends  
D. Master Section  

**Answer**: C

**Explanation**: Aux Sends (auxiliary sends) allow you to create separate mixes for monitors, effects, or other outputs.

---

## Question 13
**What is the main advantage of digital mixers over analog mixers?**

A. They are cheaper  
B. They offer presets and recallable settings  
C. They have better sound quality  
D. They are easier to use  

**Answer**: B

**Explanation**: Digital mixers offer presets, recallable settings, and digital processing capabilities that analog mixers cannot provide.

---

## Question 14
**In signal flow troubleshooting, what should you check first?**

A. Power connections  
B. Signal presence at key nodes  
C. Equipment placement  
D. Cable colors  

**Answer**: B

**Explanation**: When troubleshooting signal flow, you should first check for signal presence at key nodes using meters or monitors to isolate the problem.

---

## Question 15
**What is the typical signal flow order in a recording setup?**

A. Microphone → Mixer → Preamp → Audio Interface  
B. Microphone → Preamp → Mixer → Audio Interface  
C. Audio Interface → Preamp → Microphone → Mixer  
D. Mixer → Audio Interface → Preamp → Microphone  

**Answer**: B

**Explanation**: The typical signal flow is: Microphone → Preamp (boosts signal) → Mixer (combines and processes) → Audio Interface (converts to digital).

---

## Scoring Guide

- **15-13 correct**: Excellent! You have a strong understanding of audio technology and signal flow.
- **12-10 correct**: Good work! You understand most concepts but may need to review some areas.
- **9-7 correct**: Fair understanding. Consider reviewing the module content before proceeding.
- **6 or fewer correct**: Please review the module content thoroughly before taking the quiz again.

## Review Areas

If you struggled with certain questions, focus on reviewing:

- **Questions 1-5**: Analog vs digital signals and basic concepts
- **Questions 6-10**: Audio equipment and their functions
- **Questions 11-15**: Signal flow and practical applications

Remember, understanding these fundamentals is crucial for success in audio engineering and sound design careers!  `
};

export default lesson4Quiz; 
