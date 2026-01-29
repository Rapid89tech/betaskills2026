export const lesson1_3 = {
  id: 3,
  title: '📱 Basic Phone Repair Principles: iOS and Android Architecture',
  duration: '30:00',
  type: 'video' as const,
  content: {
    videoUrl: 'https://youtu.be/tH-6cchzL5k?si=gUKPPJ2cqBFduiQ',
    textContent: `
      <h2>📱 Basic Phone Repair Principles: iOS and Android Architecture</h2>
      
      <p>Mastering the architectural differences between iOS and Android is essential for effective smartphone repairs, as these operating systems dictate hardware compatibility, diagnostic approaches, and repair techniques. iOS, developed by Apple, is a closed-source system exclusive to iPhones, iPads, and iPod Touches. Its uniform hardware—featuring Apple's A-series or M-series chips, proprietary connectors, and pentalobe screws—simplifies repair processes but requires specialized tools like Apple Configurator or third-party software like 3uTools for diagnostics and firmware updates. The Apple File System (APFS) and Secure Enclave ensure robust security, but features like Activation Lock can complicate repairs, especially for second-hand devices. Apple's tight integration of hardware and software means repairs often involve navigating adhesive-heavy designs and serialized components, where mismatched parts may trigger software warnings.</p>

      <p>Android, built on the Linux kernel, is open-source and powers a vast array of devices from manufacturers like Samsung, Xiaomi, and Google. This diversity results in varied hardware (e.g., Snapdragon, Exynos, or MediaTek processors), file systems (ext4, F2FS), and user interfaces (One UI, MIUI), requiring technicians to adapt to model-specific disassembly and software tools like Odin (Samsung) or Mi Flash (Xiaomi). Android's flexibility allows for bootloader unlocking, custom recoveries (e.g., TWRP), and manual firmware flashing, which can aid repairs but may void warranties or trip security flags like Samsung Knox. While iOS apps are sandboxed with limited system access, Android apps can interact more freely with the system, especially on rooted devices, increasing risks of malware but simplifying certain troubleshooting tasks. Technicians must understand these ecosystems to select compatible parts, perform accurate diagnostics, and avoid issues like bricking devices or losing data, ensuring high-quality repairs across both platforms.</p>
    `
  }
};