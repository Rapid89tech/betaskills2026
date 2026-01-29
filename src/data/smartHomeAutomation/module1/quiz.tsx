import type { Quiz } from '@/types/course';

export const quiz: Quiz = {
  id: 5,
  title: 'Quiz: Introduction to Smart Home Automation',
  description: 'This quiz tests your understanding of smart home technology, key components, benefits, and market trends.',
  questions: [
    {
      id: 1,
      question: 'What is a smart home?',
      options: [
        'A home that uses solar energy only',
        'A home that includes automated and connected devices',
        'A home with advanced furniture',
        'A home that doesn\'t use electricity'
      ],
      correctAnswer: 1,
      explanation: 'A smart home is a residential environment where devices are interconnected through the Internet of Things (IoT) and can be controlled remotely or automated.'
    },
    {
      id: 2,
      question: 'Which of the following is a function of sensors in a smart home?',
      options: [
        'Changing colors of lights',
        'Playing music',
        'Gathering data like motion or temperature',
        'Connecting to social media'
      ],
      correctAnswer: 2,
      explanation: 'Sensors collect environmental data to inform automation and user decisions, serving as the "eyes and ears" of a smart home system.'
    },
    {
      id: 3,
      question: 'What do actuators do in a smart home?',
      options: [
        'Store energy',
        'Display information',
        'Perform physical actions like turning on lights',
        'Translate languages'
      ],
      correctAnswer: 2,
      explanation: 'Actuators execute physical actions based on sensor data or user commands, serving as the "hands" of the smart home system.'
    },
    {
      id: 4,
      question: 'Which component acts as the control center in a smart home?',
      options: [
        'Router',
        'Hub',
        'Smartphone',
        'Microphone'
      ],
      correctAnswer: 1,
      explanation: 'Hubs or gateways act as the central control unit, facilitating communication between devices and enabling automation.'
    },
    {
      id: 5,
      question: 'Which of these is NOT a benefit of smart home automation?',
      options: [
        'Convenience',
        'Energy efficiency',
        'Invasion of privacy',
        'Security'
      ],
      correctAnswer: 2,
      explanation: 'Invasion of privacy is actually a challenge, not a benefit. Smart home automation provides convenience, security, energy efficiency, and accessibility.'
    },
    {
      id: 6,
      question: 'Which of the following is a common communication protocol in smart homes?',
      options: [
        'USB',
        'Wi-Fi',
        'HDMI',
        'VGA'
      ],
      correctAnswer: 1,
      explanation: 'Wi-Fi is a high-bandwidth protocol suitable for devices like cameras and provides internet connectivity for smart home devices.'
    },
    {
      id: 7,
      question: 'What is the purpose of the Matter protocol?',
      options: [
        'Increase power consumption',
        'Provide smart lighting',
        'Ensure devices from different brands work together',
        'Block Internet access'
      ],
      correctAnswer: 2,
      explanation: 'Matter is a new standard launched in 2022 that unifies ecosystems, allowing devices from different brands to work seamlessly together.'
    },
    {
      id: 8,
      question: 'How can smart thermostats help reduce energy consumption?',
      options: [
        'By playing music to reduce heat',
        'By turning off lights automatically',
        'By adjusting temperatures based on usage and schedules',
        'By blocking air vents'
      ],
      correctAnswer: 2,
      explanation: 'Smart thermostats like Nest or Ecobee optimize heating/cooling based on occupancy and weather data, reducing energy waste.'
    },
    {
      id: 9,
      question: 'Why is cybersecurity important in smart home systems?',
      options: [
        'To improve air quality',
        'To help decorate the home',
        'To protect data and prevent unauthorized access',
        'To control the television volume'
      ],
      correctAnswer: 2,
      explanation: 'IoT devices are vulnerable to hacking, and cybersecurity measures protect data and prevent unauthorized access to smart home systems.'
    },
    {
      id: 10,
      question: 'Which of the following is an example of an open-source smart home platform?',
      options: [
        'SmartThings',
        'Google Home',
        'Home Assistant',
        'Amazon Alexa'
      ],
      correctAnswer: 2,
      explanation: 'Home Assistant is an open-source platform that prioritizes local processing, reducing reliance on cloud systems and enhancing privacy.'
    }
  ]
};
