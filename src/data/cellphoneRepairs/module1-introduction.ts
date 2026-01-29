import { Module } from '@/types/course';
import { VideoLesson, QuizLesson } from '@/types/course';

const lesson1IndustryOverview: VideoLesson = {
  id: 1,
  title: 'Overview of the Smartphone Repair Industry and Career Opportunities',
  duration: '45 minutes',
  type: 'video',
  content: {
    videoUrl: '',
    textContent: `## 🔧 Overview of the Smartphone Repair Industry and Career Opportunities

The smartphone repair industry is a dynamic and rapidly expanding field, driven by the global reliance on mobile devices, escalating costs of new smartphones, and a growing emphasis on sustainability. With over 6 billion smartphone users worldwide, the demand for skilled technicians to repair issues like cracked screens, battery degradation, and software malfunctions is at an all-time high. This sector encompasses a wide range of services, including hardware repairs (e.g., replacing displays, batteries, or cameras), software troubleshooting (e.g., fixing system crashes or recovering data), and preventive maintenance to extend device lifespan. Technicians employ tools ranging from basic screwdrivers and spudgers to advanced equipment like microscopes and hot air rework stations for micro-soldering tasks. The industry is evolving with trends like foldable phones, 5G technology, and modular designs, requiring technicians to stay updated on new repair techniques.

Career opportunities are diverse and accessible. Entry-level technicians can work in local repair shops, chain stores, or mobile repair vans, earning competitive wages while gaining experience. With expertise, they can specialize in areas like motherboard repair or data recovery, command higher rates, or launch their own businesses. Entrepreneurs can scale operations by offering services to schools, businesses, or through e-commerce platforms selling refurbished devices and accessories. The industry’s low startup costs—often just a few hundred dollars for tools—make it an attractive option for aspiring business owners. Certifications like CompTIA A+ or Apple’s ACiT enhance credibility, while online platforms provide affordable training. Challenges include navigating counterfeit parts, sourcing OEM components, and adapting to proprietary designs from manufacturers like Apple. However, initiatives like Right to Repair are improving access to parts and manuals, while consumer demand for eco-friendly solutions fuels growth. Technicians who embrace continuous learning and specialize in emerging technologies, such as repairing foldable displays or AI-enabled devices, will thrive in this future-proof industry.
`
  }
};

const lesson2SafetyPrecautions: VideoLesson = {
  id: 2,
  title: 'Basic Safety Precautions and Handling Sensitive Components',
  duration: '40 minutes',
  type: 'video',
  content: {
    videoUrl: 'xe1mhUmnZwE',
    textContent: `## 🛡️ Basic Safety Precautions and Handling Sensitive Components

[https://youtu.be/xe1mhUmnZwE?si=SuPncSpqwbAzEhca](https://youtu.be/xe1mhUmnZwE?si=SuPncSpqwbAzEhca)
Safety is a cornerstone of smartphone repair, protecting technicians, devices, and customer data. Electrostatic discharge (ESD) poses a significant risk, as even a small static shock can destroy sensitive components like logic boards, integrated circuits, or flex cables. To mitigate this, technicians must use anti-static wrist straps, grounding mats, and anti-static bags for storing parts. Personal safety measures include powering off devices and disconnecting batteries before repairs, wearing protective eyewear and gloves, and working in a well-ventilated area, especially when using chemicals like isopropyl alcohol or soldering flux. A clean, organized workstation with ESD-safe surfaces, adequate lighting, and a fire extinguisher is essential. Tools like soldering irons and heat guns require precise temperature control to avoid damaging components or causing burns, and chemicals must be stored in labeled containers and disposed of according to regulations.

Handling delicate components demands meticulous care. Flex cables, connectors, and chips are prone to damage from excessive force, heat, or improper handling. Technicians should use non-conductive plastic tools, apply gentle pressure, and handle components by their edges to avoid touching circuits. Proper reassembly is critical—double-checking connections and ensuring no screws or parts are misplaced prevents costly errors. Customer data privacy is equally important; technicians must avoid accessing personal data unless necessary and obtain explicit consent for data-related tasks, such as backups or resets. A professional approach to safety builds trust, enhances repair quality, and minimizes risks like device damage or legal liabilities. By maintaining a safe workspace and adhering to best practices, technicians lay the foundation for a reliable, efficient, and reputable repair business.
`
  }
};

const lesson3SmartphoneArchitectures: VideoLesson = {
  id: 3,
  title: 'Understanding Different Smartphone Architectures (iOS, Android)',
  duration: '50 minutes',
  type: 'video',
  content: {
    videoUrl: 'tH-6cchzL5k',
    textContent: `## 📱 Basic Phone Repair Principles: iOS and Android Architecture

[https://youtu.be/tH-6cchzL5k?si=gUKPPJ2cqBFduiQ](https://youtu.be/tH-6cchzL5k?si=gUKPPJ2cqBFduiQ)
Mastering the architectural differences between iOS and Android is essential for effective smartphone repairs, as these operating systems dictate hardware compatibility, diagnostic approaches, and repair techniques. iOS, developed by Apple, is a closed-source system exclusive to iPhones, iPads, and iPod Touches. Its uniform hardware—featuring Apple’s A-series or M-series chips, proprietary connectors, and pentalobe screws—simplifies repair processes but requires specialized tools like Apple Configurator or third-party software like 3uTools for diagnostics and firmware updates. The Apple File System (APFS) and Secure Enclave ensure robust security, but features like Activation Lock can complicate repairs, especially for second-hand devices. Apple’s tight integration of hardware and software means repairs often involve navigating adhesive-heavy designs and serialized components, where mismatched parts may trigger software warnings.

Android, built on the Linux kernel, is open-source and powers a vast array of devices from manufacturers like Samsung, Xiaomi, and Google. This diversity results in varied hardware (e.g., Snapdragon, Exynos, or MediaTek processors), file systems (ext4, F2FS), and user interfaces (One UI, MIUI), requiring technicians to adapt to model-specific disassembly and software tools like Odin (Samsung) or Mi Flash (Xiaomi). Android’s flexibility allows for bootloader unlocking, custom recoveries (e.g., TWRP), and manual firmware flashing, which can aid repairs but may void warranties or trip security flags like Samsung Knox. While iOS apps are sandboxed with limited system access, Android apps can interact more freely with the system, especially on rooted devices, increasing risks of malware but simplifying certain troubleshooting tasks. Technicians must understand these ecosystems to select compatible parts, perform accurate diagnostics, and avoid issues like bricking devices or losing data, ensuring high-quality repairs across both platforms.
`
  }
};

const lesson4BasicRepairPrinciples: VideoLesson = {
  id: 4,
  title: 'Introduction to Mobile Phone Repairing Tools and Basic Repair Principles',
  duration: '35 minutes',
  type: 'video',
  content: {
    videoUrl: 'FG7R94sSSMo',
    textContent: `## 🛠️ Beginners Must-Have Phone Repair Tools

[https://youtu.be/FG7R94sSSMo?si=N_u3Uob8HFQyn-7F](https://youtu.be/FG7R94sSSMo?si=N_u3Uob8HFQyn-7F)
A well-equipped toolkit is the backbone of successful smartphone repairs, enabling beginners to tackle a wide range of tasks efficiently. Essential tools include precision screwdrivers (Phillips, pentalobe, Torx) for removing screws, spudgers and plastic opening tools for prying open casings without damage, and suction cups for lifting screens. Tweezers with fine tips are crucial for handling small components like connectors or screws, while a multimeter helps diagnose electrical issues, such as battery or charging port faults. Anti-static Wrist Straps and grounding mats prevent ESD damage, and a hot air rework station or heat gun (used at low temperatures) aids in adhesive removal and component reflow. For advanced repairs, a soldering station and magnifying microscope are necessary for micro-soldering tasks, such as repairing motherboard traces or replacing IC chips.

Software tools are equally important. Free programs like iTunes (for iOS restores) or Odin (for Android firmware flashing) support diagnostics and system recovery. Beginners should invest in a high-quality tool kit, available from online suppliers like iFixit or AliExpress, prioritizing durability and precision. A well-organized workstation with labeled storage, adequate lighting, and an ESD-safe mat enhances efficiency and safety. Tutorials and tool guides, often available online, help learners understand proper tool usage and maintenance, such as cleaning soldering tips or calibrating multimeters. By building a reliable toolkit and mastering its use, beginners can confidently perform professional-grade repairs, from simple battery swaps to complex motherboard fixes, setting the stage for a successful career.
`
  }
};

const lesson5Quiz: QuizLesson = {
  id: 5,
  title: 'Module 1 Quiz: Introduction to Cell Phone Repair',
  duration: '20 minutes',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the main objective of cell phone repair?',
        options: [
          'Sell new phones',
          'Modify hardware permanently',
          'Restore devices to proper working condition',
          'Install new software features'
        ],
        correct: 2,
        explanation: 'The main objective of cell phone repair is to restore devices to proper working condition, fixing issues and returning functionality to the device.'
      },
      {
        question: 'Which of the following is not considered a common repair issue?',
        options: [
          'Cracked screen',
          'Water damage',
          'Lost SIM card',
          'Battery failure'
        ],
        correct: 2,
        explanation: 'A lost SIM card is not a repair issue but rather a replacement item. Common repair issues include hardware problems like cracked screens, water damage, and battery failure.'
      },
      {
        question: 'What is the first step before starting any phone repair job?',
        options: [
          'Remove the screen',
          'Discharge the battery',
          'Power off the device and disconnect the battery',
          'Plug in a new charger'
        ],
        correct: 2,
        explanation: 'The first step should always be to power off the device and disconnect the battery to ensure safety and prevent electrical damage during repair.'
      },
      {
        question: 'Which of the following best describes the smartphone repair industry today?',
        options: [
          'Declining and outdated',
          'Growing and full of opportunity',
          'Illegal in most countries',
          'Only applicable to engineers'
        ],
        correct: 1,
        explanation: 'The smartphone repair industry is rapidly growing and full of opportunity due to global device dependence and environmental awareness.'
      },
      {
        question: 'Which skill is most important for becoming a successful repair technician?',
        options: [
          'Cooking',
          'Micro-soldering',
          'Hardware and software troubleshooting',
          'Public speaking'
        ],
        correct: 2,
        explanation: 'Hardware and software troubleshooting skills are fundamental for diagnosing and repairing smartphone issues effectively.'
      },
      {
        question: 'What type of damage is usually not visible from the outside of the phone?',
        options: [
          'Cracked glass',
          'Water damage to motherboard',
          'Broken button',
          'Missing back cover'
        ],
        correct: 1,
        explanation: 'Water damage to the motherboard is internal damage that cannot be seen from the outside, unlike visible damage such as cracked glass or broken buttons.'
      },
      {
        question: 'Why is it important to stay updated with new phone models and technologies?',
        options: [
          'To impress customers',
          'To compete effectively and adapt repair skills',
          'To use more expensive tools',
          'To watch more unboxing videos'
        ],
        correct: 1,
        explanation: 'Staying updated with new technologies is essential to compete effectively and adapt repair skills to new models and emerging technologies.'
      },
      {
        question: 'What is the benefit of repairing a phone instead of replacing it?',
        options: [
          'Creates e-waste',
          'Saves money and the environment',
          'Helps phone manufacturers',
          'Takes more time'
        ],
        correct: 1,
        explanation: 'Repairing phones saves money for customers and helps the environment by reducing electronic waste and extending device lifecycles.'
      },
      {
        question: 'Static electricity can damage internal smartphone components.',
        options: [
          'True',
          'False'
        ],
        correct: 0,
        explanation: 'True. Static electricity (ESD) can damage sensitive electronic components like processors, memory chips, and connectors.'
      },
      {
        question: 'Water damage is always easy to detect by just looking.',
        options: [
          'True',
          'False'
        ],
        correct: 1,
        explanation: 'False. Water damage to internal components like the motherboard may not be visible from the outside and requires internal inspection.'
      },
      {
        question: 'A technician must be careful when handling internal parts like the processor or RAM.',
        options: [
          'True',
          'False'
        ],
        correct: 0,
        explanation: 'True. Internal components are extremely sensitive to static electricity, force, and improper handling, requiring careful techniques.'
      },
      {
        question: 'It is unnecessary to remove the battery before starting a repair.',
        options: [
          'True',
          'False'
        ],
        correct: 1,
        explanation: 'False. Removing or disconnecting the battery is a critical safety step to prevent electrical damage and ensure technician safety.'
      },
      {
        question: 'Good communication and honesty improve customer trust.',
        options: [
          'True',
          'False'
        ],
        correct: 0,
        explanation: 'True. Clear communication and honest assessment of issues and costs builds customer trust and leads to repeat business.'
      },
      {
        question: 'All phones have identical internal layouts.',
        options: [
          'True',
          'False'
        ],
        correct: 1,
        explanation: 'False. Different manufacturers and models have varying internal layouts, requiring technicians to learn different disassembly procedures.'
      },
      {
        question: 'Diagnosing problems is a key part of successful repair.',
        options: [
          'True',
          'False'
        ],
        correct: 0,
        explanation: 'True. Proper diagnosis is essential for identifying the root cause of problems and applying the correct repair solution.'
      }
    ]
  }
};

export const module1Introduction: Module = {
  id: 1,
  title: 'Introduction to Cell Phone Repair',
  description: 'Overview of the smartphone repair industry, safety precautions, smartphone architectures, and basic repair principles.',
  lessons: [
    lesson1IndustryOverview,
    lesson2SafetyPrecautions,
    lesson3SmartphoneArchitectures,
    lesson4BasicRepairPrinciples,
    lesson5Quiz
  ]
};