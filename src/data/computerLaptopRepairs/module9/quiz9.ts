import { Lesson } from '@/types/course';

export const quiz9: Lesson = {
  id: 2,
  title: 'Module 9 Quiz: Virus Removal and System Optimization',
  duration: '15 min',
  type: 'quiz',
  content: {
    questions: [
      {
        id: 1,
        question: 'What type of malware encrypts files and demands payment for decryption?',
        options: ['Spyware', 'Ransomware', 'Adware', 'Worm'],
        correct: 1
      },
      {
        id: 2,
        question: 'Which malware type can spread without human interaction?',
        options: ['Virus', 'Trojan', 'Worm', 'Keylogger'],
        correct: 2
      },
      {
        id: 3,
        question: 'What is the first step when removing malware from an infected system?',
        options: ['Format the hard drive', 'Disconnect from the internet', 'Install new antivirus', 'Update Windows'],
        correct: 1
      },
      {
        id: 4,
        question: 'Which boot mode prevents most malware from loading?',
        options: ['Normal Mode', 'Safe Mode', 'Recovery Mode', 'BIOS Mode'],
        correct: 1
      },
      {
        id: 5,
        question: 'What is a common sign of malware infection?',
        options: ['Faster boot times', 'Unexpected pop-ups and browser redirects', 'Improved performance', 'Longer battery life'],
        correct: 1
      },
      {
        id: 6,
        question: 'Which tool is recommended for removing adware and potentially unwanted programs?',
        options: ['Disk Defragmenter', 'AdwCleaner', 'Paint', 'Notepad'],
        correct: 1
      },
      {
        id: 7,
        question: 'What should you NOT do to optimize an SSD?',
        options: ['Enable TRIM', 'Update firmware', 'Defragment regularly', 'Keep 10-20% free space'],
        correct: 2
      },
      {
        id: 8,
        question: 'Which Windows utility helps identify programs that start automatically?',
        options: ['Control Panel', 'Task Manager (Startup tab)', 'Device Manager', 'Disk Management'],
        correct: 1
      },
      {
        id: 9,
        question: 'What is the purpose of running Disk Cleanup?',
        options: ['Install drivers', 'Remove temporary and unnecessary files', 'Update BIOS', 'Format partitions'],
        correct: 1
      },
      {
        id: 10,
        question: 'Which preventive measure is most effective against malware?',
        options: ['Disabling antivirus', 'Clicking all email links', 'Keeping software updated and using antivirus', 'Downloading from untrusted sites'],
        correct: 2
      }
    ]
  }
};
