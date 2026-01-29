import type { Quiz } from '@/types/course';

export const quiz: Quiz = {
  id: 4,
  title: 'Quiz: Smart Home Architecture & Protocols',
  description: 'This quiz tests your understanding of smart home communication protocols, hub vs hubless systems, and their practical applications.',
  questions: [
    {
      id: 1,
      question: 'Which communication protocol is best suited for high-bandwidth devices like security cameras?',
      options: [
        'Zigbee',
        'Wi-Fi',
        'Z-Wave',
        'Bluetooth'
      ],
      correctAnswer: 1,
      explanation: 'Wi-Fi is the best choice for high-bandwidth devices like security cameras because it offers high data transfer speeds (up to several Gbps) and can handle video streaming effectively.'
    },
    {
      id: 2,
      question: 'What is the main advantage of mesh networking in smart home protocols?',
      options: [
        'Lower cost per device',
        'Extended range and improved reliability',
        'Faster data transfer speeds',
        'Simpler setup process'
      ],
      correctAnswer: 1,
      explanation: 'Mesh networking allows devices to act as repeaters, extending the range beyond a single device\'s limit and providing multiple communication paths for improved reliability.'
    },
    {
      id: 3,
      question: 'Which protocol operates on sub-1 GHz bands to avoid interference from Wi-Fi?',
      options: [
        'Zigbee',
        'Z-Wave',
        'Thread',
        'Bluetooth'
      ],
      correctAnswer: 1,
      explanation: 'Z-Wave operates on sub-1 GHz bands (e.g., 908 MHz in the US), which helps avoid interference from 2.4 GHz Wi-Fi networks and provides better wall penetration.'
    },
    {
      id: 4,
      question: 'What is the primary function of a hub in a smart home system?',
      options: [
        'To provide internet connectivity',
        'To act as a central controller and protocol translator',
        'To store video recordings',
        'To generate electricity for devices'
      ],
      correctAnswer: 1,
      explanation: 'A hub acts as a central controller that manages all smart home devices, translating between different communication protocols and providing a unified interface for device control.'
    },
    {
      id: 5,
      question: 'Which of the following is NOT an advantage of hub-based systems?',
      options: [
        'Local processing capabilities',
        'Support for multiple protocols',
        'Lower initial cost',
        'Enhanced security and privacy'
      ],
      correctAnswer: 2,
      explanation: 'Hub-based systems typically have higher initial costs due to the hub hardware requirement, making "lower initial cost" incorrect. The other options are genuine advantages of hub-based systems.'
    },
    {
      id: 6,
      question: 'What is the main limitation of hubless systems?',
      options: [
        'Limited device compatibility',
        'High power consumption',
        'Internet dependency for full functionality',
        'Complex setup process'
      ],
      correctAnswer: 2,
      explanation: 'Hubless systems rely heavily on internet connectivity for cloud-based processing and control, making them vulnerable to internet outages and cloud service disruptions.'
    },
    {
      id: 7,
      question: 'Which protocol is designed to work with the Matter standard for cross-ecosystem compatibility?',
      options: [
        'Zigbee',
        'Thread',
        'Z-Wave',
        'Bluetooth'
      ],
      correctAnswer: 1,
      explanation: 'Thread is an IP-based protocol designed to work with the Matter standard, providing cross-ecosystem compatibility and enhanced interoperability between different smart home platforms.'
    },
    {
      id: 8,
      question: 'What is the typical range for Zigbee devices in a mesh network?',
      options: [
        '5-15 meters',
        '10-100 meters',
        '30-150 meters',
        '50-200 meters'
      ],
      correctAnswer: 1,
      explanation: 'Zigbee devices typically have a range of 10-100 meters per node, with the mesh network extending coverage beyond individual device limits through signal relaying.'
    },
    {
      id: 9,
      question: 'Which type of hub provides local processing capabilities for enhanced privacy?',
      options: [
        'Cloud-based hubs',
        'Software-based hubs like Home Assistant',
        'Voice assistant hubs',
        'Wi-Fi routers'
      ],
      correctAnswer: 1,
      explanation: 'Software-based hubs like Home Assistant provide local processing capabilities, keeping sensitive data within the home network and reducing dependency on cloud services.'
    },
    {
      id: 10,
      question: 'What is the primary benefit of the Matter standard for smart home devices?',
      options: [
        'Lower power consumption',
        'Cross-brand interoperability',
        'Faster data transfer',
        'Extended range'
      ],
      correctAnswer: 1,
      explanation: 'The Matter standard provides cross-brand interoperability, allowing devices from different manufacturers to work together seamlessly within the same smart home ecosystem.'
    },
    {
      id: 11,
      question: 'Which protocol is best suited for battery-powered sensors that need to last 1-2 years?',
      options: [
        'Wi-Fi',
        'Zigbee',
        'Bluetooth',
        'Ethernet'
      ],
      correctAnswer: 1,
      explanation: 'Zigbee is ideal for battery-powered sensors because it uses low power consumption, allowing devices to operate for 1-2 years on battery power while maintaining reliable communication.'
    },
    {
      id: 12,
      question: 'What is a key security advantage of hub-based systems over hubless systems?',
      options: [
        'Lower cost',
        'Local control and reduced cloud exposure',
        'Easier setup',
        'Better device compatibility'
      ],
      correctAnswer: 1,
      explanation: 'Hub-based systems provide local control and reduced cloud exposure, keeping sensitive data within the home network and minimizing the risk of data breaches through cloud services.'
    },
    {
      id: 13,
      question: 'Which communication protocol is most suitable for smart locks that use proximity-based unlocking?',
      options: [
        'Wi-Fi',
        'Zigbee',
        'Bluetooth',
        'Z-Wave'
      ],
      correctAnswer: 2,
      explanation: 'Bluetooth is most suitable for smart locks with proximity-based unlocking because it provides short-range, low-power communication that works well for direct device-to-device connections.'
    },
    {
      id: 14,
      question: 'What is the main challenge of managing many Wi-Fi devices in a hubless system?',
      options: [
        'High power consumption',
        'Network congestion and performance degradation',
        'Limited range',
        'Complex setup'
      ],
      correctAnswer: 1,
      explanation: 'Managing many Wi-Fi devices in a hubless system can lead to network congestion and performance degradation, as Wi-Fi networks have device limits and bandwidth constraints.'
    },
    {
      id: 15,
      question: 'Which type of system architecture is recommended for users who want advanced automation with complex scenarios?',
      options: [
        'Hubless systems',
        'Hub-based systems',
        'Mixed systems',
        'Cloud-only systems'
      ],
      correctAnswer: 1,
      explanation: 'Hub-based systems are recommended for users who want advanced automation with complex scenarios because they provide local processing capabilities and support for multiple protocols, enabling sophisticated automation rules.'
    }
  ]
};
