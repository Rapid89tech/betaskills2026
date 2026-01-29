
import type { Module } from '@/types/course';

export const module12Assessment: Module = {
  id: 12,
  title: 'Module 12: Final Assessment and Certification',
  description: 'Complete comprehensive assessment of computer repair skills and knowledge, including practical demonstrations, theoretical testing, and certification preparation.',
  learningObjectives: [
    'Demonstrate comprehensive computer repair knowledge and skills',
    'Complete practical repair scenarios and challenges',
    'Apply troubleshooting methodologies to complex problems',
    'Showcase professional communication and customer service skills',
    'Prepare for industry certifications and professional development',
    'Develop a portfolio of repair projects and achievements',
    'Plan ongoing learning and career development strategies'
  ],
  lessons: [
    {
      id: 12,
      title: 'Final Assessment: Computer Repair Certification (Module 12)',
      duration: '120 min',
      type: 'quiz',
      content: {
        questions: [
          {
            question: 'What is the first step in systematic troubleshooting?',
            options: [
              'Replace components',
              'Identify the problem',
              'Update drivers',
              'Restart the computer'
            ],
            correct: 1,
            explanation: 'The first step in systematic troubleshooting is to identify the problem by gathering information and understanding the symptoms.'
          },
          {
            question: 'Which tool is essential for preventing ESD damage?',
            options: [
              'Screwdriver',
              'Anti-static wrist strap',
              'Multimeter',
              'Heat gun'
            ],
            correct: 1,
            explanation: 'An anti-static wrist strap is essential for preventing electrostatic discharge (ESD) damage to sensitive electronic components.'
          },
          {
            question: 'What should you do before replacing a laptop display?',
            options: [
              'Start immediately',
              'Backup all data and document the process',
              'Format the hard drive',
              'Update the BIOS'
            ],
            correct: 1,
            explanation: 'Before replacing a laptop display, you should backup all data and document the process to ensure safety and proper reassembly.'
          },
          {
            question: 'What is the purpose of creating a disk image before data recovery?',
            options: [
              'To save storage space',
              'To preserve the original state of the drive',
              'To speed up recovery',
              'To delete unwanted files'
            ],
            correct: 1,
            explanation: 'Creating a disk image preserves the original state of the drive, allowing safe recovery attempts without risking further data loss.'
          },
          {
            question: 'Which Windows tool can repair corrupted system files?',
            options: [
              'Task Manager',
              'System File Checker (SFC)',
              'Event Viewer',
              'Resource Monitor'
            ],
            correct: 1,
            explanation: 'System File Checker (SFC) is a Windows utility that can scan and repair corrupted system files.'
          },
          {
            question: 'What should you do when dealing with an angry customer?',
            options: [
              'Argue back',
              'Stay calm and listen to their concerns',
              'Ignore them',
              'Hang up the phone'
            ],
            correct: 1,
            explanation: 'When dealing with an angry customer, you should stay calm and listen to their concerns to understand the issue and work toward resolution.'
          },
          {
            question: 'What is the minimum RAM requirement for Windows 10?',
            options: [
              '2 GB',
              '4 GB',
              '8 GB',
              '16 GB'
            ],
            correct: 1,
            explanation: 'Windows 10 requires a minimum of 4 GB of RAM, though 8 GB is recommended for better performance.'
          },
          {
            question: 'What should you do immediately after discovering ransomware?',
            options: [
              'Pay the ransom',
              'Disconnect from the network',
              'Restart the computer',
              'Delete all files'
            ],
            correct: 1,
            explanation: 'The first step when discovering ransomware is to disconnect from the network to prevent the encryption from spreading.'
          },
          {
            question: 'What is the purpose of thermal paste in CPU installation?',
            options: [
              'To glue the CPU to the motherboard',
              'To improve heat transfer between CPU and cooler',
              'To prevent electrical shorts',
              'To make the CPU look better'
            ],
            correct: 1,
            explanation: 'Thermal paste improves heat transfer between the CPU and cooler, preventing overheating and ensuring proper thermal management.'
          },
          {
            question: 'What should you do if a BIOS update fails?',
            options: [
              'Try the update again immediately',
              'Use backup BIOS or seek professional recovery',
              'Replace the motherboard',
              'Ignore the problem'
            ],
            correct: 1,
            explanation: 'If a BIOS update fails, you should use backup BIOS if available or seek professional recovery services to restore functionality.'
          },
          {
            question: 'What is the best way to prevent malware infections?',
            options: [
              'Only use expensive software',
              'Implement multiple layers of security',
              'Avoid using the internet',
              'Use only Apple products'
            ],
            correct: 1,
            explanation: 'The best approach is to implement multiple layers of security including antivirus software, firewalls, user education, and regular updates.'
          },
          {
            question: 'What should you do after completing a repair?',
            options: [
              'Send the customer away immediately',
              'Test the repair and explain what was done',
              'Ignore the customer',
              'Charge extra fees'
            ],
            correct: 1,
            explanation: 'After completing a repair, you should test the repair and explain what was done to ensure customer satisfaction and verify functionality.'
          },
          {
            question: 'What is the purpose of a firewall in computer security?',
            options: [
              'To remove existing malware',
              'To block unauthorized network access',
              'To speed up the computer',
              'To backup files automatically'
            ],
            correct: 1,
            explanation: 'A firewall blocks unauthorized network access, preventing malware from communicating with external servers or spreading to other systems.'
          },
          {
            question: 'What should you do if you cannot complete a repair within the promised timeframe?',
            options: [
              'Ignore the customer',
              'Keep the customer informed and update the timeline',
              'Blame the customer',
              'Cancel the job'
            ],
            correct: 1,
            explanation: 'You should keep the customer informed and update the timeline to maintain trust and manage expectations properly.'
          },
          {
            question: 'What is the importance of continuing education in computer repair?',
            options: [
              'It is not necessary',
              'Technology evolves rapidly and skills need updating',
              'It is only required for certifications',
              'It is too expensive'
            ],
            correct: 1,
            explanation: 'Technology evolves rapidly, so continuing education is essential to stay current with new technologies, tools, and repair techniques.'
          }
        ]
      }
    }
  ]
};
