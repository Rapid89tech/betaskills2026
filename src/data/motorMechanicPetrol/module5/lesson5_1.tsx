import React from 'react';
import { Lesson } from '../../../types/course';

const LessonContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-red-600 mb-6">Identifying Wear and Tear</h1>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Key Features</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Overview of Drive and Timing Belts</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/fMDHUvYJLfQ?si=VM8kqNegAbtII0rr</p>
            </div>
            <p className="text-gray-700 mb-4">
              Drive belts, often called serpentine or accessory belts, are external engine components that transfer power from the crankshaft to accessories like the alternator, power steering pump, air conditioning compressor, and water pump. Typically made of durable rubber with reinforced fibres, they withstand high rotational speeds but wear over time, especially in South Africa's hot, dusty climates. Timing belts, hidden behind protective covers, synchronize the crankshaft and camshaft to ensure precise valve timing for combustion. Made of similar materials but with toothed designs, they are critical in interference engines, where failure can cause valves to collide with pistons, leading to repairs costing over R20,000.
            </p>
            <p className="text-gray-700">
              Learners will explore belt functions through virtual simulations, visualizing power transfer and timing synchronization. Regular inspections prevent issues like battery drain from a failed alternator belt or catastrophic engine damage from a snapped timing belt. Mechanics mastering these inspections ensure reliable vehicle operation, enhancing client trust. The AI voice tutor can explain belt materials, their roles in specific vehicle models, or diagnose failure risks, providing practical insights for workshop applications.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Common Signs of Timing Belt Wear</h3>
            <p className="text-gray-700 mb-4">
              Timing belts show wear through cracks, missing or rounded teeth, oil contamination from leaks (e.g., camshaft seals), or excessive looseness, causing ticking noises or engine misfires. Even without visible damage, belts older than 5–7 years or 90,000–150,000 kilometres become brittle due to heat and age, risking sudden failure. In interference engines, common in vehicles like Toyota Corollas or VW Polos, a snapped belt can bend valves or damage pistons, requiring engine rebuilds costing R30,000 or more.
            </p>
            <p className="text-gray-700">
              Inspection often requires removing the timing cover, a task needing socket sets and patience to avoid damaging components. Learners will simulate inspections, checking for oil-soaked belts or worn teeth in virtual scenarios. South African mechanics must prioritize timely replacements due to high operating temperatures. Mechanics mastering this skill prevent catastrophic failures, saving clients from major expenses. The AI voice tutor can guide learners through spotting oil contamination, assessing belt age, or navigating complex cover removal, enhancing diagnostic precision.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Inspection Techniques for Timing Belts</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/JmtiYheNBWc?si=RLkyVrirRO5qKkn8</p>
            </div>
            <p className="text-gray-700 mb-4">
              Timing belt inspection is complex, requiring removal of the timing cover using tools like socket sets, screwdrivers, or torque wrenches, as belts are hidden behind engine components. With the cover off, check for cracks, missing teeth, oil contamination, or looseness by gently twisting the belt or turning the engine by hand to ensure tight fitment. Ticking noises or misfires suggest timing issues, while a snapped belt may cause sudden engine failure, especially in interference engines.
            </p>
            <p className="text-gray-700">
              Learners will simulate inspections, aligning crankshaft and camshaft marks to verify timing accuracy in virtual scenarios. Inspections are recommended every 90,000 kilometres or 5 years, as South African heat can degrade rubber faster. For example, neglecting a belt in a high-mileage VW Golf can lead to valve damage costing over R25,000. Mechanics mastering this skill prevent catastrophic failures, ensuring engine reliability. The AI voice tutor can guide learners through cover removal, timing mark alignment, or diagnosing ticking noises, enhancing complex inspection skills.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Common Signs of Drive Belt Wear</h3>
            <p className="text-gray-700 mb-4">
              Drive belts exhibit wear through visible signs like cracks across the ribbed surface, fraying edges, glazing (a shiny, slippery appearance from heat or slippage), or chunking (missing rubber sections). Squealing or chirping noises during engine startup or acceleration often indicate looseness, misalignment, or a worn tensioner. These issues, common after 80,000–100,000 kilometres, can disrupt accessories, causing dim lights (alternator failure), difficult steering (power steering pump), or overheating (water pump).
            </p>
            <p className="text-gray-700">
              In South Africa's dusty regions, debris accumulation accelerates wear, necessitating frequent checks. Learners will practice identifying these signs in virtual scenarios, using tools like flashlights to spot micro-cracks or glazing. Regular inspections every 10,000–15,000 kilometres prevent unexpected failures, such as a broken belt stranding a vehicle. Mechanics mastering this skill can diagnose issues early, ensuring accessory functionality and client satisfaction. The AI voice tutor can guide learners through wear pattern analysis, noise diagnostics, or assessing environmental impacts on belt lifespan, ensuring accurate maintenance decisions.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-3">Inspection Techniques for Drive Belts</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">Video Reference: https://youtu.be/Au3WkJWSX_Q?si=mcqNeLhPcJr-P4Mo</p>
            </div>
            <p className="text-gray-700 mb-4">
              Inspecting drive belts involves a systematic approach: with the engine off and cold, use a flashlight to examine the belt's ribbed surface and edges for cracks, fraying, glazing, or chunking. Check pulleys for wear, misalignment, or debris, as a worn pulley can shred a new belt within 5,000 kilometres. Tension is assessed by pressing the belt's longest stretch (aim for 1 cm deflection) or using a tension gauge (e.g., 100–150 N for most vehicles). Squealing noises during startup suggest slippage, often due to a weak tensioner or glazed belt.
            </p>
            <p className="text-gray-700">
              Learners will practice these techniques in virtual scenarios, rotating pulleys by hand to detect bearing roughness or noise. In South Africa, where dust and heat accelerate wear, inspections every 10,000 kilometres are critical. Mechanics mastering these techniques ensure accessory systems function reliably, preventing issues like alternator failure. The AI voice tutor can guide learners through tension checks, pulley diagnostics, or interpreting squealing noises, ensuring thorough inspections and confident maintenance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const lesson5_1: Lesson = {
  id: '5.1',
  title: 'Identifying Wear and Tear',
  content: LessonContent,
  duration: 90,
  objectives: [
    "Understand the functions and differences between drive belts and timing belts",
    "Identify common signs of timing belt wear and failure",
    "Master timing belt inspection techniques and cover removal",
    "Recognize drive belt wear patterns and symptoms",
    "Apply systematic inspection procedures for both belt types"
  ],
  keyTerms: [
    "Drive belts",
    "Timing belts",
    "Serpentine belt",
    "Accessory belt",
    "Interference engine",
    "Belt glazing",
    "Belt chunking",
    "Timing marks"
  ]
};