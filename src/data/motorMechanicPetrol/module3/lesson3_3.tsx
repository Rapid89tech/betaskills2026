import React from 'react';
import { Lesson } from '../../../types/course';

const LessonContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-red-600 mb-6">Tool Safety and Maintenance</h1>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Key Features</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Inspecting Hand Tools</h3>
            <p className="text-gray-700 mb-4">
              Hand tools like wrenches, screwdrivers, and pliers must be inspected for worn handles, bent shafts, or rounded edges before use. Clean tools free of oil or grease ensure a secure grip, reducing the risk of slips or injuries during tasks like tightening bolts or removing components.
            </p>
            <p className="text-gray-700">
              Regular inspection of hand tools is crucial for preventing accidents and ensuring efficient work in automotive repair. Learners will practice inspecting tools through virtual simulations, identifying defects like cracked handles or worn tips that could cause injuries or damage parts. A secure grip prevents slips, especially when applying high torque. Mechanics mastering tool inspection can maintain a safe and productive workshop, avoiding costly mistakes. The AI voice tutor can guide learners through inspection checklists or identifying when to retire damaged tools, ensuring safety standards are met.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Power Tool Safety</h3>
            <p className="text-gray-700 mb-4">
              Power tools like grinders, drills, and saws require inspection for frayed cords, damaged plugs, or malfunctioning safety guards. Testing switches and triggers ensures smooth operation, while adhering to manufacturer guidelines prevents misuse and accidents.
            </p>
            <p className="text-gray-700">
              Power tools amplify workshop productivity but pose significant risks if not handled correctly, such as electrical shocks or cuts from unguarded blades. Learners will explore power tool safety through virtual scenarios, practicing checks for cord integrity or guard functionality. Proper use, such as maintaining recommended speeds, prevents tool failure or injury. Mechanics mastering power tool safety can perform tasks like cutting exhaust pipes or drilling brackets safely. The AI voice tutor can explain how to test power tool safety features or follow operating guidelines, ensuring safe use in the workshop.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Using the Right Tool for the Job</h3>
            <p className="text-gray-700 mb-4">
              Selecting the appropriate tool, such as a torque wrench for precise tightening or insulated pliers for electrical work, ensures safety and quality. Using undersized or oversized tools can lead to injuries, damaged components, or inefficient work.
            </p>
            <p className="text-gray-700">
              Choosing the right tool is critical for both safety and efficiency, as mismatched tools can cause stripped bolts, personal injury, or prolonged repair times. Learners will practice tool selection through virtual scenarios, matching tools like socket wrenches or insulated screwdrivers to specific tasks. This knowledge prevents accidents, such as using a regular wrench on high-torque bolts, which can slip and cause injury. Mechanics mastering tool selection can work efficiently and safely, enhancing workshop productivity. The AI voice tutor can guide learners on selecting tools for tasks like removing a cylinder head or working near live wires.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Tool Maintenance and Storage</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/qsKXg5SZxrU</p>
            </div>
            <p className="text-gray-700 mb-4">
              Regular sharpening, lubricating, and cleaning of tools, such as keeping cutting edges sharp or oiling plier joints, maintain functionality. Storing tools in dry, organized toolboxes prevents rust and damage, ensuring they are ready for use.
            </p>
            <p className="text-gray-700">
              Proper tool maintenance extends tool life and ensures safety, as neglected tools can fail during use, causing injuries or damaging vehicle components. Learners will practice maintenance routines through virtual simulations, such as sharpening chisels or cleaning greasy wrenches. Organized storage in toolboxes or pegboards prevents loss and damage, improving workshop efficiency. Mechanics mastering these practices can maintain a reliable toolset, reducing downtime and risks. The AI voice tutor can explain maintenance schedules or storage solutions, ensuring tools remain in top condition.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Replacing Damaged Tools</h3>
            <p className="text-gray-700 mb-4">
              Tools showing excessive wear, cracks, or defects must be retired and replaced with quality alternatives to ensure safety and performance. Investing in durable replacements prevents accidents and maintains workshop efficiency.
            </p>
            <p className="text-gray-700">
              Replacing damaged tools is essential for maintaining a safe and effective workshop, as faulty tools can cause injuries or compromise repair quality. Learners will explore criteria for retiring tools, such as identifying cracked wrench handles or worn drill bits, through virtual inspections. Investing in high-quality replacements, like professional-grade socket sets, ensures long-term reliability. Mechanics mastering tool replacement can prevent accidents and maintain high standards in repairs. The AI voice tutor can guide learners on assessing tool condition or selecting quality replacements, ensuring workshop safety.
            </p>
          </div>
        </div>

        <div className="mt-8 bg-yellow-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Conclusion and Q&A</h3>
          <h4 className="text-lg font-semibold text-red-700 mb-3">Activities</h4>
          <div className="space-y-3">
            <div>
              <h5 className="font-semibold text-gray-700">Recap Key Points:</h5>
              <p className="text-gray-700">
                PPE protects against physical, chemical, and noise hazards, ensuring mechanic safety. Proper handling and storage of fuels and chemicals prevent accidents and environmental harm. Regular tool inspection, maintenance, and replacement ensure a safe and efficient workshop environment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const lesson3_3: Lesson = {
  id: '3.3',
  title: 'Tool Safety and Maintenance',
  content: LessonContent,
  duration: 60,
  objectives: [
    "Perform proper inspection procedures for hand and power tools",
    "Apply correct tool selection principles for specific tasks",
    "Implement tool maintenance and storage best practices",
    "Identify when tools should be replaced for safety reasons",
    "Understand the relationship between tool condition and workshop safety"
  ],
  keyTerms: [
    "Tool inspection",
    "Power tool safety",
    "Torque wrench",
    "Tool maintenance",
    "Cutting edge sharpening",
    "Tool storage",
    "Safety guards",
    "Tool replacement criteria"
  ]
};