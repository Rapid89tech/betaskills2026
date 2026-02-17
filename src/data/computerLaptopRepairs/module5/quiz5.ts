import { Lesson } from '@/types/course';

export const quiz5: Lesson = {
  id: 2,
  title: 'Module 5 Quiz: Memory, Storage, and Motherboard Upgrades',
  duration: '15 min',
  type: 'quiz',
  content: {
    questions: [
      {
        id: 1,
        question: 'Which of the following memory types is commonly used in laptops?',
        options: ['DIMM', 'SO-DIMM', 'SIMM', 'L-DIMM'],
        correct: 1
      },
      {
        id: 2,
        question: 'What is the main benefit of upgrading from an HDD to an SSD?',
        options: ['Increased power consumption', 'Louder operation', 'Faster boot and load times', 'Larger physical size'],
        correct: 2
      },
      {
        id: 3,
        question: 'Which storage interface provides the highest speed performance?',
        options: ['SATA', 'NVMe (PCIe)', 'USB 2.0', 'IDE'],
        correct: 1
      },
      {
        id: 4,
        question: 'Before installing or removing RAM, what safety measure should you take first?',
        options: ['Turn on the computer to discharge capacitors', 'Use a magnetic screwdriver', 'Wear an anti-static wrist strap', 'Heat the RAM module'],
        correct: 2
      },
      {
        id: 5,
        question: 'What does the "M.2" form factor describe?',
        options: ['Motherboard size', 'Monitor resolution', 'Storage device type', 'RAM configuration'],
        correct: 2
      },
      {
        id: 6,
        question: 'What is the correct installation angle for inserting RAM into a slot?',
        options: ['90 degrees straight down', '30 degrees and twist', '45 degrees then press down', 'Horizontally slide in'],
        correct: 2
      },
      {
        id: 7,
        question: 'Which form factor is the standard for full-sized desktop motherboards?',
        options: ['Mini-ITX', 'Micro-ATX', 'ATX', 'Nano-ITX'],
        correct: 2
      },
      {
        id: 8,
        question: 'What should you do before replacing a storage drive to prevent data loss?',
        options: ['Format the drive', 'Defragment the old drive', 'Back up important data', 'Unplug the keyboard'],
        correct: 2
      },
      {
        id: 9,
        question: 'If your system doesn\'t boot after a RAM upgrade, what\'s the most likely cause?',
        options: ['The CPU is overheating', 'The power supply is too strong', 'RAM is not properly seated or is incompatible', 'The CMOS battery is too new'],
        correct: 2
      },
      {
        id: 10,
        question: 'What should you check in BIOS after replacing a motherboard or storage device?',
        options: ['The desktop wallpaper', 'USB driver status', 'Boot order and component detection', 'Printer connectivity'],
        correct: 2
      }
    ]
  }
};
