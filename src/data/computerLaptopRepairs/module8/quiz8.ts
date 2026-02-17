import { Lesson } from '@/types/course';

export const quiz8: Lesson = {
  id: 2,
  title: 'Module 8 Quiz: Operating System Installation and Repair',
  duration: '15 min',
  type: 'quiz',
  content: {
    questions: [
      {
        id: 1,
        question: 'What is the purpose of using a checksum like SHA-256 when preparing installation media?',
        options: ['To increase download speed', 'To verify the integrity of the ISO file', 'To encrypt the installation files', 'To format the USB drive'],
        correct: 1
      },
      {
        id: 2,
        question: 'Why might a user prefer GPT partitioning over MBR?',
        options: ['GPT is only for older systems', 'GPT supports more partitions and larger drives', 'MBR is required for UEFI systems', 'GPT limits disk size to 2TB'],
        correct: 1
      },
      {
        id: 3,
        question: 'Which file system is typically used for Linux system partitions?',
        options: ['NTFS', 'FAT32', 'ext4', 'HFS+'],
        correct: 2
      },
      {
        id: 4,
        question: 'What step must you take in BIOS/UEFI before booting from a USB on a newer system?',
        options: ['Disable all drivers', 'Set boot priority to USB and adjust Secure Boot', 'Format the hard drive', 'Enable overclocking'],
        correct: 1
      },
      {
        id: 5,
        question: 'Why is it important to remove installation media after the first restart during installation?',
        options: ['To speed up the installation', 'To prevent booting into the installation media again', 'To update the BIOS', 'To install additional drivers'],
        correct: 1
      },
      {
        id: 6,
        question: 'What is GRUB, and what role does it play in OS installation?',
        options: ['A partitioning tool for Windows', 'A Linux bootloader managing OS startup', 'A macOS recovery tool', 'A driver update utility'],
        correct: 1
      },
      {
        id: 7,
        question: 'What does the "Custom: Install Windows only" option do during Windows installation?',
        options: ['Upgrades existing OS', 'Allows clean install with disk formatting', 'Installs only drivers', 'Skips partitioning'],
        correct: 1
      },
      {
        id: 8,
        question: 'Name two tools commonly used on Linux for partitioning disks.',
        options: ['Disk Management, Device Manager', 'GParted, fdisk', 'Nero, ImgBurn', 'Rufus, balenaEtcher'],
        correct: 1
      },
      {
        id: 9,
        question: 'What could cause the error "Windows cannot be installed to this disk. The selected disk is of the GPT partition style"?',
        options: ['Legacy/BIOS mode with GPT disk', 'Insufficient disk space', 'Corrupted USB drive', 'Missing product key'],
        correct: 0
      },
      {
        id: 10,
        question: 'What is one precaution to take before formatting a disk during OS installation?',
        options: ['Install all drivers first', 'Back up important data', 'Disable BIOS settings', 'Update the OS'],
        correct: 1
      }
    ]
  }
};
