import React from 'react';
import { Lesson } from '../../../types/course';

const LessonContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-red-600 mb-6">Personal Protective Equipment</h1>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Key Features</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Purpose of PPE</h3>
            <p className="text-gray-700 mb-4">
              PPE includes gear like gloves, safety goggles, ear protection, respirators, and steel-toed boots, designed to minimize exposure to hazards such as cuts, burns, chemical splashes, and noise. In automotive workshops, PPE is critical for protecting against physical injuries, harmful substances, and long-term health risks like hearing loss or chemical exposure.
            </p>
            <p className="text-gray-700">
              PPE is the first line of defense in a workshop, safeguarding mechanics from the inherent dangers of working with heavy machinery, sharp tools, and hazardous chemicals. Learners will explore PPE types through virtual simulations, practicing how to select and wear gear for specific tasks, such as handling fuel or grinding metal. Proper PPE use reduces the risk of injuries like eye damage from debris or skin irritation from solvents, ensuring mechanics can work safely and confidently. The AI voice tutor can guide learners on choosing appropriate PPE, such as nitrile gloves for chemical handling or earmuffs for loud environments, offering practical tips for real-world applications.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Hand and Eye Protection</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/3TF60i_A0Rc?si=_0qJLvCVpZiV_33U</p>
            </div>
            <p className="text-gray-700 mb-4">
              Hand protection involves nitrile gloves for handling fuels and chemicals to prevent skin irritation, and heavy-duty gloves for mechanical tasks to avoid cuts and abrasions. Eye protection, such as safety goggles or face shields, guards against flying debris, chemical splashes, or sparks from welding or grinding.
            </p>
            <p className="text-gray-700">
              Hand and eye protection are essential for preventing common workshop injuries, such as chemical burns or eye damage from metal shards. Learners will use virtual scenarios to select appropriate gloves and goggles for tasks like degreasing parts or cutting metal, understanding material properties like nitrile's chemical resistance. Improper protection can lead to serious injuries, making this knowledge critical for safe workshop practices. Mechanics mastering these choices can work confidently, minimizing risks during complex repairs. The AI voice tutor can explain how to select gloves for specific chemicals or test goggles for impact resistance, ensuring compliance with safety standards.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Hearing and Respiratory Protection</h3>
            <p className="text-gray-700 mb-4">
              Hearing protection, such as earplugs or earmuffs, shields against noise from power tools like grinders or air compressors, preventing long-term hearing loss. Respiratory protection, including dust masks or respirators, prevents inhalation of harmful fumes, dust, or volatile organic compounds (VOCs) from fuels and solvents.
            </p>
            <p className="text-gray-700">
              Prolonged exposure to loud noises or toxic fumes can cause irreversible health issues, making hearing and respiratory protection vital in automotive workshops. Learners will explore noise levels and chemical exposure risks through simulations, practicing the use of earplugs or respirators in scenarios like spray painting or fuel system repairs. Proper selection and fit of these protections are crucial for effectiveness. Mechanics mastering these practices can maintain long-term health while working in high-risk environments. The AI voice tutor can guide learners on choosing respirators for specific chemicals or assessing noise levels, offering practical safety advice.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Footwear and Clothing</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/Xw47Tteft-M?si=N1Aiyh21zHjy-Ed_</p>
            </div>
            <p className="text-gray-700 mb-4">
              Steel-toed boots protect against injuries from falling tools or heavy components, while flame-resistant coveralls or clothing shield against sparks and hot surfaces during welding or engine work. These items ensure mechanics remain safe in dynamic workshop environments.
            </p>
            <p className="text-gray-700">
              Proper footwear and clothing are critical for preventing injuries from dropped objects or fire hazards, common in automotive repair shops. Learners will explore the features of steel-toed boots and flame-resistant materials through virtual fittings, understanding their role in tasks like lifting engines or welding exhausts. Improper attire, such as loose clothing, can lead to entanglement or burns, making this knowledge essential. Mechanics mastering this can work safely in high-risk tasks, enhancing workshop safety. The AI voice tutor can advise on selecting boots with slip-resistant soles or coveralls for specific tasks, ensuring optimal protection.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">PPE Maintenance and Storage</h3>
            <p className="text-gray-700 mb-4">
              Inspecting PPE for wear or damage before use, cleaning it per manufacturer guidelines, and storing it in a clean, dry environment ensures its effectiveness. Regular maintenance prevents compromised protection, such as cracked goggles or torn gloves, maintaining safety standards.
            </p>
            <p className="text-gray-700">
              Proper PPE maintenance extends the life and reliability of protective gear, ensuring mechanics remain safe during hazardous tasks. Learners will practice inspection and cleaning protocols through virtual simulations, identifying damage like worn glove linings or foggy goggles. Storing PPE correctly prevents degradation, such as mold in respirators or rust on metal components. Mechanics mastering these practices can maintain a safe working environment, reducing accident risks. The AI voice tutor can guide learners through PPE inspection checklists or proper cleaning techniques, ensuring compliance with safety protocols.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const lesson3_1: Lesson = {
  id: '3.1',
  title: 'Personal Protective Equipment',
  content: LessonContent,
  duration: 60,
  objectives: [
    "Identify different types of PPE and their specific applications",
    "Select appropriate PPE for various workshop tasks",
    "Understand proper PPE maintenance and storage procedures",
    "Apply safety protocols for hand, eye, hearing, and respiratory protection"
  ],
  keyTerms: [
    "Personal Protective Equipment (PPE)",
    "Nitrile gloves",
    "Safety goggles",
    "Respirators",
    "Steel-toed boots",
    "Hearing protection",
    "Chemical resistance",
    "Impact protection"
  ]
};