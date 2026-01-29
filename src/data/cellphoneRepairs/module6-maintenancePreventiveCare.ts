
import type { Module } from '@/types/course';

export const module6MaintenancePreventiveCare: Module = {
  id: 6,
  title: 'Maintenance and Preventive Care',
  description: 'Learn essential maintenance techniques and customer education strategies to extend smartphone lifespan through proper charging habits, cleaning procedures, firmware updates, and preventive care practices.',
  lessons: [
    {
      id: 25,
      title: 'Extending Phone Lifespan: Proper Charging Habits, Cleaning Ports, and Protective Cases',
      duration: '35 min',
      type: 'video',
      content: {
        videoUrl: 'SA5XSi5SHMo',
        textContent: `
          ## Extending Phone Lifespan: Proper Charging Habits, Cleaning Ports, and Protective Cases

          **Course Objective:** By the end of this course, learners will:
          - Understand how daily habits affect the health and longevity of a smartphone
          - Learn best practices for charging and power management
          - Gain skills in cleaning and maintaining external hardware like ports and buttons
          - Understand how protective accessories like cases and screen guards can prevent physical damage

          🔹 **1. Introduction: Why Lifespan Matters**

          Smartphones are a significant financial investment and essential to daily life. Extending the lifespan of a phone delays the need for costly repairs or replacements. Preventive care, like proper charging and maintenance, is the simplest and most cost-effective way to ensure a phone continues to function smoothly for years.

          🔹 **2. Proper Charging Habits**

          Battery health is one of the most crucial factors in extending phone life. Lithium-ion batteries, commonly used in smartphones, degrade over time due to heat, charge cycles, and improper charging practices.

          **🔸 a) General Guidelines**
          - **Avoid 0% and 100% extremes:** Keeping a battery between 20%–80% improves longevity. Deep discharges and overcharging stress the battery
          - **Charge in short bursts:** It's healthier to charge occasionally during the day than to let the battery fully drain
          - **Unplug once fully charged:** Frequent overcharging—especially overnight—can create heat and accelerate chemical aging
          - **Avoid fast charging unless necessary:** Fast charging generates more heat, which can degrade battery cells faster
          - **Don't use the phone while charging:** It generates excess heat and can strain the battery

          **🔸 b) Use Certified Charging Equipment**
          - Use original or manufacturer-approved chargers and cables
          - Avoid cheap third-party chargers—they may deliver unstable voltage or overheat, risking fire or component failure

          **🔸 c) Be Mindful of Charging Conditions**
          - Avoid charging in hot environments. Heat is the battery's worst enemy
          - Remove the case during charging if the phone heats up
          - Keep the device in a well-ventilated, flat surface during charging

          🔹 **3. Cleaning Ports and Openings**

          Ports are vulnerable to dust, debris, and moisture, which can lead to poor connectivity or complete failure of charging and audio functions.

          **🔸 a) Common Problems from Dirty Ports**
          - Loose charging connections
          - Intermittent charging
          - Headphone jack malfunction
          - Microphone/speaker issues
          - Overheating or corrosion from moisture

          **🔸 b) Cleaning Tools and Techniques**
          - Use anti-static brushes to gently remove dust
          - Compressed air (used carefully) can blow out debris
          - A wooden or plastic toothpick can help dislodge lint in the charging port
          - Never use metal tools—they can short circuits or damage connectors
          - Clean speaker grills and mic holes with a soft brush or specialized vacuum tools
          - For liquid damage or corrosion, use isopropyl alcohol (90% or higher) on a soft brush (only if trained)

          **🔸 c) Frequency of Cleaning**
          - Light cleaning every 2–4 weeks is ideal
          - Deep cleaning should be done during check-ups or if port issues arise

          🔹 **4. Using Protective Cases and Screen Protectors**

          Physical protection is critical in extending a device's usable life, particularly for avoiding drops, scratches, and water ingress.

          **🔸 a) Types of Phone Cases**
          - **Basic cases:** Thin and stylish, but provide limited protection
          - **Rugged cases:** Offer drop protection, impact absorption, and may be water-resistant
          - **Wallet/flip cases:** Cover both screen and back, offering all-around protection

          Choose cases that:
          - Do not interfere with ports, signals, or wireless charging
          - Offer raised edges to protect the screen from face-down drops

          **🔸 b) Screen Protectors**
          - **Tempered glass:** Best for drop and scratch protection, easy to apply and replace
          - **Plastic film:** Offers scratch resistance, less effective against impact

          **🔸 c) Best Practices**
          - Replace screen protectors once cracked
          - Clean the inside of your case occasionally to avoid grit scratching the phone body
          - Avoid cases that trap heat or block air flow, especially while charging

          🔹 **5. Summary and Customer Advice**

          To extend a phone's lifespan:
          - Maintain a healthy battery by charging it properly
          - Clean ports and external components regularly using safe tools
          - Use protective cases and tempered glass to prevent physical damage
          - Educate users on these habits and encourage regular maintenance

          These practices not only extend hardware life but also preserve performance, reduce repair costs, and keep smartphones running at optimal health.
        `
      }
    },
    {
      id: 26,
      title: 'Identifying and Updating Firmware to Resolve Software Issues',
      duration: '40 min',
      type: 'video',
      content: {
        videoUrl: '',
        textContent: `
          ## Identifying and Updating Firmware to Resolve Software Issues

          **Course Objective:** By the end of this course, students will be able to:
          - Understand what firmware is and its role in smartphones
          - Identify common software-related issues caused by outdated or corrupted firmware
          - Learn proper procedures for safely updating firmware on both iOS and Android devices
          - Use tools and techniques to diagnose and solve firmware-related problems

          🔹 **1. Introduction: What is Firmware?**

          Firmware is the low-level software embedded into hardware components that enables them to function. Unlike regular apps or the operating system interface, firmware interacts directly with the device's processor, sensors, memory, and peripherals to control how they behave.

          In smartphones, firmware includes:
          - Bootloader
          - Modem/Baseband firmware (controls signals, calls, data)
          - Touchscreen drivers
          - Camera firmware
          - Battery/power management

          Firmware updates are often bundled with system updates to fix bugs, improve performance, patch security flaws, or support new features.

          🔹 **2. Common Firmware-Related Issues**

          Outdated, buggy, or corrupted firmware can lead to many problems that appear hardware-related but are actually software-based.

          **🔸 a) Android and iOS Common Issues:**
          - Sudden reboots or boot loops
          - Freezing or crashing apps
          - Connectivity failures (Wi-Fi, Bluetooth, SIM)
          - Poor battery performance or fast drain
          - Touchscreen unresponsiveness
          - Inconsistent audio or sensor malfunctions
          - Cameras not opening or failing to focus

          **🔸 b) How to Identify Firmware Issues**
          - Perform a basic software reset. If issues persist, it might not be just an app or memory issue
          - Check for system updates. Phones often receive performance and bug fixes via OTA (Over-the-Air) updates
          - Use diagnostic tools or built-in self-checks:
            - **Android:** Device Care, Samsung Members, MTK Droid Tools
            - **iOS:** Apple Diagnostics, 3uTools (for PC-based checks)
          - Check version information and compare current firmware version to manufacturer's official release list

          🔹 **3. Firmware Update Methods**

          **🔸 a) For Android Devices**

          **1. OTA (Over-the-Air) Update**
          - Navigate to Settings > System > Software Update
          - Requires internet connection and sufficient battery (>50%)
          - Safest and most common method

          **2. Manual Update Using PC Tools**
          - Download official firmware from manufacturer website
          - Use tools like:
            - Samsung Odin Tool
            - SP Flash Tool (for MediaTek devices)
            - Xiaomi MiFlash
          - Flash the firmware following step-by-step guidance
          - Always match the correct model and region code to avoid bricking

          **3. Custom Recovery (Advanced Users)**
          - Tools like TWRP allow manual firmware installation
          - Only for advanced users due to high risk of errors or loss of warranty

          **🔸 b) For iOS Devices**

          **1. OTA Update**
          - Navigate to Settings > General > Software Update
          - Apple verifies device model and provides correct firmware

          **2. Update via iTunes/Finder (PC/Mac)**
          - Connect device to computer
          - Open iTunes or Finder, select device
          - Choose Update to install the latest iOS without deleting data
          - Choose Restore to erase and install a fresh version

          **3. DFU (Device Firmware Update) Mode**
          - Used when the device is unresponsive or stuck in boot loop
          - Requires exact firmware version (.ipsw file) from Apple
          - Use tools like 3uTools to simplify the process

          🔹 **4. Pre-Update and Post-Update Best Practices**

          **🔸 Before Updating Firmware:**
          - Back up all user data (cloud or local PC)
          - Ensure the device has enough storage space
          - Charge the battery to at least 50–80%
          - Confirm network stability (for OTA updates)

          **🔸 After Updating:**
          - Restart the phone
          - Test for improvements or reoccurrence of the issue
          - Reconfigure settings if reset was performed
          - Monitor performance, battery, and connectivity

          🔹 **5. Tools for Firmware Analysis and Repair**

          | Tool Name | Platform | Use Case |
          |-----------|----------|----------|
          | Odin | Android (Samsung) | Flash stock firmware manually |
          | SP Flash Tool | Android (MTK) | Flash ROMs and recovery |
          | 3uTools | iOS | Firmware info, restore, DFU, flash |
          | iTunes/Finder | iOS | Update or restore firmware |
          | MTK Droid Tools | Android | Backup/restore MTK-based devices |

          🔹 **6. Customer Education**

          Technicians should teach clients:
          - Why updates are important: security, stability, performance
          - How to regularly check for updates
          - Not to ignore update prompts
          - Risks of rooting/jailbreaking (void warranty, firmware corruption)
          - To back up regularly in case updates fail

          🔹 **7. Summary**

          Firmware is the unseen layer that enables all phone components to function properly. Diagnosing and updating firmware is an essential repair skill that can resolve many software-related issues. Whether you're using OTA, iTunes, Odin, or DFU tools, it's critical to follow proper procedures to ensure updates are performed safely. By also educating customers on the importance of firmware updates, technicians can help prevent many avoidable issues and improve long-term device health.
        `
      }
    },
    {
      id: 28,
      title: 'Cleaning Ports and Connectors',
      duration: '20 min',
      type: 'video',
      content: {
        videoUrl: '7lml_eXqx-M',
        textContent: `
## Professional Port Cleaning Techniques

Proper port maintenance is essential for preventing connectivity issues and extending device lifespan.

### Common Port Types:
- **Lightning/USB-C Charging Ports** - Most prone to debris accumulation
- **Headphone Jacks** - Less common but still require maintenance
- **SIM Card Slots** - Dust and moisture entry points
- **Speaker/Microphone Grilles** - Audio quality maintenance

### Cleaning Tools and Materials:
- **Compressed Air** - First line of defense for loose debris
- **Soft-bristled Brushes** - Gentle scrubbing action
- **Plastic Picks** - Safe for delicate contacts
- **Isopropyl Alcohol** - Cleaning solution for residue
- **Cotton Swabs** - Precision cleaning tool

### Professional Cleaning Process:
1. **Power Down Device** - Ensure complete shutdown
2. **Initial Assessment** - Check for visible debris or damage
3. **Gentle Air Cleaning** - Remove loose particles first
4. **Mechanical Cleaning** - Use appropriate tools for stubborn debris
5. **Chemical Cleaning** - Apply isopropyl alcohol if needed
6. **Final Inspection** - Verify cleanliness and functionality

### Prevention Tips:
- Regular maintenance schedules
- Proper storage practices
- Use of port covers when available
- Customer education on proper usage

Regular port cleaning prevents costly repairs and maintains optimal device performance.`
      }
    },
    {
      id: 29,
      title: 'Screen Protectors and Protective Cases',
      duration: '25 min',
      type: 'video',
      content: {
        videoUrl: '8ixSuBoPaoY',
        textContent: `
## Protective Accessories: Installation and Maintenance

Professional installation of protective accessories ensures maximum protection and customer satisfaction.

### Screen Protector Types:
- **Tempered Glass** - Superior protection and clarity
- **PET Film** - Basic scratch protection
- **Privacy Screens** - Visual privacy with protection
- **Anti-Glare** - Reduces reflections

### Installation Process:
1. **Surface Preparation** - Clean screen thoroughly
2. **Dust Removal** - Use lint-free cloths and alcohol
3. **Alignment** - Position protector accurately
4. **Application** - Smooth application without bubbles
5. **Final Inspection** - Check edges and touch response

### Case Categories:
- **Slim Cases** - Minimal bulk with basic protection
- **Rugged Cases** - Maximum impact protection
- **Wallet Cases** - Combined protection and storage
- **Battery Cases** - Extended power with protection

### Professional Benefits:
- Proper installation techniques
- Warranty support and replacement
- Customer education on care
- Quality assurance and follow-up

Professional installation ensures optimal protection and customer satisfaction.`
      }
    },
    {
      id: 30,
      title: 'Firmware Updates and Management',
      duration: '35 min',
      type: 'video',
      content: {
        videoUrl: 'kix9nsRz7y0',
        textContent: `
## Firmware Management and Update Procedures

Proper firmware management is crucial for device security, performance, and compatibility.

### Firmware Components:
- **Operating System** - Core device functionality
- **Bootloader** - Initial startup sequence
- **Radio Firmware** - Cellular and WiFi connectivity
- **Security Patches** - Protection against vulnerabilities

### Update Methods:
- **Over-the-Air (OTA)** - Wireless updates through device settings
- **Computer-Based** - iTunes, Android tools, manufacturer software
- **Recovery Mode** - Manual firmware restoration
- **Professional Tools** - Specialized equipment for repairs

### Pre-Update Procedures:
1. **Data Backup** - Complete device backup
2. **Battery Check** - Ensure sufficient charge (>50%)
3. **Storage Space** - Verify adequate free space
4. **Network Stability** - Reliable internet connection
5. **Compatibility Check** - Verify update compatibility

### Troubleshooting Common Issues:
- **Update Failures** - Recovery mode restoration
- **Boot Loops** - DFU mode recovery
- **Performance Issues** - Factory reset procedures
- **Compatibility Problems** - Downgrade considerations

### Android-Specific Updates:
- **Manufacturer Variations** - Brand-specific update tools
- **Unlocked Bootloaders** - Custom firmware options
- **Security Patches** - Regular monthly updates
- **Version Fragmentation** - Device-specific limitations

### iPhone-Specific Updates:
- **iTunes/Finder** - Computer-based update management
- **DFU Mode** - Deep firmware restoration
- **Beta Versions** - Developer and public beta participation
- **Jailbreak Considerations** - Impact on updates

Professional firmware management ensures device security and optimal performance.`
      }
    },
    {
      id: 31,
      title: 'Firmware-Related Issues and Solutions',
      duration: '30 min',
      type: 'video',
      content: {
        videoUrl: '30on78zEuB4',
        textContent: `
## Diagnosing and Resolving Firmware Issues

Firmware problems can cause various device malfunctions requiring specific diagnostic and repair approaches.

### Common Firmware Issues:
- **Boot Loops** - Device restarts continuously
- **Black Screen** - Display issues after updates
- **App Crashes** - Software instability
- **Performance Degradation** - Slow operation
- **Connectivity Problems** - Network and Bluetooth issues

### Diagnostic Procedures:
1. **Symptom Analysis** - Identify specific behavior patterns
2. **Update History** - Check recent firmware changes
3. **Safe Mode Testing** - Boot with minimal software
4. **Log Analysis** - Review system error logs
5. **Hardware Testing** - Rule out physical damage

### Resolution Methods:
- **Factory Reset** - Clean software installation
- **Recovery Mode** - System restoration options
- **DFU/Download Mode** - Deep firmware restoration
- **Professional Tools** - Specialized firmware repair
- **Component Replacement** - Hardware-related issues

### Prevention Strategies:
- Regular backup procedures
- Staged update deployment
- Beta testing participation
- Professional update services
- Customer education programs

Proper firmware troubleshooting prevents data loss and ensures device reliability.`
      }
    },
    {
      id: 32,
      title: 'Android Firmware Updates',
      duration: '25 min',
      type: 'video',
      content: {
        videoUrl: 'xuV5-v91IUA',
        textContent: `
## Android-Specific Firmware Management

Android devices require specialized knowledge due to manufacturer variations and fragmentation.

### Android Update Sources:
- **Google** - Pixel devices and AOSP
- **Samsung** - One UI and security patches
- **Xiaomi** - MIUI customizations
- **OnePlus** - OxygenOS updates
- **Manufacturer-Specific** - Brand customizations

### Update Tools and Methods:
- **OTA Updates** - Built-in system updates
- **Android Debug Bridge (ADB)** - Command-line tools
- **Fastboot** - Bootloader interface
- **Odin (Samsung)** - Manufacturer-specific tool
- **Mi Flash Tool (Xiaomi)** - Brand-specific utility

### Recovery Options:
- **Stock Recovery** - Basic reset and update options
- **Custom Recovery (TWRP)** - Advanced restoration features
- **Download Mode** - Firmware flashing interface
- **Emergency Recovery** - Hardware button combinations

### Troubleshooting Android Issues:
- **Bootloader Unlocking** - Enable custom firmware
- **Root Access** - System-level modifications
- **Custom ROMs** - Alternative firmware options
- **Magisk Modules** - System modifications

Professional Android firmware management requires brand-specific knowledge and tools.`
      }
    },
    {
      id: 33,
      title: 'iPhone Firmware Updates',
      duration: '25 min',
      type: 'video',
      content: {
        videoUrl: 'PBoCw4TyCxE',
        textContent: `
## iPhone-Specific Firmware Management

iPhone firmware updates require understanding of Apple's ecosystem and specialized procedures.

### iOS Update Methods:
- **Settings App** - Over-the-air updates
- **iTunes/Finder** - Computer-based updates
- **Recovery Mode** - System restoration
- **DFU Mode** - Device Firmware Update mode

### Apple-Specific Tools:
- **iTunes/Finder** - Primary update interface
- **Apple Configurator** - Enterprise deployment
- **3uTools** - Third-party management (unofficial)
- **Professional Diagnostics** - Apple Service Toolkit

### Recovery Procedures:
1. **Standard Recovery** - Hold home/volume and power buttons
2. **DFU Mode** - Deep firmware restoration
3. **iTunes Restoration** - Complete firmware reload
4. **Professional Recovery** - Specialized equipment

### Common iPhone Issues:
- **iOS Update Failures** - Error codes and solutions
- **Activation Lock** - iCloud security bypass
- **Jailbreak Detection** - Modified firmware identification
- **Hardware Authentication** - Component pairing issues

### Professional Considerations:
- **Component Serialization** - Parts pairing requirements
- **Security Features** - Touch ID/Face ID integration
- **Data Protection** - Encryption and privacy
- **Warranty Implications** - Service authorization

iPhone firmware management requires specialized knowledge of Apple's ecosystem and security measures.`
      }
    },
    {
      id: 27,
      title: 'Educating Customers on Routine Maintenance and Care',
      duration: '30 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/watch?v=lLH2C-pX_Nc',
        textContent: `
          ## Educating Customers on Routine Maintenance and Care

          **Course Objective:** By the end of this course, students will be able to:
          - Understand the importance of customer education in smartphone maintenance
          - Identify key areas of routine care to share with customers
          - Develop effective communication strategies to teach users best practices
          - Build trust and long-term relationships by empowering customers with knowledge

          🔹 **1. Introduction: Why Customer Education Matters**

          Smartphone users often unintentionally shorten the lifespan of their devices due to a lack of awareness about proper care and maintenance. Educating customers is a key responsibility of a professional repair technician—not only to fix problems but to prevent them. When customers understand how to care for their devices, they return less frequently with preventable issues, leading to higher satisfaction and increased loyalty.

          Routine maintenance education builds trust and enhances your reputation as a knowledgeable, customer-focused technician.

          🔹 **2. Topics to Cover with Customers**

          When educating customers, focus on practical, easy-to-understand information in these key areas:

          **🔸 a) Battery Health and Charging Habits**
          - Don't let the battery drop below 20% regularly
          - Avoid charging to 100% too often—80% is ideal
          - Use original or certified chargers to avoid damage
          - Avoid overnight charging to reduce heat stress
          - Don't use the phone while charging, especially during gaming or video playback

          **🔸 b) Cleaning and Physical Care**
          - Clean charging ports and headphone jacks with a soft brush or compressed air
          - Wipe the screen with a microfiber cloth to prevent buildup of oil and dust
          - Avoid harsh chemicals or alcohol-based cleaners unless designed for electronics
          - Keep the phone in a clean, dry environment—avoid placing it near food, liquids, or extreme heat/cold

          **🔸 c) Protective Accessories**
          - Always use a protective case and a tempered glass screen protector
          - Replace cracked protectors to avoid screen stress
          - Encourage the use of water-resistant or shockproof cases if the customer works outdoors or in rugged environments

          **🔸 d) Software and System Updates**
          - Keep the phone's software and apps up to date
          - Enable auto-updates if the user isn't tech-savvy
          - Explain that updates often improve security, battery management, and performance
          - Warn against rooting or jailbreaking as it can void warranty and invite malware

          **🔸 e) Backup and Data Safety**
          - Encourage regular backups to Google Drive, iCloud, or a computer
          - Remind them to back up before system updates or traveling
          - Help them set up auto-backup if they don't know how

          🔹 **3. How to Educate Customers Effectively**

          Teaching customers should be part of your service delivery. Use these tips to make your message clear and effective:

          **🔸 a) Keep It Simple**
          - Avoid jargon—use everyday language
          - Use real-world examples: "Charging overnight every day is like keeping your car engine running all night"

          **🔸 b) Provide Take-Home Materials**
          - Offer printed tips sheets or cards
          - Include links to your blog, videos, or tutorials on maintenance

          **🔸 c) Demonstrate During Repairs**
          - While handing the phone back after a repair, demonstrate port cleaning or show where to check for software updates

          **🔸 d) Ask and Listen**
          - Ask what they usually do with their phone. This opens up opportunities to guide them without being pushy
          - Example: If a customer says, "I always leave it on charge overnight," you can explain the long-term effects on battery life

          **🔸 e) Offer Maintenance Plans**
          - Provide monthly or quarterly check-up services (port cleaning, system update checks, battery health tests)
          - Offer discounts or loyalty programs to encourage responsible usage

          🔹 **4. Sample Scripts and Scenarios**

          **🔸 Battery Script**
          "To keep your battery healthy, try not to let it go all the way to 0% or charge past 100% every time. Charging in short bursts is actually better for the phone in the long run."

          **🔸 Port Cleaning Script**
          "Every few weeks, it's a good idea to clean out the charging port gently with a dry toothbrush or compressed air. Lint can collect there and cause charging problems."

          **🔸 Accessories Script**
          "I recommend a tempered glass screen protector and a shockproof case. They absorb impact and prevent costly screen repairs in the future."

          🔹 **5. Benefits of Customer Education**

          - Fewer repeat visits for preventable issues (saving both you and the customer time)
          - Stronger relationships built on trust and transparency
          - Word-of-mouth referrals from customers who feel cared for and informed
          - Upselling opportunities for accessories, maintenance plans, and training
          - Positioning yourself as a knowledgeable professional rather than just a technician

          🔹 **6. Summary**

          Educating customers on routine maintenance and care is just as important as performing the repair itself. Simple changes in user behavior—such as better charging habits, proper cleaning, and regular updates—can extend a phone's lifespan significantly. As a technician, your role includes helping users understand how to avoid common problems and take responsibility for the health of their devices. This not only enhances the value of your service but also contributes to better customer retention and satisfaction.

          📺 **YOUTUBE: Expert advice on how to maintain and care for your smartphone - https://youtu.be/lLH2C-pX_Nc**
        `
      }
    },
    {
      id: 28,
      title: 'Module 6 Quiz: Maintenance and Preventive Care',
      duration: '15 min',
      type: 'quiz',
      content: {
        questions: [
          {
            question: 'Which of the following charging practices helps extend battery lifespan?',
            options: [
              'Charging to 100% every time',
              'Letting the battery drop to 0% frequently',
              'Charging between 20% and 80%',
              'Keeping the phone plugged in overnight'
            ],
            correct: 2,
            explanation: 'Keeping the battery charge between 20% and 80% reduces stress on lithium-ion batteries and helps extend their lifespan by avoiding the extremes of full discharge and overcharging.'
          },
          {
            question: 'Why should customers avoid using non-certified chargers?',
            options: [
              'They charge the phone too slowly',
              'They do not fit properly',
              'They can damage internal components or battery health',
              'They don\'t look nice'
            ],
            correct: 2,
            explanation: 'Non-certified chargers can deliver unstable voltage, overheat, or provide incorrect power levels, which can damage internal components, degrade battery health, or even pose safety risks.'
          },
          {
            question: 'What tool is best for cleaning charging ports safely?',
            options: [
              'Paper clip',
              'Water and a cotton swab',
              'Compressed air or a soft brush',
              'Screwdriver'
            ],
            correct: 2,
            explanation: 'Compressed air or a soft brush are the safest tools for cleaning charging ports as they remove debris without risking damage to delicate connectors or causing short circuits.'
          },
          {
            question: 'Firmware updates can help with all of the following EXCEPT:',
            options: [
              'Improving battery performance',
              'Adding new features',
              'Cleaning the phone screen',
              'Fixing software bugs'
            ],
            correct: 2,
            explanation: 'Firmware updates are software-based improvements that can enhance performance, add features, and fix bugs, but they cannot physically clean the phone screen, which requires manual cleaning.'
          },
          {
            question: 'How can protective cases help with phone maintenance?',
            options: [
              'They prevent unauthorized access',
              'They improve signal strength',
              'They protect against drops and scratches',
              'They replace the need for cleaning'
            ],
            correct: 2,
            explanation: 'Protective cases provide physical protection against drops, impacts, and scratches, which helps prevent damage that would require costly repairs and extends the device\'s lifespan.'
          },
          {
            question: 'What is a good way to remind customers about firmware updates?',
            options: [
              'Tell them not to worry about updates',
              'Set their phones to auto-update',
              'Ask them to check once every few years',
              'Disable their notifications'
            ],
            correct: 1,
            explanation: 'Setting phones to auto-update ensures that customers receive important security patches, bug fixes, and performance improvements without having to remember to check manually.'
          },
          {
            question: 'What is the safest method to update firmware on most smartphones?',
            options: [
              'Jailbreaking the phone',
              'Over-the-Air (OTA) updates via system settings',
              'Removing the battery and reattaching it',
              'Downloading random firmware from the internet'
            ],
            correct: 1,
            explanation: 'OTA updates through system settings are the safest method as they are officially provided by the manufacturer, verified for the specific device, and include proper installation procedures.'
          },
          {
            question: 'Why is customer education important in cell phone repair?',
            options: [
              'It helps sell more expensive parts',
              'It reduces the chance of repeat visits for preventable issues',
              'It gives technicians more free time',
              'It discourages customers from asking questions'
            ],
            correct: 1,
            explanation: 'Customer education helps prevent common issues through proper care and maintenance, reducing unnecessary repeat visits while building trust and customer satisfaction.'
          },
          {
            question: 'What should a technician advise if a customer charges their phone overnight daily?',
            options: [
              'It\'s fine as long as they turn off the Wi-Fi',
              'Recommend stopping to avoid overheating and battery stress',
              'Advise replacing the battery weekly',
              'Suggest using two chargers instead'
            ],
            correct: 1,
            explanation: 'Charging overnight daily can cause overheating and battery stress from constant overcharging. It\'s better to charge in shorter bursts and unplug when the battery reaches 80-100%.'
          },
          {
            question: 'Which of the following is NOT a reason to educate customers?',
            options: [
              'Build trust and loyalty',
              'Encourage phone misuse for more repairs',
              'Promote safe usage and maintenance',
              'Prevent common, avoidable damage'
            ],
            correct: 1,
            explanation: 'Ethical technicians should never encourage phone misuse to generate more business. The goal of customer education is to help customers maintain their devices properly, build trust, and prevent avoidable damage.'
          }
        ]
      }
    }
  ]
};
