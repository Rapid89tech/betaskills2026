
import type { Module } from '@/types/course';

export const module7BiosFirmware: Module = {
  id: 7,
  title: 'Module 7: BIOS/UEFI Firmware and Configuration',
  description: 'Master BIOS/UEFI firmware troubleshooting, configuration, and updates for modern computer systems, including boot settings, hardware configuration, and security features.',
  learningObjectives: [
    'Understand BIOS/UEFI firmware fundamentals and differences',
    'Navigate and configure BIOS/UEFI settings effectively',
    'Troubleshoot boot and hardware configuration issues',
    'Update firmware safely and properly',
    'Configure security features and passwords',
    'Optimize system performance through BIOS settings',
    'Recover from firmware corruption and failures'
  ],
  lessons: [
    {
      id: 7,
      title: 'BIOS/UEFI Firmware and Configuration',
      duration: '70 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/mPzcsU8Cpco',
        textContent: `
# ⚙️ Module 7: BIOS/UEFI Firmware and Configuration

This module covers comprehensive BIOS/UEFI firmware management, including configuration, troubleshooting, updates, and recovery procedures for modern computer systems.

## 🔧 BIOS/UEFI Fundamentals

### **What is BIOS?**
BIOS (Basic Input/Output System) is firmware that initializes hardware during the boot process and provides runtime services for operating systems and programs.

### **BIOS vs UEFI**
- **BIOS**: Legacy firmware, limited to 2TB boot drives, slower boot times
- **UEFI**: Modern firmware, supports large drives, faster boot, secure boot
- **Compatibility**: UEFI can run in legacy mode for older systems

### **Firmware Components**
- **Boot Loader**: Loads operating system
- **Hardware Initialization**: Sets up hardware components
- **Configuration Interface**: User-accessible settings
- **Runtime Services**: Provides services to operating system

## 🚀 Accessing BIOS/UEFI

### **Common Access Methods**
- **F2**: Most common key for BIOS access
- **Del**: Alternative key for many systems
- **F10**: Some HP and Compaq systems
- **F12**: Boot menu access
- **Esc**: Some systems use Escape key

### **Timing Considerations**
- **Quick Boot**: May require faster key presses
- **Fast Boot**: May bypass BIOS access
- **Windows Fast Startup**: May prevent BIOS access
- **UEFI Settings**: Access through Windows recovery options

### **Troubleshooting Access Issues**
- **Disable Fast Boot**: In Windows power options
- **Use Recovery Options**: Advanced startup in Windows
- **Check Manual**: Refer to motherboard manual
- **Try Different Keys**: Different manufacturers use different keys

## ⚙️ BIOS/UEFI Configuration

### **Main Settings**
- **System Time**: Set current date and time
- **System Language**: Choose interface language
- **Boot Priority**: Set boot device order
- **Hardware Information**: View system specifications

### **Advanced Settings**
- **CPU Configuration**: CPU settings and overclocking
- **Memory Settings**: RAM timing and frequency
- **Storage Configuration**: SATA/AHCI/RAID modes
- **USB Configuration**: USB settings and legacy support

### **Boot Settings**
- **Boot Mode**: UEFI vs Legacy BIOS
- **Secure Boot**: Enable/disable secure boot
- **Fast Boot**: Enable/disable fast boot
- **Boot Device Priority**: Set boot order

### **Security Settings**
- **Administrator Password**: Set BIOS password
- **User Password**: Set user-level password
- **Secure Boot Keys**: Manage secure boot certificates
- **TPM Settings**: Trusted Platform Module configuration

## 🔍 Common Configuration Issues

### **Boot Problems**
- **Wrong Boot Device**: Check boot priority order
- **Boot Mode Mismatch**: UEFI vs Legacy compatibility
- **Secure Boot Issues**: Disable for older operating systems
- **Fast Boot Problems**: Disable for troubleshooting

### **Hardware Recognition**
- **Storage Not Detected**: Check SATA/AHCI settings
- **USB Devices Not Working**: Enable legacy USB support
- **Memory Issues**: Check memory timing settings
- **Graphics Problems**: Check graphics settings

### **Performance Issues**
- **Slow Boot Times**: Optimize boot settings
- **Poor Performance**: Check CPU and memory settings
- **Overheating**: Check fan and thermal settings
- **Power Issues**: Check power management settings

## 🔄 Firmware Updates

### **Update Preparation**
- **Backup Settings**: Document current BIOS settings
- **Check Compatibility**: Verify update is for correct model
- **Stable Power**: Ensure uninterrupted power supply
- **No Interruptions**: Don't interrupt update process

### **Update Methods**
- **BIOS Flash Utility**: Built-in update utility
- **USB Update**: Boot from USB with update file
- **Windows Update**: Some systems support Windows updates
- **Manufacturer Software**: Use manufacturer's update tool

### **Update Process**
1. **Download Update**: Get correct firmware file
2. **Verify File**: Check file integrity and compatibility
3. **Backup Settings**: Save current configuration
4. **Run Update**: Execute update utility
5. **Wait for Completion**: Don't interrupt process
6. **Restart System**: Allow system to restart
7. **Verify Update**: Check firmware version

### **Update Troubleshooting**
- **Failed Update**: May require professional recovery
- **Corrupted Firmware**: Use backup BIOS or recovery tools
- **Incompatible Update**: Verify correct firmware version
- **Power Loss**: May require motherboard replacement

## 🛡️ Security Features

### **Secure Boot**
- **Purpose**: Prevents unauthorized boot loaders
- **Configuration**: Manage secure boot keys
- **Compatibility**: May cause issues with older systems
- **Disabling**: May be needed for some operating systems

### **TPM (Trusted Platform Module)**
- **Hardware Security**: Provides hardware-based security
- **BitLocker**: Windows encryption feature
- **Configuration**: Enable/disable TPM features
- **Clearing**: Clear TPM for troubleshooting

### **Password Protection**
- **Administrator Password**: Protects BIOS settings
- **User Password**: Limits user access
- **Hard Drive Password**: Protects storage devices
- **Password Recovery**: May require motherboard reset

## 🔧 Advanced Configuration

### **CPU Settings**
- **Overclocking**: Adjust CPU frequency and voltage
- **Power Management**: Configure power saving features
- **Virtualization**: Enable/disable virtualization support
- **Thermal Management**: Configure thermal protection

### **Memory Configuration**
- **XMP Profiles**: Enable memory overclocking profiles
- **Manual Timing**: Set memory timing manually
- **Memory Frequency**: Adjust memory speed
- **Memory Voltage**: Set memory voltage

### **Storage Configuration**
- **SATA Mode**: AHCI, IDE, or RAID modes
- **NVMe Support**: Enable/disable NVMe support
- **Boot Priority**: Set storage boot order
- **Hot Plug**: Enable/disable hot plug support

### **USB Configuration**
- **Legacy USB Support**: Enable for older devices
- **USB Boot**: Enable USB boot capability
- **USB Ports**: Enable/disable specific ports
- **USB Power**: Configure USB power management

## 🚨 Troubleshooting Procedures

### **Boot Issues**
1. **Check Boot Order**: Verify correct boot device
2. **Test Boot Mode**: Try UEFI vs Legacy
3. **Disable Secure Boot**: For compatibility issues
4. **Reset to Defaults**: Load optimized defaults
5. **Check Hardware**: Verify hardware connections

### **Configuration Problems**
1. **Document Settings**: Record current configuration
2. **Reset to Defaults**: Load factory settings
3. **Update Firmware**: Install latest firmware
4. **Check Compatibility**: Verify hardware compatibility
5. **Professional Help**: Seek professional assistance

### **Recovery Procedures**
1. **Clear CMOS**: Reset BIOS to factory settings
2. **Backup BIOS**: Use backup BIOS if available
3. **Recovery Mode**: Use manufacturer recovery tools
4. **Professional Recovery**: Send for professional service

## 📊 Performance Optimization

### **Boot Optimization**
- **Fast Boot**: Enable for faster startup
- **Boot Priority**: Optimize boot device order
- **Unused Devices**: Disable unused hardware
- **Memory Training**: Optimize memory initialization

### **System Performance**
- **CPU Settings**: Optimize CPU configuration
- **Memory Settings**: Enable XMP profiles
- **Storage Settings**: Optimize storage configuration
- **Power Management**: Balance performance and efficiency

### **Stability Settings**
- **Voltage Settings**: Ensure stable voltages
- **Thermal Management**: Configure thermal protection
- **Fan Control**: Optimize cooling performance
- **Error Reporting**: Enable error reporting features

## ⚠️ Safety Considerations

### **Update Safety**
- **Stable Power**: Ensure uninterrupted power during updates
- **No Interruptions**: Don't interrupt update process
- **Correct Firmware**: Verify correct firmware version
- **Backup Plan**: Have recovery plan ready

### **Configuration Safety**
- **Document Changes**: Record all configuration changes
- **Test Settings**: Test changes before saving
- **Backup Settings**: Save configuration before changes
- **Gradual Changes**: Make changes incrementally

### **Recovery Preparation**
- **Backup BIOS**: Use backup BIOS if available
- **Recovery Tools**: Have recovery tools ready
- **Professional Support**: Know when to seek help
- **Warranty Consideration**: Check warranty coverage

## 📋 Best Practices

### **Configuration Management**
- **Document Settings**: Keep records of all settings
- **Test Changes**: Test configuration changes
- **Backup Configurations**: Save working configurations
- **Version Control**: Track firmware versions

### **Update Management**
- **Regular Updates**: Keep firmware updated
- **Compatibility Testing**: Test updates before deployment
- **Rollback Plan**: Have rollback procedures ready
- **Change Management**: Document all updates

### **Troubleshooting Approach**
- **Systematic Testing**: Test changes methodically
- **Documentation**: Record all troubleshooting steps
- **Customer Communication**: Keep customers informed
- **Professional Referral**: Know when to refer to specialists

## 🎯 Learning Outcomes

By the end of this module, students will be able to:
- Understand BIOS/UEFI firmware fundamentals and differences
- Navigate and configure BIOS/UEFI settings effectively
- Troubleshoot boot and hardware configuration issues
- Update firmware safely and properly
- Configure security features and passwords
- Optimize system performance through BIOS settings
- Recover from firmware corruption and failures

This module provides essential skills for BIOS/UEFI firmware management, emphasizing safety, proper procedures, and systematic troubleshooting approaches.
        `
      }
    },
    {
      id: 17,
      title: 'Quiz: BIOS/UEFI Firmware (Module 7)',
      duration: '15 min',
      type: 'quiz',
      content: {
        questions: [
          {
            question: 'What does BIOS stand for?',
            options: [
              'Basic Input/Output System',
              'Binary Input/Output System',
              'Boot Input/Output System',
              'Basic Internal Operating System'
            ],
            correct: 0,
            explanation: 'BIOS stands for Basic Input/Output System, which is firmware that initializes hardware during the boot process.'
          },
          {
            question: 'Which key is most commonly used to access BIOS?',
            options: [
              'F1',
              'F2',
              'F10',
              'Delete'
            ],
            correct: 1,
            explanation: 'F2 is the most commonly used key to access BIOS settings on most computer systems.'
          },
          {
            question: 'What is the main advantage of UEFI over traditional BIOS?',
            options: [
              'It\'s cheaper to manufacture',
              'It supports larger boot drives and faster boot times',
              'It uses less power',
              'It\'s easier to configure'
            ],
            correct: 1,
            explanation: 'UEFI supports boot drives larger than 2TB and provides faster boot times compared to traditional BIOS.'
          },
          {
            question: 'What should you do before updating BIOS firmware?',
            options: [
              'Nothing, just run the update',
              'Backup current BIOS settings and ensure stable power',
              'Format the hard drive',
              'Replace the motherboard'
            ],
            correct: 1,
            explanation: 'Before updating BIOS, you should backup current settings and ensure stable power to prevent corruption during the update.'
          },
          {
            question: 'What is Secure Boot?',
            options: [
              'A feature that prevents unauthorized boot loaders',
              'A password protection system',
              'A virus scanning feature',
              'A backup system'
            ],
            correct: 0,
            explanation: 'Secure Boot is a UEFI feature that prevents unauthorized boot loaders from running during the boot process.'
          },
          {
            question: 'What should you do if the computer won\'t boot after BIOS changes?',
            options: [
              'Replace the motherboard',
              'Reset BIOS to default settings',
              'Reinstall the operating system',
              'Replace the hard drive'
            ],
            correct: 1,
            explanation: 'If the computer won\'t boot after BIOS changes, reset the BIOS to default settings to restore functionality.'
          },
          {
            question: 'What is the purpose of XMP profiles in BIOS?',
            options: [
              'To overclock the CPU',
              'To enable memory overclocking profiles',
              'To configure USB settings',
              'To set boot priority'
            ],
            correct: 1,
            explanation: 'XMP (Extreme Memory Profile) profiles enable memory overclocking profiles for better performance.'
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
            explanation: 'If a BIOS update fails, you should use backup BIOS if available or seek professional recovery services.'
          },
          {
            question: 'What is the purpose of TPM in BIOS?',
            options: [
              'To improve boot speed',
              'To provide hardware-based security',
              'To overclock the system',
              'To manage USB devices'
            ],
            correct: 1,
            explanation: 'TPM (Trusted Platform Module) provides hardware-based security features for the system.'
          },
          {
            question: 'What should you check if storage devices are not detected?',
            options: [
              'The power supply',
              'SATA/AHCI settings in BIOS',
              'The graphics card',
              'The memory modules'
            ],
            correct: 1,
            explanation: 'If storage devices are not detected, check the SATA/AHCI settings in BIOS as this is a common cause.'
          }
        ]
      }
    }
  ]
};
