
import type { QuizLesson } from '@/types/course';

export const lesson4Quiz: QuizLesson = {
  id: 19,
  title: 'Gain Staging Quiz',
  duration: '30 min',
  type: 'quiz',
  content: `# 🎧 Module 5 Quiz: Mixing, Processing, and Imaging

## Instructions
This quiz covers gain staging, EQ, compression, reverb, and stereo imaging. Read each question carefully and select the best answer.

---

## Question 1
**What is the primary goal of gain staging in audio production?**

A. To make everything as loud as possible  
B. To create automatic volume fades  
C. To manage signal levels to avoid distortion and noise  
D. To automate EQ changes  

**Answer**: C

**Explanation**: Gain staging is about managing signal levels throughout the chain to maintain optimal levels without distortion or noise.

---

## Question 2
**Which of the following is NOT a typical stage in the gain staging signal flow?**

A. Preamp  
B. Insert Effects  
C. MIDI Channel Strip  
D. Master Bus  

**Answer**: C

**Explanation**: MIDI channels don't carry audio signals, so they're not part of the audio gain staging flow.

---

## Question 3
**What does "headroom" refer to in the context of gain staging?**

A. The physical space above your mixing console  
B. Space between your peak level and 0 dBFS to avoid clipping  
C. The frequency range above 10kHz  
D. The amount of reverb in a mix  

**Answer**: B

**Explanation**: Headroom is the available space between your signal peaks and the maximum level (0 dBFS) before clipping occurs.

---

## Question 4
**If you record too quietly and boost the level later, what issue are you most likely to introduce?**

A. Clipping  
B. Phase Cancellation  
C. Noise  
D. Widening  

**Answer**: C

**Explanation**: Recording too quietly means you'll need to boost the signal later, which also amplifies the noise floor.

---

## Question 5
**Which tool would you use to measure perceived loudness instead of just peak level?**

A. Peak Meter  
B. VU Meter  
C. LUFS Meter  
D. Clipping Analyzer  

**Answer**: C

**Explanation**: LUFS (Loudness Units relative to Full Scale) meters measure perceived loudness, which is more relevant for streaming and broadcast standards.

---

## Question 6
**True or False: Gain affects the signal before processing, while volume affects the signal after processing.**

A. True  
B. False  

**Answer**: A

**Explanation**: Correct! Gain is the input level that feeds into processors, while volume (fader) controls the output level after processing.

---

## Question 7
**What is the ideal recording level range for digital audio?**

A. 0 dBFS to -6 dBFS  
B. -18 dBFS to -12 dBFS  
C. -6 dBFS to 0 dBFS  
D. -24 dBFS to -18 dBFS  

**Answer**: B

**Explanation**: Recording between -18 dBFS and -12 dBFS provides good signal-to-noise ratio while leaving adequate headroom.

---

## Question 8
**Which of the following is a best practice for gain staging?**

A. Apply a compressor first, then adjust clip gain  
B. Boost everything with the fader  
C. Normalize clips, adjust plugin levels, and check meters  
D. Skip metering and mix by ear only  

**Answer**: C

**Explanation**: Proper gain staging involves normalizing clips, managing plugin input/output levels, and using meters to monitor the signal chain.`
};
