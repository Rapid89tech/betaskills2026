import type { Quiz } from '@/types/course';

export const quiz: Quiz = {
  id: 6,
  title: 'Quiz: Networking & Connectivity for Smart Homes',
  description: 'This quiz tests your understanding of router setup, IP addressing, device discovery, Wi-Fi range extenders, mesh networks, troubleshooting, and bandwidth management.',
  questions: [
    {
      id: 1,
      question: 'Which wireless frequency is most commonly supported by smart home devices?',
      options: [
        '1.2 GHz',
        '2.4 GHz',
        '5.8 GHz',
        '6 GHz'
      ],
      correctAnswer: 1,
      explanation: '2.4 GHz is the most commonly supported frequency by smart home devices due to its longer range, better wall penetration, and widespread compatibility.'
    },
    {
      id: 2,
      question: 'What does DHCP do in a smart home network?',
      options: [
        'Protects the router from viruses',
        'Detects offline devices',
        'Automatically assigns IP addresses',
        'Enhances device signal strength'
      ],
      correctAnswer: 2,
      explanation: 'DHCP (Dynamic Host Configuration Protocol) automatically assigns IP addresses to devices on the network, simplifying setup and management.'
    },
    {
      id: 3,
      question: 'Why might you assign a static IP to a smart device?',
      options: [
        'To make it easier to update apps',
        'To prevent it from using too much data',
        'To ensure consistent connectivity',
        'To allow Bluetooth access'
      ],
      correctAnswer: 2,
      explanation: 'Static IP addresses ensure consistent connectivity by preventing IP address changes that could disrupt device communication and automation.'
    },
    {
      id: 4,
      question: 'What is a mesh network used for?',
      options: [
        'Managing Bluetooth speakers',
        'Blocking unwanted traffic',
        'Providing wide and stable Wi-Fi coverage',
        'Encrypting smart home data'
      ],
      correctAnswer: 2,
      explanation: 'Mesh networks provide wide and stable Wi-Fi coverage by using multiple nodes that work together to create seamless connectivity throughout the home.'
    },
    {
      id: 5,
      question: 'Which of the following can cause Wi-Fi signal interference?',
      options: [
        'Clear glass windows',
        'Wood furniture',
        'Thick concrete walls',
        'LED light bulbs'
      ],
      correctAnswer: 2,
      explanation: 'Thick concrete walls can significantly block or weaken Wi-Fi signals, causing interference and connectivity issues.'
    },
    {
      id: 6,
      question: 'Which of these uses the most internet bandwidth in a smart home?',
      options: [
        'Smart bulb',
        'Smart thermostat',
        'Smart speaker',
        'Smart camera'
      ],
      correctAnswer: 3,
      explanation: 'Smart cameras use the most internet bandwidth due to video streaming, especially when recording in high resolution or continuously.'
    },
    {
      id: 7,
      question: 'What tool is commonly used to discover and pair smart devices?',
      options: [
        'Remote control',
        'QR code scanner or Bluetooth',
        'Network cable',
        'Flash drive'
      ],
      correctAnswer: 1,
      explanation: 'QR code scanners and Bluetooth are commonly used tools for discovering and pairing smart devices with apps and hubs.'
    },
    {
      id: 8,
      question: 'What is a common solution if a device goes offline?',
      options: [
        'Move it to another room',
        'Reinstall the app',
        'Restart the router and device',
        'Buy a new one'
      ],
      correctAnswer: 2,
      explanation: 'Restarting the router and device is a common and effective solution for resolving connectivity issues and getting devices back online.'
    },
    {
      id: 9,
      question: 'What is the function of a Wi-Fi range extender?',
      options: [
        'Increases available IP addresses',
        'Adds new devices to the network',
        'Strengthens weak Wi-Fi signal areas',
        'Stores backup power'
      ],
      correctAnswer: 2,
      explanation: 'Wi-Fi range extenders strengthen weak Wi-Fi signal areas by amplifying and rebroadcasting the existing Wi-Fi signal to extend coverage.'
    },
    {
      id: 10,
      question: 'Where can you usually monitor device bandwidth usage?',
      options: [
        'On the device\'s battery',
        'From the wall socket',
        'In the router\'s admin panel',
        'On a USB drive'
      ],
      correctAnswer: 2,
      explanation: 'Device bandwidth usage can typically be monitored in the router\'s admin panel, which provides detailed network statistics and usage information.'
    },
    {
      id: 11,
      question: 'What is the main advantage of using WPA3 encryption over WPA2?',
      options: [
        'Faster connection speeds',
        'Enhanced encryption and protection against brute-force attacks',
        'Lower power consumption',
        'Better compatibility with older devices'
      ],
      correctAnswer: 1,
      explanation: 'WPA3 offers enhanced encryption and protection against brute-force attacks compared to WPA2, providing better security for smart home networks.'
    },
    {
      id: 12,
      question: 'Which protocol is best for battery-powered smart home sensors?',
      options: [
        'Wi-Fi',
        'Zigbee',
        'Ethernet',
        'Bluetooth (without BLE)'
      ],
      correctAnswer: 1,
      explanation: 'Zigbee is best for battery-powered sensors because it uses low power consumption, allowing devices to operate for extended periods on battery power.'
    },
    {
      id: 13,
      question: 'What is the purpose of QoS (Quality of Service) settings?',
      options: [
        'To increase internet speed',
        'To prioritize bandwidth for critical devices',
        'To reduce power consumption',
        'To encrypt network traffic'
      ],
      correctAnswer: 1,
      explanation: 'QoS settings prioritize bandwidth for critical devices like security cameras over less critical devices like smart plugs, ensuring smooth operation of important functions.'
    },
    {
      id: 14,
      question: 'How can you reduce bandwidth usage from smart cameras?',
      options: [
        'Use lower resolution settings',
        'Enable motion-triggered recording',
        'Use local storage instead of cloud storage',
        'All of the above'
      ],
      correctAnswer: 3,
      explanation: 'All of these methods can reduce bandwidth usage: using lower resolution, enabling motion-triggered recording, and using local storage instead of cloud storage.'
    },
    {
      id: 15,
      question: 'What is the recommended internet speed for a large smart home with 20+ devices?',
      options: [
        '25-50 Mbps',
        '50-100 Mbps',
        '200-500 Mbps',
        '1 Gbps or higher'
      ],
      correctAnswer: 2,
      explanation: 'For a large smart home with 20+ devices, 200-500 Mbps is recommended to handle multiple high-bandwidth devices and ensure smooth operation.'
    }
  ]
};
