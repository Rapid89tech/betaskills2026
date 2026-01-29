import { QuizContent } from '../../../types/course';

export const quiz8: QuizContent = {
  id: '8-quiz',
  title: 'Testing and Diagnostic Tools Quiz',
  questions: [
    {
      question: "What does the first character in an OBD2 diagnostic code indicate?",
      options: [
        "The severity of the problem",
        "The system affected (P=Powertrain, B=Body, C=Chassis, U=Network)",
        "The repair cost estimate",
        "The date the code was set"
      ],
      correct: 1
    },
    {
      question: "What is the normal short-term fuel trim (STFT) range for a healthy engine?",
      options: [
        "-25% to +25%",
        "-10% to +10%",
        "-5% to +5%",
        "0% only"
      ],
      correct: 1
    },
    {
      question: "What does a P0171 diagnostic code typically indicate?",
      options: [
        "Rich fuel mixture",
        "System too lean (Bank 1)",
        "Catalytic converter efficiency below threshold",
        "Random misfire detected"
      ],
      correct: 1
    },
    {
      question: "When testing a throttle position sensor (TPS), what voltage range should you expect?",
      options: [
        "0V to 12V",
        "0.1V to 0.9V",
        "0.5V to 4.5V",
        "5V to 12V"
      ],
      correct: 2
    },
    {
      question: "What multimeter function would you use to test fuel injector resistance?",
      options: [
        "DC voltage",
        "AC voltage",
        "Amperage",
        "Ohms (resistance)"
      ],
      correct: 3
    },
    {
      question: "What is the typical resistance range for most fuel injectors?",
      options: [
        "1-5 ohms",
        "12-16 ohms",
        "50-100 ohms",
        "500-1000 ohms"
      ],
      correct: 1
    },
    {
      question: "During compression testing, what pressure range is typically expected for healthy petrol engines?",
      options: [
        "50-100 kPa",
        "100-150 kPa",
        "170-210 kPa",
        "250-300 kPa"
      ],
      correct: 2
    },
    {
      question: "In a leak-down test, what percentage of pressure loss is generally considered acceptable?",
      options: [
        "Below 10%",
        "Below 20%",
        "Below 30%",
        "Below 40%"
      ],
      correct: 1
    },
    {
      question: "What does hissing from the throttle body during a leak-down test indicate?",
      options: [
        "Exhaust valve leak",
        "Intake valve leak",
        "Worn piston rings",
        "Head gasket failure"
      ],
      correct: 1
    },
    {
      question: "What is the normal vacuum reading for a healthy engine at idle (adjusted for sea level)?",
      options: [
        "30-45 kPa",
        "45-60 kPa",
        "60-75 kPa",
        "75-90 kPa"
      ],
      correct: 2
    },
    {
      question: "What does rapid vacuum gauge fluctuation (5-10 kPa) at idle typically indicate?",
      options: [
        "Normal engine operation",
        "Worn piston rings",
        "Burned or sticking valves",
        "Clogged air filter"
      ],
      correct: 2
    },
    {
      question: "What fuel pressure range is typical for most petrol fuel injection systems?",
      options: [
        "100-200 kPa",
        "200-300 kPa",
        "250-400 kPa",
        "400-500 kPa"
      ],
      correct: 2
    },
    {
      question: "What does a rapid pressure drop after fuel system shutdown indicate?",
      options: [
        "Normal system operation",
        "Weak fuel pump",
        "Clogged fuel filter",
        "Leaking injectors or failed check valve"
      ],
      correct: 3
    },
    {
      question: "What tool would be most effective for locating small vacuum leaks?",
      options: [
        "Compression tester",
        "Multimeter",
        "Smoke machine",
        "Timing light"
      ],
      correct: 2
    },
    {
      question: "What is the primary advantage of bi-directional OBD2 scanner controls?",
      options: [
        "Reading more diagnostic codes",
        "Clearing codes faster",
        "Commanding components to test their operation without removal",
        "Downloading software updates"
      ],
      correct: 2
    }
  ]
};