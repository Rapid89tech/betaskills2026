import { Module } from '@/types/course';

const certifiedComputerRepairModule7: Module = {
  id: 7,
  title: 'Software Troubleshooting & Data Recovery',
  description: 'This module equips learners with the skills to diagnose and resolve software issues, perform data recovery, and implement system optimization techniques. Students will learn to use diagnostic tools, recover lost data, and optimize system performance.',
  lessons: [
    {
      id: 27,
      title: 'Operating System Troubleshooting',
      duration: '45 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/ba4ToTzqF2o',
        textContent: `
# Operating System Troubleshooting

## Key Features
**Comprehensive OS Diagnostics**: Learners master diagnosing and resolving operating system issues across Windows, macOS, and Linux platforms.

This section covers common OS problems like boot failures, driver conflicts, and system corruption. Video tutorials and simulations teach learners to use built-in diagnostic tools, recovery options, and command-line utilities to restore system functionality.

## Common OS Issues and Solutions

### Windows Issues:
- **Blue Screen of Death (BSOD)**: Update drivers, check hardware, run memory diagnostics.
- **Boot Loop**: Use Safe Mode, System Restore, or Recovery Console.
- **Slow Performance**: Check startup programs, disk cleanup, malware scan.
- **Driver Conflicts**: Use Device Manager, update or rollback drivers.

### macOS Issues:
- **Kernel Panic**: Safe Mode boot, reset NVRAM, reinstall macOS.
- **Slow Performance**: Activity Monitor, disk cleanup, reset SMC/PRAM.
- **App Crashes**: Update apps, check compatibility, reinstall.

### Linux Issues:
- **Boot Failure**: GRUB recovery, kernel parameters, live USB.
- **Package Conflicts**: Package manager tools, dependency resolution.
- **Permission Issues**: chmod, chown, sudo commands.

## Diagnostic Tools and Methods
- **Windows**: Event Viewer, Task Manager, System File Checker (SFC).
- **macOS**: Console, Activity Monitor, Disk Utility.
- **Linux**: dmesg, systemctl, journalctl, top/htop.

## Recovery Options
- **System Restore/Time Machine**: Point-in-time recovery.
- **Safe Mode**: Minimal boot for troubleshooting.
- **Recovery Console**: Command-line recovery tools.
- **Live USB**: Boot from external media for repair.

## Best Practices
- Always backup data before major repairs.
- Document changes and solutions.
- Test fixes in safe environment first.
- Keep recovery media handy.
        `
      }
    },
    {
      id: 28,
      title: 'Data Recovery Techniques',
      duration: '50 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/r3Jy5dHOj3g',
        textContent: `
# Data Recovery Techniques

## Key Features
**Professional Data Recovery**: Learners master data recovery techniques for various scenarios including accidental deletion, drive failure, and corruption.

This section covers data recovery from different storage media, using specialized software tools, and implementing backup strategies. Video tutorials and simulations teach safe recovery procedures, preparing learners for professional data recovery services.

## Data Recovery Scenarios

### Accidental Deletion:
- **Recycle Bin Recovery**: Check recycle bin, restore files.
- **File Recovery Software**: Use tools like Recuva, PhotoRec, TestDisk.
- **Previous Versions**: Windows File History, macOS Time Machine.

### Drive Failure:
- **Hardware Issues**: Replace failed components, use data recovery services.
- **Logical Issues**: Use recovery software, check file system.
- **Bad Sectors**: Use tools like chkdsk, fsck, disk repair utilities.

### Corruption:
- **File System Corruption**: Run file system checks, repair tools.
- **Virus/Malware**: Scan and clean, recover from backup.
- **Power Failure**: Use journaling file systems, recovery tools.

## Data Recovery Tools
- **Free Tools**: Recuva, PhotoRec, TestDisk, ddrescue.
- **Professional Tools**: R-Studio, GetDataBack, Disk Drill.
- **Live Boot Tools**: Ubuntu Live, Hiren's BootCD, Ultimate Boot CD.

## Recovery Process
1. **Assessment**: Determine recovery scenario and required tools.
2. **Preparation**: Create disk image if possible, work on copy.
3. **Recovery**: Use appropriate tools and techniques.
4. **Verification**: Check recovered data integrity.
5. **Backup**: Immediately backup recovered data.

## Prevention Strategies
- **Regular Backups**: Automated backup solutions.
- **RAID Arrays**: Redundant storage for critical data.
- **Cloud Storage**: Off-site backup options.
- **Monitoring**: SMART monitoring, disk health checks.

## Safety Precautions
- Never write to damaged drives.
- Use write-blocking tools when necessary.
- Work on copies, not original media.
- Document all recovery attempts.
        `
      }
    },
    {
      id: 29,
      title: 'Virus Removal and Security',
      duration: '40 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/mPzcsU8Cpco',
        textContent: `
# Virus Removal and Security

## Key Features
**Comprehensive Security Solutions**: Learners master virus detection, removal, and prevention techniques for various malware types.

This section covers malware identification, removal procedures, and security best practices. Video tutorials and simulations teach learners to use antivirus tools, manual removal techniques, and implement security measures.

## Types of Malware
- **Viruses**: Self-replicating code that infects files.
- **Trojans**: Malicious software disguised as legitimate programs.
- **Ransomware**: Encrypts files and demands payment.
- **Spyware**: Monitors user activity without consent.
- **Adware**: Displays unwanted advertisements.

## Detection Methods
- **Antivirus Software**: Real-time scanning, signature detection.
- **Behavioral Analysis**: Monitor suspicious system behavior.
- **Network Monitoring**: Check for unusual network activity.
- **Manual Inspection**: Review processes, registry, startup items.

## Removal Procedures
1. **Safe Mode Boot**: Boot into safe mode to prevent malware activation.
2. **Update Antivirus**: Ensure latest virus definitions.
3. **Full System Scan**: Comprehensive malware scan.
4. **Manual Removal**: Remove registry entries, startup items.
5. **System Restore**: Use restore points if available.

## Prevention Strategies
- **Keep Software Updated**: Regular OS and application updates.
- **Use Antivirus Software**: Real-time protection.
- **Safe Browsing**: Avoid suspicious websites and downloads.
- **Email Security**: Don't open suspicious attachments.
- **Firewall**: Enable and configure firewall protection.

## Recovery After Infection
- **Data Backup**: Restore from clean backup.
- **System Rebuild**: Fresh OS installation if necessary.
- **Password Changes**: Update all account passwords.
- **Security Audit**: Review and strengthen security measures.

## Tools and Resources
- **Antivirus Software**: Windows Defender, Malwarebytes, Avast.
- **Online Scanners**: VirusTotal, Hybrid Analysis.
- **Recovery Tools**: System Restore, Recovery Console.
- **Security Tools**: Process Monitor, Autoruns, HijackThis.
        `
      }
    },
    {
      id: 30,
      title: 'System Optimization',
      duration: '35 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/WwwkugPILgY',
        textContent: `
# System Optimization

## Key Features
**Performance Enhancement**: Learners master system optimization techniques to improve speed, stability, and efficiency.

This section covers various optimization methods including disk cleanup, registry maintenance, startup management, and hardware optimization. Video tutorials and simulations teach learners to identify performance bottlenecks and apply appropriate solutions.

## Performance Analysis
- **Task Manager**: Monitor CPU, memory, disk, and network usage.
- **Resource Monitor**: Detailed system resource analysis.
- **Performance Counters**: Track system performance metrics.
- **Benchmarking Tools**: Compare system performance.

## Disk Optimization
- **Disk Cleanup**: Remove temporary files and system junk.
- **Defragmentation**: Optimize file placement on HDDs.
- **TRIM Support**: Enable TRIM for SSD optimization.
- **Disk Space Management**: Monitor and manage storage usage.

## Startup Optimization
- **Startup Programs**: Disable unnecessary startup items.
- **Services Management**: Configure system services.
- **Boot Time Analysis**: Identify slow boot causes.
- **Startup Impact Assessment**: Evaluate program startup impact.

## Memory Optimization
- **Virtual Memory**: Configure page file settings.
- **Memory Management**: Monitor memory usage patterns.
- **Memory Leaks**: Identify and fix memory leaks.
- **RAM Optimization**: Optimize memory allocation.

## Registry Optimization
- **Registry Cleanup**: Remove invalid registry entries.
- **Registry Backup**: Create registry backups before changes.
- **Registry Defragmentation**: Optimize registry structure.
- **Registry Monitoring**: Track registry changes.

## Software Optimization
- **Driver Updates**: Keep drivers current and optimized.
- **Software Updates**: Regular application updates.
- **Unused Software**: Remove unnecessary programs.
- **Background Processes**: Manage background applications.

## Hardware Optimization
- **Thermal Management**: Ensure proper cooling.
- **Power Settings**: Optimize power management.
- **BIOS Settings**: Configure optimal BIOS settings.
- **Hardware Monitoring**: Monitor component health.

## Maintenance Schedule
- **Daily**: Quick system checks, antivirus scans.
- **Weekly**: Disk cleanup, software updates.
- **Monthly**: Full system scan, performance analysis.
- **Quarterly**: Deep cleaning, hardware inspection.
        `
      }
    },
    {
      id: 31,
      title: 'Quiz: Software Troubleshooting & Data Recovery',
      duration: '20 min',
      type: 'quiz',
      content: {
        questions: [
          {
            question: 'What is the first step when troubleshooting a Windows Blue Screen of Death (BSOD)?',
            options: ['Reinstall Windows', 'Update all drivers', 'Check hardware connections', 'Run System Restore'],
            correct: 2,
            explanation: 'The first step is to check hardware connections, as BSOD often indicates hardware issues.'
          },
          {
            question: 'Which tool is most effective for recovering accidentally deleted files?',
            options: ['Disk Cleanup', 'System Restore', 'File recovery software like Recuva', 'Windows Backup'],
            correct: 2,
            explanation: 'File recovery software like Recuva is specifically designed to recover accidentally deleted files.'
          },
          {
            question: 'What should you do first when dealing with a ransomware infection?',
            options: ['Pay the ransom', 'Disconnect from network', 'Run antivirus scan', 'Restore from backup'],
            correct: 1,
            explanation: 'First disconnect from the network to prevent the ransomware from spreading to other systems.'
          },
          {
            question: 'Which Windows tool can help identify which programs are slowing down startup?',
            options: ['Task Manager', 'Disk Cleanup', 'System Configuration', 'Event Viewer'],
            correct: 2,
            explanation: 'System Configuration (msconfig) helps identify and manage startup programs.'
          },
          {
            question: 'What is the purpose of TRIM in SSD optimization?',
            options: ['Defragment the drive', 'Clean temporary files', 'Mark unused blocks for garbage collection', 'Compress files'],
            correct: 2,
            explanation: 'TRIM marks unused blocks for garbage collection, which helps maintain SSD performance.'
          },
          {
            question: 'Which of the following is NOT a type of malware?',
            options: ['Virus', 'Trojan', 'Firewall', 'Ransomware'],
            correct: 2,
            explanation: 'A firewall is a security tool, not a type of malware.'
          },
          {
            question: 'What is the safest way to work with a potentially infected system?',
            options: ['Boot normally', 'Boot in Safe Mode', 'Boot from live USB', 'Boot in Recovery Mode'],
            correct: 2,
            explanation: 'Booting from a live USB provides a clean environment to work with an infected system.'
          },
          {
            question: 'Which command can repair corrupted system files in Windows?',
            options: ['chkdsk', 'sfc /scannow', 'defrag', 'format'],
            correct: 1,
            explanation: 'sfc /scannow (System File Checker) can repair corrupted system files in Windows.'
          },
          {
            question: 'What is the primary purpose of virtual memory?',
            options: ['Speed up the system', 'Provide additional RAM using disk space', 'Store temporary files', 'Backup important data'],
            correct: 1,
            explanation: 'Virtual memory provides additional RAM using disk space when physical RAM is insufficient.'
          },
          {
            question: 'Which of the following is the best practice for data recovery?',
            options: ['Work directly on the damaged drive', 'Create a disk image first', 'Use multiple recovery tools simultaneously', 'Ignore file system errors'],
            correct: 1,
            explanation: 'Creating a disk image first ensures you work on a copy, preventing further damage to the original drive.'
          }
        ]
      }
    }
  ]
};

export default certifiedComputerRepairModule7; 