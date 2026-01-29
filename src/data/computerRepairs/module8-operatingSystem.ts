
import type { Module } from '@/types/course';

export const module8OperatingSystem: Module = {
  id: 8,
  title: 'Module 8: Operating System Installation and Configuration',
  description: 'Master operating system installation, configuration, and troubleshooting for Windows, macOS, and Linux systems, including driver management, system optimization, and recovery procedures.',
  learningObjectives: [
    'Install and configure Windows, macOS, and Linux operating systems',
    'Manage device drivers and system updates effectively',
    'Troubleshoot operating system issues and errors',
    'Optimize system performance and stability',
    'Implement backup and recovery procedures',
    'Configure user accounts and security settings',
    'Perform system maintenance and optimization tasks'
  ],
  lessons: [
    {
      id: 8,
      title: 'Operating System Installation and Configuration',
      duration: '85 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/mPzcsU8Cpco',
        textContent: `
# 💻 Module 8: Operating System Installation and Configuration

This module covers comprehensive operating system management, including installation, configuration, troubleshooting, and optimization for Windows, macOS, and Linux systems.

## 🪟 Windows Operating System

### **Windows Versions and Editions**
- **Windows 10**: Current mainstream version
- **Windows 11**: Latest version with new features
- **Windows Server**: Server operating system
- **Windows Home vs Pro**: Different feature sets

### **System Requirements**
- **Processor**: 1 GHz or faster
- **RAM**: 4 GB minimum (8 GB recommended)
- **Storage**: 64 GB minimum
- **Graphics**: DirectX 12 compatible
- **UEFI**: Secure Boot capable
- **TPM**: Trusted Platform Module 2.0

### **Installation Methods**
- **USB Installation**: Boot from USB drive
- **DVD Installation**: Boot from installation DVD
- **Network Installation**: Install over network
- **Upgrade Installation**: Upgrade existing Windows

### **Installation Process**
1. **Prepare Media**: Create bootable USB or DVD
2. **Backup Data**: Backup important data
3. **Boot from Media**: Boot from installation media
4. **Follow Setup**: Complete installation wizard
5. **Configure Settings**: Set up user accounts and preferences
6. **Install Updates**: Download and install updates
7. **Install Drivers**: Install necessary device drivers

## 🍎 macOS Operating System

### **macOS Versions**
- **macOS Ventura**: Latest version
- **macOS Monterey**: Previous version
- **macOS Big Sur**: Older version
- **macOS Server**: Server version

### **System Requirements**
- **Hardware**: Apple Mac computer
- **Processor**: Intel or Apple Silicon
- **RAM**: 4 GB minimum (8 GB recommended)
- **Storage**: 64 GB available space
- **Internet**: Required for installation

### **Installation Methods**
- **App Store**: Download from Mac App Store
- **Recovery Mode**: Install from recovery partition
- **Internet Recovery**: Download and install
- **USB Installation**: Boot from USB installer

### **Installation Process**
1. **Check Compatibility**: Verify hardware compatibility
2. **Backup Data**: Use Time Machine backup
3. **Download Installer**: Get from App Store
4. **Run Installer**: Follow installation process
5. **Configure Setup**: Set up user accounts
6. **Install Updates**: Update to latest version
7. **Restore Data**: Restore from backup if needed

## 🐧 Linux Operating System

### **Linux Distributions**
- **Ubuntu**: User-friendly, popular distribution
- **Fedora**: Cutting-edge features
- **CentOS**: Enterprise-focused
- **Debian**: Stable, community-driven

### **System Requirements**
- **Processor**: 1 GHz or faster
- **RAM**: 2 GB minimum (4 GB recommended)
- **Storage**: 25 GB minimum
- **Graphics**: VGA capable of 1024x768
- **Network**: Internet connection recommended

### **Installation Methods**
- **Live USB**: Boot and install from USB
- **DVD Installation**: Install from DVD
- **Network Installation**: Install over network
- **Virtual Machine**: Install in virtual environment

### **Installation Process**
1. **Choose Distribution**: Select appropriate Linux distro
2. **Create Media**: Create bootable USB or DVD
3. **Boot Live System**: Boot into live environment
4. **Run Installer**: Execute installation program
5. **Configure System**: Set up user accounts and settings
6. **Install Updates**: Update system packages
7. **Install Software**: Install additional applications

## 🔧 Driver Management

### **Windows Drivers**
- **Automatic Updates**: Windows Update
- **Manufacturer Drivers**: Download from manufacturer
- **Device Manager**: Manage and update drivers
- **Driver Rollback**: Revert to previous driver

### **Driver Installation**
1. **Identify Hardware**: Determine hardware components
2. **Download Drivers**: Get drivers from manufacturer
3. **Install Drivers**: Run driver installation
4. **Verify Installation**: Check Device Manager
5. **Test Functionality**: Test hardware features

### **Driver Troubleshooting**
- **Compatibility Issues**: Check driver compatibility
- **Update Problems**: Troubleshoot update failures
- **Rollback Procedures**: Revert problematic drivers
- **Safe Mode**: Install drivers in safe mode

## 🔍 Operating System Troubleshooting

### **Boot Issues**
- **Safe Mode**: Boot into safe mode for troubleshooting
- **Recovery Options**: Use Windows recovery tools
- **Boot Repair**: Repair boot configuration
- **System Restore**: Restore to previous state

### **Performance Issues**
- **Task Manager**: Monitor system performance
- **Resource Monitor**: Detailed resource analysis
- **Performance Monitor**: Track system metrics
- **Optimization Tools**: Use built-in optimization

### **Application Problems**
- **Compatibility Mode**: Run in compatibility mode
- **Administrator Mode**: Run as administrator
- **Reinstall Applications**: Reinstall problematic apps
- **System File Checker**: Repair system files

### **Network Issues**
- **Network Troubleshooter**: Built-in network diagnostics
- **Command Line Tools**: Use network commands
- **Driver Updates**: Update network drivers
- **Configuration**: Check network settings

## ⚡ System Optimization

### **Windows Optimization**
- **Disk Cleanup**: Remove unnecessary files
- **Defragmentation**: Optimize hard drive
- **Startup Programs**: Manage startup items
- **Power Settings**: Optimize power configuration

### **macOS Optimization**
- **Disk Utility**: Repair and optimize storage
- **Activity Monitor**: Monitor system resources
- **Login Items**: Manage startup applications
- **Storage Management**: Optimize storage usage

### **Linux Optimization**
- **Package Management**: Update and clean packages
- **System Monitoring**: Monitor system resources
- **Service Management**: Manage system services
- **Kernel Optimization**: Optimize kernel parameters

## 🔒 Security Configuration

### **User Accounts**
- **Administrator Accounts**: Manage admin privileges
- **Standard Accounts**: Create limited user accounts
- **Guest Accounts**: Configure guest access
- **Password Policies**: Set password requirements

### **Firewall Configuration**
- **Windows Firewall**: Configure Windows firewall
- **Third-party Firewalls**: Install additional protection
- **Network Security**: Secure network connections
- **Application Permissions**: Manage app permissions

### **Antivirus Software**
- **Windows Defender**: Built-in Windows protection
- **Third-party Antivirus**: Install additional protection
- **Real-time Protection**: Enable real-time scanning
- **Scheduled Scans**: Configure automatic scans

### **Updates and Patches**
- **Automatic Updates**: Enable automatic updates
- **Manual Updates**: Install updates manually
- **Security Patches**: Apply security updates
- **Driver Updates**: Keep drivers updated

## 💾 Backup and Recovery

### **Backup Strategies**
- **Full Backup**: Complete system backup
- **Incremental Backup**: Backup changes only
- **Differential Backup**: Backup since last full backup
- **System Image**: Complete system image

### **Backup Tools**
- **Windows Backup**: Built-in Windows backup
- **Time Machine**: macOS backup solution
- **rsync**: Linux backup tool
- **Third-party Tools**: Additional backup software

### **Recovery Procedures**
- **System Restore**: Restore to previous state
- **Recovery Mode**: Boot into recovery environment
- **Safe Mode**: Boot with minimal drivers
- **Clean Install**: Fresh operating system installation

### **Data Recovery**
- **File Recovery**: Recover deleted files
- **Partition Recovery**: Recover lost partitions
- **Professional Recovery**: Use professional services
- **Prevention**: Implement backup strategies

## 🛠️ System Maintenance

### **Regular Maintenance Tasks**
- **Disk Cleanup**: Remove temporary files
- **Update Installation**: Install system updates
- **Driver Updates**: Update device drivers
- **Security Scans**: Run security scans

### **Performance Monitoring**
- **System Monitoring**: Monitor system performance
- **Resource Usage**: Track resource consumption
- **Performance Logs**: Review performance logs
- **Optimization**: Apply performance optimizations

### **Troubleshooting Tools**
- **Event Viewer**: Review system events
- **System Information**: View system details
- **Command Line Tools**: Use command line utilities
- **Diagnostic Tools**: Run system diagnostics

## 📊 Performance Optimization

### **Windows Performance**
- **Visual Effects**: Adjust visual effects
- **Power Settings**: Optimize power configuration
- **Startup Optimization**: Optimize startup process
- **Memory Management**: Optimize memory usage

### **macOS Performance**
- **Activity Monitor**: Monitor system resources
- **Storage Optimization**: Optimize storage usage
- **Background Processes**: Manage background processes
- **Energy Settings**: Optimize energy usage

### **Linux Performance**
- **Process Management**: Manage system processes
- **Memory Optimization**: Optimize memory usage
- **Disk I/O**: Optimize disk performance
- **Network Optimization**: Optimize network performance

## 🎯 Learning Outcomes

By the end of this module, students will be able to:
- Install and configure Windows, macOS, and Linux operating systems
- Manage device drivers and system updates effectively
- Troubleshoot operating system issues and errors
- Optimize system performance and stability
- Implement backup and recovery procedures
- Configure user accounts and security settings
- Perform system maintenance and optimization tasks

This module provides comprehensive skills for operating system management, emphasizing proper procedures, security, and optimization techniques.
        `
      }
    },
    {
      id: 18,
      title: 'Quiz: Operating System Installation (Module 8)',
      duration: '15 min',
      type: 'quiz',
      content: {
        questions: [
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
            question: 'Which key is used to access Safe Mode in Windows?',
            options: [
              'F2',
              'F8',
              'F12',
              'Delete'
            ],
            correct: 1,
            explanation: 'F8 is used to access Safe Mode in Windows, though in newer versions it may require additional steps.'
          },
          {
            question: 'What is the primary backup tool for macOS?',
            options: [
              'Windows Backup',
              'Time Machine',
              'rsync',
              'Clonezilla'
            ],
            correct: 1,
            explanation: 'Time Machine is the built-in backup solution for macOS that automatically backs up system and user data.'
          },
          {
            question: 'What should you do before installing a new operating system?',
            options: [
              'Nothing, just install it',
              'Backup all important data',
              'Format the hard drive',
              'Update the BIOS'
            ],
            correct: 1,
            explanation: 'Always backup all important data before installing a new operating system to prevent data loss.'
          },
          {
            question: 'What is the purpose of Device Manager in Windows?',
            options: [
              'To manage user accounts',
              'To manage and update device drivers',
              'To manage network connections',
              'To manage system updates'
            ],
            correct: 1,
            explanation: 'Device Manager is used to manage and update device drivers, view hardware status, and troubleshoot device issues.'
          },
          {
            question: 'Which Linux distribution is known for being user-friendly?',
            options: [
              'CentOS',
              'Ubuntu',
              'Fedora',
              'Debian'
            ],
            correct: 1,
            explanation: 'Ubuntu is known for being user-friendly and is one of the most popular Linux distributions for beginners.'
          },
          {
            question: 'What is the purpose of System Restore in Windows?',
            options: [
              'To backup files',
              'To restore the system to a previous state',
              'To reinstall Windows',
              'To update drivers'
            ],
            correct: 1,
            explanation: 'System Restore allows you to restore your computer to a previous state, undoing changes that may have caused problems.'
          },
          {
            question: 'What should you do if a driver installation fails?',
            options: [
              'Ignore the problem',
              'Try to rollback to the previous driver',
              'Replace the hardware',
              'Reinstall the operating system'
            ],
            correct: 1,
            explanation: 'If a driver installation fails, you should try to rollback to the previous driver to restore functionality.'
          },
          {
            question: 'What is the purpose of Windows Update?',
            options: [
              'To install new applications',
              'To install security patches and system updates',
              'To backup data',
              'To optimize performance'
            ],
            correct: 1,
            explanation: 'Windows Update installs security patches, system updates, and driver updates to keep the system secure and up-to-date.'
          },
          {
            question: 'What is the minimum storage requirement for Windows 10?',
            options: [
              '32 GB',
              '64 GB',
              '128 GB',
              '256 GB'
            ],
            correct: 1,
            explanation: 'Windows 10 requires a minimum of 64 GB of storage space for installation and basic operation.'
          }
        ]
      }
    }
  ]
};
