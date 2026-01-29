
import type { Module } from '@/types/course';

export const module3Troubleshooting: Module = {
  id: 3,
  title: 'Module 3: Troubleshooting and Diagnostics',
  description: 'Develop systematic troubleshooting approaches for computer and laptop issues, including POST diagnostics, hardware problem identification, and software troubleshooting techniques.',
  learningObjectives: [
    'Understand the POST (Power-On Self-Test) process and diagnostic codes',
    'Identify common hardware and software problems systematically',
    'Use diagnostic tools and software for problem identification',
    'Apply logical troubleshooting methodologies',
    'Interpret error messages and diagnostic information',
    'Develop customer communication skills for problem diagnosis',
    'Create effective repair plans based on diagnostic findings'
  ],
  lessons: [
    {
      id: 3,
      title: 'Systematic Troubleshooting and Diagnostics',
      duration: '75 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/mPzcsU8Cpco',
        textContent: `
# 🔍 Module 3: Troubleshooting and Diagnostics

This module provides comprehensive training in systematic troubleshooting approaches for computer and laptop issues. Students will learn to identify problems through logical diagnostic processes, interpret error messages, and develop effective repair strategies.

## 🚀 Understanding the POST Process

### **What is POST?**
Power-On Self-Test (POST) is a diagnostic testing sequence performed by firmware during the boot process to verify that hardware components are functioning correctly.

### **POST Sequence Steps**
1. **CPU Test**: Verifies processor functionality
2. **Memory Test**: Checks RAM integrity and capacity
3. **BIOS/UEFI Initialization**: Loads firmware settings
4. **Hardware Detection**: Identifies connected devices
5. **Boot Device Selection**: Determines boot priority
6. **Operating System Loading**: Transfers control to OS

### **Common POST Error Codes**
- **1-3 beeps**: Memory issues
- **4-7 beeps**: Motherboard problems
- **8-11 beeps**: Display/graphics issues
- **Continuous beeping**: Power supply problems

## 🔧 Systematic Troubleshooting Methodology

### **The 6-Step Troubleshooting Process**

#### **Step 1: Identify the Problem**
- Gather information from the customer
- Observe symptoms and error messages
- Document the issue clearly
- Determine if it's hardware or software related

#### **Step 2: Establish a Theory**
- Consider common causes for the symptoms
- Research known issues for the specific hardware/software
- Formulate a hypothesis about the root cause
- Prioritize theories based on likelihood

#### **Step 3: Test the Theory**
- Use diagnostic tools to verify the theory
- Perform specific tests to confirm or rule out causes
- Document test results and findings
- Adjust theory if necessary

#### **Step 4: Establish a Plan**
- Develop a step-by-step repair plan
- Identify required tools and replacement parts
- Estimate repair time and cost
- Communicate plan to customer

#### **Step 5: Implement the Solution**
- Execute the repair plan systematically
- Test each step to ensure progress
- Document all changes made
- Verify the solution resolves the problem

#### **Step 6: Verify and Document**
- Test the system thoroughly
- Ensure all functions work correctly
- Document the final solution
- Provide customer with maintenance recommendations

## 🖥️ Hardware Troubleshooting

### **Power Issues**
- **No Power**: Check power supply, cables, and wall outlet
- **Intermittent Power**: Test power supply under load
- **Overheating**: Clean dust, check fans, verify thermal paste
- **Random Shutdowns**: Monitor temperatures, check power supply stability

### **Display Problems**
- **No Display**: Test with external monitor, check graphics card
- **Distorted Display**: Update drivers, check cable connections
- **Flickering**: Test refresh rates, check for interference
- **Dead Pixels**: Use pixel testing software, consider warranty

### **Storage Issues**
- **Slow Performance**: Check for fragmentation, run disk cleanup
- **Corrupted Data**: Use CHKDSK, consider data recovery
- **Boot Failures**: Check boot order, repair boot sector
- **Bad Sectors**: Run disk diagnostics, consider replacement

### **Memory Problems**
- **System Crashes**: Run memory diagnostics, test individual modules
- **Performance Issues**: Check memory usage, verify dual-channel setup
- **POST Errors**: Reseat memory modules, test in different slots
- **Blue Screen Errors**: Update drivers, check for compatibility

## 💻 Software Troubleshooting

### **Operating System Issues**
- **Boot Failures**: Use recovery options, repair boot configuration
- **Slow Performance**: Check startup programs, optimize system
- **Driver Conflicts**: Update or rollback drivers, check compatibility
- **Registry Problems**: Use registry cleaners, restore from backup

### **Application Problems**
- **Crashes**: Check system requirements, update applications
- **Compatibility Issues**: Use compatibility mode, check dependencies
- **Performance Issues**: Monitor resource usage, optimize settings
- **Installation Failures**: Check permissions, verify system requirements

### **Network Connectivity**
- **No Internet**: Check physical connections, reset network devices
- **Slow Connection**: Test bandwidth, check for interference
- **DNS Issues**: Flush DNS cache, change DNS servers
- **Firewall Problems**: Check firewall settings, verify antivirus

## 🛠️ Diagnostic Tools and Software

### **Hardware Diagnostics**
- **MemTest86**: Memory testing and validation
- **CrystalDiskInfo**: Hard drive health monitoring
- **CPU-Z**: System information and component details
- **HWiNFO**: Comprehensive hardware analysis
- **Prime95**: CPU stress testing
- **FurMark**: GPU stress testing

### **Software Diagnostics**
- **Windows Event Viewer**: System and application logs
- **Task Manager**: Process and performance monitoring
- **Resource Monitor**: Detailed system resource analysis
- **System File Checker**: Windows system file verification
- **DISM**: Windows image repair and maintenance

### **Network Diagnostics**
- **Ping**: Basic connectivity testing
- **Tracert**: Network path analysis
- **Ipconfig**: Network configuration display
- **Netstat**: Network connection monitoring
- **Wireshark**: Network packet analysis

## 📊 Problem Identification Techniques

### **Visual Inspection**
- Check for physical damage
- Look for loose connections
- Identify overheating components
- Notice unusual sounds or smells

### **Performance Monitoring**
- Monitor CPU, memory, and disk usage
- Track temperature readings
- Analyze network performance
- Check application response times

### **Error Analysis**
- Interpret error messages
- Check system logs
- Analyze crash dumps
- Review application logs

### **Component Testing**
- Test components individually
- Use known-good parts for comparison
- Perform stress tests
- Verify compatibility

## 🗣️ Customer Communication

### **Information Gathering**
- Ask specific questions about symptoms
- Document customer observations
- Understand usage patterns
- Identify recent changes

### **Problem Explanation**
- Use non-technical language
- Explain diagnostic findings
- Provide repair options
- Set realistic expectations

### **Solution Communication**
- Explain the repair process
- Provide time and cost estimates
- Discuss preventive measures
- Offer maintenance recommendations

## 📋 Documentation and Record Keeping

### **Problem Documentation**
- Record symptoms and error messages
- Document diagnostic steps taken
- Note test results and findings
- Track time spent on troubleshooting

### **Solution Documentation**
- Document the final solution
- Record parts replaced or repaired
- Note any special procedures used
- Create customer maintenance guide

### **Knowledge Base**
- Build a troubleshooting database
- Share solutions with team members
- Update procedures based on experience
- Maintain current technical information

## 🎯 Advanced Troubleshooting Techniques

### **Logical Analysis**
- Use deductive reasoning
- Eliminate possibilities systematically
- Consider multiple failure points
- Apply Occam's Razor principle

### **Pattern Recognition**
- Identify recurring problems
- Recognize common failure modes
- Understand component lifecycles
- Predict potential issues

### **Root Cause Analysis**
- Determine underlying causes
- Prevent problem recurrence
- Improve system reliability
- Reduce future repair needs

## 🔮 Preventive Maintenance

### **Regular Maintenance Tasks**
- Clean dust and debris
- Update software and drivers
- Check system temperatures
- Monitor component health

### **Performance Optimization**
- Defragment hard drives
- Clean temporary files
- Optimize startup programs
- Update security software

### **Backup Strategies**
- Regular data backups
- System restore points
- Image backups
- Cloud storage solutions

## 📚 Learning Outcomes

By the end of this module, students will be able to:
- Apply systematic troubleshooting methodologies
- Interpret POST codes and error messages
- Use diagnostic tools effectively
- Identify hardware and software problems
- Communicate effectively with customers
- Document troubleshooting procedures
- Implement preventive maintenance strategies

This module provides the foundation for professional computer repair work, emphasizing logical problem-solving approaches and effective customer communication skills.
        `
      }
    },
    {
      id: 13,
      title: 'Quiz: Troubleshooting and Diagnostics (Module 3)',
      duration: '15 min',
      type: 'quiz',
      content: {
        questions: [
          {
            question: 'What does POST stand for in computer diagnostics?',
            options: [
              'Power-On System Test',
              'Power-On Self-Test',
              'Processor Operating System Test',
              'Primary Operating System Test'
            ],
            correct: 1,
            explanation: 'POST stands for Power-On Self-Test, which is a diagnostic testing sequence performed by firmware during the boot process.'
          },
          {
            question: 'What is the first step in the systematic troubleshooting process?',
            options: [
              'Test the theory',
              'Identify the problem',
              'Establish a plan',
              'Implement the solution'
            ],
            correct: 1,
            explanation: 'The first step is to identify the problem by gathering information, observing symptoms, and documenting the issue clearly.'
          },
          {
            question: 'Which tool is best for testing memory modules?',
            options: [
              'CrystalDiskInfo',
              'MemTest86',
              'CPU-Z',
              'HWiNFO'
            ],
            correct: 1,
            explanation: 'MemTest86 is specifically designed for memory testing and validation, making it the best tool for testing RAM modules.'
          },
          {
            question: 'What do 1-3 beeps typically indicate during POST?',
            options: [
              'Power supply problems',
              'Memory issues',
              'Motherboard problems',
              'Display/graphics issues'
            ],
            correct: 1,
            explanation: '1-3 beeps during POST typically indicate memory-related problems, such as faulty RAM modules or incorrect memory configuration.'
          },
          {
            question: 'Which Windows tool can help repair system files?',
            options: [
              'Task Manager',
              'System File Checker',
              'Event Viewer',
              'Resource Monitor'
            ],
            correct: 1,
            explanation: 'System File Checker (SFC) is a Windows utility that can scan and repair corrupted system files.'
          },
          {
            question: 'What should you do first when troubleshooting a "no power" issue?',
            options: [
              'Replace the power supply',
              'Check power supply, cables, and wall outlet',
              'Test the motherboard',
              'Check the CPU'
            ],
            correct: 1,
            explanation: 'When troubleshooting a "no power" issue, start with the basics: check the power supply, cables, and wall outlet before assuming hardware failure.'
          },
          {
            question: 'Which diagnostic tool provides comprehensive hardware analysis?',
            options: [
              'CPU-Z',
              'HWiNFO',
              'CrystalDiskInfo',
              'MemTest86'
            ],
            correct: 1,
            explanation: 'HWiNFO provides comprehensive hardware analysis, including detailed information about all system components.'
          },
          {
            question: 'What is the purpose of stress testing in troubleshooting?',
            options: [
              'To make the computer faster',
              'To identify components that fail under load',
              'To clean the system',
              'To update drivers'
            ],
            correct: 1,
            explanation: 'Stress testing helps identify components that fail under load, revealing problems that may not appear during normal operation.'
          },
          {
            question: 'Which command can help diagnose network connectivity issues?',
            options: [
              'ipconfig',
              'ping',
              'tracert',
              'All of the above'
            ],
            correct: 3,
            explanation: 'All three commands (ipconfig, ping, and tracert) are useful for diagnosing network connectivity issues.'
          },
          {
            question: 'What should you document during troubleshooting?',
            options: [
              'Only the final solution',
              'Symptoms, diagnostic steps, test results, and the solution',
              'Only the customer complaints',
              'Only the parts replaced'
            ],
            correct: 1,
            explanation: 'Complete documentation should include symptoms, diagnostic steps taken, test results, and the final solution for future reference.'
          }
        ]
      }
    }
  ]
};
