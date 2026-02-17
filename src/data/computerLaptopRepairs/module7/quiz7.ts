import { Lesson } from '@/types/course';

export const quiz7: Lesson = {
  id: 2,
  title: 'Module 7 Quiz: BIOS and Firmware Issues',
  duration: '15 min',
  type: 'quiz',
  content: {
    questions: [
      {
        id: 1,
        question: 'What is the primary function of BIOS during the computer boot process?',
        options: ['Manage user accounts', 'Perform POST and load the operating system bootloader', 'Provide network connectivity', 'Encrypt data on the hard drive'],
        correct: 1
      },
      {
        id: 2,
        question: 'Which firmware interface supports drives larger than 2.2 TB using GPT partitioning?',
        options: ['BIOS', 'UEFI', 'MBR', 'CMOS'],
        correct: 1
      },
      {
        id: 3,
        question: 'What is the key security feature provided by UEFI that BIOS lacks?',
        options: ['Fan speed control', 'Secure Boot', 'Text-based interface', 'Legacy boot mode'],
        correct: 1
      },
      {
        id: 4,
        question: 'Which key is most commonly used to enter BIOS setup on many desktop PCs?',
        options: ['F2', 'DEL', 'ESC', 'F12'],
        correct: 1
      },
      {
        id: 5,
        question: 'How can you reset BIOS settings to their factory defaults if you cannot access the BIOS menu?',
        options: ['Press F9 during boot', 'Remove the CMOS battery or use motherboard jumper pins', 'Reinstall the operating system', 'Use the Windows Control Panel'],
        correct: 1
      },
      {
        id: 6,
        question: 'Why should you be cautious when performing a firmware flash/update?',
        options: ['It may slow down the computer', 'Interruptions during flashing can brick the device', 'It deletes all personal files', 'It disables the Secure Boot feature permanently'],
        correct: 1
      },
      {
        id: 7,
        question: 'What is the main difference in the user interface between BIOS and UEFI?',
        options: ['BIOS uses a graphical interface, UEFI is text-based', 'BIOS is text-based with keyboard navigation only; UEFI supports graphical interface with mouse support', 'BIOS supports network boot, UEFI does not', 'UEFI cannot change boot order'],
        correct: 1
      },
      {
        id: 8,
        question: 'Which command is commonly used to save changes and exit BIOS setup?',
        options: ['F9', 'ESC', 'F10', 'DEL'],
        correct: 2
      },
      {
        id: 9,
        question: 'What problem might occur if Secure Boot is enabled when installing an unsigned operating system?',
        options: ['The system will boot normally without issues', 'Secure Boot might block the OS from loading', 'It will erase all files on the hard drive', 'It will disable USB ports'],
        correct: 1
      },
      {
        id: 10,
        question: 'Which of the following is NOT a common symptom of BIOS problems?',
        options: ['Black screen on startup', 'BIOS checksum error messages', 'System overheating rapidly', 'Failure to detect storage devices'],
        correct: 2
      }
    ]
  }
};
