
import type { Lesson } from '@/types/course';

export const lesson4Quiz: Lesson = {
  id: 9,
  title: 'Module 2 Quiz: Audio Technology and Signal Flow',
  duration: '15 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'Which of the following best describes an analog signal?',
        options: [
          'A signal that uses only 1s and 0s',
          'A continuous signal that can take on any value within a range',
          'A signal that is immune to noise',
          'A series of fixed step-like values'
        ],
        correct: 1,
        explanation: 'An analog signal is continuous and can take on any value within a range, closely mimicking real-world phenomena.'
      },
      {
        question: 'What is the main benefit of digital signals over analog signals?',
        options: [
          'They require less bandwidth',
          'They are more natural sounding',
          'They are more resistant to noise and degradation',
          'They cannot be copied easily'
        ],
        correct: 2,
        explanation: 'Digital signals are more resistant to noise and degradation, making them ideal for transmission and storage.'
      },
      {
        question: 'According to the Nyquist Theorem, to accurately digitize a sound, the sampling rate must be:',
        options: [
          'Equal to the lowest frequency in the signal',
          'Lower than the signal\'s highest frequency',
          'Twice the highest frequency in the signal',
          'Unrelated to the signal\'s frequency'
        ],
        correct: 2,
        explanation: 'The Nyquist Theorem states that the sampling rate must be at least twice the highest frequency component in the signal to avoid aliasing.'
      },
      {
        question: 'What is the function of a Digital-to-Analog Converter (DAC)?',
        options: [
          'It boosts low-level signals to line level',
          'It combines multiple audio signals',
          'It converts analog signals to digital form',
          'It converts digital audio into a continuous analog signal'
        ],
        correct: 3,
        explanation: 'A DAC converts digital audio data back into continuous analog signals for playback through speakers or headphones.'
      },
      {
        question: 'In a Signal Flow Diagram, what do arrows typically indicate?',
        options: [
          'Level of audio signal',
          'Direction of signal flow',
          'Volume settings',
          'Device type'
        ],
        correct: 1,
        explanation: 'Arrows in signal flow diagrams indicate the direction that the signal travels through the system.'
      },
      {
        question: 'What device is typically used to amplify a microphone\'s weak signal to line level?',
        options: [
          'DAC',
          'Mixer',
          'Preamp',
          'Speaker'
        ],
        correct: 2,
        explanation: 'A preamplifier (preamp) boosts the weak signal from a microphone to line level for further processing.'
      },
      {
        question: 'Which of the following is a characteristic of an analog waveform?',
        options: [
          'Step-like or square in shape',
          'Discrete binary steps',
          'Smooth and continuous',
          'Flatline unless amplified'
        ],
        correct: 2,
        explanation: 'Analog waveforms are smooth and continuous, changing fluidly over time.'
      },
      {
        question: 'What is the primary role of a mixer in an audio setup?',
        options: [
          'To convert analog signals into digital',
          'To amplify microphone signals',
          'To combine and process multiple audio inputs',
          'To store audio signals for playback'
        ],
        correct: 2,
        explanation: 'A mixer\'s primary role is to combine multiple audio inputs and provide control over volume, tone, and effects for each channel.'
      },
      {
        question: 'Which of the following devices typically includes both ADC and DAC functionality?',
        options: [
          'Preamplifier',
          'Analog mixer',
          'Audio interface',
          'Speaker'
        ],
        correct: 2,
        explanation: 'Audio interfaces include both ADC (for recording) and DAC (for playback) functionality to connect analog audio equipment to digital systems.'
      },
      {
        question: 'What does a signal flow diagram help with in audio engineering?',
        options: [
          'Adding digital effects to a track',
          'Recording audio directly to vinyl',
          'Understanding how audio signals travel through a system',
          'Measuring decibel levels of a waveform'
        ],
        correct: 2,
        explanation: 'Signal flow diagrams help visualize and understand how audio signals travel through a system, making troubleshooting and system design easier.'
      }
    ]
  }
};
