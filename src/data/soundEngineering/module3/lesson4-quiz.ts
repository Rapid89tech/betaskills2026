
import type { QuizLesson } from '@/types/course';

export const lesson4Quiz: QuizLesson = {
  id: 13,
  title: 'Microphones and Applications Quiz',
  duration: '15 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: "What is the primary function of a microphone?",
        options: [
          "To amplify sound directly",
          "To convert sound into light",
          "To convert sound into electrical signals",
          "To store sound digitally"
        ],
        correct: 2,
        explanation: "A microphone is a transducer that converts sound (acoustic energy) into electrical signals for recording, amplification, or broadcasting."
      },
      {
        question: "Which of the following is TRUE about dynamic microphones?",
        options: [
          "They require phantom power to operate",
          "They are very sensitive and fragile",
          "They use a ribbon suspended in a magnetic field",
          "They are rugged and handle high sound pressure levels well"
        ],
        correct: 3,
        explanation: "Dynamic microphones use a moving coil and magnetic field to generate signal. They are rugged, durable, and can handle high SPL without requiring external power."
      },
      {
        question: "Which microphone type uses a capacitor to detect sound?",
        options: [
          "Dynamic",
          "Condenser",
          "Ribbon",
          "Lavalier"
        ],
        correct: 1,
        explanation: "Condenser microphones use a capacitor (electrostatic) element to detect sound and require phantom power (+48V) or battery to operate."
      },
      {
        question: "What is one major drawback of ribbon microphones?",
        options: [
          "They cannot capture low frequencies",
          "They require USB connectivity",
          "They are very delicate and sensitive to wind",
          "They are not used in professional studios"
        ],
        correct: 2,
        explanation: "Ribbon microphones use a thin metal ribbon suspended in a magnetic field, making them very delicate and sensitive to handling and wind."
      },
      {
        question: "What type of pickup pattern captures sound equally from all directions?",
        options: [
          "Cardioid",
          "Supercardioid",
          "Omnidirectional",
          "Bidirectional"
        ],
        correct: 2,
        explanation: "Omnidirectional pickup patterns capture sound equally well from all directions (360°) with no rejection areas."
      },
      {
        question: "What pickup pattern is shaped like a heart and rejects sound from the rear?",
        options: [
          "Hypercardioid",
          "Omnidirectional",
          "Bidirectional",
          "Cardioid"
        ],
        correct: 3,
        explanation: "Cardioid pickup patterns are named for their heart-shaped pattern and primarily pick up sound from the front while rejecting sound from the rear."
      },
      {
        question: "Which microphone is BEST suited for film and television production in noisy or distant environments?",
        options: [
          "USB microphone",
          "Lavalier microphone",
          "Shotgun microphone",
          "Boundary microphone"
        ],
        correct: 2,
        explanation: "Shotgun microphones are extremely directional with a narrow pickup angle and use an interference tube to cancel off-axis sounds, making them ideal for film and TV production."
      },
      {
        question: "Which microphone is typically clipped to clothing for hands-free voice capture?",
        options: [
          "Shotgun",
          "Lavalier",
          "Ribbon",
          "Boundary"
        ],
        correct: 1,
        explanation: "Lavalier microphones are small, clip-on mics designed for voice capture and are commonly used in film, broadcasting, and theater."
      },
      {
        question: "What type of microphone has a figure-8 pickup pattern, capturing sound from the front and back but rejecting the sides?",
        options: [
          "Cardioid",
          "Supercardioid",
          "Bidirectional",
          "Omnidirectional"
        ],
        correct: 2,
        explanation: "Bidirectional microphones have a figure-8 pickup pattern that captures sound from the front and back while rejecting sound from the sides."
      },
      {
        question: "Which factor is NOT commonly considered when selecting a microphone?",
        options: [
          "Source type",
          "Budget",
          "Color of the microphone",
          "Pickup pattern"
        ],
        correct: 2,
        explanation: "When selecting a microphone, important factors include source type, budget, pickup pattern, environment, and sound quality requirements. The color of the microphone is not a technical consideration."
      }
    ]
  }
};
